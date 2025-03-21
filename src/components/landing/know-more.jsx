import { Avatar, Card, CardBody } from "@chakra-ui/react";
import { Button, CardImg } from "react-bootstrap";
import { IoIosArrowForward } from "react-icons/io";
import { IoChevronBackOutline, IoChevronForward } from "react-icons/io5";

const KnowMore = () => {
  const columns = [
    {
      heading: "IAM Core",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
    {
      heading: "IAM Core",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
    {
      heading: "IAM Core",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
    {
      heading: "Power end-to-end",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
    {
      heading: "Power end-to-end",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
    {
      heading: "Power end-to-end",
      content:
        "Built for organizations and industries of all sizes. Save time and get the most value from every agreement.      ",
      url: "//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png",
      available: "Available",
      sorce:
        "https://images.ctfassets.net/0jnmtsdzg6p5/4kazA4ZFkoYfkaZ3zyJ6lG/3535e6588a0f8444a5c05623a3406c84/ui-ZillaEsign-maetro.png",
    },
  ];
  return (
    <>
      <div className="m-4 know-more-main">
        <div className="row mt-4 know-more-header">
          <h2 className="">Applications designed to fit every business</h2>
          <p className=" know-more-h3 light-font">
            Our suite of applications are packages that contain core features
            built to fit the specific needs of your business and industry.
          </p>
        </div>
        <div className="know-more-main-content">
          {columns.map((item, index) => (
            <div key={index} className="know-more-cards">
              <CardImg
                variant="top"
                src={item?.url}
                alt={`url-${index}`}
                className="rounded"
                style={{
                  height: "fit-content",
                }}
              />
              <h3 className="know-more-h3">{item?.heading}</h3>
              <p className="know-more-p light-font">{item?.content}</p>
              <span>
                <b>{item?.available}</b>
              </span>
              <Button variant="link" className="know-more-link">
                <span className="d-flex align-items-center">
                  <span> Learn More</span> <IoIosArrowForward />
                </span>{" "}
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 d-flex justify-content-center">
          <Card className="view-all-solution-card">
            <div className="p-1">
              <p className="view-all-solution-heading">
                Discover why ZillaEsign IAM is the agreement solution your
                business needs
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
          </Card>
        </div>
      </div>
      <div className="know-more-main-2">
        <div className=" mt-4 ">
          <p className="f-2 mb-4 know-more-header-3">
            How organizations like yours do more with ZillaEsign
          </p>
          <div className="position-relative">
            <div className="d-flex flex-row scroll-x padding-2">
              {[1, 2].map((item, index) => (
                <div key={index} className="d-flex">
                  <div className="know-more-content-3">
                    <div>
                      <Button variant="link" className="know-more-link">
                        <span className="d-flex align-items-center">
                          <span> United Airelines</span> <IoIosArrowForward />
                        </span>
                      </Button>
                      <p className="para-1 light-font">
                        Developed seamless HR workflows that save time and give
                        HR teams more visibility into processes
                      </p>
                      <div className="">
                        <h1 className="heading-2">
                          We needed the process to be user friendly, legally
                          immutable and trusted.
                        </h1>
                      </div>
                    </div>
                    <div className="d-flex align-items-baseline">
                      <div className="p-1 d-flex align-items-center">
                        <Avatar />
                        <div className="d-flex flex-column  m-2">
                          <span>
                            <b>Stefan Josephson</b>
                          </span>
                          <p className="light-font mb-0">
                            Senior Manager of IT Application Development
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="know-more-content-3">
                    <div>
                      <Button variant="link" className="know-more-link">
                        <span className="d-flex align-items-center">
                          <span> Explore more</span> <IoIosArrowForward />
                        </span>{" "}
                      </Button>
                      <p className="para-1 light-font">
                        Turns around agreements 95% faster
                      </p>
                    </div>
                    <div className="d-flex justify-content-start">
                      <iframe
                        title="Zerozilla"
                        height={"300"}
                        width={"100%"}
                        src="https://www.youtube.com/embed/AtQu5P6SFVk"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="actionwrapper ">
              <Button size="lg" variant="primary" className="round-button">
                <IoChevronBackOutline />
              </Button>
              <Button size="lg" variant="primary" className="round-button">
                <IoChevronForward />
              </Button>
            </div>
          </div>
        </div>
        <div className="info-main">
          <div className="info-main-c">
            <Card shadow={"none"}>
              <CardBody className="p-0 m-2">
                <h2 className="info-h1">
                  ZillaEsign eSignature by the numbers
                </h2>
                <p className="para-1 light-font">
                  How can your team save time and money by using eSignature?
                </p>
                <Button variant="link" className="know-more-link">
                  <span className="d-flex align-items-center">
                    <span> Get Started</span> <IoIosArrowForward />
                  </span>{" "}
                </Button>
              </CardBody>
            </Card>
            <Card shadow={"none"}>
              <Card shadow={"none"}>
                <div className="info-content w-100">
                  <div>
                    <h1 className="info-h1">15</h1>{" "}
                    <p className="info-para-1 light-font">
                      minutes or less to complete 44% of agreements, and 1 day
                      or less to complete 79% of agreements
                    </p>
                  </div>
                  <div>
                    <h1 className="info-h1">$36</h1>{" "}
                    <p className="info-para">
                      minutes or less to complete 44% of agreements, and 1 day
                      or less to complete 79% of agreements
                    </p>
                  </div>
                </div>
                <Card shadow={"none"}>
                  <div className="info-content w-100">
                    <div>
                      <h1 className="info-h1">15</h1>{" "}
                      <p className="info-para-1">
                        minutes or less to complete 44% of agreements, and 1 day
                        or less to complete 79% of agreements
                      </p>
                    </div>
                    <div>
                      <h1 className="info-h1">$36</h1>{" "}
                      <p className="info-para">
                        minutes or less to complete 44% of agreements, and 1 day
                        or less to complete 79% of agreements
                      </p>
                    </div>
                  </div>
                </Card>
              </Card>
            </Card>
          </div>
        </div>
        <Card shadow={"none"}>
          <CardBody className="discover-card">
            <div className="align-items-center m-2 p-2">
              <h1>
                {
                  "Discover what's new with ZillaEsign IAM or start with eSignature for free"
                }
              </h1>
              <div className="d-flex">
                <Button
                  variant="light"
                  size="md"
                  className="explore-z-action m-1"
                >
                  Explore ZillaEsign IAM
                </Button>
                <Button variant="outline-light" size="md" className="m-1">
                  Explore ZillaEsign IAM
                </Button>
              </div>
            </div>
            <img
              src="//images.ctfassets.net/0jnmtsdzg6p5/Dc0SziTJ1rmxyMSHdHWNP/c0da4fc6ab91424027973b8f9a557a81/woman-presenting.png"
              alt="sorceImg"
              style={{
                height: "300px",
              }}
            />
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default KnowMore;
