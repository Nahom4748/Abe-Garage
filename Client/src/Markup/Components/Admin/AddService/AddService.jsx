import React, { useState, useEffect } from "react";
import getAuth from "../../util/auth";
import "./AddService.css";

const AddService = () => {
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState(""); // New state for service price
  const [isAuthorized, setIsAuthorized] = useState(false);

  const handleAddService = async (e) => {
    e.preventDefault();
    const employee = await getAuth();
    if (!employee.employee_id) {
      alert("You are not authenticated. Please log in.");
      return;
    }
    if (employee.employee_role !== 3) {
      alert("You do not have permission to add a service.");
      return;
    }
    const serviceData = {
      name: serviceName,
      description: serviceDescription,
      price: servicePrice,
      createdBy: employee.employee_id,
    };

    try {
      const response = await fetch("/api/addService", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${employee.employee_token}`,
        },
        body: JSON.stringify(serviceData),
      });

      if (response.ok) {
        alert("Service added successfully");
        setServiceName("");
        setServiceDescription("");
        setServicePrice(""); 
      } else {
        alert("Failed to add service");
      }
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    const checkAuthorization = async () => {
      const employee = await getAuth();
      if (employee && employee.employee_role === 3) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  return (
    <div className="add-service-container">
      <h2 className="add-service-header">
        Add a New Service
        <span className="add-service-underline"></span>
      </h2>
      <form onSubmit={handleAddService}>
        <div className="add-service-input-group">
          <label htmlFor="serviceName">Service Name:</label>
          <input
            type="text"
            id="serviceName"
            className="add-service-input"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            required
          />
        </div>
        <div className="add-service-input-group">
          <label htmlFor="servicePrice">Service Price:</label>
          <input
            type="number"
            id="servicePrice"
            className="add-service-input"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            required
          />
        </div>
        <div className="add-service-input-group">
          <label htmlFor="serviceDescription">Service Description:</label>
          <textarea
            id="serviceDescription"
            className="add-service-textarea"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="add-service-button">
          Add Service
        </button>
      </form>
    </div>
  );
};

export default AddService;
