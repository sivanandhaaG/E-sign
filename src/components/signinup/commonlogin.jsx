import { Container, Row, Col } from "react-bootstrap";
import { CauroselData, SignupData } from "./signUpData";
import Slider from "react-slick";
import Sing from '../../assets/images/gif-images/sing.gif';
import "./signup.css";


const CommonLoginScroller = () => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    autoPlay: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Container fluid>
      <div className="signup-css mx-0 p-md-5 px-1 py-2 rounded-4">
        <Row className="px-0">
          <Col md={12} className="">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {" "}
              <img
                src={
                  Sing
                }
                style={{
                  width: "200px",
                  // height: "442px",
                  gap: "0px",
                  opacity: " 0px",
                }}
                alt="img"
              />
            </div>
            <p className="signup-title"> {SignupData[0].title} </p>
            <p className="signup-sub-title"> {SignupData[0].subtitle} </p>
          </Col>
        </Row>
        <Row className="mt-4 px-2 px-md-0 py-4 py-md-2 signup-slider-bg">
          <Slider {...settings}>
            {CauroselData.map((item) => {
              const { id, description, name, designation, image } = item;
              return (
                <Col key={id} md={12} className="my-0">
                  <p className="slider-signup-text"> {description} </p>
                  <table>
                    <tbody>
                      <tr className="d-flex justify-content-center">
                        <td>
                          <img src={image} className="w-100" alt="img" />
                        </td>
                        <td className="mt-3">
                          <p className="slider-signup-name ml-2 mb-0 mx-2">
                            {" "}
                            {name}{" "}
                          </p>
                          <p className="slider-signup-designation ml-2 mt-0 mx-2">
                            {" "}
                            {designation}{" "}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              );
            })}
          </Slider>
        </Row>
      </div>
    </Container>
  );
};

export default CommonLoginScroller;
