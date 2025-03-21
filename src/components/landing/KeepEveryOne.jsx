// import React from 'react'

// const KeepEveryOne = () => {
//   return (
//     <div>KeepEveryOne</div>
//   )
// }

// export default KeepEveryOne

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import bgimg from "../../../src/assets/images/LadingPage/bgimgtwo.png";

const KeepEveryOne = () => {
  return (
    <div style={{ marginTop: "50px" }}>
      <section
        style={{
          background: `url(${bgimg}) no-repeat center center`,
          backgroundSize: "100% 100%", // Ensure full image stretch
          minHeight: "100vh", // Full viewport height
          width: "100vw", // Full width
          position: "relative",
          padding: "80px 0", // Top-bottom spacing
          overflow: "hidden",
        }}
      >
        <Container>
          <Row className="justify-content-center">
            <Col lg={6} md={8} className="mx-auto" style={{ width: "40%" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "700",
                  textAlign: "center",
                  color:"#fff"
                }}
              >
               Keep everyone in the loop
              </h1>
              <p
                style={{
                  fontSize: "1rem",
                  maxWidth: "500px",
                  margin: "10px auto",
                  textAlign: "center",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
               All good things starts with a homepage. Get inspired without breaking your wallet.
              </p>
              <div className="text-center">
                <Button
                  variant="primary"
                  size="lg"
                  style={{
                    marginRight: "1rem",
                   
                    backgroundColor:"#fff",
                    color:"#4F46E5",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Request a demo
                </Button>
              
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default KeepEveryOne;
