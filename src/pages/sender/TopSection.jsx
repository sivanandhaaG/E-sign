import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const TopSection = () => {
  const user = useSelector((state) => state.user);
  return (
    <div
      style={{
        padding: "3rem",
        background: "#000",
        color: "#fff",
        marginBottom: "20px",
      }}
    >
      <Row>
        <Col
          lg={4}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col lg={12}>
              <h4>Welcome back</h4>
            </Col>
            <Col lg={12}>
              <h6><b>{user.firstName}</b></h6>
            </Col>
          </Row>
        </Col>
        <Col lg={8}>
          <Row>
            <Col lg={12}>Last 6 Months</Col>
            <Col lg={12}>
              <Row>
                <Col lg={3}>
                  <div>
                    <h1>1</h1>
                    <h6>Action Required</h6>
                  </div>
                </Col>
                <Col lg={3}>
                  <div>
                    <h1>1</h1>
                    <h6>Sent </h6>
                  </div>
                </Col>
                <Col lg={3}>
                  <div>
                    <h1>0</h1>
                    <h6>Expired </h6>
                  </div>
                </Col>
                <Col lg={3}>
                  <div>
                    <h1>1</h1>
                    <h6>Completed </h6>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default TopSection;
