import { Button } from "react-bootstrap";
import Description from "../about/about-description";
import ViewAllSolutions from "../reusablecomponents/view-all-details-card";
import Advanceyourgoal from "./advanceyourgoal";
import Topusecase from "./topusecase";
import Iframevideo from "./Iframevideo";
import { IoIosArrowForward } from "react-icons/io";
import DoMorecontent from "../reusablecomponents/DoMorecontent";
import ImagesticktoleftContainer from "../reusablecomponents/imagesticktoleftContainer";
import Topzillasignproduct from "./Topzillasignproduct";
import Featuredintegrations from "./Featuredintegrations";
import "./insurance";
import CenterBlueCards from "../reusablecomponents/CenterBlueCards";
import Contactdetails from "../about/contact-details";

const Insurance = () => {
  return (
    <div>
      <Description
        subtitle={"Docusign for Insurance"}
        title={"Transform insurance with digital agreements"}
        content={
          "Many of the moments that matter in insurance rely on agreements, from delivering policies to settling claims. Streamline these processes with digital agreements and deliver smarter, easier and trusted experiences to policyholders and agents."
        }
        actions={
          <>
            <Button className="action-aboutus" type="button" variant="primary">
              Start for Free
            </Button>

            <Button
              variant="outline-primary"
              className="action-aboutus-outlined"
            >
              Talk to Us
            </Button>
          </>
        }
        image={
          "https://images.ctfassets.net/0jnmtsdzg6p5/43txlzPP8pMF9a7fxRemAC/b58d60bcf029012bc9e3038a508a9c5a/Hero.png?fm=webp&q=50"
        }
      />
      <Advanceyourgoal />
      <Topusecase />
      <ViewAllSolutions
        title={"Ready to modernize your processes?"}
        actions={
          <Button variant="outline-primary" className="action-aboutus-outlined">
            View All Solutions
          </Button>
        }
      />
      <Iframevideo
        title={
          "How Downeast Insurance gets a competitive advantage with Docusign"
        }
        subtitle=""
        videoLink={"https://www.youtube.com/embed/AtQu5P6SFVk"}
        actions={
          <>
            <div>
              <Button
                className="action-aboutus"
                type="button"
                variant="primary"
              >
                Request a Demo{" "}
              </Button>
            </div>
            <div>
              <Button variant="link" className="know-more-link">
                <span className="d-flex align-items-center">
                  <span> View More customer Stories</span> <IoIosArrowForward />
                </span>
              </Button>
            </div>
          </>
        }
        https
      />
      <DoMorecontent title={"How insurance customers are using Docusign"} />
      <ImagesticktoleftContainer
        imageLink="https://images.ctfassets.net/0jnmtsdzg6p5/4feKzetXi3o4OpcGt3A8cJ/d52a55384cc22b0de31f15a15ab8023f/Image_1.png?fm=webp&q=50"
        title={"Docusign for insurance agencies"}
        subtitle={
          "Agents are on the front line of the insurance business, and staying a step ahead of the competition is critical to an agent’s success. Whether your agency consists of just one agent or hundreds, Docusign can help you:"
        }
        list={[
          "Delight customers with mobile-friendly signing",
          "Enhance agent productivity with faster document turn-around time and easy visibility into signing status",
          "Book new business faster",
        ]}
        isleft={true}
        actions={
          <div className="border-top w-100 features-main-marging">
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Accelerate Insurance Policy Sales</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        }
      />
      <ImagesticktoleftContainer
        imageLink="https://images.ctfassets.net/0jnmtsdzg6p5/6ac1QapIrNYTuzQOyE4cts/002c115dc4e343c4d5c29aae190981e6/Image_2.png?fm=webp&q=50"
        title={"Docusign for insurance carriers"}
        subtitle={
          "Improve customer retention by offering fast and convenient services. Whether your business spans personal, commercial or group lines, Docusign can help you:"
        }
        list={[
          "Deliver digital convenience",
          "Simplify complex operations and reduce costs",
          "Mitigate risk",
        ]}
        isleft={false}
        actions={
          <div className="border-top w-100 features-main-marging">
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span> Digitize to Delight Customers</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        }
      />
      <ImagesticktoleftContainer
        imageLink="https://images.ctfassets.net/0jnmtsdzg6p5/2Y91uYkL5m603ZSAByBlhE/72cf24f041ffd9f2489014a66f3b51c3/lifestyle-man-inspecting-car.png?fm=webp&q=50"
        title={"eSignature for insurance"}
        subtitle={
          "Securely send and sign policy or claims agreements while maintaining a detailed audit trail. Reach policyholders faster with SMS notifications and simplify claims submissions with drawing capabilities."
        }
        list={[]}
        isleft={true}
        actions={
          <div className="border-top w-100 features-main-marging">
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span>Start For Free</span>
                <IoIosArrowForward />
              </span>
            </Button>
            <Button variant="link" className="know-more-link">
              <span className="d-flex align-items-center">
                <span>Learn More About eSignature</span>
                <IoIosArrowForward />
              </span>
            </Button>
          </div>
        }
      />
      <Topzillasignproduct />
      <Featuredintegrations />
      <CenterBlueCards />
      <Contactdetails
        heading={"Experience it for yourself"}
        subheading={
          "Make your business faster, simpler and more cost-efficient with electronic agreements."
        }
        action={
          <Button
            className="action-aboutus-outlined-white"
            type="button"
            variant="light"
          >
            Try for free
          </Button>
        }
      />
    </div>
  );
};

export default Insurance;
