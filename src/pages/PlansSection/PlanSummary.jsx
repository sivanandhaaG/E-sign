import React, { useState } from "react";
import { Card, Row, Col, ProgressBar, Button } from "react-bootstrap";
import {
  Lightning,
  Calendar,
  FileText,
  FileEarmarkCheck,
  People,
  PersonCheck,
  Pen,
  PenFill,
} from "react-bootstrap-icons";
import RazorpayModal from "../../components/common/RazorPay/RazorpayModal";
import { useDisclosure } from "@chakra-ui/react";

const PlanSummary = ({ plans }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = JSON.parse(localStorage.getItem("user")).role;

  const getExpiryDate = (createdAt) => {
    if (!createdAt) return "N/A";

    const createdDate = new Date(createdAt);
    const expiryDate = new Date(
      createdDate.setDate(createdDate.getDate() + 30)
    );

    return expiryDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }); // Example output: "11 April 2025"
  };

  return (
    <>
      <Card className="p-4 shadow-sm border-0 position-relative">
        {/* Upgrade Plan Button */}
        <Button
          variant="primary"
          className="position-absolute top-0 end-0 m-3"
          onClick={onOpen}
        >
          Upgrade Plan
        </Button>

        {/* Plan Summary */}
        <h5 className="fw-bold">Plan Summary</h5>
        <p className="text-muted">
          Your current plan and usage across this billing cycle
        </p>

        {/* Small Cards for Plan Type & Turnover Date */}
        <Row className="mt-3">
          {/* Current Plan Card */}
          <Col xs={2}>
            <Card
              className="p-2 shadow-sm border-0 d-flex flex-row align-items-center"
              style={{ backgroundColor: "#e8e8e8" }}
            >
              <Lightning size={20} className="text-primary me-2" />
              <div>
                <strong className="small">
                  {plans?.type?.toUpperCase() ?? "FREE PLAN"}
                </strong>
                <div className="text-muted small">Current Plan</div>
              </div>
            </Card>
          </Col>

          {/* Turnover Date Card */}
          <Col xs={2}>
            <Card
              className="p-2 shadow-sm border-0 d-flex flex-row align-items-center bg-"
              style={{ backgroundColor: "#e8e8e8" }}
            >
              <Calendar size={20} className="text-secondary me-2" />
              <div>
                <strong className="small">
                  {getExpiryDate(plans?.createdAt)}
                </strong>
                <div className="text-muted small">Turnover Date</div>
              </div>
            </Card>
          </Col>
        </Row>

        <hr className="my-4" />

        {/* Combined Usage Matrix */}
        <Row className="text-center fw-bold mb-2">
          <Col xs={4}>Document Matrix</Col>
          <Col xs={4}>Users Matrix</Col>
          <Col xs={4}>Signature Templates</Col>
        </Row>

        <Row className="align-items-center text-center">
          {/* Document Matrix */}
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          >
            <FileText size={24} className="me-2 text-info" />
            <strong className="fs-5">
              {plans?.documentsCreated ?? 0} / {plans?.documentsRemaining ?? 1}
            </strong>
          </Col>

          {/* Users Matrix */}
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          >
            <People size={24} className="me-2 text-success" />
            <strong className="fs-5">
              {plans?.usersCreated ?? 0} / {plans?.usersRemaining ?? 1}
            </strong>
          </Col>

          {/* Signature Templates */}
          <Col
            xs={4}
            className="d-flex justify-content-center align-items-center"
          >
            <Pen size={24} className="me-2 text-warning" />
            <strong className="fs-5">
              {plans?.signaturesCreated ?? 0} /{" "}
              {plans?.signaturesRemaining ?? 1}
            </strong>
          </Col>
        </Row>
      </Card>

      <hr className="my-4" />
      <RazorpayModal
        isOpen={isOpen}
        onClose={onClose}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        role={role}
        type={plans?.type}
      />
    </>
  );
};

export default PlanSummary;
