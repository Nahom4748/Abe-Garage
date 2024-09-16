import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Container,
  Card,
  Alert,
  Spinner,
  Button,
} from "react-bootstrap";
import { FaEye, FaEdit } from "react-icons/fa";

function Listorder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        console.log("API Response:", data);

        // Adjust for single order or multiple orders
        if (data.status === "success") {
          const ordersData = Array.isArray(data.data) ? data.data : [data.data];
          setOrders(ordersData);
        } else {
          setError("Failed to fetch orders");
        }
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    return status === 0 ? "bg-warning text-dark" : "bg-success text-white";
  };

  return (
    <Container className="my-4">
      <Card>
        <Card.Header>
          <h4>Orders List</h4>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" />
              <p>Loading orders...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer Name</th>
                  <th>Vehicle</th>
                  <th>Order Date</th>
                  <th>Vehicle Info</th>
                  <th>Employee Name</th>
                  <th>Order Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.order_id}
                    className={getStatusColor(order.order_status)}
                  >
                    <td>{order.order_id}</td>
                    <td>{`${order.customer_first_name} ${order.customer_last_name}`}</td>
                    <td>{`${order.vehicle_make} ${order.vehicle_model} (${order.vehicle_year})`}</td>
                    <td>{new Date(order.order_date).toLocaleDateString()}</td>
                    <td>{`${order.vehicle_make} ${order.vehicle_model}`}</td>
                    <td>{`${order.assigned_employee_first_name} ${order.assigned_employee_last_name}`}</td>
                    <td>
                      {order.order_status === 0 ? "In Process" : "Completed"}
                    </td>
                    <td>
                      <Button
                        variant="info"
                        size="sm"
                        className="me-2"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <FaEye /> View
                      </Button>
                      <Button
                        variant="warning"
                        size="sm"
                        style={{ fontSize: "0.9rem" }}
                      >
                        <FaEdit /> Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Listorder;
