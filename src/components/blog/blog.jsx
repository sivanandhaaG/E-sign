import { Button, Card } from "react-bootstrap";
import "./index.css";
import Logo from "../../assets/logo/logo.svg";

const Blog = () => {
  return (
    <div className="page-container">
      <div className="blog-top-container">
        <h1>What’s New at Zilla e-Sign</h1>
        <div>
          <Card className="col-8">
            <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/657942871069144ecef2c079_SOC2%20Compliance%20Cover.webp" />
            <div>
              <span>December 13, 2023</span>
              <span>
                Why accessible technology is a MUST for Indian consumers
              </span>
            </div>
            <div>
              <div className="d-flex justify-content-between w-100">
                <img src={Logo} alt="logo" height={10} width={100} />
                <div>
                  <Button variant="dark">See more</Button>
                </div>
              </div>
            </div>
          </Card>
          <Card className="col-4">
            <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/657942871069144ecef2c079_SOC2%20Compliance%20Cover.webp" />
            <div>
              <span>December 13, 2023</span>
              <span>
                Why accessible technology is a MUST for Indian consumers
              </span>
            </div>
            <div>
              <div className="d-flex justify-content-between w-100">
                <img src={Logo} alt="logo" height={10} width={100} />
                <div>
                  <Button variant="dark">See more</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="categories">
        <div className="categories-actions-outer">
          <h1>Categories</h1>
          <div className="categories-actions">
            <div>
              <Button className="primary-light" variant="primary" size="sm">
                Automation
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Monthly Roundups
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Digital Stamping
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                NeSL
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Case Studies
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Esign
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Product
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Legal
              </Button>
            </div>
            <div>
              {" "}
              <Button className="primary-light" variant="primary" size="sm">
                Aadhaar eSign
              </Button>
            </div>
          </div>
        </div>
        <div>
          <div className="categories-main">
            <div>
              <Card>
                <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/657942871069144ecef2c079_SOC2%20Compliance%20Cover.webp" />
                <div>
                  <span>December 13, 2023</span>
                  <span>
                    Why accessible technology is a MUST for Indian consumers
                  </span>
                </div>
                <div>
                  <div className="d-flex justify-content-between w-100">
                    <img src={Logo} alt="logo" height={10} width={100} />
                    <div>
                      <Button variant="dark">See more</Button>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/657942871069144ecef2c079_SOC2%20Compliance%20Cover.webp" />
                <div>
                  <span>December 13, 2023</span>
                  <span>
                    Why accessible technology is a MUST for Indian consumers
                  </span>
                </div>
                <div>
                  <div className="d-flex justify-content-between w-100">
                    <img src={Logo} alt="logo" height={10} width={100} />
                    <div>
                      <Button variant="dark">See more</Button>
                    </div>
                  </div>
                </div>
              </Card>
              <Card>
                <img src="https://cdn.prod.website-files.com/5ff41ef56b696d4e73d822ec/657942871069144ecef2c079_SOC2%20Compliance%20Cover.webp" />
                <div>
                  <span>December 13, 2023</span>
                  <span>
                    Why accessible technology is a MUST for Indian consumers
                  </span>
                </div>
                <div>
                  <div className="d-flex justify-content-between w-100">
                    <img src={Logo} alt="logo" height={10} width={100} />
                    <div>
                      <Button variant="dark">See more</Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
