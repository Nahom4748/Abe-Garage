import React, { useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    quantity: "",
    price: "",
    purchaseDate: "",
    imageUrl: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/items/add", formData);
      setMessage("Item added successfully!");
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Failed to add item.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Admin Menu */}
        <div className="col-md-3">
          <div
            style={{ backgroundColor: "#071c1f" }}
            className="text-white p-4"
          >
            <h3 style={{ backgroundColor: "darkgrey" }}>ADMIN MENU</h3>
            <ul className="nav flex-column">
              <li className="nav-item">
                <a href="#dashboard" className="nav-link text-white">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a href="#orders" className="nav-link text-white">
                  Orders
                </a>
              </li>
              <li className="nav-item">
                <a href="#new-order" className="nav-link text-white">
                  New order
                </a>
              </li>
              <li className="nav-item">
                <a href="#add-employee" className="nav-link text-white">
                  Add employee
                </a>
              </li>
              <li className="nav-item">
                <a href="#employees" className="nav-link text-white">
                  Employees
                </a>
              </li>
              <li className="nav-item">
                <a href="#add-customer" className="nav-link text-white">
                  Add customer
                </a>
              </li>
              <li className="nav-item">
                <a href="#customers" className="nav-link text-white">
                  Customers
                </a>
              </li>
              <li className="nav-item">
                <a href="#services" className="nav-link text-white">
                  Services
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Add Item Form */}
        <div className="col-md-9">
          <div className="container mt-4">
            <h2 className="mb-4">Add a New Item</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="itemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="itemName"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleChange}
                  placeholder="Item name"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="Quantity"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="purchaseDate" className="form-label">
                  Purchase Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="purchaseDate"
                  name="purchaseDate"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="imageUrl" className="form-label">
                  Image URL
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="Image URL"
                />
              </div>

              <button type="submit" className="btn btn-danger">
                Add Item
              </button>
            </form>
            {message && <p className="mt-3">{message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
