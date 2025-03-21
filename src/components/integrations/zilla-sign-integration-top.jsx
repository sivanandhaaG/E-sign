import { Card } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import "../../components/culture/culture.css"
const ZillasignIntegrationTop = () => {
  return (
    <div className="zila-sign-int-top-wrapper ">
      <div className="d-flex justify-content-between row">
        <Card
          className="col-sm d-flex justify-content-center align-items center"
          shadow={"none"}
        >
          <div className="zila-sign-int-top-c">
            <p className="static-subheading m-1">ZillaEsign integrations</p>{" "}
            <p className="static-page-main-heading">
              Streamline your process with our 900+ integrations
            </p>
            <p className="static-para mb-2">
              Connect and extend your workflows with pre-built integrations and
              award-winning APIs.
            </p>
            <div className="d-flex justify-content-start">
              <Button className="action-aboutus" type="button" variant="primary">
                Contact Salse
              </Button>
            </div>
          </div>
        </Card>
        <Card className="col-sm zila-sign-int-top-c p-1" shadow={"none"}>
          <img
            src="https://images.ctfassets.net/0jnmtsdzg6p5/33OtxzMvBihrfuljadfwt5/cc9c49ccd279c2661ee001da93c91c23/875590436_1.png?fm=webp&q=50"
            alt="description"
            className="rounded"
            style={{
              height: "600px",
              objectFit: "cover",
              maxWidth: "inherit",
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default ZillasignIntegrationTop;
