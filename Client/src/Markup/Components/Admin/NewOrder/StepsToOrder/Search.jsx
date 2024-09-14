import React, { useState, useEffect } from "react";
import {
  Form,
  InputGroup,
  Button,
  ListGroup,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Search as SearchIcon } from "react-bootstrap-icons";
import axios from "axios";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]); // Store fetched data
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

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
      item.name.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredData(newFilteredData);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query:", query);
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
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            className="search-input"
          />
          <Button type="submit" variant="primary" className="search-button">
            <SearchIcon />
          </Button>
        </InputGroup>
      </Form>

      {/* Show list only if there are filtered results */}
      {query && filteredData.length > 0 && (
        <ListGroup className="mt-3">
          {filteredData.map((item) => (
            <ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Show a message if no results are found */}
      {query && filteredData.length === 0 && (
        <div className="mt-3">No results found.</div>
      )}
    </div>
  );
}

export default Search;
