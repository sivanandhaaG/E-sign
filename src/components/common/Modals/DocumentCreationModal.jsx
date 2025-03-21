import React from "react";
import { Modal } from "antd";
import documentCreation from "../../../assets/images/gif-images/documentCreation.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

const DocumentCreationModal = ({ visible, onClose }) => {
  const navigate = useNavigate();

  return (
    <Modal
      open={visible}
      onCancel={() => {
        onClose(); 
        navigate("/documents"); 
      }}
      footer={null}
      centered
      maskClosable={false} 
      keyboard={false} 
      maskStyle={{
        backdropFilter: "blur(3px)",
        backgroundColor: "rgba(0, 0, 0, 0.3)", 
      }}
    >
      <div>
        <Lottie style={{ height: "250px" }} animationData={documentCreation} loop={true} />
      </div>
      <div style={{ textAlign: "center", fontSize: "20px", padding: "20px" }}>
        Document Created Successfully! 🎉
      </div>
    </Modal>
  );
};

export default DocumentCreationModal;
