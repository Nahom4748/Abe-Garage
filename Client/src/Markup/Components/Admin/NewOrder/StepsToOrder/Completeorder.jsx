import React, { useState, useEffect } from "react";
import {
  Card,
  ListGroup,
  Form,
  Row,
  Col,
  Alert,
  Button,
} from "react-bootstrap";
import axios from "axios";
import "./CompleteOrder.css"; // Custom styles

const CompleteOrder = ({ customer, vehicles }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [selectedServices, setSelectedServices] = useState({});
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    if (customer) {
      // Fetch services from the API
      axios
        .get("http://localhost:5000/api/services")
        .then((response) => {
          setServices(response.data.data);
        })
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
    // Handle the form submission logic, like sending data to an API or performing further validation.
    console.log("Selected Services:", selectedServices);
    console.log("Custom Price:", customPrice);
    console.log("Additional Notes:", additionalNotes);
  };

  if (!customer) {
    return <Alert variant="warning">No customer selected.</Alert>;
  }

  if (!vehicles || vehicles.length === 0) {
    return <Alert variant="warning">No vehicle information available.</Alert>;
  }

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body className="step-container">
        <Card.Title className="fs-4">Complete Order</Card.Title>
        <Card.Text className="small-text text-muted">
          <strong>Customer:</strong> {customer.customer_first_name}{" "}
          {customer.customer_last_name}
        </Card.Text>
        <Card.Text className="small-text text-muted">
          <strong>Email:</strong> {customer.customer_email}
        </Card.Text>
        <Card.Text className="small-text text-muted">
          <strong>Phone:</strong> {customer.customer_phone_number}
        </Card.Text>

        <h5 className="mt-4 fs-5">Vehicle Information</h5>
        <Row xs={1} md={2} lg={3} className="g-3">
          {vehicles.map((vehicle) => (
            <Col key={vehicle.vehicle_serial}>
              <Card className="vehicle-card">
                <Card.Body className="p-3">
                  <Card.Title className="vehicle-title">
                    {vehicle.vehicle_make} {vehicle.vehicle_model}
                  </Card.Title>
                  <Card.Text className="small-text text-muted">
                    <strong>Year:</strong> {vehicle.vehicle_year}
                  </Card.Text>
                  <Card.Text className="small-text text-muted">
                    <strong>Mileage:</strong>{" "}
                    {vehicle.vehicle_mileage.toLocaleString()}
                  </Card.Text>
                  <Card.Text className="small-text text-muted">
                    <strong>Tag:</strong> {vehicle.vehicle_tag}
                  </Card.Text>
                  <Card.Text className="small-text text-muted">
                    <strong>Type:</strong> {vehicle.vehicle_type}
                  </Card.Text>
                  <Card.Text className="small-text text-muted">
                    <strong>Serial:</strong> {vehicle.vehicle_serial}
                  </Card.Text>
                  <Card.Text className="small-text text-muted">
                    <strong>Color:</strong> {vehicle.vehicle_color}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h5 className="mt-4 fs-5">Service Information</h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {services.length > 0 ? (
          <ListGroup className="service-list mt-3">
            {services.map((service) => (
              <ListGroup.Item
                key={service.service_id}
                className="d-flex justify-content-between align-items-center py-3 try"
              >
                <div className="service-info">
                  <h6 className="mb-1">{service.service_name}</h6>
                  <p className="small-text text-muted mb-1">
                    {service.service_description}
                  </p>
                  <strong className="service-price">
                    ${service.service_price.toFixed(2)}
                  </strong>
                </div>
                <Form.Check
                  type="checkbox"
                  id={`service-${service.service_id}`}
                  checked={!!selectedServices[service.service_id]}
                  onChange={() => handleCheckboxChange(service.service_id)}
                  className="checkbox-large"
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info" className="mt-3">
            No services available.
          </Alert>
        )}

        {/* Additional Order Details Section */}
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
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CompleteOrder;
