import React, { useState, useEffect } from "react";
import { Table, Alert, Spinner } from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import customerService from "../../../../services/customer.service";
import { format } from "date-fns";
import "../CustomersList/customerlist.css";

const CustomersList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  // Get the logged-in employee's token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // Fetch customers on component mount
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
          if (res.status === 401) {
            setApiErrorMessage("Please login again.");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page.");
          } else {
            setApiErrorMessage("Something went wrong, please try again.");
          }
        } else {
          const data = await res.json();
          console.log(data)
          setCustomers(data);
        }
      } catch (err) {
        console.error(err);
        setApiError(true);
        setApiErrorMessage("An error occurred while fetching customers.");
      } finally {
        setLoading(false); // Stop loading when the API call is done
      }
    };

    fetchCustomers();
  }, [token]);


  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
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
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.customer_id}>
                      <td>{customer.customer_id}</td>
                      <td>{customer.customer_first_name}</td>
                      <td>{customer.customer_last_name}</td>
                      <td>{customer.customer_email}</td>
                      <td>{customer.customer_phone_number}</td>
                      <td>
                        <p>
                          {format(
                            new Date(customer.customer_added_date),
                            "MM-dd-yyyy | HH:mm"
                          )}
                        </p>
                      </td>
                      {/* <td>{customer.active_customer_status}</td> */}
                      <td
                        
                      >
                        {customer.active_customer_status === 1 ? "Active" : "Inactive"}
                      </td>

                      <td>
                        <a
                          href={`/admin/customers/${customer.customer_id}`}
                          className="btn btn-primary"
                        >
                          Edit/Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CustomersList;
