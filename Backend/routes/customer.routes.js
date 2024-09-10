//import the express module
const express = require("express");
//import the router method from express
const router = express.Router();
//import the customer controller
const customerController = require("../controllers/customer.controller");
const authMiddleware = require("../middlewares/auth.middleware");
//create a route for the customer controller request a post request
router.post(
  "/api/customer",
  // [authMiddleware.verifyToken, authMiddleware.isAdmin],
  customerController.createCustomer
);
//create a route for the customer controller request a get all customers request
router.get("/api/customers", customerController.getAllCustomers);
//create a route for the customer controller request a get customer by id request
router.get("/api/customer/:id", customerController.getCustomerById);
//export the router
module.exports = router;
