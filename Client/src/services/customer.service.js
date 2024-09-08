// create a async function to add a service
export const addService = async (serviceData, employeeToken) => {
  try {
    // Send POST request to add service
    const response = await fetch("http://localhost:5000/api/service", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${employeeToken}`,
      },
      body: JSON.stringify(serviceData),
    });
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error adding service:", error);
  }
};
