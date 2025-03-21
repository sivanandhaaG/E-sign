import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import CommonLoginScroller from "../../components/signinup/commonlogin";
import SignInForm from "../../components/signinup/SignInForm";
import ForgotPasswordForm from "../../components/signinup/ForgotPasswordForm";
import backgroundImage from "../../assets/images/SignUp/bck.svg";


const ForgotPassword = () => {
  return (
    <Container
      fluid
      className="vh-100 d-flex align-items-center"
    >
      <Row className="w-100">
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage:  `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "auto",
          }}
        >
          <div style={{ width: "90%" }}>
            <CommonLoginScroller />
          </div>
        </Col>
        <Col md={6} className="d-flex flex-column justify-content-center px-4">
          <Row className="py-md-0 py-4">
            <Col md={12}>
              <p className="signinup-common-title"> Forgot Password</p>
              <p>
                {" "}
                <span className="signinup-common-sub1">
                  {" "}
                  Enter your Email
                </span>{" "}
              </p>

              <ForgotPasswordForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
