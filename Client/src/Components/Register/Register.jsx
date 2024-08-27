import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function Register() {
  return (
    <div className="register-area pt-5 pb-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-4">
              <h1 className="section-title">
                Register <br />
                Your Account
              </h1>
              <p>
                Create an account to enjoy all the services without any ads for
                free!
              </p>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6}>
            <div className="register-inner">
              <Form className="form-box">
                <Form.Group controlId="formFirstName" className="mb-3">
                  <Form.Control type="text" placeholder="First Name*" />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mb-3">
                  <Form.Control type="text" placeholder="Last Name*" />
                </Form.Group>

                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control type="email" placeholder="Email*" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control type="password" placeholder="Password*" />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password*"
                  />
                </Form.Group>

                <Form.Check
                  type="checkbox"
                  label="I agree to the terms and conditions"
                  className="mb-3"
                />

                <Button className="theme-btn-1 btn-block" type="submit">
                  CREATE ACCOUNT
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col lg={6} className="text-center pt-4">
            <p>
              By creating an account, you agree to our Terms and Conditions and
              Privacy Policy.
            </p>
            <Button href="login.html" className="theme-btn-1 black-btn">
              ALREADY HAVE AN ACCOUNT?
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
