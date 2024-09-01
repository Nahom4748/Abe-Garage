// src/routes/news.routes.js

const express = require("express");
const router = express.Router();

const newsController = require("../controllers/news.controller");

// Route to handle creating a new news post
router.post("/api/news", newsController.createNews);

// Route to handle getting all news posts
router.get("/api/news", newsController.getAllNews);

// Route to handle getting a specific news post by ID
router.get("/api/news/:id", newsController.getNewsById);

// Route to handle updating a news post
router.put("/api/news/:id", newsController.updateNews);

// Route to handle deleting a news post
router.delete("/api/news/:id", newsController.deleteNews);

module.exports = router;
