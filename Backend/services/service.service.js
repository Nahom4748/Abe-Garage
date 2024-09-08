// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function getAllServices() {
  //fetch all services
  try {
    const query =
      "SELECT service_id, service_name, service_price, service_description  FROM common_services  WHERE active = 1";

    const rows = await conn.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error fetching services: " + error);
  }
}

async function getServiceById(serviceId) {
  const query =
    "SELECT service_id, service_name, service_description FROM common_services WHERE service_id = ? AND active = 1";
  const rows = await conn.query(query, [serviceId]);
  return rows;
}
async function createService({
  service_name,
  service_price,
  service_description,
  createdBy,
  active,
}) {
  if (
    service_name === undefined ||
    service_price === undefined ||
    service_description === undefined ||
    createdBy === undefined
  ) {
    throw new Error("Some service parameters are undefined");
  } else {
    const query =
      "INSERT INTO common_services (service_name, Service_Price, service_description, createdBy, active) VALUES (?, ?, ?, ?, ?)";
    try {
      const [rows, fields] = await conn.query(query, [
        service_name,
        service_price,
        service_description,
        createdBy,
        active,
      ]);
      console.log(rows);
      if (result.insertId) {
        return result.insertId;
      }
      throw new Error("Failed to add the service");
    } catch (error) {
      console.error("Error executing query:", error);
      throw error; // Re-throw the error after logging it
    }
  }
}
async function updateService(serviceId, serviceData) {
  const query =
    "UPDATE common_services SET service_name = ?, Service_Price = ?, service_description = ? WHERE service_id = ?";

  try {
    // Execute the query
    const [rows] = await conn.query(query, [
      serviceData.service_name,
      serviceData.service_price,
      serviceData.service_description,
      serviceId,
    ]);

    // Check if exactly one row was affected
    if (rows.affectedRows === 1) {
      return true;
    } else {
      // If no rows are affected, it could be due to an invalid serviceId or no changes
      console.warn(
        "No rows affected. Service might not exist or no change was made."
      );
      return false;
    }
  } catch (error) {
    console.error("Error executing query:", error);
    throw error; // Re-throw the error after logging it
  }
}

async function deactivateService(serviceId) {
  const query = "UPDATE common_services SET active = 0 WHERE service_id = ?";
  const result = await conn.query(query, [serviceId]);
  return result;
}
module.exports = {
  getAllServices,
  createService,
  getServiceById,
  updateService,
  deactivateService,
};
