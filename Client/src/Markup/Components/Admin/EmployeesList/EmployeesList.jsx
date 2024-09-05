import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Toast,
} from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";
import "./EmployeesList.css";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // State for Toast notifications
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success"); // 'success' or 'danger'

  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  useEffect(() => {
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

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee);
    setShowEditModal(true);
  };

  const handleDeleteClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await employeeService.deleteEmployee(employeeToDelete.employee_id, token);
      setEmployees(
        employees.filter(
          (emp) => emp.employee_id !== employeeToDelete.employee_id
        )
      );
      // Show success toast
      setToastMessage("Employee deleted successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      console.error(err);
      // Show error toast
      setToastMessage("Failed to delete employee");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setShowDeleteConfirm(false);
      // Hide toast after 2 seconds
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await employeeService.updateEmployee(currentEmployee, token);
      if (!res.ok) {
        throw new Error(res.status);
      }
      // Show success toast
      setToastMessage("Employee updated successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      console.error(err);
      // Show error toast
      setToastMessage("Failed to update employee");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setEmployees(
        employees.map((emp) =>
          emp.employee_id === currentEmployee.employee_id
            ? currentEmployee
            : emp
        )
      );
      setShowEditModal(false);
      // Hide toast after 2 seconds
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Employee" },
  ];

  return (
    <section className="employees-list-section employee-table">
      <div className="auto-container employee-table">
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="primary" />
            <p>Loading...</p>
          </div>
        ) : apiError ? (
          <Alert variant="danger">{apiErrorMessage}</Alert>
        ) : (
          <>
            <div className="contact-title mb-4 ">
              <h2>Employees List</h2>
            </div>
            <div className="table-container">
              <Table
                striped
                bordered
                hover
                responsive
                className="employee-table"
              >
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
                        <Button
                          variant="warning"
                          size="sm"
                          className="me-2"
                          onClick={() => handleEditClick(employee)}
                        >
                          <FaEdit className="icon-edit" /> Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteClick(employee)}
                        >
                          <FaTrash className="icon-delete" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </div>

      {/* Edit Employee Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEmployee && (
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.employee_first_name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_first_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.employee_last_name}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_last_name: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={currentEmployee.employee_email}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee.employee_phone}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={currentEmployee.employee_password}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_password: e.target.value,
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  value={currentEmployee.company_role_id}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      company_role_id: e.target.value,
                    })
                  }
                >
                  {roleOptions.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this employee?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteConfirm(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg={toastVariant} // 'success' or 'danger'
        className="position-fixed top-0 start-50 translate-middle-x m-3"
        style={{ zIndex: 1050 }} // Make sure it appears above other elements
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </section>
  );
};

export default EmployeesList;
