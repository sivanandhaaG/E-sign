import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import { Route, Routes } from "react-router-dom";
import "./components/commoncss/common.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FooterComponent from "./components/footer/footer-component";
//Data
import { TabIndexData } from "./components/dashboard/TabIndexData";

// Pages
import SignUpPage from "./pages/auth/signup";
import SignInPage from "./pages/auth/signin";
import LandingPage from "./pages/landing";
import RequiredActionPage from "./pages/dashboard/actioncenter/requireaction";
import TimeSensitivePage from "./pages/dashboard/actioncenter/timesensitive";
import FailedPage from "./pages/dashboard/actioncenter/failed";
import ESignPage from "./pages/esigndocs/esigndocspage";
import ReceiverEndPage from "./pages/esigndocs/receiverendpage";
import Test from "./pages/test";
import OTPVerificationPage from "./pages/auth/otpVerification";
import { useDispatch } from "react-redux";
import { setUser } from "./app/reducers/userSlice";
import ProfilePage from "./pages/profile";
import CorporateProfile from "./components/corporate-profile/CorporateProfile";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import SenderPage from "./pages/sender/sender";

// Other
import { isAuthenticated } from "./auth";
import EsignRequest from "./pages/esign-request";
import ForgotPassword from "./pages/forgot-password";
import ChangePassword from "./pages/forgot-password/change-password";
import Pricing from "./pages/pricing";
import Logout from "./pages/logout";
import ContactPage from "./pages/contact";
import AboutUS from "./pages/about";
import ZillaSignIntegrations from "./pages/zilla-Integrations";
import ZillasignCulture from "./components/culture/culture";
import EsignPage from "./components/esign/esign-page";
import Routers from "./index";
import Microfinance from "./components/microfinance/microfinance";
import Customisation from "./components/customisation";
import StockBrokersPage from "./components/stock-brokers";
import BlogPage from "./components/blog";
import Community from "./components/community/community";
import RealEstate from "./components/realestate/real-estate";
import Clm from "./components/Clm/clm";
import Insurance from "./components/insurance/insurance";
import DesignatedSign from "./pages/designated-sign/DesignatedSign";
import DashboardHeader from "./components/header/dashboardheader";
import Sidenavbar from "./components/sidenavbar/sidenavbar";
import Pdf from ".././src/components/common/pdf";
import Login from "./components/signinup/Login/Login";
import ForgetpasswordMail from "./components/signinup/ForgetpasswordMail";
import ResetPassword from "./pages/forgot-password/reset-password";
import MyFolders from "./components/myFolders/MyFolders";
import PricingDetails from "./pages/subscription/PricingDetails";
import { Toaster } from "react-hot-toast";
import RazorpayModal from "./components/common/RazorPay/RazorpayModal";
import RazorpayPage from "./components/common/RazorPay/Subscription";
function App() {
  const location = useLocation();
  const [hideHeader, setHideHeader] = useState(true);
  const [showFooter, setshowFooter] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const currentPath = location.pathname;

    // Main menu tab
    const matchingTab = TabIndexData.find((item) => item.url === currentPath);
    if (matchingTab) {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/signin") {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/login") {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/change-password") {
      setHideHeader(!hideHeader);
    }
    if(currentPath === "/forgot-password"){
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/forgetresetlink") {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/reset-password") {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/signup") {
      setHideHeader(!hideHeader);
    }

    if (currentPath === "/esigndocuments") {
      setHideHeader(!hideHeader);
    }

    if (currentPath === "/esignreceiver") {
      setHideHeader(!hideHeader);
    }
    if (currentPath === "/aboutus") {
      setshowFooter(!showFooter);
    }
    if (currentPath === "/integrations") {
      setshowFooter(!showFooter);
    }
    if (currentPath === "/culture") {
      setshowFooter(!showFooter);
    }
    if (currentPath === "/esign") {
      setshowFooter(!showFooter);
    }
    if (currentPath === "/pricing") {
      setshowFooter(!showFooter);
    }
    if (currentPath === "/blogs") {
      setshowFooter(!showFooter);
    }

    if (currentPath === "/community") {
      setshowFooter(!showFooter);
    }

    if (currentPath === "/") {
      setshowFooter(!showFooter);
    }
    // Sub menu tab
    const subMatchingTab = TabIndexData.flatMap(
      (item) => item.subtabindex
    ).find((subitem) => subitem.url === currentPath);
    if (subMatchingTab) {
      setHideHeader(!hideHeader);
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      let userData = JSON.parse(storedUser);
  
      if (!userData.paymentType) {
        userData.paymentType = "free"; 
      }
  
      dispatch(setUser(userData));
    }
  }, []);
  

  return (
    <>
      {/* {hideHeader && <Header />} */}
      {hideHeader && <DashboardHeader />}
      {/* <div className="d-flex"> */}
      {/* <div style={{ marginTop: "50px" }}>
          <Sidenavbar />
        </div> */}
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <LandingPage />
          }
        />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/forgetresetlink" element={<ForgetpasswordMail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUpPage />} />
        {/* <Route path="/myfolders" element={<MyFolders />} /> */}

        <Route path="/aboutus" element={<AboutUS />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/clm" element={<Clm />} />
        <Route path="/insurance" element={<Insurance />} />
        <Route
          path="/otp-verification"
          element={<OTPVerificationPage />}
        ></Route>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/corporate-profile" element={<CorporateProfile />} />
        <Route path="/esign" element={<EsignPage />} />
        <Route path="/culture" element={<ZillasignCulture />} />
        <Route path="/integrations" element={<ZillaSignIntegrations />} />
        <Route path="/esigndocuments" element={<ESignPage />} />
        <Route path="/esignreceiver" element={<ReceiverEndPage />} />
        <Route path="/microfinance" element={<Microfinance />} />
        <Route path="/stock-brokers" element={<StockBrokersPage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/community" element={<Community />} />
        <Route
          path="/actioncenter/requireaction"
          element={<RequiredActionPage />}
        ></Route>
        <Route
          path="/actioncenter/timesensitive"
          element={<TimeSensitivePage />}
        ></Route>
        <Route path="/actioncenter/failed" element={<FailedPage />} />
        <Route path="/folders" element={<Test />} />
        <Route path="/e-sign-request/:id" element={<EsignRequest />} />
        <Route
          path="/assign-desingated-sign"
          element={<DesignatedSign />}
        ></Route>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<ContactPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/customisation" element={<Customisation />} />
        <Route path="/subscription" element={<PricingDetails />} />

        {/* <Route
          path="/sender"
          element={
            <PrivateRoute>
              <SenderPage />
            </PrivateRoute>
          }
        ></Route> */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <Routers hideHeader={hideHeader} />
            </PrivateRoute>
          }
        ></Route>
        <Route path="/pdf" element={<Pdf />}></Route>
        <Route path="/subscribtion" element={<RazorpayPage/>}/>
      </Routes>
      {/* {showFooter && <FooterComponent />} */}
      <ToastContainer />
      {/* </div> */}
       <Toaster
                          toastOptions={{
                            duration: 4000,
                            closeButton: true,
                          }}
                        />
    </>
  );
}

export default App;
