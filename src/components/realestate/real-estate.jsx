import { Button } from "react-bootstrap";

import "./real-estate.css";
import { Card } from "@chakra-ui/react";
import { IoIosArrowForward } from "react-icons/io";
import { FiCheck } from "react-icons/fi";
import Esingintegrations from "./esingintegrations";
import Contactdetails from "../../components/about/contact-details";

const RealEstate = () => {
  return (
    <div>
      <div className="description-aboutus-main">
        <Card className="col-sm d-flex justify-content-center" shadow={"none"}>
          <div className="description-aboutus-content">
            <div>
              <p className="static-subheading m-1">Docusign for Real Estate</p>
              <p className="static-page-main-heading">
                Manage your real estate transactions all in one place
              </p>
              <p className="static-para light-font">
                With eSignature and transaction management solutions, you can
                accelerate deals, minimize compliance risks, and grow your
                business—all while improving agent and client satisfaction.
              </p>
              <div className="aboutus-action-warpper">
                <Button
                  className="action-aboutus"
                  type="button"
                  variant="primary"
                >
                  Start for Free
                </Button>

                <Button
                  variant="outline-primary"
                  className="action-aboutus-outlined"
                >
                  Watch Video Overview{" "}
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-sm description-about-content" shadow={"none"}>
          <img
            src="https://images.ctfassets.net/0jnmtsdzg6p5/57ylDmIiGKg6kvqeax1ikY/bebf928d847e95aad9850ed1432faed7/lifestyle-ui-agent-open-house.png?fm=webp&q=100"
            alt="description"
            className="rounded"
            style={{
              height: "auto",
            }}
          />
        </Card>
      </div>
      <div>
        <div className="docusign-realtors">
          <Card className="docusign-realtors-wraper">
            <div className="docusign-realtors-text">
              <h1 className="static-page-main-heading">
                The National Association of REALTORS®’s official and exclusive
                provider of electronic signature services under REALTOR
                Benefits®
              </h1>
              <p className="static-para">
                Docusign for REALTORS® is a member-exclusive plan with access to
                real estate forms and transactions workspace.
              </p>
            </div>
            <div className="docusign-realtors-img">
              <img src="//images.ctfassets.net/0jnmtsdzg6p5/5UZcpCsJ3mNgtwezv6Jumu/beeea603b3fe29478d01eb4d62e76db5/realtor_benefits.png" />
            </div>
          </Card>
        </div>
      </div>
      <div>
        <div className="docusign-realtors">
          <h1 className="static-page-main-heading m-1">
            By simplifying the transaction process, you can save much more than
            paper.
          </h1>
          <div className="grid-warper">
            <div>
              <h3 className="static-page-main-heading">Accelerate deals</h3>
              <p className="static-para">
                Close deals faster by signing and managing documents for each
                transaction in a single workspace — whether you're at home or on
                the go.
              </p>
            </div>
            <div>
              <h3 className="static-page-main-heading">Support compliance</h3>
              <p className="static-para">
                Reduce errors with access to the latest state and local
                association forms with autofill capabilities so you only have to
                enter data once.
              </p>
            </div>
            <div>
              <h3 className="static-page-main-heading">Grow your business</h3>
              <p className="static-para">
                Spend less time on paperwork and more time on client outreach to
                grow your business instead.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="how-to-use-esing">
        <img src="https://images.ctfassets.net/0jnmtsdzg6p5/5xBiOqJpqjxW93QutzKEcl/ac01f49c49e91fbec9fca0674dd80d17/Real_Estate_First_Large_Callout_.png?fm=webp&q=50" />
        <div>
          <h1 className="static-page-main-heading">
            How to use Docusign for real estate
          </h1>
          <p className="static-para">
            Real estate agents and brokers use Docusign throughout the
            transaction lifecycle.
          </p>
          <ul>
            <li>
              <p className="static-para">Listing agreements </p>
            </li>
            <li>
              <p className="static-para">
                Rental, lease and housing agreements{" "}
              </p>
            </li>
            <li>
              <p className="static-para">Agent onboarding and licensing </p>
            </li>
            <li>
              <p className="static-para">Buyer/seller agreements </p>
            </li>
            <li>
              <p className="static-para">Listing agreements </p>
            </li>
            <li>
              <p className="static-para">Purchase and sale agreements </p>
            </li>
            <li>
              <p className="static-para">Closing disclosures </p>
            </li>
            <li>
              <p className="static-para">Amendments </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="features-main-marging d-flex justify-content-center">
        <Card className="view-all-solution-card">
          <div className="p-1">
            <p className="static-page-main-heading">
              Manage transactions on the go with our top-rated mobile app
            </p>
            <div>
              <Button
                variant="outline-primary"
                className="action-aboutus-outlined"
              >
                View All Solutions
              </Button>
            </div>
          </div>
        </Card>
      </div>
      <div className="features-main-div-3">
        <h1 className="static-page-main-heading d-flex justify-content-center mb-4">
          How Globl RED modernized its transaction process
        </h1>
        <iframe
          title="Zerozilla"
          height={"600"}
          width={"100%"}
          src="https://www.youtube.com/embed/AtQu5P6SFVk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
        />
        <div>
          <Button className="action-aboutus" type="button" variant="primary">
            Try for Free
          </Button>
          <Button className="action-aboutus-outlined" variant="outline-primary">
            View Plans and Pricing
          </Button>
        </div>
      </div>
      <div className="features-main-div-2">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Docusign eSignature for Real Estate
          </h1>
          <p className="static-para">
            Agents can simplify the way they prepare, sign, and manage
            agreements with an all-in-one solution.
          </p>
          <p className="static-para">
            Access the latest state and local association forms. View multiple
            transactions and organize all related forms and documents from a
            centralized workspace. Send documents for signature and monitor
            updates in real time.
          </p>
          <div className="border-top w-100 features-main-marging">
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Get the Datasheet Explore</span> <IoIosArrowForward />
              </span>
            </Button>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Explore Rooms for Real Estate</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/5y6hkwMfXWIXpR7YGKz322/fff470a495ba0733358a7026a384e254/ui-custom-branding.svg"
          />
        </div>
      </div>
      <div className="features-main-div-2">
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/5y6hkwMfXWIXpR7YGKz322/fff470a495ba0733358a7026a384e254/ui-custom-branding.svg"
          />
        </div>
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Docusign Rooms for Real Estate
          </h1>
          <p className="static-para">
            Streamline complex real estate transactions into a simple digital
            process. Brokers can guide agents through each step of the
            transaction process and maintain visibility across their business.
          </p>
          <p className="static-para">
            Organize forms and documents for each transaction in a single
            location and send for signature directly from the Docusign Rooms for
            Real Estate application. .
          </p>
          <div className="border-top w-100 features-main-marging">
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Get the Datasheet Explore</span> <IoIosArrowForward />
              </span>
            </Button>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Explore Rooms for Real Estate</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <div className="comparing-hed">
        <h1 className="static-page-main-heading">
          Which Docusign product is right for you?
        </h1>
        <p className="static-para">Explore features.</p>
        <div className="comparing-container">
          <div>
            <p className="static-subheading">Rooms for Real Estate</p>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Access to state and local association or brokerage-specific
                forms
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Collect all documents and forms in a secure digital workspace
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Support compliance with custom task lists and approval workflows
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Access to state and local association or brokerage-specific
                forms
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Send documents out for signature and monitor the status of each
              </p>
            </div>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Explore Rooms for Real Estate</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <p className="static-subheading">eSignature for Real Estat</p>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Access to state and local association or brokerage-specific
                forms
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Collect all documents and forms in a secure digital workspace
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Support compliance with custom task lists and approval workflows
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Access to state and local association or brokerage-specific
                forms
              </p>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <FiCheck />
              <p className="static-para">
                Send documents out for signature and monitor the status of each
              </p>
            </div>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Explore Rooms for Real Estate</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
        <div className="border-top w-100">
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span>Explore Plans and Pricing</span> <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <Esingintegrations />
      <Contactdetails
        heading={"Ready to simplify your real estate transactions?"}
        subheading={
          "Start managing your real estate transactions with an all-in-one solution."
        }
        action={
          <Button
            className="action-aboutus-outlined-white"
            type="button"
            variant="light"
          >
            View Plans and Pricing
          </Button>
        }
      />
    </div>
  );
};

export default RealEstate;
