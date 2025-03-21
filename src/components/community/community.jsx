import { Button, Card } from "react-bootstrap";
import "./index.css";
import { CiBellOn } from "react-icons/ci";
import { Fragment, useState } from "react";
import settingsbanner from "../../../src/assets/images/general/settingsbanner.png";
import { Avatar } from "@chakra-ui/react";
import moment from "moment/moment";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { CiChat1 } from "react-icons/ci";

const Community = () => {
  const [showmore, setShowMore] = useState(false);
  return (
    <div className="community-c">
      <div className="microfinance-container">
        <div>
          <h1>{`Let's grow together`}</h1>
          <p>
            A community built for the people who power the world’s agreements.
          </p>
        </div>
        <div>
          <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/65a7a4b4380ad549730f2ca5_MFI-frame2-left.png" />
        </div>
      </div>
      <div className="community-cards-wrapper">
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`What's new`}</p>
        </Card>
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`Platform service`}</p>
        </Card>
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`e signature`}</p>
        </Card>
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`CLM`}</p>
        </Card>
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`Web Forms`}</p>
        </Card>
        <Card>
          <CiBellOn size={"sm"} />
          <p>{`Developer`}</p>
        </Card>
        {showmore && (
          <Fragment>
            <Card>
              <CiBellOn size={"sm"} />
              <p>{`Developer`}</p>
            </Card>
            <Card>
              <CiBellOn size={"sm"} />
              <p>{`Web Forms`}</p>
            </Card>
            <Card>
              <CiBellOn size={"sm"} />
              <p>{`Developer`}</p>
            </Card>
          </Fragment>
        )}
      </div>
      <div className="d-flex justify-content-center w-100 p-1">
        <Button
          variant="dark"
          onClick={() => {
            setShowMore(!showmore);
          }}
        >
          {!showmore ? "Show More" : "Show less"}
        </Button>
      </div>
      <div>
        <h1 className="d-flex justify-content-center p-1">
          Expand your knowledge. Increase your impact.
        </h1>
        <div className="community-cards-wrapper-2">
          <Card>
            <div>
              <CiBellOn
                className="d-flex justify-content-center"
                style={{
                  fontSize: "100px",
                  width: "100%",
                  height: "150px",
                }}
              />
            </div>
            <span>Get started</span>
            <p>
              No matter your industry or favorite Docusign product, there’s a
              group for you.{" "}
            </p>
          </Card>
          <Card>
            <div>
              <CiBellOn
                style={{
                  fontSize: "100px",
                  width: "100%",
                  height: "150px",
                }}
                className="d-flex justify-content-center"
              />
            </div>
            <span>Earn badges</span>
            <p>
              No matter your industry or favorite Docusign product, there’s a
              group for you.{" "}
            </p>
          </Card>
          <Card>
            <div>
              <CiBellOn
                style={{
                  fontSize: "100px",
                  width: "100%",
                  height: "150px",
                }}
                className="d-flex justify-content-center"
              />
            </div>
            <span>Join groups</span>
            <p>
              No matter your industry or favorite Docusign product, there’s a
              group for you.{" "}
            </p>
          </Card>
        </div>
      </div>
      <div className="community-cards-wrapper-3">
        <h1>Latest topics from the Docusign team</h1>
        <div className="">
          <img
            style={{
              objectFit: "contain",
            }}
            src="https://uploads-us-west-2.insided.com/docusign-en/attachment/97361907-8e7c-4bd2-8f7c-6c78cc165095_thumb.png"
          />
          <div>
            <span>Welcome to the Docusign Community!</span>
            <p>
              Docusign is excited to announce the launch of our brand new
              community site! As the Community Program Manager, I am proud to
              welcome you to this innovative platform that is designed to
              connect users with the resources and support they need to get the
              most out of {`Docusign's`} products and services. Whether{" "}
              {`you're`} looking for tips, tricks, or troubleshooting advice,
              our community site is here to provide a comprehensive source of
              information and support. With user-friendly features and a wealth
              of resources, {`we're`} confident that this site will become an
              invaluable tool for anyone looking to maximize the potential of
              Docusign. We look forward to building a thriving community of
              users and experts who can share knowledge and ideas.
            </p>
          </div>
        </div>
      </div>
      <div className="community-cards-wrapper-4">
        <Card>
          <div>
            <img src={settingsbanner} />
          </div>
          <span className="p-1">Join groups</span>
          <div className="d-flex justify-content-between p-2">
            <div className="d-flex justify-content-between">
              <Avatar style={{ width: "30px", height: "30px" }} />
              <span>{moment().format("ll")}</span>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <MdOutlineRemoveRedEye />
                <span>100</span>
              </div>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <CiChat1 />
                <span>100</span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div>
            <img src={settingsbanner} />
          </div>
          <span className="p-1">Join groups</span>
          <div className="d-flex justify-content-between p-2">
            <div className="d-flex justify-content-between gap-2">
              <Avatar style={{ width: "30px", height: "30px" }} />
              <span>{moment().format("ll")}</span>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <MdOutlineRemoveRedEye />
                <span>100</span>
              </div>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <CiChat1 />
                <span>100</span>
              </div>
            </div>
          </div>
        </Card>
        <Card>
          <div>
            <img src={settingsbanner} />
          </div>
          <span className="p-1">Join groups</span>
          <div className="d-flex justify-content-between p-2">
            <div className="d-flex justify-content-between">
              <Avatar style={{ width: "30px", height: "30px" }} />
              <span>{moment().format("ll")}</span>
            </div>
            <div className="d-flex justify-content-between gap-2">
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <MdOutlineRemoveRedEye />
                <span>100</span>
              </div>
              <div className="d-flex justify-content-between gap-2 align-items-center">
                <CiChat1 />
                <span>100</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="community-cards-wrapper-5">
        <img src="https://uploads-us-west-2.insided.com/docusign-en/attachment/8c4c66a4-7b29-4096-9285-968dad40cb1d.png" />
        <div>
          <h1>Create workflows with our template library</h1>
          <Button className="" variant="light">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Community;
