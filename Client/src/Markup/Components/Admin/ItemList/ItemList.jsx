import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../Contexts/AuthContext";
import itemService from "../../../../services/item.service";
import { format } from "date-fns";
import "../ItemList/ItemList.css";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMessage, setApiErrorMessage] = useState(null);

  // Get the logged-in employee's token
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  // Fetch items on component mount
  useEffect(() => {
    const fetchItems = async () => {
      if (!token) {
        setApiError(true);
        setApiErrorMessage("You must be logged in to view this data.");
        setLoading(false);
        return;
      }
      console.log("Token being sent:", token);

      try {
        const res = await itemService.getAllItems(token);
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
          console.log(data);
          setItems(data);
        }
      } catch (error) {
        console.error("Error fetching items in frontend:", error);
        setApiError(true);
        setApiErrorMessage("An error occurred while fetching items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [token]); // This will re-run the effect when the token changes

  return (
    <>
      {loading ? (
        <div className="spinner-container">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : apiError ? (
        <section className="error-section">
          <div className="auto-container">
            <div className="error-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <section className="item-section">
          <div className="container">
            <div className="item-title">
              <h2>Items</h2>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Purchase Date</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.item_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        {format(
                          new Date(item.purchase_date),
                          "MM-dd-yyyy | HH:mm"
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/admin/items/${item.id}`}
                          className="btn btn-primary"
                        >
                          Edit/Delete
                        </Link>
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

export default ItemList;
