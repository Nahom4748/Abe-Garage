import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
import StatsDashboard from "../../Components/StatsDashboard/StatsDashboard";

function ManagerDashbord() {
  return (
    <Container fluid className="admin-pages">
      <Row>
        <Col md={3} className=" text-white">
          <ManagerMenu />
        </Col>
        <Col md={9}>
          <StatsDashboard />
        </Col>
      </Row>
    </Container>
  );
}

export default ManagerDashbord;
