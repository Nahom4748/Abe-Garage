// src/components/CustomerStatsChart.jsx
import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components with ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerStatsChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/customers/stats" // Adjust API endpoint
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        // Set chart data with blue, green, and orange colors
        setChartData({
          labels: ["Active Customers", "Inactive Customers", "Total Customers"],
          datasets: [
            {
              label: "Customer Status",
              data: [
                data.data.activeCustomers,
                data.data.inactiveCustomers,
                data.data.totalCustomers,
              ],
              backgroundColor: [
                "rgba(0, 255, 0, 0.6)", // Green for active customers
                "rgba(255, 99, 132, 0.6)", // Red for inactive customers
                "rgba(255, 159, 64, 0.6)", // Orange for total customers
              ],
              borderColor: [
                "rgba(0, 255, 0, 1)", // Green border
                "rgba(255, 99, 132, 1)", // Red border
                "rgba(255, 159, 64, 1)", // Orange border
              ],
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching customer stats:", error);
      }
    };

    fetchCustomerStats();
  }, []);

  if (!chartData) {
    return (
      <Card
        style={{
          backgroundColor: "#fff", // White background
          borderColor: "#ddd",
          height: "100vh",
        }}
      >
        <Card.Header as="h5" style={{ color: "#000" }}>
          Customer Statistics
        </Card.Header>
        <Card.Body style={{ height: "100%" }}>Loading...</Card.Body>
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
          color: "#000", // Legend text color changed to black
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
            return `${label}: ${value} Customers (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card
      style={{ backgroundColor: "#fff", borderColor: "#ddd", height: "80vh" }}
    >
      <Card.Header as="h5" style={{ color: "#000" }}>
        Customer Statistics
      </Card.Header>
      <Card.Body style={{ height: "100%" }}>
        <div style={{ height: "100%" }}>
          <Pie data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerStatsChart;
