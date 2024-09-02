import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const { employee } = useAuth();
  let token = null;
  if (employee) {
    token = employee.employee_token;
  }

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await employeeService.getAllEmployees(token);
        if (!res.ok) {
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        const data = await res.json();
        if (data.data.length !== 0) {
          setEmployees(data.data);
        }
      } catch (err) {
        console.error(err);
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
    } catch (err) {
      console.error(err);
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await employeeService.updateEmployee(currentEmployee, token);
      setEmployees(
        employees.map((emp) =>
          emp.employee_id === currentEmployee.employee_id
            ? currentEmployee
            : emp
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  // Static role options
  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Employee" },
  ];

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section">
            <div className="auto-container">
              <div className="contact-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
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
                          variant="link"
                          onClick={() => handleEditClick(employee)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="link"
                          onClick={() => handleDeleteClick(employee)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </section>

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
                  <Form.Group controlId="formActive">
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      checked={currentEmployee.active_employee}
                      onChange={(e) =>
                        setCurrentEmployee({
                          ...currentEmployee,
                          active_employee: e.target.checked,
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
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
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
            <Modal.Body>
              Are you sure you want to delete this employee?
            </Modal.Body>
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
        </>
      )}
    </>
  );
};

export default EmployeesList;
