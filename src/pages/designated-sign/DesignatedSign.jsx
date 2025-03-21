import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getESignRequests } from "../../app/api/userApi";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";

const DesignatedSign = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const esignId = searchParams.get("esignId");

  const {
    data: eSignRequests,
    isLoading,
    isError,
    error,
  } = useQuery(
    "eSignRequests",
    async () => {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();

      const res = await getESignRequests(
        esignId,
        searchParams.get("receiverId"),
        data?.ip || ""
      );

      // const resizedMarkers = handleResize(res.data?.markers);
      res.data?.eSignRequest?.receivers?.forEach((receiver) => {
        if (receiver.receiverId === searchParams.get("receiverId")) {
          if (receiver.status === "SIGNED") {
            setIsSigned(true);
          }
        }
      });

      return res;
    },
    {
      staleTime: 1000 * 60 * 5,
    }
  );

  console.log(eSignRequests);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h6
          style={{
            textAlign: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Add Your Designated Person to Sign Documents
        </h6>
        <Form>
          <Row>
            <Col sm={12}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>
                  Name
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Name" required />
              </Form.Group>
            </Col>
            <Col sm={12} className="mt-2">
              <Form.Group controlId="formBasicEmail mt-2">
                <Form.Label>
                  Email
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>
            </Col>
            <Col
              sm={12}
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button variant="primary" type="submit" className="mt-3">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default DesignatedSign;
