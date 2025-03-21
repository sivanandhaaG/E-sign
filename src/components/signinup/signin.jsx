import { Container, Row, Col } from "react-bootstrap";
import CommonLoginScroller from "./commonlogin";
import backgroundImage from "../../assets/images/SignUp/bck.svg";

import SignInForm from "./SignInForm";

const SignIn = () => {
  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div style={{ width: "90%" }}>
            <CommonLoginScroller />
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex flex-column  align-item-start justify-content-center"
        >
          <Row className="signin-form py-4 px-4">
            <Col md={12}>
              <p className="signinup-common-title"> Sign in</p>
              <p>
                {" "}
                <span className="signinup-common-sub1">
                  {" "}
                  Dont have account ?{" "}
                </span>{" "}
                <span className="signinup-common-sub2">
                  {" "}
                  <a href="/signup">Sign up</a>{" "}
                </span>{" "}
              </p>

              <SignInForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default SignIn;
