import { Card } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import "./clm.css";
import { IoIosArrowForward } from "react-icons/io";
import DoMore from "./DoMore";

const Clm = () => {
  return (
    <div>
      <div className="description-aboutus-main">
        <Card className="col-sm d-flex justify-content-center" shadow={"none"}>
          <div className="description-aboutus-content">
            <div>
              <p className="static-subheading m-1">
                Docusign IAM | Contract Lifecycle Management
              </p>
              <p className="static-page-main-heading">
                A better way to manage your contracts
              </p>
              <p className="static-para light-font">
                Contracting processes can be complex, inefficient and costly.
                Whether you’re closing the next big deal with a customer or
                purchasing something your business needs, Docusign CLM makes the
                process easier, faster and less risky.
              </p>
              <div className="aboutus-action-warpper">
                <Button
                  className="action-aboutus"
                  type="button"
                  variant="primary"
                >
                  Talk to Our Experts
                </Button>

                <Button
                  variant="outline-primary"
                  className="action-aboutus-outlined"
                >
                  Watch Video
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Card className="col-sm description-about-content" shadow={"none"}>
          <img
            src="https://images.ctfassets.net/0jnmtsdzg6p5/3TTulzqJvO2AQl6jh0oQuP/c331924c8e93b25abbd08cd425f860d3/CLM-hero-2.png?fm=webp&q=50"
            alt="description"
            className="rounded"
            style={{
              height: "auto",
            }}
          />
        </Card>
      </div>
      <div className="grid-warper-main">
        <div className="grid-content">
          <div>
            <h3 className="static-subheading-white">Do business faster</h3>
            <p className="static-para-white">
              Automate tasks, manage complex workflows and remove blockers to
              work more efficiently.{" "}
            </p>
          </div>
          <div>
            <h3 className="static-subheading-white">Strengthen compliance</h3>
            <p className="static-para-white">
              Standardize processes and increase oversight while saving your
              legal team time.
            </p>
          </div>
          <div>
            <h3 className="static-subheading-white">
              Drive business intelligence
            </h3>
            <p className="static-para-white">
              Speed review, uncover trends and opportunities and find answers to
              critical business questions.
            </p>
          </div>
        </div>
        <div className="border-top w-100 features-main-marging">
          <Button variant="link" className="know-more-link text-white">
            <span className="d-flex align-items-center">
              <span> Explore Rooms for Real Estate</span>
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="view-all-solution-card-a-outer">
        <div className="view-all-solution-card-a  shadow-lg rounded">
          <p className="static-subheading text-center">
            CLM transforms how you create, commit to and manage agreements as
            part of Docusign IAM.
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
      </div>
      <div className="iframe-warper">
        <div className="get-more-heading-warper">
          <h1 className="static-page-main-heading d-flex justify-content-center">
            Learn how Docusign CLM works
          </h1>
          <p className="static-para">
            Want to learn how Docusign CLM can fit your business?
          </p>
        </div>
        <iframe
          title="Zerozilla"
          src="https://www.youtube.com/embed/AtQu5P6SFVk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
        />
        <div className="iframe-warper-action">
          <Button className="action-aboutus" type="button" variant="primary">
            Request a Demo{" "}
          </Button>
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
            Create contracts with ease
          </h1>
          <p className="static-para">
            {`  Generate documents with the click of a button. It's quick and easy
            with templates and a clause library.`}
          </p>
          <ul>
            <li>
              <p className="static-para">
                Auto-populate new agreements with data from systems like
                Salesforce
              </p>
            </li>
            <li>
              <p className="static-para">
                Set conditional rules for things like review of non-standard
                terms
              </p>
            </li>
            <li>
              <p className="static-para">
                Allow Legal to define a library of pre-approved clauses
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div className="features-main-div-1">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Collaborate and negotiate faster
          </h1>
          <p className="static-para">
            Keep everyone on the same page and bring teams together to get
            contracts done faster.
          </p>
          <ul>
            <li>
              <p className="static-para">
                Automate contract routing for internal and external review with
                detailed version control
              </p>
            </li>
            <li>
              <p className="static-para">
                Set conditional rules for things like review of non-standard
                terms
              </p>
            </li>
            <li>
              <p className="static-para">
                Complete reviews fast with comments and tasks that notify users
                and let them take action via email and Slack
              </p>
              <p className="static-para">
                Speed up contract reviews with AI-assisted negotiations
                capabilities
              </p>
            </li>
          </ul>
        </div>
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/2Rjt2tF5bDNYSk94h1jBog/f08b14d9caaafe7d0f2c5ce19146247f/Clm-Collaborate.png?fm=webp&q=50"
          />
        </div>
      </div>
      <div className="features-main-div-2">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Automate contract workflows
          </h1>
          <p className="static-para">
            Remove bottlenecks and blockers with automated workflows that keep
            contracts moving.
          </p>
          <ul>
            <li>
              <p className="static-para">
                Use a drag-and-drop editor to design contract processes
              </p>
            </li>
            <li>
              <p className="static-para">
                Use 100+ pre-configured workflow steps to generate, review,
                approve, send for signature, store contracts, and more
              </p>
            </li>
            <li>
              <p className="static-para">
                With pre-built connectors and rich APIs, use CLM with the tools
                your team is already using{" "}
              </p>
            </li>
          </ul>
        </div>
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/7mdGMIjejdmn7SE6ZFVNK6/70c0f3bdbcc006e08833e8f0d91757c3/ui-docusign-clm-manage-contracts.svg"
          />
        </div>
      </div>
      <div className="features-main-div-1">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Uncover opportunities, risks and trends
          </h1>
          <p className="static-para">
            Use AI and analytics built for contracts to save time, reduce risk
            and make contracts more discoverable.
          </p>
          <ul>
            <li>
              <p className="static-para">
                Extract, analyze and report on key contract data points and
                legal topics with over 100 pre-trained AI models
              </p>
            </li>
            <li>
              <p className="static-para">
                Conditionally drive workflows with analytics, risk scores and
                contract content for faster contract cycles
              </p>
            </li>
            <li>
              <p className="static-para">
                Surface insights that help close sales deals faster, reduce
                procurement costs and speed legal review
              </p>
            </li>
          </ul>
        </div>
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/EIbQYc5DUxS7hl8ROzWP4/03a0a5b99e4920ad55791baba1f648cd/ui-clm-documents.svg"
          />
        </div>
      </div>
      <div className="features-main-div-2">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Manage contracts in one place
          </h1>
          <p className="static-para">
            Store all your contracts in a searchable repository with permission
            controls. Provide
          </p>
          <ul>
            <li>
              <p className="static-para">
                Provide a central, accessible source of truth for your legal
                department and other users
              </p>
            </li>
            <li>
              <p className="static-para">
                Manage obligations, renewals and more with agreement reports
              </p>
            </li>
            <li>
              <p className="static-para">
                Search and filter agreements by keyword, concept and meta-data
              </p>
            </li>
          </ul>
        </div>
        <div>
          <img
            className="rounded"
            src="https://images.ctfassets.net/0jnmtsdzg6p5/EIbQYc5DUxS7hl8ROzWP4/03a0a5b99e4920ad55791baba1f648cd/ui-clm-documents.svg"
          />
        </div>
      </div>
      <div className="docusign-clm">
        <div>
          <h1 className="static-page-main-heading">
            The Docusign CLM Difference
          </h1>
          <div className="docusign-clm-diff">
            <div>
              <p className="static-subheading">Vendor Trust and Track Record</p>
              <p className="static-para">
                Feel confident in your purchase with Docusign’s trusted brand
                and history of leadership across all major CLM analyst reports,
                including the Gartner Magic Quadrant for CLM.
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
            <div>
              <p className="static-subheading mb-1">
                Best-in-Class Integrations
              </p>
              <p className="static-para">
                Maximize existing investments and simplify your tech stack by
                integrating with the tools you already use, including
                Salesforce, SAP Ariba, NetSuite and more.
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
            <div>
              <p className="static-subheading mb-1">Fastest Path to Value</p>
              <p className="static-para">
                Realize a return on investment faster and with less effort with
                easy-to-adopt CLM capabilities and introductory offerings like
                CLM Essentials. .
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
            <div>
              <p className="static-subheading mb-1">Advanced AI Capabilities</p>
              <p className="static-para">
                Accelerate document review and approvals by automatically
                identifying and extracting common contract terms and using
                AI-powered agreement summarization.
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
            <div>
              <p className="static-subheading mb-1">Seamless Upgrade Path</p>
              <p className="static-para">
                Seamlessly move across CLM editions as your business needs
                evolve with solutions built on the same platform and backend,
                designed to grow with you.
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
            <div>
              <p className="static-subheading mb-1">
                Robust Services and Support
              </p>
              <p className="static-para">
                Improve your digital transformation process and accelerate
                adoption with services and support capabilities from the world’s
                largest ecosystem of agreement experts.
              </p>
              <Button
                variant="link"
                className="zila-sign-int-patners-learn-more"
              >
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="docusign-clm-2">
        <h1 className="static-page-main-heading">
          The Docusign CLM Difference
        </h1>
        <p className="static-para">
          Get up to speed on everything you need to know about contract
          lifecycle management.
        </p>
        <div className="docusign-clm-diff-2">
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/1qKl1i7fid2C5XeYjcPoq2/b0e6667b19d56d96772d7ebd44cfffb7/Clm-trends.jpg" />
            <p className="static-subheading">Trends in contract management</p>
            <p className="static-para">
              Keep up with key trends shaping contract management.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/1QJ1GY5wyzonJIxnDfGMjU/f2877808957a58abe212bbec50bddfd7/Clm-howtoknow.jpg" />
            <p className="static-subheading">How to know if you need CLM</p>
            <p className="static-para">
              Determine how your business can benefit by investing in a CLM
              software.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/5aLYqch3PGsMOCZh8rfohY/43065d6c2f8dfb322e4ad8f38c5bf86c/Clm-building_case.jpg" />
            <p className="static-subheading">
              Building a business case for CLM
            </p>
            <p className="static-para">
              Learn how to make a compelling case for why CLM is a worthwhile
              investment.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
        <div className="border-top w-100 features-main-marging p-4">
          <Button variant="link" className="zila-sign-int-patners-learn-more">
            <span className="d-flex align-items-center">
              <span> See Full Toolkit</span> <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="grid-warper-main">
        <div className="grid-content">
          <div>
            <h3 className="static-subheading-white">Do business faster</h3>
            <p className="static-para-white">
              Automate tasks, manage complex workflows and remove blockers to
              work more efficiently.{" "}
            </p>
          </div>
          <div>
            <h3 className="static-subheading-white">Strengthen compliance</h3>
            <p className="static-para-white">
              Standardize processes and increase oversight while saving your
              legal team time.
            </p>
          </div>
          <div>
            <h3 className="static-subheading-white">
              Drive business intelligence
            </h3>
            <p className="static-para-white">
              Speed review, uncover trends and opportunities and find answers to
              critical business questions.
            </p>
          </div>
        </div>
        <div className="border-top w-100 features-main-marging">
          <Button variant="link" className="know-more-link text-white">
            <span className="d-flex align-items-center">
              <span> Explore Rooms for Real Estate</span>
              <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="grid-warper-main-2">
        <h1 className="static-page-main-heading">
          Trust your CLM to an industry leader
        </h1>
        <p className="static-para">Pick what’s right for your organization</p>
        <div className="grid-content">
          <div>
            <h3 className="static-page-main-heading">
              Docusign CLM Essentials
            </h3>
            <p className="static-para">
              Get started with CLM: Organize workflows and automate contract
              busywork.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <h3 className="static-page-main-heading">Docusign CLM</h3>
            <p className="static-para">
              Scale CLM across your organization: Customize contract processes
              and connect to more applications.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <h3 className="static-page-main-heading">Docusign CLM+</h3>
            <p className="static-para">
              The complete contract lifecycle solution: Analyze risk, uncover
              insights and increase the value of your contracts.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
        <div className="border-top w-100 features-main-marging py-4">
          <Button variant="link" className="zila-sign-int-patners-learn-more">
            <span className="d-flex align-items-center">
              <span> Talk to an Expert</span> <IoIosArrowForward />
            </span>
          </Button>
        </div>
      </div>
      <div className="featured-integrations">
        <h1 className="static-page-main-heading">Featured integrations</h1>
        <div className="docusign-clm-diff-2">
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/75CnYyy5hsiAapqsY5o6pZ/16b74cb02b14746b05c4f7507930aa7c/sap_ariba.jpg" />
            <p className="static-subheading">Salesforce</p>
            <p className="static-para">
              Speed up the contract lifecycle with automated document
              generation, collaboration, workflow and a central agreement
              repository with Docusign CLM across the Salesforce Customer 360.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/129hoFTDIxkcjBwOgExWLa/6548e680e628b8d23f3a8b3095eadcc5/coupa.jpg" />
            <p className="static-subheading">SAP Ariba</p>
            <p className="static-para">
              Automatically update data in SAP Ariba and share it across
              systems. Reduce friction and create a single source of truth
              between CLM and your SAP Ariba contract workspace.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
          <div>
            <img src="//images.ctfassets.net/0jnmtsdzg6p5/6083h47p5sCOaRJgrxJyDS/e2adaf7a74e7bb343b8a97f3e9de3276/salesforce.jpg" />
            <p className="static-subheading">Coupa</p>
            <p className="static-para">
              Streamline procure-to-pay processes by sharing data in real time
              between systems and automatically create or update contracts in
              Coupa or Docusign CLM.
            </p>
            <Button variant="link" className="zila-sign-int-patners-learn-more">
              <span className="d-flex align-items-center">
                <span> Learn More</span> <IoIosArrowForward />
              </span>
            </Button>
          </div>
        </div>
      </div>
      <DoMore />
    </div>
  );
};

export default Clm;
