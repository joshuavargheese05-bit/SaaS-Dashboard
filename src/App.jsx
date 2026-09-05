import React, { useState, useEffect, useMemo, useRef } from "react";
import "./App.css";

/* ============================================================
   ICONS — small inline SVGs, no external icon library
   ============================================================ */
function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "folder":
      return (
        <svg {...common}>
          <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
          <circle cx="17.5" cy="8.5" r="2.6" />
          <path d="M15.8 14.3c2.9.4 4.7 2.5 4.7 5.7" />
        </svg>
      );
    case "check-square":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M8 12.5l2.6 2.6L16.5 9" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="M3 17l6-6 4 4 8-9" />
          <path d="M15 6h6v6" />
        </svg>
      );
    case "invoice":
      return (
        <svg {...common}>
          <path d="M6 2h9l3 3v17H6z" />
          <path d="M9 9h6M9 13h6M9 17h4" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="2.5" y="6" width="19" height="14" rx="2.5" />
          <path d="M2.5 10h19" />
          <circle cx="17" cy="14.5" r="1.4" fill="currentColor" stroke="none" />
        </svg>
      );
    case "bar-chart":
      return (
        <svg {...common}>
          <path d="M4 20V10M11 20V4M18 20v-7" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
    case "sun":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.5v2.4M12 19v2.5M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2.5 12h2.4M19 12h2.5M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7" />
        </svg>
      );
    case "moon":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M18 8.5a6 6 0 0 0-12 0c0 6-2.5 7-2.5 7h17s-2.5-1-2.5-7" />
          <path d="M10.3 20a1.7 1.7 0 0 0 3.4 0" />
        </svg>
      );
    case "chevron-down":
      return (
        <svg {...common}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "filter":
      return (
        <svg {...common}>
          <path d="M4 5h16l-6 8v6l-4 2v-8L4 5Z" />
        </svg>
      );
    case "menu":
      return (
        <svg {...common}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "x":
      return (
        <svg {...common}>
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="2.5" y="5" width="19" height="14" rx="2" />
          <path d="M3 6.5l9 6.5 9-6.5" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="2.8" />
        </svg>
      );
    case "arrow-left":
      return (
        <svg {...common}>
          <path d="M19 12H5M11 6l-6 6 6 6" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.2 2" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M4 7h16M9 7V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V7M6 7l1 13.5A1.5 1.5 0 0 0 8.5 22h7a1.5 1.5 0 0 0 1.5-1.5L18 7" />
        </svg>
      );
    case "check-circle":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M8 12.3l2.6 2.6L16.3 9" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19.4 13.5a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1.04 1.56V19.5a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1.04-1.56 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.87 1.7 1.7 0 0 0-1.56-1.04H4.5a2 2 0 1 1 0-4h.09a1.7 1.7 0 0 0 1.56-1.04 1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.87.34H10.6a1.7 1.7 0 0 0 1.04-1.56V4.5a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1.04 1.56 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.87V10.6a1.7 1.7 0 0 0 1.56 1.04H19.5a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.56 1.04Z" />
        </svg>
      );
    case "camera":
      return (
        <svg {...common}>
          <path d="M4 8.5a1.5 1.5 0 0 1 1.5-1.5h1.6l.9-1.5h8l.9 1.5h1.6A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-9Z" />
          <circle cx="12" cy="13" r="3.5" />
        </svg>
      );
    default:
      return null;
  }
}

/* ============================================================
   DEMO DATA
   ============================================================ */
const INITIAL_PROJECTS = [];

const INITIAL_CLIENTS = [];

const TASKS = [];

const INITIAL_TEAM = [];

const INITIAL_INVOICES = [];

const PAYMENTS = [];

const REVENUE_MONTHS = [
  { label: "Jan", value: 0 },
  { label: "Feb", value: 0 },
  { label: "Mar", value: 0 },
  { label: "Apr", value: 0 },
  { label: "May", value: 0 },
  { label: "Jun", value: 0 },
];

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: "grid" },
  { key: "projects", label: "Projects", icon: "folder" },
  { key: "clients", label: "Clients", icon: "users" },
  { key: "tasks", label: "Tasks", icon: "check-square" },
  { key: "team", label: "Team", icon: "users" },
  { key: "progress", label: "Progress", icon: "trend" },
  { key: "invoices", label: "Invoices", icon: "invoice" },
  { key: "payments", label: "Payments", icon: "wallet" },
  { key: "analytics", label: "Analytics", icon: "bar-chart" },
  { key: "settings", label: "Settings", icon: "settings" },
];

const PAGE_META = {
  dashboard: { title: "Overview", subtitle: "Welcome back! Here's what's happening with your work." },
  projects: { title: "Projects", subtitle: "Manage all your projects in one place." },
  clients: { title: "Clients", subtitle: "Every client relationship, in one place." },
  tasks: { title: "Tasks", subtitle: "Track what's done, active, and upcoming." },
  team: { title: "Team", subtitle: "See workload and progress across your team." },
  progress: { title: "Progress", subtitle: "Milestones and completion across active work." },
  invoices: { title: "Invoices", subtitle: "Track billing status across every client." },
  payments: { title: "Payments", subtitle: "A history of received and pending payments." },
  analytics: { title: "Analytics", subtitle: "Performance across revenue, projects and team." },
  settings: { title: "Settings", subtitle: "Manage your account preferences and personal information." },
};

/* ============================================================
   UTILITIES
   ============================================================ */
function formatINR(amount) {
  return "₹" + Number(amount).toLocaleString("en-IN");
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function daysRemaining(iso) {
  const today = new Date("2026-09-02T00:00:00");
  const due = new Date(iso + "T00:00:00");
  const diff = Math.round((due - today) / (1000 * 60 * 60 * 24));
  return diff;
}

function normalize(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, "");
}

function statusFromDays(days, progress) {
  if (progress >= 100) return "Completed";
  if (days < 3) return "At Risk";
  return "On Track";
}

/* ============================================================
   SMALL REUSABLE COMPONENTS
   ============================================================ */
function ProgressBar({ value, tone = "default" }) {
  return (
    <div className={`progress-track tone-${tone}`}>
      <div className="progress-fill" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    "On Track": "badge-good",
    "At Risk": "badge-warn",
    Completed: "badge-done",
    Active: "badge-good",
    New: "badge-info",
    Paid: "badge-good",
    Pending: "badge-warn",
    Overdue: "badge-bad",
    High: "badge-bad",
    Medium: "badge-warn",
    Low: "badge-info",
  };
  return <span className={`badge ${map[status] || "badge-info"}`}>{status}</span>;
}

function Avatar({ name, size = 38, photoUrl }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  if (photoUrl) {
    return (
      <img
        className="avatar avatar-photo"
        src={photoUrl}
        alt={name}
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div className="avatar" style={{ width: size, height: size, fontSize: size * 0.38 }}>
      {initials}
    </div>
  );
}

function StatCard({ icon, label, value, change }) {
  return (
    <div className="stat-card reveal">
      <div className="stat-icon">
        <Icon name={icon} size={20} />
      </div>
      <div className="stat-body">
        <div className="stat-value">{value}</div>
        <div className="stat-label">{label}</div>
        {change && <div className={`stat-change ${change.startsWith("-") ? "neg" : "pos"}`}>{change}</div>}
      </div>
    </div>
  );
}

function Modal({ title, onClose, children, wide }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-panel ${wide ? "modal-wide" : ""}`}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close dialog">
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function EmptyState({ title, subtitle }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">
        <Icon name="search" size={26} />
      </div>
      <h4>{title}</h4>
      <p>{subtitle}</p>
    </div>
  );
}

function Toast({ message, show }) {
  if (!show) return null;
  return (
    <div className="toast">
      <Icon name="check-circle" size={18} />
      <span>{message}</span>
    </div>
  );
}

/* ============================================================
   AUTH PAGES
   ============================================================ */
function AuthShell({ children, subtitle }) {
  return (
    <div className="auth-shell">
      <div className="auth-side">
        <div className="auth-brand">
          <div className="brand-mark">FP</div>
          <span>Flowpath</span>
        </div>
        <h1>Run your studio like a product, not a scramble.</h1>
        <p>{subtitle}</p>
        <div className="auth-side-stats">
          <div>
            <strong>24</strong>
            <span>Active clients</span>
          </div>
          <div>
            <strong>₹2.48L</strong>
            <span>Revenue this month</span>
          </div>
          <div>
            <strong>86</strong>
            <span>Tasks completed</span>
          </div>
        </div>
      </div>
      <div className="auth-form-side">{children}</div>
    </div>
  );
}

function Login({ onLogin, goTo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onLogin({ email, password });
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell subtitle="Log back in to pick up where you left off.">
      <div className="auth-form-wrap reveal">
        <h2>Welcome back</h2>
        <p className="auth-form-sub">Log in to your Flowpath account.</p>
        <form onSubmit={submit} noValidate>
          <label className="field">
            <span>Email</span>
            <div className="input-wrap">
              <Icon name="mail" size={17} />
              <input type="email" placeholder="you@studio.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
          <label className="field">
            <span>Password</span>
            <div className="input-wrap">
              <Icon name="lock" size={17} />
              <input type={showPw ? "text" : "password"} placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" className="input-adornment" onClick={() => setShowPw((s) => !s)} aria-label={showPw ? "Hide password" : "Show password"}>
                <Icon name="eye" size={17} />
              </button>
            </div>
          </label>
          {error && <div className="form-error">{error}</div>}
          <div className="field-row">
            <button type="button" className="link-btn" onClick={() => goTo("forgot")}>
              Forgot password?
            </button>
          </div>
          <button type="submit" className="btn btn-gradient btn-block" disabled={loading}>
            {loading ? "Logging in…" : "Log in"}
          </button>
        </form>
        <p className="auth-switch">
          New to Flowpath?{" "}
          <button className="link-btn" onClick={() => goTo("signup")}>
            Create an account
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

function Signup({ onSignup, goTo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await onSignup({ name, email, password });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell subtitle="Set up your workspace in under a minute.">
      <div className="auth-form-wrap reveal">
        <h2>Create your account</h2>
        <p className="auth-form-sub">Start managing projects the same day.</p>
        <form onSubmit={submit} noValidate>
          <label className="field">
            <span>Full name</span>
            <div className="input-wrap">
              <Icon name="users" size={17} />
              <input type="text" placeholder="Jordan Lee" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
          </label>
          <label className="field">
            <span>Email</span>
            <div className="input-wrap">
              <Icon name="mail" size={17} />
              <input type="email" placeholder="you@studio.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
          <label className="field">
            <span>Password</span>
            <div className="input-wrap">
              <Icon name="lock" size={17} />
              <input type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-gradient btn-block" disabled={loading}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>
        <p className="auth-switch">
          Already have an account?{" "}
          <button className="link-btn" onClick={() => goTo("login")}>
            Log in
          </button>
        </p>
      </div>
    </AuthShell>
  );
}

function ForgotPassword({ goTo, onSendOtp }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    onSendOtp(email);
  }
  return (
    <AuthShell subtitle="We'll send a one-time code to verify it's you.">
      <div className="auth-form-wrap reveal">
        <button className="link-btn back-link" onClick={() => goTo("login")}>
          <Icon name="arrow-left" size={16} /> Back to login
        </button>
        <h2>Forgot password</h2>
        <p className="auth-form-sub">Enter your email and we'll send a verification code.</p>
        <form onSubmit={submit} noValidate>
          <label className="field">
            <span>Email</span>
            <div className="input-wrap">
              <Icon name="mail" size={17} />
              <input type="email" placeholder="you@studio.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-gradient btn-block">
            Send code
          </button>
        </form>
      </div>
    </AuthShell>
  );
}

function OtpVerification({ goTo, email }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const refs = useRef([]);

  function updateDigit(i, val) {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 3) refs.current[i + 1]?.focus();
  }

  function submit(e) {
    e.preventDefault();
    if (digits.join("").length < 4) {
      setError("Enter the 4-digit code.");
      return;
    }
    goTo("reset");
  }

  return (
    <AuthShell subtitle="Check your inbox for a 4-digit verification code.">
      <div className="auth-form-wrap reveal">
        <button className="link-btn back-link" onClick={() => goTo("forgot")}>
          <Icon name="arrow-left" size={16} /> Back
        </button>
        <h2>Enter verification code</h2>
        <p className="auth-form-sub">We sent a demo code to {email || "your email"}. Enter any 4 digits to continue.</p>
        <form onSubmit={submit} noValidate>
          <div className="otp-row">
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (refs.current[i] = el)}
                className="otp-input"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => updateDigit(i, e.target.value)}
              />
            ))}
          </div>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-gradient btn-block">
            Verify code
          </button>
        </form>
      </div>
    </AuthShell>
  );
}

function ResetPassword({ goTo, onReset }) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  function submit(e) {
    e.preventDefault();
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    onReset();
  }
  return (
    <AuthShell subtitle="Choose a new password for your account.">
      <div className="auth-form-wrap reveal">
        <h2>Create new password</h2>
        <p className="auth-form-sub">Make it something you'll remember.</p>
        <form onSubmit={submit} noValidate>
          <label className="field">
            <span>New password</span>
            <div className="input-wrap">
              <Icon name="lock" size={17} />
              <input type="password" placeholder="At least 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </label>
          <label className="field">
            <span>Confirm password</span>
            <div className="input-wrap">
              <Icon name="lock" size={17} />
              <input type="password" placeholder="Re-enter password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
            </div>
          </label>
          {error && <div className="form-error">{error}</div>}
          <button type="submit" className="btn btn-gradient btn-block">
            Reset password
          </button>
        </form>
      </div>
    </AuthShell>
  );
}

function ResetSuccess({ goTo }) {
  return (
    <AuthShell subtitle="You're all set.">
      <div className="auth-form-wrap reveal success-wrap">
        <div className="success-icon">
          <Icon name="check-circle" size={30} />
        </div>
        <h2>Password updated</h2>
        <p className="auth-form-sub">Your password has been reset successfully. You can now log in.</p>
        <button className="btn btn-gradient btn-block" onClick={() => goTo("login")}>
          Back to login
        </button>
      </div>
    </AuthShell>
  );
}

/* ============================================================
   LAYOUT: SIDEBAR + HEADER
   ============================================================ */
function Sidebar({ active, onNavigate, user, onLogout, open, onClose, profilePhoto }) {
  return (
    <>
      {open && <div className="sidebar-scrim" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="brand-mark">FP</div>
          <span className="brand-name">Flowpath</span>
          <button className="icon-btn sidebar-close" onClick={onClose} aria-label="Close menu">
            <Icon name="x" size={18} />
          </button>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`sidebar-link ${active === item.key ? "active" : ""}`}
              onClick={() => onNavigate(item.key)}
            >
              <Icon name={item.icon} size={18} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-profile">
            <Avatar name={user.name} size={36} photoUrl={profilePhoto} />
            <div className="sidebar-profile-text">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
            </div>
          </div>
          <button className="sidebar-logout" onClick={onLogout}>
            <Icon name="logout" size={17} />
            <span>Log out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function Header({ page, user, theme, onToggleTheme, onMenu, profilePhoto }) {
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const meta = PAGE_META[page];

  return (
    <header className="app-header">
      <div className="header-left">
        <button className="icon-btn header-menu-btn" onClick={onMenu} aria-label="Open menu">
          <Icon name="menu" size={20} />
        </button>
        <div>
          <div className="header-breadcrumb">{meta.title}</div>
        </div>
      </div>
      <div className="header-right">
        <div className="header-popover-wrap">
          <button className="icon-btn" aria-label="Notifications" onClick={() => setShowNotifs((s) => !s)}>
            <Icon name="bell" size={19} />
            <span className="notif-dot" />
          </button>
          {showNotifs && (
            <div className="popover reveal">
              <div className="popover-title">Notifications</div>
              <div className="popover-item">
                <strong>Invoice paid</strong>
                <span>Joshua Studio paid ₹28,000</span>
              </div>
              <div className="popover-item">
                <strong>Deadline approaching</strong>
                <span>E-commerce Website due in 8 days</span>
              </div>
              <div className="popover-item">
                <strong>New client</strong>
                <span>Loopline was added</span>
              </div>
            </div>
          )}
        </div>
        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          role="switch"
          aria-checked={theme === "dark"}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          <Icon name={theme === "dark" ? "moon" : "sun"} size={16} />
        </button>
        <div className="header-popover-wrap">
          <button className="header-profile" onClick={() => setShowProfile((s) => !s)}>
            <Avatar name={user.name} size={34} photoUrl={profilePhoto} />
            <span className="header-profile-name">{user.name}</span>
            <Icon name="chevron-down" size={15} />
          </button>
          {showProfile && (
            <div className="popover popover-right reveal">
              <div className="popover-item">
                <strong>{user.name}</strong>
                <span>{user.email}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ============================================================
   DASHBOARD PAGE
   ============================================================ */
function Dashboard({ projects, clients, teamMembers }) {
  const totalClients = clients.length;
  const activeProjects = projects.filter((p) => p.status !== "Completed").length;
  const totalRevenue = clients.reduce((s, c) => s + c.revenue, 0);
  const completedTasks = 0;

  const recent = [...projects]
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  const upcoming = [...projects]
    .filter((p) => p.status !== "Completed")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  const maxRevenue = Math.max(...REVENUE_MONTHS.map((m) => m.value), 1);

  const completedPct = 0, inProgressPct = 0, pendingPct = 0;

  return (
    <div className="page">
      <div className="stat-grid reveal">
        <StatCard icon="users" label="Total Clients" value={`${totalClients} Clients`} />
        <StatCard icon="folder" label="Active Projects" value={`${activeProjects} Projects`} />
        <StatCard icon="wallet" label="Total Revenue" value={formatINR(totalRevenue)} />
        <StatCard icon="check-square" label="Completed Tasks" value={`${completedTasks} Tasks`} />
      </div>

      <div className="dash-grid">
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Recent Work</h3>
          </div>
          <div className="recent-list">
            {recent.length === 0 && <EmptyState title="No projects yet." subtitle="Projects you create will show up here." />}
            {recent.map((p) => (
              <div className="recent-row" key={p.id}>
                <div className="recent-main">
                  <strong>{p.name}</strong>
                  <span>{p.client} · {p.type}</span>
                </div>
                <div className="recent-progress">
                  <ProgressBar value={p.progress} />
                  <span>{p.progress}%</span>
                </div>
                <div className="recent-due">Due {formatDate(p.dueDate)}</div>
                <div className="recent-price">{formatINR(p.price)}</div>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="panel reveal">
          <div className="panel-head">
            <h3>Task Progress</h3>
          </div>
          <div className="task-progress-list">
            <div className="tp-row">
              <div className="tp-label"><span className="dot dot-good" />Completed</div>
              <ProgressBar value={completedPct} tone="good" />
              <span className="tp-pct">{completedPct}%</span>
            </div>
            <div className="tp-row">
              <div className="tp-label"><span className="dot dot-warn" />In Progress</div>
              <ProgressBar value={inProgressPct} tone="warn" />
              <span className="tp-pct">{inProgressPct}%</span>
            </div>
            <div className="tp-row">
              <div className="tp-label"><span className="dot dot-muted" />Pending</div>
              <ProgressBar value={pendingPct} tone="muted" />
              <span className="tp-pct">{pendingPct}%</span>
            </div>
          </div>
          <div className="panel-divider" />
          <h4 className="panel-subhead">Client Summary</h4>
          <div className="client-summary-grid">
            <div><strong>{totalClients}</strong><span>Total</span></div>
            <div><strong>{clients.filter((c) => c.status === "Active").length}</strong><span>Active</span></div>
            <div><strong>{clients.filter((c) => c.status === "New").length}</strong><span>New</span></div>
          </div>
        </section>
      </div>

      <div className="dash-grid">
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Revenue Overview</h3>
            <span className="panel-head-note">Last 6 months</span>
          </div>
          <div className="revenue-chart">
            {REVENUE_MONTHS.map((m) => (
              <div className="revenue-col" key={m.label}>
                <div className="revenue-bar-wrap">
                  <div className="revenue-bar" style={{ height: `${(m.value / maxRevenue) * 100}%` }} title={formatINR(m.value)} />
                </div>
                <span className="revenue-label">{m.label}</span>
              </div>
            ))}
          </div>
          <div className="revenue-foot">
            <div><span>This month</span><strong>{formatINR(0)}</strong></div>
            <div><span>Last month</span><strong>{formatINR(0)}</strong></div>
            <div><span>Pending</span><strong>{formatINR(0)}</strong></div>
          </div>
        </section>

        <section className="panel reveal">
          <div className="panel-head">
            <h3>Team Members</h3>
          </div>
          <div className="team-list">
            {teamMembers.length === 0 && <EmptyState title="No team members yet." subtitle="Add teammates from the Team page." />}
            {teamMembers.slice(0, 3).map((m) => (
              <div className="team-row" key={m.id}>
                <Avatar name={m.name} />
                <div className="team-info">
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                  <span className="team-project">{m.project}</span>
                </div>
                <div className="team-progress">
                  <ProgressBar value={m.progress} />
                  <span>{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="panel reveal">
        <div className="panel-head">
          <h3>Upcoming Deadlines</h3>
        </div>
        <div className="deadline-list">
          {upcoming.length === 0 && <EmptyState title="No upcoming deadlines." subtitle="Deadlines from active projects will appear here." />}
          {upcoming.map((p) => {
            const days = daysRemaining(p.dueDate);
            return (
              <div className="deadline-row" key={p.id}>
                <div className="deadline-main">
                  <strong>{p.name}</strong>
                  <span>{p.client}</span>
                </div>
                <div className="deadline-due">Due {formatDate(p.dueDate)}</div>
                <div className="deadline-days">{days >= 0 ? `${days} days remaining` : "Overdue"}</div>
                <ProgressBar value={p.progress} />
                <StatusBadge status={p.status} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   PROJECTS PAGE
   ============================================================ */
function AddProjectModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    client: "",
    name: "",
    needs: "",
    description: "",
    purpose: "",
    dueDate: "",
    price: "",
  });
  const [error, setError] = useState("");

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.client.trim() || !form.name.trim() || !form.dueDate || !form.price) {
      setError("Please fill in client, project name, due date and price.");
      return;
    }
    onCreate({
      id: Date.now(),
      name: form.name,
      client: form.client,
      type: form.needs || "General",
      description: form.description || form.purpose,
      dueDate: form.dueDate,
      price: Number(form.price),
      progress: 0,
      status: "On Track",
    });
  }

  return (
    <Modal title="Create New Project" onClose={onClose} wide>
      <form className="modal-form" onSubmit={submit} noValidate>
        <div className="form-grid-2">
          <label className="field">
            <span>Client Name</span>
            <input value={form.client} onChange={(e) => update("client", e.target.value)} placeholder="e.g. FashionHub" />
          </label>
          <label className="field">
            <span>Project Name</span>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Shopify Rebuild" />
          </label>
        </div>
        <div className="form-grid-2">
          <label className="field">
            <span>Project Needs</span>
            <input value={form.needs} onChange={(e) => update("needs", e.target.value)} placeholder="e.g. Web Development" />
          </label>
          <label className="field">
            <span>Project Purpose</span>
            <input value={form.purpose} onChange={(e) => update("purpose", e.target.value)} placeholder="e.g. Launch new storefront" />
          </label>
        </div>
        <label className="field">
          <span>Project Description</span>
          <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Briefly describe the project scope" />
        </label>
        <div className="form-grid-2">
          <label className="field">
            <span>Project Due Date</span>
            <input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} />
          </label>
          <label className="field">
            <span>Project Price (₹)</span>
            <input type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="e.g. 45000" />
          </label>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient">
            Create Project
          </button>
        </div>
      </form>
    </Modal>
  );
}

function ViewProjectModal({ project, onClose }) {
  return (
    <Modal title={project.name} onClose={onClose}>
      <div className="invoice-edit-summary">
        <div><span>Client</span><strong>{project.client}</strong></div>
        <div><span>Project Needs</span><strong>{project.type}</strong></div>
        <div><span>Due Date</span><strong>{formatDate(project.dueDate)}</strong></div>
        <div><span>Price</span><strong>{formatINR(project.price)}</strong></div>
        <div><span>Progress</span><strong>{project.progress}%</strong></div>
        <div><span>Status</span><strong>{project.status}</strong></div>
      </div>
      {project.description && (
        <>
          <h4 className="panel-subhead">Description</h4>
          <p className="modal-description-text">{project.description}</p>
        </>
      )}
      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
}

function EditProjectModal({ project, onClose, onSave }) {
  const [form, setForm] = useState({
    client: project.client,
    name: project.name,
    needs: project.type || "",
    description: project.description || "",
    dueDate: project.dueDate ? String(project.dueDate).slice(0, 10) : "",
    price: project.price,
    progress: project.progress,
    status: project.status,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.client.trim() || !form.name.trim() || !form.dueDate || !form.price) {
      setError("Please fill in client, project name, due date and price.");
      return;
    }
    setError("");
    setSaving(true);
    try {
      await onSave(project.id, {
        name: form.name,
        client: form.client,
        type: form.needs,
        description: form.description,
        dueDate: form.dueDate,
        price: Number(form.price),
        progress: Number(form.progress),
        status: form.status,
      });
      onClose();
    } catch (err) {
      setError(err.message || "Couldn't save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal title="Edit Project" onClose={onClose} wide>
      <form className="modal-form" onSubmit={submit} noValidate>
        <div className="form-grid-2">
          <label className="field">
            <span>Client Name</span>
            <input value={form.client} onChange={(e) => update("client", e.target.value)} />
          </label>
          <label className="field">
            <span>Project Name</span>
            <input value={form.name} onChange={(e) => update("name", e.target.value)} />
          </label>
        </div>
        <div className="form-grid-2">
          <label className="field">
            <span>Project Needs</span>
            <input value={form.needs} onChange={(e) => update("needs", e.target.value)} />
          </label>
          <label className="field">
            <span>Status</span>
            <select value={form.status} onChange={(e) => update("status", e.target.value)}>
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
        </div>
        <label className="field">
          <span>Project Description</span>
          <textarea rows={3} value={form.description} onChange={(e) => update("description", e.target.value)} />
        </label>
        <div className="form-grid-2">
          <label className="field">
            <span>Project Due Date</span>
            <input type="date" value={form.dueDate} onChange={(e) => update("dueDate", e.target.value)} />
          </label>
          <label className="field">
            <span>Project Price (₹)</span>
            <input type="number" min="0" value={form.price} onChange={(e) => update("price", e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>Progress (%)</span>
          <input type="number" min="0" max="100" value={form.progress} onChange={(e) => update("progress", e.target.value)} />
        </label>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient" disabled={saving}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function Projects({ projects, onAddProject, showAddModal, setShowAddModal, onCreate, onEditProject }) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("due-asc");
  const [showFilters, setShowFilters] = useState(false);
  const [viewingProject, setViewingProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  const filtered = useMemo(() => {
    const q = normalize(query);
    let list = projects.filter(
      (p) => normalize(p.name).includes(q) || normalize(p.client).includes(q)
    );
    switch (sortBy) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "due-asc":
        list = [...list].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case "due-desc":
        list = [...list].sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
        break;
      case "az":
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "za":
        list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    return list;
  }, [projects, query, sortBy]);

  return (
    <div className="page">
      <div className="page-toolbar reveal">
        <div className="header-search page-search">
          <Icon name="search" size={16} />
          <input placeholder="Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="toolbar-actions">
          <div className="select-wrap">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} aria-label="Sort projects">
              <option value="due-asc">Due Date: Nearest First</option>
              <option value="due-desc">Due Date: Latest First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="az">Alphabetical: A → Z</option>
              <option value="za">Alphabetical: Z → A</option>
            </select>
          </div>
          <button className="btn btn-secondary" onClick={() => setShowFilters((s) => !s)}>
            <Icon name="filter" size={16} /> Filter
          </button>
          <button className="btn btn-gradient" onClick={onAddProject}>
            <Icon name="plus" size={16} /> Add New Project
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-chip-row reveal">
          {["All", "On Track", "At Risk", "Completed"].map((s) => (
            <span key={s} className="chip">
              {s}
            </span>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <EmptyState title="No projects found." subtitle="Try changing your search or filters." />
      ) : (
        <div className="project-grid">
          {filtered.map((p) => (
            <div className="project-card reveal" key={p.id}>
              <div className="project-card-top">
                <div>
                  <h4>{p.name}</h4>
                  <span className="project-client">{p.client}</span>
                </div>
                <StatusBadge status={p.status} />
              </div>
              <p className="project-desc">{p.description}</p>
              <div className="project-progress-row">
                <ProgressBar value={p.progress} />
                <span>{p.progress}%</span>
              </div>
              <div className="project-card-foot">
                <div>
                  <span className="foot-label">Price</span>
                  <strong>{formatINR(p.price)}</strong>
                </div>
                <div>
                  <span className="foot-label">Due</span>
                  <strong>{formatDate(p.dueDate)}</strong>
                </div>
              </div>
              <div className="project-card-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setViewingProject(p)}>
                  View
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => setEditingProject(p)}>
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showAddModal && <AddProjectModal onClose={() => setShowAddModal(false)} onCreate={onCreate} />}
      {viewingProject && <ViewProjectModal project={viewingProject} onClose={() => setViewingProject(null)} />}
      {editingProject && (
        <EditProjectModal project={editingProject} onClose={() => setEditingProject(null)} onSave={onEditProject} />
      )}
    </div>
  );
}

/* ============================================================
   OTHER SIDEBAR / DEMO PAGES
   ============================================================ */
function Clients({ clients }) {
  return (
    <div className="page">
      <div className="stat-grid stat-grid-3 reveal">
        <StatCard icon="users" label="Total Clients" value={clients.length} />
        <StatCard icon="check-square" label="Active Clients" value={clients.filter((c) => c.status === "Active").length} />
        <StatCard icon="plus" label="New Clients" value={clients.filter((c) => c.status === "New").length} />
      </div>
      <section className="panel reveal">
        <div className="panel-head">
          <h3>All Clients</h3>
        </div>
        {clients.length === 0 ? (
          <EmptyState title="No clients yet." subtitle="Clients are added automatically when you create a project." />
        ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Company</th>
                <th>Projects</th>
                <th>Revenue</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="cell-name">
                    <Avatar name={c.name} size={30} />
                    {c.name}
                  </td>
                  <td>{c.company}</td>
                  <td>{c.projects}</td>
                  <td>{formatINR(c.revenue)}</td>
                  <td><StatusBadge status={c.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>
    </div>
  );
}

function TasksPage() {
  const completed = 0, inProgress = 0, pending = 0;
  return (
    <div className="page">
      <div className="stat-grid reveal">
        <StatCard icon="check-square" label="Total Tasks" value={TASKS.length} />
        <StatCard icon="check-circle" label="Completed" value={completed} />
        <StatCard icon="clock" label="In Progress" value={inProgress} />
        <StatCard icon="folder" label="Pending" value={pending} />
      </div>
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Task List</h3>
        </div>
        {TASKS.length === 0 ? (
          <EmptyState title="No tasks yet." subtitle="Tasks assigned to your team will show up here." />
        ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Project</th>
                <th>Priority</th>
                <th>Due Date</th>
                <th>Assigned</th>
              </tr>
            </thead>
            <tbody>
              {TASKS.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td>{t.project}</td>
                  <td><StatusBadge status={t.priority} /></td>
                  <td>{formatDate(t.due)}</td>
                  <td className="cell-name">
                    <Avatar name={t.assignee} size={26} />
                    {t.assignee}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>
    </div>
  );
}

const TEAM_ROLES = ["Frontend", "Backend", "UI/UX Design", "Digital Marketing", "Testing"];
const WORKING_TYPES = ["Full", "Part", "Remote"];
const GMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

function AddTeamMemberModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", role: "", workingType: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!GMAIL_PATTERN.test(form.email.trim())) {
      setError("Please enter a valid Gmail address.");
      return;
    }
    if (!TEAM_ROLES.includes(form.role)) {
      setError("Please select a role.");
      return;
    }
    if (!WORKING_TYPES.includes(form.workingType)) {
      setError("Please select a working type.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await onAdd({ name: form.name.trim(), email: form.email.trim(), role: form.role, workingType: form.workingType });
    } catch (err) {
      setError(err.message || "Couldn't add team member. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal title="Add Team Member" onClose={onClose}>
      <form className="modal-form" onSubmit={submit} noValidate>
        <label className="field">
          <span>Name</span>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Joshua" />
        </label>
        <label className="field">
          <span>Gmail</span>
          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="e.g. joshua@gmail.com" />
        </label>
        <div className="form-grid-2">
          <label className="field">
            <span>Role</span>
            <select value={form.role} onChange={(e) => update("role", e.target.value)}>
              <option value="">Select a role</option>
              {TEAM_ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Working Type</span>
            <select value={form.workingType} onChange={(e) => update("workingType", e.target.value)}>
              <option value="">Select working type</option>
              {WORKING_TYPES.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </label>
        </div>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient" disabled={submitting}>
            {submitting ? "Saving…" : "Done"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function AssignModal({ member, projects, onClose, onAssign }) {
  const [project, setProject] = useState(projects[0]?.name || "");
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!project || !task.trim()) {
      setError("Select a project and enter the task to assign.");
      return;
    }
    onAssign(member.id, project, task);
  }

  return (
    <Modal title={`Assign Work to ${member.name}`} onClose={onClose}>
      <form className="modal-form" onSubmit={submit} noValidate>
        <label className="field">
          <span>Project</span>
          <select value={project} onChange={(e) => setProject(e.target.value)}>
            {projects.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Task / Work</span>
          <input value={task} onChange={(e) => setTask(e.target.value)} placeholder="e.g. Write Login API" />
        </label>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient">
            Assign
          </button>
        </div>
      </form>
    </Modal>
  );
}

function TeamPage({ teamMembers, projects, onAddMember, onAssign }) {
  const [showAddMember, setShowAddMember] = useState(false);
  const [assigningMember, setAssigningMember] = useState(null);

  return (
    <div className="page">
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Team Members</h3>
          <button className="btn btn-gradient btn-sm" onClick={() => setShowAddMember(true)}>
            <Icon name="plus" size={15} /> Add Team Member
          </button>
        </div>
        {teamMembers.length === 0 ? (
          <EmptyState title="No team members yet." subtitle="Add your first teammate to start assigning work." />
        ) : (
        <div className="team-grid">
          {teamMembers.map((m) => (
            <div className="team-card" key={m.id}>
              <Avatar name={m.name} size={44} />
              <strong>{m.name}</strong>
              <span className="team-role">
                {m.role}
                {m.working_type ? ` · ${m.working_type}` : ""}
              </span>
              <span className="team-project">{m.project}</span>
              <span className="team-current-work">Current Work: {m.task}</span>
              <ProgressBar value={m.progress} />
              <div className="team-card-foot">
                <span>{m.progress}% workload</span>
                <span>{m.tasks} tasks</span>
              </div>
              <div className="team-card-actions">
                <button className="btn btn-secondary btn-sm" onClick={() => setAssigningMember(m)}>
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
        )}
      </section>

      {showAddMember && (
        <AddTeamMemberModal
          onClose={() => setShowAddMember(false)}
          onAdd={async (member) => {
            await onAddMember(member);
            setShowAddMember(false);
          }}
        />
      )}

      {assigningMember && (
        <AssignModal
          member={assigningMember}
          projects={projects}
          onClose={() => setAssigningMember(null)}
          onAssign={(memberId, project, task) => {
            onAssign(memberId, project, task);
            setAssigningMember(null);
          }}
        />
      )}
    </div>
  );
}

function ProgressPage({ projects }) {
  const overall = projects.length ? Math.round(projects.reduce((s, p) => s + p.progress, 0) / projects.length) : 0;
  return (
    <div className="page">
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Overall Progress</h3>
        </div>
        <div className="overall-progress">
          <ProgressBar value={overall} />
          <span>{overall}% complete across all projects</span>
        </div>
      </section>
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Project Milestones</h3>
        </div>
        {projects.length === 0 ? (
          <EmptyState title="No projects yet." subtitle="Milestones from your projects will appear here." />
        ) : (
        <div className="milestone-list">
          {projects.map((p) => (
            <div className="milestone-row" key={p.id}>
              <div className="milestone-main">
                <strong>{p.name}</strong>
                <span>{p.client}</span>
              </div>
              <ProgressBar value={p.progress} />
              <span className="milestone-pct">{p.progress}%</span>
              <StatusBadge status={p.status} />
            </div>
          ))}
        </div>
        )}
      </section>
    </div>
  );
}

function CreateInvoiceModal({ clients, onClose, onCreate }) {
  const [form, setForm] = useState({ client: clients[0]?.name || "", amount: "", due: "", status: "Pending" });
  const [error, setError] = useState("");

  function update(key, val) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  function submit(e) {
    e.preventDefault();
    if (!form.client.trim() || !form.amount || !form.due) {
      setError("Please fill in client, amount and due date.");
      return;
    }
    onCreate({
      id: `INV-${1000 + Math.floor(Math.random() * 9000)}`,
      client: form.client,
      amount: Number(form.amount),
      due: form.due,
      status: form.status,
    });
  }

  return (
    <Modal title="Create Invoice" onClose={onClose}>
      <form className="modal-form" onSubmit={submit} noValidate>
        <label className="field">
          <span>Client</span>
          {clients.length > 0 ? (
            <select value={form.client} onChange={(e) => update("client", e.target.value)}>
              {clients.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          ) : (
            <input value={form.client} onChange={(e) => update("client", e.target.value)} placeholder="e.g. FashionHub" />
          )}
        </label>
        <div className="form-grid-2">
          <label className="field">
            <span>Amount (₹)</span>
            <input type="number" min="0" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="e.g. 45000" />
          </label>
          <label className="field">
            <span>Due Date</span>
            <input type="date" value={form.due} onChange={(e) => update("due", e.target.value)} />
          </label>
        </div>
        <label className="field">
          <span>Status</span>
          <select value={form.status} onChange={(e) => update("status", e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
        {error && <div className="form-error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient">
            Create Invoice
          </button>
        </div>
      </form>
    </Modal>
  );
}

function EditInvoiceModal({ invoice, onClose, onSave }) {
  const [status, setStatus] = useState(invoice.status);

  function submit(e) {
    e.preventDefault();
    onSave(invoice.id, status);
  }

  return (
    <Modal title={`Update ${invoice.id}`} onClose={onClose}>
      <form className="modal-form" onSubmit={submit} noValidate>
        <div className="invoice-edit-summary">
          <div>
            <span>Client</span>
            <strong>{invoice.client}</strong>
          </div>
          <div>
            <span>Amount</span>
            <strong>{formatINR(invoice.amount)}</strong>
          </div>
          <div>
            <span>Due Date</span>
            <strong>{formatDate(invoice.due)}</strong>
          </div>
        </div>
        <label className="field">
          <span>Payment Status</span>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </label>
        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-gradient">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

function InvoicesPage({ invoices, clients, onCreateInvoice, onUpdateInvoiceStatus }) {
  const [showCreate, setShowCreate] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const total = invoices.reduce((s, i) => s + i.amount, 0);
  const paid = invoices.filter((i) => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const pending = invoices.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);
  return (
    <div className="page">
      <div className="stat-grid reveal">
        <StatCard icon="invoice" label="Total Invoices" value={formatINR(total)} />
        <StatCard icon="check-circle" label="Paid" value={formatINR(paid)} />
        <StatCard icon="clock" label="Pending" value={formatINR(pending)} />
        <StatCard icon="trash" label="Overdue" value={formatINR(overdue)} />
      </div>
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Invoices</h3>
          <button className="btn btn-gradient btn-sm" onClick={() => setShowCreate(true)}>
            <Icon name="plus" size={15} /> Create Invoice
          </button>
        </div>
        {invoices.length === 0 ? (
          <EmptyState title="No invoices yet." subtitle="Invoices you create will show up here." />
        ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((i) => (
                <tr key={i.id}>
                  <td>{i.id}</td>
                  <td>{i.client}</td>
                  <td>{formatINR(i.amount)}</td>
                  <td>{formatDate(i.due)}</td>
                  <td><StatusBadge status={i.status} /></td>
                  <td>
                    <button className="btn btn-secondary btn-sm" onClick={() => setEditingInvoice(i)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </section>

      {editingInvoice && (
        <EditInvoiceModal
          invoice={editingInvoice}
          onClose={() => setEditingInvoice(null)}
          onSave={(id, status) => {
            onUpdateInvoiceStatus(id, status);
            setEditingInvoice(null);
          }}
        />
      )}

      {showCreate && (
        <CreateInvoiceModal
          clients={clients}
          onClose={() => setShowCreate(false)}
          onCreate={(invoice) => {
            onCreateInvoice(invoice);
            setShowCreate(false);
          }}
        />
      )}
    </div>
  );
}

function PaymentsPage() {
  const totalReceived = PAYMENTS.reduce((s, p) => s + p.amount, 0);
  return (
    <div className="page">
      <div className="stat-grid stat-grid-3 reveal">
        <StatCard icon="wallet" label="Total Received" value={formatINR(totalReceived)} />
        <StatCard icon="clock" label="Pending" value={formatINR(0)} />
        <StatCard icon="trend" label="This Month" value={formatINR(0)} />
      </div>
      <section className="panel reveal">
        <div className="panel-head">
          <h3>Payment History</h3>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {PAYMENTS.map((p) => (
                <tr key={p.id}>
                  <td>{p.client}</td>
                  <td>{formatINR(p.amount)}</td>
                  <td>{formatDate(p.date)}</td>
                  <td>{p.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {PAYMENTS.length === 0 && <EmptyState title="No payments yet." subtitle="Payments you receive will show up here." />}
      </section>
    </div>
  );
}

function AnalyticsPage({ projects, teamMembers }) {
  const maxRevenue = Math.max(...REVENUE_MONTHS.map((m) => m.value), 1);
  return (
    <div className="page">
      <div className="dash-grid">
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Revenue Analytics</h3>
          </div>
          <div className="revenue-chart">
            {REVENUE_MONTHS.map((m) => (
              <div className="revenue-col" key={m.label}>
                <div className="revenue-bar-wrap">
                  <div className="revenue-bar" style={{ height: `${(m.value / maxRevenue) * 100}%` }} />
                </div>
                <span className="revenue-label">{m.label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Project Performance</h3>
          </div>
          <div className="milestone-list">
            {projects.length === 0 && <EmptyState title="No projects yet." subtitle="Project performance will appear here." />}
            {projects.map((p) => (
              <div className="milestone-row" key={p.id}>
                <div className="milestone-main">
                  <strong>{p.name}</strong>
                </div>
                <ProgressBar value={p.progress} />
                <span className="milestone-pct">{p.progress}%</span>
              </div>
            ))}
          </div>
        </section>
      </div>
      <div className="dash-grid">
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Client Growth</h3>
          </div>
          <div className="revenue-chart small">
            {[0, 0, 0, 0, 0, 0].map((v, i) => (
              <div className="revenue-col" key={i}>
                <div className="revenue-bar-wrap">
                  <div className="revenue-bar" style={{ height: `${v}%` }} />
                </div>
                <span className="revenue-label">{REVENUE_MONTHS[i].label}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="panel reveal">
          <div className="panel-head">
            <h3>Team Performance</h3>
          </div>
          <div className="team-list">
            {teamMembers.length === 0 && <EmptyState title="No team members yet." subtitle="Team performance will appear here." />}
            {teamMembers.map((m) => (
              <div className="team-row" key={m.id}>
                <Avatar name={m.name} />
                <div className="team-info">
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </div>
                <div className="team-progress">
                  <ProgressBar value={m.progress} />
                  <span>{m.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/* ============================================================
   SETTINGS PAGE
   ============================================================ */
function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="switch-row">
      <span>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        className={`switch ${checked ? "switch-on" : ""}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch-thumb" />
      </button>
    </label>
  );
}

function SettingsPage({ user, theme, setTheme, profilePhoto, memberSince, onSaveProfile, onPhotoUploaded }) {
  // Every Settings value is namespaced to this specific user's id, so
  // different accounts on the same browser never see each other's data,
  // and refreshing always reloads the CURRENT user's own saved data.
  const userKey = (name) => `fp_${name}_${user.id}`;

  const [profile, setProfile] = useState(() => {
    try {
      const raw = localStorage.getItem(userKey("profile"));
      const saved = raw ? JSON.parse(raw) : {};
      return {
        photo: profilePhoto || null,
        fullName: saved.fullName || "",
        email: saved.email || "",
        phone: saved.phone || "",
        jobTitle: saved.jobTitle || "",
        company: saved.company || "",
        location: saved.location || "",
        bio: saved.bio || "",
      };
    } catch {
      return { photo: profilePhoto || null, fullName: "", email: "", phone: "", jobTitle: "", company: "", location: "", bio: "" };
    }
  });
  const [profileSaved, setProfileSaved] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoError, setPhotoError] = useState("");

  // The backend is the source of truth for the photo — fetch it fresh whenever
  // Settings loads, so it's correct even on a hard refresh or server restart.
  useEffect(() => {
    (async () => {
      try {
        const data = await apiGet("/profile");
        // Always apply the result — including null — so a previous user's
        // photo can never remain showing for an account with no photo of its own.
        const url = data.profilePhoto ? resolveImageUrl(data.profilePhoto) : null;
        setProfile((p) => ({ ...p, photo: url }));
        onPhotoUploaded(url);
      } catch {
        // No saved photo yet, or can't reach the server — keep whatever is already showing.
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [personal, setPersonal] = useState(() => {
    try {
      const raw = localStorage.getItem(userKey("personal"));
      const saved = raw ? JSON.parse(raw) : {};
      return {
        fullName: saved.fullName || "",
        email: saved.email || "",
        phone: saved.phone || "",
        dob: saved.dob || "",
        gender: saved.gender || "",
        address: saved.address || "",
        city: saved.city || "",
        state: saved.state || "",
        country: saved.country || "",
      };
    } catch {
      return { fullName: "", email: "", phone: "", dob: "", gender: "", address: "", city: "", state: "", country: "" };
    }
  });
  const [personalSaved, setPersonalSaved] = useState(false);

  const [notifications, setNotifications] = useState(() => {
    try {
      const raw = localStorage.getItem(userKey("notifications"));
      return raw
        ? JSON.parse(raw)
        : { email: true, projectUpdates: true, taskAssignments: true, payments: true, invoices: true, teamActivity: false };
    } catch {
      return { email: true, projectUpdates: true, taskAssignments: true, payments: true, invoices: true, teamActivity: false };
    }
  });

  const [security, setSecurity] = useState({ current: "", next: "", confirm: "" });
  const [securityMsg, setSecurityMsg] = useState("");

  function updateProfile(key, val) {
    setProfile((p) => ({ ...p, [key]: val }));
  }

  async function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Instant local preview only, while the real upload is in flight —
    // this is never used as the permanent source, just a placeholder.
    const reader = new FileReader();
    reader.onload = () => updateProfile("photo", reader.result);
    reader.readAsDataURL(file);

    setPhotoUploading(true);
    setPhotoError("");
    try {
      const data = await apiUpload("/profile/upload-image", file, "image");
      const permanentUrl = resolveImageUrl(data.imageUrl);
      updateProfile("photo", permanentUrl);
      onPhotoUploaded(permanentUrl);
    } catch (err) {
      setPhotoError(err.message);
    } finally {
      setPhotoUploading(false);
    }
  }

  function saveProfile(e) {
    e.preventDefault();
    const { photo, ...rest } = profile;
    localStorage.setItem(userKey("profile"), JSON.stringify(rest));
    onSaveProfile(profile);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2600);
  }

  function updatePersonal(key, val) {
    setPersonal((p) => ({ ...p, [key]: val }));
  }

  function savePersonal(e) {
    e.preventDefault();
    localStorage.setItem(userKey("personal"), JSON.stringify(personal));
    setPersonalSaved(true);
    setTimeout(() => setPersonalSaved(false), 2600);
  }

  function toggleNotification(key) {
    setNotifications((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem(userKey("notifications"), JSON.stringify(next));
      return next;
    });
  }

  function updateSecurity(key, val) {
    setSecurity((s) => ({ ...s, [key]: val }));
  }

  function submitSecurity(e) {
    e.preventDefault();
    if (!security.current) {
      setSecurityMsg("Enter your current password.");
      return;
    }
    if (security.next.length < 6) {
      setSecurityMsg("New password must be at least 6 characters.");
      return;
    }
    if (security.next !== security.confirm) {
      setSecurityMsg("New passwords do not match.");
      return;
    }
    setSecurityMsg("Password updated successfully.");
    setSecurity({ current: "", next: "", confirm: "" });
    setTimeout(() => setSecurityMsg(""), 3000);
  }

  const quickNav = [
    { id: "settings-profile", label: "Profile" },
    { id: "settings-personal", label: "Personal Details" },
    { id: "settings-notifications", label: "Notifications" },
    { id: "settings-account", label: "Account" },
    { id: "settings-security", label: "Security" },
    { id: "settings-appearance", label: "Appearance" },
  ];

  function scrollTo(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="page">
      <div className="settings-quicknav reveal">
        {quickNav.map((n) => (
          <button key={n.id} type="button" className="chip settings-quicknav-btn" onClick={() => scrollTo(n.id)}>
            {n.label}
          </button>
        ))}
      </div>

      <section id="settings-profile" className="panel reveal">
        <div className="panel-head">
          <h3>Profile</h3>
        </div>
        <div className="settings-photo-row">
          <Avatar name={profile.fullName || user.name} size={72} photoUrl={profile.photo} />
          <div>
            <label className="btn btn-secondary btn-sm settings-photo-btn">
              <Icon name="camera" size={15} /> {photoUploading ? "Uploading…" : "Change Photo"}
              <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" onChange={handlePhotoChange} disabled={photoUploading} hidden />
            </label>
            <p className={`settings-photo-hint ${photoError ? "settings-photo-hint-error" : ""}`}>
              {photoError ? photoError : "JPG, PNG or WEBP, up to 5MB."}
            </p>
          </div>
        </div>
        <form className="modal-form" onSubmit={saveProfile} noValidate>
          <div className="form-grid-2">
            <label className="field">
              <span>Full Name</span>
              <input value={profile.fullName} onChange={(e) => updateProfile("fullName", e.target.value)} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={profile.email} onChange={(e) => updateProfile("email", e.target.value)} />
            </label>
          </div>
          <div className="form-grid-2">
            <label className="field">
              <span>Phone Number</span>
              <input value={profile.phone} onChange={(e) => updateProfile("phone", e.target.value)} placeholder="e.g. +91 98765 43210" />
            </label>
            <label className="field">
              <span>Job Title</span>
              <input value={profile.jobTitle} onChange={(e) => updateProfile("jobTitle", e.target.value)} placeholder="e.g. Founder" />
            </label>
          </div>
          <div className="form-grid-2">
            <label className="field">
              <span>Company Name</span>
              <input value={profile.company} onChange={(e) => updateProfile("company", e.target.value)} />
            </label>
            <label className="field">
              <span>Location</span>
              <input value={profile.location} onChange={(e) => updateProfile("location", e.target.value)} placeholder="e.g. Madurai, India" />
            </label>
          </div>
          <label className="field">
            <span>Bio</span>
            <textarea rows={3} value={profile.bio} onChange={(e) => updateProfile("bio", e.target.value)} placeholder="A short line about you or your studio" />
          </label>
          {profileSaved && <div className="settings-success">Profile updated successfully.</div>}
          <div className="modal-actions settings-actions-left">
            <button type="submit" className="btn btn-gradient">
              Save Changes
            </button>
          </div>
        </form>
      </section>

      <section id="settings-personal" className="panel reveal">
        <div className="panel-head">
          <h3>Personal Details</h3>
        </div>
        <form className="modal-form" onSubmit={savePersonal} noValidate>
          <div className="form-grid-2">
            <label className="field">
              <span>Full Name</span>
              <input value={personal.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} />
            </label>
            <label className="field">
              <span>Email</span>
              <input type="email" value={personal.email} onChange={(e) => updatePersonal("email", e.target.value)} />
            </label>
          </div>
          <div className="form-grid-2">
            <label className="field">
              <span>Phone</span>
              <input value={personal.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
            </label>
            <label className="field">
              <span>Date of Birth</span>
              <input type="date" value={personal.dob} onChange={(e) => updatePersonal("dob", e.target.value)} />
            </label>
          </div>
          <label className="field">
            <span>Gender</span>
            <select value={personal.gender} onChange={(e) => updatePersonal("gender", e.target.value)}>
              <option value="">Prefer not to say</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </label>
          <label className="field">
            <span>Address</span>
            <input value={personal.address} onChange={(e) => updatePersonal("address", e.target.value)} />
          </label>
          <div className="form-grid-3">
            <label className="field">
              <span>City</span>
              <input value={personal.city} onChange={(e) => updatePersonal("city", e.target.value)} />
            </label>
            <label className="field">
              <span>State</span>
              <input value={personal.state} onChange={(e) => updatePersonal("state", e.target.value)} />
            </label>
            <label className="field">
              <span>Country</span>
              <input value={personal.country} onChange={(e) => updatePersonal("country", e.target.value)} />
            </label>
          </div>
          {personalSaved && <div className="settings-success">Personal details saved.</div>}
          <div className="modal-actions settings-actions-left">
            <button type="submit" className="btn btn-gradient">
              Save Personal Details
            </button>
          </div>
        </form>
      </section>

      <section id="settings-notifications" className="panel reveal">
        <div className="panel-head">
          <h3>Notifications</h3>
        </div>
        <div className="switch-list">
          <ToggleSwitch label="Email Notifications" checked={notifications.email} onChange={() => toggleNotification("email")} />
          <ToggleSwitch label="Project Updates" checked={notifications.projectUpdates} onChange={() => toggleNotification("projectUpdates")} />
          <ToggleSwitch label="Task Assignments" checked={notifications.taskAssignments} onChange={() => toggleNotification("taskAssignments")} />
          <ToggleSwitch label="Payment Notifications" checked={notifications.payments} onChange={() => toggleNotification("payments")} />
          <ToggleSwitch label="Invoice Notifications" checked={notifications.invoices} onChange={() => toggleNotification("invoices")} />
          <ToggleSwitch label="Team Activity" checked={notifications.teamActivity} onChange={() => toggleNotification("teamActivity")} />
        </div>
      </section>

      <section id="settings-account" className="panel reveal">
        <div className="panel-head">
          <h3>Account</h3>
        </div>
        <div className="settings-account-grid">
          <div>
            <strong className="settings-account-value">{user.email}</strong>
            <span>Account Email</span>
          </div>
          <div>
            <strong className="settings-account-value">Professional</strong>
            <span>Account Type</span>
          </div>
          <div>
            <strong className="settings-account-value">{memberSince}</strong>
            <span>Member Since</span>
          </div>
          <div>
            <StatusBadge status="Active" />
            <span>Account Status</span>
          </div>
        </div>
      </section>

      <section id="settings-security" className="panel reveal">
        <div className="panel-head">
          <h3>Security</h3>
        </div>
        <h4 className="panel-subhead">Change Password</h4>
        <form className="modal-form" onSubmit={submitSecurity} noValidate>
          <label className="field">
            <span>Current Password</span>
            <input type="password" value={security.current} onChange={(e) => updateSecurity("current", e.target.value)} />
          </label>
          <div className="form-grid-2">
            <label className="field">
              <span>New Password</span>
              <input type="password" value={security.next} onChange={(e) => updateSecurity("next", e.target.value)} placeholder="At least 6 characters" />
            </label>
            <label className="field">
              <span>Confirm New Password</span>
              <input type="password" value={security.confirm} onChange={(e) => updateSecurity("confirm", e.target.value)} />
            </label>
          </div>
          {securityMsg && (
            <div className={securityMsg.includes("successfully") ? "settings-success" : "form-error"}>{securityMsg}</div>
          )}
          <div className="modal-actions settings-actions-left">
            <button type="submit" className="btn btn-gradient">
              Update Password
            </button>
          </div>
        </form>
      </section>

      <section id="settings-appearance" className="panel reveal">
        <div className="panel-head">
          <h3>Appearance</h3>
        </div>
        <p className="panel-head-note settings-appearance-note">Theme</p>
        <div className="theme-option-row">
          <button
            type="button"
            className={`theme-option ${theme === "light" ? "theme-option-active" : ""}`}
            onClick={() => setTheme("light")}
          >
            <Icon name="sun" size={18} />
            <span>Light</span>
          </button>
          <button
            type="button"
            className={`theme-option ${theme === "dark" ? "theme-option-active" : ""}`}
            onClick={() => setTheme("dark")}
          >
            <Icon name="moon" size={18} />
            <span>Dark</span>
          </button>
        </div>
      </section>
    </div>
  );
}

/* ============================================================
   API LAYER — talks to server.js / MySQL
   ============================================================ */
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("fp_token");
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {}),
      },
    });
  } catch {
    throw new Error("Can't reach the server. Is `npm run dev` running in flowpath-backend?");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

const apiGet = (path) => apiRequest(path);
const apiPost = (path, body) => apiRequest(path, { method: "POST", body: JSON.stringify(body) });
const apiPatch = (path, body) => apiRequest(path, { method: "PATCH", body: JSON.stringify(body) });
const apiPut = (path, body) => apiRequest(path, { method: "PUT", body: JSON.stringify(body) });

// File uploads need multipart/form-data, not JSON — separate from apiRequest above.
async function apiUpload(path, file, fieldName) {
  const token = localStorage.getItem("fp_token");
  const formData = new FormData();
  formData.append(fieldName, file);
  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
  } catch {
    throw new Error("Can't reach the server. Is `npm run dev` running in flowpath-backend?");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Upload failed. Please try again.");
  return data;
}

// The backend returns image paths like "/uploads/profile/xyz.png" — this
// turns that into a full URL the <img> tag can actually load.
const IMAGE_BASE_URL = API_URL.replace(/\/api\/?$/, "");
function resolveImageUrl(imagePath) {
  if (!imagePath) return null;
  if (/^https?:\/\//.test(imagePath)) return imagePath;
  if (imagePath.startsWith("data:")) return imagePath;
  return `${IMAGE_BASE_URL}${imagePath}`;
}

/* ============================================================
   ROOT APP
   ============================================================ */
export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("fp_theme") || "light");
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("fp_auth");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [authView, setAuthView] = useState("login");
  const [otpEmail, setOtpEmail] = useState("");
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [teamMembers, setTeamMembers] = useState(INITIAL_TEAM);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [dataLoadError, setDataLoadError] = useState("");
  const [memberSince] = useState(() => {
    let stored = localStorage.getItem("fp_member_since");
    if (!stored) {
      stored = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" });
      localStorage.setItem("fp_member_since", stored);
    }
    return stored;
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fp_theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }

  async function handleLogin({ email, password }) {
    const data = await apiPost("/auth/login", { email, password });
    localStorage.setItem("fp_auth", JSON.stringify(data.user));
    localStorage.setItem("fp_token", data.token);
    setUser(data.user);
    setActivePage("dashboard");
  }

  async function handleSignup({ name, email, password }) {
    const data = await apiPost("/auth/signup", { name, email, password });
    localStorage.setItem("fp_auth", JSON.stringify(data.user));
    localStorage.setItem("fp_token", data.token);
    setUser(data.user);
    setActivePage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("fp_auth");
    localStorage.removeItem("fp_token");
    setUser(null);
    setProfilePhoto(null);
    setAuthView("login");
  }

  useEffect(() => {
    if (!user) return;
    setDataLoadError("");
    apiGet("/projects")
      .then(setProjects)
      .catch((err) => {
        console.error("Failed to load projects:", err.message);
        setDataLoadError("Failed to load projects. Please check your connection and try again.");
      });
    apiGet("/clients")
      .then(setClients)
      .catch((err) => {
        console.error("Failed to load clients:", err.message);
        setDataLoadError("Failed to load clients. Please check your connection and try again.");
      });
    apiGet("/team")
      .then(setTeamMembers)
      .catch((err) => {
        console.error("Failed to load team:", err.message);
        setDataLoadError("Failed to load team members. Please check your connection and try again.");
      });
    apiGet("/invoices")
      .then(setInvoices)
      .catch((err) => {
        console.error("Failed to load invoices:", err.message);
        setDataLoadError("Failed to load invoices. Please check your connection and try again.");
      });
    apiGet("/profile")
      .then((prof) => {
        // Always set it — including to null — so a previous user's photo
        // can never linger in memory for an account that has no photo of its own.
        setProfilePhoto(prof.profilePhoto ? resolveImageUrl(prof.profilePhoto) : null);
      })
      .catch((err) => console.error("Failed to load profile photo:", err.message));
  }, [user]);

  async function handleCreateProject(project) {
    try {
      const created = await apiPost("/projects", {
        name: project.name,
        client: project.client,
        type: project.type,
        description: project.description,
        dueDate: project.dueDate,
        price: project.price,
      });
      setProjects((prev) => [created, ...prev]);
      const freshClients = await apiGet("/clients");
      setClients(freshClients);
      setShowAddModal(false);
      setToast(true);
      setTimeout(() => setToast(false), 2600);
    } catch (err) {
      window.alert(`Couldn't create the project: ${err.message}`);
    }
  }

  async function handleEditProject(id, data) {
    const updated = await apiPut(`/projects/${id}`, data);
    setProjects((prev) => prev.map((p) => (p.id === id ? updated : p)));
    const freshClients = await apiGet("/clients");
    setClients(freshClients);
  }

  async function handleAddTeamMember(member) {
    const created = await apiPost("/team", {
      name: member.name,
      email: member.email,
      role: member.role,
      workingType: member.workingType,
    });
    setTeamMembers((prev) => [...prev, created]);
  }

  async function handleAssignWork(memberId, project, task) {
    try {
      const updated = await apiPatch(`/team/${memberId}/assign`, { project, task });
      setTeamMembers((prev) => prev.map((m) => (m.id === memberId ? updated : m)));
    } catch (err) {
      window.alert(`Couldn't assign work: ${err.message}`);
    }
  }

  async function handleCreateInvoice(invoice) {
    try {
      const created = await apiPost("/invoices", {
        client: invoice.client,
        amount: invoice.amount,
        due: invoice.due,
        status: invoice.status,
      });
      setInvoices((prev) => [created, ...prev]);
    } catch (err) {
      window.alert(`Couldn't create the invoice: ${err.message}`);
    }
  }

  async function handleUpdateInvoiceStatus(invoiceId, status) {
    try {
      const updated = await apiPatch(`/invoices/${invoiceId}`, { status });
      setInvoices((prev) => prev.map((inv) => (inv.id === invoiceId ? updated : inv)));
    } catch (err) {
      window.alert(`Couldn't update the invoice: ${err.message}`);
    }
  }

  function handleSaveProfile(profileData) {
    if (profileData.fullName && profileData.fullName !== user.name) {
      const updatedUser = { ...user, name: profileData.fullName };
      setUser(updatedUser);
      localStorage.setItem("fp_auth", JSON.stringify(updatedUser));
    }
  }

  function handlePhotoUploaded(url) {
    setProfilePhoto(url);
  }

  function navigate(page) {
    setActivePage(page);
    setSidebarOpen(false);
  }

  if (!user) {
    if (authView === "login") return <Login onLogin={handleLogin} goTo={setAuthView} />;
    if (authView === "signup") return <Signup onSignup={handleSignup} goTo={setAuthView} />;
    if (authView === "forgot")
      return (
        <ForgotPassword
          goTo={setAuthView}
          onSendOtp={(email) => {
            setOtpEmail(email);
            setAuthView("otp");
          }}
        />
      );
    if (authView === "otp") return <OtpVerification goTo={setAuthView} email={otpEmail} />;
    if (authView === "reset") return <ResetPassword goTo={setAuthView} onReset={() => setAuthView("success")} />;
    if (authView === "success") return <ResetSuccess goTo={setAuthView} />;
    return <Login onLogin={handleLogin} goTo={setAuthView} />;
  }

  let pageContent;
  if (activePage === "dashboard") pageContent = <Dashboard projects={projects} clients={clients} teamMembers={teamMembers} />;
  else if (activePage === "projects")
    pageContent = (
      <Projects
        projects={projects}
        onAddProject={() => setShowAddModal(true)}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
        onCreate={handleCreateProject}
        onEditProject={handleEditProject}
      />
    );
  else if (activePage === "clients") pageContent = <Clients clients={clients} />;
  else if (activePage === "tasks") pageContent = <TasksPage />;
  else if (activePage === "team")
    pageContent = (
      <TeamPage
        teamMembers={teamMembers}
        projects={projects}
        onAddMember={handleAddTeamMember}
        onAssign={handleAssignWork}
      />
    );
  else if (activePage === "progress") pageContent = <ProgressPage projects={projects} />;
  else if (activePage === "invoices")
    pageContent = (
      <InvoicesPage
        invoices={invoices}
        clients={clients}
        onCreateInvoice={handleCreateInvoice}
        onUpdateInvoiceStatus={handleUpdateInvoiceStatus}
      />
    );
  else if (activePage === "payments") pageContent = <PaymentsPage />;
  else if (activePage === "analytics") pageContent = <AnalyticsPage projects={projects} teamMembers={teamMembers} />;
  else if (activePage === "settings")
    pageContent = (
      <SettingsPage
        user={user}
        theme={theme}
        setTheme={setTheme}
        profilePhoto={profilePhoto}
        memberSince={memberSince}
        onSaveProfile={handleSaveProfile}
        onPhotoUploaded={handlePhotoUploaded}
      />
    );

  return (
    <div className="app-shell">
      <Sidebar
        active={activePage}
        onNavigate={navigate}
        user={user}
        onLogout={handleLogout}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        profilePhoto={profilePhoto}
      />
      <div className="app-main">
        <Header
          page={activePage}
          user={user}
          theme={theme}
          onToggleTheme={toggleTheme}
          onMenu={() => setSidebarOpen(true)}
          profilePhoto={profilePhoto}
        />
        <main className="app-content">
          {dataLoadError && <div className="form-error data-load-error">{dataLoadError}</div>}
          <div className="page-title-row">
            <div>
              <h1>{PAGE_META[activePage].title}</h1>
              <p>{PAGE_META[activePage].subtitle}</p>
            </div>
          </div>
          {pageContent}
        </main>
      </div>
      {showAddModal && activePage !== "projects" && (
        <AddProjectModal onClose={() => setShowAddModal(false)} onCreate={handleCreateProject} />
      )}
      <Toast message="Project created successfully" show={toast} />
    </div>
  );
}