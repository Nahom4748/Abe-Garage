const path = require("path");
const employeeService = require("../services/employee.service");

// Create the add employee controller
async function createEmployee(req, res, next) {
  try {
    // Check if employee already exists
    const employeeExists = await employeeService.checkIfEmployeeExists(
      req.body.employee_email
    );
    if (employeeExists) {
      return res
        .status(400)
        .json({
          error:
            "This email address is already associated with another employee!",
        });
    }

    // Prepare employee data
    const employeeData = { ...req.body };
    // Include image path if file is uploaded
    if (req.file) {
      employeeData.employee_image_path = req.file.path;
    }

    // Create the employee
    const employee = await employeeService.createEmployee(employeeData);
    if (!employee) {
      return res.status(400).json({ error: "Failed to add the employee!" });
    }

    res.status(200).json({ status: "true" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  try {
    const employees = await employeeService.getAllEmployees();
    if (!employees) {
      return res.status(400).json({ error: "Failed to get all employees!" });
    }
    res.status(200).json({ status: "success", data: employees });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Export the controllers
module.exports = {
  createEmployee,
  getAllEmployees,
};
