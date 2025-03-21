import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CommonLoginScroller from "./commonlogin";
import { useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { resendforgotPassword } from "../../app/api/userApi";
import { useMutation } from "react-query";
import backgroundImage from "../../assets/images/SignUp/bck.svg";
import toast,{Toaster} from "react-hot-toast";

const ForgetpasswordMail = () => {
  const location = useLocation();
  const { resetToken } = location.state || {};
  const email = localStorage.getItem("forgetemail");

  const [formData, setFormData] = useState({
    reset_token: resetToken,
  });
  const { mutate, isLoading } = useMutation(resendforgotPassword, {
    onSuccess: (data) => {
      toast.success("Please check your email for the reset link");
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handleresend = (e) => {
    e.preventDefault();
    mutate(formData);
  };
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
        <Col md={6} className="d-flex flex-column  justify-content-center px-4">
          <Row>
            <Col md={12}>
              <p className="signinup-common-title">
                {" "}
                Link Sent, Check Your Inbox!
              </p>
              <p>
                <span className="signinup-common-sub1" >
                  We've sent an email to <strong>{email}</strong> with a link to
                  reset your password. If you don't see it, check your spam
                  folder and confirm you have an account linked to that email.
                </span>
              </p>
            </Col>
            <Col md={12} className="mt-2 d-flex align-items-center gap-4" space="2" >
              {/* <Button
                size="md"
                onClick={handleresend}
                className="mx-0 my-1 btn-bg-indigo"
              >
                {" "}
                Resend{" "}
              </Button> */}
              <Row>
              <a href="/signin" className="forgot-password-link">Return to login page</a>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgetpasswordMail;
