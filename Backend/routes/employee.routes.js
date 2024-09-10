// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controlle
//imort multe for image upload
//import file path
const path = require("path");
const employeeController = require("../controllers/employee.controller");
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// Create a route to handle the add employee request on post
//import multer middleware from middlewares folder
const upload = require("../config/multer.config");

router.post(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  upload.single("employee_image"),
  employeeController.createEmployee
);
// Create a route to handle the get all employees request on get
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);
// Create a route to handle the update employee request on put
router.put(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee
);
//delete employee
router.delete(
  "/api/employee/:employeeId",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee
);
// Export the router
module.exports = router;
