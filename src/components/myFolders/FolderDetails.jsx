import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Card, Pagination } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { GetDocumentListByFolder } from "../../app/api/userApi";
import { FaFilePdf } from "react-icons/fa";

const FolderDetails = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [folderName, setFolderName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await GetDocumentListByFolder();
        if (response && response.mergedFolders.length > 0) {
          const folder = response.mergedFolders[0];
          setFolderName(folder.folderName);

          const formattedDocuments = folder.documents.map((doc, index) => ({
            id: index + 1,
            documentId: doc.documentId || "N/A",
            documentName: doc.documentName || "N/A",
            documentReferenceNumber:
              doc.eSignDetail?.documentReferenceNumber || "N/A",
            receiversCount: doc.eSignDetail?.receivers?.length || 0,
            pendingSignature: doc.eSignDetail?.status || "N/A",
            receiversName:
              doc.eSignDetail?.receivers
                ?.map((receiver) => receiver.name)
                .join(", ") || "N/A",
            emailID:
              doc.eSignDetail?.receivers
                ?.map((receiver) => receiver.email)
                .join(", ") || "N/A",
            documentLink: doc.eSignDetail?.editedDocumentFileUrl || "N/A",
            status: doc.eSignDetail?.status || "N/A",
            date: doc.eSignDetail?.createdAt
              ? new Date(doc.eSignDetail.createdAt).toLocaleString()
              : "N/A",
          }));

          setDocuments(formattedDocuments);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);
  const handleDocumentDetails = (id) => {
    navigate(`/details/${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = documents.slice(indexOfFirstItem, indexOfLastItem);
  console.log(currentItems, "currentItems");

  return (
    <div className=" mt-4">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Back Button */}
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          className="mb-3 d-flex align-items-center"
        >
          <ArrowLeft />
        </Button>

        <p>
          Welcome to{" "}
          <span style={{ fontWeight: "600" }}>
            Zerozilla Infotech Pvt. Ltd.
          </span>
        </p>
      </div>

      {/* Folder Name */}

      {/* Documents Table inside Card */}
      <Card className="shadow-sm p-3 mt-5">
        <h5 style={{ marginBottom: "30px" }}>
          Name:{" "}
          <span
            className="text-primary"
            style={{ fontWeight: "400", fontSize: "16px" }}
          >
            {folderName}
          </span>
        </h5>

        <div style={{ overflowX: "auto" }}>
          <Table
            striped
            bordered
            hover
            className="text-center"
            style={{
              tableLayout: "fixed",
              whiteSpace: "nowrap",
              width: "max-content",
            }}
          >
            <thead style={{ backgroundColor: "#f8f9fa" }}>
              {" "}
              {/* Light gray background */}
              <tr>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  SL.NO
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Document Name
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Reference Number
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  No. of Receivers
                </th>
                {/* <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Pending Signature
                </th> */}
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Receivers Name
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Email ID
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Document Link
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    whiteSpace: "nowrap",
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((doc) => (
                  <tr
                    key={doc.id}
                    style={{
                      fontSize: "14px",
                      lineHeight: "3.4",
                      height: "50px",
                    }}
                    onClick={() => handleDocumentDetails(doc.documentId)}
                  >
                    <td>{doc.id}</td>
                    <td>{doc.documentName}</td>
                    <td>{doc.documentReferenceNumber}</td>
                    <td>{doc.receiversCount}</td>
                    {/* <td>{doc.pendingSignature}</td> */}
                    <td>{doc.receiversName}</td>
                    <td>{doc.emailID}</td>
                    <td>
                      {doc.documentLink !== "N/A" ? (
                        <a
                          href={doc.documentLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginTop: "13px",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <FaFilePdf
                              style={{
                                width: "20px",
                                height: "20px",
                                color: "red",
                              }}
                            />
                          </div>
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          doc.status === "COMPLETED"
                            ? "bg-success"
                            : "bg-warning"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td>{doc.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No documents available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        <Pagination className="justify-content-center mt-3">
          {[...Array(Math.ceil(documents.length / itemsPerPage)).keys()].map(
            (num) => (
              <Pagination.Item
                key={num + 1}
                active={num + 1 === currentPage}
                onClick={() => setCurrentPage(num + 1)}
              >
                {num + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </Card>
    </div>
  );
};

export default FolderDetails;
