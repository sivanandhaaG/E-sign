import { Button } from "react-bootstrap";
import CenterHeading from "../reusablecomponents/CenterHeading";
import { FaArrowRight } from "react-icons/fa";

const Advanceyourgoal = () => {
  return (
    <div className="docusign-realtors">
      <CenterHeading heading={"Advance your goals"} subheading={""} />
      <div className="grid-warper">
        <div>
          <h1 className="static-subheading">
            Delight customers & optimize experiences
          </h1>
          <p className="static-para">
            Meet your policyholders where they are with frictionless,
            multi-channel signing experiences.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> View All Features</span> <FaArrowRight />
            </span>{" "}
          </Button>
        </div>
        <div>
          <h1 className="static-subheading">
            Accelerate and automate processes
          </h1>
          <p className="static-para">
            Simplify document workflows and seamlessly integrate digital
            agreements into your core systems, making life easier for your
            agents and employees.
          </p>
        </div>
        <div>
          <h1 className="static-subheading">
            Bolster security and compliance efforts
          </h1>
          <p className="static-para">
            Mitigate fraud and E&O risk and securely scale digital agreements
            with tools for enhanced control and visibility.
          </p>
          <Button variant="link" className="know-more-link">
            <span className="d-flex align-items-center">
              <span> View All Features</span> <FaArrowRight />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Advanceyourgoal;
