import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import SampleAvatar from "../assets/images/general/Avatar.png";
import DragAndDropFileUpload from "../components/common/DragAndDropFileUpload/DragAndDropFileUpload";
import styles from "./profile.module.css";
import Email from "../../src/assets/svg/userpage/mail.svg";
import UploadIcon from "../../src/assets/svg/userpage/uploadimg.svg";
import {
  getSignatureDetails,
  getUserProfileDetails,
  getUserSignature,
  saveUserSignature,
  updateProfilePic,
  updateUserProfileDetails,
} from "../app/api/userApi";
import { useMutation, useQuery } from "react-query";
import { fetchAllDesignations } from "../app/api/masterApi";
import toast, { Toaster } from "react-hot-toast";
import clockIcon from "../assets/svg/userpage/clock.svg";
import { RiPulseFill } from "react-icons/ri";
import { FiPlusCircle, FiTrash2 } from "react-icons/fi";
import { uploadImageToS3 } from "../app/api/uploadApi";

function ProfilePage() {
  const userData = useSelector((state) => state.user);
  const [signatures, setSignatures] = useState([
    {
      id: 1,
      name: "",
      designationId: "",
      fileUrl: "",
    },
  ]);

  console.log("signaturesData:", signatures);

  const [profileDetails, setProfileDetails] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    profilePicture: "",
    role: "Corporate Administrator",
    country: "India",
  });

  const [userSignatureData, setUserSignatureData] = useState({
    name: "",
    designationId: "",
    contactNumber: "",
    fileUrl: "",
  });

  const fetchUserProfileDetails = async () => {
    try {
      const response = await getUserProfileDetails();
      console.log("User Profile Details:", response?.data?.signatures);
    } catch (error) {
      console.error("Error fetching user profile details:", error);
    }
  };

  // Call the function to fetch and log the data
  fetchUserProfileDetails();

  const handleSignatureChange = (index, e) => {
    const { name, value } = e.target;
    setSignatures((prev) =>
      prev.map((sig, i) => (i === index ? { ...sig, [name]: value } : sig))
    );
  };

  // Handles file uploads

  const handleFileUpload = async (index, file) => {
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
      const response = await uploadImageToS3(formData); // API call
      console.log("Upload Response:", response);

      if (response?.data?.fileUrl) {
        setSignatures((prev) =>
          prev.map((sig, i) =>
            i === index
              ? {
                  ...sig,
                  fileUrl: response.data.fileUrl, // Correctly set fileUrl from response
                  fileName: file.name, // Store file name
                  loading: false,
                  uploadMessage: "Uploaded successfully",
                }
              : sig
          )
        );
      } else {
        throw new Error("Invalid response format");
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

  // Adds a new empty signature section
  const addSignature = () => {
    setSignatures((prev) => [
      ...prev,
      { id: prev.length + 1, name: "", designationId: "", fileUrl: "" },
    ]);
  };

  const handleProfileDetailsChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureChange = (fileUrl) => {
    setProfileDetails((prevData) => ({ ...prevData, profilePicture: fileUrl }));
  };

  const handleUserSignatureDataChange = (e) => {
    const { name, value } = e.target;
    setUserSignatureData((prevData) => ({ ...prevData, [name]: value }));
  };

  const setSignatureFileUrl = (fileUrl) => {
    setUserSignatureData((prevData) => ({ ...prevData, fileUrl }));
  };

  const { refetch: refetchUserProfileDetails } = useQuery(
    "user-profile",
    getUserProfileDetails,
    {
      onSuccess: (data) => {
        setProfileDetails(data.data);
      },
    }
  );

  const { data: designationData } = useQuery(
    "designations",
    fetchAllDesignations
  );

  useQuery("user-signature", getUserSignature, {
    onSuccess: (data) => {
      if (data.data) {
        setUserSignatureData(data.data);
      }
    },
  });

  const { mutate: handleUserProfileUpdate, isLoading: isUpdatingUserProfile } =
    useMutation(updateUserProfileDetails, {
      onSuccess: (data) => {
        toast.success("User Profile Updated Successfully");
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    });

  const { mutate: handleSaveUserSignature, isLoading: isSavingUserSignature } =
    useMutation(saveUserSignature, {
      onSuccess: (data) => {
        toast.success("User Signature Saved Successfully");
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    });

  // Deletes a signature section
  const removeSignature = (index) => {
    if (signatures.length > 1) {
      setSignatures((prev) => prev.filter((_, i) => i !== index));
    } else {
      toast.warning("At least one signature is required.");
    }
  };

  const handleSaveSignatureDetails = async () => {
    // Build the payload as a single object with a "signatures" key
    // containing an array of signature objects.
    const payload = {
      signatures: signatures.map((signature) => ({
        name: signature.name,
        designationId: signature.designationId,
        contactNumber: signature.contactNumber,
        fileUrl: signature.fileUrl,
      })),
    };

    try {
      // Call the getSignatureDetails API with the payload
      const data = await getSignatureDetails(payload);
      toast.success("Signature details saved successfully!");
      console.log("Signature details:", data);
    } catch (error) {
      console.error("Error saving signature details:", error);
      toast.error("Failed to save signature details.");
    }
  };

  const handleSaveAll = () => {
    // Call the profile update API
    handleUserProfileUpdate(profileDetails);

    // Call the signature details API
    handleSaveSignatureDetails();
  };

  

  const handleProfilePicUpload = async (file) => {
    if (!file) return;

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Upload the image using your uploadImageToS3 API
      const response = await uploadImageToS3(formData);
      console.log("Profile Pic Upload Response:", response);

      if (response?.data?.fileUrl) {
        const fileUrl = response.data.fileUrl;
        // Update local state to display the new profile picture
        setProfileDetails((prev) => ({ ...prev, profilePicture: fileUrl }));

        // Build the payload and call the updateProfilePic API
        const payload = { fileUrl: fileUrl };
        const userString = localStorage.getItem("user");
        if (userString) {
          const userObject = JSON.parse(userString);
          const userId = userObject?.userId;
          console.log("Stored Login User ID:", userId);
          if (userId) {
            await updateProfilePic(userId, payload);
          }
        }
        toast.success("Profile picture updated successfully!");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Profile picture upload failed:", error);
      toast.error("Failed to update profile picture.");
    }
  };

  // const handleProfilePicUpload = async (file) => {
  //   if (!file) return;

  //   try {
  //     // Create FormData and append the file
  //     const formData = new FormData();
  //     formData.append("file", file);

  //     // Generate a temporary URL for previewing the file
  //     const fileUrl = URL.createObjectURL(file);
  //     console.log("Profile Pic URL:", fileUrl);

  //     // Update local state to display the new profile picture
  //     setProfileDetails((prev) => ({ ...prev, profilePicture: fileUrl }));

  //     // Call the updateProfilePic API with the formData payload
  //     await updateProfilePic(formData);
  //     toast.success("Profile picture updated successfully!");
  //   } catch (error) {
  //     console.error("Profile picture upload failed:", error);
  //     toast.error("Failed to update profile picture.");
  //   }
  // };

  return (
    <Container fluid style={{ paddingInline: "2rem" }}>
      <div className={styles.rowContainer}>
        <h5>Personal Info</h5>
        <p className={styles.labelDescription}>
          Update your photo and personal details here
        </p>
      </div>

      <Row className={styles.rowContainer}>
        <Col md={3}>
          <label className={styles.label}>Name</label>
        </Col>
        <Col md="auto" style={{ flex: "0 0 20.8333%", maxWidth: "20.8333%" }}>
          <Form.Control
            type="text"
            placeholder="First Name"
            name="firstName"
            value={profileDetails.firstName}
            onChange={handleProfileDetailsChange}
          />
        </Col>

        <Col md="auto" style={{ flex: "0 0 20.8333%", maxWidth: "20.8333%" }}>
          <Form.Control
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={profileDetails.lastName}
            onChange={handleProfileDetailsChange}
          />
        </Col>
      </Row>

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
                value={userData.email}
                placeholder="Enter Email"
                className="input-field"
                style={{ paddingLeft: "40px" }}
              />
              <img src={Email} alt="Email" className="input-icon" />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <Row className={styles.rowContainer} style={{ paddingBottom: "10px" }}>
        <Col md={3}>
          <label className={styles.label}>Your Photo</label>
          <p className={styles.labelDescription}>
            This will be displayed on your profile
          </p>
        </Col>
        <Col md={1}>
          <img
            className="img img-thumbnail rounded-circle w-28"
            src={profileDetails.profilePicture || SampleAvatar}
            alt="upload"
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
              style={{ display: "none" }}
              onChange={(e) => handleProfilePicUpload(e.target.files[0])}
            />
          </div>
          <DragAndDropFileUpload
            onFileUpload={(fileUrl) => setCompanySeal(fileUrl)}
            onFileRemove={() => setCompanySeal("")}
          />
        </Col>
      </Row>

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
          ></Form.Control>
        </Col>
      </Row>

      {/* <Row className={styles.rowContainer}>
        <Col md={3}>
          <label className={styles.label}>Country</label>
        </Col>
        <Col md={5}>
          <Form.Select
            id="country"
            name="country"
            value={profileDetails.country}
            onChange={handleProfileDetailsChange}
          >
            <option>India</option>
          </Form.Select>
        </Col>
      </Row> */}

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
              readOnly // Makes the field non-editable
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className={styles.rowContainer}>
        <Col md={3}>
          <label className={styles.label}>Upload your signature</label>
          <p className={styles.labelDescription}>
            Share a few snippets of your work.
          </p>
        </Col>
        <Col md={9}>
          <div
            className={styles.formSection}
            style={{ backgroundColor: "#fff" }}
          >
            {signatures.map((signature, index) => (
              <div
                key={signature.id}
                className={styles.formSection}
                style={{ backgroundColor: "#fff", marginBottom: "20px" }}
              >
                <div className={styles.subHeaderLine}>
                  {signatures.length > 1 && (
                    <FiTrash2
                      onClick={() => removeSignature(index)}
                      size={20}
                      color="red"
                      style={{
                        cursor: "pointer",
                        marginLeft: "auto",
                        marginTop: "-20px",
                      }}
                    />
                  )}
                  <span className={styles.subHeaderText}>
                    Individual Signature {index + 1}
                  </span>
                </div>

                <Row className="mb-3">
                  {/* Name Field */}
                  <Col>
                    <Form.Group>
                      <Form.Label
                        htmlFor={`name-${index}`}
                        className="signup-label-two"
                      >
                        Name
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        id={`name-${index}`}
                        name="name"
                        value={signature.name}
                        onChange={(e) => handleSignatureChange(index, e)}
                        placeholder="Enter Your Name"
                        className="input-field_two"
                      />
                    </Form.Group>
                  </Col>

                  {/* Designation Dropdown */}
                  <Col>
                    <Form.Group>
                      <Form.Label
                        htmlFor={`designationId-${index}`}
                        className="signup-label-two"
                      >
                        Designation
                      </Form.Label>
                      <Form.Select
                        id={`designationId-${index}`}
                        name="designationId"
                        value={signature.designationId}
                        onChange={(e) => handleSignatureChange(index, e)}
                        required
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

                {/* Upload Section */}
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

                {/* Preview Uploaded Signature */}
                {signature.fileUrl && (
                  <div className="mb-3" style={{ textAlign: "center" }}>
                    <img
                      src={signature.fileUrl} // Corrected to use the fileUrl from state
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

            {/* Add More Button */}
            <div className="d-flex justify-content-center">
              <Button
                size="md"
                className="btn-success d-flex align-items-center px-4"
                onClick={addSignature}
              >
                <span>
                  <FiPlusCircle style={{ marginRight: "8px" }} />
                </span>
                Add more
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      <div className="py-4 d-flex justify-content-end">
        <Button
          onClick={refetchUserProfileDetails}
          size="md"
          className="mx-2 "
          style={{
            color: "black",
            backgroundColor: "white",
            border: "1px solid #C4C4C4",
          }}
          variant="outline-secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSaveAll}
          disabled={isUpdatingUserProfile}
          size="md"
          className="btn btn-bg-indigo mx-2"
          style={{ backgroundColor: "#4F46E5", color: "white" }} // Fix applied here
        >
          Save
        </Button>
      </div>
    </Container>
  );
}

export default ProfilePage;
