-- ============================================================
-- Flowpath database schema
-- Run this entire file in MySQL Workbench (File > Open SQL Script,
-- then the lightning-bolt "Execute" button) before starting server.js
-- ============================================================

CREATE DATABASE IF NOT EXISTS flowpath_db;
USE flowpath_db;

-- Users (real authentication instead of the old localStorage demo)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Profile images (permanent, uploaded via multer into uploads/profile/)
CREATE TABLE IF NOT EXISTS profiles (
  user_id INT PRIMARY KEY,
  profile_photo VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Clients
CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  company VARCHAR(160),
  projects INT DEFAULT 0,
  revenue DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'New',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(160) NOT NULL,
  client VARCHAR(160) NOT NULL,
  type VARCHAR(100),
  description TEXT,
  due_date DATE,
  price DECIMAL(12,2) DEFAULT 0,
  progress INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'On Track',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160),
  role VARCHAR(120),
  project VARCHAR(160) DEFAULT '—',
  task VARCHAR(255) DEFAULT 'Not assigned yet',
  progress INT DEFAULT 0,
  tasks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices (id matches the frontend's "INV-xxxx" format, so it's a string key)
CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(20) PRIMARY KEY,
  client VARCHAR(160) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  due_date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);