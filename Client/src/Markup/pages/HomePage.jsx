import React from "react";
import HeroPage from "../Components/HeroPage/HeroPage";
import Services from "../Components/Services/Services";
import Location from "../Components/Location/Location";
import AboutUs from "../Components/About_us/AboutUs";
import WhyChooComp from "../Components/WhyChooseUs/WhyChooComp";

function HomePage() {
  return (
    <>
      <HeroPage />
      <AboutUs />
      <WhyChooComp />
      <Services />
      <Location />
    </>
  );
}

export default HomePage;
