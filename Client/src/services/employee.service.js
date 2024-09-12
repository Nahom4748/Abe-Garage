// Import from the env
// const api_url = process.env.REACT_APP_API_URL;
// Import axios
import axios from "axios";

// A function to send post request to create a new employee

const createEmployee = async (formData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:8001/api/employee",
      formData,
      {
        headers: {
          "x-access-token": token,
          "Content-Type": "multipart/form-data", // Ensure the correct Content-Type
        },
      }
    );

    // Axios parses response.data automatically
    if (response.status === 200) {
      return response.data; // Directly return the data
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  } catch (error) {
    // Enhanced error handling
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

// Export all the functions
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `http://localhost:8001/api/employees`,
    requestOptions
  );
  return response.json();
};

const updateEmployee = async (formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `http://localhost:8001/api/employee`,
    requestOptions
  );
  return response;
};

//delete employee
const deleteEmployee = async (employeeId, token) => {
  // Construct the URL with the employee ID as a path parameter
  const url = `http://localhost:8001/api/employee/${employeeId}`;

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
    console.error("Error deleting employee:", error);
    throw error; // Rethrow the error to be handled by calling code
  }
};
//a function to reseet password
const resetEmployeePassword = async (employeeId, token) => {
  try {
    const response = await fetch(
      `http://localhost:8001/api/employee/password/${employeeId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error("Error resetting employee password:", error);
  }
};
// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
export default employeeService;
