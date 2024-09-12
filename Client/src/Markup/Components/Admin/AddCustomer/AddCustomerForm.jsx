import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Row, Alert } from "react-bootstrap";
import { Envelope, Person, Phone, Lock } from "react-bootstrap-icons";
import customerService from "../../../../services/customer.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function AddCustomerForm(props) {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhone] = useState("");
  const [customer_password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let valid = true;

    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    // Email validation
    if (!customer_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    // Password validation
    if (!customer_password) {
      setPasswordError("Password is required");
      valid = false;
    } else if (customer_password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      customer_password,
    };
    try {
      await customerService.createCustomer(formData, token);
      setSuccess(true);
      setServerError("");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh", margin: "90px 0" }}
    >
      <div
        className="p-4 bg-light rounded shadow"
        style={{ width: "80%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">Add a New Customer</h2>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        {success && (
          <Alert variant="success">Customer added successfully!</Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Envelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="customer email"
                    value={customer_email}
                    onChange={(event) => setEmail(event.target.value)}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Person />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="customer first name"
                    value={customer_first_name}
                    onChange={(event) => setFirstName(event.target.value)}
                    isInvalid={!!firstNameRequired}
                  />
                  <Form.Control.Feedback type="invalid">
                    {firstNameRequired}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Person />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="customer last name"
                    value={customer_last_name}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Phone />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="customer phone (555-555-5555)"
                    value={customer_phone_number}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* Password Field */}
            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Lock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="customer password"
                    value={customer_password}
                    onChange={(event) => setPassword(event.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Button variant="primary" type="submit" className="w-100">
                Add Customer
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}

export default AddCustomerForm;
