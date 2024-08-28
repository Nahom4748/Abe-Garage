import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import backgroundImage from "../../Assets/Images/Bg-image2.jpg"; // Example path

function AboutUs() {
  return (
    <Container
      fluid
      className="about-us py-5"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "80vh",
        backgroundPosition: "center",
        color: "white",
      }}
    >
      <Row className="justify-content-center align-items-center">
        <Col lg={10} className="text-center">
          <Row
            className="align-items-center bg-dark bg-opacity-75 text-white p-4 rounded"
            style={{
              border: "3px solid #007bff", // Blue border
              boxShadow: "0 0 15px rgba(0, 123, 255, 0.5)", // Blue shadow
            }}
          >
            <Col md={6} className="text-left">
              <h2 className="text-uppercase mb-4">Trust Our Garage</h2>
              <p>
                At our AutoService garage, we fully appreciate how difficult it
                is for people to find reliable and trustworthy garages where
                they can service and repair their cars. We are always keen to
                prove to our customers that we are different!
              </p>
              <p>
                We handle all makes and models and specialize in more than 40
                car brands. All our mechanics and technicians are equipped with
                the latest portable technology, and all our work has a minimum
                12-month guarantee on services.
              </p>
            </Col>
            <Col md={6} className="text-left">
              <ul className="list-unstyled">
                <li className="mb-3">
                  <strong className="text-primary">VALUE</strong>
                  <p>
                    We handle all makes and models and specialize in more than
                    40 car brands. We are endorsed by the local trading
                    standards office. All our mechanics and technicians are
                    equipped with the latest portable technology. All our work
                    has a minimum 12-month guarantee on services.
                  </p>
                </li>
                <li className="mb-3">
                  <strong className="text-primary">EXPERTISE</strong>
                  <p>
                    We handle all makes and models and specialize in more than
                    40 car brands. We are endorsed by the local trading
                    standards office. All our mechanics and technicians are
                    equipped with the latest portable technology. All our work
                    has a minimum 12-month guarantee on services.
                  </p>
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default AboutUs;
