import React, { useState } from "react";
import { Form, Button, InputGroup, Col, Row, Alert } from "react-bootstrap";
import { Box, Calendar, Cash } from "react-bootstrap-icons";
import itemService from "../../../../services/item.service";
import { useAuth } from "../../../../Contexts/AuthContext";

function AddItemForm(props) {
  const [item_name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [purchase_date, setPurchaseDate] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;

  const [nameError, setNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [dateError, setDateError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let valid = true;

    // Item name validation
    if (!item_name) {
      setNameError("Item name is required");
      valid = false;
    } else {
      setNameError("");
    }

    // Quantity validation
    if (!quantity) {
      setQuantityError("Quantity is required");
      valid = false;
    } else if (isNaN(quantity) || quantity <= 0) {
      setQuantityError("Quantity must be a positive number");
      valid = false;
    } else {
      setQuantityError("");
    }

    // Price validation
    if (!price) {
      setPriceError("Price is required");
      valid = false;
    } else if (isNaN(price) || price <= 0) {
      setPriceError("Price must be a positive number");
      valid = false;
    } else {
      setPriceError("");
    }

    // Purchase date validation
    if (!purchase_date) {
      setDateError("Purchase date is required");
      valid = false;
    } else {
      setDateError("");
    }

    if (!valid) {
      setLoading(false);
      return;
    }

    const formData = {
      item_name,
      quantity,
      price,
      purchase_date,
      image_url,
    };

    try {
      await itemService.createItem(formData, token);
      setSuccess(true);
      setServerError("");
      setTimeout(() => (window.location.href = "/"), 2000);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      className="d-flex justify-content-center align-items-center"
      style={{ height: "60vh", margin: "90px 0" }}
    >
      <div
        className="p-4 bg-light rounded shadow"
        style={{ width: "80%", maxWidth: "600px" }}
      >
        <h2 className="text-center mb-4">Add a New Item</h2>
        {serverError && <Alert variant="danger">{serverError}</Alert>}
        {success && <Alert variant="success">Item added successfully!</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Box />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Item name"
                    value={item_name}
                    onChange={(event) => setName(event.target.value)}
                    isInvalid={!!nameError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {nameError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Cash />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    isInvalid={!!quantityError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {quantityError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Cash />
                  </InputGroup.Text>
                  <Form.Control
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    isInvalid={!!priceError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {priceError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Calendar />
                  </InputGroup.Text>
                  <Form.Control
                    type="date"
                    placeholder="Purchase date"
                    value={purchase_date}
                    onChange={(event) => setPurchaseDate(event.target.value)}
                    isInvalid={!!dateError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {dateError}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="mb-3">
                <InputGroup>
                  <InputGroup.Text>
                    <Box />
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Image URL (optional)"
                    value={image_url}
                    onChange={(event) => setImageUrl(event.target.value)}
                  />
                </InputGroup>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Button
                variant="primary"
                type="submit"
                className="w-100"
                disabled={loading}
              >
                {loading ? "Adding..." : "Add Item"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </section>
  );
}

export default AddItemForm;
