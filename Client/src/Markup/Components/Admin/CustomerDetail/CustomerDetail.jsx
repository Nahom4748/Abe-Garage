import React from "react";
import { format } from "date-fns";
import { Button, Modal } from "react-bootstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CustomerDetail = ({
  customer,
  showModal,
  handleCloseModal,
  handleEdit,
  handleDelete,
}) => {
  const navigate = useNavigate();

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Customer Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {customer && (
          <>
            <p>
              <strong>Customer ID:</strong> {customer.customer_id}
            </p>
            <p>
              <strong>Name:</strong>{" "}
              {`${customer.customer_first_name} ${customer.customer_last_name}`}
            </p>
            <p>
              <strong>Email:</strong> {customer.customer_email}
            </p>
            <p>
              <strong>Phone:</strong> {customer.customer_phone_number}
            </p>
            <p>
              <strong>Created Date:</strong>{" "}
              {format(
                new Date(customer.customer_added_date),
                "MM-dd-yyyy | HH:mm"
              )}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {customer.active_customer_status === 1 ? "Active" : "Inactive"}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={() => handleEdit(customer)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => handleDelete(customer)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomerDetail;
