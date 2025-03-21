import Forword from "../../assets/images/general/forward.svg";
const BannerTop = () => {
  return (
    <div className="banner-top">
      <div
        onClick={() => {}}
        className="d-flex justify-content-center"
      >
        <span>
          ZillaEsign announces Lexion acquisition! Learn how this accelerates our
          IAM vision
        </span>
        <span className="forwed-icon">
          <img src={Forword} alt="myIcon" />
        </span>
      </div>
    </div>
  );
};

export default BannerTop;
