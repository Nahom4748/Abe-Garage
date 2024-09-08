// src/Components/AdminMenu/AdminMenu.js

import React, { useState } from "react";
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
  FaAngleDown,
  FaAngleUp,
} from "react-icons/fa";
import "./Admin.css";

function AdminMenu() {
  // State to manage the visibility of the services and employee sub-menus
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isEmployeesOpen, setIsEmployeesOpen] = useState(false);

  // Function to toggle the services sub-menu
  const toggleServicesMenu = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  // Function to toggle the employees sub-menu
  const toggleEmployeesMenu = () => {
    setIsEmployeesOpen(!isEmployeesOpen);
  };

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

        {/* Employees menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleEmployeesMenu}>
          <FaUsers className="icon" /> Employee
          <span className="expand-icon">
            {isEmployeesOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of employee sub-menu items */}
        {isEmployeesOpen && (
          <div className="sub-menu">
            <Link to="/admin/add-employee" className="list-group-item">
              <FaUserPlus className="icon" /> Add Employee
            </Link>
            <Link to="/admin/employees" className="list-group-item">
              <FaUser className="icon" /> View Employees
            </Link>
          </div>
        )}

        <Link to="/admin/add-customer" className="list-group-item">
          <FaUserPlus className="icon" /> Add Customer
        </Link>
        <Link to="/admin/customers" className="list-group-item">
          <FaUser className="icon" /> Customers
        </Link>

        {/* Services menu item with toggle functionality */}
        <div className="list-group-item" onClick={toggleServicesMenu}>
          <FaConciergeBell className="icon" /> Services
          <span className="expand-icon">
            {isServicesOpen ? <FaAngleUp /> : <FaAngleDown />}
          </span>
        </div>

        {/* Conditional rendering of services sub-menu items */}
        {isServicesOpen && (
          <div className="sub-menu">
            <Link to="/admin/services/add" className="list-group-item">
              <FaPlus className="icon" /> Add Service
            </Link>
            <Link to="/admin/services/view" className="list-group-item">
              <FaCog className="icon" /> View Services
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;
