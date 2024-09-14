// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the items controller
const itemController = require("../controllers/item.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Create a route for creating an item (POST request)
router.post(
  "/api/item",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin], // Uncomment for authentication and authorization
  itemController.createItem
);

// Create a route for getting all items (GET request)
router.get(
  "/api/items",
  //   [authMiddleware.verifyToken, authMiddleware.isAdmin],
  itemController.getAllItems
);
// Uncomment for authentication and authorization
// Create a route for getting an item by name (GET request)
router.get("/api/item/:item_name", itemController.getItemByName); // Updated route

// Export the router
module.exports = router;
