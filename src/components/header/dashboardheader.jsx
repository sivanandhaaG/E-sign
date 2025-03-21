import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo/logo.svg";
import Avatar from "../../assets/images/general/Avatar.png";
import CancelImage from "../../assets/images/general/Cancel.png";
import "./header.css";
import {
  getUserProfileDetails,
  loginWithPassword,
} from "../../app/api/userApi";
import { FaBars } from "react-icons/fa";
import { RiCloseFill } from "react-icons/ri";
import { Link } from "react-router-dom";
// import MenuBar from "./menuBar";

// Import data
import { HeaderData } from "./headerData";
import { useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { Modal } from "react-bootstrap";

const DashboardHeader = ({ toggleSidebar }) => {
  // const userData = useSelector((state) => state.user);
  const location = useLocation();
  const [show, setShow] = useState(false);
  const [activePage, setActivePage] = useState(8); // Set the initial state to 8 (Sign in)
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    navigate("/logout");
    handleShow;
  };
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    profilePicture: "",
    role: "Corporate Administrator",
    country: "India",
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Get the path from the location object
    const currentPath = location.pathname;

    // Find the matching page from HeaderData based on the current path
    const matchingPage = HeaderData.find((item) => item.url === currentPath);

    // Update the activePage state with the matching page, or keep it as 8 (Sign in) if not found
    setActivePage(matchingPage ? matchingPage.id : 8);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      getUserProfileDetails()
        .then((response) => {
          console.log("User Profile Details from Nav bar:", response?.data);
          // Set state to the nested data object
          setProfileDetails(response?.data);
        })
        .catch((error) => {
          console.error("Failed to fetch user profile details:", error);
        });
    }
  }, [isLoggedIn]);

  return (
    <Navbar
      collapseOnSelect
      expand="xxxl"
      className="slate-blue-bg my-md-0 fixed-css"
      fixed="top"
    >
      <Container fluid  className="dashboard-header px-1 px-md-0">
        {isMobile && (
          <span className="mobile-menu-icon" onClick={toggleSidebar}>
            <FaBars
              size={24}
              style={{ cursor: "pointer", marginRight: "15px" }}
            />
          </span>
        )}
        <span className="my-style-css">
          <Navbar.Brand
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={Logo} alt="" />
          </Navbar.Brand>
        </span>
        {isLoggedIn ? (
          <Menu>
            <MenuButton>
              <img
                className="header-profile-width"
                style={{
                  height: "50px",
                  width: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
                src={profileDetails?.profilePicture || Avatar}
                alt="Profile"
              />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate("/settings")}>Profile</MenuItem>
              {/* <MenuItem onClick={() => navigate("/logout") }>Logout</MenuItem> */}
              <MenuItem onClick={handleShow}>Logout</MenuItem>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                centered
              >
                <Modal.Header className="LogoutModalHeader p-1">
                  <Modal.Title className="LogoutModalTitle">
                    <img src={CancelImage} alt="Image Not FOund" />
                  </Modal.Title>
                  <RiCloseFill
                    style={{ marginBottom: "10%", marginRight: "5px" }}
                    size={24}
                    onClick={handleClose}
                    className="CloseModal"
                  />
                </Modal.Header>
                <Modal.Body className="LogoutModalBody">
                  <h6>Are You Sure You want to logout?</h6>
                  <p>You will need to login again to access your account</p>
                </Modal.Body>
                <Modal.Footer className="LogoutModalFooter">
                  <Container id="ButtonContainer">
                    <Button
                      className="LogoutModalBtn"
                      variant="secondary"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                    <Link
                      className="LogoutModalBtn"
                      id="LogoutBtn"
                      to="/logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </Container>
                </Modal.Footer>
              </Modal>
            </MenuList>
          </Menu>
        ) : (
          <Button variant="primary" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default DashboardHeader;
