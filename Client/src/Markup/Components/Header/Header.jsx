import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import logo from "../../../Assets/Images/Logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";

function Header(props) {
  console.log(useAuth());

  const Navigate = useNavigate();
  return (
    <>
      <header className="site-header header-style-6 style-1">
        <div className="header-top bg-primary text-white py-2">
          <div className="auto-container d-flex justify-content-between align-items-center">
            <div className="left-column d-flex align-items-center">
              <div className="text me-4">
                Schedule Appointment: <strong>1800 456 7890</strong>
              </div>
              <div className="office-hour me-4">
                Monday - Saturday 7:00AM - 6:00PM
              </div>
            </div>
            <div className="right-column d-flex align-items-center">
              <div className="phone-number me-4">
                <strong>Welcome</strong>
              </div>
            </div>
          </div>
        </div>

        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="top" // Ensures the navbar sticks to the top when scrolling
        >
          <Container>
            {/* Left-aligned: Logo */}
            <Navbar.Brand className="me-auto">
              <img
                onClick={() => Navigate("/")}
                src={logo}
                width="60"
                height="50"
                alt="Logo"
              />
            </Navbar.Brand>

            {/* Center-aligned: Nav Links */}
            <Navbar.Toggle
              aria-controls="navbarNavDropdown"
              className="border-0"
            >
              <span className="navbar-toggler-icon"></span>
            </Navbar.Toggle>
            <Navbar.Collapse
              id="navbarNavDropdown"
              className="justify-content-center"
            >
              <Nav className="text-center">
                <Nav.Link href="#home" className="text-white fw-bold" active>
                  Home
                </Nav.Link>
                <Nav.Link href="#features" className="text-white fw-bold">
                  About us
                </Nav.Link>
                <Nav.Link href="#pages" className="text-white fw-bold">
                  Service
                </Nav.Link>
                <Nav.Link href="#shop" className="text-white fw-bold">
                  Contact Us
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>

            {/* Right-aligned: Login Button */}
            <div className="ms-auto">
              <Button
                onClick={() => Navigate("/login")}
                className="site-button bg-primary text-white fw-bold border-0"
              >
                Login
              </Button>
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
