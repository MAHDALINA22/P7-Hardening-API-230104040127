// ============================
// APP.JS FINAL OPTIMIZED VERSION
// Praktikum 7 – Hardening API
// ============================

require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const rateLimit = require("express-rate-limit");

const app = express();

// ==================================================
// 1. Basic middleware
// ==================================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

// ==================================================
// 2. CORS configuration
// ==================================================
const allowed = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const corsOptions = allowed.length
  ? {
      origin: function (origin, callback) {
        if (!origin || allowed.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      },
    }
  : { origin: "*" };

app.use(cors(corsOptions));

// ==================================================
// 3. Rate Limit  (GLOBAL LIMITER)
// ==================================================
const limiter = rateLimit({
  windowMs: (process.env.RATE_LIMIT_WINDOW_MIN || 1) * 60 * 1000, 
  max: process.env.RATE_LIMIT_MAX || 5,
  message: {
    success: false,
    message: "Terlalu banyak request dari IP ini, coba lagi nanti.",
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// ==================================================
// 4. Logging (Morgan)
// ==================================================
const logsDir = path.join(__dirname, "src", "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const accessLogStream = fs.createWriteStream(
  path.join(logsDir, "access.log"),
  { flags: "a" }
);

app.use(morgan("dev"));
app.use(morgan("combined", { stream: accessLogStream }));

// ==================================================
// 5. Routes (Articles)
// ==================================================
const articleRoutes = require("./src/routes/articles.routes");
app.use("/api/articles", articleRoutes);

// ==================================================
// 6. Health, Info & Metrics Monitoring
// ==================================================

// 6A. Health
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
    env: process.env.NODE_ENV || "development",
  });
});

// 6B. Info  ←← TAMBAHAN SESUAI TABEL MODUL
app.get("/api/info", (req, res) => {
  res.status(200).json({
    service: "Article API Service",
    version: "1.0.0",
    author: "Mahdeeeee",
    env: process.env.NODE_ENV || "development",
    time: new Date(),
  });
});

// 6C. Metrics
app.get("/api/metrics", (req, res) => {
  res.status(200).json({
    memory: process.memoryUsage(),
    uptime: process.uptime(),
    node: process.version,
    platform: process.platform,
  });
});

// ==================================================
// 7. 404 Handler
// ==================================================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint tidak ditemukan",
  });
});

// ==================================================
// 8. Global Error Handler
// ==================================================
app.use((err, req, res, next) => {
  console.error("ERROR =>", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
