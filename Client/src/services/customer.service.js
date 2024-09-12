// Import from the env
const api_url = "http://localhost:5000";

// A function to send a POST request to create a new customer
// const createCustomer = async (formData, token) => {
//   const requestOptions = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "x-access-token": token, // Ensure token is being sent
//     },
//     body: JSON.stringify(formData),
//   };
//   const response = await fetch(`${api_url}/api/customer`, requestOptions);
//   return response;
// };

const createCustomer = async (formData, token) => {
  console.log("Form data:", formData);

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/customer`, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// A function to send a GET request to retrieve all customers
const getAllCustomers = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  return response;
};

// A function to send a PUT request to update a customer
const updateCustomer = async (formData, token) => {
  const url = `${api_url}/api/customer/${formData.customer_id}`;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };

  const response = await fetch(url, requestOptions);
  return response;
};

// A function to send a DELETE request to delete a customer by ID
const deleteCustomer = async (customerId, token) => {
  // Construct the URL with the customer ID as a path parameter
  const url = `${api_url}/api/customer/${customerId}`;

  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
  };

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      const errorText = await response.text(); // Read the error message
      throw new Error(errorText);
    }

    return response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error; // Rethrow the error to be handled by calling code
  }
};

// Export all the functions
const customerService = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
};

export default customerService;
