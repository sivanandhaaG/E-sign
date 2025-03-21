import moment from "moment/moment";
import PropTypes from "prop-types";
import { Button, Spinner } from "react-bootstrap";
import { Tooltip } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import NoDataFound from "../../assets/images/general/NoDataFound.png";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import { resendESignRequest } from "../../app/api/userApi";
import Form from "react-bootstrap/Form";
import { GetFolderListDropDown } from "../../app/api/userApi";
import { AddToFolder } from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { ViewDetails } from "../../app/api/userApi";
import { archieveDocument } from "../../app/api/userApi";

const MyVerticallyCenteredModal = ({ show, onHide, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      backdrop="static"
      centered
      backdropClassName="transparent-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Archive</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to archive this document? This action cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Archive
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
  );
};

const folderData = [
  { folderName: "Folder 1" },
  { folderName: "Folder 2" },
  { folderName: "Folder 3" },
  { folderName: "Folder 4" },
  { folderName: "Folder 5" },
];

const TableBody = ({
  tableData,
  setActiveDocument,
  activitieRow,
  currentPage,
  rowsPerPage,
  addRecipient,
  download,
  AddToFolder,
  addToFolder,
  mutations,
}) => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [folderModal, setFolderModal] = useState(false);
  const [documentDetails, setDocumentDetails] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedUserid, setSelectedUserId] = useState(null);
  const [selectedDocumentName, setSelectedDocumentName] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const isArchived = new URLSearchParams(location.search).has("archieved");
  const showStatus = (status) => {
    if (status === "COMPLETED") {
      return "Signed";
    } else if (status === "EXPIRED") {
      return "Expired";
    } else if (status === "PENDING") {
      return "Not Yet Signed";
    }
  };
  const archieveDocumentss = (documentId, userId) => {
    try {
      const response = archieveDocument(documentId, userId);
      if (response?.data?.status === 200 || 201) {
        toast.success("Document Archived Successfully!");
      }
      return response.data;
    } catch (error) {
      console.error("Error archiving document:", error);
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleRedirect = (id) => {
    navigate(`/sender?mode=add-recipient/${id}`);
  };

  const resend = async (eSignRequestId, documentName) => {
    try {
      const response = await resendESignRequest({
        eSignRequestId,
        documentName,
      });
      if (response?.status === true) {
        toast.success("Email has Sent Successfully");
      }
      return response;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  const handleFolderModal = () => {
    setFolderModal(true);
  };

  const handleDocumentDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const getMenuItems = (data) => {
    const location = useLocation();
    if (location.pathname === "/documents/archieved") {
      return <>No Actions</>;
    }
    switch (data?.status) {
      case "PENDING":
        return (
          <>
            <MenuItem onClick={() => handleDocumentDetails(data?.documentId)}>
              View
            </MenuItem>
            <MenuItem
              onClick={() =>
                resend(
                  data?.eSignRequestId,
                  data?.documentDetails?.documentName
                )
              }
            >
              Resend
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedDocumentId(data?.documentId);
                setModalShow(true);
              }}
            >
              Archive
            </MenuItem>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onConfirm={() => {
                archieveDocumentss(selectedDocumentId, data?.userId);
                setModalShow(false);
              }}
            />
            <MenuItem onClick={() => handleRedirect(data?.documentId)}>
              Add Recipient
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedUserId(data?.userId);
                setSelectedDocumentId(data?.documentId);
                setSelectedDocumentName(data?.documentDetails?.documentName);
                setFolderModal(true);
              }}
            >
              Add to Folder
            </MenuItem>
            <FolderModal
              show={folderModal}
              onHide={() => setFolderModal(false)}
              userId={selectedUserid}
              docId={selectedDocumentId}
              docName={selectedDocumentName}
            />
          </>
        );

      case "COMPLETED":
        return (
          <>
            <MenuItem onClick={() => handleDocumentDetails(data?.documentId)}>
              View
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedDocumentId(data?.documentId);
                setModalShow(true);
              }}
            >
              Archive
            </MenuItem>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              onConfirm={() => {
                archieveDocumentss(selectedDocumentId, data?.userId);
                setModalShow(false);
              }}
            />
            <MenuItem
              onClick={() => window.open(data?.editedDocumentFileUrl, "_blank")}
            >
              Download
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectedUserId(data?.userId);
                setSelectedDocumentId(data?.documentId);
                setSelectedDocumentName(data?.documentDetails?.documentName);
                setFolderModal(true);
              }}
            >
              Add to Folder
            </MenuItem>
            <FolderModal
              show={folderModal}
              onHide={() => setFolderModal(false)}
              userId={selectedUserid}
              docId={selectedDocumentId}
              docName={selectedDocumentName}
            />
          </>
        );

      case "RECEIVED":
      case "ARCHIEVED":
        return null;

      default:
        return <>No Actions</>;
    }
  };

  console.log(tableData, "tableData");
  return (
    <tbody>
      {tableData?.length > 0 ? (
        tableData?.map((data, index) => {
          const emails =
            data.receivers?.map((receiver) => receiver.email) || [];
          const displayEmails = emails.slice(0, 1);
          const remainingCount = emails.length - 1;

          return (
            <tr
              key={data?.id}
              className={`table-column ${
                activitieRow?._id === data?._id && "active-column"
              }`}
              onClick={() => {
                setActiveDocument(data);
              }}
              id="DashboardTableRow"
            >
              {/* <td>
                <span className="column-text">
                  {(currentPage - 1) * rowsPerPage + index + 1}
                </span>
              </td> */}
              <td style={{ textAlign: "center" }}>
                <span
                  className="column-text"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDocumentDetails(data?.documentId)}
                >
                  {data?.documentName ||
                    data?.documentDetails?.documentName ||
                    "N/A"}{" "}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {data?.documentDetails?.documentReferenceNumber ||
                    data?.documentReferenceNumber ||
                    "N/A"}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {data?.receivers?.length || "-"}{" "}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {data?.receivers?.length || "-"}{" "}
                </span>
              </td>
              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {data.receivers && data.receivers.length > 0 ? (
                    data.receivers.map((receiver, index) => (
                      <p key={index} style={{ textAlign: "center" }}>
                        {receiver?.name || "-"}
                      </p>
                    ))
                  ) : (
                    <p style={{ textAlign: "center" }}>-</p>
                  )}
                </span>
              </td>

              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {displayEmails?.length > 0 ? (
                    displayEmails.map((email, i) => (
                      <span
                        key={i}
                        style={{
                          display: "block",
                          textAlign: "center",
                          marginBottom: "5px",
                        }}
                      >
                        {email || "-"}
                      </span>
                    ))
                  ) : (
                    <span style={{ textAlign: "center", color: "gray" }}>
                      -
                    </span>
                  )}

                  {remainingCount > 0 && (
                    <Tooltip
                      hasArrow
                      aria-label="Email List"
                      placement="top"
                      bg="gray.600"
                      color="white"
                      p={2}
                      borderRadius="5px"
                      label={
                        <div style={{ textAlign: "left" }}>
                          {emails.map((email, i) => (
                            <div key={i}>{email || "-"}</div>
                          ))}
                        </div>
                      }
                    >
                      <span style={{ color: "blue", cursor: "pointer" }}>
                        +{remainingCount} more
                      </span>
                    </Tooltip>
                  )}
                </span>
              </td>

              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                {data?.documentDetails?.fileUrl ? (
                  <a
                    href={data.documentDetails.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "red",
                      fontSize: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaFilePdf />
                  </a>
                ) : (
                  <span style={{ color: "gray" }}>-</span>
                )}
              </td>

              <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                <p
                  className={
                    data?.status === "COMPLETED"
                      ? "signed-css"
                      : data?.status === "Expired"
                      ? "expired-css"
                      : data?.status === "PENDING"
                      ? "not-signed-css"
                      : data?.status === "EXPIRED"
                      ? "expired-css"
                      : "unknown-css"
                  }
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    color: data?.status ? "inherit" : "gray",
                  }}
                >
                  {showStatus(data?.status) || "-"}
                </p>
              </td>

              <td style={{ textAlign: "center" }}>
                <span className="column-text">
                  {data?.updatedAt
                    ? moment(data.updatedAt).format("Do MMM YYYY, hh:mm a")
                    : "-"}
                </span>
              </td>

              <td
                style={{
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<FiMoreVertical />}
                    variant="ghost"
                    _hover={{ bg: "gray.100" }}
                    _active={{ bg: "gray.200" }}
                  />
                  <MenuList>{getMenuItems(data)}</MenuList>
                </Menu>
              </td>
            </tr>
          );
        })
      ) : (
        <tr>
          <td
            colSpan={10}
            style={{
              textAlign: "center",
              padding: "20px",
              fontSize: "16px",
              fontWeight: "bold",
              color: "gray",
            }}
          >
            {/* No data found */}
            <div
              style={{
                border: "2px solid #f0f0f0",
                padding: "20px",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <img src={NoDataFound} alt="" className="border-2" />
                <p>No data found</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tablecolumn: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveDocument: PropTypes.func,
  activitieRow: PropTypes.func,
};
export default TableBody;
