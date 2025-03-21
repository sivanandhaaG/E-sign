import { Button, Card } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";

const Esingintegrations = () => {
  return (
    <div className="">
      <div className="get-more-heading-warper">
        <h1 className="static-page-main-heading">
          Docusign integrations and APIs for real estate
        </h1>
        <p className="static-para">
          Easily connect your CRM, accounting, and real estate apps to Docusign
          eSignature and Docusign Rooms for Real Estate to avoid re-keying data,
          reduce errors, and speed up deals.
        </p>
      </div>
      <div className="cards-wrapper-esing">
        <Card className="zila-sign-int-patners-2" shadow={"none"}>
          <img
            style={{
              height: "auto",
              maxWidth: "fit-content",
              objectFit: "contain",
            }}
            src="//images.ctfassets.net/0jnmtsdzg6p5/72gux3enDd6vTMKu9ZwDFl/238c83ab348dfe0aae25c605c62b27cc/Integration_BrokerageEngine.svg"
          />
          <h1 className="static-subheading">Brokerage Engine</h1>
          <p className="static-para">
            Push transaction data from Docusign to this back-office solution to
            pay commissions faster.
          </p>
          <Button variant="link" className="zila-sign-int-patners-learn-more">
            <span className="d-flex align-items-center">
              <span>Watch Demo</span> <IoIosArrowForward />
            </span>
          </Button>
        </Card>
        <Card className="zila-sign-int-patners-2" shadow={"none"}>
          <img
            style={{
              height: "auto",
              maxWidth: "fit-content",
              objectFit: "contain",
            }}
            src="//images.ctfassets.net/0jnmtsdzg6p5/3U0JPUCeWbBKVhEmRF3vuH/5a9d8069334cddec2a55167fa097de00/Integration_Inside_Real_Estate.svg"
          />
          <h1 className="static-subheading">InsideRE</h1>
          <p className="static-para">
            Ensure the automatic updating of transaction data between Docusign
            Rooms for Real Estate and kvCORE.
          </p>
          <Button variant="link" className="zila-sign-int-patners-learn-more">
            <span className="d-flex align-items-center">
              <span>Explore Partnership</span> <IoIosArrowForward />
            </span>
          </Button>
        </Card>
        <Card className="zila-sign-int-patners-2" shadow={"none"}>
          <img
            style={{
              height: "auto",
              maxWidth: "fit-content",
              objectFit: "contain",
            }}
            src="//images.ctfassets.net/0jnmtsdzg6p5/24DgLw7a8d3laUGLxf8vIU/fd8f543e7a424ba900bbd3e1e5930efc/Integration_Inside_Real_Estate-1.svg"
          />
          <h1 className="static-subheading">MoxiWorks</h1>
          <p className="static-para">
            Automatically pull data from MoxiEngage CRM into Rooms for Real
            Estate.
          </p>
          <Button variant="link" className="zila-sign-int-patners-learn-more">
            <span className="d-flex align-items-center">
              <span>View Details</span> <IoIosArrowForward />
            </span>
          </Button>
        </Card>
      </div>
      <div className="features-main-div-3-info-2">
        <div className="">
          <h1 className="static-page-main-heading d-flex justify-content-start">
            Recommended for you
          </h1>
          <p className="static-para">
            Helpful articles for real estate professionals who want to become
            more efficient
          </p>
          <div className="d-flex colum gap-4">
            <div className="info-2-main-div p-4 rounded-2">
              <div className="">
                <p className="static-para-white">Blog Post</p>
                <h1 className="static-subheading-white mb-1">
                  New Features for Real Estate Professionals in Docusign
                  eSignature
                </h1>
                <p className="static-para-white">
                  Discover how digital tools can help you increase client
                  satisfaction and improve your productivity.
                </p>
                <img
                  className="image-full-width"
                  alt="ctfassets"
                  src="https://images.ctfassets.net/0jnmtsdzg6p5/48cG4WSNu2pY7BuHeLwEmn/52540e3f1ee935a0042e7fe767236789/resource-family-meeting-with-realtor.png?fm=webp&q=50"
                />
              </div>
            </div>
            <div className="info-2-main-div p-4 rounded-2">
              <div className="">
                <p className="static-para-white">Blog Post</p>
                <h1 className="static-subheading-white mb-1">
                  Benefits of Electronic Signature for Real Estate Agents{" "}
                </h1>
                <p className="static-para-white">
                  Discover how digital tools can help you increase client
                  satisfaction and improve your productivity.
                </p>
                <img
                  className="image-full-width"
                  alt="ctfassets"
                  src="https://images.ctfassets.net/0jnmtsdzg6p5/HPxLd2bqrJMz9u7ditItw/a16ebdde76cfd00fb831a57ff2235b36/resource-signing-on-tablet.png?fm=webp&q=50"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Esingintegrations;
