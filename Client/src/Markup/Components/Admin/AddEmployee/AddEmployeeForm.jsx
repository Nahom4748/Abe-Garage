import React, { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import employeeService from "../../../../services/employee.service";
import { useAuth } from "../../../../Contexts/AuthContext";
import "./AddEmployeeForm.css";

function AddEmployeeForm() {
  const [employee_email, setEmail] = useState("");
  const [employee_first_name, setFirstName] = useState("");
  const [employee_last_name, setLastName] = useState("");
  const [employee_phone, setPhoneNumber] = useState("");
  const [employee_password, setPassword] = useState("");
  const [active_employee, setActive_employee] = useState(1);
  const [company_role_id, setCompany_role_id] = useState(1);
  const [employee_image, setEmployeeImage] = useState(null);
  const [success, setSuccess] = useState(false); // Added success state

  // Errors
  const [emailError, setEmailError] = useState("");
  const [firstNameRequired, setFirstNameRequired] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const { employee } = useAuth();
  const loggedInEmployeeToken = employee?.employee_token || "";

  const handleImageChange = (event) => {
    setEmployeeImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Validation logic
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

    if (!valid) {
      return;
    }

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append("employee_email", employee_email);
    formData.append("employee_first_name", employee_first_name);
    formData.append("employee_last_name", employee_last_name);
    formData.append("employee_phone", employee_phone);
    formData.append("employee_password", employee_password);
    formData.append("active_employee", active_employee);
    formData.append("company_role_id", company_role_id);

    if (employee_image) {
      formData.append("employee_image", employee_image);
    }

    try {
      const data = await employeeService.createEmployee(
        formData,
        loggedInEmployeeToken
      );
      if (data.error) {
        setServerError(data.error);
      } else {
        setSuccess(true);
        setServerError("");
        setTimeout(() => {
          // Optional: Redirect or clear the form
          // window.location.href = '/admin/employees';
          // window.location.href = "/";
        }, 2000);
      }
    } catch (error) {
      const resMessage = error.message || "An error occurred";
      setServerError(resMessage);
    }
  };

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title">
          <h2>Add a new employee</h2>
        </div>
        <div className="contact-form">
          <form onSubmit={handleSubmit}>
            {serverError && (
              <Alert
                variant="danger"
                onClose={() => setServerError("")}
                dismissible
              >
                {serverError}
              </Alert>
            )}
            {success && (
              <Alert
                variant="success"
                onClose={() => setSuccess(false)}
                dismissible
              >
                Employee added successfully!
              </Alert>
            )}
            <div className="form-group">
              <label htmlFor="employee_email">
                <i className="bi bi-envelope"></i> Employee Email
              </label>
              <input
                id="employee_email"
                type="email"
                name="employee_email"
                value={employee_email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Employee email"
              />
              {emailError && (
                <div className="validation-error" role="alert">
                  {emailError}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="employee_first_name">
                <i className="bi bi-person"></i> First Name
              </label>
              <input
                id="employee_first_name"
                type="text"
                name="employee_first_name"
                value={employee_first_name}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="Employee first name"
              />
              {firstNameRequired && (
                <div className="validation-error" role="alert">
                  {firstNameRequired}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="employee_last_name">
                <i className="bi bi-person-badge"></i> Last Name
              </label>
              <input
                id="employee_last_name"
                type="text"
                name="employee_last_name"
                value={employee_last_name}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Employee last name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee_phone">
                <i className="bi bi-phone"></i> Phone Number
              </label>
              <input
                id="employee_phone"
                type="text"
                name="employee_phone"
                value={employee_phone}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="Employee phone (555-555-5555)"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employee_role">
                <i className="bi bi-person-circle"></i> Role
              </label>
              <select
                id="employee_role"
                name="employee_role"
                value={company_role_id}
                onChange={(event) => setCompany_role_id(event.target.value)}
                className="custom-select-box"
              >
                <option value="1">Employee</option>
                <option value="2">Manager</option>
                <option value="3">Admin</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="employee_password">
                <i className="bi bi-lock"></i> Password
              </label>
              <input
                id="employee_password"
                type="password"
                name="employee_password"
                value={employee_password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Employee password"
              />
              {passwordError && (
                <div className="validation-error" role="alert">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="employee_image">
                <i className="bi bi-image"></i> Employee Image
              </label>
              <input
                id="employee_image"
                type="file"
                accept="image/*"
                name="employee_image"
                onChange={handleImageChange}
              />
            </div>
            <div className="form-group">
              <button
                className="theme-btn btn-style-one"
                type="submit"
                data-loading-text="Please wait..."
              >
                <span>Add employee</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Employee added successfully!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSuccessModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>{serverError}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowErrorModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default AddEmployeeForm;
