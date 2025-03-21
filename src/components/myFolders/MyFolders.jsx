import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Form,
} from "react-bootstrap";
import {
  FolderFill,
  PencilFill,
  TrashFill,
  ChevronDown,
} from "react-bootstrap-icons";
import FolderModal from "./FolderModal";
import DeleteModal from "./DeleteModal";
import NodataSVG from "../../../src/assets/svg/NoData/nodata.svg";
import { GetFolderList } from "../../app/api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedFolder } from "../../app/reducers/myFolders/folderSlice";
import Loader from "../common/Loader/Loader";

const MyFolders = () => {
  const [showModal, setShowModal] = useState(false);
  const [hoveredFolder, setHoveredFolder] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [folderToDelete, setFolderToDelete] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [folderDescription, setFolderDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [folderData, setFolderData] = useState([]); // State for folder data
  const [folderId, setFolderId] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  const dispatch = useDispatch(); // Import the useDispatch hook
  const navigate = useNavigate();

  const documentOptions = [
    "Document 1",
    "Document 2",
    "Document 3",
    "Document 4",
  ];
  console.log(folderData, "folderData");

  useEffect(() => {
    const fetchFolderList = async () => {
      setLoading(true);
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          if (userId) {
            const response = await GetFolderList(userId);
            setFolderData(response?.folders);
          }
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchFolderList();
  }, []);

  const handleSave = async () => {
    if (isEditMode) {
      console.log("Editing Folder:", folderName);
    } else {
      console.log("Creating New Folder:", folderName);
    }
    console.log("Folder Description:", folderDescription);
    console.log("Selected Documents:", selectedDocuments);

    setShowModal(false);
    setIsEditMode(false);
    setFolderName("");
    setFolderDescription("");
    setSelectedDocuments([]);

    // Refetch folder list after saving
    const fetchFolderList = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          if (userId) {
            const response = await GetFolderList(userId);

            setFolderData(response?.folders);
          }
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
      }
    };

    fetchFolderList();
  };

  const handleEdit = (folder, event) => {
    event.stopPropagation(); // Stop event propagation
    setIsEditMode(true);
    setFolderId(folder.folderId);
    localStorage.setItem("folderId", folder.folderId);

    setFolderName(folder.folderName); // Pre-fill folder name
    setFolderDescription(folder.folderDescription); // Pre-fill description
    setShowModal(true); // Show the modal
  };

  const handleDelete = (folder, event) => {
    event.stopPropagation(); // Stop event propagation
    setFolderToDelete(folder);
    localStorage.setItem("deletefolderId", folder.folderId); // Store the folderId in localStorage
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    console.log(`Deleted Folder: ${folderToDelete.folderName}`);
    setShowDeleteModal(false);
    setFolderToDelete(null);

    // Refetch folder list after deletion
    const fetchFolderList = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          if (userId) {
            const response = await GetFolderList(userId);

            setFolderData(response?.folders);
          }
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
      }
    };

    fetchFolderList();
  };

  const handleFolderClick = (folder) => {
    console.log("Clicked Folder:", folder);
    localStorage.setItem("FolderDetailID", folder.folderId);
    dispatch(setSelectedFolder(folder)); // Dispatch selected folder data
    navigate("/folderdetails");
  };

  const handleDeleteSuccess = () => {
    setShowDeleteModal(false);
    setFolderToDelete(null);

    const fetchFolderList = async () => {
      try {
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          if (userId) {
            const response = await GetFolderList(userId);

            setFolderData(response?.folders);
          }
        }
      } catch (error) {
        console.error("Error fetching folder data:", error);
      }
    };

    fetchFolderList();
  };

  return (
    <Container style={{ marginTop: "2rem", padding: "0 0.5rem" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5>{isEditMode ? "Edit Folder" : "My Folders"}</h5>
        <Button
          variant="primary"
          className="px-4"
          onClick={() => {
            setIsEditMode(false);
            setShowModal(true);
          }}
        >
          Create New Folder
        </Button>
      </div>

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : folderData.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            fontSize: "1.5rem",
            color: "#6c757d",
          }}
        >
          <img
            src={NodataSVG}
            alt="No Data"
            style={{ height: "250px", marginTop: "7rem" }}
          />
        </div>
      ) : (
        <Row className="mt-2">
          {folderData.map((folder) => (
            <Col key={folder.folderId} sm={6} md={4} lg={3} className="mb-4">
              <Card
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  borderColor: "rgba(129, 151, 224, 0.58)",
                }}
                onMouseEnter={() => setHoveredFolder(folder.folderId)}
                onMouseLeave={() => setHoveredFolder(null)}
                onClick={() => handleFolderClick(folder)}
              >
                <Card.Body
                  className="d-flex align-items-center justify-content-between"
                  style={{
                    height: "50px",
                    backgroundColor: "#fff",
                    color: "#2D62ED",
                    fontWeight: "500",
                    fontSize: "0.8rem",
                    borderRadius: "12px",
                    padding: "0 10px",
                    transition: "background 0.3s",
                    cursor: "pointer",
                  }}
                >
                  <div className="d-flex align-items-center">
                    <FolderFill size={24} className="me-2" />
                    {folder.folderName}
                  </div>
                  {hoveredFolder === folder.folderId && (
                    <div className="d-flex gap-2">
                      <PencilFill
                        size={18}
                        style={{ cursor: "pointer", color: "#2D62ED" }}
                        onClick={(event) => handleEdit(folder, event)}
                      />
                      <TrashFill
                        size={18}
                        style={{
                          cursor: "pointer",
                          color: "rgba(220, 61, 61, 0.88)",
                        }}
                        onClick={(event) => handleDelete(folder, event)}
                      />
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <FolderModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        folderId={folderId}
        folderName={folderName}
        setFolderName={setFolderName}
        folderDescription={folderDescription}
        setFolderDescription={setFolderDescription}
        selectedDocuments={selectedDocuments}
        setSelectedDocuments={setSelectedDocuments}
        documentOptions={documentOptions}
        mode={isEditMode ? "edit" : "create"}
        modalTitle={isEditMode ? "Edit Folder" : "Create New Folder"}
      />

      <DeleteModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        folderName={folderToDelete ? folderToDelete.folderName : ""}
        onDeleteSuccess={handleDeleteSuccess}
      />
    </Container>
  );
};

export default MyFolders;
