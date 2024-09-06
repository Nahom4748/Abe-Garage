//import the customer service
const customerService = require("../services/customer.service");

//create a function to create a customer
async function createCustomer(req, res, next) {
  const customerExists = await customerService.checkIfCustomerExists(
    req.body.customer_email
  );
  if (customerExists) {
    return res.status(400).json({ error: "Customer already exists" });
  } else {
    try {
      //get the customer data from the request body
      const customerData = req.body;
      //call the createCustomer method from the customer service
      const customer = await customerService.addCustomerInfo(customerData);
      if (!customer) {
        return res.status(400).json({ error: "Customer not created" });
      } else {
        res
          .status(201)
          .json({ message: "Customer created successfully", success: "true" });
      }
    } catch (error) {
      //send the error as a response
      res.status(400).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
      // Send the error as a response with a more descriptive message
      res.status(500).json({
        error: "Internal Server Error",
        message: "An error occurred while creating the customer.",
      });
    }
  }
}
//create a function to get all customers
async function getAllCustomers(req, res, next) {
  try {
    //call the getAllCustomers method from the customer service
    const customers = await customerService.getAllCustomers();
    //send the customers as a response
    res.status(200).json(customers);
  } catch (error) {
    //send the error as a response
    res
      .status(401)
      .json({ error: "Unauthorized", message: "Authentication invalid" });
  }
}
//create a function to get a customer by id
async function getCustomerById(req, res, next) {
  const { id } = req.params; // Assuming ID is passed as a URL parameter
  console.log("Fetching customer with ID:", id); // Log the ID
  try {
    const customer = await customerService.getCustomerById(id);
    console.log("Customer found:", customer); // Log the customer object
    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }
    res.status(200).json(customer);
  } catch (error) {
    console.error("Error fetching customer:", error); // Log any errors
    res.status(500).json({ error: "Internal server error" });
  }
}

//export the createCustomer function
module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
};
