const express = require("express");
const multer = require("multer");
const path = require("path");
const employeeController = require("../controllers/employee.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Create a route to handle the add employee request on POST
router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  upload.single("file"),
  employeeController.createEmployee
);

// Create a route to handle the get all employees request on GET
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);

// Create a route to han
// Export the router
module.exports = router;
