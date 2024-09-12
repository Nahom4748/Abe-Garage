import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Main Content */}
      <Container fluid className="mt-4">
        <Row>
          {/* Main Content Area */}
          <Col md={9}>
            <Row>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Employee Statistics</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dignissimos illo
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Reports</Card.Title>
                    <Card.Text>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Amquam,
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={4}>
                <Card>
                  <Card.Body>
                    <Card.Title>Settings</Card.Title>
                    <Card.Text>
                      Some quick example text to build on the card title and
                      make up the content.
                    </Card.Text>
                    <Button variant="primary">View Details</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mt-4">
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>Recent Activities</Card.Title>
                    <Card.Text>
                      Display recent activities or notifications here.
                    </Card.Text>
                    <Button variant="secondary">View All Activities</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminDashboard;
