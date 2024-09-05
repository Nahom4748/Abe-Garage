// Import from the env
// const api_url = process.env.REACT_APP_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `http://localhost:5000/api/employee`,
    requestOptions
  );
  return response;
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
    `http://localhost:5000/api/employees`,
    requestOptions
  );
  return response;
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
    `http://localhost:5000/api/employee`,
    requestOptions
  );
  return response;
};

//delete employee
const deleteEmployee = async (employeeId, token) => {
  // Construct the URL with the employee ID as a path parameter
  const url = `http://localhost:5000/api/employee/${employeeId}`;

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

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
};
export default employeeService;
