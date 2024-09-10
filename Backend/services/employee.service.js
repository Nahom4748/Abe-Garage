// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");

// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(row1, row2, row3, employee_password) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee,added_date,employee_image) VALUES (?,?,NOW(),?)";
    const rows = await conn.query(query, [row1[0], row1[1], row1[2]]);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await conn.query(query2, [
      employee_id,
      row2[0],
      row2[1],
      row2[2],
    ]);
    if (rows2.affectedRows !== 1) {
      return false;
    }
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await conn.query(query3, [employee_id, hashedPassword]);
    if (rows3.affectedRows !== 1) {
      return false;
    }
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await conn.query(query4, [employee_id, row3[0]]);
    if (rows4.affectedRows !== 1) {
      return false;
    } else {
      console.log("employee created");
      return true;
    }
    // construct to the employee object to return
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
}
// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await conn.query(query, [employee_email]);
  return rows;
}
// A function to get all employees
const getAllEmployees = async () => {
  try {
    // Fetch employee data including image URL
    const rows = await conn.query(`
      SELECT e.employee_id, e.employee_email, e.active_employee, e.added_date, e.employee_image,
             ei.employee_first_name, ei.employee_last_name, ei.employee_phone,
             er.company_role_id
      FROM employee e
      JOIN employee_info ei ON e.employee_id = ei.employee_id
      JOIN employee_role er ON e.employee_id = er.employee_id
    `);

    // Construct full image URL if using a URL or static path
    const baseImageUrl = "http://localhost:5000"; // Update with your actual base URL or path

    const employees = rows.map((employee) => ({
      ...employee,
      employee_image: employee.employee_image
        ? baseImageUrl + employee.employee_image
        : null,
    }));

    return employees;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw new Error("Error fetching employees");
  }
};

// delete employee
async function deleteEmployee(employee_id) {
  console.log(employee_id);
  //check if employee id not null
  if (!employee_id) {
    return false;
  }

  // Delete from employee_role table
  const query2 = "DELETE FROM employee_role WHERE employee_id = ?";
  const rows2 = await conn.query(query2, [employee_id]);

  // Delete from employee_pass table
  const query3 = "DELETE FROM employee_pass WHERE employee_id = ?";
  const rows3 = await conn.query(query3, [employee_id]);

  // Delete from employee_info table
  const query4 = "DELETE FROM employee_info WHERE employee_id = ?";
  const rows4 = await conn.query(query4, [employee_id]);
  // Delete from employee table
  const query = "DELETE FROM employee WHERE employee_id = ?";
  const rows = await conn.query(query, [employee_id]);

  // Check if the deletion was successful
  if (
    rows.affectedRows === 1 &&
    rows2.affectedRows === 1 &&
    rows3.affectedRows === 1 &&
    rows4.affectedRows === 1
  ) {
    return true;
  } else {
    return false;
  }
}
async function updateEmployee(updatedEmployeeData) {
  let hashedPassword = null;
  const {
    employee_id,
    employee_first_name,
    employee_last_name,
    employee_phone,
    employee_email,
    employee_password,
  } = updatedEmployeeData;

  // If a new password is provided, hash it
  if (employee_password) {
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(employee_password, salt);
  }

  try {
    // Update employee email
    const query1 = `UPDATE employee SET employee_email = ? WHERE employee_id = ?`;
    const result1 = await conn.query(query1, [employee_email, employee_id]);

    if (result1.affectedRows === 0) {
      console.error("No employee found with employee_id:", employee_id);
      throw new Error("No employee found with the provided employee_id");
    }

    // Update employee info
    const query2 = `
            UPDATE employee_info 
            SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? 
            WHERE employee_id = ?`;
    const result2 = await conn.query(query2, [
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_id,
    ]);

    if (result2.affectedRows === 0) {
      console.error(
        "Failed to update employee info for employee_id:",
        employee_id
      );
      throw new Error("Failed to update employee info");
    }

    // Update employee password if provided
    if (hashedPassword) {
      const query3 = `UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?`;
      const result3 = await conn.query(query3, [hashedPassword, employee_id]);

      if (result3.affectedRows === 0) {
        console.error(
          "Failed to update employee password for employee_id:",
          employee_id
        );
        throw new Error("Failed to update employee password");
      }
    }

    console.log("Employee updated successfully:", employee_id);
    return true; // Success
  } catch (error) {
    console.error("Service Error:", error.message);

    return false; // Fail
  }
}

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
