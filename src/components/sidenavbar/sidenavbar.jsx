import { useEffect, useState } from "react";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from "react-icons/md";
import ProfilePic from "../../assets/images/sidebar/Profile.jpg";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CancelImage from "../../assets/images/general/Cancel.png";
import { Container } from "react-bootstrap";
import { RiCloseFill } from "react-icons/ri";
import SettingIcon from "../../assets/Icons/Setting-Icon.png";
import SupportIcon from "../../assets/Icons/Support-Icon.png";
import CorporateIcon from "../../assets/Icons/Corporate_Icon.png";
import AccountingIcon from "../../assets/Icons/Accounting-Icon.png";
import DashboardIcon from "../../assets/Icons/Accounting-Icon.png";
import FolderIcon from "../../assets/Icons/Folder-Icon.png";
import MyDocumentIcon from "../../assets/Icons/MyDocument_Icon.png";
import UsersIcon from "../../assets/Icons/Users-Icon.png";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import {
  getAllCompanyUsers,
  getUserProfileDetails,
} from "../../app/api/userApi";
import Spinner from "react-bootstrap/Spinner";
import DetailsIcon from "../../assets/images/sidebar/DetailsIcon.png";
import Avatar from "../../assets/images/general/Avatar.png";
// import LogoutIcon from '../../assets/Icons/Logout-Icon.png'

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  // const [isSidebarOpen, setisSidebarOpen] = useState(false);
  const [isDocumentsOpen, setIsDocumentsOpen] = useState(true);
  const [show, setShow] = useState(false);

  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const companyID = JSON?.parse(localStorage?.getItem("user"))?.companyId;

  const user = localStorage.getItem("user");
  console.log(user, "usersidebar");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profileData = await getUserProfileDetails();
        console.log("User Profile Details Side bar:", profileData?.data);
        setProfilePic(profileData?.data?.profilePicture);
      } catch (error) {
        console.error("Error fetching user profile details:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const fetchCompanyUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllCompanyUsers(companyID, "");
      if (response?.status === 200) {
        setUserDetails(response?.data?.data);
        console.log(response.data.data[0]?.firstName, "fffsidebar");
        setLoading(false);
        // console.log(response.data.data[0]?.firstName, "fffsidebar");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (companyID) fetchCompanyUsers();
  }, []);

  if (loading)
    return (
      <Spinner animation="border" role="status" style={{ marginTop: "40px" }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) return <p>Error: {error}</p>;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const toggleSidebar = () => {
  //   setisSidebarOpen(!isSidebarOpen);
  // };

  const toggleDocumentsDropdown = () => {
    setIsDocumentsOpen(!isDocumentsOpen);
  };

  const isActive = (path) => location?.pathname === path;

  const tooltipDashboard = (
    <Tooltip id="tooltip-dashboard" className="tooltip">
      <strong>Dashboard</strong>
    </Tooltip>
  );
  const tooltipDetails = (
    <Tooltip id="tooltip-users" className="tooltip">
      <strong>Detail</strong>
    </Tooltip>
  );
  const tooltipFolder = (
    <Tooltip id="tooltip-users" className="tooltip">
      <strong>Folders</strong>
    </Tooltip>
  );
  const tooltipContactReceiver = (
    <Tooltip id="tooltip-users" className="tooltip">
      <strong>Contact Receiver</strong>
    </Tooltip>
  );
  const tooltipUser = (
    <Tooltip id="tooltip-users" className="tooltip">
      <strong>Users</strong>
    </Tooltip>
  );
  const tooltipDocument = (
    <Tooltip id="tooltip-mydocuments" className="tooltip">
      <strong>My Documents</strong>
    </Tooltip>
  );

  const tooltipSetting = (
    <Tooltip id="tooltip-settings" className="tooltip">
      <strong>Settings</strong>
    </Tooltip>
  );
  // const tooltipFolder = (
  //   <Tooltip id="tooltip-folders" className="tooltip">
  //     <strong>Folders</strong>
  //   </Tooltip>
  // );
  // const tooltipAccounting = (
  //   <Tooltip id="tooltip-accounting" className="tooltip">
  //     <strong>Accounting</strong>
  //   </Tooltip>
  // );
  // const tooltipSupport = (
  //   <Tooltip id="tooltip-support" className="tooltip">
  //     <strong>Support</strong>
  //   </Tooltip>
  // );
  // const tooltipCorporate = (
  //   <Tooltip id="tooltip-corporate" className="tooltip">
  //     <strong>Corporate</strong>
  //   </Tooltip>
  // );
  // const tooltipLogout = (
  //   <Tooltip id="tooltip-logout" className="tooltip">
  //     <strong>Logout</strong>
  //   </Tooltip>
  // );

  const firstName = userDetails?.[0]?.firstName;
  const email = userDetails?.[0]?.email;
  const lastName = userDetails?.[0]?.lastName;
  const LoginUserID = userDetails?.[0]?.userId;

  if (LoginUserID) {
    localStorage.setItem("LoginUserID", LoginUserID);
  }

  console.log("LoginUserID", LoginUserID);

  const Role = JSON.parse(localStorage?.getItem("user"))?.role;

  console.log("Role:", Role);

  return (
    <div
      className="SideBar"
      style={{
        width: isSidebarOpen ? "260px" : "70px",
        transition: "width 0.5s ease-out",
        height: "90.8vh",
        boxShadow: "rgba(0, 0, 0, 0.2) 2px 0px 5px ",
        zIndex: 10,
        padding: "7px",
        position: "fixed",
      }}
    >
      <div className="SidebarTop my-2">
        <div className="sidebarTopContent">
          <Link
            to="/dashboard"
            className="Link d-flex justify-content-between align-items-center"
            style={{
              backgroundColor: isActive("/dashboard")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/dashboard") ? "rgb(67,56,202)" : "",
            }}
          >
            <div className="d-flex gap-4 align-items-center">
              {!isSidebarOpen ? (
                <OverlayTrigger placement="right" overlay={tooltipDashboard}>
                  <img
                    src={DashboardIcon}
                    alt="Dashboard"
                    style={{ width: 24, height: 24 }}
                  />
                </OverlayTrigger>
              ) : (
                <img
                  src={DashboardIcon}
                  alt="Dashboard"
                  style={{ width: 24, height: 24 }}
                />
              )}
              {isSidebarOpen && "Dashboard"}
            </div>
          </Link>

          {/* Sidebar Menu Items */}
          {Role === "CORPORATE_ADMIN" && (
            <Link
              to="/users"
              className="Link d-flex align-items-center"
              style={{
                backgroundColor: isActive("/users")
                  ? "rgb(238,242,255)"
                  : "transparent",
                color: isActive("/users") ? "rgb(67,56,202)" : "",
              }}
            >
              {!isSidebarOpen && (
                <OverlayTrigger placement="right" overlay={tooltipUser}>
                  <img
                    src={UsersIcon}
                    alt="Users"
                    style={{ width: 24, height: 24 }}
                  />
                </OverlayTrigger>
              )}
              {isSidebarOpen && (
                <img
                  src={UsersIcon}
                  alt="Users"
                  style={{ width: 24, height: 24 }}
                />
              )}
              {isSidebarOpen && <span className="ms-2">Users</span>}
            </Link>
          )}

          {/* ========================================== */}
          {/* <Link
            to="/details"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/details")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/details") ? "rgb(67,56,202)" : "",
            }}
          >
            {!isSidebarOpen && (
              <OverlayTrigger placement="right" overlay={tooltipDetails}>
                <img
                  src={DetailsIcon}
                  alt="details"
                  style={{ width: 24, height: 24 }}
                />
              </OverlayTrigger>
            )}
            {isSidebarOpen && (
              <img
                src={DetailsIcon}
                alt="details"
                style={{ width: 24, height: 24 }}
              />
            )}
            {isSidebarOpen && <span className="ms-2">details</span>}
          </Link> */}
          {/* ================================================= */}
          <Link
            // to="/mydocuments"
            onClick={toggleDocumentsDropdown}
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/mydocuments")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/mydocuments") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipDocument}>
                <img
                  src={MyDocumentIcon}
                  alt="My Documents Icon"
                  style={{ marginLeft: "2px" }}
                />
              </OverlayTrigger>
            ) : (
              <img src={MyDocumentIcon} alt="My Documents Icon" />
            )}

            {isSidebarOpen && (
              <span style={{ marginLeft: "14px" }}>My Documents</span>
            )}
            {isSidebarOpen && (
              <FaChevronDown
                style={{
                  transform: isDocumentsOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  marginLeft: "20px",
                }}
              />
            )}
          </Link>

          {isSidebarOpen && isDocumentsOpen && (
            <div style={{ paddingTop: "5px" }}>
              <Link
                to="/documents"
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents") ? "rgb(67,56,202,1)" : "",
                }}
              >
                <span className="ms-2">All</span>
              </Link>
              <Link
                to="/documents/sent"
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents/sent")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents/sent") ? "rgb(67,56,202,1)" : "",
                }}
              >
                <span className="ms-2">Sent</span>
              </Link>
              <Link
                to="/documents/received"
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents/received")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents/received")
                    ? "rgb(67,56,202,1)"
                    : "",
                }}
              >
                <span className="ms-2">Received</span>
              </Link>
              <Link
                to="/documents/completed"
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents/completed")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents/completed")
                    ? "rgb(67,56,202,1)"
                    : "",
                }}
              >
                <span className="ms-2">Completed</span>
              </Link>
              <Link
                to="/documents/expired"
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents/expired")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents/expired")
                    ? "rgb(67,56,202,1)"
                    : "",
                }}
              >
                <span className="ms-2">Expired</span>
              </Link>
              <Link
                to="/documents/archieved "
                className="SubLink d-flex align-items-center mb-1"
                style={{
                  backgroundColor: isActive("/documents/archieved")
                    ? "rgb(238,242,255)"
                    : "transparent",
                  color: isActive("/documents/archieved ")
                    ? "rgb(67,56,202,1)"
                    : "",
                }}
              >
                <span className="ms-2">Archived</span>
              </Link>
            </div>
          )}

          <Link
            to="/myfolders"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/folder")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/myfolders") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipFolder}>
                <img src={FolderIcon} alt="Folders Icon" />
              </OverlayTrigger>
            ) : (
              <img src={FolderIcon} alt="Folders Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">My Folders</span>}
          </Link>
          {/* {Role === "ADMIN" && (
          <Link
            to="/contactreceiver"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/contactreceiver")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/contactreceiver") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ?  (
              <OverlayTrigger placement="right" overlay={tooltipContactReceiver}>
                <img src={CorporateIcon} alt="Corporate Icon" />
              </OverlayTrigger>
            ) : (
              <img src={CorporateIcon} alt="Corporate Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">Contacts List</span>}
          </Link>
          )} */}
        </div>
      </div>

      {/* Dashboard with Toggle Icon */}
      <div
        onClick={toggleSidebar}
        style={{
          marginLeft: !isSidebarOpen ? "0px" : "187px",
          marginBottom: "7px",
        }}
        className="ToggleSideBar"
      >
        {isSidebarOpen ? (
          <MdKeyboardDoubleArrowLeft
            size={24}
            style={{ color: "rgb(121,135,155)" }}
          />
        ) : (
          <MdKeyboardDoubleArrowRight
            size={24}
            style={{ color: "rgb(121,135,155)" }}
          />
        )}
      </div>

      {/* Sidebar Bottom Content */}
      <div className="SideBarBottom">
        <div className="SideBarBottomContent pb-2">
          {/* <Link
            to="/accounting"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/accounting")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/accounting") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipAccounting}>
                <img src={AccountingIcon} alt="Accounting Icon" />
              </OverlayTrigger>
            ) : (
              <img src={AccountingIcon} alt="Accounting Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">Accounting</span>}
          </Link> */}
          {/* <Link
            to="/corporate"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/corporate")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/corporate") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipCorporate}>
                <img src={CorporateIcon} alt="Corporate Icon" />
              </OverlayTrigger>
            ) : (
              <img src={CorporateIcon} alt="Corporate Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">Corporate</span>}
          </Link> */}
          {/* <Link
            to="/support"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/support")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/support") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipSupport}>
                <img src={SupportIcon} alt="Support Icon" />
              </OverlayTrigger>
            ) : (
              <img src={SupportIcon} alt="Support Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">Support</span>}
          </Link> */}

          <Link
            to="/settings"
            className="Link d-flex align-items-center"
            style={{
              backgroundColor: isActive("/settings")
                ? "rgb(238,242,255)"
                : "transparent",
              color: isActive("/settings") ? "rgb(67,56,202,1)" : "",
            }}
          >
            {!isSidebarOpen ? (
              <OverlayTrigger placement="right" overlay={tooltipSetting}>
                <img src={SettingIcon} alt="Settings Icon" />
              </OverlayTrigger>
            ) : (
              <img src={SettingIcon} alt="Settings Icon" />
            )}

            {isSidebarOpen && <span className="ms-2">Settings</span>}
          </Link>
        </div>
        <div
          className="SideBarLine"
          style={{ width: !isSidebarOpen ? "50px" : "" }}
        ></div>
        {/* Profile Section */}
        <div
          className="signoutFidget d-flex justify-content-between align-items-center"
          style={{ padding: "10px", cursor: "pointer", paddingTop: "20px" }}
        >
          <img
            src={profilePic || Avatar}
            alt="Profile"
            style={{
              width: "35px",
              height: "35px",
              borderRadius: "50%",
              display: isSidebarOpen ? "block" : "none",
            }}
          />
          {isSidebarOpen && (
            <div style={{ lineHeight: "5px" }}>
              <p>
                {firstName && lastName
                  ? `${firstName} ${lastName}`
                  : `${
                      JSON.parse(localStorage.getItem("user"))?.firstName || ""
                    } ${
                      JSON.parse(localStorage.getItem("user"))?.lastName || ""
                    }`}
              </p>
              <h6>
                {email || JSON.parse(localStorage.getItem("user"))?.email}
              </h6>
            </div>
          )}

          {/* Button trigger modal */}
          <button
            onClick={handleShow}
            style={{
              marginLeft: !isSidebarOpen ? "7px" : "",
              marginBottom: !isSidebarOpen ? "15px" : "",
            }}
          >
            <FiLogOut
              size={22}
              className="logoutIcon"
              style={{ color: "rgb(121,135,155)" }}
            />
          </button>

          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            position="center"
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
                  onClick={handleClose}
                >
                  Logout
                </Link>
              </Container>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
