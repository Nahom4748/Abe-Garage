import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCar,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import "./AppointmentForm.css"; // Import custom CSS

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    make: "",
    model: "",
    year: "",
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="appointment-form-container">
      <h2 className="form-title">Appointment</h2>
      <Form onSubmit={handleSubmit} className="appointment-form">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFirstName">
            <Form.Label>
              <FaUser /> First Name
            </Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridLastName">
            <Form.Label>
              <FaUser /> Last Name
            </Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridEmail">
          <Form.Label>
            <FaEnvelope /> Email
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridPhone">
          <Form.Label>
            <FaPhone /> Phone
          </Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridMake">
            <Form.Label>
              <FaCar /> Make
            </Form.Label>
            <Form.Control
              type="text"
              name="make"
              value={formData.make}
              onChange={handleChange}
              placeholder="Enter vehicle make"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridModel">
            <Form.Label>
              <FaCar /> Model
            </Form.Label>
            <Form.Control
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="Enter vehicle model"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridYear">
            <Form.Label>
              <FaCar /> Year
            </Form.Label>
            <Form.Control
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter vehicle year"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridService">
          <Form.Label>
            <FaCar /> Service Needed
          </Form.Label>
          <Form.Select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select a service</option>
            <option value="Oil Change">Oil Change</option>
            <option value="Tire Rotation">Tire Rotation</option>
            <option value="Brake Inspection">Brake Inspection</option>
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDate">
            <Form.Label>
              <FaCalendarAlt /> Date
            </Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridTime">
            <Form.Label>
              <FaClock /> Time
            </Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit" className="submit-button">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AppointmentForm;
