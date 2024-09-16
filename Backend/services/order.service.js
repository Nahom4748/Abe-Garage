const conn = require("../config/db.config");

// Function to add a new order
async function addOrder(orderData) {
  try {
    const insertOrderQuery = `
            INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    const orderHash = generateOrderHash(); // Generate a unique hash for the order

    const orderResult = await conn.query(insertOrderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.Order_Date,
      orderData.order_completed,
      orderHash,
    ]);

    const newOrderId = orderResult.insertId;

    // Insert order details into the order_info table
    const insertOrderInfoQuery = `
            INSERT INTO order_info (order_id, order_total_price, estimated_completion_date, completion_date, additional_request, notes_for_internal_use, notes_for_customer, additional_requests_completed)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

    await conn.query(insertOrderInfoQuery, [
      newOrderId,
      orderData.order_total_price || 0,
      orderData.estimated_completion_date || null,
      orderData.completion_date || null,
      orderData.Order_description || "",
      orderData.notes_for_internal_use || "",
      orderData.notes_for_customer || "",
      orderData.additional_requests_completed || 0,
    ]);

    // Insert services related to the order in the order_services table
    const insertOrderServicesQuery = `
            INSERT INTO order_services (order_id, service_id, service_completed)
            VALUES (?, ?, ?)
        `;
    let services = JSON.parse(orderData.order_services);

    // loop through the order_services array
    for (let service of services) {
      if (service.service_id === undefined) {
        throw new Error("service_id is required for each service");
      }

      await conn.query(insertOrderServicesQuery, [
        newOrderId,
        service.service_id,
        service.service_completed,
      ]);
    }

    return {
      status: "success",
      order_id: newOrderId,
    };
  } catch (error) {
    console.error("Error adding order:", error);
    return {
      status: "fail",
      message: "Failed to add the order",
    };
  }
}

// Function to generate a unique order hash (you can customize this as needed)
function generateOrderHash() {
  return Math.random().toString(36).substring(2, 15);
}

// Function to retrieve all orders
const getAllOrders = async (req, res) => {
  try {
    // SQL query to get all orders with detailed information
    const ordersQuery = `
      SELECT 
        o.order_id,
        cinfo.customer_first_name AS customer_first_name,
        cinfo.customer_last_name AS customer_last_name,
        v.vehicle_make,
        v.vehicle_model,
        v.vehicle_year,
        o.order_date,
        ei.employee_first_name AS assigned_employee_first_name,
        ei.employee_last_name AS assigned_employee_last_name,
        oi.additional_request AS order_description,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_requests_completed AS order_status,
        GROUP_CONCAT(
          CONCAT(
            '{"service_id": "', os.service_id,
            '", "service_name": "', s.service_name,
            '", "service_price": "', s.Service_Price,
            '", "service_completed": "', os.service_completed,
            '"}'
          ) ORDER BY os.service_id ASC
          SEPARATOR ','
        ) AS order_services
      FROM orders o
      LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
      LEFT JOIN customer_vehicle_info v ON o.vehicle_id = v.vehicle_id
      LEFT JOIN employee e ON o.employee_id = e.employee_id
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_services os ON o.order_id = os.order_id
      LEFT JOIN common_services s ON os.service_id = s.service_id
      GROUP BY 
        o.order_id, 
        cinfo.customer_first_name, 
        cinfo.customer_last_name,
        v.vehicle_make, 
        v.vehicle_model, 
        v.vehicle_year, 
        o.order_date, 
        ei.employee_first_name, 
        ei.employee_last_name, 
        oi.additional_request, 
        oi.estimated_completion_date, 
        oi.completion_date, 
        oi.additional_requests_completed;
    `;

    // Execute the query
    const [rows] = await conn.query(ordersQuery);
    console.log("Orders Data:", rows); // Log the data to inspect
    return rows;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while retrieving orders.",
    });
  }
};

// Function to retrieve an order by ID
async function getOrderById(orderId) {
  try {
    // Query to select the order by its ID
    const orderQuery = `
      SELECT 
        o.order_id, o.employee_id, o.customer_id, o.vehicle_id, 
        oi.additional_request AS order_description, 
        o.order_date, oi.estimated_completion_date, oi.completion_date, 
        oi.additional_requests_completed AS order_completed
      FROM orders o
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      WHERE o.order_id = ?
    `;

    const [orders] = await conn.query(orderQuery, [orderId]);

    // If no order found, return null
    if (orders.length === 0) {
      return null;
    }

    // Fetch the order services
    const servicesQuery = `
      SELECT os.order_service_id, os.service_id
      FROM order_services os
      WHERE os.order_id = ?
    `;

    const [orderServices] = await conn.query(servicesQuery, [orderId]);

    // Return the full order details
    return {
      ...orders[0],
      order_services: orderServices,
    };
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    throw new Error("Failed to retrieve order");
  }
}

// Service function to update an order
async function updateOrder(orderData) {
  const {
    order_id,
    customer_id,
    employee_id,
    vehicle_id,
    service_id,
    order_date,
    estimated_completion_date,
    completion_date,
    order_description,
    order_completed,
    order_services,
  } = orderData;

  try {
    // Check if the order exists
    const orderCheck = await conn.query(
      "SELECT * FROM orders WHERE order_id = ?",
      [order_id]
    );
    if (orderCheck.length === 0) {
      return { status: "fail", error: "not_found" };
    }

    // Update the orders table
    await conn.query(
      `
      UPDATE orders
      SET customer_id = ?, employee_id = ?, vehicle_id = ?, order_date = ?
      WHERE order_id = ?
    `,
      [customer_id, employee_id, vehicle_id, order_date, order_id]
    );

    // Update the order_info table
    await conn.query(
      `
      UPDATE order_info
      SET estimated_completion_date = ?, completion_date = ?, additional_request = ?, additional_requests_completed = ?
      WHERE order_id = ?
    `,
      [
        estimated_completion_date,
        completion_date,
        order_description,
        order_completed,
        order_id,
      ]
    );

    // Update the order_services table
    // Delete existing services for the order, then re-insert the new ones
    await conn.query("DELETE FROM order_services WHERE order_id = ?", [
      order_id,
    ]);

    const services = JSON.parse(order_services); // Assuming `order_services` is sent as a JSON string
    for (let service of services) {
      await conn.query(
        `
        INSERT INTO order_services (order_id, service_id, service_completed)
        VALUES (?, ?, ?)
      `,
        [order_id, service.service_id, service.service_completed]
      );
    }

    // Return success status
    return { status: "success" };
  } catch (error) {
    console.error("Error updating order: ", error);
    return { status: "error", message: error.message };
  }
}

// Service function to delete an order by ID
async function deleteOrderById(orderId) {
  try {
    // Check if the order exists
    const checkOrderQuery = "SELECT * FROM orders WHERE order_id = ?";
    const order = await conn.query(checkOrderQuery, [orderId]);

    if (order.length === 0) {
      // If order doesn't exist, return false
      return false;
    }

    // Delete related data from order_info, order_services, and order_status tables
    const deleteOrderInfoQuery = "DELETE FROM order_info WHERE order_id = ?";
    await conn.query(deleteOrderInfoQuery, [orderId]);

    const deleteOrderServicesQuery =
      "DELETE FROM order_services WHERE order_id = ?";
    await conn.query(deleteOrderServicesQuery, [orderId]);

    const deleteOrderStatusQuery =
      "DELETE FROM order_status WHERE order_id = ?";
    await conn.query(deleteOrderStatusQuery, [orderId]);

    // Delete the order from the orders table
    const deleteOrderQuery = "DELETE FROM orders WHERE order_id = ?";
    await conn.query(deleteOrderQuery, [orderId]);

    // Return true to indicate successful deletion
    return true;
  } catch (error) {
    // Log any unexpected errors and rethrow
    console.error(error);
    throw error;
  }
}

// Export the service function
module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrderById,
};
