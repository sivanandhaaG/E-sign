
import { Button, Card } from "react-bootstrap";
import "./culture.css";
import Logo from "../../assets/logo/logo.svg";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FcLikePlaceholder } from "react-icons/fc";
import ContactForm from "./contact-form";
import StartupEmploye from "./startup-employe";

const ZillasignCulture = () => {
  return (
    <div className="culture-c">
      <div className="culture-container">
        <div>
          <div>
            <h1 className="static-page-main-heading">
              Work in a fun, inclusive and high energy environment. Grow your
              career massively
            </h1>
            <p className="culture-container-para">
              At Zerozilla, you can exceed your professional dreams while having
              a lot of fun.
            </p>
            <div className="culture-actions">
              <Button variant="primary" className="action-aboutus">
                Explore Openings
              </Button>
              <Button className="action-aboutus-outlined" variant="outlinde">
                Explore Openings
              </Button>
            </div>
          </div>
          <img
            className="culture-container-img"
            src={
              "https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/655ef2270ca0432ba7000fa9_image%2056.webp"
            }
          />
        </div>
      </div>
      <div className="sponsor-c">
        <h1 className="d-flex justify-content-center align-items-center">
          At Zerozilla, you’ll be helping 2000+ top Indian companies transform
          their paperwork
        </h1>
        <div className="sponsor-container">
          <div className="d-flex scroll-content">
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
            <img
              className="sponsor-image"
              src="https://assets-global.website-files.com/64e5a5b5d0b098fb11be180a/64e5c459dae2e32a9d866a7d_Mask%20group.svg"
            />
          </div>
        </div>
        <div className="sponsor-container-image-content">
          <div>
            <img
              className="culture-avtar"
              src="https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/6566d5937db334699b736fa6__Asmita-culture.webp"
            />
          </div>
          <div className="d-flex flex-column">
            <div className="static-subheading m-2 p-2">
              {`"Honestly, I didn't even know such a workplace existed until I
              experienced it. It's a very positive, employee-friendly
              environment. The opportunities and growth possibilities seem
              endless. Monday blues are not even a thing anymore."`}
            </div>
            <div className="culture-avtar-info">
              <div className="d-flex align-items-center m-1">
                <div className="profile">
                  <h4 className="static-subheading">Asmita Kalra</h4>
                  <p className="static-para-white mb-0">
                    Associate Director - Customer Successe
                  </p>
                  <Button variant="link" className="p-0">
                    Read Case Study
                  </Button>
                </div>
                <img
                  src={Logo}
                  style={{
                    height: "40px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end ">
          <Button className="m-2" size="sm" variant="secondary">
            <FaArrowLeft />
          </Button>
          <Button className="m-2" size="sm" variant="secondary">
            <FaArrowRight />
          </Button>
        </div>
      </div>
      <div className="culture-container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="text-box">
            <h1 className="culture-container-h1 m-0">
              Zerozilla is a category defining company
            </h1>
            <p className="static-para">
              Paperwork is a horrible process for customers and businesses -
              costing time, money and energy.
            </p>
            <p className="culture-container-para">
              Zerozilla is building Document Infrastructure that radically
              transforms the way India does paperwork - turning a terrible
              process into a delightful one that drives fantastic business
              results.
            </p>
          </div>
          <img
            className="culture-container-img"
            src={
              "https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/655ef2270ca0432ba7000faf_image%2060.webp"
            }
          />
        </div>
      </div>
      <div className="culture-container">
        <div className="d-flex justify-content-between align-items-center gap-4">
          <img
            className="culture-container-img"
            src={
              "https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/655ef2270ca0432ba7000fac_image%2058.webp"
            }
          />
          <div className="text-box">
            <h1 className="static-page-main-heading mb-2 m-0">
              The most employee-loved company in India
            </h1>
            <p className="culture-container-para">
              Zerozilla ranked No. 1 with a score of 97 on xto10x’s Employee Net
              Promoter Score Survey (eNPS), among 150+ companies and 52k+
              employees.That’s people working in Zerozilla rating Zerozilla as a
              workplace
            </p>
          </div>
        </div>
      </div>
      <div className="d-flex flex-column ">
        <div className="d-flex justify-content-center">
        <StartupEmploye />

          {/* <img src="https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/655ef2270ca0432ba7000fb3_image%2059.webp" /> */}
        </div>
        <div className="d-flex justify-content-center">
          <img src="https://assets-global.website-files.com/5fef5231c8595fadb2b2a3cf/655ef2270ca0432ba7000faf_image%2060.webp" />
        </div>
      </div>
      <div className="values-conatiner">
        <h1 className="d-flex justify-content-center static-page-main-heading mb-2">
          The values that drive us
        </h1>
        <p className="d-flex justify-content-center culture-container-para">
          Here are the values that drive Zerozilla - and make us a great place
          to work
        </p>
        <div className="values-card-wrapper">
          {[1, 2, 3, 4, 5, 6].map((items, index) => {
            return (
              <Card key={index} className="values-card">
                <FcLikePlaceholder />
                <h2 className="static-subheading">
                  Empathetic and Progressive Culture
                </h2>
                <p>
                  We are creating a highly progressive, open and liberal working
                  environment.
                </p>
              </Card>
            );
          })}
        </div>
      </div>
      <div className="values-conatiner">
        <h1 className="d-flex justify-content-center static-page-main-heading mb-2">
          The values that drive us
        </h1>
        <p className="d-flex justify-content-center culture-container-para">
          Here are the values that drive Zerozilla - and make us a great place
          to work
        </p>
        <div className="values-card-wrapper">
          {[1, 2, 3, 4, 5, 6].map((items, index) => {
            return (
              <Card key={index} className="values-card">
                <FcLikePlaceholder />
                <h2 className="static-subheading">Bi-annual bonuses</h2>
              </Card>
            );
          })}
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default ZillasignCulture;
