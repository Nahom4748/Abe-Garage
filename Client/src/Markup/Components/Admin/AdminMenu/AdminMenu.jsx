// src/Components/AdminMenu/AdminMenu.js

import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaPlus,
  FaUserPlus,
  FaUsers,
  FaUser,
  FaCog,
  FaConciergeBell,
} from "react-icons/fa"; // Import necessary icons
import "./Admin.css"; // Create or update this CSS file for custom styles

function AdminMenu() {
  return (
    <div className="admin-menu">
      <h2>Admin Menu</h2>
      <div className="list-group">
        <Link to="/admin" className="list-group-item">
          <FaTachometerAlt className="icon" /> Dashboard
        </Link>
        <Link to="/admin/orders" className="list-group-item">
          <FaBox className="icon" /> Orders
        </Link>
        <Link to="/admin/new-order" className="list-group-item">
          <FaPlus className="icon" /> New Order
        </Link>
        <Link to="/admin/add-employee" className="list-group-item">
          <FaUserPlus className="icon" /> Add Employee
        </Link>
        <Link to="/admin/employees" className="list-group-item">
          <FaUsers className="icon" /> Employees
        </Link>
        <Link to="/admin/add-customer" className="list-group-item">
          <FaUserPlus className="icon" /> Add Customer
        </Link>
        <Link to="/admin/customers" className="list-group-item">
          <FaUser className="icon" /> Customers
        </Link>
        <Link to="/admin/services" className="list-group-item">
          <FaConciergeBell className="icon" /> Services
        </Link>
      </div>
    </div>
  );
}

export default AdminMenu;
