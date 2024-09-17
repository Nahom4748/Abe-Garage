import React, { useState, useEffect } from "react";
import { Table, Spinner, Alert, Collapse, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "../../../../Contexts/AuthContext";
import axios from "axios";
import { format } from "date-fns";

function Tasks() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openOrderId, setOpenOrderId] = useState(null);
  const { isLogged, employee } = useAuth();
  const employeeId = employee.employee_id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tasks/${employeeId}` // Replace with your backend API endpoint
        );
        console.log(response.data);

        if (response.status !== 200) {
          throw new Error("Network response was not ok");
        }

        // Group services by orderId
        const groupedOrders = response.data.reduce((acc, order) => {
          if (!acc[order.orderId]) {
            acc[order.orderId] = { ...order, services: [] };
          }
          if (order.services) {
            acc[order.orderId].services.push(order.services);
          }
          return acc;
        }, {});

        setOrders(Object.values(groupedOrders)); // Convert grouped object to array
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [employeeId]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const handleToggle = (orderId) => {
    setOpenOrderId(openOrderId === orderId ? null : orderId);
  };

  return (
    <div className="container mt-4">
      <h2>Orders</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Estimated Date</th>
            <th>Vehicle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <React.Fragment key={order.orderId}>
              <tr>
                <td>{`${order.customer.firstName} ${order.customer.lastName}`}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>
                  {order.status?.statusName == 1 ? "Not Complete" : "Complete"}
                </td>
                {/* {order.orderInfo.estimatedCompletionDate} */}
                <td>
                  {" "}
                  {format(
                    new Date(order.orderInfo.estimatedCompletionDate),
                    "MM-dd-yyyy | HH:mm"
                  )}
                </td>
                <td>
                  {order.vehicle.make} {order.vehicle.model} (
                  {order.vehicle.year})
                </td>
                <td>
                  <Button
                    onClick={() => handleToggle(order.orderId)}
                    aria-controls={`services-collapse-${order.orderId}`}
                    aria-expanded={openOrderId === order.orderId}
                  >
                    {openOrderId === order.orderId
                      ? "Hide Services"
                      : "Show Services"}
                  </Button>
                </td>
              </tr>
              <tr>
                <td colSpan="7">
                  <Collapse in={openOrderId === order.orderId}>
                    <div id={`services-collapse-${order.orderId}`}>
                      {order.services.length > 0 ? (
                        <Form>
                          {order.services.map((service, index) => (
                            <Form.Check
                              key={index}
                              type="checkbox"
                              label={`${service.serviceName} - $${service.servicePrice} `}
                              checked={service.serviceCompleted}
                              readOnly
                            />
                          ))}
                        </Form>
                      ) : (
                        <div>No services available</div>
                      )}
                    </div>
                  </Collapse>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Tasks;
