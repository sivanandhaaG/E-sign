import { Card, CardBody } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";

const Infoabout = () => {
  return (
    <div className="info-container-c">
      <div className="info-main-c">
        <Card shadow={"none"}>
          <CardBody className="p-0 m-2">
            <h2 className="static-page-main-heading">
              ZillaEsign eSignature by the numbers
            </h2>
            <p className="static-para">
              How can your team save time and money by using eSignature?
            </p>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Get Started</span> <IoIosArrowForward />
              </span>
            </Button>
          </CardBody>
        </Card> 
        <Card shadow={"none"}>
          <Card shadow={"none"} className="p-2">
            <div className="info-content w-100">
              <div>
                <h1>15</h1>{" "}
                <p className="static-para">
                  minutes or less to complete 44% of agreements, and 1 day or
                  less to complete 79% of agreements
                </p>
              </div>
              <div>
                <h1>$36</h1>{" "}
                <p className="static-para">
                  minutes or less to complete 44% of agreements, and 1 day or
                  less to complete 79% of agreements
                </p>
              </div>
            </div>
            <Card shadow={"none"} className="p-2">
              <div className="info-content w-100">
                <div>
                  <h1>15</h1>{" "}
                  <p className="static-para">
                    minutes or less to complete 44% of agreements, and 1 day or
                    less to complete 79% of agreements
                  </p>
                </div>
                <div>
                  <h1>$36</h1>{" "}
                  <p className="info-para">
                    minutes or less to complete 44% of agreements, and 1 day or
                    less to complete 79% of agreements
                  </p>
                </div>
              </div>
            </Card>
          </Card> 
        </Card>
      </div>
      <div className="view-all-solution-card-a-outer">
        <div className="view-all-solution-card-a  shadow-lg rounded">
          <p className="static-subheading text-center">
            eSignature transforms how you create, commit to and manage
            agreements as part of ZillaEsign IAM.
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
    </div>
  );
};

export default Infoabout;
