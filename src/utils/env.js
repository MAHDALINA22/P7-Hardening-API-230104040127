require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX)
};
