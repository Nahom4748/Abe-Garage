import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  Button,
  Table,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import axios from "axios";
import "./Search.css";

function Search({ onCustomerSelect }) {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [selectedCustomerId, setSelectedCustomerId] = useState(null); // Customer selected for details

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers"); // Adjust endpoint as needed
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    // Filter data based on the search query
    const newFilteredData = data.filter((item) =>
      [
        item.customer_email,
        item.customer_phone_number,
        item.customer_id.toString(),
        item.customer_first_name,
        item.customer_last_name,
      ].some((field) =>
        field.toString().toLowerCase().includes(newQuery.toLowerCase())
      )
    );
    setFilteredData(newFilteredData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", query);
  };

  const handleRowSelect = (customerId) => {
    setSelectedCustomerId(customerId);
    const selectedCustomer = data.find(
      (customer) => customer.customer_id === customerId
    );
    if (onCustomerSelect) {
      onCustomerSelect(selectedCustomer);
    }
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="search-container">
      <Form onSubmit={handleSearch}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by email, phone, name, or ID..."
            value={query}
            onChange={handleChange}
            className="search-input"
          />
          <Button type="submit" variant="primary" className="search-button">
            <SearchIcon />
          </Button>
        </InputGroup>
      </Form>

      {/* Show table only if there are filtered results */}
      {query && filteredData.length > 0 && (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Select</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr
                key={item.customer_id}
                onClick={() => handleRowSelect(item.customer_id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <Form.Check
                    type="radio"
                    name="customerSelection"
                    checked={selectedCustomerId === item.customer_id}
                    onChange={() => handleRowSelect(item.customer_id)}
                  />
                </td>
                <td>{item.customer_first_name}</td>
                <td>{item.customer_last_name}</td>
                <td>{item.customer_email}</td>
                <td>{item.customer_phone_number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Show a message if no results are found */}
      {query && filteredData.length === 0 && (
        <div className="mt-3">No results found.</div>
      )}
    </div>
  );
}

export default Search;
