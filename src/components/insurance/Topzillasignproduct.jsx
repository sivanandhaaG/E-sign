import { Button } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";

const Topzillasignproduct = () => {
  return (
    <div className="docusign-realtors">
      <h1 className="static-page-main-heading">
        Top Docusign products for insurance
      </h1>
      <div className="grid-warper">
        <div>
          <p className="static-subheading">Identify</p>
          <p className="static-para">
            Protect access to agreements with enhanced methods for
            authentication and verification.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> Learn More</span>
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
        <div>
          <p className="static-subheading">Identify</p>
          <p className="static-para">
            Protect access to agreements with enhanced methods for
            authentication and verification.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> Learn More</span>
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
        <div>
          <p className="static-subheading">Notary</p>
          <p className="static-para">
            Notarize documents remotely and electronically via a secure
            audio-visual session.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> Learn More</span>
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="border-top w-100 features-main-marging">
        <Button variant="link" className="know-more-link">
          <span className="d-flex align-items-center">
            <span>View All Products</span>
            <IoIosArrowForward />
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Topzillasignproduct;
