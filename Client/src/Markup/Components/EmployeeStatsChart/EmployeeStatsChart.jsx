import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./EmployeeStatsChart.css"; // Import the CSS file

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/employees/stats"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        setChartData({
          labels: ["Active Employees", "Inactive Employees", "Total Employees"],
          datasets: [
            {
              label: "Employee Status",
              data: [
                data.data.activeEmployees,
                data.data.inactiveEmployees,
                data.data.totalEmployees,
              ],
              backgroundColor: [
                "rgba(0, 123, 255, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 205, 86, 0.6)",
              ],
              borderColor: [
                "rgba(0, 123, 255, 1)",
                "rgba(255, 99, 132, 1)",
                "rgba(255, 205, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching employee stats:", error);
      }
    };

    fetchEmployeeStats();
  }, []);

  if (!chartData) {
    return (
      <Card
        className="employee-stats-card"
        style={{
          height: "100vh",
        }}
      >
        <Card.Header as="h5" className="employee-stats-header">
          Employee Statistics
        </Card.Header>
        <Card.Body className="employee-stats-body" style={{ height: "100%" }}>
          Loading...
        </Card.Body>
      </Card>
    );
  }

  // Options for the chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            const total = context.chart.data.datasets[0].data.reduce(
              (a, b) => a + b,
              0
            );
            const percentage = ((value / total) * 100).toFixed(2);
            return `${label}: ${value} Employees (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card className="employee-stats-card">
      <Card.Header as="h5" className="employee-stats-header">
        Employee Statistics
      </Card.Header>
      <Card.Body className="employee-stats-body">
        <div className="chart-container">
          <Pie data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeStatsChart;
