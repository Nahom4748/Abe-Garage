import Footer from "./Markup/Components/Footer/Footer";
import Header from "./Markup/Components/Header/Header";
import AppointmentForm from "./Markup/Components/AppointmentForm/AppointmentForm";
import Register from "./Markup/Components/Register/Register";

import { Routes, Route } from "react-router";
import "./assets/css/font-icons.css";
import "./assets/css/style.scss";
import "./assets/css/coming-soon.css";
import "./assets/css/css-slide.css";
import "./assets/css/star-rating-svg.css";
import "./assets/css/style.css";
import "./assets/css/style.min.css";
import "./assets/css/swiper.css";
import "./assets/css/templete.css";
import "./assets/css/templete.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeroPageComponent from "./Markup/pages/HeroPageComponent";
import LoginPage from "./Markup/pages/LoginPage";
import AddEmployee from "./Markup/Components/Admin/AddEmployee/AddEmployee";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HeroPageComponent />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/add-employee" element={<AddEmployee />} />
        <Route path="/Appointment" element={<AppointmentForm />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
