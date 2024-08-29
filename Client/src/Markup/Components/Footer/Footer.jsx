import React from "react";

import logo from "../../../Assets/images/logo.png";
import "./footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo-section">
        <img src={logo} alt="ABE GARAGE Logo" className="footer-logo" />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="social-icons">
          <a href="#">
            <i className="fa fa-facebook"></i>
          </a>
          <a href="#">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="#">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h5>HELP & SUPPORT</h5>
        <ul>
          <li>
            <a href="#">Shipping Info</a>
          </li>
          <li>
            <a href="#">Returns</a>
          </li>
          <li>
            <a href="#">How To Order</a>
          </li>
          <li>
            <a href="#">How To Track</a>
          </li>
          <li>
            <a href="#">Size Guide</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>COMPANY INFO</h5>
        <ul>
          <li>
            <a href="#">About Us</a>
          </li>
          <li>
            <a href="#">Our Blog</a>
          </li>
          <li>
            <a href="#">Careers</a>
          </li>
          <li>
            <a href="#">Store Locations</a>
          </li>
          <li>
            <a href="#">Testimonial</a>
          </li>
        </ul>
      </div>
      <div className="footer-section">
        <h5>CUSTOMER CARE</h5>
        <ul>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <a href="#">Gift Card</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
