import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Card,
  Col,
  Row,
  InputGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { inAppChangePassword } from "../app/api/userApi"; // adjust the import path as needed
import toast, { Toaster } from "react-hot-toast";
// Assume you get the userId from props, context, or redux store.
import { useSelector } from "react-redux";
import { inAppChangePassword } from "../../../app/api/userApi";
import { use } from "react";

const ProfileTabPassword = () => {
  const userData = useSelector((state) => state.user); 
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userId, setUserId] = useState(null);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"))
  console.log("userid",user.userId)
  setUserId(user.userId)
}, [])

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const toggleShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
      userId: userId, 
    };

    try {
      const response = await inAppChangePassword(payload);
      if (response.status) {
        toast.success("Password updated successfully.");
        // Optionally, reset the form
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.message || "Failed to update password.");
      }
    } catch (error) {
      console.error("Password update error:", error);
      toast.error("An error occurred while updating the password.");
    }
  };

  return (
    <div style={{ margin: "40px" }}>
      <Container className="mt-4">
        <Row>
          <Col sm={4}>
            <h5>Password</h5>
            <p style={{ color: "#667085" }}>
              Please enter your current password to change your password.
            </p>
          </Col>
          <Col sm={8}>
            <Card className="mb-4">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  {/* Current Password Section */}
                  <Form.Group controlId="formCurrentPassword" className="mb-3">
                    <Form.Label>Current password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="********"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                      />
                      <InputGroup.Text onClick={toggleShowCurrentPassword}>
                        <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash } />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* New Password Section */}
                  <Form.Group controlId="formNewPassword" className="mb-3">
                    <Form.Label>New password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showNewPassword ? "text" : "password"}
                        placeholder="********"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                      <InputGroup.Text onClick={toggleShowNewPassword}>
                        <FontAwesomeIcon icon={showNewPassword ?faEye : faEyeSlash} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  {/* Confirm New Password Section */}
                  <Form.Group controlId="formConfirmPassword" className="mb-3">
                    <Form.Label>Confirm new password</Form.Label>
                    <InputGroup>
                      <Form.Control
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="********"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      <InputGroup.Text onClick={toggleShowConfirmPassword}>
                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>

                  <Form.Text className="text-muted mb-3">
                    Your new password must be more than 8 characters.
                  </Form.Text>

                  <hr />
                  <Button
                    style={{
                      backgroundColor: "#fff",
                      color: "#000",
                      borderColor: "#000",
                    }}
                    className="me-2"
                    type="button"
                    onClick={() =>
                      setFormData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      })
                    }
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Update password</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileTabPassword;
