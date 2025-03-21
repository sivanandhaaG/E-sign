import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute/PrivateRoute";
import Dashboard from "./components/dashboard/index";
import ZillaSignIntegrations from "./pages/zilla-Integrations";
import ZillasignCulture from "./components/culture/culture";
import "./components/commoncss/common.css";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/landing";
import RequiredActionPage from "./pages/dashboard/actioncenter/requireaction";
import TimeSensitivePage from "./pages/dashboard/actioncenter/timesensitive";
import FailedPage from "./pages/dashboard/actioncenter/failed";
import ESignPage from "./pages/esigndocs/esigndocspage";
import ReceiverEndPage from "./pages/esigndocs/receiverendpage";
import Test from "./pages/test";
import OTPVerificationPage from "./pages/auth/otpVerification";
import ProfilePage from "./pages/profile";
import CorporateProfile from "./components/corporate-profile/CorporateProfile";

// Other
import { isAuthenticated } from "./auth";
import EsignRequest from "./pages/esign-request";
import ForgotPassword from "./pages/forgot-password";
import ChangePassword from "./pages/forgot-password/change-password";
import Pricing from "./pages/pricing";
import EsignPage from "./components/esign/esign-page";
import "./App.css";

import Pdf from "../src/components/common/pdf";
import Folder from "./components/folder/Folder";
import AntDesign from "./components/common/antDesignTable/AntTable";

const Router = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated() ? <Navigate to="/dashboard" /> : <LandingPage />
        }
      />
      <Route path="/esign" element={<EsignPage />} />
      <Route path="/integrations" element={<ZillaSignIntegrations />} />
      <Route path="/esigndocuments" element={<ESignPage />}></Route>
      <Route path="/esignreceiver" element={<ReceiverEndPage />}></Route>
      <Route path="/otp-verification" element={<OTPVerificationPage />}></Route>
      <Route path="/profile" element={<ProfilePage />}></Route>
      <Route path="/corporate-profile" element={<CorporateProfile />}></Route>
      <Route path="/esign" element={<EsignPage />} />
      <Route path="/culture" element={<ZillasignCulture />} />
      <Route
        path="/actioncenter/requireaction"
        element={<RequiredActionPage />}
      ></Route>
      <Route
        path="/actioncenter/timesensitive"
        element={<TimeSensitivePage />}
      ></Route>
      <Route path="/actioncenter/failed" element={<FailedPage />}></Route>
      <Route path="/folders" element={<Test />}></Route>
      <Route path="/e-sign-request/:id" element={<EsignRequest />}></Route>

      
      <Route path="/pricing" element={<Pricing />}></Route>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route to="/pdf" element={<Pdf />}></Route>
      <Route to="/folder" element={<Folder />} />
      <Route to="/antDesign" element={<AntDesign />}></Route>
    </Routes>
  );
};
export default Router;
