import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import RightSideImage1 from "../../../src/assets/images/LadingPage/RightSideImage1.png";
import RightSideImage2 from "../../../src/assets/images/LadingPage/RightSideImage2.png";
import RightSideImage3 from "../../../src/assets/images/LadingPage/RightSideImage3.png";
import RightSideImage4 from "../../../src/assets/images/LadingPage/RightSideImage4.png";
import { CheckCircle } from "react-bootstrap-icons";

const sections = [
  {
    id: 1,
    title: "Customizable Signature Templates",
    description:
      "Save time and ensure consistency with Customizable Signature Templates. Create, store, and reuse templates for frequently signed documents, streamlining your workflow and reducing manual effort.",
    features: [
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Contract Signing Made Easy",
      },
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Faster Approvals for Business Forms",
      },
    ],
    image: RightSideImage1,
  },
  {
    id: 2,
    title: "Enhanced Security (Security Key, Photo KYC, Location KYC)",
    description:
      "Protect your documents with Enhanced Security features like Security Key, Photo KYC, and Location KYC. Verify signers with multi-factor authentication, capture real-time photo verification, and track location-based approvals to prevent fraud and ensure compliance.",
    features: [
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Secure High-Value Transactions",
      },
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Compliance for Financial & Legal Documents",
      },
    ],
    image: RightSideImage2,
  },
  {
    id: 3,
    title: "Customizable Folders Space",
    description:
      "Organize your documents efficiently with Customizable Folders Space. Create, categorize, and manage files with personalized folder structures, ensuring smooth access, seamless collaboration, and enhanced security for your important documents.",
    features: [
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Effortless Document Management",
      },
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Team Collaboration & Access Control",
      },
    ],
    image: RightSideImage3,
  },
  {
    id: 4,
    title: "Automated Workflow Processing",
    description:
      "Speed up your business processes with Automated Workflow Processing. Define custom workflows, automate approvals, and streamline your document handling without manual intervention.",
    features: [
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Seamless Workflow Automation",
      },
      {
        icon: <CheckCircle size={20} color="white" />,
        text: "Reduce Human Errors",
      },
    ],
    image: RightSideImage4,
  },
];

const ShareAnythingBlue = () => {
  return (
    <section
      style={{ background: "#4F46E5", color: "white", padding: "80px 0" }}
    >
      <Container>
        <div className="text-center mb-5">
          <Button
            variant="light"
            size="sm"
            style={{
              borderRadius: "20px",
              fontWeight: "500",
              color: "#fff",
              backgroundColor: "#4F46E5",
              fontSize: "12px",
              padding: "5px 15px",
            }}
          >
            FEATURES
          </Button>
          <h1
            className="mt-3"
            style={{ fontSize: "2.5rem", fontWeight: "700" }}
          >
            Share Anything <br /> You’re Working On.
          </h1>
          <p
            style={{
              fontSize: "1rem",
              maxWidth: "700px",
              margin: "0 auto",
              fontWeight: "300",
              color: "rgba(255, 255, 255, 0.8)",
            }}
          >
            Zerozilla has been instrumental in keeping designers aware of each
            others' work-in-progress in a way that was previously slowing us
            down. It's also one of the only channels where.
          </p>
        </div>

        {sections.map((section) => (
          <Row key={section.id} className="align-items-center mb-5">
            {/* Left Content */}
            <Col lg={6} md={6}>
              <h2 style={{ fontWeight: "500", fontSize: "22px" }}>
                {section.title}
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "white",
                  fontWeight: "300",
                  fontSize: "14px",
                  color: "rgba(255, 255, 255, 0.8)",
                }}
              >
                {section.description}
              </p>
              {/* Features */}
              <div
                style={{
                  display: "flex",
                  gap: "15px",
                  flexWrap: "wrap",
                  marginBottom: "20px",
                }}
              >
                {section.features.map((feature, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      background: "rgba(255, 255, 255, 0.1)", // Light transparent box
                      padding: "15px 20px",
                      borderRadius: "10px",
                      flex: "1", // Ensures equal width
                      minWidth: "250px", // Prevents items from shrinking too much
                      textAlign: "left",
                    }}
                  >
                    {feature.icon}
                    <span style={{ color: "white", fontWeight: "450",fontSize:"14px" }}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Request a Demo Button */}
              <Button
                variant="light"
                size="lg"
                style={{
                  color: "#3F3DED",
                  fontWeight: "600",
                  fontSize: "15px",
                }}
              >
                Request a demo
              </Button>
            </Col>

            {/* Right Side Image (Always on the right) */}
            <Col lg={6} md={6} className="d-flex justify-content-end">
              <img
                src={section.image}
                alt="Feature Image"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "15px",
                }}
              />
            </Col>
          </Row>
        ))}
      </Container>
    </section>
  );
};

export default ShareAnythingBlue;
