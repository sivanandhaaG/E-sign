import { Button, Card } from "react-bootstrap";
import "./microfinance.css";
import Logo from "../../assets/logo/logo.svg";
import { FaHeart } from "react-icons/fa";
import ContactForm from "../culture/contact-form";

const Microfinance = () => {
  return (
    <div className="microfinance-main">
      <div className="microfinance-container">
        <div>
          <h1>
            Accelerate your MFI and microlending operations with Zerozilla’s
            digital paperwork transformation
          </h1>
          <p>
            Join top Indian MFIs like IIFL Samasta, Satin Creditcare and Muthoot
            Microfin who have accelerated loan book growth and saved hundreds of
            man-hours per day while ensuring 100% paperwork compliance digitally
          </p>
          <div className="d-flex gap-2">
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
        </div>
        <div>
          <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/65a7a4b4380ad549730f2ca5_MFI-frame2-left.png" />
        </div>
      </div>
      <div className="sponsor-c">
        <div className="sponsor-container">
          <div className="scroll-content">
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
            <div className="summary-h4">
              {`"Honestly, I didn't even know such a workplace existed until I
              experienced it. It's a very positive, employee-friendly
              environment. The opportunities and growth possibilities seem
              endless. Monday blues are not even a thing anymore."`}
            </div>
            <div className="d-flex align-items-center m-1">
              <div className="profile">
                <h4>Asmita Kalra</h4>
                <p>Associate Director - Customer Successe</p>
                <Button variant="link" className="p-0">Read Case Study</Button>
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
      <div className="microfinance-cards-c">
        <Card>
          <h1>
            Collect signatures from customers and business correspondents
            through a variety of eSign options
          </h1>
          <div>
            <div className="grid-c">
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
              <div className="d-flex align-items-center">
                <FaHeart className="m-1" />
                <span>Aadhaar eSign via Biometric</span>
              </div>
            </div>
          </div>
        </Card>
        <Card className="image">
          <img src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef39eb39756412c9f4e60_Screenshot%202023-11-14%20at%2012.31.04%20PM.webp" />
        </Card>
        <Card>
          <h1>
            Prevent document fraud during the digital journey and ensure easy
            document audits for your digital documents
          </h1>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 mt-4">
              <FaHeart />
              <p> AI Powered Face Match</p>
            </div>
            <span>Ensure that the correct signer is signing</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 mt-4">
              <FaHeart />
              <p> Geofencing</p>
            </div>
            <span>Prevent signing from happening outside your branch</span>
          </div>
          <div className="d-flex flex-column">
            <div className="d-flex gap-2 mt-4">
              <FaHeart />
              <p>Aadhaar Certificate Verification</p>
            </div>{" "}
            <span>
              Prevent signers from using someone else’s Aadhaar to sign
            </span>
          </div>
        </Card>
        <Card className="image">
          <img src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef39eb39756412c9f4e60_Screenshot%202023-11-14%20at%2012.31.04%20PM.webp" />
        </Card>
      </div>
      <div className="values-conatiner">
        <h1 className="d-flex justify-content-center culture-container-h1 text-center">
          Indian microfinance institutions are seeing fantastic business results
          after switching to Zerozilla driven paperwork
        </h1>
      </div>
      <div className="values-card-wrapper pb-5">
        {[1, 2, 3, 4, 5].map((items, index) => {
          return (
            <Card key={index} className="values-card">
              <FaHeart />
              <h2 className="m-0">Grow your loan book faster</h2>
              <p>Achieve 30-40% higher disbursals daily</p>
            </Card>
          );
        })}
      </div>
      <div className="microfinance-cards-2">
        <Card>
          <div>
            <img src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef39eb39756412c9f4e4c_iifl-case-study-card.svg" />
          </div>
          <span> IIFL Samasta Finance Limited</span>
          <Button className="zila-sign-int-patners-learn-more" variant="link">
            Read more
          </Button>
        </Card>
        <Card>
          <div>
            <img src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef39eb39756412c9f4e49_card-image-wrapper.svg" />
          </div>
          <span>TATA Capital housing finance limited</span>
          <Button className="zila-sign-int-patners-learn-more" variant="link">
            Read more
          </Button>
        </Card>
      </div>
      <div className="microfinance-cards-3">
        <Card>
          <Card>
            <h1>
              Integrate with our API in days with minimal IT/tech involvement
            </h1>
            <p>
              Business teams can directly change and configure the API flow on
              the dashboard. IT/tech teams only need to integrate a low code
              payload - and you’re ready to go.
            </p>

            <p className="json-text">
              {`+ “neslData”: { ... }, + “invitees”: [ ... ], + “cc”: [ ... ], “irn”: “string” }`}
            </p>
            <p className="typing-effect">{`+ “neslData”: { ... }, + “invitees”: [ ... ], + “cc”: [ ... ], “irn”: “string” }`}</p>
          </Card>
        </Card>
        <Card className="microfinance-card-indigo">
          <Card>
            <h1>
              Skip the integration altogether with our ready-made
              pre-integrations{" "}
            </h1>
            <p>
              If you already use any of the below eKYC and LOS/LMS softwares -
              then using Zerozilla in an API journey is as easy as flicking a
              switch
            </p>
            <img src="https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/64ef1c69714ed3855e5e6fd8_navplaceholder.jpg" />
          </Card>
        </Card>
      </div>
      <div className="microfinance-card-iframe">
        <h1 className="d-flex justify-content-center culture-container-h1 text-center mb-4">
          See how Dvara KGFS Zerozilla integration looks like in their field
          officer application
        </h1>
        <iframe
          title="Zerozilla"
          height={"600"}
          width={"100%"}
          src="https://www.youtube.com/embed/AtQu5P6SFVk"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded"
        />
      </div>
      <ContactForm />
    </div>
  );
};

export default Microfinance;
