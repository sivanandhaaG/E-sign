import { List, ListItem, Card } from "@chakra-ui/react";
import { Accordion, Button } from "react-bootstrap";

const Infoabout2 = () => {
  return (
    <div>
      <div className="info-2-main-div">
        <div>
          <img
            style={{
              height: "880px",
              objectFit: "fill",
              width: "100%",
            }}
            src="https://images.ctfassets.net/0jnmtsdzg6p5/5PeD70AeuUm4aLOv7nNIHt/aa3c8be5a569c74c4464f9a763fdef93/SMS_-_4.6_ratio__23_.png?fm=webp&q=100"
          />
        </div>
        <List className="p-0"> 
          <ListItem>
            <ListItem>
              <h1 className="p-1 pl-0 static-page-main-heading text-white">
                Extend the power of eSignature
              </h1>
              <p className="info-2-main-div-list-p pt-1">
                ZillaEsign regularly releases new innovations to help your
                organization enable better ways of working. Here are a few
                notable innovations.
              </p>
            </ListItem>
          </ListItem>
          {[1, 2, 3,4].map((item, index) => (
            <ListItem className="border-top p-0" key={index}>
              <div className="pt-1">
                <h2 className="p-1 static-subheading-white">
                  SMS and WhatsApp delivery
                </h2>
                <p className="static-para-white pt-1">
                  Get agreements signed faster with notifications delivered to
                  signers’ mobile devices.
                </p>
                <Button variant="link" className="learn-more">
                  Learn More 
                </Button>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
      <div className="features-main-div-3-info-2">
        <div>
          <h1 className="static-page-main-heading d-flex justify-content-start p-4 mt-4">
            Electronic signature guides and resources
          </h1>
          <div className="d-flex colum gap-4 text-white p-4">
            <div className="info-2-main-div p-4 rounded">
              <div className="">
                <p className="static-para-white">Analyst Report</p>
                <h1 className="static-subheading-white mb-1">
                  IDC Marketscape: Worldwide eSignature Software 2023 Vendor
                  Assessment
                </h1>
                <img
                  style={{
                    objectFit: "cover",
                    widht: "100%",
                    height: "60%",
                  }}
                  alt="ctfassets"
                  src="https://images.ctfassets.net/0jnmtsdzg6p5/7lpi71PqvynSQ00jZRRDMH/10ea2588b1c39d1559b25c66cfce908c/eSignature_Overview_Resources_Card_-_image_2.png?fm=webp&q=50"
                />
              </div>
            </div>
            <div className="info-2-main-div p-4 rounded">
              <div className="static-para-white">
                <p>Analyst Report</p>
                <h1 className="static-subheading-white mb-1">
                  IDC Marketscape: Worldwide eSignature Software 2023 Vendor
                  Assessment
                </h1>
                <img
                  style={{
                    objectFit: "cover",
                    widht: "100%",
                    height: "60%",
                  }}
                  alt="ctfassets"
                  src="https://images.ctfassets.net/0jnmtsdzg6p5/7lpi71PqvynSQ00jZRRDMH/10ea2588b1c39d1559b25c66cfce908c/eSignature_Overview_Resources_Card_-_image_2.png?fm=webp&q=50"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <Card shadow={"none"}>
            <h1 className="static-page-main-heading m-3">FAQs</h1>
            <Accordion defaultActiveKey="0" flush shadow="none">
              <Accordion.Item eventKey="0">
                <Accordion.Header className="p-2 m-2">
                  <div className="static-subheading">
                    What is a digital signature?
                  </div>
                </Accordion.Header>
                <Accordion.Body className="static-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item className="border-none" eventKey="1">
                <Accordion.Header className="p-2 m-2">
                  <div className="static-subheading">
                    What is a digital signature?
                  </div>
                </Accordion.Header>
                <Accordion.Body className="static-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header className="p-2 m-2">
                  <div className="static-subheading">
                    What is a digital signature?
                  </div>
                </Accordion.Header>
                <Accordion.Body className="static-para">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card>
        </div>
        <div className="start-free-t">
          <div>
            <h1 className="static-page-main-heading">
              Ready to make your organization more efficient?
            </h1>
            <div className="d-flex  gap-2 mt-4">
              <Button
                className="action-aboutus"
                type="button"
                variant="primary"
              >
                View Plans and Pricing
              </Button>
              <Button variant="outlinde" className="action-aboutus-outlined">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Infoabout2;
