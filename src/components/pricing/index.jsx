import {
  faCheck,
  faEye,
  faMoneyBill,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";
import check from "../../assets/images/general/check.svg";
import PricingAccordian from "./pricingAccordian";
import CTAComponent from "./ctaComponent";
import "./index.css";

const PricingComponent = () => {
  return (
    <div className="mt-5">
      <div className="pricing-container">
        <div>
          <h1>Pricing</h1>
          <p className="mt-2 lead">
            Join 2000+ companies who are transforming their paperwork processes
            with Zerozilla
          </p>
        </div>
        <div className="pricing-cards-wrapper">
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={faCheck} />
            <h5 style={{marginLeft:"10px"}}> Pay only for successful eSigns</h5>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={faMoneyBill} />
            <h5 style={{marginLeft:"10px"}}>Don’t pay stamp duty when signer doesn’t sign</h5>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={faEye} />
            <h5 style={{marginLeft:"10px"}}>No hidden pricing</h5>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
          }}>
            <FontAwesomeIcon icon={faPeopleGroup} />
            <h5 style={{marginLeft:"10px"}}>
              Dedicated implementation experts to help you meet go-live
              timelines
            </h5>
          </div>
        </div>
        <div className="mt-5 g-4 pricing-cards-wrapper-2">
          <div>
            <div
              style={{
                backgroundColor: "rgb(80 70 229)",
                color: "#fff",
              }}
            >
              <h3>Advanced Document Flow</h3>
              <p>Ideal for Indian business</p>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                      color: "#fff",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Paperwork process vary from use case to use case
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                      color: "#fff",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Book a free consultation with us - we’ll help you setup and
                    test your first document flow for free
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                      color: "#fff",
                      backgroundColor: "#fff",
                      borderRadius: "50%",
                      // height: '20px',
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    We’ll also give you a pricing quote for the flow - pay when
                    you’re ready
                  </span>
                </div>
              </div>
              <div>
                <button className="btn btn-success btn-block" style={{
                  backgroundColor: "#fff",
                  color: "#5046e5",
                
                }}> 
                  Get Started
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              style={{
                backgroundColor: "white",
                color: "#333333",
              }}
            >
              <h3>Advanced Document Flow</h3>
              <p>Ideal for Indian business</p>
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Paperwork process vary from use case to use case
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    Book a free consultation with us - we’ll help you setup and
                    test your first document flow for free
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "start",
                    gap: "10px",
                    marginBottom: "20px",
                  }}
                >
                  <img
                    src={check}
                    alt="check"
                    style={{
                      width: "25px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    We’ll also give you a pricing quote for the flow - pay when
                    you’re ready
                  </span>
                </div>
              </div>
              <div>
                <button className="btn btn-success btn-block" style={{
                  backgroundColor: "#5046e5",
                  color: "#fff",
                }}>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pricing-table">
        <PricingAccordian />
      </div>
      <Row className="mt-5 px-5">
        <Container fluid className="py-5 px-5">
          <CTAComponent />
        </Container>
      </Row>
    </div>
  );
};

export default PricingComponent;
