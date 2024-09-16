import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import AdminDashbord from "./Markup/pages/admin/AdminDashbord";
import AddEmployee from "./Markup/pages/admin/AddEmployee";
import Orders from "./Markup/pages/admin/Orders";
import NewOrder from "./Markup/pages/admin/NewOrder";
import AddService from "./Markup/pages/admin/AddService";
import Employees from "./Markup/pages/admin/Employees";
import Addcustomer from "./Markup/pages/admin/addcustomer";
import Customers from "./Markup/pages/admin/customers";
import AddItem from "./Markup/pages/admin/AddItem";
import Items from "./Markup/pages/admin/Items";

import OrdersManager from "./Markup/pages/Manager/OrdersManager";
import NewOrderManager from "./Markup/pages/Manager/NewOrderManager";
import EmployeesManager from "./Markup/pages/Manager/EmployeesManager";
import AddServiceManager from "./Markup/pages/Manager/AddServiceManager";
import AddcustomerManager from "./Markup/pages/Manager/AddcustomerManager";
import CustomersManager from "./Markup/pages/Manager/CustomersManager";
import News from "./Markup/pages/Manager/News";
import ManagerDashbord from "./Markup/pages/Manager/ManagerDashbord";
import HomePage from "./Markup/pages/HomePage";
import AboutUsPage from "./Markup/pages/AboutUsPage/AboutUsPage";
import ServicePage from "./Markup/pages/ServicePage/ServicePage";
import Register from "./Markup/Components/Register/Register";
import LoginPage from "./Markup/pages/LoginPage";

// admin route
const AdminRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/admin-dashboard" />} />
    <Route path="/admin-dashboard" element={<AdminDashbord />} />
    <Route path="/admin/add-employee" element={<AddEmployee />} />
    <Route path="/admin/orders" element={<Orders />} />
    <Route path="/admin/new-order" element={<NewOrder />} />
    <Route path="/admin/services" element={<AddService />} />
    <Route path="/admin/employees" element={<Employees />} />
    <Route path="/admin/add-customer" element={<Addcustomer />} />
    <Route path="/admin/add-item" element={<AddItem />} />
    <Route path="/admin/items" element={<Items />} />
    <Route path="/admin/customers" element={<Customers />} />
  </>
);

// manager route
const ManagerRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/manager" />} />
    <Route path="/manager" element={<ManagerDashbord />} />
    <Route path="/manager/orders" element={<OrdersManager />} />
    <Route path="/manager/new-order" element={<NewOrderManager />} />
    <Route path="/manager/employees" element={<EmployeesManager />} />
    <Route path="/manager/services" element={<AddServiceManager />} />
    <Route path="/manager/add-customer" element={<AddcustomerManager />} />
    <Route path="/manager/customers" element={<CustomersManager />} />
    <Route path="/manager/add-news" element={<News />} />
  </>
);

// const RoutesConfig = ({ userType }) => {
//   return (
//     <Routes>
//       {userType === 3 ? (
//         <>
//           <Route path="/" element={<Navigate to="/admin-dashboard" />} />
//           <Route path="/admin/add-employee" element={<AddEmployee />} />
//           <Route path="/admin/orders" element={<Orders />} />
//           <Route path="/admin/new-order" element={<NewOrder />} />
//           <Route path="/admin/services" element={<AddService />} />
//           <Route path="/admin/employees" element={<Employees />} />
//           <Route path="/admin/add-customer" element={<Addcustomer />} />
//           <Route path="/admin/add-item" element={<AddItem />} />
//           <Route path="/admin/items" element={<Items />} />
//           <Route path="/admin/customers" element={<Customers />} />

//           <Route path="/admin-dashboard" element={<AdminDashbord />} />
//         </>
//       ) : (
//         <>
//           <Route path="/" element={<Navigate to="/manager" />} />
//           <Route path="/manager/orders" element={<OrdersManager />} />
//           <Route path="/manager/new-order" element={<NewOrderManager />} />
//           <Route path="/manager/employees" element={<EmployeesManager />} />
//           <Route path="/manager/services" element={<AddServiceManager />} />
//           <Route
//             path="/manager/add-customer"
//             element={<AddcustomerManager />}
//           />
//           <Route path="/manager/customers" element={<CustomersManager />} />
//           <Route path="/manager/add-news" element={<News />} />
//           <Route path="/manager" element={<ManagerDashbord />} />
//         </>
//       )}
//       <Route path="/register" element={<Register />} />
//       <Route path="/services" element={<ServicePage />} />
//       <Route path="/about" element={<AboutUsPage />} />
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// };

const RoutesConfig = ({ userType }) => {
  return (
    <Routes>
      {/* Authenticated Routes */}
      {userType === 3 ? (
        <Route
          path="/*"
          element={
            <PrivateAuthRoute>
              <AdminRoutes />
            </PrivateAuthRoute>
          }
        />
      ) : (
        <Route
          path="/*"
          element={
            <PrivateAuthRoute>
              <ManagerRoutes />
            </PrivateAuthRoute>
          }
        />
      )}

      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/services" element={<ServicePage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoutesConfig;
