
// Import the order service
const orderService = require("../services/order.service");

// Function to handle adding a new order
async function addOrder(req, res) {
  try {
    const orderData = req.body;

    // Validate the required fields
    if (
      !orderData.customer_id ||
      !orderData.employee_id ||
      !orderData.vehicle_id ||
      !orderData.service_id ||
      !orderData.order_date
    ) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Add the order using the service
    const newOrder = await orderService.addOrder(orderData);

    // Check if the order was added successfully
    if (newOrder.status === "success") {
      res.status(201).json({
        message: "Order created successfully",
        success: "true",
      });
    } else {
      res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred.",
      });
    }
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}

// Function to handle retrieving all orders
async function getAllOrders(req, res) {
  try {
    const orders = await orderService.getAllOrders();

    // If orders were retrieved successfully, return them
    res.status(200).json({
      status: "success",
      data: orders,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}



// Export the controller function
module.exports = {
  addOrder,
  getAllOrders,
  
};
