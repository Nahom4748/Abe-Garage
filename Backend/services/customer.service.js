// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module to do the password comparison
const bcrypt = require("bcrypt");
// A function to check if customer exists in the database
async function checkIfCustomerExists(email) {
  const query = "SELECT * FROM customer WHERE customer_email = ? ";
  const rows = await conn.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

async function createCustomer(customer) {
  let createdCustomer = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(customer.customer_password, salt);
    //   Insert the email phone number and hashed password into the customer table

    const query =
      "INSERT INTO customer_identifier (customer_email,customer_phone_number, customer_hash) VALUES (?, ?, ?)";
    const row = await conn.query(query, [
      customer.customer_email,
      customer.customer_phone_number,
      hashedPassword,
    ]);
    //
    const customer_id = row2.insertId;
    const query2 =
      "INSERT INTO customer_info (customer_first_name, customer_last_name, customer_id) VALUES (?, ?, ?, ?) ";
    const row2 = await conn.query(query2, [
      customer_id,
      customer.customer_first_name,
      customer.customer_last_name,
    ]);
    createdCustomer = {
      customer_id: customer_id,
    };
  } catch (err) {
    console.log(err);
  }
  return createdCustomer;
}

module.exports = {
  checkIfCustomerExists,
  createCustomer,
};
