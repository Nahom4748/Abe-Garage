import React, { useState, useEffect } from "react";
import { Form, Button, Card, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

function AddOrder({ customer, onProceed }) {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    if (customer) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/vehicles/${customer.customer_id}`)
        .then((response) => {
          setVehicles(response.data);
        })
        .catch(() => {
          setError("Failed to fetch vehicles");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [customer]);

  const handleVehicleSelection = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleProceed = () => {
    if (selectedVehicle) {
      onProceed({ customer, vehicles: [selectedVehicle] });
    } else {
      alert("Please select a vehicle.");
    }
  };

  if (!customer) return <div>Select a customer to see details.</div>;

  return (
    <div>
      <h4>Customer Details</h4>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Customer Information</Card.Title>
          <Card.Text>
            <strong>Customer ID:</strong> {customer.customer_id}
            <br />
            <strong>First Name:</strong> {customer.customer_first_name}
            <br />
            <strong>Last Name:</strong> {customer.customer_last_name}
            <br />
            <strong>Email:</strong> {customer.customer_email}
            <br />
            <strong>Phone:</strong> {customer.customer_phone_number}
            <br />
            <strong>Added Date:</strong>{" "}
            {new Date(customer.customer_added_date).toLocaleString()}
          </Card.Text>
        </Card.Body>
      </Card>

      <h4>Vehicle Information</h4>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : vehicles.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Select</th>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Mileage</th>
              <th>Tag</th>
              <th>Type</th>
              <th>Serial</th>
              <th>Color</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr
                key={`${vehicle.vehicle_serial}-${vehicle.vehicle_id}`} // Unique key
                onClick={() => handleVehicleSelection(vehicle)}
                style={{
                  cursor: "pointer",
                  backgroundColor:
                    selectedVehicle &&
                    selectedVehicle.vehicle_serial === vehicle.vehicle_serial
                      ? "#d3f9d8"
                      : "inherit",
                }}
              >
                <td>
                  <Form.Check
                    type="radio"
                    name="vehicleSelection"
                    checked={
                      selectedVehicle &&
                      selectedVehicle.vehicle_serial === vehicle.vehicle_serial
                    }
                    onChange={() => handleVehicleSelection(vehicle)}
                  />
                </td>
                <td>{vehicle.vehicle_make}</td>
                <td>{vehicle.vehicle_model}</td>
                <td>{vehicle.vehicle_year}</td>
                <td>{vehicle.vehicle_mileage.toLocaleString()}</td>
                <td>{vehicle.vehicle_tag}</td>
                <td>{vehicle.vehicle_type}</td>
                <td>{vehicle.vehicle_serial}</td>
                <td>{vehicle.vehicle_color}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No vehicles found for this customer.</p>
      )}

      <Button variant="success" className="mt-3" onClick={handleProceed}>
        Proceed to Complete Order
      </Button>
    </div>
  );
}

export default AddOrder;
