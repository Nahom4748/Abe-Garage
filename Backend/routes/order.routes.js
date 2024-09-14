const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// Define the route for adding a new order
router.post("/api/order", orderController.addOrder);
// Define the route for retrieving all orders
router.get("/api/orders", orderController.getAllOrders);

// Export the router
module.exports = router;
