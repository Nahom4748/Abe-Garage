import React from 'react'
import AboutUs from '../../Pages/AboutUsPage/AboutUsPage';
import UtilizeCart from "../utilizes/UtilizeCart"
import HeroComp from '../Herocompo/HeroComp';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import WhyChooComp from '../WhyChooseUs/WhyChooComp';
import ServiceComp from '../Service/ServiceComp';
import UtilizeMob from '../utilizes/UtilizeMob';
import UtiSlider from '../utilizes/UtiSlider';
import Estimate from '../Service/Estimate';
import AboutusComp from '../AboutUs/AboutusComp';
import ContactUs from '../Contact/ContactUs';


function Home() {
  return (
    <>
      <Header />
      <HeroComp />
      <UtilizeCart/>
      <UtilizeMob />
      {/* <UtiSlider /> */}
      <AboutusComp />
      <WhyChooComp />
      <ServiceComp />
      <Estimate />
      <ContactUs/>
      {/* <Footer /> */}
    </>
  );
}

export default Home
