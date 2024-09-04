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
const updateEmployee = (employee_id, formData, token) => {
  return fetch(`/api/employee/image/${employee_id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      // Note: No need to set 'Content-Type': 'multipart/form-data'
      // It will be set automatically by the browser
    },
    body: formData,
  });
};
// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
};
export default employeeService;
