import { useState } from "react";
import { Card, Col, Form, Row } from "react-bootstrap";
import { fillDemoSignup } from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";

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
          fill-rule="evenodd"
          clip-rule="evenodd"
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
          fill-rule="evenodd"
          clip-rule="evenodd"
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

const CTAComponent = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = () => {
    try {
      const res = fillDemoSignup({
        name,
        email,
        phoneNumber: phone,
        description: query,
        message: source,
      });
      toast.success("Form submitted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Row className=" g-5 ">
        <Col md={12} lg={6}>
          <Row>
            <p className="static-page-main-heading p-0">
              Book a call with our document experts
            </p>
          </Row>
          <Row>
            <p className="static-para">
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
        </Col>
        <Col md={12} lg={6}>
          <Card
            style={{
              height: "100%",
              padding: "20px",
              borderRadius: "25px",
              boxShadow: "0 2px 10px rgba(0,0,0,.2)",
            }}
          >
            {/* name */}
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Work Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            {/* phone number */}
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                onChange={(e) => setPhone(e.target.value)}
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
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            {/* How did you hear about us (optional) */}
            <Form.Group className="mb-3" controlId="formBasicHow">
              <Form.Label>How did you hear about us (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter source"
                onChange={(e) => setSource(e.target.value)}
              />
            </Form.Group>
            <button
              className="btn btn-success btn-block"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CTAComponent;
