// ============================================================
// Flowpath backend — Express + MySQL (mysql2)
// ============================================================

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json());

// ------------------------------------------------------------
// Permanent profile-photo storage
// ------------------------------------------------------------
const uploadDir = path.join(__dirname, "uploads", "profile");
fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const profileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || ".jpg";
      cb(null, `profile-${Date.now()}${ext}`);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Only JPG, JPEG, PNG and WEBP images are allowed."));
  },
});

// ------------------------------------------------------------
// MySQL Connection Pool
// ------------------------------------------------------------
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});

(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅ Connected to MySQL:", process.env.DB_NAME);
    conn.release();
  } catch (err) {
    console.error("❌ MySQL connection failed:", err.message);
  }
})();

// ------------------------------------------------------------
// Auth Helpers
// ------------------------------------------------------------
function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" });
}

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// Format Date helper to prevent "Invalid Date" bug in frontend
function formatDate(dateString) {
  if (!dateString) return null;
  const d = new Date(dateString);
  return isNaN(d.getTime()) ? dateString : d.toISOString().split("T")[0];
}

// Helper to format Project output JSON
function toProjectJson(row) {
  return {
    id: row.id,
    name: row.name,
    client: row.client,
    type: row.type,
    description: row.description,
    dueDate: formatDate(row.due_date),
    price: Number(row.price),
    progress: row.progress,
    status: row.status,
  };
}

// Helper to format Invoice output JSON
function toInvoiceJson(row) {
  return {
    id: row.id,
    client: row.client,
    amount: Number(row.amount),
    due: formatDate(row.due_date),
    status: row.status,
  };
}

// ============================================================
// AUTH ROUTES  ->  /api/auth
// ============================================================
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 6) {
      return res.status(400).json({ error: "Name, email and a 6+ character password are required." });
    }
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length) return res.status(409).json({ error: "An account with that email already exists." });

    const passwordHash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, passwordHash]
    );
    const user = { id: result.insertId, name, email };
    res.status(201).json({ user, token: signToken(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(401).json({ error: "Invalid email or password." });

    const dbUser = rows[0];
    const match = await bcrypt.compare(password, dbUser.password_hash);
    if (!match) return res.status(401).json({ error: "Invalid email or password." });

    const user = { id: dbUser.id, name: dbUser.name, email: dbUser.email };
    res.json({ user, token: signToken(user) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// PROJECTS  ->  /api/projects
// ============================================================
app.get("/api/projects", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects WHERE user_id = ? ORDER BY due_date ASC", [req.user.id]);
    res.json(rows.map(toProjectJson));
  } catch (err) {
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
});

app.post("/api/projects", requireAuth, async (req, res) => {
  try {
    const { name, client, type, description, dueDate, price } = req.body;
    if (!name || !client || !dueDate || price == null) {
      return res.status(400).json({ error: "name, client, dueDate and price are required." });
    }

    const cleanDueDate = formatDate(dueDate);

    const [result] = await pool.query(
      `INSERT INTO projects (user_id, name, client, type, description, due_date, price, progress, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, 'On Track')`,
      [req.user.id, name, client, type || "General", description || "", cleanDueDate, price]
    );

    // Keep clients in sync — scoped to logged-in user
    const [existingClient] = await pool.query(
      "SELECT * FROM clients WHERE user_id = ? AND LOWER(name) = LOWER(?)",
      [req.user.id, client]
    );

    if (existingClient.length) {
      await pool.query(
        "UPDATE clients SET projects = projects + 1, revenue = revenue + ? WHERE id = ?",
        [price, existingClient[0].id]
      );
    } else {
      await pool.query(
        "INSERT INTO clients (user_id, name, company, projects, revenue, status) VALUES (?, ?, ?, 1, ?, 'New')",
        [req.user.id, client, client, price]
      );
    }

    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ?", [result.insertId]);
    res.status(201).json(toProjectJson(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM projects WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
    if (!rows.length) return res.status(404).json({ error: "Project not found." });
    res.json(toProjectJson(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/projects/:id", requireAuth, async (req, res) => {
  try {
    const { name, client, type, description, dueDate, price, progress, status } = req.body;
    if (!name || !client || !dueDate || price == null) {
      return res.status(400).json({ error: "name, client, dueDate and price are required." });
    }

    const [existingRows] = await pool.query("SELECT * FROM projects WHERE id = ? AND user_id = ?", [
      req.params.id,
      req.user.id,
    ]);
    if (!existingRows.length) return res.status(404).json({ error: "Project not found." });
    const before = existingRows[0];
    const cleanDueDate = formatDate(dueDate);

    await pool.query(
      `UPDATE projects SET name = ?, client = ?, type = ?, description = ?, due_date = ?, price = ?, progress = ?, status = ?
       WHERE id = ? AND user_id = ?`,
      [
        name,
        client,
        type || "General",
        description || "",
        cleanDueDate,
        price,
        progress != null ? progress : before.progress,
        status || before.status,
        req.params.id,
        req.user.id,
      ]
    );

    // Reconcile clients table updates
    const clientChanged = before.client.trim().toLowerCase() !== client.trim().toLowerCase();
    const priceChanged = Number(before.price) !== Number(price);

    if (clientChanged || priceChanged) {
      const [oldClientRows] = await pool.query("SELECT * FROM clients WHERE user_id = ? AND LOWER(name) = LOWER(?)", [
        req.user.id,
        before.client,
      ]);
      if (oldClientRows.length) {
        const oc = oldClientRows[0];
        const newCount = Math.max(0, oc.projects - 1);
        const newRevenue = Math.max(0, Number(oc.revenue) - Number(before.price));
        if (clientChanged && newCount === 0) {
          await pool.query("DELETE FROM clients WHERE id = ?", [oc.id]);
        } else {
          await pool.query("UPDATE clients SET projects = ?, revenue = ? WHERE id = ?", [
            clientChanged ? newCount : oc.projects,
            newRevenue,
            oc.id,
          ]);
        }
      }

      const [newClientRows] = await pool.query("SELECT * FROM clients WHERE user_id = ? AND LOWER(name) = LOWER(?)", [
        req.user.id,
        client,
      ]);
      if (newClientRows.length) {
        await pool.query("UPDATE clients SET projects = projects + ?, revenue = revenue + ? WHERE id = ?", [
          clientChanged ? 1 : 0,
          price,
          newClientRows[0].id,
        ]);
      } else if (clientChanged) {
        await pool.query(
          "INSERT INTO clients (user_id, name, company, projects, revenue, status) VALUES (?, ?, ?, 1, ?, 'New')",
          [req.user.id, client, client, price]
        );
      }
    }

    const [updatedRows] = await pool.query("SELECT * FROM projects WHERE id = ?", [req.params.id]);
    res.json(toProjectJson(updatedRows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// CLIENTS  ->  /api/clients
// ============================================================
app.get("/api/clients", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM clients WHERE user_id = ? ORDER BY id DESC", [req.user.id]);
    res.json(rows.map((c) => ({ ...c, revenue: Number(c.revenue) })));
  } catch (err) {
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
});

// ============================================================
// TEAM MEMBERS  ->  /api/team
// ============================================================
const ALLOWED_ROLES = ["Frontend", "Backend", "UI/UX Design", "Digital Marketing", "Testing"];
const ALLOWED_WORKING_TYPES = ["Full", "Part", "Remote"];
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

app.get("/api/team", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM team_members WHERE user_id = ? ORDER BY id ASC", [req.user.id]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
});

app.post("/api/team", requireAuth, async (req, res) => {
  try {
    const { name, email, role, workingType } = req.body;

    if (!name || !name.trim()) return res.status(400).json({ error: "Name is required." });
    if (!email || !GMAIL_REGEX.test(email)) return res.status(400).json({ error: "Please enter a valid Gmail address." });
    if (!ALLOWED_ROLES.includes(role)) return res.status(400).json({ error: "Please select a valid role." });
    if (!ALLOWED_WORKING_TYPES.includes(workingType)) return res.status(400).json({ error: "Please select a valid working type." });

    const [result] = await pool.query(
      `INSERT INTO team_members (user_id, name, email, role, working_type, project, task, progress, tasks)
       VALUES (?, ?, ?, ?, ?, '—', 'Not assigned yet', 0, 0)`,
      [req.user.id, name.trim(), email, role, workingType]
    );
    const [rows] = await pool.query("SELECT * FROM team_members WHERE id = ?", [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/team/:id/assign", requireAuth, async (req, res) => {
  try {
    const { project, task } = req.body;
    if (!project || !task) return res.status(400).json({ error: "project and task are required." });
    const [result] = await pool.query("UPDATE team_members SET project = ?, task = ? WHERE id = ? AND user_id = ?", [
      project,
      task,
      req.params.id,
      req.user.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: "Team member not found." });
    const [rows] = await pool.query("SELECT * FROM team_members WHERE id = ?", [req.params.id]);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// INVOICES  ->  /api/invoices
// ============================================================
app.get("/api/invoices", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM invoices WHERE user_id = ? ORDER BY created_at DESC", [req.user.id]);
    res.json(rows.map(toInvoiceJson));
  } catch (err) {
    res.status(500).json({ error: err.sqlMessage || err.message });
  }
});

app.post("/api/invoices", requireAuth, async (req, res) => {
  try {
    const { client, amount, due, status } = req.body;
    if (!client || !amount || !due) {
      return res.status(400).json({ error: "client, amount and due are required." });
    }
    const cleanDueDate = formatDate(due);
    const id = `INV-${1000 + Math.floor(Math.random() * 9000)}`;
    await pool.query(
      "INSERT INTO invoices (id, user_id, client, amount, due_date, status) VALUES (?, ?, ?, ?, ?, ?)",
      [id, req.user.id, client, amount, cleanDueDate, status || "Pending"]
    );
    const [rows] = await pool.query("SELECT * FROM invoices WHERE id = ?", [id]);
    res.status(201).json(toInvoiceJson(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch("/api/invoices/:id", requireAuth, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Pending", "Paid", "Overdue"].includes(status)) {
      return res.status(400).json({ error: "status must be Pending, Paid or Overdue." });
    }
    const [result] = await pool.query("UPDATE invoices SET status = ? WHERE id = ? AND user_id = ?", [
      status,
      req.params.id,
      req.user.id,
    ]);
    if (!result.affectedRows) return res.status(404).json({ error: "Invoice not found." });
    const [rows] = await pool.query("SELECT * FROM invoices WHERE id = ?", [req.params.id]);
    res.json(toInvoiceJson(rows[0]));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// PROFILE IMAGE  ->  /api/profile
// ============================================================
app.post("/api/profile/upload-image", requireAuth, profileUpload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No image file received." });
    const imageUrl = `/uploads/profile/${req.file.filename}`;

    const [existing] = await pool.query("SELECT profile_photo FROM profiles WHERE user_id = ?", [req.user.id]);
    await pool.query(
      `INSERT INTO profiles (user_id, profile_photo) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE profile_photo = VALUES(profile_photo)`,
      [req.user.id, imageUrl]
    );

    if (existing.length && existing[0].profile_photo) {
      fs.unlink(path.join(__dirname, existing[0].profile_photo), () => {});
    }

    res.json({ success: true, message: "Profile image uploaded successfully", imageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/profile", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT profile_photo FROM profiles WHERE user_id = ?", [req.user.id]);
    res.json({ profilePhoto: rows.length ? rows[0].profile_photo : null });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err) {
    return res.status(400).json({ error: err.message });
  }
  next();
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 5000;
process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err.sqlMessage || err.message || err);
});

app.listen(PORT, () => console.log(`🚀 Flowpath API running on http://localhost:${PORT}`));