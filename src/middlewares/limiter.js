const rateLimit = require("express-rate-limit");
const { RATE_LIMIT_MAX } = require("../utils/env");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: RATE_LIMIT_MAX || 100,
  message: {
    success: false,
    message: "Terlalu banyak request, silakan coba lagi nanti."
  },
});

module.exports = limiter;
