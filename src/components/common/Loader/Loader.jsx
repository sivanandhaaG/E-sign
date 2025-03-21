// Loader.js
// import LoadingGif from "../../../assets/images/general/Website-Loading-gif.webp";
// import LoadingGif from "../../../assets/images/general/Website-Loading-gif1.gif";
import { Spin } from "antd";
import LoadingGif from "../../../assets/images/general/loader.gif";

const Loader = () => {
  const contentStyle = {
    padding: 50,
    // background: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
  };
  const content = <div style={contentStyle} />;
  return (
    <div
      className="LoadingSpinner"
      style={{
        height: "92vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "200px",
        background: "white",
        width: "100%",
      }}
    >
      <div className="" role="status">
        {/* <span className="visually-hidden">Loading...</span> */}
        <Spin tip="Loading..." size="large">
        {content}
      </Spin>
      </div>
    </div>
  );
};

export default Loader;
