// Import axios
import axios from "../Axios/Axios"; // Update path if necessary

// Base URL for the API
const BASE_URL = "http://localhost:5000/api"; // Update with your actual API base URL

// Fetch profile information for a specific customer
export const fetchProfile = async (customerId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/customer/${customerId}`, {
      headers: {
        "x-access-token": token, // Ensure the token is passed correctly
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.error ||
          `Error ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
      throw new Error("No response received from server");
    } else {
      // Something went wrong in setting up the request
      console.error("Error message:", error.message);
      throw new Error("An error occurred: " + error.message);
    }
  }
};

// Change password for a specific customer
export const changePassword = async (customerId, data, token) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/customer/${customerId}/password`,
      data,
      {
        headers: {
          "x-access-token": token, // Ensure the token is passed correctly
          "Content-Type": "application/json", // Ensure the correct Content-Type
        },
      }
    );
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with an error
      console.error("Error response:", error.response.data);
      throw new Error(
        error.response.data.error ||
          `Error ${error.response.status}: ${error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
      throw new Error("No response received from server");
    } else {
      // Something went wrong in setting up the request
      console.error("Error message:", error.message);
      throw new Error("An error occurred: " + error.message);
    }
  }
};

// Exporting functions
const ProfileService = {
  fetchProfile,
  changePassword,
};

export default ProfileService;
