import React, { useEffect, useState } from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { ChevronDown, X } from "react-bootstrap-icons";
import {
  CreateFolders,
  EditFolder,
  getAllEsignRequest,
} from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { GetDocumentListByFolder } from "../../app/api/userApi";

const FolderModal = ({
  mode,
  show,
  onClose,
  onSave,
  folderId,
  folderName,
  setFolderName,
  folderDescription,
  setFolderDescription,
  selectedDocuments,
  setSelectedDocuments,
  documentOptions,
  modalTitle,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [documentOptionDropdown, setDocumentOptions] = useState([]);

  useEffect(() => {
    if (show) {
      if (mode === "create") {
        setFolderName("");
        setFolderDescription("");
        setSelectedDocuments([]); // ✅ Clear selected documents
        fetchAllDocuments(); // ✅ Fetch all available documents for create mode
      } else if (mode === "edit" && folderId) {
        fetchEsignRequests(); // ✅ Fetch documents only for edit mode
      }
    }
  }, [show, mode, folderId]);

  const storedLoginUser = localStorage.getItem("user");
  let storedLoginUserID = null;

  if (storedLoginUser) {
    try {
      const parsedUser = JSON.parse(storedLoginUser);
      storedLoginUserID = parsedUser?.userId || null;
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }

  //fetch all documents
  const fetchAllDocuments = async () => {
    try {
      const response = await getAllEsignRequest();
      let allDocuments =
        response?.data?.eSignRequests.map((item) => ({
          documentId: item.documentDetails?.documentId,
          documentName: item.documentDetails?.documentName,
        })) || [];

      setDocumentOptions(allDocuments); // ✅ Show all documents in dropdown
    } catch (error) {
      console.error("Error fetching all documents:", error);
    }
  };

  //fetch and filter existing docs
  const fetchEsignRequests = async () => {
    try {
      if (mode !== "edit" || !folderId) return; // ✅ Prevent unnecessary calls

      const response = await getAllEsignRequest();
      let allDocuments =
        response?.data?.eSignRequests.map((item) => ({
          documentId: item.documentDetails?.documentId,
          documentName: item.documentDetails?.documentName,
        })) || [];

      // Fetch documents already in the folder
      const folderResponse = await GetDocumentListByFolder(folderId);
      let folderDocuments = [];

      if (folderResponse && folderResponse.mergedFolders.length > 0) {
        const folder = folderResponse.mergedFolders[0];

        folderDocuments = folder.documents.map((doc) => ({
          documentId: doc.documentId,
          documentName: doc.documentName,
        }));

        setFolderName(folder.folderName);
        setSelectedDocuments(folderDocuments); // ✅ Pre-select existing documents
      }

      // Remove documents that are already in the folder
      const filteredDocuments = allDocuments.filter(
        (doc) =>
          !folderDocuments.some(
            (folderDoc) => folderDoc.documentId === doc.documentId
          )
      );

      setDocumentOptions(filteredDocuments); // ✅ Set available documents in dropdown
    } catch (error) {
      console.error("Error fetching Esign requests:", error);
    }
  };

  const handleSave = async () => {
    if (!folderName.trim()) {
      setError("Folder name is required.");
      return;
    }

    setError("");
    setIsSaving(true);

    const formattedDocuments = selectedDocuments.map((doc) => ({
      documentId: doc.documentId,
      documentName: doc.documentName,
    }));

    const payload = {
      folderId: folderId || undefined,
      folderName: folderName,
      folderDescription: folderDescription,
      documents: formattedDocuments,
      userId: storedLoginUserID,
    };

    try {
      let response;
      if (modalTitle === "Edit Folder") {
        response = await EditFolder(payload);
      } else {
        response = await CreateFolders(payload);
      }

      toast.success(response.message || "Operation successful!");
      onSave(response);
      onClose();
    } catch (err) {
      console.error("Error in folder operation:", err);
      toast.error(
        err.response?.data?.message ||
          "Failed to process request. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDocumentSelect = (doc) => {
    if (!selectedDocuments.some((d) => d.documentId === doc.documentId)) {
      setSelectedDocuments([...selectedDocuments, doc]);
    }
    setDropdownOpen(false);
  };

  const handleRemoveDocument = (doc) => {
    setSelectedDocuments(
      selectedDocuments.filter((item) => item.documentId !== doc.documentId)
    );
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="border-bottom-0">
        <Modal.Title className="fw-bold">
          {modalTitle || "Folder Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="folderName">
            <Form.Label className="fw-medium">Folder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              isInvalid={!!error}
              className="rounded-3"
            />
            {error && <div className="text-danger mt-1">{error}</div>}
          </Form.Group>

          <Form.Group className="mb-4" controlId="folderDescription">
            <Form.Label className="fw-medium">Folder Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter folder description"
              value={folderDescription}
              onChange={(e) => setFolderDescription(e.target.value)}
              className="rounded-3"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="documentInput">
            <Form.Label className="fw-medium">Documents</Form.Label>
            <div style={{ position: "relative" }}>
              <Form.Control
                type="text"
                placeholder="Select documents"
                readOnly
                value={selectedDocuments
                  .map((doc) => doc.documentName)
                  .join(", ")}
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{ cursor: "pointer" }}
                className="rounded-3"
              />
              <ChevronDown
                size={20}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={() => setDropdownOpen((prev) => !prev)}
              />
              {dropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    maxHeight: "150px",
                    overflowY: "auto",
                    border: "1px solid #ddd",
                    backgroundColor: "white",
                    zIndex: 1000,
                    borderRadius: "8px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {documentOptionDropdown.length > 0 ? (
                    documentOptionDropdown.map((doc) => (
                      <div
                        key={doc.documentId}
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                          borderBottom: "1px solid #eee",
                        }}
                        onClick={() => handleDocumentSelect(doc)}
                      >
                        {doc.documentName}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "8px 12px" }}>
                      No documents available
                    </div>
                  )}
                </div>
              )}
            </div>

            {selectedDocuments.length > 0 && (
              <div className="mt-3 d-flex flex-wrap gap-2">
                {selectedDocuments.map((doc) => (
                  <span
                    key={doc.documentId}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 12px",
                      backgroundColor: "#e9ecef",
                      color: "#333",
                      borderRadius: "20px",
                      cursor: "pointer",
                      fontSize: "14px",
                      gap: "6px",
                    }}
                    onClick={() => handleRemoveDocument(doc)}
                  >
                    {doc.documentName} <X size={12} />
                  </span>
                ))}
              </div>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="border-top-0">
        <Button
          variant="light"
          onClick={onClose}
          className="rounded-3 px-4"
          style={{ border: "1px solid #ddd" }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSave}
          className="rounded-3 px-4 d-flex align-items-center justify-content-center"
          disabled={isSaving}
        >
          {isSaving ? (
            <Spinner
              animation="border"
              size="sm"
              role="status"
              className="me-2"
            />
          ) : null}
          {modalTitle === "Edit" ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FolderModal;
