import React from "react";
import HeroPage from "../Components/HeroPage/HeroPage";
import Services from "../Components/Services/Services";
import Location from "../Components/Location/Location";
import AboutUs from "../Components/About_us/AboutUs";
import WhyChooComp from "../Components/WhyChooseUs/WhyChooComp";
import ServicePage from "./ServicePage/ServicePage";
import Footer from "../Components/Footer/Footer";

function HomePage() {
  return (
    <>
      <HeroPage />
      <AboutUs />
      <WhyChooComp />
      <ServicePage />
      <Location />
      <Footer />
    </>
  );
}

export default HomePage;
