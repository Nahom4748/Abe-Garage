import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ProgressBar,
  ButtonGroup,
} from "react-bootstrap";
import Search from "./StepsToOrder/Search";
import AddOrder from "./StepsToOrder/AddOrder";
import "./neworder.css"; // Custom styles
import CompleteOrder from "./StepsToOrder/completeorder";
import AssignItems from "./StepsToOrder/AssignItems/AssignItems";
import AssignEmployee from "./StepsToOrder/AssignEmployee/AssignEmployee";
import SubmitOrder from "./StepsToOrder/SubmitOrder/SubmitOrder";

const NewOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedData, setSelectedData] = useState({
    customer: null,
    vehicles: [],
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCustomerSelect = (customer) => {
    setSelectedData((prevData) => ({ ...prevData, customer }));
  };

  const handleProceed = (data) => {
    setSelectedData(data);
    setCurrentStep(2); // Move to Complete Order step
  };

  const steps = [
    {
      name: "Search",
      component: <Search onCustomerSelect={handleCustomerSelect} />,
    },
    {
      name: "Add Vehicle",
      component: (
        <AddOrder customer={selectedData.customer} onProceed={handleProceed} />
      ),
    },
    {
      name: "Add Services",
      component: (
        <CompleteOrder
          customer={selectedData.customer}
          vehicles={selectedData.vehicles}
        />
      ),
    },
    {
      name: "Assign Items",
      component: (
        <AssignItems
          customer={selectedData.customer}
          vehicles={selectedData.vehicles}
        />
      ),
    },
    {
      name: " Employee",
      component: <AssignEmployee />,
    },
    {
      name: "Submit Order",
      component: <SubmitOrder />,
    },
  ];

  return (
    <Container className="my-4 full-height">
      <div className="step-container">
        <Row className="text-center mb-4">
          {steps.map((step, index) => (
            <Col key={index} className="d-flex flex-column align-items-center">
              {/* Step Circles */}
              <div
                className={`circle ${
                  index <= currentStep
                    ? "bg-success text-white"
                    : "bg-light text-muted"
                } rounded-circle d-flex justify-content-center align-items-center`}
                style={{ width: "3rem", height: "3rem", fontSize: "1.25rem" }}
              >
                {index < currentStep ? (
                  <i className="fa fa-check"></i>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Labels */}
              <div
                className={`label-box ${
                  index <= currentStep
                    ? "text-success font-weight-bold"
                    : "text-muted"
                }`}
              >
                <span className="label-text">{step.name}</span>
              </div>
            </Col>
          ))}
        </Row>

        <div className="step-content mb-4">
          {React.cloneElement(steps[currentStep].component)}
        </div>

        <Row className="text-center step-footer">
          <Col>
            <ButtonGroup className="d-flex justify-content-center">
              <Button
                variant="secondary"
                className="me-2"
                size="sm"
                onClick={handlePrevious}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button variant="success" size="sm" onClick={handleNext}>
                  Next
                </Button>
              ) : (
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => alert("Order Submitted Successfully!")}
                >
                  Submit Order
                </Button>
              )}
            </ButtonGroup>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default NewOrder;
