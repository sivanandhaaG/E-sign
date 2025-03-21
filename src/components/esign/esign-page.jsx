import { Accordion, Button, Form, Row } from "react-bootstrap";
import "./esign.css";
import { Avatar, Card } from "@chakra-ui/react";
import Logo from "../../assets/logo/logo.svg";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const EsignPage = () => {
  return (
    <div className="esign-container">
      <div className="topbanner-container">
        <h1>
          Deploy India-compliant ZillaSigning for all use cases - in a fast and
          easy way
        </h1>
        <div className="d-flex gap-2 mt-4">
          <Button size="lg" className="btn-emerald-bg">
            Try An esign For Free
          </Button>
          <Button
            size="lg"
            className="btn-emerald-outline"
            variant="outline-success"
          >
            Book A Call
          </Button>
        </div>
        <div className="esign-card-top-wrapper">
          <Card className="esign-card-featuers">
            <div className="border-bottom m-1 p-1 d-flex justify-content-center">
              <Avatar src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbaa4e402c63dfcf33cc40_eSign-types-profile.webp" />
            </div>
            <div>
              <h4 className="esign-card-featuers-hed">
                Choose between 15+ eSign types
              </h4>
              <div>
                <p>Aadhaar eSign</p>
                <p>Secure Virtual Sign</p>
                <p>Fingerprint eSign</p>
                <p>DocSigner</p>
                <p>OTP-less eSign</p>
                <p>PAN eSign</p>
              </div>
              <div className="d-flex justify-content-center mt-4">
                <Button
                  className="btn-outlne-indigo-pill"
                  size="lg"
                  variant="outline-primary"
                >
                  15+ eSign types
                </Button>
              </div>
            </div>
          </Card>
          <div className="card-tranprint">
            <div>
              <div className="img-adhar">
                <img
                  alt="adhar"
                  // src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp"
                />
              </div>
              <Card className="primary-light-background">
                <p>Send eSign request for Loan agreement to (1280) customers</p>
                <div className="d-flex justify-content-center">
                  <Button
                    className="btn-outlne-indigo-pill"
                    size="lg"
                    variant="outline-primary"
                  >
                    Send eSign Invitations
                  </Button>
                </div>
              </Card>
            </div>
          </div>
          <Card className="esign-card-featuers-image">
            <img
              alt="adhar"
              src={
                "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb7954f8192b1d5bd6368_eSign-credits.svg"
              }
            />
          </Card>
          <Card className="esign-card-featuers-image">
            <img
              alt="adhar"
              src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb70edfac6c06b150ac10_esign-analysis.svg"
            />
          </Card>
        </div>
      </div>
      <div className="businesses-info">
        <h1>
          2000+ businesses in India are getting documents eSigned via Zerozilla
          BharatSign
        </h1>
        <div className="esing-businesses-info-container">
          {column.map((item, index) => {
            return (
              <div key={index}>
                <img
                  alt="adhar"
                  src={Logo}
                  height={100}
                  width={100}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="esigned-info">
        {cardContent?.map((item, index) => {
          return (
            <Card key={index}>
              <h1>{item?.Heading}</h1>
              <p className="text-regular">{item?.subheading}</p>
              <Button className="btn-link-indgo" variant="link">
                Learn More
              </Button>
              <div className="esigned-info-img">
                <img
                  alt="adhar"
                  src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp"
                />
              </div>
            </Card>
          );
        })}
      </div>
      <div className="esign-card-featuers-2">
        <div className="">
          <h1 className="static-page-main-heading-white">
            eSign is not enough.
          </h1>
          <p className="static-subheading">
            With Leegality, you get the complete feature set you need to truly
            digitize paperwork processes
          </p>
        </div>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
          return (
            <Card className="esign-card-f" key={index}>
              <div
                className="rounded-circle p-1 mb-4"
                style={{
                  background: "red",
                }}
              >
                <FaRegHeart className="m-1" />
              </div>
              <p className="static-para">
                Build a drop-off free eSign interface with features like Local
                Language eSign Interfaces, eSign via Whatsapp, Custom Branding,
                Custom Consent Messages and more
                <span>eStamping</span> in 31 States/UTs
              </p>
            </Card>
          );
        })}
      </div>
      <div className="esign-card-featuers-3">
        <h1 className="static-page-main-heading-white">
          Do you want to do either of these things?
        </h1>
        <div>
          <div className="d-flex align-items-center text-center p-1 gap-2 m-2">
            <span className="p-1">
              <FaHeart />
            </span>
            <p className="static-para">
              See if digital paperwork is viable in your organization
            </p>
          </div>
          <div className="d-flex align-items-center text-center p-1 gap-2 m-2">
            <span className="p-1">
              <FaHeart />
            </span>
            <p className="static-para">
              See if digital paperwork is viable in your organization
            </p>
          </div>
          <div className="d-flex align-items-center text-center p-1 gap-2 m-2">
            <span className="p-1">
              <FaHeart />
            </span>
            <p className="static-para">
              Quickly deploy digital paperwork in your business
            </p>
          </div>
        </div>
      </div>
      <div className="esign-card-featuers-form-div">
        <div>
          <Row className="m-0">
            <h1 className="static-page-main-heading-white mb-1">
              Book a call with our document experts
            </h1>
            <p className="static-para-white mx-3">
              Drop your details in the form if you want any (or all) of the
              following:
            </p>
          </Row>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            {iconTextData.map((data) => (
              <Row key={data?.text}>
                <IconText
                  svg={data.svg}
                  text={data.text}
                  className="static-para"
                />
              </Row>
            ))}
          </div>
        </div>
        <Card className="esign-card-featuers-form-div-form ">
          <Form.Group className="mb-3" controlId="formBasicName 1-100">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              // onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Work Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              // onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          {/* phone number */}
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone number</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              // onChange={(e) => setPhone(e.target.value)}
            />
          </Form.Group>

          {/* Brief description of query
           */}
          <Form.Group className="mb-3" controlId="formBasicQuery">
            <Form.Label>Brief description of query</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter your query"
              style={{ height: "100px" }}
              // onChange={(e) => setQuery(e.target.value)}
            />
          </Form.Group>
          {/* How did you hear about us (optional) */}
          <Form.Group className="mb-3" controlId="formBasicHow">
            <Form.Label>How did you hear about us (optional)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter source"
              // onChange={(e) => setSource(e.target.value)}
            />
          </Form.Group>
          <button
            className="btn btn-success btn-block"
            // onClick={handleSubmit}
          >
            Submit
          </button>
        </Card>
      </div>
      <div className="faq-1">
        <Card className="p-1">
          <h1 className="static-page-main-heading m-3">FAQs</h1>
          <Accordion defaultActiveKey="0" flush shadow="none">
            <Accordion.Item eventKey="0">
              <Accordion.Header className="p-2 m-2 h2">
                <div className="static-subheading">
                  What is a digital signature?
                </div>
              </Accordion.Header>
              <Accordion.Body className="static-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item className="border-none" eventKey="1">
              <Accordion.Header className="p-2 m-2 h2">
                <div className="static-subheading">
                  What is a digital signature?
                </div>
              </Accordion.Header>
              <Accordion.Body className="static-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="p-2 m-2 h2">
                <div className="static-subheading">
                  What is a digital signature?
                </div>
              </Accordion.Header>
              <Accordion.Body className="static-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="p-2 m-2 h2">
                <div className="static-subheading">
                  What is a digital signature?
                </div>
              </Accordion.Header>
              <Accordion.Body className="static-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header className="p-2 m-2 h2">
                <div className="static-subheading">
                  What is a digital signature?
                </div>
              </Accordion.Header>
              <Accordion.Body className="static-para">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Card>
      </div>
    </div>
  );
};

export default EsignPage;
const column = [
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a75_bank-of-baroda-logo-vector%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7c_times-internet-logo-vector%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a76_icici-bank-vector-logo%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a77_Airtel_Payments%201%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7e_razorpay-icon%201%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7b_South-Indian-Bank-01%201.svg",
  "https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a78_Mask%20group-1.svg",
];

const cardContent = [
  {
    Heading: "Enterprise Grade Aadhaar eSign",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Aadhaar eSign via OTP, IRIS, Biometric & NeSL - with multiple ESP Backups to ensure minimum downtime.",
  },
  {
    Heading: "eSign with Physical Signatures",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Collect exact signatures digitally and match them with specimen signatures",
  },
  {
    Heading: "Secure & Enforceable Virtual Sign",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Signers doesn’t have a linked Aadhaar? Use our virtual signatures - backed by secure authentication",
  },
  {
    Heading: "Automated Signatures for authorised signatories",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Stop chasing your authorised signatories around. Use Zerozilla DocSigner or Automated Virtual Sign instead",
  },
  {
    Heading: "eSign via fingerprint",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Customer doesn’t have a signature? No problem. Collect signatures via Aadhaar biometric or Secure Fingerprint capture",
  },
  {
    Heading: "Corporate eSign via DSC & Cloud DSC",
    image:
      "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/65cbb30085d3c364f5520c0a_Aadhaar_Logo%201%20(1).webp",
    subheading:
      "Offer signers the option to sign with their DSC - or our new token-less option - Cloud DSC",
  },
];

const IconText = ({ svg, text }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "start",
        gap: "10px",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
        }}
      >
        {svg}
      </div>
      <p
        style={{
          margin: 0,
          padding: 0,
        }}
        className="h6"
      >
        {text}
      </p>
    </div>
  );
};

const iconTextData = [
  {
    svg: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M2.66699 15.9998C2.66699 22.6863 7.58887 28.2232 14.0073 29.1852C15.0997 29.3489 16.0003 28.4377 16.0003 27.3332V21.9258C16.0003 20.2894 17.3269 18.9628 18.9633 18.9628C20.5997 18.9628 21.9263 20.2894 21.9263 21.9258V24.7199C21.9263 26.2046 23.4826 27.1365 24.6153 26.1767C27.5016 23.7309 29.3337 20.0793 29.3337 15.9998C29.3337 8.63604 23.3641 2.6665 16.0003 2.6665C8.63653 2.6665 2.66699 8.63604 2.66699 15.9998Z"
          fill="#F0CF46"
        ></path>
        <path
          d="M14.667 10C14.667 8.89543 13.7716 8 12.667 8C11.5624 8 10.667 8.89543 10.667 10C10.667 11.1046 11.5624 12 12.667 12C13.7716 12 14.667 11.1046 14.667 10Z"
          fill="#F0CF46"
        ></path>
        <path
          d="M24.667 13.333C24.667 12.2284 23.7716 11.333 22.667 11.333C21.5624 11.333 20.667 12.2284 20.667 13.333C20.667 14.4376 21.5624 15.333 22.667 15.333C23.7716 15.333 24.667 14.4376 24.667 13.333Z"
          fill="#F0CF46"
        ></path>
        <path
          d="M12.667 20.6665C12.667 19.5619 11.7716 18.6665 10.667 18.6665C9.56242 18.6665 8.66699 19.5619 8.66699 20.6665C8.66699 21.7711 9.56242 22.6665 10.667 22.6665C11.7716 22.6665 12.667 21.7711 12.667 20.6665Z"
          fill="#F0CF46"
        ></path>
      </svg>
    ),
    text: "A product demo tailor-made for your use case",
  },
  {
    svg: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.666 10.963V14.6667C10.666 16.8758 12.4569 18.6667 14.666 18.6667H17.3327C19.5418 18.6667 21.3327 16.8758 21.3327 14.6667V10.963L17.6239 12.6113C16.5896 13.071 15.4091 13.071 14.3748 12.6113L10.666 10.963ZM24.666 9.4815V15.3333C24.666 15.8856 25.1137 16.3333 25.666 16.3333C26.2183 16.3333 26.666 15.8856 26.666 15.3333V8.59131C26.6539 8.59757 26.6414 8.60355 26.6286 8.60922L24.666 9.4815Z"
          fill="#8644F0"
        ></path>
        <path
          opacity="0.4"
          d="M5.37052 7.3908L14.3752 3.3887C15.4095 2.92903 16.5901 2.92903 17.6244 3.3887L26.6291 7.3908C27.157 7.62541 27.157 8.3746 26.6291 8.60922L17.6244 12.6113C16.5901 13.071 15.4095 13.071 14.3752 12.6113L5.37052 8.60922C4.84264 8.3746 4.84264 7.62541 5.37052 7.3908Z"
          fill="#8644F0"
        ></path>
        <path
          opacity="0.4"
          d="M19.0657 20.5328L16.9477 22.6746C16.4258 23.2023 15.5735 23.2023 15.0516 22.6746L12.9336 20.5328C12.6064 20.202 12.1287 20.061 11.6823 20.1922C7.94216 21.2921 5.33301 23.7772 5.33301 26.6667C5.33301 28.1395 6.52692 29.3334 7.99967 29.3334H23.9997C25.4724 29.3334 26.6663 28.1395 26.6663 26.6667C26.6663 23.7772 24.0572 21.2921 20.317 20.1922C19.8706 20.061 19.3929 20.202 19.0657 20.5328Z"
          fill="#8644F0"
        ></path>
      </svg>
    ),
    text: "The opportunity to ask our Document Experts absolutely any question you have about the product, pricing, use case etc.",
  },
  {
    svg: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          opacity="0.4"
          d="M10.666 2.6665H21.3327V23.9998C21.3327 26.9454 18.9449 29.3332 15.9993 29.3332C13.0538 29.3332 10.666 26.9454 10.666 23.9998V2.6665Z"
          fill="#F19387"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.33301 2.6665C8.33301 2.11422 8.78072 1.6665 9.33301 1.6665H22.6663C23.2186 1.6665 23.6663 2.11422 23.6663 2.6665C23.6663 3.21879 23.2186 3.6665 22.6663 3.6665H9.33301C8.78072 3.6665 8.33301 3.21879 8.33301 2.6665Z"
          fill="#F19387"
        ></path>
        <path
          d="M21.3327 10.6665H10.666V23.9998C10.666 26.9454 13.0538 29.3332 15.9993 29.3332C18.9449 29.3332 21.3327 26.9454 21.3327 23.9998V10.6665Z"
          fill="#F19387"
        ></path>
      </svg>
    ),
    text: "A FREE sandbox account - where you can test out ALL our features for free",
  },
];
