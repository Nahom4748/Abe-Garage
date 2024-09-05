// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the customer controller
const customerController = require("../controllers/customer.controller");
// create a route to handle the add customer
router.post("/api/customer", customerController.createCustomer);
// Export the router
module.exports = router;
