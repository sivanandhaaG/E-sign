import { Card } from "react-bootstrap";
import CenterHeading from "../reusablecomponents/CenterHeading";

const Featuredintegrations = () => {
  return (
    <div>
      <CenterHeading
        heading={"Featured integrations for insurance"}
        subheading={""}
      />
      <div className="cards-wrapper">
        <Card className="featured-card">
          <img src="//images.ctfassets.net/0jnmtsdzg6p5/57mA3PRMWQjR0ZTH432JrF/6eef1daafa200ca0ed0cbeedf9ea0612/Salesforce_Logo_-_Retail_LOB_Page.svg" />
        </Card>
        <Card>
          <img src="//images.ctfassets.net/0jnmtsdzg6p5/55w9KNmtbrxcYbecyvF32/828f996528b252e5f314f9ead29b00fa/integration_guidewire.svg" />
        </Card>
        <Card>
          <img src="//images.ctfassets.net/0jnmtsdzg6p5/4C7iMRpTtBKOoo8SXXHHU1/681cf773de2242f73085d829e115f359/Vertafone.png" />
        </Card>
        <Card>
          <img src="//images.ctfassets.net/0jnmtsdzg6p5/4Q2GqcKVIssCV3ltLNconf/36b364975874c63107269d85ce762c1a/integration_applied.svg" />
        </Card>
      </div>
    </div>
  );
};

export default Featuredintegrations;
