import { Button } from "react-bootstrap";
import Description from "./about-description";
import "./about.css";
import Contactdetails from "./contact-details";
import Features from "./features";
import Infoabout from "./info-about";
const AboutUS = () => {
  return (
    <div>
      <Description
        subtitle={"ZillaEsign IAM | eSignature"}
        title={"Easily send and sign documents with ZillaEsign eSignature"}
        content={
          "Make your business faster, simpler and more cost-efficient withelectronic agreements. Agree with confidence, with intuitive signing experiences across virtually any device."
        }
        actions={
          <>
            <Button className="action-aboutus" type="button" variant="primary">
              Try for Free
            </Button>

            <Button
              variant="outline-primary"
              className="action-aboutus-outlined"
            >
              View Plans and Pricing
            </Button>
          </>
        }
        image={
          "https://images.ctfassets.net/0jnmtsdzg6p5/nzxmqRRdT4KHY2srMMMwv/204ee69e3a8cc35feb9c8e35c05acf24/remote-signer-in-yellow-jacket.png?fm=webp&q=50"
        }
      />
      <Infoabout />
      <Features />

      <Contactdetails
        heading={"Start your 30-day free trial"}
        subheading={
          "Start managing your real estate transactions with an all-in-one solution."
        }
        action={
          <Button
            className="action-aboutus-outlined-white"
            type="button"
            variant="light"
          >
            Get Started
          </Button>
        }
      />
    </div>
  );
};

export default AboutUS;
