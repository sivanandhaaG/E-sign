import { useState, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import DashboardHeader from "./components/header/dashboardheader";
import Sidenavbar from "./components/sidenavbar/sidenavbar";
import Loader from "./components/common/Loader/Loader";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import PersonalProfile from "./pages/personalprofile";
import DashboardPage from "./pages/dashboard/dashboard";
import SettingsPage from "./pages/settings/settings";
import SentPage from "./pages/dashboard/documents/sent";
import ReceivedPage from "./pages/dashboard/documents/received";
import Completed from "./pages/dashboard/documents/completed";
import Expired from "./pages/dashboard/documents/expired";
import Archieved from "./pages/dashboard/documents/archieved";
import DetailsPage from "./pages/details/Details";
import UserListPage from "./pages/settings/users/user-list-page";
import ContactPage from "./pages/contact";
import Logout from "./pages/logout";
import Kyc from "./components/kyc/kyc";
import SenderPage from "./pages/sender/sender";
import AllDocumentsPage from "./components/dashboard/allDocuments";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./components/commoncss/common.css";
import "react-toastify/dist/ReactToastify.css";
import Folder from "./components/folder/Folder";
import MyFolders from "./components/myFolders/MyFolders";
import FolderDetails from "./components/myFolders/FolderDetails";
import UserSignature from "./components/pdf-viewer/components/general-components/UserSignature";
import ContactReceiver from "./components/pdf-viewer/components/contactReceiver/ContactReceiver";
import AntDesign from "./components/common/antDesignTable/AntTable";

const Routers = ({ hideHeader }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    setShowContent(false);
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [location]);

  // Ensure sidebar opens and closes correctly
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when navigating to a new page (only for mobile)
  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname, isMobile]); // Fixed dependency to avoid issues

  // Update sidebar state when resizing window
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile); // Sidebar stays open if not mobile
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="IndexPage">
      <div className="main-commen-container">
        {!hideHeader?.hideHeader && (
          <DashboardHeader toggleSidebar={toggleSidebar} />
        )}

        <div className="d-flex">
          {/* Sidebar should toggle correctly */}
          {(!isMobile || isSidebarOpen) && (
            <div
              className={`sidebar-container ${
                isSidebarOpen ? "expanded" : "collapsed"
              }`}
            >
              <Sidenavbar
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
              />
            </div>
          )}

          <div className="routers-container">
            {loading && <Loader />}
            {showContent && (
              <Routes>
                <Route
                  path="/users"
                  element={
                    <PrivateRoute>
                      <UserListPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/folder"
                  element={
                    <PrivateRoute>
                      <Folder />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <PrivateRoute>
                      <SettingsPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/kyc"
                  element={
                    <PrivateRoute>
                      <Kyc />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/personalsettings"
                  element={
                    <PrivateRoute>
                      <PersonalProfile />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <DashboardPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/documents/sent"
                  element={
                    <PrivateRoute>
                      <SentPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/details/:id"
                  element={
                    <PrivateRoute>
                      <DetailsPage />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/myfolders"
                  element={
                    <PrivateRoute>
                      <MyFolders />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/usersignature"
                  element={
                    <PrivateRoute>
                      <UserSignature />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/contactreceiver"
                  element={
                    <PrivateRoute>
                      <ContactReceiver />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/folderdetails"
                  element={
                    <PrivateRoute>
                      <FolderDetails />
                    </PrivateRoute>
                  }
                ></Route>

                <Route
                  path="/documents/received"
                  element={
                    <PrivateRoute>
                      <ReceivedPage />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/documents/completed"
                  element={
                    <PrivateRoute>
                      <Completed />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/documents/expired"
                  element={
                    <PrivateRoute>
                      <Expired />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/documents/archieved"
                  element={
                    <PrivateRoute>
                      <Archieved />
                    </PrivateRoute>
                  }
                />
                <Route path="/contactus" element={<ContactPage />} />
                <Route
                  path="/documents"
                  element={
                    <PrivateRoute>
                      <AllDocumentsPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/logout" element={<Logout />} />
                <Route
                  path="/sender"
                  element={
                    <PrivateRoute>
                      <SenderPage />
                    </PrivateRoute>
                  }
                />
                <Route path="/antdesign" element={<AntDesign />}></Route>
                
              </Routes>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Routers;
