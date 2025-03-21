import { Button } from "react-bootstrap";
import Infoabout2 from "./info-about-2";
import { IoIosArrowForward } from "react-icons/io";

const Features = () => {
  return (
    <div>
      <div className="features-main-div-1">
        <div className="features-text-wraper">
          <h1 className="static-page-main-heading">
            Boost business efficiency and reduce costs
          </h1>
          <p className="static-para">
            Empower your teams to quickly prepare, route and approve agreements
            so they can focus on the big picture.
          </p>
          <p className="static-para">
            Get going quickly with dynamic document generation, collaborate with
            comments and shared templates and take advantage of configurable
            workflows to tackle your trickiest agreement challenges.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> View All Features</span> <IoIosArrowForward />
            </span>{" "}
          </Button>
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
            Boost business efficiency and reduce costs
          </h1>
          <p className="static-para">
            Empower your teams to quickly prepare, route and approve agreements
            so they can focus on the big picture.
          </p>
          <p className="static-para">
            Get going quickly with dynamic document generation, collaborate with
            comments and shared templates and take advantage of configurable
            workflows to tackle your trickiest agreement challenges.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> View All Features</span> <IoIosArrowForward />
            </span>{" "}
          </Button>
        </div>
      
      </div>
      <div className="features-main-div-3">
        <h1 className="static-page-main-heading d-flex justify-content-center mb-4">
          Watch how eSignature works
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
      <Infoabout2 />
    </div>
  );
};

export default Features;
