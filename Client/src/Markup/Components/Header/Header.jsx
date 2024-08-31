import React from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import logo from "../../../Assets/Images/Logo.png";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Contexts/AuthContext";
import { FaUserCircle, FaEdit, FaSignOutAlt } from "react-icons/fa"; // Import necessary icons
import "./Header.css";

function Header() {
  const { isLogged, employee, logout } = useAuth();
  const Navigate = useNavigate();

  const handleLogout = () => {
    logout();
    Navigate("/");
  };

  return (
    <>
      <header className="site-header header-style-6 style-1 Header">
        <div className="-top bg-primary text-white py-2">
          <div
            className="container-fluid d-flex justify-content-between align-items-center"
            style={{ flex: "0 1 auto" }}
          >
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
                <strong>
                  {isLogged
                    ? `Welcome, ${employee.employee_first_name}`
                    : "Welcome"}
                </strong>
              </div>
            </div>
          </div>
        </div>

        <Navbar
          collapseOnSelect
          expand="lg"
          bg="dark"
          variant="dark"
          sticky="top"
        >
          <Container>
            <Navbar.Brand className="me-auto">
              <img
                onClick={() => Navigate("/")}
                src={logo}
                width="60"
                height="50"
                alt="Logo"
              />
            </Navbar.Brand>

            {!isLogged && ( // Conditionally hide the navigation links when logged in
              <>
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
                    <Link to="/" className="nav-link text-white fw-bold">
                      Home
                    </Link>
                    <Link to="/about" className="nav-link text-white fw-bold">
                      About us
                    </Link>
                    <Link
                      to="/services"
                      className="nav-link text-white fw-bold"
                    >
                      Service
                    </Link>
                    <Link to="/contact" className="nav-link text-white fw-bold">
                      Contact Us
                    </Link>
                  </Nav>
                </Navbar.Collapse>
              </>
            )}

            <div className="ms-auto ">
              {isLogged ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-avatar"
                    className="text-white  "
                  >
                    <FaUserCircle size={30} /> {/* Avatar icon */}
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown bg-primary">
                    <Dropdown.Item
                      onClick={() => Navigate("/edit-profile")}
                      className="d-flex align-items-center bg-primary text-white "
                    >
                      <FaEdit className="me-2 bg-primary text-white" /> Edit
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item
                      onClick={handleLogout}
                      className="d-flex align-items-center text-white "
                    >
                      <FaSignOutAlt className="me-2 text-white" /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button
                  onClick={() => Navigate("/login")}
                  className="site-button bg-primary text-white fw-bold border-0"
                >
                  Login
                </Button>
              )}
            </div>
          </Container>
        </Navbar>
      </header>
    </>
  );
}

export default Header;
