import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Row, Alert } from "react-bootstrap";
import { Envelope, Person, Phone, Lock, People } from "react-bootstrap-icons";
import customerService from "../../../../services/customer.service";

function AddCustomerForm(props) {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFirstName] = useState("");
  const [customer_last_name, setLastName] = useState("");
  const [customer_phone_number, setPhone] = useState("");
  // const [active_customer_status, setActiveCustomer] = useState(1);
  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  // const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    if (!customer_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }
    // Email is requires
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
    if (!valid) {
      return;
    }

    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
    };

    // pass the form data to the service
    const newCustomer = customerService.createCustomer(formData);

    newCustomer
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          // Handle successful response
          setSuccess(true);
          setServerError("");
          // Redirect to the employees page after 2 seconds
          // For now, just redirect to the home page
          setTimeout(() => {
            // window.location.href = '/admin/employees';
            window.location.href = "/";
          }, 2000);
        }
      })
      // handle catch
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setServerError(resMessage);
      });
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh", margin: "90px 0" }} // Added margin top and bottom
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
                    value={customer_phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            {/* <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <People />
                  </InputGroup.Text>
                  <Form.Select
                    value={company_role_id}
                    onChange={(event) => setCompany_role_id(event.target.value)}
                  >
                    <option value="1">Employee</option>
                    <option value="2">Manager</option>
                    <option value="3">Admin</option>
                  </Form.Select>
                </InputGroup>
              </Form.Group>
            </Col> */}

            {/* <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Lock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Employee password"
                    value={employee_password}
                    onChange={(event) => setPassword(event.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col> */}

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
