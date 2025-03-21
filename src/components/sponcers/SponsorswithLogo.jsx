import { Button } from "react-bootstrap";
import Logo from "../../assets/logo/logo.svg";

const SponsorswithLogo = () => {
  return (
    <div>
      <div className="sponsor-c">
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
    </div>
  );
};

export default SponsorswithLogo;
