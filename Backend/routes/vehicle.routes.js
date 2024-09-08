// Import the express module
const express = require("express");
// Import the router method from express
const router = express.Router();
// Import the vehicle controller
const vehicleController = require("../controllers/vehicle.controller");

// Create a route for the vehicle controller request with a POST request
router.post("/api/vehicle", vehicleController.createVehicle);
// create a route for the vehicle controller request with a GET all vehicles request
router.get("/api/vehicles/:customer_id", vehicleController.getAllVehicles);
// create a route for the vehicle controller request with a GET vehicle by id request
router.get("/api/vehicle/:id", vehicleController.getVehicleById);
//create a route for the vehicle controller request with a PUT request
router.put("/api/vehicle/", vehicleController.updateVehicle);

// Export the router
module.exports = router;
