import React from "react";
import { Navbar, Nav, Container, Row, Col, Button } from "react-bootstrap";
import logo from "../../assets/images/Logo.ico";

function Header() {
  return (
    <>
      <header className="site-header header-style-6 style-1">
        <div className="bg-dark">
          <Container className="header-contant-block">
            <Row>
              <Col lg={8}>
                <ul className="contact-info list-inline">
                  <li className="list-inline-item">
                    <h6 className="text-primary">
                      <i className="ti-mobile text-primary"></i> Call Us
                    </h6>
                    <span>+141 0800-123456</span>
                  </li>

                  <li className="list-inline-item">
                    <h6 className="text-primary">
                      <i className="fa fa-clock-o text-primary"></i> Opening
                      Time
                    </h6>
                    <span>Mon - Sat: 7:00 - 17:00</span>
                  </li>
                </ul>
              </Col>
              <Col lg={4} className="text-end pt-4">
                <h6 className="text-white">Welcome</h6>
              </Col>
            </Row>
          </Container>
        </div>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="top"
          className="main-bar-wraper"
        >
          <Container>
            <Navbar.Brand href="index.html">
              <img src={logo} width="50" height="50" alt="Logo" />
            </Navbar.Brand>
            <Navbar.Toggle
              aria-controls="navbarNavDropdown"
              className="border-0"
            >
              <span
                className="navbar-toggler-icon"
                style={{ color: "white" }}
              ></span>
            </Navbar.Toggle>
            <Navbar.Collapse id="navbarNavDropdown">
              <Nav className="me-auto">
                <Nav.Link href="#home" active>
                  Home
                </Nav.Link>
                <Nav.Link href="#features">About us </Nav.Link>
                <Nav.Link href="#pages">Service</Nav.Link>
                <Nav.Link href="#shop">Contact Us</Nav.Link>
              </Nav>
              <div className="extra-nav">
                <Button id="quik-search-btn" className="site-button">
                  Login
                </Button>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
