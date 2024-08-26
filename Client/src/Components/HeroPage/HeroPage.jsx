import React from "react";
import { Carousel } from "react-bootstrap";
import slide1 from "../../assets/images/swipe-1-1920x1080.jpg"; // Replace with the actual path to your image
import slide2 from "../../assets/images/12-1920x1080.jpg"; // Replace with the actual path to your image
import slide3 from "../../assets/images/swipe-1-1920x1080.jpg"; // Replace with the actual path to your image

function HeroPage() {
  return (
    <Carousel interval={3000} controls={false} indicators={false} loop={true}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide1}
          alt="First slide"
          style={{ height: "100vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Abe Garage - Premium Cars</h3>
          <p>Experience the luxury of top-class vehicles at Abe Garage.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide2}
          alt="Second slide"
          style={{ height: "100vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Exceptional Service</h3>
          <p>Providing world-class services for your dream cars.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide3}
          alt="Third slide"
          style={{ height: "100vh", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3>Your Dream Car Awaits</h3>
          <p>Find the perfect car that matches your style and personality.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroPage;
