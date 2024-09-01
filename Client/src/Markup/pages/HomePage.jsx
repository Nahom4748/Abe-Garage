import React from "react";
import HeroPage from "../Components/HeroPage/HeroPage";
import Services from "../Components/Services/Services";
import Location from "../Components/Location/Location";
import AboutUs from "../Components/About_us/AboutUs";

function HomePage() {
  return (
    <>
      <HeroPage />
      <Services />
      <AboutUs />
      <Location />
    </>
  );
}

export default HomePage;
