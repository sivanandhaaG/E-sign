import { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import ProfilePage from "../profile";
import CorporateProfile from "../../components/corporate-profile/CorporateProfile";
import "./settings.css";
import ProfileTabPassword from "./users/UsersEditProfile";
import PlansSection from "../PlansSection/index";
// import ProfileTabPassword from "./users/ProfileTabPassword";

function SettingsPage() {
  const [userRole, setUserRole] = useState("");

  // Get user role from localStorage on component mount
  useEffect(() => {
    const role = localStorage.getItem("role"); // Ensure the role is stored in localStorage with the key 'role'
    setUserRole(role);
  }, []);

  const Role = JSON.parse(localStorage?.getItem("user"))?.role;

  return (
    <Container fluid className="slate-blue-bg py-2">
      <Container className="mt-5">
        <Row>
          <Col lg={12} className="px-0">
            <div className="settings-header">
              <p className="page-title">Settings</p>
              <p>
                {/* <span className="heading-welcome">Welcome to</span> Zerozilla
                Infotech Pvt. Ltd. */}
              </p>
            </div>
            {/* Custom Styled Tabs - No Extra Space Between Tabs */}
            <Tabs
              id="controlled-tab-example"
              className="custom-tabs mb-3"
              defaultActiveKey="profile"
            >
              <Tab eventKey="profile" title="My Profile">
                <ProfilePage />
              </Tab>
              {/* Conditionally render Corporate Profile tab based on role */}
              {Role === "CORPORATE_ADMIN" && (
                <Tab eventKey="corporate-profile" title="Corporate Profile">
                  <CorporateProfile />
                </Tab>
              )}
              <Tab eventKey="password" title="Password">
                <ProfileTabPassword />
              </Tab>
              <Tab eventKey="plans" title="Plans and Billings">
                <PlansSection />
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default SettingsPage;
