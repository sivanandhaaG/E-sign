import { Button, Form, Modal, Spinner } from "react-bootstrap";
import { AddToFolder, GetFolderListDropDown } from "../../../app/api/userApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const FolderModal = ({ show, onHide, onConfirm, userId, docId, docName }) => {
  const [selectedFolder, setSelectedFolder] = useState("");
  const [FolderData, setFolderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (event) => {
    setSelectedFolder(event.target.value);
  };

  const handleFolderList = async () => {
    setLoading(true);
    try {
      const userString = localStorage.getItem("user");
      if (userString) {
        const userObject = JSON.parse(userString);
        const userId = userObject?.userId;
        console.log("Stored Login User ID:", userId);

        if (userId) {
          const response = await GetFolderListDropDown(userId);
          setFolderData(response.data);

          if (response.status === 200) {
            console.log(response.data);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching document details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFolder = async () => {
    try {
      const response = await AddToFolder({
        userId,
        documentName: docName,
        documentId: docId,
        folderId: FolderData?.folders?.find(
          (item) => item.folderName === selectedFolder
        )?.folderId,
      });

      if (response?.data?.status === 200 || 201) {
        console.log("toast success");
        toast.success("Document added successfully!");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    } finally {
      onHide();
    }
  };

  return (
   <>
    <Modal
      show={show}
      onHide={onHide}
      size="md"
      centered
      height="100%"
      onEntered={handleFolderList}
      backdrop="static"
      backdropClassName="transparent-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>Add To Folder</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", justifyContent: "center" }}>
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Form.Group controlId="folderSelect">
            <Form.Select
              value={selectedFolder}
              onChange={handleSelectChange}
              style={{ width: "250px" }}
            >
              <option value="" disabled>
                Select Folder
              </option>
              {FolderData?.folders?.map((item, index) => (
                <option key={index} value={item.folderName}>
                  {item.folderName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleAddToFolder}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
     <Toaster
                        toastOptions={{
                          duration: 4000,
                          closeButton: true,
                        }}
                      />
   </>
  );
};

export default FolderModal;
