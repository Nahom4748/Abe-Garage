import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";

function ManagerDashbord() {
  return (
    <Container fluid className="admin-pages">
      <Row>
        <Col md={3} className="bg-dark text-white">
          <ManagerMenu />
        </Col>
        <Col md={9}>
          <h1>Manager Dashboard</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default ManagerDashbord;
