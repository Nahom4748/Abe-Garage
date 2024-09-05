const customerService = require("../services/customer.service");
const jwt = require("jsonwebtoken");
// Import the secret key from the environment variables
const jwtSecret = process.env.JWT_SECRET;

// Handle adding customer

async function AddCustomer(req, res, next) {
  try {
    // check if customer email already exists in the database
    const customerExists = await customerService.checkIfCustomerExists(
      req.body.customer_email
    );
    // If customer exists, send a response to the client
    if (customerExists) {
      res.status(400).json({
        error:
          "This email address is already associated with another customer!",
      });
    } else {
      try {
        const customerData = req.body;
        // create the customer
        const customer = await customerService.createCustomer(customerData);
        if (!customer) {
          res.stauts(400).json({
            error: "Failed to add the customer!",
          });
        } else {
          res.status(201).json({ message: "Customer created successfully" });
        }
      } catch (error) {
        console.log(err);
        res.status(400).json({
          error: "Something went wrong!",
        });
      }
    }
  } catch (error) {}
}

module.exports = {
  AddCustomer,
};
