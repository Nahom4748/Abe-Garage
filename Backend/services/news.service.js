// src/services/news.service.js
const { query } = require("../config/db.config"); // Import the query function

async function createNews(newsData) {
  const { title, content } = newsData;
  const sql = "INSERT INTO news (title, content) VALUES (?, ?)";
  const result = await query(sql, [title, content]);
  return { id: result.insertId, ...newsData };
}

async function getAllNews() {
  const sql = "SELECT * FROM news";
  const rows = await query(sql);
  return rows;
}

async function getNewsById(id) {
  const sql = "SELECT * FROM news WHERE id = ?";
  const rows = await query(sql, [id]);
  return rows[0];
}

async function updateNews(id, updatedData) {
  const { title, content } = updatedData;
  const sql = "UPDATE news SET title = ?, content = ? WHERE id = ?";
  const result = await query(sql, [title, content, id]);
  return result.affectedRows > 0 ? { id, ...updatedData } : null;
}

async function deleteNews(id) {
  const sql = "DELETE FROM news WHERE id = ?";
  const result = await query(sql, [id]);
  return result;
}

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
