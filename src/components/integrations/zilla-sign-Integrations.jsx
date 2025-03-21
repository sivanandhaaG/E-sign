import ZillasignIntegrationTop from "./zilla-sign-integration-top";
import "./integration.css";
import { Button } from "react-bootstrap";
import star from "../../assets/images/general/star.svg";
import { IoIosArrowForward } from "react-icons/io";
import { Card } from "@chakra-ui/react";

const ZillaSignIntegrations = () => {
  return (
    <div>
      <div className="zila-sign-int-container">
        <ZillasignIntegrationTop />
      </div>
      <div className="get-more-heading-warper">
        <h1 className="static-page-main-heading text-center">
          Get more business done with a Docusign + partner solution
        </h1>
        <p className="static-para m-0 text-center">
          It’s easier than ever to use Docusign without ever leaving your
          favorite CRM and business productivity solutions.
        </p>
      </div>
      <div>
        <div className="cards-wrapper">
          {[1, 2, 3, 4, 5, 6,7,8].map((items, index) => {
            return (
              <Card
                key={index}
                className="zila-sign-int-patners"
                shadow={"none"}
              >
                <img
                  style={{
                    height: "auto",
                    maxWidth: "fit-content",
                    objectFit: "contain",
                  }}
                  src="//images.ctfassets.net/0jnmtsdzg6p5/1HDbRKuXG5kfxI43hKk6Zm/4439880023f35f3e2df261d817e1255c/google-logo-withbackground.png"
                />
                <h1 className="static-subheading">
                  Docusign for Microsoft
                </h1>
                <p className="static-para">
                  Use the Docusign eSignature app for iOS or other leading iOS
                  apps that embed Docusign in their workflows.
                </p>
                <Button
                  variant="link"
                  className="zila-sign-int-patners-learn-more"
                >
                  <span className="d-flex align-items-center">
                    <span> Learn More</span> <IoIosArrowForward />
                  </span>
                </Button>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="slautions-showcase">
        <h1 className="static-page-main-heading mb-2">Explore other powerful Docusign + partner solutions</h1>
        <Button className="action-aboutus" type="button" variant="primary">
          Slautions ShowCase{" "}
        </Button>{" "}
      </div>

      <div className="d-flex justify-content-center align-items-center flex-column my-5 ">
        <h3 className="static-subheading">How helpful was this page content?</h3>
        <div>
          <Button variant="text">
            <img src={star} />
          </Button>
          <Button variant="text">
            <img src={star} />
          </Button>
          <Button variant="text">
            <img src={star} />
          </Button>
          <Button variant="text">
            <img src={star} />
          </Button>
          <Button variant="text">
            <img src={star} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ZillaSignIntegrations;
