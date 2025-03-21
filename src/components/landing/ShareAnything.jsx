import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
// import { CheckCircle, PlayCircle } from "react-feather";
import CheckCircle from "../../../src/assets/svg/landingpage/tick.svg";
import PlayCircle from "../../../src/assets/svg/landingpage/player.svg";
import RightSideImage from "../../../src/assets/images/LadingPage/rightsideimg.jpg";

const ShareAnything = () => {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>
        <Row className="align-items-center">
          {/* Left Content */}
          <Col lg={6} md={6}>
            <Button
              size="sm"
              style={{
                borderRadius: "20px",
                fontWeight: "500",
                backgroundColor: "#4F46E5",
                fontSize: "12px",
                padding: "5px 10px",
              }}
            >
              PRODUCT DEMO
            </Button>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginTop: "10px",
              }}
            >
              Share Anything <br /> You’re Working On.
            </h1>
            <p style={{ fontSize: "1rem", color: "#64748B", margin: "20px 0" }}>
              Zerozilla has been instrumental in keeping designers aware of each
              others' work-in-progress in a way that was previously slowing us
              down. It's also one of the only channels where.
            </p>
            {/* Tick Icons Section */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {/* <CheckCircle size={20} color="#000" /> */}
                <img src={CheckCircle} alt="" />
                <span>Coded</span>
              </span>
              <span
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                {/* <CheckCircle size={20} color="#000" /> */}
                <img src={CheckCircle} alt="" />
                <span>100% Secure</span>
              </span>
            </div>
            {/* Play Button */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
              }}
            >
              {/* <PlayCircle size={30} color="#0000FF" /> */}
              <img src={PlayCircle} alt="" />
              <span
                style={{ fontSize: "1rem", fontWeight: "600", color: "#000" }}
              >
                See how it works
              </span>
            </div>
          </Col>

          {/* Right Side Image */}
          <Col lg={6} md={6} className="d-flex justify-content-end">
            <img
              src={RightSideImage}
              alt="Right Side"
              style={{ height: "400px", width: "550px" }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShareAnything;
