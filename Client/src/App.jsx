import React, { useEffect } from "react";
import Footer from "./Markup/Components/Footer/Footer";
import Header from "./Markup/Components/Header/Header";
import AppointmentForm from "./Markup/Components/AppointmentForm/AppointmentForm";
import Register from "./Markup/Components/Register/Register";
import "./index.css";
import { Routes, Route, Navigate } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroPageComponent from "./Markup/pages/HeroPageComponent";
import LoginPage from "./Markup/pages/LoginPage";
import AddEmployee from "./Markup/pages/admin/AddEmployee";
import PrivateAuthRoute from "./Markup/Components/Auth/PrivateAuthRoute";
import Unauthorized from "./Markup/pages/Unauthorized";
import AdminDashbord from "./Markup/pages/admin/AdminDashbord";
import { useAuth } from "./Contexts/AuthContext";
import AddService from "./Markup/pages/admin/AddService";
import Customers from "./Markup/pages/admin/customers";
import Addcustomer from "./Markup/pages/admin/addcustomer";
import Employees from "./Markup/pages/admin/Employees";
import NewOrder from "./Markup/pages/admin/NewOrder";
import Orders from "./Markup/pages/admin/Orders";
import HeroPage from "./Markup/Components/HeroPage/HeroPage";

function App() {
  const { isLogged, employee } = useAuth();

  useEffect(() => {
    // This hook ensures that the state is updated when component mounts
    const employeeData = JSON.parse(localStorage.getItem("employee"));
    if (employeeData) {
      setUserType(employeeData.roles);
    }
  }, []);

  const [userType, setUserType] = React.useState(null);

  useEffect(() => {
    if (employee && employee.roles) {
      setUserType(employee.roles);
    }
  }, [employee]);

  return (
    <>
      <Header />
      <Routes>
        {!isLogged ? (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HeroPage />} />
          </>
        ) : (
          <>
            {userType === 3 ? (
              <>
                <Route path="/" element={<Navigate to="/admin-dashboard" />} />
                <Route path="/admin/add-employee" element={<AddEmployee />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/new-order" element={<NewOrder />} />
                <Route path="/admin/services" element={<AddService />} />
                <Route path="/admin/employees" element={<Employees />} />
                <Route path="/admin/add-customer" element={<Addcustomer />} />
                <Route path="/admin/customers" element={<Customers />} />
                <Route path="/admin-dashboard" element={<AdminDashbord />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Navigate to="/userDetails" />} />
                <Route path="/userDetails" element={<HeroPageComponent />} />
                <Route path="/admin-dashboard" element={<Navigate to="/" />} />
              </>
            )}
          </>
        )}
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
