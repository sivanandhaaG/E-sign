import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { registerIndividual } from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import "../../components/signinup/signup.css";
function IndividualSignUpForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    // password: '',
  });

  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(registerIndividual, {
    onSuccess: (data) => {
      navigate("/forgetresetlink");
      toast.success("Please check your email for the login link");
      // navigate('/otp-verification', {
      //   state: { verificationToken: data.data.verificationToken },
      // });
    },
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      localStorage.setItem("forgetemail", value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Name Fields Inline */}
      <Row>
        {/* First Name Field */}
        <Col>
          <Form.Group>
            <Form.Label>
              <span className="signup-label">
                {" "}
                First Name{" "}
              </span>
              <span className="signup-label-mandatory"> * </span>{" "}
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter First  Name *"
              className="signup-placeholder"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        {/* Middle Name Field */}
        <Col>
          <Form.Group>
            <Form.Label>
              <span className="signup-label"> Middle Name </span>
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Middle Name"
              className="signup-placeholder"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>

        {/* Last Name Field */}
        <Col>
          <Form.Group>
            <Form.Label>
              <span className="signup-label"> Last Name </span>
              <span className="signup-label-mandatory"> * </span>{" "}
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Last Name *"
              name="lastName"
              className="signup-placeholder"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Mobile Number and Email Inline */}
      <Row style={{ marginTop: "15px" }}>
        {/* Mobile Number Field */}
        <Col>
          <Form.Group>
            <Form.Label>
              <span className="signup-label">Mobile Number </span>
              <span className="signup-label-mandatory"> * </span>{" "}
            </Form.Label>

            <Form.Control
              type="text"
              placeholder="Enter Mobile Number"
              name="phoneNumber"
              className="signup-placeholder"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>

        {/* Email Field */}
        <Col>
          <Form.Group>
            <Form.Label>
              <span className="signup-label"> Email </span>
              <span className="signup-label-mandatory"> * </span>{" "}
            </Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              className="signup-placeholder"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

    

      <Button
        disabled={isLoading}
        type="submit"
        size="md"
        className="signup-button  btn-bg-indigo"
      >
        Create Account
      </Button>
    </Form>
  );
}

export default IndividualSignUpForm;
