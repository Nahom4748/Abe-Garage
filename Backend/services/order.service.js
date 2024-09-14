
const conn = require("../config/db.config");

// Function to add a new order
async function addOrder(orderData) {
  try {
    // Insert the order into the orders table
    const insertOrderQuery = `
            INSERT INTO orders (employee_id, customer_id, vehicle_id, order_date, active_order, order_hash)
            VALUES (?, ?, ?, ?, ?, ?)
        `;

    const orderHash = generateOrderHash(); // Generate a unique hash for the order

    const orderResult = await conn.query(insertOrderQuery, [
      orderData.employee_id,
      orderData.customer_id,
      orderData.vehicle_id,
      orderData.order_date,
      1, // Active order
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

    const orderServices = JSON.parse(orderData.Order_services);
    for (let service of orderServices) {
      await conn.query(insertOrderServicesQuery, [
        newOrderId,
        service.service_id,
        service.service_completed || 0,
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
async function getAllOrders() {
  try {
    // Query to select all orders
    const ordersQuery = `
            SELECT 
                o.order_id, o.employee_id, o.customer_id, o.vehicle_id, 
                oi.additional_request AS order_description, 
                o.order_date, oi.estimated_completion_date, oi.completion_date, 
                oi.additional_requests_completed AS order_completed
            FROM orders o
            LEFT JOIN order_info oi ON o.order_id = oi.order_id;
        `;

    const orders = await conn.query(ordersQuery);

    // Query to select all services associated with orders
    const orderServicesQuery = `
            SELECT os.order_service_id, os.order_id, os.service_id
            FROM order_services os;
        `;

    const orderServices = await conn.query(orderServicesQuery);

    // Map services to corresponding orders
    const ordersWithServices = orders.map((order) => {
      order.order_services = orderServices.filter(
        (service) => service.order_id === order.order_id
      );
      return order;
    });

    return ordersWithServices;
  } catch (error) {
    console.error("Error retrieving orders:", error);
    throw new Error("Failed to retrieve orders");
  }
}



// Export the service function
module.exports = {
  addOrder,
  getAllOrders,
 
};
