import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ManagerMenu from "../../Components/Manager/ManagerMenu/ManagerMenu";
import EmployeeStatsChart from "../../Components/EmployeeStatsChart/EmployeeStatsChart";

function ManagerDashbord() {
  return (
    <Container fluid className="admin-pages">
      <Row>
        <Col md={3} className=" text-white">
          <ManagerMenu />
        </Col>
        <Col md={9}>
          <EmployeeStatsChart />
        </Col>
      </Row>
    </Container>
  );
}

export default ManagerDashbord;
