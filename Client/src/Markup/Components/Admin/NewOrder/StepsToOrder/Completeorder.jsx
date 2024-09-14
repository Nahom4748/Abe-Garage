import React, { useState, useEffect } from "react";
import { Card, Form, Row, Col, Alert, Button, Table } from "react-bootstrap";
import axios from "axios";
import "./CompleteOrder.css"; // Custom styles

const CompleteOrder = ({ customer, vehicles, onSubmit }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    if (customer) {
      axios
        .get("http://localhost:5000/api/services")
        .then((response) => setServices(response.data.data))
        .catch((err) => {
          console.error("Error fetching services:", err);
          setError("Failed to fetch services");
        });
    }
  }, [customer]);

  const handleCheckboxChange = (serviceId) => {
    setSelectedServices((prevSelected) => ({
      ...prevSelected,
      [serviceId]: !prevSelected[serviceId],
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const selectedServiceDetails = services
      .filter((service) => selectedServices[service.service_id])
      .map((service) => ({
        id: service.service_id,
        name: service.service_name,
        description: service.service_description,
        price: service.service_price,
      }));

    onSubmit({
      selectedServices: selectedServiceDetails,
      customPrice: parseFloat(customPrice) || 0,
      additionalNotes,
    });
  };

  if (!customer) return <Alert variant="warning">No customer selected.</Alert>;
  if (!vehicles || vehicles.length === 0)
    return <Alert variant="warning">No vehicle information available.</Alert>;

  // Generate selected services list
  const selectedServiceDetails = services
    .filter((service) => selectedServices[service.service_id])
    .map((service) => ({
      ...service,
      price: service.service_price.toFixed(2),
    }));

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body className="step-container">
        <Card.Title className="fs-4">Complete Order</Card.Title>

        {/* Customer Info */}
        <h5 className="mt-4 fs-5">Customer Information</h5>
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

        {/* Vehicle Info Table */}
        <h5 className="mt-4 fs-5">Vehicle Information</h5>
        <Table striped bordered hover className="vehicle-table mt-3">
          <thead>
            <tr>
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
              <tr key={vehicle.vehicle_serial}>
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

        {/* Service Info Table */}
        <h5 className="mt-4 fs-5">Service Information</h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {services.length > 0 ? (
          <Row className="mt-3">
            <Col xs={12} md={7}>
              <Table striped bordered hover className="service-table">
                <thead>
                  <tr>
                    <th>Select</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr
                      key={service.service_id}
                      style={{
                        backgroundColor: selectedServices[service.service_id]
                          ? "#d3f9d8"
                          : "inherit",
                      }}
                    >
                      <td>
                        <Form.Check
                          type="checkbox"
                          id={`service-${service.service_id}`}
                          checked={!!selectedServices[service.service_id]}
                          onChange={() =>
                            handleCheckboxChange(service.service_id)
                          }
                          className="checkbox-large"
                        />
                      </td>
                      <td>{service.service_name}</td>
                      <td>{service.service_description}</td>
                      <td>${service.service_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col xs={12} md={5}>
              <div className="selected-services-summary">
                <h5>Selected Services</h5>
                {selectedServiceDetails.length > 0 ? (
                  <ul>
                    {selectedServiceDetails.map((service) => (
                      <li key={service.id}>{service.service_name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No services selected.</p>
                )}
              </div>
            </Col>
          </Row>
        ) : (
          <Alert variant="info" className="mt-3">
            No services available.
          </Alert>
        )}

        {/* Additional Order Details Form */}
        <h5 className="mt-4 fs-5">Additional Order Details</h5>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formNotes">
            <Form.Label>Additional Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Enter any additional notes for the order"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCustomPrice">
            <Form.Label>Custom Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter custom price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              step="0.01"
              min="0"
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CompleteOrder;
