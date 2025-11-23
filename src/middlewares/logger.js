const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// buat folder logs kalau belum ada
const logDirectory = path.join(__dirname, "../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

const logger = morgan("combined", { stream: accessLogStream });

module.exports = logger;
