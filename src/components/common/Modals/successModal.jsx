import React from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import SignatureSubmit from "../../../assets/images/gif-images/SignatureSubmit.json";
import Lottie from "lottie-react";

const SuccessModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <Modal
      open={visible}
      onCancel={handleCancel}
      footer={null}
      centered
      maskClosable={false} 
      keyboard={false} 
      maskStyle={{
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)", 
      }}
    >
      <div>
      <Lottie animationData={SignatureSubmit} loop={true} />
    </div>
      <div style={{ textAlign: "center", fontSize: "20px", padding: "20px" }}>
        Thank you, the eSign signature has been successfully submitted. 🎉
      </div>
    </Modal>
  );
};

export default SuccessModal;
