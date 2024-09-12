import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import "./Assets/css/font-icons.css";
import "./Assets/sass/style.scss";

import "./Assets/sass/elements/_button.scss";

import Footer from "./Markup/Components/Footer/Footer";
import Header from "./Markup/Components/Header/Header";
import Register from "./Markup/Components/Register/Register";
import "./index.css";
import { Routes, Route, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Markup/pages/LoginPage";
import AddEmployee from "./Markup/pages/admin/AddEmployee";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import AdminDashbord from "./Markup/pages/admin/AdminDashbord";
import { useAuth } from "./Contexts/AuthContext";
import AddService from "./Markup/pages/admin/AddService";
import Customers from "./Markup/pages/admin/Customers";
import Employees from "./Markup/pages/admin/Employees";
import NewOrder from "./Markup/pages/admin/NewOrder";
import Orders from "./Markup/pages/admin/Orders";
import ManagerDashbord from "./Markup/pages/Manager/ManagerDashbord";
import OrdersManager from "./Markup/pages/Manager/OrdersManager";
import NewOrderManager from "./Markup/pages/Manager/NewOrderManager";
import EmployeesManager from "./Markup/pages/Manager/EmployeesManager";
import AddcustomerManager from "./Markup/pages/Manager/AddcustomerManager";
import CustomersManager from "./Markup/pages/Manager/CustomersManager";
import AddServiceManager from "./Markup/pages/Manager/AddServiceManager";
import News from "./Markup/pages/Manager/News";
import HomePage from "./Markup/pages/HomePage";
import AboutUsPage from "./Markup/pages/AboutUsPage/AboutUsPage";
import ServicePage from "./Markup/pages/ServicePage/ServicePage";
import ContactUsPage from "./Markup/pages/contactUsPage/ContactUsPage";
import ViewServices from "./Markup/pages/admin/ViewServices";
import Addcustomer from "./Markup/pages/admin/Addcustomer";
import EmployeeStatsChart from "./Markup/Components/EmployeeStatsChart/EmployeeStatsChart";
import AddCustomerForm from "./Markup/Components/Admin/AddCustomer/AddCustomerForm";

function App() {
  const { isLogged, userType } = useAuth();

  return (
    <>
      <Header />
      <Routes>
        {!isLogged ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
          </>
        ) : (
          <Route element={<PrivateAuthRoute />}>
            {userType === 3 ? (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/new-order" element={<NewOrder />} />
                <Route path="/admin/services/add" element={<AddService />} />
                <Route path="/admin/employees" element={<Employees />} />
                <Route path="/admin/services/view" element={<ViewServices />} />
                <Route
                  path="/admin/add-customer"
                  element={<AddCustomerForm />}
                />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin-dashboard" element={<AdminDashbord />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/manager" />} />
                <Route path="/manager/orders" element={<OrdersManager />} />
                <Route
                  path="/manager/new-order"
                  element={<NewOrderManager />}
                />
                <Route
                  path="/manager/employees"
                  element={<EmployeesManager />}
                />
                <Route
                  path="/manager/services"
                  element={<AddServiceManager />}
                />
                <Route
                  path="/manager/add-customer"
                  element={<AddcustomerManager />}
                />
                <Route
                  path="/manager/customers"
                  element={<CustomersManager />}
                />

                <Route path="/manager/add-news" element={<News />} />
                <Route path="/manager" element={<ManagerDashbord />} />
              </>
            )}
          </Route>
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
