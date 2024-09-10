// Import the express module
const express = require("express");
// Import the dotenv module and call the config method to load the environment variables
require("dotenv").config();
// Import the sanitizer module
const sanitize = require("sanitize");
// Import the CORS module
const cors = require("cors");
//path module
const path = require("path");
// Set up the CORS options to allow requests from our front-end
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};
// Create a variable to hold our port number
const port = process.env.PORT;
// Import the router
const router = require("./routes");
// Import the path module
// Create the webserver
const app = express();
// Add the CORS middleware
app.use(cors(corsOptions));
// Add the express.static middleware to serve static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.urlencoded({ extended: true }));
// Add the express.json middleware to the application
app.use(express.json());
// Add the sanitizer to the express middleware
app.use(sanitize.middleware);
// Add the routes to the application as middleware
app.use(router);
// Start the webserver
app.listen(port, () => {
  console.log(`Server running on port from your backend: ${port}`);
});
// Export the webserver for use in the application
module.exports = app;
