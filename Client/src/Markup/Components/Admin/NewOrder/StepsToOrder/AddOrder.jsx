import React, { useState, useEffect } from "react";
import { Form, Button, Card, Table, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { FaCheck, FaTimes } from "react-icons/fa";

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
  console.log(vehicles);
  return (
    <div>
      <h5 className="mt-4 fs-5">
        Customer Information{" "}
        {customer ? (
          <FaCheck className="text-success ms-2" />
        ) : (
          <FaTimes className="text-danger ms-2" />
        )}
      </h5>
      <Table bordered className="customer-info-table mt-3">
        <tbody>
          <tr>
            <td>
              <strong>Customer ID:</strong> {customer.customer_id}
            </td>
            <td>
              <strong>Name:</strong> {customer.customer_first_name}{" "}
              {customer.customer_last_name}
            </td>
          </tr>
          <tr>
            <td>
              <strong>Email:</strong> {customer.customer_email}
            </td>
            <td>
              <strong>Phone:</strong> {customer.customer_phone_number}
            </td>
          </tr>
        </tbody>
      </Table>

      <h5 className="mt-4 fs-5">
        Vehicle Information{" "}
        {!selectedVehicle ? (
          <FaTimes className="text-danger ms-2" />
        ) : (
          <FaCheck className="text-success ms-2" />
        )}
      </h5>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : vehicles.length > 0 ? (
        <Table striped bordered hover className="vehicle-table mt-3">
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
                key={`${vehicle.vehicle_serial}-${vehicle.vehicle_id}`}
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
