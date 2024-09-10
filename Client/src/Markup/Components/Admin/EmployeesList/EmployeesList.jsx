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
  OverlayTrigger,
  Popover,
} from "react-bootstrap";
import { format } from "date-fns";
import { FaEdit, FaTrash, FaPrint, FaEye } from "react-icons/fa";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service";
import "./EmployeesList.css";

const roleLabels = {
  1: "Employee",
  2: "Manager",
  3: "Admin",
};

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
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
        if (res.status !== "success") {
          throw new Error(res.message);
        }
        setEmployees(res.data);
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
              roleLabels[emp.company_role_id],
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
      <p><strong>Role:</strong> ${
        roleLabels[currentEmployee.company_role_id]
      }</p>
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
    setShowEmployeeModal(true);
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
    const formData = new FormData();
    formData.append("employee_first_name", currentEmployee.employee_first_name);
    formData.append("employee_last_name", currentEmployee.employee_last_name);
    formData.append("employee_email", currentEmployee.employee_email);
    formData.append("employee_phone", currentEmployee.employee_phone);
    formData.append("company_role_id", currentEmployee.company_role_id); // Ensure this is a number
    if (currentEmployee.imageFile) {
      formData.append("employee_image", currentEmployee.imageFile);
    }

    try {
      const res = await employeeService.updateEmployee(
        currentEmployee.employee_id,
        formData,
        token
      );
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
      setShowEmployeeModal(false);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setCurrentEmployee({
        ...currentEmployee,
        imageFile: e.target.files[0],
      });
    }
  };

  const employeePopover = (employee) => (
    <Popover id={`popover-${employee.employee_id}`}>
      <Popover.Header as="h3">Employee Details</Popover.Header>
      <Popover.Body>
        <div className="employee-popover">
          <img
            src={employee.employee_image}
            alt={employee.employee_first_name}
            className="employee-image-popover"
          />
          <div className="employee-popover-details">
            <p>
              <strong>Full Name:</strong> {employee.employee_first_name}{" "}
              {employee.employee_last_name}
            </p>
            <p>
              <strong>Email:</strong> {employee.employee_email}
            </p>
            <p>
              <strong>Role:</strong>{" "}
              {roleLabels[employee.company_role_id] || "Unknown"}
            </p>
            <p>
              <strong>Phone Number:</strong> {employee.employee_phone}
            </p>
            <p>
              <strong>Added Date:</strong>{" "}
              {format(new Date(employee.added_date), "MM-dd-yyyy | HH:mm")}
            </p>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  return (
    <div className="employee-list">
      {apiError && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>Error</Alert.Heading>
          <p>{apiErrorMessage}</p>
        </Alert>
      )}

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <div className="title-container">
            <h1 className="title">Employee List</h1>
            <InputGroup className="search-bar-container">
              <FormControl
                placeholder="Search for employees..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-bar"
              />
            </InputGroup>
          </div>

          <div className="employee-table-container">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees.map((employee) => (
                  <tr key={employee.employee_id}>
                    <td>
                      {employee.employee_first_name}{" "}
                      {employee.employee_last_name}
                    </td>
                    <td>{employee.employee_email}</td>
                    <td>{roleLabels[employee.company_role_id] || "Unknown"}</td>
                    <td>
                      <OverlayTrigger
                        trigger="click"
                        placement="right"
                        overlay={employeePopover(employee)}
                      >
                        <Button variant="info" className="action-button">
                          <FaEye />
                        </Button>
                      </OverlayTrigger>
                      <Button
                        variant="warning"
                        onClick={() => handleEditClick(employee)}
                        className="action-button"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteClick(employee)}
                        className="action-button"
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => handlePrintId(employee)}
                        className="action-button"
                      >
                        <FaPrint />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <Pagination.Item
                key={i + 1}
                active={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      )}

      {/* Employee Modal */}
      <Modal
        show={showEmployeeModal}
        onHide={() => setShowEmployeeModal(false)}
        size="lg"
        dialogClassName="modal-90w"
      >
        <Modal.Header closeButton>
          <Modal.Title>Employee Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="employee-modal-content">
            <div className="employee-info">
              <img
                src={currentEmployee?.employee_image}
                alt={currentEmployee?.employee_first_name}
                className="employee-image-modal"
              />
              <div className="employee-details">
                <p>
                  <strong>Full Name:</strong>{" "}
                  {currentEmployee?.employee_first_name}{" "}
                  {currentEmployee?.employee_last_name}
                </p>
                <p>
                  <strong>Email:</strong> {currentEmployee?.employee_email}
                </p>
                <p>
                  <strong>Role:</strong>{" "}
                  {roleLabels[currentEmployee?.company_role_id] || "Unknown"}
                </p>
                <p>
                  <strong>Phone Number:</strong>{" "}
                  {currentEmployee?.employee_phone}
                </p>
                <p>
                  <strong>Added Date:</strong>{" "}
                  {currentEmployee &&
                    format(
                      new Date(currentEmployee.added_date),
                      "MM-dd-yyyy | HH:mm"
                    )}
                </p>
              </div>
            </div>
            <Form>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee?.employee_first_name || ""}
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
                  value={currentEmployee?.employee_last_name || ""}
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
                  value={currentEmployee?.employee_email || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee?.employee_phone || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      employee_phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  type="text"
                  value={currentEmployee?.company_role_id || ""}
                  onChange={(e) =>
                    setCurrentEmployee({
                      ...currentEmployee,
                      company_role_id: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEmployeeModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDeleteClick(currentEmployee)}
          >
            <FaTrash /> Delete
          </Button>
          <Button variant="info" onClick={() => handlePrintId(currentEmployee)}>
            <FaPrint /> Print ID
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteConfirm}
        onHide={() => setShowDeleteConfirm(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
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

      {/* Print Modal */}
      <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Print Employee ID</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Employee ID: {employeeIdToPrint}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPrintModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleConfirmPrint}>
            Print
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notification */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg={toastVariant}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default EmployeesList;
