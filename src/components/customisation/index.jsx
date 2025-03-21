import { BsHeart } from "react-icons/bs";
import "./index.css";
import Sponsors from "../sponcers/sponsors";
import CustomisationCards from "./customisationCards";
import { Button, Form } from "react-bootstrap";
import ContactForm from "../../components/culture/contact-form";

const Customisation = () => {
  return (
    <div className="container-customisation">
      <div className="digital-conatiner">
        <h1>Digital paperwork flows that look like your brand</h1>
        <div>
          <div>
            <BsHeart />
            <p>Digital paperwork flows that look like your brand</p>
          </div>
          <div>
            <BsHeart />
            <p>Digital paperwork flows that look like your brand</p>
          </div>
          <div>
            <BsHeart />
            <p>Digital paperwork flows that look like your brand</p>
          </div>
        </div>
      </div>
      <Sponsors
        text={
          "2000+ Indian businesses - from high-growth unicorns to the largest banks - use Zerozilla to go paperless"
        }
      />
      <div>
        <CustomisationCards
          text={"Make the Zerozilla flow look like YOUR brand"}
          content={
            <>
              <div>
                <BsHeart className="d-flex align-items-center" />
                <p>Set your Brand logo</p>
              </div>
              <Form>
                <Form.Group>
                  <Form.Control
                    className="input-image"
                    type="file"
                    aria-label="click to upload"
                  />
                </Form.Group>
              </Form>
              <div>
                <BsHeart className="d-flex align-items-center" />
                <p>Add your Brand colors</p>
              </div>
              <Form>
                <Form.Group>
                  <Form.Label>Try Now</Form.Label>
                  <Form.Control
                    className="input-image"
                    type="color"
                    aria-label="click to upload"
                  />
                </Form.Group>
              </Form>
            </>
          }
          content2={<div />}
          cardName1={"custom-card-1"}
          cardName2={"custom-card-2"}
          image={
            "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef0713961e50425f9596f_Custom_dashboard.webp"
          }
        />

        <CustomisationCards
          text={"Send documents from your company’s domain and email"}
          content={<div />}
          content2={<div />}
          cardName1={"custom-card-2"}
          cardName2={"custom-card-1"}
          image={
            "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef0713961e50425f9596f_Custom_dashboard.webp"
          }
        />
        <CustomisationCards
          text={
            "Collect additional custom consent along with the eSign consent"
          }
          content={<div />}
          content2={<div />}
          cardName1={"custom-card-1"}
          cardName2={"custom-card-2"}
          image={
            "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef0713961e50425f9596f_Custom_dashboard.webp"
          }
        />
        <div className="custom-cards-2">
          <h1>
            {"Redesign the Zerozilla Dashboard so it suits your branding"}
          </h1>
          <div className="custom-card-3">
            <div>
              <img
                src={
                  "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef0713961e50425f9596f_Custom_dashboard.webp"
                }
              />
            </div>
            <div>
              <img
                src={
                  "https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef0713961e50425f9596f_Custom_dashboard.webp"
                }
              />
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Button className="btn-emerald-bg">Book A Call</Button>
          </div>
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default Customisation;
