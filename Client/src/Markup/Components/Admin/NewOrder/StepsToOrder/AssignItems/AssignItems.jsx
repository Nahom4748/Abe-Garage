import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Table, Button, Alert, Form } from "react-bootstrap";
import { FaCheck, FaTimes } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Assignitems.css";
import { useAuth } from "../../../../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Assignitems = ({
  customer = {},
  vehicles = [],
  orderDetails = {},
  services = [],
}) => {
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate();

  const selectedServices = orderDetails.selectedServices || [];
  const additionalNotes = orderDetails.additionalNotes || "N/A";
  const customPrice = orderDetails.customPrice || "0.00";

  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [error, setError] = useState(null);
  const [estimatedCompletionDate, setEstimatedCompletionDate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const serviceMap = services.reduce((acc, service) => {
    acc[service.service_id] = {
      name: service.service_name,
      price: service.service_price.toFixed(2),
    };
    return acc;
  }, {});

  const totalServicePrice = selectedServices
    .reduce((total, service) => total + parseFloat(service.price), 0)
    .toFixed(2);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/employees");
        const filteredEmployees = data.data.filter(
          (employee) => employee.company_role_id === 1
        );
        setEmployees(filteredEmployees);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Failed to fetch employees");
      }
    };

    fetchEmployees();
  }, [token]);

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const formatDate = (date) => {
    if (!date) return null;
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const seconds = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleFinalizeOrder = async () => {
    if (selectedEmployees.length === 0 || !estimatedCompletionDate) {
      setShowAlert(true);
      return;
    }

    try {
      const customer_id = customer.customer_id;
      const vehicle_id = vehicles[0].vehicle_id;
      const order_description = additionalNotes;
      const estimated_completion_date = formatDate(estimatedCompletionDate);
      const employee_id = selectedEmployees[0];
      const Order_Date = formatDate(new Date());
      const order_completed = 1;
      const order_services = JSON.stringify(
        selectedServices.map((service) => ({
          service_id: service.id,
          service_completed: 0,
        }))
      );
      const order_total_price = totalServicePrice;
      const notes_for_internal_use = "null no data yet for this field";
      const notes_for_customer = "null no data yet for this field";
      const additional_requests_completed = "null no data yet for this field";

      const orderPayload = {
        customer_id,
        vehicle_id,
        order_description,
        estimated_completion_date,
        employee_id,
        Order_Date,
        order_completed,
        order_services,
        order_total_price,
        notes_for_internal_use,
        notes_for_customer,
        additional_requests_completed,
      };

      await axios.post("http://localhost:5000/api/order", orderPayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/admin/orders");
      }, 2000);
    } catch (err) {
      console.error("Error finalizing order:", err);
      alert("Failed to finalize the order");
    }
  };

  const hasSelectedEmployees = selectedEmployees.length > 0;
  const hasCompletionDate = estimatedCompletionDate !== null;

  return (
    <Card className="mb-4 shadow-sm border-0">
      <Card.Body>
        <Card.Title className="fs-4">Assigned Items</Card.Title>

        {/* Customer Information */}
        <h5 className="mt-4 fs-5">
          Customer Information <FaCheck className="text-success" />
        </h5>
        <Table striped bordered hover className="customer-table custom-table">
          <tbody>
            <tr>
              <td>
                <strong>First Name:</strong>
              </td>
              <td>
                {customer.customer_first_name} {customer.customer_last_name}
              </td>
            </tr>
            <tr>
              <td>
                <strong>Email:</strong>
              </td>
              <td>{customer.customer_email || "N/A"}</td>
            </tr>
            <tr>
              <td>
                <strong>Phone:</strong>
              </td>
              <td>{customer.customer_phone_number || "N/A"}</td>
            </tr>
          </tbody>
        </Table>

        {/* Vehicle Information */}
        <h5 className="mt-4 fs-5">
          Vehicle Information <FaCheck className="text-success" />
        </h5>
        <Table striped bordered hover className="vehicle-table custom-table">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Serial Number</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle) => (
              <tr key={vehicle.vehicle_serial}>
                <td>{vehicle.vehicle_make}</td>
                <td>{vehicle.vehicle_model}</td>
                <td>{vehicle.vehicle_year}</td>
                <td>{vehicle.vehicle_serial}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Selected Services */}
        <h5 className="mt-4 fs-5">
          Selected Services <FaCheck className="text-success" />
        </h5>
        <Table
          striped
          bordered
          hover
          className="service-table custom-table mt-3"
        >
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {selectedServices.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>${service.price}</td>
              </tr>
            ))}
            <tr>
              <td>
                <strong>Total Price (Services)</strong>
              </td>
              <td>
                <strong>${totalServicePrice}</strong>
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Employee Information */}
        <h5 className="mt-4 fs-5">
          Employee Information{" "}
          {employees.length > 0 ? (
            hasSelectedEmployees ? (
              <FaCheck className="text-success ms-2" />
            ) : (
              <FaTimes className="text-danger ms-2" />
            )
          ) : (
            <FaTimes className="text-danger ms-2" />
          )}
        </h5>
        {error && <Alert variant="danger">{error}</Alert>}
        {employees.length > 0 ? (
          <Table
            striped
            bordered
            hover
            className="employee-table custom-table mt-3"
          >
            <thead>
              <tr>
                <th>Select</th>
                <th>Full Name</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employee_id}>
                  <td>
                    <Form.Check
                      type="checkbox"
                      id={`employee-${employee.employee_id}`}
                      checked={selectedEmployees.includes(employee.employee_id)}
                      onChange={() =>
                        handleCheckboxChange(employee.employee_id)
                      }
                    />
                  </td>
                  <td>{`${employee.employee_first_name} ${employee.employee_last_name}`}</td>
                  <td>{employee.employee_phone || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <Alert variant="info" className="mt-3">
            No employee information available.
          </Alert>
        )}

        {/* Additional Details */}
        <h5 className="mt-4 fs-5">Additional Details</h5>
        <Table striped bordered hover className="additional-details-table mt-3">
          <tbody>
            <tr>
              <td>
                <strong>Additional Notes:</strong>
              </td>
              <td>{additionalNotes}</td>
            </tr>
            <tr>
              <td>
                <strong>Custom Price:</strong>
              </td>
              <td>${customPrice}</td>
            </tr>
            <tr>
              <td>
                <strong>Estimated Completion Date:</strong>
              </td>
              <td>
                <DatePicker
                  selected={estimatedCompletionDate}
                  onChange={(date) => setEstimatedCompletionDate(date)}
                  showTimeSelect
                  dateFormat="Pp"
                  placeholderText="Select a date"
                />
              </td>
            </tr>
          </tbody>
        </Table>

        {/* Alert and Success Messages */}
        {showAlert && (
          <Alert variant="danger" className="mt-3">
            Please select at least one employee and choose an estimated
            completion date.
          </Alert>
        )}
        {showSuccess && (
          <Alert variant="success" className="mt-3">
            Order finalized successfully!
          </Alert>
        )}

        {/* Finalize Order Button */}
        <div className="d-flex justify-content-end mt-4">
          <Button
            variant="primary"
            onClick={handleFinalizeOrder}
            disabled={!hasSelectedEmployees || !hasCompletionDate}
          >
            Finalize Order
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Assignitems;
