import React from "react";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

import "./assets/css/font-icons.css";

import "./assets/sass/style.scss";

import "./assets/sass/elements/_button.scss";

import Login from "./Pages/LoginPage/LoginPage";
import Home from "./components/Home/Home";

import ContactUs from "./Pages/contactUsPage/ContactUsPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ServicePage from "./Pages/ServicePage/ServicePage";
import AboutUsPage from "./Pages/AboutUsPage/AboutUsPage";

function App() {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/service" element={<ServicePage />} />
        {/* <Route path="/contact" element={<Contact/>} /> */}
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
