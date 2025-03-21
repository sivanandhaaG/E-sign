import { Button, Card } from "react-bootstrap";
import SponsorswithLogo from "../sponcers/SponsorswithLogo";
import { BsHeart } from "react-icons/bs";
import ContactForm from "../culture/contact-form";

const StockBrokers = () => {
  return (
    <div className="page-container">
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
              Book A Call
            </Button>
            <Button
              size="lg"
              className="btn-emerald-outline"
              variant="outline-success"
            >
              Download Stockbroking Industry Deck{" "}
            </Button>
          </div>
        </div>
        <div>
          <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/65a7a4b4380ad549730f2ca5_MFI-frame2-left.png" />
        </div>
      </div>
      <SponsorswithLogo />
      <div className="stock-brokers-cards">
        <h1>
          Zerozilla offers digital execution features tailor-made for
          stockbrokers when compared to standard eSign connections
        </h1>
        <div className="stock-brokers-cards-main">
          <Card>
            <div>
              <h4>
                Compliant Digital Stamping for DDPI to save you from regulatory
                risk
              </h4>
              <div className="cutsom-color-text">
                <div className="d-flex align-items-center gap-2">
                  <BsHeart />
                  <p>Standard eSign Tool</p>
                </div>

                <p>
                  Stamping is not compliant with IT Act or Indian stamping laws
                </p>
              </div>
              <div className="cutsom-color-text-2">
                <div className="d-flex align-items-center gap-2">
                  <BsHeart />
                  <p>Standard eSign Tool</p>
                </div>
                <p>
                  Stamping is not compliant with IT Act or Indian stamping laws
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <img src="https://cdn.prod.website-files.com/64e5a5b5d0b098fb11be180a/65545d0cb4d0e1c3294b81bc_Compliant%20eSign%20-%20HR.webp" />
          </Card>
          <Card>
            <div>
              <h4>
                Compliant Digital Stamping for DDPI to save you from regulatory
                risk
              </h4>
              <div className="cutsom-color-text">
                <div className="d-flex align-items-center gap-2">
                  <BsHeart />
                  <p>Standard eSign Tool</p>
                </div>

                <p>
                  Stamping is not compliant with IT Act or Indian stamping laws
                </p>
              </div>
              <div className="cutsom-color-text-2">
                <div className="d-flex align-items-center gap-2">
                  <BsHeart />
                  <p>Standard eSign Tool</p>
                </div>
                <p>
                  Stamping is not compliant with IT Act or Indian stamping laws
                </p>
              </div>
            </div>
          </Card>
          <Card>
            <img src="https://cdn.prod.website-files.com/5fef5231c8595fadb2b2a3cf/655ef48c026b1373076526da_Aadhaar%20eSign%20stack.webp" />
          </Card>
        </div>
      </div>
      <ContactForm />
    </div>
  );
};

export default StockBrokers;
