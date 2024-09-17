// const api_url = process.env.REACT_APP_API_URL;

// A function to send the login request to the server
const logIn = async (formData) => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `http://localhost:5000/api/employee/login`,
    requestOptions
  );
  if (!response.ok) {
    const response2 = await fetch(
      `http://localhost:5000/api/customer/login`,
      requestOptions
    );
    if (!response2.ok) {
      throw new Error("Network response was not ok");
    }

    return response2;
  }
  console.log(response);
  return response;
};

// Export the functions

const loginService = {
  logIn,
};
export default loginService;
