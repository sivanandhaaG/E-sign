import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CommonLoginScroller from "./commonlogin";

import Form from "react-bootstrap/Form";
import CorporateSignUpForm from "./CorporateSignUpForm";
import IndividualSignUpForm from "./IndividualSignUpForm";
import backgroundImage from "../../assets/images/SignUp/bck.svg";


function Register() {
  const [userType, setUserType] = useState("Individual");

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage:  `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          {/* Slider Component */}
          <div style={{ width: "90%" }}>
            <CommonLoginScroller />
          </div>
        </Col>

        {/* ----- Form Start ---- */}
        <Col
          md={6}
          className="signUpRight d-flex flex-column align-items-start justify-content-center"
        >
          <Row className="Row px-4">
            <p className="signinup-common-title"> Sign up</p>
            <p>
              <span className="signinup-common-sub1">
                {" "}
                Have an account already ?{" "}
              </span>
              <span className="signinup-common-sub2">
                <a href="/login">Sign in</a>
              </span>
            </p>

            <Form.Group controlId="userType">
              <div key={`inline-radio`} className="mb-3">
                <Form.Check
                  style={{ paddingLeft: "2.5em" }}
                  inline
                  label="Individuals"
                  type="radio"
                  id="inline-radio-individual"
                  className="radio-border"
                  name="userType"
                  value="Individual"
                  checked={userType === "Individual"}
                  onChange={() => setUserType("Individual")}
                />
                <Form.Check
                  style={{ paddingLeft: "2.5em" }}
                  inline
                  label="Corporate"
                  type="radio"
                  id="inline-radio-corporate"
                  className="radio-border"
                  name="userType"
                  value="Corporate"
                  checked={userType === "Corporate"}
                  onChange={() => setUserType("Corporate")}
                />
              </div>
            </Form.Group>

            {userType === "Individual" ? (
              <IndividualSignUpForm />
            ) : (
              <CorporateSignUpForm />
            )}
          </Row>
        </Col>
        {/* ----- Form End ---- */}
      </Row>
    </Container>
  );
}

export default Register;
