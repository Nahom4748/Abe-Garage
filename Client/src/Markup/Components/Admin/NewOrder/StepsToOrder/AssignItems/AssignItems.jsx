import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Table, Button, Alert, Form } from "react-bootstrap";
import "./Assignitems.css"; // Import custom CSS

const Assignitems = ({
  customer = {},
  vehicles = [],
  orderDetails = {},
  services = [],
}) => {
  const selectedServices = orderDetails.selectedServices || [];
  const additionalNotes = orderDetails.additionalNotes || "N/A";
  const customPrice = orderDetails.customPrice || "0.00";
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [error, setError] = useState(null);

  // Create a map of selected services with price and name
  const serviceMap = services.reduce((acc, service) => {
    acc[service.service_id] = {
      name: service.service_name,
      price: service.service_price.toFixed(2),
    };
    return acc;
  }, {});

  // Calculate total price of selected services
  const totalPrice = selectedServices
    .reduce((total, service) => {
      const servicePrice = parseFloat(service.price);
      return total + servicePrice;
    }, 0)
    .toFixed(2);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees") // Replace with your API endpoint
      .then((response) => {
        // Filter employees based on company_role_id
        const filteredEmployees = response.data.data.filter(
          (employee) => employee.company_role_id === 1
        );
        setEmployees(filteredEmployees);
      })
      .catch((err) => {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employees");
      });
  }, []);

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) => {
      if (prevSelected.includes(employeeId)) {
        return prevSelected.filter((id) => id !== employeeId);
      } else {
        return [...prevSelected, employeeId];
      }
    });
  };

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fs-4">Assigned Items</Card.Title>

        {/* Customer Information */}
        <h5 className="mt-4 fs-5">Customer Information</h5>
        <Table striped bordered hover className="customer-table custom-table">
          <tbody>
            <tr>
              <td>
                <strong>First Name:</strong>
              </td>
              <td>
                {customer.customer_first_name}
                {customer.customer_last_name}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>{customer.customer_email || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
              </td>
              <td>{customer.customer_phone_number || "N/A"}</td>
            </tr>
          </tbody>
        </Table>

        {/* Vehicle Information */}
        <h5 className="mt-4 fs-5">Vehicle Information</h5>
        <Table striped bordered hover className="vehicle-table custom-table">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_serial}>
                <td>{vehicle.vehicle_make}</td>
                <td>{vehicle.vehicle_model}</td>
                <td>{vehicle.vehicle_year}</td>
                <td>{vehicle.vehicle_serial}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Selected Services */}
        <h5 className="mt-4 fs-5">Selected Services</h5>
        <Table
          striped
          bordered
          hover
          className="service-table custom-table mt-3"
        >
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>${service.price}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total Price</strong>
              </td>
              <td>
                <strong>${totalPrice}</strong>
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Employee Information */}
        <h5 className="mt-4 fs-5">Employee Information</h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {employees.length > 0 ? (
          <Table
            striped
            bordered
            hover
            className="employee-table custom-table mt-3"
          >
            <thead>
              <tr>
                <th>Select</th>
                <th>Full Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      id={`employee-${employee.employee_id}`}
                      checked={selectedEmployees.includes(employee.employee_id)}
                      onChange={() =>
                        handleCheckboxChange(employee.employee_id)
                      }
                    />
                  </td>
                  <td>{`${employee.employee_first_name} ${employee.employee_last_name}`}</td>
                  <td>{employee.employee_phone || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info" className="mt-3">
            No employee information available.
          </Alert>
        )}

        {/* Additional Details */}
        <h5 className="mt-4 fs-5">Additional Details</h5>
        <Card.Text className="small-text text-muted">
          <strong>Additional Notes:</strong> {additionalNotes}
        </Card.Text>
        <Card.Text className="small-text text-muted">
          <strong>Custom Price:</strong> ${customPrice}
        </Card.Text>

        <Button variant="primary" className="mt-3">
          Finalize Order
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Assignitems;
