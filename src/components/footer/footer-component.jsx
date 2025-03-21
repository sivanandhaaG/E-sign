import "./footer.css";
import Logo from "../../assets/logo/logo.svg";
import { AiOutlineYoutube } from "react-icons/ai";
import { CiLinkedin } from "react-icons/ci";

const FooterComponent = () => {
  return (
    <div className="footer-container">
      <div className="footer-table">
        <div className="footer-table-column">
          <img src={Logo} />
          <div>
            <p>Koramangala, Bengaluru – 560095</p>
            <a href="tel:+91114117040">+(91)9192919191</a>
          </div> 
        </div>
        <div className="footer-table-column">
          <p>
            <b>Features</b>
          </p>
          <p>BharatSign </p>
          <p>BharatStamp</p>
          <p>Paperwork Operations</p>
          <p>Signer Verification</p>
        </div>
        <div className="footer-table-column">
          <p>
            <b>Features</b>
          </p>
          <p>Automatic Paperwork </p>
          <p>Fraud Prevention</p>
          <p>Paperwork Analytics</p>
          <p>Branding & Customisation</p>
        </div>
        <div className="footer-table-column">
          <p>
            <b>Resources</b>
          </p>
          <p>Knowledge Base </p>
          <p>Contact Us</p>
          <p>Careers</p>
          <p>FAQ</p>
        </div>
        <div className="footer-table-column">
          <p><b>Resources</b></p>
          <p>Feature Explainers</p>
          <p>Product Updates</p>
          <p>Privacy</p>
          <p>Terms & Conditions</p>
        </div>
      </div>
      <div className="footer-icons-wrapper">
        <div>
          <p>© copyright Zerozilla. All rights reserved.</p>
          <p>For support - support@Zerozilla.com</p>
          <p>For enquiries - enquiry@Zerozilla.com</p>
        </div>
        <span className="icons-warpper">
          <a>
            <CiLinkedin size={"20px"} />
          </a>
          <a>
            <AiOutlineYoutube size={"20px"} />
          </a>
        </span>
      </div>
    </div>
  );
};

export default FooterComponent;
