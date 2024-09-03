const newsService = require("../services/news.service");

async function createNews(req, res) {
  try {
    const newsData = req.body;
    const news = await newsService.createNews(newsData);
    res.status(200).json(news); //
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create news post" });
  }
}

async function getAllNews(req, res) {
  try {
    const news = await newsService.getAllNews();
    res.status(200).json(news);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve news posts" });
  }
}

async function getNewsById(req, res) {
  try {
    const newsId = req.params.id;
    const news = await newsService.getNewsById(newsId);
    if (!news) {
      res.status(404).json({ error: "News post not found" });
    } else {
      res.status(200).json(news);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve news post" });
  }
}

async function updateNews(req, res) {
  try {
    const newsId = req.params.id;
    const updatedNewsData = req.body;
    const news = await newsService.updateNews(newsId, updatedNewsData);
    if (!news) {
      res.status(404).json({ error: "News post not found" });
    } else {
      res.status(200).json(news);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update news post" });
  }
}

async function deleteNews(req, res) {
  try {
    const newsId = req.params.id;
    const result = await newsService.deleteNews(newsId);
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "News post not found" });
    } else {
      res.status(200).json({ message: "News post deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete news post" });
  }
}

module.exports = {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
};
