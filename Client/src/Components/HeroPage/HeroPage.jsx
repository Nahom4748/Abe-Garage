import React from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css"; // Import animate.css for animations
import vedio from "../../Assets/Advert_Vedio/Advert.mp4";

function HeroPage() {
  return (
    <div className="position-relative" style={{ overflow: "hidden" }}>
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        className="w-100 position-absolute top-0 left-0 h-100 object-fit-cover"
        style={{ zIndex: "-1" }}
      >
        <source src={vedio} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div
        className="position-relative z-1 text-white text-center d-flex align-items-center justify-content-center"
        style={{ height: "100vh", backgroundColor: "rgba(0, 0, 0, 0.3)" }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={12} className="align-self-center">
              <div className="mb-5">
                <h1 className="text-white animate__animated animate__fadeInDown">
                  Find Your <span className="text-primary">Perfect</span> Car
                </h1>
                <p className="text-white animate__animated animate__fadeInUp animate__delay-2s">
                  Our mission is to connect customers with their ideal cars
                  while offering exceptional service.
                </p>
              </div>
              <Tab.Container defaultActiveKey="all">
                <Nav variant="pills" className="justify-content-center mb-3">
                  <Nav.Item>
                    <Nav.Link
                      eventKey="all"
                      className="animate__animated animate__fadeInUp"
                    >
                      Contact Us
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="new"
                      className="animate__animated animate__fadeInUp animate__delay-1s"
                    >
                      Services
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      eventKey="used"
                      className="animate__animated animate__fadeInUp animate__delay-2s"
                    >
                      About Us
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Tab.Container>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default HeroPage;
