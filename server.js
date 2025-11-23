// ===============================
// SERVER.JS FINAL FIX (NO ERRORS)
// ===============================

// Tidak ada dotenv di sini! dotenv hanya di-load dari app.js
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
