import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import customerService from "../../../services/customer.service";
import "../admin/Addcustomer.css";
import { useAuth } from "../../../Contexts/AuthContext"; // Assuming you're using useAuth for token

const CustomerEdit = () => {
  const { customer_id } = useParams(); // Get the customer_id from the URL
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { employee } = useAuth(); // Get the employee object from AuthContext
  const token = employee ? employee.employee_token : null; // Extract the token
  const navigate = useNavigate(); // Initialize useNavigate for redirection

  const [formData, setFormData] = useState({
    customer_first_name: "",
    customer_last_name: "",
    customer_email: "",
    customer_phone_number: "",
    active_customer_status: "",
  });

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await customerService.getCustomerById(customer_id, token); // Fetch customer data by ID
        if (res.ok) {
          const data = await res.json();
          setCustomer(data);
          setFormData(data); // Populate form with customer data
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customer_id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation check before making the API call
    if (
      !formData.customer_first_name ||
      !formData.customer_last_name ||
      !formData.customer_email ||
      !formData.customer_phone_number ||
      !formData.active_customer_status) {
      alert("Please ensure all required fields are filled before submitting.");
      return;
    }

    try {
      // Call the update API
      const res = await customerService.updateCustomer(formData);

      if (res.ok) {
        alert("Customer updated successfully!");
        navigate("/admin/customers"); // Redirect to the customer list
      } else {
        console.error("Error updating customer");
      }
    } catch (err) {
      console.error("Error updating customer:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching customer details</p>;

  return (
    <div className="container mt-5">
      <div className="form-container mb-5">
        <h2 className="mb-4">Edit Customer</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="form-row">
            {/* First Name */}
            <div className="form-group col-md-12">
              <label htmlFor="customer_first_name">First Name</label>
              <input
                type="text"
                className="form-control"
                id="customer_first_name"
                name="customer_first_name"
                value={formData.customer_first_name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter a first name.</div>
            </div>

            {/* Last Name */}
            <div className="form-group col-md-12">
              <label htmlFor="customer_last_name">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="customer_last_name"
                name="customer_last_name"
                value={formData.customer_last_name}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Please enter a last name.</div>
            </div>
          </div>

          {/* Email */}
          <div className="form-group col-md-12">
            <label htmlFor="customer_email">Email</label>
            <input
              type="email"
              className="form-control"
              id="customer_email"
              name="customer_email"
              value={formData.customer_email}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid email address.
            </div>
          </div>

          {/* Phone Number */}
          <div className="form-group col-md-12">
            <label htmlFor="customer_phone_number">Phone</label>
            <input
              type="text"
              className="form-control"
              id="customer_phone_number"
              name="customer_phone_number"
              value={formData.customer_phone_number}
              onChange={handleChange}
              required
            />
            <div className="invalid-feedback">
              Please enter a valid phone number.
            </div>
          </div>

          {/* Status */}
          <div className="form-group col-md-12">
            <label htmlFor="active_customer_status">Status</label>
            <select
              className="form-control"
              id="active_customer_status"
              name="active_customer_status"
              value={formData.active_customer_status}
              onChange={handleChange}
              required
            >
              <option value="">Select Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
            <div className="invalid-feedback">Please select a status.</div>
          </div>

          {/* Save Changes Button */}
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn btn-primary mt-3 mb-15"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerEdit;
