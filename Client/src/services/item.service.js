// Import from the env
const api_url = "http://localhost:5000";
import axios from "axios";

// A function to send a POST request to create a new item
const createItem = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${api_url}/api/item`, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error creating item:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

const getAllItems = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/items`, requestOptions);
  return response;
};
// A function to send a PUT request to update an item
const updateItem = async (formData, token) => {
  const url = `${api_url}/api/item/${formData.item_id}`;

  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error updating item:", error);
    throw error; // Rethrow the error to handle it elsewhere
  }
};

// A function to send a DELETE request to delete an item by ID
const deleteItem = async (itemId, token) => {
  // Construct the URL with the item ID as a path parameter
  const url = `${api_url}/api/item/${itemId}`;

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
    return await response.json(); // Assuming the server responds with JSON
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error; // Rethrow the error to be handled by calling code
  }
};

// Export all the functions
const itemService = {
  createItem,
  getAllItems,
  updateItem,
  deleteItem,
};

export default itemService;
