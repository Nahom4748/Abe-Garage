// src/routes/news.routes.js

const express = require("express");
const router = express.Router();

const newsController = require("../controllers/news.controller");

router.post("/api/news", newsController.createNews);

router.get("/api/news", newsController.getAllNews);

router.get("/api/news/:id", newsController.getNewsById);

router.put("/api/news/:id", newsController.updateNews);

router.delete("/api/news/:id", newsController.deleteNews);

module.exports = router;
