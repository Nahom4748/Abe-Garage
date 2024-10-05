// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   Spinner,
// //   Alert,
// //   Card,
// //   ListGroup,
// //   Button,
// //   Modal,
// //   Form,
// // } from "react-bootstrap";
// // import { FaEdit } from "react-icons/fa";
// // import { useAuth } from "../../../../Contexts/AuthContext";

// // function MyOrders() {
// //   const { orderId } = useParams(); // Retrieve order ID from the URL
// //   const [orderDetails, setOrderDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { isLogged, employee } = useAuth();
// //   const customerId = employee.customer_id;

// //   useEffect(() => {
// //     if (customerId) {
// //       const fetchOrderDetails = async () => {
// //         try {
// //           const response = await axios.get(
// //             `http://localhost:5000/api/order/customer/${customerId}`
// //           );
// //           if (!response.data) {
// //             throw new Error("Failed to fetch order details");
// //           } else {
// //             setOrderDetails(response.data);
// //           }
// //         } catch (err) {
// //           setError("Failed to fetch order details");
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       fetchOrderDetails();
// //     }
// //   }, [customerId]);

// //   if (loading) {
// //     return (
// //       <div className="text-center">
// //         <Spinner animation="border" />
// //         <p>Loading order details...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <Alert variant="danger">{error}</Alert>;
// //   }

// //   return (
// //     <div>
// //       {orderDetails && orderDetails.length > 0 ? (
// //         orderDetails.map((order) => (
// //           <Card className="mt-4" key={order.orderId}>
// //             <Card.Header>
// //               <h4></h4>
// //             </Card.Header>
// //             <Card.Body>
// //               <h5>My Profile</h5>
// //               <ListGroup>
// //                 <ListGroup.Item>
// //                   <strong>Name:</strong> {order.customer.firstName}{" "}
// //                   {order.customer.lastName}
// //                 </ListGroup.Item>
// //                 <ListGroup.Item>
// //                   <strong>Email:</strong> {order.customer.email}
// //                 </ListGroup.Item>
// //                 <ListGroup.Item>
// //                   <strong>Phone Number:</strong> {order.customer.phoneNumber}
// //                 </ListGroup.Item>
// //               </ListGroup>
// //             </Card.Body>
// //           </Card>
// //         ))
// //       ) : (
// //         <p>No profile found.</p>
// //       )}
// //     </div>
// //   );
// // }

// // export default MyOrders;

// // import React, { useEffect, useState } from "react";
// // import { useParams } from "react-router-dom";
// // import axios from "axios";
// // import {
// //   Spinner,
// //   Alert,
// //   Card,
// //   ListGroup,
// //   Button,
// //   Modal,
// //   Form,
// // } from "react-bootstrap";
// // import { FaEdit } from "react-icons/fa";
// // import { useAuth } from "../../../../Contexts/AuthContext";

// // function MyProfile() {
// //   const { orderId } = useParams(); // Retrieve order ID from the URL (if needed)
// //   const [orderDetails, setOrderDetails] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [showModal, setShowModal] = useState(false);
// //   const [formData, setFormData] = useState({ password: "", newPassword: "" });
// //   const { isLogged, employee } = useAuth();
// //   const customerId = employee.customer_id;

// //   useEffect(() => {
// //     if (customerId) {
// //       const fetchOrderDetails = async () => {
// //         try {
// //           const response = await axios.get(
// //             `http://localhost:5000/api/order/customer/${customerId}`
// //           );
// //           if (!response.data) {
// //             throw new Error("Failed to fetch order details");
// //           } else {
// //             setOrderDetails(response.data);
// //           }
// //         } catch (err) {
// //           setError("Failed to fetch order details");
// //         } finally {
// //           setLoading(false);
// //         }
// //       };
// //       fetchOrderDetails();
// //     }
// //   }, [customerId]);

// //   const handleModalOpen = () => setShowModal(true);
// //   const handleModalClose = () => setShowModal(false);

// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handlePasswordChange = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await axios.put(
// //         `http://localhost:5000/api/customer/${customerId}/change-password`,
// //         formData
// //       );
// //       alert("Password changed successfully!");
// //     } catch (err) {
// //       setError("Failed to change password");
// //     } finally {
// //       setShowModal(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="text-center">
// //         <Spinner animation="border" />
// //         <p>Loading profile details...</p>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return <Alert variant="danger">{error}</Alert>;
// //   }

// //   return (
// //     <div>
// //       {orderDetails && orderDetails.length > 0 ? (
// //         orderDetails.map((order) => (
// //           <Card className="mt-4" key={order.orderId}>
// //             <Card.Header>
// //               <h4>My Profile</h4>
// //             </Card.Header>
// //             <Card.Body>
// //               <ListGroup>
// //                 <ListGroup.Item>
// //                   <strong>Name:</strong> {order.customer.firstName}{" "}
// //                   {order.customer.lastName}
// //                 </ListGroup.Item>
// //                 <ListGroup.Item>
// //                   <strong>Email:</strong> {order.customer.email}
// //                 </ListGroup.Item>
// //                 <ListGroup.Item>
// //                   <strong>Phone Number:</strong> {order.customer.phoneNumber}
// //                 </ListGroup.Item>
// //                 <ListGroup.Item>
// //                   <Button variant="primary" onClick={handleModalOpen}>
// //                     Change Password
// //                   </Button>
// //                 </ListGroup.Item>
// //               </ListGroup>
// //             </Card.Body>
// //           </Card>
// //         ))
// //       ) : (
// //         <p>No profile found.</p>
// //       )}

// //       {/* Modal for Changing Password */}
// //       <Modal show={showModal} onHide={handleModalClose}>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Change Password</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form onSubmit={handlePasswordChange}>
// //             <Form.Group controlId="formCurrentPassword">
// //               <Form.Label>Current Password</Form.Label>
// //               <Form.Control
// //                 type="password"
// //                 name="password"
// //                 value={formData.password}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </Form.Group>
// //             <Form.Group controlId="formNewPassword">
// //               <Form.Label>New Password</Form.Label>
// //               <Form.Control
// //                 type="password"
// //                 name="newPassword"
// //                 value={formData.newPassword}
// //                 onChange={handleInputChange}
// //                 required
// //               />
// //             </Form.Group>
// //             <Button variant="primary" type="submit">
// //               Save Changes
// //             </Button>
// //           </Form>
// //         </Modal.Body>
// //       </Modal>
// //     </div>
// //   );
// // }

// // export default MyProfile;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Spinner,
//   Alert,
//   Card,
//   ListGroup,
//   Button,
//   Modal,
//   Form,
// } from "react-bootstrap";
// import { useAuth } from "../../../../Contexts/AuthContext";

// function MyProfile() {
//   const { orderId } = useParams(); // Retrieve order ID from the URL (if needed)
//   const [orderDetails, setOrderDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({ password: "", newPassword: "" });
//   const { isLogged, employee } = useAuth();
//   const customerId = employee?.customer_id;

//   useEffect(() => {
//     if (customerId) {
//       const fetchOrderDetails = async () => {
//         try {
//           const response = await axios.get(
//             `http://localhost:5000/api/order/customer/${customerId}`
//           );
//           if (!response.data) {
//             throw new Error("Failed to fetch order details");
//           }
//           setOrderDetails(response.data);
//         } catch (err) {
//           setError("Failed to fetch order details");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchOrderDetails();
//     }
//   }, [customerId]);

//   const handleModalOpen = () => setShowModal(true);
//   const handleModalClose = () => setShowModal(false);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handlePasswordChange = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/customer/${customerId}/change-password`,
//         formData
//       );
//       alert("Password changed successfully!");
//       setFormData({ password: "", newPassword: "" }); // Reset form data
//       setShowModal(false);
//     } catch (err) {
//       setError("Failed to change password");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center">
//         <Spinner animation="border" />
//         <p>Loading profile details...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   return (
//     <div>
//       {orderDetails && orderDetails.length > 0 ? (
//         orderDetails.map((order) => (
//           <Card className="mt-4" key={order.orderId}>
//             <Card.Header>
//               <h4>My Profile</h4>
//             </Card.Header>
//             <Card.Body>
//               <ListGroup>
//                 <ListGroup.Item>
//                   <strong>Name:</strong> {order.customer.firstName} {order.customer.lastName}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Email:</strong> {order.customer.email}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <strong>Phone Number:</strong> {order.customer.phoneNumber}
//                 </ListGroup.Item>
//                 <ListGroup.Item>
//                   <Button variant="primary" onClick={handleModalOpen}>
//                     Change Password
//                   </Button>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card.Body>
//           </Card>
//         ))
//       ) : (
//         <p>No profile found.</p>
//       )}

//       {/* Modal for Changing Password */}
//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Change Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form onSubmit={handlePasswordChange}>
//             <Form.Group controlId="formCurrentPassword">
//               <Form.Label>Current Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Form.Group controlId="formNewPassword">
//               <Form.Label>New Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleInputChange}
//                 required
//               />
//             </Form.Group>
//             <Button variant="primary" type="submit">
//               Save Changes
//             </Button>
//           </Form>
//         </Modal.Body>
//       </Modal>
//     </div>
//   );
// }

// export default MyProfile;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Spinner,
  Alert,
  Card,
  ListGroup,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { useAuth } from "../../../../Contexts/AuthContext";
import employeeService from "../../../../services/employee.service"; // Assuming you have a service file for the employee

function MyProfile() {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [password, setPassword] = useState("");
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState("");
  const [showToast, setShowToast] = useState(false);
  const { isLogged, employee } = useAuth();
  const customerId = employee?.customer_id;

  useEffect(() => {
    if (customerId) {
      const fetchOrderDetails = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/order/customer/${customerId}`
          );
          if (!response.data) {
            throw new Error("Failed to fetch order details");
          }
          setOrderDetails(response.data);
        } catch (err) {
          setError("Failed to fetch order details");
        } finally {
          setLoading(false);
        }
      };
      fetchOrderDetails();
    }
  }, [customerId]);

  const handleModalOpen = () => setShowPasswordResetModal(true);
  const handleModalClose = () => setShowPasswordResetModal(false);

  const handlePasswordReset = async () => {
    try {
      await employeeService.resetEmployeePassword(customerId, password); // Assuming you're using employeeService for password reset
      setToastMessage("Password reset successfully");
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      setToastMessage("Failed to reset password");
      setToastVariant("danger");
      setShowToast(true);
    } finally {
      setShowPasswordResetModal(false);
      setPassword("");
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" />
        <p>Loading profile details...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {orderDetails && orderDetails.length > 0 ? (
        orderDetails.map((order) => (
          <Card className="mt-4" key={order.orderId}>
            <Card.Header>
              <h4>My Profile</h4>
            </Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Name:</strong> {order.customer.firstName}{" "}
                  {order.customer.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Email:</strong> {order.customer.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Phone Number:</strong> {order.customer.phoneNumber}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="primary" onClick={handleModalOpen}>
                    Change Password
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No profile found.</p>
      )}

      {/* Modal for Changing Password */}
      <Modal show={showPasswordResetModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNewPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" onClick={handlePasswordReset}>
              Reset Password
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Toast message */}
      {showToast && (
        <Alert
          variant={toastVariant}
          onClose={() => setShowToast(false)}
          dismissible
        >
          {toastMessage}
        </Alert>
      )}
    </div>
  );
}

export default MyProfile;
