import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import CommonLoginScroller from "../../components/signinup/commonlogin";
import { setUser } from "../../app/reducers/userSlice";
import { useMutation } from "react-query";
import { verifyOTP } from "../../app/api/userApi";
import { useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import backgroundImage from "../../assets/images/SignUp/bck.svg";


function OTPVerificationPage() {
  const [otp, setOTP] = useState("");

  const location = useLocation();
  const verificationToken = location.state?.verificationToken;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(verifyOTP, {
    onSuccess: (data) => {
      const userData = data.data;
      localStorage.setItem("user", JSON.stringify(userData));
      dispatch(setUser(userData));
      navigate("/settings", { replace: true });
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      otp,
      verificationToken,
    };
    mutate(payload);
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center"
      style={{ height: "90vh", marginTop: "70px" }}
    >
      <Row className="w-100">
        {/* Slider Component */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "auto",
          }}
        >
          <div style={{ width: "90%" }}>
            <CommonLoginScroller />
          </div>
        </Col>

        {/* ----- Form Start ---- */}
        <Col md={6} className="d-flex flex-column  justify-content-center px-4">
          <p className="signinup-common-title">OTP Verification</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>
                <span className="signup-label">OTP</span>
                <span className="signup-label-mandatory"> * </span>{" "}
              </Form.Label>

              <Form.Control
                type="text"
                placeholder="Enter your OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={isLoading}
              size="md"
              className="mx-0 my-4 py-2 btn-bg-indigo"
            >
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default OTPVerificationPage;
