// const db = require("../config/dbConfig");
// const bcrypt = require("bcrypt");

// // A function to check if a customer exists
// async function checkIfCustomerExists(email) {
//   //check if customer email already exists in the database
//   const query = `SELECT * FROM customer_identifier WHERE customer_email = ?`;
//   const rows = await db.query(query, [email]);
//   console.log(rows);
//   if (rows.length > 0) {
//     return true;
//   } else {
//     return false;
//   }
// }

// // A function to create a customer
// async function createCustomer(customer) {
//   let createdCustomer = {};
//   try {
//     // Generate a salt and hash the customer's hash
//     const salt = await bcrypt.genSalt(10);
//     const hashedCustomer = await bcrypt.hash(customer.customer_hash, salt);

//     // Insert the email, phone number, and hashed password into the customer_identifier table first
//     const query1 =
//       "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)";
//     const [rows] = await db.query(query1, [
//       customer.customer_email,
//       customer.customer_phone_number,
//       hashedCustomer,
//     ]);
//     console.log("Query Results:", rows);
//     console.log("Affected Rows:", rows.affectedRows);
//     console.log("Insert ID:", rows.insertId);
//     console.log("Warning Status:", rows.warningStatus);
//     if (!rows || rows.affectedRows !== 1) {
//       console.log("insert failed or no rows affected");
//       return false;
//     }

//     // Get the generated customer_id
//     const customer_id = rows.insertId;

//     // Insert the first name, last name, and active status into the customer_info table using the generated customer_id
//     const query2 =
//       "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)";
//     const [rows2] = await db.query(query2, [
//       customer_id,
//       customer.customer_first_name,
//       customer.customer_last_name,
//       customer.active_customer_status,
//     ]);

//     //check if the rows were affected
//     console.log("second query results:", rows2);
//     if (!rows2 || rows2.affectedRows !== 1) {
//       console.log("insert failed to customer_info or no rows affected");
//       return false;
//     }
//     //insert the cutomer_vehicle_info into the customer_vehicle_info table
//     const query3 = `INSERT INTO customer_vehicle_info (customer_id, vehicle_make, vehicle_model, vehicle_year, vehicle_tag, vehicle_mileage, vehicle_color, vehicle_type,vehicle_serial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
//     const [rows3] = await db.query(query3, [
//       customer_id,
//       customer.vehicle_make,
//       customer.vehicle_model,
//       customer.vehicle_year,
//       customer.vehicle_tag,
//       customer.vehicle_mileage,
//       customer.vehicle_color,
//       customer.vehicle_type,
//       customer.vehicle_serial,
//     ]);
//     if (!rows3 || rows3.affectedRows !== 1) {
//       throw new Error("Failed to insert into customer_vehicle_info");
//     }
//     // Construct the customer object to return
//     createdCustomer = {
//       customer_id: customer_id,
//       customer_email: customer.customer_email,
//     };
//   } catch (error) {
//     console.log(error);
//   }

//   // Return the created customer
//   return createdCustomer;
// }

// //get customer by email
// async function getAllCustomers() {
//   try {
//     const query = `SELECT * FROM customer_identifier
//                  INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
//                  INNER JOIN customer_vehicle_info ON customer_identifier.customer_id = customer_vehicle_info.customer_id
//                  WHERE customer_email = ?`;
//     const [rows] = await db.query(query);
//     return rows.length > 0 ? rows : []; // Return null if no customer is found
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

// // Export the functions to use in the controller
// module.exports = {
//   checkIfCustomerExists,
//   createCustomer,
//   getAllCustomers,
// };

const db = require("../config/dbConfig");
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
    const query3 = `
      INSERT INTO customer_vehicle_info (customer_id, vehicle_make, vehicle_model, vehicle_year, vehicle_tag, vehicle_mileage, vehicle_color, vehicle_type, vehicle_serial) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const rows3 = await db.query(query3, [
      customer_id,
      customer.vehicle_make,
      customer.vehicle_model,
      customer.vehicle_year,
      customer.vehicle_tag,
      customer.vehicle_mileage,
      customer.vehicle_color,
      customer.vehicle_type,
      customer.vehicle_serial,
    ]);

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
  try {
    const query = `
      SELECT customer_identifier.customer_id, 
        customer_identifier.customer_email, 
        customer_identifier.customer_phone_number, 
        customer_identifier.customer_hash, 
        customer_identifier.customer_added_date, 
        customer_info.customer_first_name, 
        customer_info.customer_last_name, 
        customer_info.active_customer_status 
      FROM customer_identifier 
      INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id 
      INNER JOIN customer_vehicle_info ON customer_identifier.customer_id = customer_vehicle_info.customer_id LIMIT 10`;
    const [rows] = await db.query(query);
    return rows;
  } catch (error) {
    console.error("Error retrieving customers:", error);
    return [];
  }
}
//a function to get a customer by id
async function getCustomerById(customerId) {
  console.log("Searching for customer with ID:", customerId); // Log the ID
  const query = `SELECT customer_identifier.customer_id, customer_email, customer_phone_number, customer_first_name, customer_last_name, customer_hash, customer_added_date, active_customer_status
                   FROM customer_identifier
                   INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id
                   WHERE customer_identifier.customer_id = ?`;
  try {
    const [rows] = await db.query(query, [customerId]);
    console.log("Query Results:", rows); // Log the raw query results
    return rows.length > 0 ? rows[0] : null;
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
