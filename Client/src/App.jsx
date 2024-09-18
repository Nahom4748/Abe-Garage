import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/css/font-icons.css";
import "./Assets/sass/style.scss";
import "./Assets/sass/elements/_button.scss";
import Footer from "./Markup/Components/Footer/Footer";
import Header from "./Markup/Components/Header/Header";
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
import Items from "./Markup/pages/admin/Items";
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
import AddCustomerForm from "./Markup/Components/Admin/AddCustomer/AddCustomerForm";
import AddItem from "./Markup/pages/admin/AddItem";
import SingleOrder from "./Markup/pages/admin/SingleOrder";
import EmployeeMenu from "./Markup/pages/Employee/EmployeeDash";
import EmployeeDash from "./Markup/pages/Employee/EmployeeDash";
import EmployeeTasks from "./Markup/pages/Employee/EmployeeTasks";
import CustomerDash from "./Markup/pages/Customer/CustomerDash";
import MyOrdersList from "./Markup/pages/Customer/MyOrdersList/MyOrdersList";
import TaskHistory from "./Markup/pages/Employee/TaskHistory/TaskHistory";
import ManageCustomer from "./Markup/pages/admin/ManageCustomer";
import EmployeePofile from "./Markup/pages/Employee/EmployeePofile/EmployeePofile";
import EmployeeSetting from "./Markup/pages/Employee/EmployeeSetting/EmployeeSetting";

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
                <Route path="/admin/add-item" element={<AddItem />} />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin/items" element={<Items />} />
                <Route path="/admin/add_customer" element={<Addcustomer />} />
                <Route
                  path="/admin/customer/:customer_id"
                  element={<ManageCustomer />}
                />
                <Route
                  path="/view-single-order/:orderId"
                  element={<SingleOrder />}
                />
                <Route path="/admin-dashboard" element={<AdminDashbord />} />
              </>
            ) : userType === 2 ? (
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
            ) : userType === 1 ? (
              <>
                <Route path="/" element={<Navigate to="/employee" />} />
                <Route path="/employee/tasks" element={<EmployeeTasks />} />
                <Route path="/employee/profile" element={<EmployeePofile />} />
                <Route
                  path="/employee/settings"
                  element={<EmployeeSetting />}
                />
                <Route
                  path="/employee/task-history"
                  element={<TaskHistory />}
                />
                <Route path="/employee" element={<EmployeeDash />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/Customer" />} />
                <Route path="/Customer" element={<CustomerDash />} />
                <Route path="/Costumer/Orders" element={<MyOrdersList />} />
              </>
            )}
          </Route>
        )}
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
