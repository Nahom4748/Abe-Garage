const db = require("../config/db.config");
const bcrypt = require("bcrypt");

// A function to check if a customer exists
async function checkIfCustomerExists(email) {
  //check if customer email already exists in the database
  const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;
  const rows = await db.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
}

// A function to create a customer
async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Generate a salt and hash the customer's hash
    const salt = await bcrypt.genSalt(10);
    const hashedCustomer = await bcrypt.hash(customer.customer_hash, salt);

    // Insert into customer_identifier table
    const query = `
      INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) 
      VALUES (?, ?, ?)`;
    const rows = await db.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
      hashedCustomer,
    ]);

    if (rows.affectedRows !== 1) {
      return false;
    }
    const customer_id = rows.insertId;

    // Insert into customer_info table
    const query2 = `
      INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) 
      VALUES (?, ?, ?, ?)`;
    const rows2 = await db.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
      customer.active_customer_status,
    ]);

    // if (rows2.affectedRows !== 1) return false;

    // Insert into customer_vehicle_info table
    // const query3 = `
    //   INSERT INTO customer_vehicle_info (customer_id, vehicle_make, vehicle_model, vehicle_year, vehicle_tag, vehicle_mileage, vehicle_color, vehicle_type, vehicle_serial)
    //   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    // const rows3 = await db.query(query3, [
    //   customer_id,
    //   customer.vehicle_make,
    //   customer.vehicle_model,
    //   customer.vehicle_year,
    //   customer.vehicle_tag,
    //   customer.vehicle_mileage,
    //   customer.vehicle_color,
    //   customer.vehicle_type,
    //   customer.vehicle_serial,
    // ]);

    // if (rows3.affectedRows !== 1) return false;
    // Construct the customer object to return
    createdCustomer = {
      customer_id,
      customer_email: customer.customer_email,
    };
    // return {
    //   customer_id,
    //   customer_email: customer.customer_email,
    // };
  } catch (error) {
    console.error("Error creating customer:", error);
    return false;
  }
  // Return the created customer
  return createdCustomer;
}

// A function to get all customers
async function getAllCustomers() {
  console.log("Fetching latest 10 customers");

  const query = `
    SELECT *
    FROM customer_identifier
    INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
    ORDER BY customer_identifier.customer_id DESC`;

  try {
    const rows = await db.query(query);
    console.log("Query result (rows):", rows); // Ensure it logs an array of objects
    return rows;
    if (rows.length === 0) {
      console.log("No customers found.");
      return [];
    }
    console.log("Fetched customers:", rows[0]);
    return rows[0];
  } catch (error) {
    console.error("Error executing query:", error);
    return [];
  }
}

//a function to get a customer by id
async function getCustomerById(customer_id) {
  console.log("Searching for customer with ID:", customer_id); // Log the ID
  const query = `SELECT *
    FROM customer_identifier
    INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
    WHERE customer_identifier.customer_id = ?`;
  try {
    const [rows] = await db.query(query, [customer_id]);
    console.log("Query Results:", rows); // Log the raw query results
    return rows;
  } catch (error) {
    console.error("Error executing query:", error); // Log any errors
    return null;
  }
}

// Export the functions
module.exports = {
  checkIfCustomerExists,
  createCustomer,
  getAllCustomers,
  getCustomerById,
};
