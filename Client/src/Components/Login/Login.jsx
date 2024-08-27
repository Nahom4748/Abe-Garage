import React from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

function Login() {
  return (
    <div className="login-area pt-5 pb-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="text-center mb-4">
              <h1 className="section-title">
                Sign In <br />
                To Your Account
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={6}>
            <div className="login-inner">
              <Form className="form-box">
                <Form.Group controlId="formEmail" className="mb-3">
                  <Form.Control type="email" placeholder="Email*" />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                  <Form.Control type="password" placeholder="Password*" />
                </Form.Group>

                <Button className="theme-btn-1 btn-block" type="submit">
                  SIGN IN
                </Button>
                <div className="go-to-btn mt-3 text-center">
                  <a href="#" title="Forgot Password?">
                    <small>FORGOTTEN YOUR PASSWORD?</small>
                  </a>
                </div>
              </Form>
            </div>
          </Col>
          <Col lg={6} className="text-center pt-4">
            <h4>DON'T HAVE AN ACCOUNT?</h4>
            <p>
              Add items to your wishlist, get personalized recommendations,{" "}
              <br />
              check out more quickly, and track your orders.
            </p>
            <Button href="register.html" className="theme-btn-1 black-btn">
              CREATE ACCOUNT
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
