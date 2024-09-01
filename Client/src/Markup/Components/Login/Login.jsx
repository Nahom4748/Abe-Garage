import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import loginService from "../../../services/login.service";

import {
  Form,
  Button,
  InputGroup,
  Alert,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { Envelope, Lock } from "react-bootstrap-icons";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    if (!employee_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!employee_email.includes("@")) {
      setEmailError("Invalid email format");
      valid = false;
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

    if (!valid) return;

    const formData = {
      employee_email,
      employee_password,
    };

    try {
      const response = await loginService.logIn(formData); // Correct usage of the imported function
      const data = await response.json();

      if (data.status === "success") {
        if (data.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(data.data));
        }

        if (location.pathname === "/login") {
          {
            if (data.data.roles === 3) {
              navigate("/Admin");
            } else if (data.data.roles === 2) {
              navigate("/Admin-Dashbord");
            }
          }
        } else {
          window.location.reload();
        }
      } else {
        setServerError(data.message);
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <Row className="w-100">
        <Col md={{ span: 6, offset: 3 }}>
          <div className="p-4 bg-light rounded shadow">
            <h2 className="text-center mb-4">Login to your account</h2>
            {serverError && <Alert variant="danger">{serverError}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Envelope />
                  </InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={employee_email}
                    onChange={(event) => setEmail(event.target.value)}
                    isInvalid={!!emailError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {emailError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Lock />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={employee_password}
                    onChange={(event) => setPassword(event.target.value)}
                    isInvalid={!!passwordError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {passwordError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
