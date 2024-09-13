import React, { useState, useEffect } from "react";
import { Table, Spinner, Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import customerService from "../../../../services/customer.service";
import { format } from "date-fns";
import { useAuth } from "../../../../Contexts/AuthContext";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Import icons

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);


  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCustomers = async () => {
      if (!token) {
        setApiError(true);
        setApiErrorMessage("You must be logged in to view this data.");
        setLoading(false);
        return;
      }

      try {
        const res = await customerService.getAllCustomers(token);

        if (!res.ok) {

          setApiError(true);
          setApiErrorMessage("Error fetching customers.");
        } else {

          const data = await res.json();
          setCustomers(data);
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, [token]);


  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDelete = async () => {
    if (!selectedCustomer) return;

    try {
      await customerService.deleteCustomer(selectedCustomer.customer_id, token);
      setCustomers(
        customers.filter(
          (customer) => customer.customer_id !== selectedCustomer.customer_id
        )
      );
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer); // Set the customer to be deleted
    setShowConfirmDelete(true); // Show the confirmation modal
  };

  const handleEdit = (customer) => {
    navigate(`/admin/customer/${customer.customer_id}`); // Use navigate to move to the edit page
  };
   const handleEditClick = (customer) => (e) => {
     e.stopPropagation(); // Prevent triggering row click
     handleEdit(customer);
   };

  return (
    <>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="contact-section">
          <div className="container">
            <div className="contact-title">
              <h2>Customers</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Customer ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Customer Email</th>
                    <th>Customer Phone</th>
                    <th>Created Date</th>
                    <th>Customer Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr
                      key={customer.customer_id}
                      onClick={() => handleRowClick(customer)}
                      style={{ cursor: "pointer" }}
                    >
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        {format(
                          new Date(customer.customer_added_date),
                          "MM-dd-yyyy | HH:mm"
                        )}
                      </td>


                      <td>
                        {customer.active_customer_status === 1
                          ? "Active"
                          : "Inactive"}
                      </td>
                      <td>
                        <Button
                          variant="link"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering row click
                            handleEdit(customer);
                          }}
                        >
                          <FaEdit color="blue" />
                        </Button>
                        <Button
                          variant="link"
                          className="ms-2"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering row click
                            handleDelete(customer);
                          }}
                        >
                          <FaTrashAlt color="red" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Customer Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedCustomer && (
                <>
                  <p>
                    <strong>Customer ID:</strong> {selectedCustomer.customer_id}
                  </p>
                  <p>
                    <strong>Name:</strong>{" "}
                    {selectedCustomer.customer_first_name}{" "}
                    {selectedCustomer.customer_last_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCustomer.customer_email}
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    {selectedCustomer.customer_phone_number}
                  </p>
                  <p>
                    <strong>Created Date:</strong>{" "}
                    {format(
                      new Date(selectedCustomer.customer_added_date),
                      "MM-dd-yyyy | HH:mm"
                    )}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedCustomer.active_customer_status === 1
                      ? "Active"
                      : "Inactive"}
                  </p>
                </>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleEditClick(selectedCustomer)}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={handleDeleteClick}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      )}
    </>
  );
};

export default CustomersList;
