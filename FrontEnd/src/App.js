import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Routes, Route } from "react-router-dom";

//Styles
// import './assets/css/responsive.css';
// import './assets/css/plugins.css';
import "./assets/css/font-icons.css";
// import './assets/css/style.css.map';
// import './assets/sass/sections/_header.scss';
import "./assets/sass/style.scss";
// import './assets/sass/sections/_main.scss';
// import './assets/sass/sections/_footer.scss';
// import './assets/sass/sections/_breadcrumb.scss';
// import './assets/sass/sections/_product.scss';
// import './assets/sass/sections/_widgets.scss';
// import './assets/sass/global/_global.scss';
// import "./assets/sass/global/_mixins.scss";
// import "./assets/sass/global/_variables.scss";
// import "./assets/sass/global/_gutenberg.scss";
import "./assets/sass/elements/_button.scss";
// import "./assets/css/elements/_portfoli.css";
// import "./assets/css/custom.css";
import Login from "./Pages/LoginPage/LoginPage";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import AboutusComp from "./components/AboutUs/AboutusComp";
import ServiceComp from "./components/Service/ServiceComp";
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
