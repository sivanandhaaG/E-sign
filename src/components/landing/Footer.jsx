import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { GeoAlt, Envelope, Linkedin, Instagram, X, Pinterest } from "react-bootstrap-icons";
import ZillaLogo from "../../../src/assets/svg/landingpage/zillalogo.svg"; // Adjust path as needed

const Footer = () => {
  return (
    <footer style={{ background: "#fff", padding: "40px 0", borderTop: "1px solid #ddd" }}>
      <Container>
        <Row className="align-items-start">
          {/* Left Side - Logo & Address */}
          <Col lg={6} md={12}>
            <img src={ZillaLogo} alt="Zilla e-Sign Logo" style={{ height: "40px", marginBottom: "15px" }} />
            <div style={{fontSize:"14px",fontWeight:"450"}}>
              <p style={{ marginBottom: "10px" ,display:"flex",alignItems:"center"}}>
                <GeoAlt color="#3F3DED" size={16} style={{ marginRight: "5px" }} />
                Koramangala, Bengaluru – 560095
              </p>
              <p style={{ marginBottom: "10px" }}>
                Jayanagar, Bengaluru – 560041
              </p>
              <p style={{ marginBottom: "10px" }}>
                Al Qusais – Dubai – United Arab Emirates
              </p>
              <p style={{ marginBottom: "10px" }}>
                254 Chapman Rd, Suite 208 #18962, Newark, Delaware – 19702
              </p>
              <p style={{ marginBottom: "10px" }}>
                Edinburg Dr, Brampton, CA
              </p>
              <p style={{ marginBottom: "10px",display:"flex",alignItems:"center" }}>
                <Envelope color="#3F3DED" size={16} style={{ marginRight: "5px" }} />
                info@zerozilla.com
              </p>
            </div>
          </Col>

          {/* Right Side - Products */}
          <Col lg={6} md={12} className="text-lg-end text-md-start mt-md-4 mt-lg-0">
            <h6 style={{ fontWeight: "bold", color: "#3F3DED", marginBottom: "15px" }}>PRODUCTS</h6>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "10px" }}>Gatewise</li>
              <li style={{ marginBottom: "10px" }}>Zilla Valley</li>
              <li style={{ marginBottom: "10px" }}>Zilla Pilot</li>
              <li style={{ marginBottom: "10px" }}>Job Portal</li>
              <li style={{ marginBottom: "10px" }}>ClykOps</li>
            </ul>
          </Col>
        </Row>

        {/* Blue Divider Line */}
        <hr style={{ border: "1px solid #3F3DED", margin: "20px 0" }} />

        {/* Bottom Section - Copyright & Social Icons */}
        <Row style={{display:"flex",alignItems:"center"}}>
          <Col lg={6} md={12}>
            <p style={{ margin: 0, color: "rgba(0, 0, 0, 1)",fontSize:"12px" }}>Copyright © 2025, Zerozilla Infotech Pvt Ltd</p>
          </Col>
          <Col lg={6} md={12} className="text-lg-end text-md-start mt-md-3 mt-lg-0" style={{display:"flex",justifyContent:"flex-end"}}>
            <Linkedin color="#3F3DED" size={20} style={{ marginRight: "10px", cursor: "pointer" }} />
            <Instagram color="#3F3DED" size={20} style={{ marginRight: "10px", cursor: "pointer" }} />
            <X color="#3F3DED" size={20} style={{ marginRight: "10px", cursor: "pointer" }} />
            <Pinterest color="#3F3DED" size={20} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;