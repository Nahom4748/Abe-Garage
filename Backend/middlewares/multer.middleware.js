const multer = require("multer");
const path = require("path");

// Configure storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be uploaded
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // File naming
  },
});

// Create multer instance
const upload = multer({ storage });
module.exports = upload;
