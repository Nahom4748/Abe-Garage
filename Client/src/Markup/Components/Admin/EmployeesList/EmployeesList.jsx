import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Spinner, Alert } from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [image, setImage] = useState(null); // For image upload
  const [imagePreview, setImagePreview] = useState(""); // For image preview

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
    setImagePreview(employee.image_path || ""); // Set the current image preview
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
      const formData = new FormData();
      formData.append(
        "employee_first_name",
        currentEmployee.employee_first_name
      );
      formData.append("employee_last_name", currentEmployee.employee_last_name);
      formData.append("employee_phone", currentEmployee.employee_phone);
      formData.append("active_employee", currentEmployee.active_employee);
      formData.append("company_role_id", currentEmployee.company_role_id);
      if (image) {
        formData.append("employee_image", image);
      }

      await employeeService.updateEmployee(
        currentEmployee.employee_id,
        formData,
        token
      );
      setEmployees(
        employees.map((emp) =>
          emp.employee_id === currentEmployee.employee_id
            ? { ...currentEmployee, image_path: imagePreview }
            : emp
        )
      );
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Create a URL for image preview
    }
  };

  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Employee" },
  ];

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
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => handleEditClick(employee)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteClick(employee)}
                      >
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
              <Form.Group controlId="formImage">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Employee Preview"
                    style={{
                      marginTop: "10px",
                      width: "100px",
                      height: "auto",
                    }}
                  />
                )}
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
    </section>
  );
};

export default EmployeesList;
