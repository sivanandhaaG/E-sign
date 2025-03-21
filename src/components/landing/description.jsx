import { Card } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
const Description = () => {
  return (
    <div className="description-c container">
      <Card className="col-sm description-content" shadow={"none"}>
        <img
          src="https://images.ctfassets.net/0jnmtsdzg6p5/5VxUwEsgSC1RbCssSmKU4D/4e589b718af6a2ad9710094d7c547678/illustration-docusign-iam-blocks.png?fm=webp&q=50"
          alt="description"
          className="rounded"
        />
      </Card>
      <Card className="col-sm" shadow={"none"}>
        <div className="description-content">
          <h2 className="description-h1">
            It’s time to modernize your agreement process
          </h2>
          <p className="description-p light-font">
            The world runs on agreements. Yet the process of managing them is
            ineffective and outdated—leading to delayed and lost revenue,
            customer churn, and increased legal risk. Meanwhile, valuable data
            in agreements remains trapped in static PDFs.
          </p>
          <p className="description-p light-font">
            We call this the Agreement Trap, and it’s costing organizations like
            yours time, money, and opportunity.
          </p>
          <p className="description-p light-font">
            ZillaEsign IAM helps you accelerate revenue, reduce risk, and unlock
            value from the agreements that run your organization.
          </p>
          <div className="outer-action">
            <Button className="action" type="button" variant="primary">
              See your potential
            </Button>
            <Button className="action-link" variant="" type="link">
              <span className="d-flex align-items-center">
                <span> Explore ZillaEsign IAM</span> <IoIosArrowForward />
              </span>{" "}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Description;
