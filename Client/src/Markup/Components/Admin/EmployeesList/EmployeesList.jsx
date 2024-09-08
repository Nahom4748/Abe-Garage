import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Alert,
  Toast,
  InputGroup,
  FormControl,
  Pagination,
} from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash, FaPrint } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";
import "./EmployeesList.css";

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [employeeIdToPrint, setEmployeeIdToPrint] = useState(null);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("success");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(5);

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

  useEffect(() => {
    const filterEmployees = () => {
      if (searchQuery === "") {
        setFilteredEmployees(employees);
      } else {
        setFilteredEmployees(
          employees.filter((emp) =>
            [
              emp.employee_first_name,
              emp.employee_last_name,
              emp.employee_email,
              emp.employee_phone,
              format(new Date(emp.added_date), "MM-dd-yyyy | HH:mm"),
              emp.company_role_name,
            ]
              .join(" ")
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
          )
        );
      }
    };

    filterEmployees();
  }, [searchQuery, employees]);

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const generateEmployeeId = (employee) => {
    return `${employee.employee_id}-${Date.now()}`;
  };

  const handlePrintId = (employee) => {
    const id = generateEmployeeId(employee);
    setEmployeeIdToPrint(id);
    setCurrentEmployee(employee);
    setShowPrintModal(true);
  };

  const handleConfirmPrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(
      "<html><head><title>Employee ID</title></head><body>"
    );
    printWindow.document.write(
      `<h1>Employee ID</h1>
      <p><strong>Full Name:</strong> ${currentEmployee.employee_first_name} ${
        currentEmployee.employee_last_name
      }</p>
      <p><strong>Email:</strong> ${currentEmployee.employee_email}</p>
      <p><strong>Role:</strong> ${currentEmployee.company_role_name}</p>
      <p><strong>Phone Number:</strong> ${currentEmployee.employee_phone}</p>
      <p><strong>Added Date:</strong> ${format(
        new Date(currentEmployee.added_date),
        "MM-dd-yyyy | HH:mm"
      )}</p>
      <p>${employeeIdToPrint}</p>`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

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
      setFilteredEmployees(
        filteredEmployees.filter(
          (emp) => emp.employee_id !== employeeToDelete.employee_id
        )
      );
      setToastMessage("Employee deleted successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      setToastMessage("Failed to delete employee");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setShowDeleteConfirm(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleSaveChanges = async () => {
    try {
      const res = await employeeService.updateEmployee(currentEmployee, token);
      if (!res.ok) {
        throw new Error(res.status);
      }
      setToastMessage("Employee updated successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
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
      setFilteredEmployees(
        filteredEmployees.map((emp) =>
          emp.employee_id === currentEmployee.employee_id
            ? currentEmployee
            : emp
        )
      );
      setShowEditModal(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const roleOptions = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Manager" },
    { id: 3, name: "Employee" },
  ];

  return (
    <section className="employees-list-section">
      <div className="container-fluid">
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
            <div className="mb-3">
              <InputGroup>
                <FormControl
                  placeholder="Search employees by all fields"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setSearchQuery(e.target.value);
                    }
                  }}
                />
              </InputGroup>
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
                  {currentEmployees.map((employee) => (
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
                          size="sm"
                          className="me-2 p-0"
                          onClick={() => handleEditClick(employee)}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="me-2 p-0"
                          onClick={() => handleDeleteClick(employee)}
                        >
                          <FaTrash />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          className="p-0"
                          onClick={() => {
                            handlePrintId(employee);
                          }}
                        >
                          <FaPrint />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* Pagination Controls */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.Prev
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
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
        <Modal.Body>
          {employeeToDelete && (
            <>
              <p>
                <strong>First Name:</strong>{" "}
                {employeeToDelete.employee_first_name}
              </p>
              <p>
                <strong>Last Name:</strong>{" "}
                {employeeToDelete.employee_last_name}
              </p>
              <p>
                <strong>Email:</strong> {employeeToDelete.employee_email}
              </p>
              <p>
                <strong>Phone:</strong> {employeeToDelete.employee_phone}
              </p>
              <p>
                <strong>Added Date:</strong>{" "}
                {format(
                  new Date(employeeToDelete.added_date),
                  "MM-dd-yyyy | HH:mm"
                )}
              </p>
              <p>
                <strong>Role:</strong> {employeeToDelete.company_role_name}
              </p>
              <p>Are you sure you want to delete this employee?</p>
            </>
          )}
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

      {/* Print Employee ID Modal */}
      <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Employee ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentEmployee && (
            <div className="d-flex flex-column align-items-center">
              <h3>Abe-Gerage Employee ID</h3>
              <p>
                <strong>Full Name:</strong>{" "}
                {`${currentEmployee.employee_first_name} ${currentEmployee.employee_last_name}`}
              </p>
              <p>
                <strong>Email:</strong> {currentEmployee.employee_email}
              </p>
              <p>
                <strong>Role:</strong> {currentEmployee.company_role_name}
              </p>
              <p>
                <strong>Phone Number:</strong> {currentEmployee.employee_phone}
              </p>
              <p>
                <strong>Added Date:</strong>{" "}
                {format(
                  new Date(currentEmployee.added_date),
                  "MM-dd-yyyy | HH:mm"
                )}
              </p>
              <div className="my-3">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Employee"
                  className="img-fluid"
                />
              </div>
              <Button variant="primary" onClick={handleConfirmPrint}>
                Print ID
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrintModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        bg={toastVariant}
        className="position-fixed top-0 start-50 translate-middle-x m-3"
        style={{ zIndex: 1050 }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </section>
  );
};

export default EmployeesList;
