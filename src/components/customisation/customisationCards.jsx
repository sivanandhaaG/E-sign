import { Card } from "react-bootstrap";

const CustomisationCards = (props) => {
  return (
    <div className="custom-cards">
      {props.cardName1 === "custom-card-1" ? (
        <Card className="custom-card-1">
          <h1>{props?.text}</h1>
          <>{props.content}</>
        </Card>
      ) : (
        <Card className="custom-card-2">
          <img src={props?.image} />
        </Card>
      )}
      {props.cardName2 === "custom-card-2" ? (
        <Card className="custom-card-2">
            <div>
                {props.content2}
            </div>
          <img src={props?.image} />
        </Card>
      ) : (
        <Card className="custom-card-1">
          <h1>{props?.text}</h1>
          <>{props.content}</>
        </Card>
      )}
    </div>
  );
};

export default CustomisationCards;
