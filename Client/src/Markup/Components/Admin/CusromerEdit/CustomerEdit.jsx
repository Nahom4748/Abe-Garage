import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import customerService from "../../../../services/customer.service";
import { Button, Container } from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import "./customerEdit.css"; // Create a CSS file for custom styles
import vehicleService from "../../../../services/vehicle.service";

const CustomerEdit = () => {
  const { customer_id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [vehicles, setVehicles] = useState([]); // State for vehicles
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { employee } = useAuth();
  const token = employee ? employee.employee_token : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerAndVehicles = async () => {
      try {
        const res = await customerService.getCustomerById(customer_id, token);
        const vehicleRes = await vehicleService.getVehicleByCustomerId(
          customer_id,
          token
        );

        if (res.ok && vehicleRes.ok) {
          const customerData = await res.json();
          const vehicleData = await vehicleRes.json();
          setCustomer(customerData);
          setVehicles(vehicleData); // Set vehicle data
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerAndVehicles();
  }, [customer_id, token]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching customer or vehicle details</p>;

  return (
    <Container className="mt-5">
      <h2 className="mb-4 text-center">Customer Information</h2>
      <div className="table-container">
        <div className="table-header">
          <div className="flex-item">Name</div>
          <div className="flex-item">Email</div>
          <div className="flex-item">Phone Number</div>
          <div className="flex-item">Status</div>
        </div>
        <div className="table-row">
          <div className="flex-item">
            {customer.customer_first_name} {customer.customer_last_name}
          </div>
          <div className="flex-item">{customer.customer_email}</div>
          <div className="flex-item">{customer.customer_phone_number}</div>
          <div className="flex-item">
            {customer.active_customer_status === "1" ? "Active" : "Inactive"}
          </div>
        </div>
      </div>

      {/* Displaying Vehicle Details */}
      <h3 className="mt-5 mb-4 text-center">Vehicle Information</h3>
      {vehicles.length > 0 ? (
        <div className="table-container">
          <div className="table-header">
            <div className="flex-item">Vehicle Model</div>
            <div className="flex-item">License Plate</div>
            <div className="flex-item">Year</div>
            <div className="flex-item">Status</div>
          </div>
          {vehicles.map((vehicle) => (
            <div key={vehicle.vehicle_id} className="table-row">
              <div className="flex-item">{vehicle.vehicle_model}</div>
              <div className="flex-item">{vehicle.license_plate}</div>
              <div className="flex-item">{vehicle.year}</div>
              <div className="flex-item">
                {vehicle.active_status === "1" ? "Active" : "Inactive"}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No vehicles associated with this customer.</p>
      )}

      <div className="button-group text-center mt-4">
        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/admin/customers/edit/${customer_id}`)}
          className="mx-2"
        >
          Edit Customer
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => console.log("Reset Password")} // Placeholder for reset password action
          className="mx-2"
        >
          Reset Password
        </Button>
      </div>
    </Container>
  );
};

export default CustomerEdit;
