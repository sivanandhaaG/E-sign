import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FaUpload, FaSignature, FaEye, FaPaperPlane } from "react-icons/fa";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import MyStepper from "../../common/MyStepper/MyStepper";
import "./Details.css";
import { Card, Modal } from "react-bootstrap";
import { ViewDetails } from "../../../app/api/userApi";
import { useParams } from "react-router-dom";
import moment from "moment";
import UserImage from "../../../assets/images/general/userImage.webp";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { resendESignRequest } from "../../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "antd";

const GOOGLE_MAPS_API_KEY = "";

const DocumentTracking = () => {
  const [documentDetails, setDocumentDetails] = useState([]);
  console.log(
    documentDetails?.[0]?.documentDetails?.documentName,
    "documentDetails"
  );
  const [previewImage, setPreviewImage] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = (imageSrc) => {
    setPreviewImage(imageSrc);
    setShowPreview(true);
  };

  const handleClosePreview = () => setShowPreview(false);

  useEffect(() => {
    window.scroll({ top: 0, behavior: "smooth" });
  }, []);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const [mapError, setMapError] = useState(false);

  const statusProgressMap = {
    SIGNED: 100,
    VIEWED: 50,
    SENT: 0,
  };

  const getStepIndex = (progress) => {
    if (progress >= 100) return 2;
    if (progress >= 50) return 1;
    return 0;
  };

  const steps = [
    { header: "Sent" },
    { header: "Viewed" },
    { header: "Signed" },
  ];

  const mapContainerStyle = {
    width: "100%",
    height: "300px",
    borderRadius: "10px",
  };

  const handleOnLoad = (map, location) => {
    try {
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(location);
      map.fitBounds(bounds);
    } catch (error) {
      console.error("Error loading Google Maps:", error);
      setMapError(true);
    }
  };

  const { id } = useParams();
  const handleDocumenDetails = async () => {
    try {
      const response = await ViewDetails(id);
      setDocumentDetails(response?.data?.data);
      if (response.status === 200) {
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching document details:", error);
    }
  };

  useEffect(() => {
    handleDocumenDetails();
  }, []);

  const handleExportAuditTrail = (documentDetails) => {
    if (!documentDetails?.[0]?.AuditLogs) {
      console.error("No audit logs available to export.");
      return;
    }

    const doc = documentDetails[0]?.documentDetails;
    const esignStatus = documentDetails[0]?.eSignDetails?.status;

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text("Audit Trail of Document", 14, 15);
    pdf.setFontSize(10);
    // pdf.text(`Generated on: ${moment().format("DD-MM-YYYY hh:mm:ss")}`, 14, 22);

    // Document Details
    pdf.setFontSize(12);
    pdf.text(`Unique Document ID: ${doc?.documentId || "N/A"}`, 14, 30);
    pdf.text(`Document Name: ${doc?.documentName || "N/A"}`, 14, 37);
    pdf.text(
      `Status: Document is ${esignStatus || "N/A"} by all the users.`,
      14,
      44
    );

    const tableColumnHeaders = ["Timestamp", "Action", "Email", "IP Address"];
    const tableRows = documentDetails[0].AuditLogs.map((log) => [
      log.updatedAt
        ? moment(log.updatedAt).format("DD-MM-YYYY hh:mm:ss A")
        : "N/A",
      log.Action,
      log.email || "N/A",
      log.ip_address || "N/A",
    ]);

    pdf.autoTable({
      head: [tableColumnHeaders],
      body: tableRows,
      startY: 50,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [100, 100, 255] }, // Light blue header
    });

    pdf.save("Audit_Trail.pdf");
  };

  const getIcon = (action) => {
    switch (action) {
      case "Document Uploaded":
        return <FaUpload />;
      case "Document Signed":
        return <FaSignature />;
      case "Document Viewed":
        return <FaEye />;
      case "Document Created Sent for Signature":
        return <FaPaperPlane />;
      default:
        return null;
    }
  };

  const resendEmail = async (eSignRequestId, documentName) => {
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
      console.log(error?.response?.data?.message, "message");
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  };

  return (
    <>
      <Text mt={8} fontSize={30} fontWeight={600}>
        Document Details
      </Text>
      <Box p={5} boxShadow="md" borderRadius="md" bg="white" mt={4}>
        <Text fontSize="xl" fontWeight="bold">
          📄 Sign This Document
        </Text>
        <Text fontSize="md" color="gray.600">
          “Sign this document body”
        </Text>

        <Table variant="simple" mt={4}>
          <Thead bg="gray.100">
            <Tr>
              <Th>Recipients</Th>
              <Th>Progress</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documentDetails?.[0]?.eSignDetails?.receivers.map(
              (recipient, index) => {
                const currentStep = getStepIndex(
                  statusProgressMap[recipient.status] || 0
                );
                const hasError = !!recipient.message;

                const errorMessages = steps.map((_, stepIndex) =>
                  stepIndex === currentStep ? recipient.message : ""
                );
                console.log(documentDetails, "recipient");

                return (
                  <Tr key={index}>
                    {/* Recipient Details */}
                    <Td>
                      <Text fontWeight="bold">{recipient?.name}</Text>
                      <Text>{recipient?.email} </Text>
                      <Button
                        style={{
                          background: "rgb(13,110,253)",
                          color: "#ffffff",
                        }}
                        mt={1}
                        onClick={() =>
                          resendEmail(
                            documentDetails?.[0]?.eSignDetails?.eSignRequestId,
                            documentDetails?.[0]?.documentDetails?.documentName
                          )
                        }
                      >
                        Resend
                      </Button>
                    </Td>

                    {/* Stepper & Timestamp */}
                    <Td>
                      <MyStepper
                        steps={steps}
                        activeStep={currentStep}
                        errorMessages={errorMessages}
                        hasError={hasError}
                        signedAt={recipient?.signedAt}
                        createdAt={recipient?.createdAt}
                        viewedAt={recipient?.viewedAt}
                      />

                      {/* Show updatedAt only if status is Signed, Viewed, or Sent */}
                      {/* {recipient.UpdatedAt && (
                        <Text
                          fontSize="sm"
                          color="gray.600"
                          mt={2}
                          textAlign="center"
                          fontWeight="600"
                        >
                          {moment(recipient.UpdatedAt).format("DD-MM-YYYY")}
                        </Text>
                      )} */}
                    </Td>
                  </Tr>
                );
              }
            )}
          </Tbody>
        </Table>

        <Box mt={6} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
          <Text fontSize="lg" fontWeight="bold">
            Document Information:
          </Text>
          <Box className="DetailsTable">
            <Table variant="simple" mt={2}>
              <Tbody className="DocInFoTable">
                <tr className="spaced-row">
                  <td>
                    <b>Document Name :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.documentName ||
                      "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Unique Document Number :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails
                      ?.documentReferenceNumber || "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Total Pages :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.totalPages || "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Created Date :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.createdAt
                      ? moment(documentDetails?.[0]?.documentDetails?.createdAt)
                          .format("DD-MM-YYYY - hh:mm:ss A")
                      : "N/A"}
                  </td>
                </tr>
              </Tbody>
            </Table>
            <Table mt={2}>
              <Tbody className="DocInFoTable">
                <tr className="spaced-row">
                  <td>
                    <b>Retry Attempts :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.retryAttempts
                      ?.attempts || "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Photo KYC :</b>
                  </td>
                  <td>
                    { documentDetails?.[0]?.documentDetails?.photoKYC !== undefined &&
                      documentDetails?.[0]?.documentDetails?.photoKYC !== null
                      ? documentDetails[0].documentDetails.photoKYC.toString() === "true"
                      ? "Yes"
                      : "No"
                      : "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Security Code :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.securityCode
                      ?.code || "N/A"}
                  </td>
                </tr>
                <tr className="spaced-row">
                  <td>
                    <b>Expiry Date :</b>
                  </td>
                  <td>
                    {documentDetails?.[0]?.documentDetails?.expiryDate
                      ? moment(
                            documentDetails?.[0]?.documentDetails?.expiryDate
                          )
                          .format("DD-MM-YYYY")
                      : "N/A"}
                  </td>
                </tr>
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Box>
          {documentDetails?.[0]?.eSignDetails?.receivers
            .filter(
              (kycDetails) =>
                kycDetails?.kycStatus === true && kycDetails?.status !== "SENT"
            )
            .map((kycDetails, index) => (
              <>
                <Box
                  mt={6}
                  p={4}
                  borderWidth={1}
                  borderRadius="md"
                  bg="gray.50"
                  className="pt-4"
                >
                  <Text fontSize="lg" fontWeight="bold">
                    KYC Details:{" "}
                    <span style={{ color: "blue", fontSize: "bold" }}>
                      {kycDetails.name || "N/A"}
                    </span>
                  </Text>

                  <Box
                    key={index}
                    mt={4}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    bg="white"
                  >
                    <Flex
                      flexDirection={{ base: "column", md: "row" }}
                      gap={6}
                      align="start"
                    >
                      <Box flex="1">
                        <Flex justifyContent="center" padding={4}>
                          {/* <Image
                            src={kycDetails.capturedImage || UserImage}
                            alt="User Avatar"
                            boxSize="100px"
                            objectFit="cover"
                            boxShadow="lg"
                            border="3px solid white"
                            onClick={() =>
                              handlePreview(
                                kycDetails.capturedImage || UserImage
                              )
                            }
                          /> */}
                          <Image
                              className="object-fit-cover"
                              height={120}
                              width={120}
                              src={kycDetails.capturedImage || UserImage}
                              style={{objectFit:"cover"}}
                            />
                        </Flex>
                        <Table variant="simple">
                          <Tbody>
                            <Tr>
                              <Td fontWeight="bold">Recipient Name:</Td>
                              <Td>{kycDetails.name}</Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="bold">Signed Document:</Td>
                              <Td>
                                <a href="">
                                  {
                                    documentDetails?.[0]?.documentDetails
                                      ?.documentName
                                  }
                                </a>
                              </Td>
                            </Tr>
                            <Tr>
                              <Td fontWeight="bold">Signed Date:</Td>
                              <Td>
                                {kycDetails?.signedAt
                                  ? moment(kycDetails?.signedAt)
                                      .format("DD-MM-YYYY- hh:mm:ss A")
                                  : "N/A" || "N/A"}
                              </Td>
                            </Tr>
                          </Tbody>
                        </Table>
                      </Box>

                      <Box
                        flex="1"
                        textAlign="center"
                        position="relative"
                        borderWidth="1px"
                        borderRadius="md"
                        p={4}
                        bg="white"
                        width={{ base: "100%", md: "50%" }}
                      >
                        <Text fontSize="lg" fontWeight="bold" mt={2}>
                          Location
                        </Text>
                        {isLoaded ? (
                          <GoogleMap
                            onLoad={(map) =>
                              handleOnLoad(map, kycDetails?.location?.latitude)
                            }
                            mapContainerStyle={mapContainerStyle}
                            zoom={14}
                            center={{
                              lat: kycDetails?.location?.latitude,
                              lng: kycDetails?.location?.longitude,
                            }} // Ensure the map centers correctly
                          >
                            {kycDetails?.location?.latitude &&
                              kycDetails?.location?.longitude && (
                                <Marker
                                  position={{
                                    lat: kycDetails.location.latitude,
                                    lng: kycDetails.location.longitude,
                                  }}
                                />
                              )}
                          </GoogleMap>
                        ) : (
                          <Text color="red.500">Loading Google Maps...</Text>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </Box>
              </>
            ))}
        </Box>

        <Box mt={6} p={4} borderWidth={1} borderRadius="md" bg="gray.50">
          <Card className=" p-3 flex justify-content-between">
            <Box
              className="AuditTrailHeader"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box mb={4}>
                <Text fontSize="lg" fontWeight="bold">
                  📜 Audit Trail of Document:
                </Text>
                <div>
                  <h6>
                    <span className="Audit_details_tiyle">
                      Unique Document ID:{" "}
                    </span>
                    <span className="auditDetail">
                      {documentDetails?.[0]?.documentDetails?.documentId ||
                        "N/A"}
                    </span>
                  </h6>
                  <h6>
                    <span className="Audit_details_tiyle">Document Name: </span>
                    <span className="auditDetail">
                      {documentDetails?.[0]?.documentDetails?.documentName ||
                        "N/A"}
                    </span>
                  </h6>
                  <h6>
                    <span className="Audit_details_tiyle">Status: </span>
                    <span className="auditDetail">
                      Document is{" "}
                      {documentDetails?.[0]?.eSignDetails?.status || "N/A"} by
                      all the users.
                    </span>
                  </h6>
                </div>
              </Box>
              <Box>
                <button
                  className="btn btn-primary"
                  onClick={() => handleExportAuditTrail(documentDetails)}
                >
                  Download
                </button>
              </Box>
            </Box>
          </Card>
          <Box className="AuditTables">
            <Table variant="simple" mt={2}>
              <Thead bg="gray.100">
                <Tr>
                  <Th>Timestamp</Th>
                  <Th>Action</Th>
                  <Th>Email</Th>
                  <Th>IP Address</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documentDetails?.[0]?.AuditLogs?.sort(
                  (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
                ).map((log, index) => (
                  <Tr key={index} className="Audit_Tr">
                    <Td>
                      {log.updatedAt
                        ? moment(log?.updatedAt)
                            .format("DD-MM-YYYY - hh:mm:ss A")
                        : "N/A" || "N/A"}
                    </Td>
                    <Td>
                      <Flex style={{ gap: "10px" }}>
                        <span style={{ paddingTop: "5px" }}>
                          {getIcon(log.Action)}
                        </span>{" "}
                        <Text>{log.Action}</Text>
                      </Flex>
                    </Td>
                    <Td>{log.email}</Td>
                    <Td>{log.ip_address || "N/A"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>

        <Modal
          show={showPreview}
          onHide={handleClosePreview}
          centered
          backdrop="static"
        >
          <Modal.Header closeButton>
            {/* <Modal.Title>Image Preview</Modal.Title> */}
          </Modal.Header>
          <Modal.Body className="text-center" style={{ padding: "10px" }}>
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                style={{ width: "100%", borderRadius: "8px" }}
              />
            )}
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClosePreview}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </Box>
    </>
  );
};

export default DocumentTracking;
