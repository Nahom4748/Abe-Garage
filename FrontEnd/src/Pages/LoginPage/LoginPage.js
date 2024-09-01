import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import HeaderPage from "../HeaderPage/HeaderPage";
import img9 from "../../assets/img/bg/9.jpg";
import loginService from "../../services/login.service"; // Adjust path as necessary

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [employee_email, setEmail] = useState("");
  const [employee_password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle client side validations here
    let valid = true; // Flag
    // Email validation
    if (!employee_email) {
      setEmailError("Please enter your email address");
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
    // Password has to be at least 6 characters long
    if (!employee_password || employee_password.length < 6) {
      setPasswordError("Password must be at least 6 characters long");
      valid = false;
    } else {
      setPasswordError("");
    }
    if (!valid) {
      return;
    }
    // Handle form submission here
    const formData = {
      employee_email,
      employee_password,
    };
    try {
      const response = await loginService.logIn(formData);
      const result = await response.json();
      if (result.status === "success") {
        // Save the user in the local storage
        if (result.data.employee_token) {
          localStorage.setItem("employee", JSON.stringify(result.data));
        }
        // Redirect the user to the dashboard
        if (location.pathname === "/login") {
          window.location.replace("/");
        } else {
          window.location.reload();
        }
      } else {
        setServerError(result.message);
      }
    } catch (err) {
      setServerError("An error has occurred. Please try again later.");
    }
  };

  return (
    <>
      <HeaderPage />
      <div
        className="ltn__breadcrumb-area ltn__breadcrumb-area-2 ltn__breadcrumb-color-white bg-overlay-theme-black-90 bg-image"
        style={{ backgroundImage: `url(${img9})` }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="ltn__breadcrumb-inner ltn__breadcrumb-inner-2 justify-content-between">
                <div className="section-title-area ltn__section-title-2">
                  <h6 className="section-subtitle ltn__secondary-color">
                    // Welcome to our company
                  </h6>
                  <h1
                    className="section-title white-color"
                    style={{ color: "white" }}
                  >
                    Account
                  </h1>
                </div>
                <div className="ltn__breadcrumb-list">
                  <ul>
                    <li>
                      <a href="index.html">Home</a>
                    </li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ltn__login-area pt-15">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title-area text-center">
                <h1 className="section-title">
                  Sign In <br />
                  To Your Account
                </h1>
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.{" "}
                  <br />
                  Sit aliquid, Non distinctio vel iste.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="account-login-inner">
                <form
                  onSubmit={handleSubmit}
                  className="ltn__form-box contact-form-box"
                >
                  <input
                    type="email"
                    name="employee_email"
                    value={employee_email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email*"
                  />
                  {emailError && (
                    <div className="validation-error">{emailError}</div>
                  )}
                  <input
                    type="password"
                    name="employee_password"
                    value={employee_password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password*"
                  />
                  {passwordError && (
                    <div className="validation-error">{passwordError}</div>
                  )}
                  {serverError && (
                    <div className="validation-error">{serverError}</div>
                  )}
                  <div className="btn-wrapper mt-0">
                    <button className="theme-btn-1 btn btn-block" type="submit">
                      SIGN IN
                    </button>
                  </div>
                  <div className="go-to-btn mt-20">
                    <Link
                      to="#"
                      title="Forgot Password?"
                      data-toggle="modal"
                      data-target="#ltn_forget_password_modal"
                    >
                      <small>FORGOTTEN YOUR PASSWORD?</small>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="account-create text-center pt-50">
                <h4>DON'T HAVE AN ACCOUNT?</h4>
                <p>
                  Add items to your wishlist, get personalised recommendations{" "}
                  <br />
                  check out more quickly, track your orders, register
                </p>
                <div className="btn-wrapper">
                  <Link to="/register" className="theme-btn-1 btn black-btn">
                    CREATE ACCOUNT
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
