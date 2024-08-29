import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Row, Alert } from "react-bootstrap";
import { Envelope, Person, Phone, Lock, People } from "react-bootstrap-icons";
import employeeService from "../../../../services/employee.service";

function AddEmployeeForm(props) {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);

  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!employee_first_name) {
      setFirstNameRequired("First name is required");
      valid = false;
    } else {
      setFirstNameRequired("");
    }

    if (!employee_email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(employee_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }

    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) {
      return;
    }

    const formData = {
      employee_email,
      employee_first_name,
      employee_last_name,
      employee_phone,
      employee_password,
      active_employee,
      company_role_id,
    };

    const newEmployee = employeeService.createEmployee(formData);
    newEmployee
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setServerError(data.error);
        } else {
          setSuccess(true);
          setServerError("");
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      })
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
        <h2 className="text-center mb-4">Add a New Employee</h2>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        {success && (
          <Alert variant="success">Employee added successfully!</Alert>
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
                    placeholder="Employee email"
                    value={employee_email}
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
                    placeholder="Employee first name"
                    value={employee_first_name}
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
                    placeholder="Employee last name"
                    value={employee_last_name}
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
                    placeholder="Employee phone (555-555-5555)"
                    value={employee_phone}
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
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
            </Col>

            <Col md={12}>
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
            </Col>

            <Col md={12}>
              <Button variant="primary" type="submit" className="w-100">
                Add Employee
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}

export default AddEmployeeForm;
