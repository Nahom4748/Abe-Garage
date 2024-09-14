
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



// Function to handle retrieving an order by ID
async function getOrderById(req, res) {
  try {
    const orderId = req.params.id;

    // Fetch the order details using the service
    const order = await orderService.getOrderById(orderId);

    // Check if the order exists
    if (!order) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found",
      });
    }

    // Send back the order details
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving order:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred.",
    });
  }
}


// Controller function to handle updating an order
async function updateOrder(req, res) {
  try {
    // Extract the order data from the request body
    const {
      order_id, customer_id, employee_id, vehicle_id, service_id,
      order_date, estimated_completion_date, completion_date,
      order_description, order_completed, order_services
    } = req.body;

    // Input validation
    if (!order_id || !customer_id || !employee_id || !vehicle_id || !order_date || !order_services || typeof order_completed === 'undefined') {
      return res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields"
      });
    }

    // Call the service to update the order
    const result = await orderService.updateOrder({
      order_id, customer_id, employee_id, vehicle_id, service_id,
      order_date, estimated_completion_date, completion_date,
      order_description, order_completed, order_services
    });

    // Handle the response based on the service result
    if (result.status === 'success') {
      return res.status(200).json({
        message: "Order updated successfully",
        success: true
      });
    } else if (result.status === 'fail' && result.error === 'not_found') {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found"
      });
    } else {
      return res.status(500).json({
        error: "Internal Server Error",
        message: "An unexpected error occurred."
      });
    }
  } catch (error) {
    console.error("Update Order Error: ", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred."
    });
  }
}






// Delete order controller function
async function deleteOrder(req, res) {
  try {
    // Get the order ID from the request params
    const orderId = req.params.id;

    // Call the order service to delete the order
    const result = await orderService.deleteOrderById(orderId);

    // If the order was not found, return a 404 response
    if (!result) {
      return res.status(404).json({
        error: "Not Found",
        message: "Order not found"
      });
    }

    // If the order is successfully deleted, return a 200 response
    return res.status(200).json({
      message: "Order deleted successfully"
    });
  } catch (error) {
    // Handle unexpected errors
    console.error(error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred."
    });
  }
}




// Export the controller function
module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
