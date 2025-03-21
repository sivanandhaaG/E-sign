import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { DeleteFolder } from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";

const DeleteModal = ({ show, folderName, onClose, onDeleteSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      // Call the delete API
      const response = await DeleteFolder(); // Assuming the API returns a response with a message
      console.log(`Deleted Folder: ${folderName}`);

      // Display success message
      toast.success(response.message || "Folder deleted successfully!");

      // Call onDeleteSuccess passed from MyFolders
      onDeleteSuccess();
    } catch (error) {
      console.error("Error deleting folder:", error);

      // Display error message
      toast.error(error.response?.data?.message || "Failed to delete folder. Please try again.");
    } finally {
      setLoading(false);
      onClose(); // Close modal after deletion
      localStorage.removeItem("deletefolderId"); // Clear storage
    }
  };

  return (
    <Modal
      show={show}
      onHide={onClose}
      centered
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Modal.Header closeButton style={{ padding: "1rem" }}>
        <Modal.Title style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
          Delete Confirmation
        </Modal.Title>
      </Modal.Header>

      <Modal.Body style={{ padding: "1rem", textAlign: "center" }}>
        <p style={{ fontSize: "1rem", color: "#6c757d" }}>
          Are you sure you want to delete the folder{" "}
          <strong style={{ color: "#dc3545" }}>{folderName}</strong>?
        </p>
      </Modal.Body>

      <Modal.Footer
        style={{
          borderTop: "none",
          justifyContent: "center",
          padding: "0rem 1rem 1rem 1rem",
        }}
      >
        <Button
          variant="secondary"
          onClick={onClose}
          disabled={loading}
          style={{
            borderRadius: "8px",
            padding: "0.5rem 1.5rem",
            fontWeight: "500",
            fontSize: "0.9rem",
          }}
        >
          No
        </Button>
        <Button
          variant="danger"
          onClick={handleConfirmDelete}
          disabled={loading}
          style={{
            marginLeft: "1rem",
            borderRadius: "8px",
            padding: "0.5rem 1.5rem",
            fontWeight: "500",
            fontSize: "0.9rem",
          }}
        >
          {loading ? "Deleting..." : "Yes"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;