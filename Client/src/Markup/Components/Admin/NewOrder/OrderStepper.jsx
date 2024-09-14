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
import "./neworder.css";
import Completeorder from "./StepsToOrder/completeorder";

const steps = [
  { name: "Search", component: <Search /> },
  { name: "Add Order", component: <AddOrder /> },
  { name: "Complete Order", component: <Completeorder /> },
];

const NewOrder = () => {
  const [currentStep, setCurrentStep] = useState(0);

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

  return (
    <Container className="my-4">
      <Row className="text-center mb-4">
        {steps.map((step, index) => (
          <Col key={index} className="d-flex flex-column align-items-center">
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
            {index < steps.length - 1 && (
              <ProgressBar
                now={(index / (steps.length - 1)) * 100}
                style={{ height: "0.5rem", margin: "0.5rem 0" }}
                variant="success"
                className="w-100"
              />
            )}
          </Col>
        ))}
      </Row>

      <div className="mb-4">{steps[currentStep].component}</div>

      <Row className="text-center mb-3">
        {steps.map((step, index) => (
          <Col
            key={index}
            className={`label ${
              index <= currentStep
                ? "text-success font-weight-bold"
                : "text-muted"
            }`}
          >
            {step.name}
            {index === currentStep && <div className="underline"></div>}
          </Col>
        ))}
      </Row>

      <Row className="text-center">
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
                onClick={() => alert("Finished")}
              >
                Finish
              </Button>
            )}
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default NewOrder;
