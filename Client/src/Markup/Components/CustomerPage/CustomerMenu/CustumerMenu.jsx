import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaCalendarAlt,
  FaUser,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";
import styles from "./CustumerMenu.module.css";
function CustumerMenu() {
  return (
    // State to manage the visibility of the sub-menus
    <div className="employee-menu">
      <h2>Employee Menu</h2>
      <div className="list-group">
        <Link to="/employee" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>

        {/* Tasks Menu */}
        <Link to="/Costumer/Orders" className="list-group-item ">
          <FaTasks className="icon" /> My Orders
        </Link>

        {/* Profile Menu */}
        <Link to="/employee/profile" className="list-group-item">
          <FaUser className="icon" /> Profile
        </Link>

        {/* Messages Menu */}
        <Link to="/Costumer/messages" className="list-group-item">
          <FaEnvelope className="icon" /> Messages
        </Link>
      </div>
    </div>
  );
}

export default CustumerMenu;
