import { Card } from "@chakra-ui/react";
import "./about.css";
import PropTypes from "prop-types";

const Description = ({ subtitle, title, content, actions, image }) => {
  return (
    <div className="description-aboutus-main">
      <Card className="col-sm d-flex justify-content-center" shadow={"none"}>
        <div className="description-aboutus-content">
          <div>
            <p className="static-subheading m-1">{subtitle}</p>
            <p className="static-page-main-heading">{title}</p>
            <p className="static-para light-font">{content}</p>
            <div className="aboutus-action-warpper">{actions}</div>
          </div>
        </div>
      </Card>
      <Card className="col-sm description-about-content" shadow={"none"}>
        <img
          src={image}
          alt="description"
          className="rounded"
          style={{
            height: "auto",
          }}
        />
      </Card>
    </div>
  );
};

Description.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  actions: PropTypes.func,
  image:PropTypes.string
};
export default Description;
