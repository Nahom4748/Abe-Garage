// Import necessary components and libraries
import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons for edit and delete
import { useAuth } from "../../../../Contexts/AuthContext";
import { format } from "date-fns";
import employeeService from "../../../../services/employee.service";

// Create the EmployeesList component
const EmployeesList = () => {
  // State for storing employees data
  const [employees, setEmployees] = useState([]);
  // State for API errors
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // State for loading status
  const [loading, setLoading] = useState(true);
  // Get logged-in employee token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
    // Fetch all employees
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees(token);
        if (!res.ok) {
          throw new Error(res.status);
        }
        const data = await res.json();
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      } catch (err) {
        setApiError(true);
        if (err.message === "401") {
          setApiErrorMessage("Please login again");
        } else if (err.message === "403") {
          setApiErrorMessage("You are not authorized to view this page");
        } else {
          setApiErrorMessage("Please try again later");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [token]);

  return (
    <section className="contact-section">
      <div className="auto-container">
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
          </div>
        ) : apiError ? (
          <Alert variant="danger">{apiErrorMessage}</Alert>
        ) : (
          <>
            <div className="contact-title mb-4">
              <h2>Employees List</h2>
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Active</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Added Date</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>{employee.active_employee ? "Yes" : "No"}</td>
                    <td>{employee.employee_first_name}</td>
                    <td>{employee.employee_last_name}</td>
                    <td>{employee.employee_email}</td>
                    <td>{employee.employee_phone}</td>
                    <td>
                      {format(
                        new Date(employee.added_date),
                        "MM-dd-yyyy | HH:mm"
                      )}
                    </td>
                    <td>{employee.company_role_name}</td>
                    <td>
                      <Button variant="warning" size="sm" className="me-2">
                        <FaEdit /> Edit
                      </Button>
                      <Button variant="danger" size="sm">
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </div>
    </section>
  );
};

export default EmployeesList;
