// Import from the env
const api_url = "http://localhost:8001";

// A function to send a POST request to add a new vehicle
const addVehicle = async (formData, token) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

// A function to send a PUT request to update an existing vehicle
const updateVehicle = async (formData, token) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token, // Ensure token is being sent
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/vehicle`, requestOptions);
  return response;
};

// A function to send a DELETE request to remove a vehicle by ID
const deleteVehicle = async (vehicleId, token) => {
  const url = `${api_url}/api/vehicle/${vehicleId}`;

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
    console.error("Error deleting vehicle:", error);
    throw error;
  }
};

// A function to send a GET request to retrieve all vehicles
const getAllVehicles = async (token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(`${api_url}/api/vehicles`, requestOptions);
  return response;
};

// A function to send a GET request to retrieve vehicles by customer name
const getVehicleByCustomerName = async (customerName, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": token,
    },
  };
  const response = await fetch(
    `${api_url}/api/vehicles/customer/${customerName}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const vehicleService = {
  addVehicle,
  updateVehicle,
  deleteVehicle,
  getAllVehicles,
  getVehicleByCustomerName,
};

export default vehicleService;
