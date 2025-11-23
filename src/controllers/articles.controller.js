let articles = require("../data/articles.data");

// GET ALL
exports.getArticles = (req, res) => {
  res.json({
    success: true,
    message: "List semua artikel",
    data: articles
  });
};

// GET BY ID
exports.getArticleById = (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Artikel tidak ditemukan"
    });
  }

  res.json({
    success: true,
    data: article
  });
};

// CREATE
exports.createArticle = (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({
      success: false,
      message: "Title dan Content wajib diisi"
    });
  }

  const newArticle = {
    id: articles.length + 1,
    title,
    content
  };

  articles.push(newArticle);

  res.status(201).json({
    success: true,
    message: "Artikel berhasil ditambahkan",
    data: newArticle
  });
};

// UPDATE
exports.updateArticle = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content } = req.body;

  const article = articles.find(a => a.id === id);

  if (!article) {
    return res.status(404).json({
      success: false,
      message: "Artikel tidak ditemukan"
    });
  }

  article.title = title || article.title;
  article.content = content || article.content;

  res.json({
    success: true,
    message: "Artikel berhasil diperbarui",
    data: article
  });
};

// DELETE
exports.deleteArticle = (req, res) => {
  const id = parseInt(req.params.id);

  const exists = articles.some(a => a.id === id);

  if (!exists) {
    return res.status(404).json({
      success: false,
      message: "Artikel tidak ditemukan"
    });
  }

  articles = articles.filter(a => a.id !== id);

  res.json({
    success: true,
    message: "Artikel berhasil dihapus"
  });
};
