import "./landing-new.css";
import { ButtonGroup, Checkbox, Input } from "@chakra-ui/react";
import Sponsor from "./sponsor";
import Description from "./description";
import KnowMore from "./know-more";
import Signfaildpoup from "../../pages/sender/signfaild/signfaildpoup";
import BreakFree from "./BreakFree";
import ShareAnything from "./ShareAnything";
import ShareAnythingBlue from "./ShareAnythingBlue";
import ShareAnythingThree from "./ShareAnythingThree";
import KeepEveryOne from "./KeepEveryOne";
import Footer from "./Footer";

const LandingComponent = () => {
  return (
    <div
      style={{
        overflow: "scroll",
      }}
    >
       <BreakFree />
       <ShareAnything />
       <ShareAnythingBlue />
       <ShareAnythingThree />
       <KeepEveryOne/>
       <Footer/>
      {/* <div className="banner-main">
        <div className="banner-text">
          <p className="heading">Everything you need to agree</p>
          <p className="banner-para-1">
            Easily send, sign, and manage all of your contracts in one place.
          </p>
          <div className="banner-para-2">
            <Checkbox /> &nbsp; I agree to receive marketing communications from
            ZillaEsign and acknowledge that I can opt out at any time by
            visiting the Preference Center.
            <a href="#"> Preference Center.</a>
          </div>
          <div className="banner-para-2">
            By clicking the Get Started button below, you agree to the{" "}
            <a href="#">Terms & Conditions</a> and <a href="">Privacy Policy</a>
            .<a href="#"> Preference Center.</a>
          </div>
          <div>
            <div className="banner-input-main"style={{color:"black"}}>
              <Input
                type="email"
                placeholder="Email"
                className="banner-input"
              />
              <ButtonGroup className="get-started">Get Started</ButtonGroup>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <iframe
            title="Zerozilla"
            height={"500"}
            width={"70%"}
            src="https://www.youtube.com/embed/AtQu5P6SFVk"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div> */}
     
      {/* <Sponsor />
      <Description />
      <KnowMore />
      <Signfaildpoup /> */}
    </div>
  );
};

export default LandingComponent;
