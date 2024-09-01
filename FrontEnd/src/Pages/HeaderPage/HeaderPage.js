import React, { useState, useEffect } from "react";

import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import { Navbar, Nav, Button, Dropdown, Container } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../../assets/img/logo.png"; // Make sure to adjust the logo path
import "./Header.css";
function HeaderPage() {
  const { isLogged, employee, logout } = useAuth();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header
      className={`header-section ${show ? "sticky-active" : ""}`}
      style={{ backgroundColor: "#071c1f" }}
    >
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        sticky="top"
      >
        <Container>
          {/* Centering the logo and text */}
          <Navbar.Brand onClick={() => navigate("/")}>
            <img src={logo} width="60" height="50" alt="Logo" />
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="text-center">
              {!isLogged && (
                <>
                  <Link to="/" className="nav-link text-white">
                    Home
                  </Link>
                  <Link to="/about" className="nav-link text-white">
                    About
                  </Link>
                  <Link to="/services" className="nav-link text-white">
                    Service
                  </Link>
                  <Link to="/contact" className="nav-link text-white">
                    Contact
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* Conditional rendering for login button or avatar */}
          <div className="ml-auto d-flex align-items-center">
            {!isLogged ? (
              <Button
                onClick={() => navigate("/login")}
                className="bg-color text-white"
              >
                Login
              </Button>
            ) : (
              <Dropdown align="end">
                <Dropdown.Toggle
                  variant="d"
                  id="dropdown-avatar"
                  className="text-white d-flex align-items-center"
                >
                  <FaUserCircle size={30} />
                  <small className="ms-2 text-white">
                    {employee.employee_first_name}
                  </small>
                </Dropdown.Toggle>

                <Dropdown.Menu className="b">
                  <Dropdown.Item
                    onClick={() => navigate("/edit-profile")}
                    className="text-white"
                  >
                    <FaUserCircle className="me-2" /> Edit Profile
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} className="text-white">
                    <FaSignOutAlt className="me-2" /> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
}

export default HeaderPage;
