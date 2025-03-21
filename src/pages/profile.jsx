import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Tab,
  Tabs,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import toast, { Toaster } from "react-hot-toast";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";

import ReactSignatureCanvas from "react-signature-canvas";
import DragAndDropFileUpload from "../components/common/DragAndDropFileUpload/DragAndDropFileUpload";

import {
  DeleteSign,
  getUserProfileDetails,
  getSignatureDetails,
  saveUserSignature,
  updateProfilePic,
  updateUserProfileDetails,
} from "../app/api/userApi";
import { fetchAllDesignations } from "../app/api/masterApi";
import { uploadImageToS3 } from "../app/api/uploadApi";

import Email from "../../src/assets/svg/userpage/mail.svg";
import UploadIcon from "../../src/assets/svg/userpage/uploadimg.svg";
import clockIcon from "../assets/svg/userpage/clock.svg";
import SampleAvatar from "../assets/images/general/Avatar.png";
import styles from "./profile.module.css";
import { toPng } from "html-to-image";
import Loader from "../components/common/Loader/Loader";
import { Image } from "antd";

/**
 * ProfilePage Component
 * Includes personal info (name, email, photo) and
 * multiple signatures with toggles for image-upload or signature-draw mode.
 */
function ProfilePage() {
  const userData = useSelector((state) => state.user);
  const role = JSON.parse(localStorage.getItem("user")).role;
  const paymentType = JSON.parse(localStorage.getItem("user")).paymentType;
  const [signaturesLimit, setSignaturesLimit] = useState(false);
  const [loading, setLoading] = useState(false);

  // ─────────────────────────────────────────────────────────────────────────────
  // Local state for personal details
  // ─────────────────────────────────────────────────────────────────────────────
  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    profilePicture: "",
    role: "Corporate Administrator",
    country: "India",
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Local state for user signatures array
  // ─────────────────────────────────────────────────────────────────────────────
  const [signatures, setSignatures] = useState([]);
  console.log(signatures, "signatures");

  // ─────────────────────────────────────────────────────────────────────────────
  // Fetch user profile details on mount
  // ─────────────────────────────────────────────────────────────────────────────
  useEffect(() => {
    fetchProfileDetails();
  }, []);

  const fetchProfileDetails = async () => {
    try {
      const response = await getUserProfileDetails();

      if (response?.data) {
        // Basic profile details
        setProfileDetails((prev) => ({
          ...prev,
          firstName: response.data.firstName || "",
          middleName: response.data.middleName || "",
          lastName: response.data.lastName || "",
          profilePicture: response.data.profilePicture || "",
          role: response.data.role || prev.role,
          country: response.data.country || prev.country,
        }));

        // If the API returns existing signatures
        if (response.data.signatures) {
          // Add a default mode for each existing signature (image or draw)

          const sigsWithMode = response.data.signatures.map((sig) => ({
            ...sig,
            mode: "image", // default to image mode if not specified
          }));
          setSignatures(sigsWithMode);
        }
      }
    } catch (error) {
      console.error("Error fetching user profile details:", error);
    }
  };

  // Fetch designations for the dropdown
  const { data: designationData } = useQuery(
    "designations",
    fetchAllDesignations
    // {
    //   enabled: false,
    // }
  );
  useEffect(() => {
    fetchAllDesignations();
  }, []);
  // ─────────────────────────────────────────────────────────────────────────────
  // Handler: Profile details change
  // ─────────────────────────────────────────────────────────────────────────────
  const handleProfileDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Signature Pad Refs (for the "draw" mode)
  // ─────────────────────────────────────────────────────────────────────────────
  const signPadRefs = useRef([]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Toggle between "image" and "draw" mode for a given signature row
  // ─────────────────────────────────────────────────────────────────────────────
  const handleModeToggle = (index, newMode) => {
    setSignatures((prev) =>
      prev.map((sig, i) => (i === index ? { ...sig, mode: newMode } : sig))
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Clear the signature from the signature pad
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSignPadClear = (index) => {
    if (signPadRefs.current[index]) {
      signPadRefs.current[index].clear();
    }
  };

  useEffect(() => {
    console.log(signatures.length, "length");
    const signatureLimits = {
      INDIVIDUAL_USER: { free: 1, pro: 2 },
      CORPORATE_ADMIN: { free: 1, pro: 4 },
      CORPORATE_USER: { free: 1, pro: 4 },
    };

    if (signatures.length >= (signatureLimits[role]?.[paymentType] || 1)) {
      setSignaturesLimit(true);
    } else {
      setSignaturesLimit(false);
    }
  }, [signatures.length]);

  // ─────────────────────────────────────────────────────────────────────────────
  // Convert the signature pad drawing to an image & pass to handleFileUpload
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSignPadSave = (index) => {
    if (!signPadRefs.current[index]) return;

    // Check if the signature pad is empty
    if (signPadRefs.current[index].isEmpty()) {
      toast.error("No signature found! Please draw a signature.");
      return;
    }
    const dataURL = signPadRefs.current[index]
      .getTrimmedCanvas()
      .toDataURL("image/png");

    if (!dataURL) {
      toast.error("No signature found to save!");
      return;
    }

    // Convert base64 dataURL to a File
    const blob = dataURItoBlob(dataURL);
    const file = new File([blob], `signature-${Date.now()}.png`, {
      type: "image/png",
    });

    handleFileUpload(index, file);
    toast.success("Signature drawn and saved!");
  };

  // Helper to convert base64 dataURL -> Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Handler: Update a specific signature row's (name, designation, etc.)
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSignatureChange = (index, e) => {
    const { name, value } = e.target;
    setSignatures((prev) =>
      prev.map((sig, i) => (i === index ? { ...sig, [name]: value } : sig))
    );
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Handler: Upload a signature image (file) for a given row
  // ─────────────────────────────────────────────────────────────────────────────
  const handleFileUpload = async (index, file) => {
    console.log(file, "fileUrl");
    if (!file) return;
    setSignatures((prev) =>
      prev.map((sig, i) =>
        i === index
          ? { ...sig, loading: true, uploadMessage: "Uploading..." }
          : sig
      )
    );

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadImageToS3(formData);
      console.log(response, "response");
      if (response?.data?.fileUrl) {
        setSignatures((prev) =>
          prev.map((sig, i) =>
            i === index
              ? {
                  ...sig,
                  fileUrl: response.data.fileUrl,
                  fileName: file.name,
                  loading: false,
                  uploadMessage: "Uploaded successfully",
                }
              : sig
          )
        );
      } else {
        throw new Error("Invalid response format: missing fileUrl");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Image upload failed!");
      setSignatures((prev) =>
        prev.map((sig, i) =>
          i === index
            ? { ...sig, loading: false, uploadMessage: "Upload failed" }
            : sig
        )
      );
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Add a new signature row
  // ─────────────────────────────────────────────────────────────────────────────
  const addSignature = () => {
    setSignatures((prev) => [
      ...prev,
      {
        signatureId: Date.now().toString(),
        name: "",
        designationId: "",
        fileUrl: "",
        mode: "image", // default to "image"
      },
    ]);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Remove a signature row from db
  // ─────────────────────────────────────────────────────────────────────────────
  const removeSignature = async (index) => {
    const signature = signatures[index];
    const signatureId = signature?.signatureId;

    // Ensure at least one signature remains
    // if (signatures.length <= 1) {
    //   toast.warning("At least one signature is required.");
    //   return;
    // }

    try {
      // If the signature has not been saved (no valid signatureId), remove it from state only
      if (!signatureId || isTemporarySignature(signatureId)) {
        handleRemoveSignature(index);
        return;
      }

      // Proceed with deletion from the server if the signature is saved
      const userString = localStorage.getItem("user");
      if (userString) {
        const userObject = JSON.parse(userString);
        const userId = userObject?.userId;
        console.log("Stored Login User ID:", userId);
        if (userId && signatureId) {
          await DeleteSign(signatureId, userId);
        }
      }

      // Remove from local state after successful deletion from the server
      handleRemoveSignature(index);
      fetchProfileDetails();
      toast.success("Signature deleted successfully!");
    } catch (error) {
      console.error("Error deleting signature:", error);
      toast.error("Failed to delete the signature.");
    }
  };

  // Helper function to determine if a signature is temporary (not saved in DB)
  const isTemporarySignature = (signatureId) => {
    return !signatureId || signatureId.length < 20; // Assuming DB-generated IDs are longer than 10 chars
  };

  // Remove signature from local state
  const handleRemoveSignature = (index) => {
    setSignatures((prev) => prev.filter((_, i) => i !== index));
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Save signature details
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSaveSignatureDetails = async () => {
    setLoading(true);

    // Example: only new signatures have numeric signatureId. Adjust logic as needed.
    const newSignatures = signatures.filter((signature) => {
      return !signature.signatureId || /^[0-9]+$/.test(signature.signatureId);
    });

    // If no new signatures were added, show a toast message and exit the function
    if (newSignatures.length === 0) {
      toast.error("No new changes to save!");
      setLoading(false);
      return;
    }

    const payload = {
      signatures: newSignatures.map((signature) => ({
        name: signature.name,
        designationId: signature.designationId,
        fileUrl: signature.fileUrl,
      })),
    };

    try {
      const data = await getSignatureDetails(payload);
      toast.success("Signature details saved successfully!");
      setSignatures([]);
      fetchProfileDetails();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to save signature details.");
    }
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // Save all (Profile + Signatures)
  // ─────────────────────────────────────────────────────────────────────────────
  const handleSaveAll = () => {
    // handleUserProfileUpdate(profileDetails);
    handleSaveSignatureDetails();
  };

  const handleProfileSave = () => {
    handleUserProfileUpdate(profileDetails);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // React Query Mutations
  // ─────────────────────────────────────────────────────────────────────────────
  const { mutate: handleUserProfileUpdate, isLoading: isUpdatingUserProfile } =
    useMutation(updateUserProfileDetails, {
      onSuccess: () => {
        toast.success("User Profile Updated Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    });

  const { mutate: handleSaveUserSignature } = useMutation(saveUserSignature, {
    onSuccess: () => toast.success("User Signature Saved Successfully"),
    onError: (error) => {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    },
  });

  // ─────────────────────────────────────────────────────────────────────────────
  // Upload profile picture
  // ─────────────────────────────────────────────────────────────────────────────

  const handleProfilePicUpload = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadImageToS3(formData);
      if (response?.data?.fileUrl) {
        const fileUrl = response.data.fileUrl;
        setProfileDetails((prev) => ({ ...prev, profilePicture: fileUrl }));

        const payload = { fileUrl };
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          // if (userId) {
          //   await updateProfilePic(userId, payload);
          // }
        }
        // toast.success("Profile picture updated successfully!");
      } else {
        throw new Error("Invalid response format, no fileUrl returned");
      }
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      // toast.error("Failed to update profile picture.");
    }
  };

  const htmlToImageConvert = async (id) => {
    const ele = document.getElementById(id);
    const url = await toPng(ele);
    console.log("url", dataurl);
    return url;
  };

  const htmlToImageConvert2 = async (id) => {
    const ele = document.getElementById(id);
    const url = await toPng(ele);
    return url;
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      You have reached the maximum number of signatures allowed.
    </Tooltip>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────────
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container fluid style={{ paddingInline: "2rem" }}>
          <div className={styles.rowContainer}>
            <h5>Personal Info</h5>
            <p className={styles.labelDescription}>
              Update your photo and personal details here
            </p>
          </div>

          {/* First & Last Name */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Name</label>
            </Col>
            <Col
              md="auto"
              style={{ flex: "0 0 20.8333%", maxWidth: "20.8333%" }}
            >
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstName"
                value={profileDetails.firstName}
                onChange={handleProfileDetailsChange}
              />
            </Col>
            <Col
              md="auto"
              style={{ flex: "0 0 20.8333%", maxWidth: "20.8333%" }}
            >
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={profileDetails.lastName}
                onChange={handleProfileDetailsChange}
              />
            </Col>
          </Row>

          {/* Middle Name */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Middle Name</label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                placeholder="Middle Name"
                name="middleName"
                value={profileDetails.middleName}
                onChange={handleProfileDetailsChange}
              />
            </Col>
          </Row>

          {/* Email */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Email address</label>
            </Col>
            <Col md={5}>
              <Form.Group className="input-container">
                <div className="input-wrapper">
                  <Form.Control
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email || ""}
                    placeholder="Enter Email"
                    className="input-field"
                    style={{ paddingLeft: "40px" }}
                    disabled
                  />
                  <img src={Email} alt="Email" className="input-icon" />
                </div>
              </Form.Group>
            </Col>
          </Row>

          {/* Profile Picture */}
          <Row
            className={styles.rowContainer}
            style={{ paddingBottom: "10px" }}
          >
            <Col md={3}>
              <label className={styles.label}>Your Photo</label>
              <p className={styles.labelDescription}>
                This will be displayed on your profile
              </p>
            </Col>
            <Col md={1} marginRight="10px" style={{ marginRight: "10px" }}>
              <Image
                className="img img-thumbnail rounded-circle"
                width={80}
                height={80}
                src={profileDetails.profilePicture || SampleAvatar}
              />
            </Col>
            <Col md={4}>
              <div
                className="upload-container"
                onClick={() => document.getElementById("fileInput").click()}
                style={{
                  marginTop: "0px",
                  backgroundColor: "white",
                  height: "110px",
                }}
              >
                <img
                  src={UploadIcon}
                  alt="Upload Icon"
                  className="upload-icon"
                  style={{ height: "30px" }}
                />
                <div className="upload-text">
                  Click to upload{" "}
                  <span className="upload-dnd">or drag and drop</span>
                </div>
                <div className="upload-hint">
                  SVG, PNG, JPG or GIF (max. 800×400px)
                </div>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => handleProfilePicUpload(e.target.files[0])}
                />
              </div>
            </Col>
          </Row>

          {/* Role */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Role</label>
            </Col>
            <Col md={5}>
              <Form.Control
                type="text"
                disabled
                value={profileDetails.role}
                onChange={handleProfileDetailsChange}
              />
            </Col>
          </Row>

          {/* Timezone */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Timezone</label>
            </Col>
            <Col md={5}>
              <InputGroup>
                <InputGroup.Text>
                  <img
                    src={clockIcon}
                    alt="Clock Icon"
                    style={{ width: "15px", height: "15px" }}
                  />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value="Indian Standard Time (IST) UTC+05:30"
                  readOnly
                />
              </InputGroup>
            </Col>
          </Row>
          {/* Timezone */}
          <Row className={styles.rowContainer}>
            <div className="py-4 d-flex justify-content-end">
              {/* <Button
                onClick={() => window.location.reload()}
                size="md"
                className="mx-2"
                variant="outline-secondary"
                style={{
                  color: "black",
                  backgroundColor: "white",
                  border: "1px solid #C4C4C4",
                }}
              >
                Cancel
              </Button> */}
              <Button
                onClick={handleProfileSave}
                disabled={isUpdatingUserProfile}
                size="md"
                className="btn btn-bg-indigo mx-2"
                style={{ backgroundColor: "#4F46E5", color: "white" }}
              >
                Save Profile
              </Button>
            </div>
          </Row>

          {/* Signatures Section */}
          <Row className={styles.rowContainer}>
            <Col md={3}>
              <label className={styles.label}>Upload your signature</label>
              <p className={styles.labelDescription}>
                Switch between uploading an image or drawing a signature.
              </p>
            </Col>
            <Col md={9}>
              <div
                className={styles.formSection}
                style={{ backgroundColor: "#fff" }}
              >
                {signatures.map((signature, index) => (
                  <div
                    key={signature.signatureId || index}
                    className={styles.formSection}
                    style={{ backgroundColor: "#fff", marginBottom: "20px" }}
                  >
                    {/* Delete Icon & Title */}
                    <div
                      className={styles.subHeaderLine}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span className={styles.subHeaderText}>
                        Individual Signature {index + 1}
                      </span>
                      {signatures.length >= 1 && (
                        <FiTrash2
                          onClick={() => removeSignature(index)}
                          size={20}
                          color="red"
                          style={{ cursor: "pointer" }}
                        />
                      )}
                    </div>
                    {console.log(
                      signatures.some(
                        (sigid) => sigid.signatureId === signature.signatureId
                      ),
                      "idsig"
                    )}
                    {/* Name & Designation Fields */}
                    <Row className="mb-3">
                      <Col>
                        <Form.Group>
                          <Form.Label className="signup-label-two">
                            Name
                          </Form.Label>
                          <Form.Control
                            required
                            type="text"
                            name="name"
                            disabled={
                              signatures.find(
                                (sigid) =>
                                  sigid.signatureId === signature.signatureId
                              )?.signatureId?.length > 20
                            }
                            value={signature.name || ""}
                            onChange={(e) => handleSignatureChange(index, e)}
                            placeholder="Enter Your Name"
                            className="input-field_two"
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label className="signup-label-two">
                            Designation
                          </Form.Label>
                          <Form.Select
                            name="designationId"
                            value={signature.designationId || ""}
                            onChange={(e) => handleSignatureChange(index, e)}
                            required
                            disabled={
                              signatures.find(
                                (sigid) =>
                                  sigid.signatureId === signature.signatureId
                              )?.signatureId?.length > 20
                            }
                            className="input-field_two"
                          >
                            <option value="">Select a designation</option>
                            {designationData?.data &&
                              designationData.data.map((designation) => (
                                <option
                                  key={designation.designationId}
                                  value={designation.designationId}
                                >
                                  {designation.title}
                                </option>
                              ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    {/* SWITCH to choose between "Image" or "Draw" */}
                    {/* <Form.Check
                   type="switch"
                   id={`signature-mode-switch-${index}`}
                   label={
                     signature.mode === "draw"
                       ? "Switched to Drawing Pad"
                       : "Switched to Image Upload"
                   }
                   checked={signature.mode === "draw"}
                   onChange={(e) =>
                     handleModeToggle(index, e.target.checked ? "draw" : "image")
                   }
                   style={{ marginTop: "1rem", marginBottom: "1rem" }}
                 /> */}

                    {/* {signature.mode === "image" ? (
 
                      <div style={{ marginTop: "10px" }}>
                     <Form.Label
                       className="signup-label-two"
                       style={{ marginBottom: "0px" }}
                     >
                       Upload Signature
                     </Form.Label>
                     <div
                       className="upload-container"
                       onClick={() =>
                         document.getElementById(`fileInput-${index}`).click()
                       }
                     >
                       <img
                         src={UploadIcon}
                         alt="Upload Icon"
                         className="upload-icon"
                       />
                       <div className="upload-text">
                         Click to upload{" "}
                         <span className="upload-dnd">or drag and drop</span>
                       </div>
                       <div className="upload-hint">
                         SVG, PNG, JPG or GIF (max. 800×400px)
                       </div>
                       <input
                         type="file"
                         id={`fileInput-${index}`}
                         style={{ display: "none" }}
                         accept="image/*"
                         onChange={(e) =>
                           handleFileUpload(index, e.target.files[0])
                         }
                       />
                     </div>
                     <DragAndDropFileUpload
                       onFileUpload={(file) => handleFileUpload(index, file)}
                       onFileRemove={() => handleFileUpload(index, null)}
                     />
                   </div>
                 ) : (
                   <div style={{ marginTop: "10px" }}>
                     <p>Draw your signature below:</p>
                     <ReactSignatureCanvas
                       ref={(el) => (signPadRefs.current[index] = el)}
                       penColor="blue"
                       canvasProps={{
                         width: 500,
                         height: 200,
                         className: "sigCanvas",
                         style: {
                           border: "1px solid #ccc",
                           borderRadius: "8px",
                         },
                       }}
                     />
                     <div style={{ marginTop: "8px" }}>
                       <Button
                         variant="secondary"
                         onClick={() => handleSignPadClear(index)}
                         style={{ marginRight: "10px" }}
                       >
                         Clear
                       </Button>
                       <Button
                         variant="primary"
                         onClick={() => handleSignPadSave(index)}
                       >
                         Add
                       </Button>
                     </div>
                   </div>
                 )} */}

                    <Tabs
                      defaultActiveKey="styles"
                      id="uncontrolled-tab-example"
                    >
                      <Tab
                        eventKey="styles"
                        title="Styles"
                        className="border p-5"
                      >
                        <div className="signature__styles">
                          {["League Script", "Qwigley", "Andina-Regular"].map(
                            (font, fontIndex) => (
                              <div key={fontIndex}>
                                <p
                                  style={{
                                    fontFamily: font,
                                    fontSize: "30px",
                                    fontWeight: "bold",
                                    cursor:
                                      signatures.find(
                                        (sigid) =>
                                          sigid.signatureId ===
                                          signature.signatureId
                                      )?.signatureId?.length > 20
                                        ? "not-allowed"
                                        : "pointer",
                                    padding: "10px",
                                    lineHeight: "5rem",
                                    borderRadius: "55px",
                                    pointerEvents:
                                      signatures.find(
                                        (sigid) =>
                                          sigid.signatureId ===
                                          signature.signatureId
                                      )?.signatureId?.length > 20
                                        ? "none"
                                        : "auto",
                                    opacity:
                                      signatures.find(
                                        (sigid) =>
                                          sigid.signatureId ===
                                          signature.signatureId
                                      )?.signatureId?.length > 20
                                        ? 0.5
                                        : 1,
                                  }}
                                  className="signature__font"
                                  id={`${font}-${index}`} // Dynamic ID per signature row
                                  onClick={async () => {
                                    if (
                                      signatures.find(
                                        (sigid) =>
                                          sigid.signatureId ===
                                          signature.signatureId
                                      )?.signatureId?.length > 20
                                    ) {
                                      return; // Prevent execution if disabled
                                    }

                                    const imageData = await htmlToImageConvert2(
                                      `${font}-${index}`
                                    );

                                    const blob = await fetch(imageData).then(
                                      (res) => res.blob()
                                    );
                                    const file = new File(
                                      [blob],
                                      `${font}-signature.png`,
                                      {
                                        type: "image/png",
                                      }
                                    );

                                    await handleFileUpload(index, file);
                                  }}
                                >
                                  {signature?.name.trim() !== ""
                                    ? signature.name
                                    : "Your Signature"}
                                </p>
                              </div>
                            )
                          )}
                        </div>
                      </Tab>

                      <Tab
                        eventKey="choose"
                        title="Choose"
                        className="border p-5 "
                      >
                        <div>
                          <Form.Group controlId="formFileLg" className="mb-3">
                            <Form.Label>Choose your signature</Form.Label>
                            <Form.Control
                              type="file"
                              allow="image/*"
                              accept="image/*"
                              id={`fileInput-${index}`}
                              disabled={
                                signatures.find(
                                  (sigid) =>
                                    sigid.signatureId === signature.signatureId
                                )?.signatureId?.length > 20
                              }
                              onChange={(e) =>
                                handleFileUpload(index, e.target.files[0])
                              }
                            />
                          </Form.Group>
                          <DragAndDropFileUpload
                            onFileUpload={(file) =>
                              handleFileUpload(index, file)
                            }
                            onFileRemove={() => handleFileUpload(index, null)}
                          />
                        </div>
                      </Tab>
                      <Tab eventKey="draw" title="Draw">
                        <div className="signature-wrapper">
                          <ReactSignatureCanvas
                            ref={(el) => (signPadRefs.current[index] = el)}
                            penColor="blue"
                            canvasProps={{
                              width: 500,
                              height: 200,
                              className: "sigCanvas",
                              style: {
                                border: "1px solid #ccc",
                              },
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "left",
                            gap: "10px",
                            marginTop: "10px",
                          }}
                        >
                          <Button
                            disabled={
                              signatures.find(
                                (sigid) =>
                                  sigid.signatureId === signature.signatureId
                              )?.signatureId?.length > 20
                            }
                            onClick={() => handleSignPadSave(index)}
                          >
                            Save
                          </Button>
                          <Button
                            disabled={
                              signatures.find(
                                (sigid) =>
                                  sigid.signatureId === signature.signatureId
                              )?.signatureId?.length > 20
                            }
                            onClick={() => handleSignPadClear(index)}
                          >
                            Clear
                          </Button>
                        </div>
                      </Tab>
                    </Tabs>

                    {/* Upload status messages */}
                    {signature.uploadMessage && (
                      <div
                        className="upload-status"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        {signature.loading ? (
                          <span style={{ color: "blue" }}>Uploading...</span>
                        ) : (
                          <span style={{ color: "green" }}>
                            {signature.uploadMessage}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Preview of the uploaded signature image */}
                    {signature.fileUrl && (
                      <div className="mb-3" style={{ textAlign: "center" }}>
                        <img
                          src={signature.fileUrl}
                          alt="user signature"
                          style={{
                            maxWidth: "150px",
                            marginTop: "10px",
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                          }}
                        />
                        <p>{signature.fileName}</p>
                      </div>
                    )}
                  </div>
                ))}

                {/* Button to add more signatures */}
                {
                  <div className="d-flex justify-content-center">
                    <OverlayTrigger
                      placement="top"
                      overlay={signaturesLimit ? renderTooltip : <></>}
                    >
                      <span className="d-inline-block">
                        <Button
                          size="md"
                          className="btn-success d-flex align-items-center px-4"
                          onClick={addSignature}
                          disabled={signaturesLimit}
                          style={
                            signaturesLimit ? { pointerEvents: "none" } : {}
                          }
                        >
                          <FiPlusCircle style={{ marginRight: "8px" }} />
                          Add more
                        </Button>
                      </span>
                    </OverlayTrigger>
                  </div>
                }
              </div>
            </Col>
          </Row>

          {/* Save / Cancel Buttons */}
          <div className="py-4 d-flex justify-content-end">
            {/* <Button
              onClick={() => window.location.reload()}
              size="md"
              className="mx-2"
              variant="outline-secondary"
              style={{
                color: "black",
                backgroundColor: "white",
                border: "1px solid #C4C4C4",
              }}
            >
              Cancel
            </Button> */}
            {loading ? (
              <Button type="primary" loading>
                Loading
              </Button>
            ) : (
              <Button
                onClick={handleSaveAll}
                disabled={loading}
                size="md"
                className="btn btn-bg-indigo mx-2"
                style={{ backgroundColor: "#4F46E5", color: "white" }}
              >
                Save Signature
              </Button>
            )}
          </div>
        </Container>
      )}
    </>
  );
}

export default ProfilePage;
