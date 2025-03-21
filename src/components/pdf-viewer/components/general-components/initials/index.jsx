import React from "react";
import "./index.css";

const Initials = ({ formData, setFormData, markerData, receiver }) => {
  const onClickIntialsHandler = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [markerData.markerId]: {
        markerId: markerData.markerId,
        markerType: "text",
        data: receiver.name,
      },
    }));
  };

  return (
    <>
      {formData[markerData.markerId]?.data ? (
        <div>{formData[markerData.markerId].data}</div>
      ) : (
        <div className="intials" onClick={onClickIntialsHandler}>
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            Click to add initials
          </div>
        </div>
      )}
    </>
  );
};

export default Initials;


