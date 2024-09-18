// write a function that uses async await

import axios from "axios";

const fetchOrders = async (employeeId) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/tasks/${employeeId}` // Replace with your backend API endpoint
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    const groupedOrders = response.data.reduce((acc, order) => {
      if (!acc[order.orderId]) {
        acc[order.orderId] = { ...order, services: [] };
      }
      if (order.services) {
        acc[order.orderId].services.push(order.services);
      }
      return acc;
    }, {});

    return Object.values(groupedOrders); // Convert grouped object to array
  } catch (error) {
    throw new Error(error.message);
  }
};

const Servicecompleted = async (formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Send the token for authentication
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `http://localhost:5000/api/orderscheck`,
    requestOptions
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

const TaskCompleted = async (orderId, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Send the token for authentication
    },
    body: JSON.stringify({ orderId }),
  };

  const response = await fetch(
    "http://localhost:5000/api/orders/completed",
    requestOptions
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response;
};

const fetchOrdersByCustomerId = async (customerId, token) => {};
const OrderService = {
  Servicecompleted,
  TaskCompleted,
  fetchOrders,
};
export default OrderService;
