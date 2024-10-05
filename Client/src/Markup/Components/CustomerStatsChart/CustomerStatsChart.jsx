import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import "./CustomerStatsChart.css"; // Import your CSS

// Register necessary components with ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CustomerStatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomerStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/customers/stats" // Adjust API endpoint
        );

        const data = response.data;

        if (data) {
          setChartData({
            labels: [
              "Active Customers",
              "Inactive Customers",
              "Total Customers",
            ],
            datasets: [
              {
                label: "Customer Status",
                data: [
                  data.activeCustomers,
                  data.inactiveCustomers,
                  data.totalCustomers,
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
        } else {
          setError("Data is empty or not in expected format.");
        }
      } catch (error) {
        console.error("Error fetching customer stats:", error);
        setError("Error fetching customer stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerStats();
  }, []);

  if (loading) {
    return (
      <Card className="customer-stats-card">
        <Card.Header as="h5" className="customer-stats-header">
          Customer Statistics
        </Card.Header>
        <Card.Body className="customer-stats-body">Loading...</Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="customer-stats-card">
        <Card.Header as="h5" className="customer-stats-header">
          Customer Statistics
        </Card.Header>
        <Card.Body className="customer-stats-body">{error}</Card.Body>
      </Card>
    );
  }

  // Options for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000", // Legend text color
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} Customers`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000", // X-axis label color
        },
      },
      y: {
        ticks: {
          color: "#000", // Y-axis label color
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card className="customer-stats-card">
      <Card.Header as="h5" className="customer-stats-header">
        Customer Statistics
      </Card.Header>
      <Card.Body className="customer-stats-body">
        <div className="chart-container">
          <Bar data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default CustomerStatsChart;
