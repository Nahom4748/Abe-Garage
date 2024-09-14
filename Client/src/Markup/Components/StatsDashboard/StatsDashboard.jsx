// src/components/StatsDashboard.jsx
import React from "react";
import EmployeeStatsChart from "../EmployeeStatsChart/EmployeeStatsChart";
import CustomerStatsChart from "../CustomerStatsChart/CustomerStatsChart";
import { Row, Col } from "react-bootstrap";
import "./StatsDashboard.css"; // For custom layout styling

const StatsDashboard = () => {
  return (
    <div className="stats-dashboard">
      <Row>
        <Col md={6}>
          <EmployeeStatsChart />
        </Col>
        <Col md={6}>
          <CustomerStatsChart />
        </Col>
      </Row>
    </div>
  );
};

export default StatsDashboard;
