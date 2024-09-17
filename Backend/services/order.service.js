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

    // Insert services related to the order in the order_status table
    const insertOrderStatusQuery = `
            INSERT INTO order_status (order_id, order_status)
            VALUES (?, ?)
        `;

    await conn.query(insertOrderStatusQuery, [newOrderId, 1]);

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
const getAllOrders = async () => {
  try {
    const query = `
      SELECT 
    o.order_id,
    o.order_date,
    o.active_order,
    o.order_hash,

    -- Customer Details
    ci.customer_id,
    ci.customer_email,
    ci.customer_phone_number,
    cinfo.customer_first_name,
    cinfo.customer_last_name,

    -- Vehicle Details
    cv.vehicle_year,
    cv.vehicle_make,
    cv.vehicle_model,
    cv.vehicle_type,
    cv.vehicle_mileage,
    cv.vehicle_tag,
    cv.vehicle_serial,
    cv.vehicle_color,

    -- Employee Details
    e.employee_email,
    ei.employee_first_name AS employee_first_name,
    ei.employee_last_name AS employee_last_name,

    -- Order Info Details
    oi.order_total_price,
    oi.estimated_completion_date,
    oi.completion_date,
    oi.additional_request,
    oi.notes_for_internal_use,
    oi.notes_for_customer,
    oi.additional_requests_completed,

    -- Service Details
    cs.service_name,
    cs.service_price,
    cs.service_description,
    os.service_completed,

    -- Order Status Details
    os_table.order_status

FROM orders o
LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
LEFT JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
LEFT JOIN customer_vehicle_info cv ON o.vehicle_id = cv.vehicle_id
LEFT JOIN employee e ON o.employee_id = e.employee_id
LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
LEFT JOIN order_info oi ON o.order_id = oi.order_id
LEFT JOIN order_services os ON o.order_id = os.order_id
LEFT JOIN common_services cs ON os.service_id = cs.service_id
LEFT JOIN order_status os_table ON o.order_id = os_table.order_id  -- Joining the order_status table

ORDER BY o.order_date DESC;

      `;

    // Execute query and log the result for debugging
    const rows = await conn.query(query);

    // Check if rows is an array
    if (!Array.isArray(rows)) {
      throw new Error("Expected rows to be an array, but got something else.");
    }

    // Map through the rows to format the result
    const formattedOrders = rows.map((row) => ({
      orderId: row.order_id,
      orderDate: row.order_date,
      activeOrder: row.active_order,
      orderHash: row.order_hash,
      OrderStatus: row.order_status,

      customer: {
        id: row.customer_id,
        email: row.customer_email,
        phoneNumber: row.customer_phone_number,
        firstName: row.customer_first_name,
        lastName: row.customer_last_name,
      },

      vehicle: {
        year: row.vehicle_year,
        make: row.vehicle_make,
        model: row.vehicle_model,
        type: row.vehicle_type,
        mileage: row.vehicle_mileage,
        tag: row.vehicle_tag,
        serial: row.vehicle_serial,
        color: row.vehicle_color,
      },

      employee: {
        email: row.employee_email,
        firstName: row.employee_first_name,
        lastName: row.employee_last_name,
      },

      orderInfo: {
        totalPrice: row.order_total_price,
        estimatedCompletionDate: row.estimated_completion_date,
        completionDate: row.completion_date,
        additionalRequest: row.additional_request,
        internalNotes: row.notes_for_internal_use,
        customerNotes: row.notes_for_customer,
        additionalRequestsCompleted: row.additional_requests_completed,
      },

      services: {
        name: row.service_name,
        price: row.Service_Price,
        description: row.service_description,
        completed: row.service_completed,
      },
    }));

    return formattedOrders;
  } catch (error) {
    console.error("Error fetching orders: ", error);
    throw error;
  }
};

// Function to retrieve an order by ID

async function getOrderById(orderId) {
  if (!orderId) {
    throw new Error("Invalid order ID");
  }

  try {
    const orderQuery = `
     SELECT 
        o.order_id,
        o.order_date,
        o.active_order,
        o.order_hash,

        -- Customer Details
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        cinfo.customer_first_name,
        cinfo.customer_last_name,

        -- Vehicle Details
        cv.vehicle_year,
        cv.vehicle_make,
        cv.vehicle_model,
        cv.vehicle_type,
        cv.vehicle_mileage,
        cv.vehicle_tag,
        cv.vehicle_serial,
        cv.vehicle_color,

        -- Employee Details
        e.employee_email,
        ei.employee_first_name,
        ei.employee_last_name,

        -- Order Info Details
        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        oi.notes_for_internal_use,
        oi.notes_for_customer,
        oi.additional_requests_completed,

        -- Service Details
        cs.service_id,
        cs.service_name,
        cs.service_price,
        cs.service_description,
        os.service_completed,

        -- Order Status Details
        os_table.order_status

    FROM orders o
    LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
    LEFT JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
    LEFT JOIN customer_vehicle_info cv ON o.vehicle_id = cv.vehicle_id
    LEFT JOIN employee e ON o.employee_id = e.employee_id
    LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
    LEFT JOIN order_info oi ON o.order_id = oi.order_id
    LEFT JOIN order_services os ON o.order_id = os.order_id
    LEFT JOIN common_services cs ON os.service_id = cs.service_id
    LEFT JOIN order_status os_table ON o.order_id = os_table.order_id
    WHERE o.order_id = ?
    ORDER BY o.order_date DESC;
    `;

    const rows = await conn.query(orderQuery, [orderId]);

    if (!rows || rows.length === 0) {
      return null;
    }

    const formattedOrder = {
      orderId: rows[0].order_id,
      orderDate: rows[0].order_date,
      activeOrder: rows[0].active_order,
      orderHash: rows[0].order_hash,

      customer: {
        id: rows[0].customer_id,
        email: rows[0].customer_email,
        phoneNumber: rows[0].customer_phone_number,
        firstName: rows[0].customer_first_name,
        lastName: rows[0].customer_last_name,
      },

      vehicle: {
        year: rows[0].vehicle_year,
        make: rows[0].vehicle_make,
        model: rows[0].vehicle_model,
        type: rows[0].vehicle_type,
        mileage: rows[0].vehicle_mileage,
        tag: rows[0].vehicle_tag,
        serial: rows[0].vehicle_serial,
        color: rows[0].vehicle_color,
      },

      employee: {
        email: rows[0].employee_email,
        firstName: rows[0].employee_first_name,
        lastName: rows[0].employee_last_name,
      },

      orderInfo: {
        totalPrice: rows[0].order_total_price,
        estimatedCompletionDate: rows[0].estimated_completion_date,
        completionDate: rows[0].completion_date,
        additionalRequest: rows[0].additional_request,
        internalNotes: rows[0].notes_for_internal_use,
        customerNotes: rows[0].notes_for_customer,
        additionalRequestsCompleted: rows[0].additional_requests_completed,
      },

      services: rows.map((row) => ({
        serviceId: row.service_id,
        serviceName: row.service_name,
        serviceDescription: row.service_description,
        servicePrice: row.service_price,
        serviceCompleted: row.service_completed,
        status: {
          statusName: row.order_status,
        },
      })),
    };
    console.log(formattedOrder);
    return formattedOrder;
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
// service function to  getOrderByEmployeeId

async function getOrderByEmployeeId(EmployeeId) {
  if (!EmployeeId) {
    throw new Error("Invalid employee ID");
  }

  try {
    const orderQuery = `
      SELECT 
        o.order_id,
        o.order_date,
        o.active_order,
        o.order_hash,
  
        -- Customer Details
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        cinfo.customer_first_name,
        cinfo.customer_last_name,
  
        -- Vehicle Details
        cv.vehicle_year,
        cv.vehicle_make,
        cv.vehicle_model,
        cv.vehicle_type,
        cv.vehicle_mileage,
        cv.vehicle_tag,
        cv.vehicle_serial,
        cv.vehicle_color,
  
        -- Employee Details
        e.employee_email,
        ei.employee_first_name,
        ei.employee_last_name,
  
        -- Order Info Details
        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        oi.notes_for_internal_use,
        oi.notes_for_customer,
        oi.additional_requests_completed,
  
        -- Service Details
        cs.service_id,
        cs.service_name,
        cs.service_price,
        cs.service_description,
        os.service_completed,
  
        -- Order Status Details
        os_table.order_status
  
      FROM orders o
      LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
      LEFT JOIN customer_vehicle_info cv ON o.vehicle_id = cv.vehicle_id
      LEFT JOIN employee e ON o.employee_id = e.employee_id
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_services os ON o.order_id = os.order_id
      LEFT JOIN common_services cs ON os.service_id = cs.service_id
      LEFT JOIN order_status os_table ON o.order_id = os_table.order_id
      WHERE o.employee_id = ?
      ORDER BY o.order_date DESC;
    `;

    const rows = await conn.query(orderQuery, [EmployeeId]);

    if (!rows || rows.length === 0) {
      return null;
    }

    // Format the result into a structured object
    const formattedOrders = rows.map((row) => ({
      orderId: row.order_id,
      orderDate: row.order_date,
      activeOrder: row.active_order,
      orderHash: row.order_hash,

      customer: {
        id: row.customer_id,
        email: row.customer_email,
        phoneNumber: row.customer_phone_number,
        firstName: row.customer_first_name,
        lastName: row.customer_last_name,
      },

      vehicle: {
        year: row.vehicle_year,
        make: row.vehicle_make,
        model: row.vehicle_model,
        type: row.vehicle_type,
        mileage: row.vehicle_mileage,
        tag: row.vehicle_tag,
        serial: row.vehicle_serial,
        color: row.vehicle_color,
      },

      employee: {
        email: row.employee_email,
        firstName: row.employee_first_name,
        lastName: row.employee_last_name,
      },

      orderInfo: {
        totalPrice: row.order_total_price,
        estimatedCompletionDate: row.estimated_completion_date,
        completionDate: row.completion_date,
        additionalRequest: row.additional_request,
        internalNotes: row.notes_for_internal_use,
        customerNotes: row.notes_for_customer,
        additionalRequestsCompleted: row.additional_requests_completed,
      },

      services: {
        serviceId: row.service_id,
        serviceName: row.service_name,
        serviceDescription: row.service_description,
        servicePrice: row.service_price,
        serviceCompleted: row.service_completed,
      },

      status: {
        statusName: row.order_status,
      },
    }));

    console.log(formattedOrders);
    return formattedOrders;
  } catch (error) {
    console.error("Error retrieving orders by employee ID:", error);
    throw new Error("Failed to retrieve orders");
  }
}
//service for costumer
async function getOrderByCustomerId(customerId) {
  if (!customerId) {
    throw new Error("Invalid customer ID");
  }

  console.log("Customer ID:", customerId);

  try {
    const orderQuery = `
      SELECT 
        o.order_id,
        o.order_date,
        o.active_order,
        o.order_hash,
  
        -- Customer Details
        ci.customer_id,
        ci.customer_email,
        ci.customer_phone_number,
        cinfo.customer_first_name,
        cinfo.customer_last_name,
  
        -- Vehicle Details
        cv.vehicle_year,
        cv.vehicle_make,
        cv.vehicle_model,
        cv.vehicle_type,
        cv.vehicle_mileage,
        cv.vehicle_tag,
        cv.vehicle_serial,
        cv.vehicle_color,
  
        -- Employee Details
        e.employee_email,
        ei.employee_first_name,
        ei.employee_last_name,
  
        -- Order Info Details
        oi.order_total_price,
        oi.estimated_completion_date,
        oi.completion_date,
        oi.additional_request,
        oi.notes_for_internal_use,
        oi.notes_for_customer,
        oi.additional_requests_completed,
  
        -- Service Details
        cs.service_id,
        cs.service_name,
        cs.service_price,
        cs.service_description,
        os.service_completed,
  
        -- Order Status Details
        os_table.order_status
  
      FROM orders o
      LEFT JOIN customer_identifier ci ON o.customer_id = ci.customer_id
      LEFT JOIN customer_info cinfo ON ci.customer_id = cinfo.customer_id
      LEFT JOIN customer_vehicle_info cv ON o.vehicle_id = cv.vehicle_id
      LEFT JOIN employee e ON o.employee_id = e.employee_id
      LEFT JOIN employee_info ei ON e.employee_id = ei.employee_id
      LEFT JOIN order_info oi ON o.order_id = oi.order_id
      LEFT JOIN order_services os ON o.order_id = os.order_id
      LEFT JOIN common_services cs ON os.service_id = cs.service_id
      LEFT JOIN order_status os_table ON o.order_id = os_table.order_id
      WHERE o.customer_id = ?
      ORDER BY o.order_date DESC;
    `;

    const [rows] = await conn.query(orderQuery, [customerId]); // Destructuring to get rows
    console.log("Query Result:", rows);

    if (!rows || rows.length === 0) {
      return null;
    }

    // Format the result into a structured object
    const formattedOrders = rows.map((row) => ({
      orderId: row.order_id,
      orderDate: row.order_date,
      activeOrder: row.active_order,
      orderHash: row.order_hash,

      customer: {
        id: row.customer_id,
        email: row.customer_email,
        phoneNumber: row.customer_phone_number,
        firstName: row.customer_first_name,
        lastName: row.customer_last_name,
      },

      vehicle: {
        year: row.vehicle_year,
        make: row.vehicle_make,
        model: row.vehicle_model,
        type: row.vehicle_type,
        mileage: row.vehicle_mileage,
        tag: row.vehicle_tag,
        serial: row.vehicle_serial,
        color: row.vehicle_color,
      },

      employee: {
        email: row.employee_email,
        firstName: row.employee_first_name,
        lastName: row.employee_last_name,
      },

      orderInfo: {
        totalPrice: row.order_total_price,
        estimatedCompletionDate: row.estimated_completion_date,
        completionDate: row.completion_date,
        additionalRequest: row.additional_request,
        internalNotes: row.notes_for_internal_use,
        customerNotes: row.notes_for_customer,
        additionalRequestsCompleted: row.additional_requests_completed,
      },

      services: {
        serviceId: row.service_id,
        serviceName: row.service_name,
        serviceDescription: row.service_description,
        servicePrice: row.service_price,
        serviceCompleted: row.service_completed,
      },

      status: {
        statusName: row.order_status,
      },
    }));

    console.log("Formatted Orders:", formattedOrders);
    return formattedOrders;
  } catch (error) {
    console.error("Error retrieving orders by customer ID:", error);
    throw new Error("Failed to retrieve orders");
  }
}

// Export the service function
module.exports = {
  addOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrderById,
  getOrderByEmployeeId,
  getOrderByCustomerId,
};
