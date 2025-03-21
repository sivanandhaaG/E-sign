import React, { useEffect } from "react";

const UserSignature = ({ markerData, setFormData, formData }) => {
  console.log(markerData.fileUrl, "markerData");

  const { signature, name, fileUrl } = markerData;

  useEffect(() => {
    if (formData) {
      formData[markerData.markerId] = {
        markerId: markerData.markerId,
        markerType: "image",
        data: signature || fileUrl,
      };
      setFormData(formData);
    }
  }, []);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={signature || fileUrl}
        alt={`${name}'s Signature`}
        style={{ width: "150px", height: "40px", objectFit: "contain" }}
      />

      <div
        style={{ fontWeight: "bold", marginBottom: "5px", marginTop: "0.5rem" }}
      >
        {name}
      </div>
    </div>
  );
};

export default UserSignature;
