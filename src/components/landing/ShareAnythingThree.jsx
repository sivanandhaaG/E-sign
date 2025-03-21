import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import PublishingOne from "../../../src/assets/svg/landingpage/publishingOne.svg";
import PublishingTwo from "../../../src/assets/svg/landingpage/publishingTwo.svg";
import PublishingThree from "../../../src/assets/svg/landingpage/publishingThree.svg";

const features = [
  {
    id: 1,
    icon: PublishingOne,
    title: "Publishing",
    description:
      "Plan, collaborate, and publish your content that drives meaningful engagement and growth for your brand.",
  },
  {
    id: 2,
    icon: PublishingTwo,
    title: "Publishing",
    description:
      "Plan, collaborate, and publish your content that drives meaningful engagement and growth for your brand.",
  },
  {
    id: 3,
    icon: PublishingThree,
    title: "Publishing",
    description:
      "Plan, collaborate, and publish your content that drives meaningful engagement and growth for your brand.",
  },
];

const ShareAnything = () => {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>
        <Row className="align-items-center">
          {/* Left Side */}
          <Col lg={6} md={12}>
            <Button
              variant="primary"
              size="sm"
              style={{
                borderRadius: "20px",
                fontWeight: "450",
                fontSize: "11px",
                background: "rgba(79, 70, 229, 1)",
                border: "none",
              }}
            >
              WHY CHOOSE E-SIGN
            </Button>
            <h1
              style={{
                fontSize: "2.5rem",
                fontWeight: "700",
                marginTop: "15px",
              }}
            >
              Share Anything <br /> You’re Working On.
            </h1>
            <p style={{ fontSize: "1rem", color: "rgba(0, 0, 0, 0.8)", margin: "20px 0" }}>
              Zerozilla has been instrumental in keeping designers aware of each
              others' work-in-progress in a way that was previously slowing us
              down. It's also one of the only channels where.
            </p>
            <Button
              variant="primary"
              size="lg"
              style={{ background: "rgba(79, 70, 229, 1)", border: "none",fontWeight:"500",fontSize:"14px" }}
            >
              Request a demo
            </Button>
          </Col>

          {/* Right Side: Features List */}
          <Col lg={6} md={12}>
            {features.map((feature, index) => (
              <div key={feature.id} className="d-flex align-items-start mb-4">
                <div>
                  <img
                    src={feature.icon}
                    alt="Feature Icon"
                    style={{
                      width: "60px",
                      height: "60px",
                      marginRight: "0.6rem",
                    }}
                  />
                </div>
                {/* Text Content */}
                <div style={{ flex: "1" }}>
                  <h5 style={{ fontWeight: "bold", marginBottom: "5px",fontSize:"16px" }}>
                    {feature.title}
                  </h5>
                  <p style={{ color: "rgba(0, 0, 0, 0.8)", marginBottom: "10px",fontSize:"14px" }}>
                    {feature.description}
                  </p>
                  {/* Divider Line (except last item) */}
                  {index !== features.length - 1 && (
                    <hr
                      style={{
                        border: "0.5px solid #E0E0E0",
                        margin: "15px 0",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ShareAnything;
