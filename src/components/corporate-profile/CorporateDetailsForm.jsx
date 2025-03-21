// import React, { useRef, useState } from "react";
// import { Button, Col, Form, Row } from "react-bootstrap";
// import DragAndDropFileUpload from "../common/DragAndDropFileUpload/DragAndDropFileUpload";
// import styles from "./CorporateDetailsForm.module.css";
// import { fetchAllCompanyTypes } from "../../app/api/masterApi";
// import { useMutation, useQuery } from "react-query";
// import "./CorporateDetailsForm.css";
// import {
//   getUserCorporateDetails,
//   updateCorporateDetails,
// } from "../../app/api/userApi";
// import Email from "../../../src/assets/svg/userpage/mail.svg";
// import UploadIcon from "../../../src/assets/svg/userpage/upload.svg";
// import CopyIcon from "../../../src/assets/svg/userpage/copy.svg";
// import { Divider } from "@chakra-ui/react";
// import { uploadImageToS3 } from "../../app/api/uploadApi";

// function CorporateDetailsForm() {
//   const [formData, setFormData] = useState({
//     companyName: "",
//     companyTypeId: "",
//     companyEmail: "",
//     numberOfEmployees: "100-200",
//     companySeal: "",

//     companyAddress: "",
//     state: "",
//     country: "",
//     gstNumber: "",
//     cinNumber: "",
//     companyTAN: "",
//     companyPAN: "",

//     bankAccountHolderName: "",
//     bankAccountNumber: "",
//     bankName: "",
//     bankAccountType: "",
//     bankAddress: "",
//     ifsc: "",
//     swiftCode: "",
//     iban: "",
//     accountType: "",
//   });

//   const fileInputRef = useRef(null);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const setCompanySeal = (fileUrl) => {
//     setFormData((prev) => ({ ...prev, companySeal: fileUrl }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // alert(JSON.stringify(formData, null, 2));
//     handleCorporateDetailsUpdate(formData);
//   };

//   const { data: companyTypeData } = useQuery(
//     "companyTypes",
//     fetchAllCompanyTypes
//   );

//   const { refetch: refetchUserCorporateProfile } = useQuery(
//     "corporate-details",
//     getUserCorporateDetails,
//     {
//       onSuccess: (data) => {
//         setFormData(data.data);
//       },
//     }
//   );

//   const {
//     mutate: handleCorporateDetailsUpdate,
//     isLoading: isUpdatingCorporateDetails,
//   } = useMutation(updateCorporateDetails, {
//     onSuccess: (data) => {
//       toast.success("Corporate Details Updated Successfully");
//     },
//     onError: (error) => {
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       }
//     },
//   });

//   const handleFileUpload = async (e) => {
//     console.log("File upload triggered");
//     const file = e.target.files[0];
//     if (!file) return;

//     console.log("Selected file:", file);

//     const uploadFormData = new FormData();
//     uploadFormData.append("file", file);

//     try {
//       const response = await uploadImageToS3(uploadFormData);
//       console.log("Upload response:", response);
//       setCompanySeal(response.fileUrl);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <Form className={styles.container} onSubmit={handleSubmit}>
//       {/* Company Name and Company Type Inline Form Controls */}
//       <Row className="mb-3">
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="companyName" className="signup-label">
//               Company Name
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="companyName"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               placeholder="Enter Company Name"
//             />
//           </Form.Group>
//         </Col>

//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="companyTypeId" className="signup-label">
//               Company Type
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Select
//               id="companyTypeId"
//               name="companyTypeId"
//               value={formData.companyTypeId}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select a Company Type</option>
//               {companyTypeData?.data &&
//                 companyTypeData.data.map((companyType) => (
//                   <option
//                     key={companyType.companyTypeId}
//                     value={companyType.companyTypeId}
//                   >
//                     {companyType.name}
//                   </option>
//                 ))}
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Company Email and Number of Employee Inline Form Controls */}
//       <Row className="mb-3">
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="companyEmail" className="signup-label">
//               Company Email
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="email"
//               id="companyEmail"
//               name="companyEmail"
//               value={formData.companyEmail}
//               onChange={handleChange}
//               placeholder="Enter Company Email"
//             />
//           </Form.Group>
//         </Col>

//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="numberOfEmployees" className="signup-label">
//               Number of Employees
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Select
//               id="numberOfEmployees"
//               name="numberOfEmployees"
//               value={formData.numberOfEmployees}
//               onChange={handleChange}
//             >
//               <option>10-100</option>
//               <option>100-500</option>
//               <option>500-1000</option>
//             </Form.Select>
//           </Form.Group>
//         </Col>
//       </Row>

//       <div className="mb-3">
//         <Form.Group>
//           <Form.Label htmlFor="companyAddress" className="signup-label">
//             Registered Address
//             <span className="signup-label-mandatory"> * </span>
//           </Form.Label>

//           <Form.Control
//             type="address"
//             id="companyAddress"
//             name="companyAddress"
//             value={formData.companyAddress}
//             onChange={handleChange}
//             placeholder="Enter Company Address"
//           />
//         </Form.Group>
//       </div>

//       <Row className="mb-3">
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="state" className="signup-label">
//               State/Province
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               type="text"
//               id="state"
//               name="state"
//               value={formData.state}
//               onChange={handleChange}
//               placeholder="Enter State/Province"
//               required
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="pincode" className="signup-label">
//               Pin/Zip Code
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="pincode"
//               name="pincode"
//               value={formData.pincode}
//               onChange={handleChange}
//               placeholder="Enter Pin/Zip Code"
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="country" className="signup-label">
//               Country
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="country"
//               name="country"
//               value={formData.country}
//               onChange={handleChange}
//               placeholder="Enter Country"
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="gstNumber" className="signup-label">
//               GST Number
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="gstNumber"
//               name="gstNumber"
//               value={formData.gstNumber}
//               onChange={handleChange}
//               placeholder="Enter GST Number"
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="cinNumber" className="signup-label">
//               CIN Number
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="cinNumber"
//               name="cinNumber"
//               value={formData.cinNumber}
//               onChange={handleChange}
//               placeholder="Enter CIN Number"
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       <Row className="mb-3">

//         <Col>
//           <Form.Group>
//             <Form.Label htmlFor="companyPAN" className="signup-label">
//               Company PAN
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="companyPAN"
//               name="companyPAN"
//               value={formData.companyPAN}
//               onChange={handleChange}
//               placeholder="Enter Company PAN"
//             />
//           </Form.Group>
//         </Col>
//         <Col>
//           <Form.Group>
//             <Form.Label
//               htmlFor="companyTAN"
//               className="signup-label"
//               style={{ fontWeight: "100" }}
//             >
//               Company TAN
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>
//             <Form.Control
//               required
//               type="text"
//               id="companyTAN"
//               name="companyTAN"
//               value={formData.companyTAN}
//               onChange={handleChange}
//               placeholder="Enter Company TAN"
//             />
//           </Form.Group>
//         </Col>
//         <div className="mt-3">
//             <Form.Group className="input-container">
//               <Form.Label htmlFor="email" className="signup-label">
//                 Email
//               </Form.Label>

//               <div className="input-wrapper">
//                 <Form.Control
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Enter Email"
//                   className="input-field"
//                   style={{ paddingLeft: "40px",paddingBottom:"10px" }}
//                 />
//                 <img src={Email} alt="Email" className="input-icon" />
//               </div>
//             </Form.Group>
//         </div>
//       </Row>

//       {/* Bank Details (Start) */}
//       <div className={styles.formSection}>
//         <div className={styles.subHeaderLine}>
//           <span className={styles.subHeaderText}>Bank Details</span>
//         </div>

//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label
//                 htmlFor="bankAccountHolderName"
//                 className="signup-label_two"
//               >
//                 Account Holder's Name
//                 <span className="signup-label-mandatory"> * </span>
//               </Form.Label>
//               <Form.Control
//                 required
//                 type="text"
//                 id="bankAccountHolderName"
//                 name="bankAccountHolderName"
//                 value={formData.bankAccountHolderName}
//                 onChange={handleChange}
//                 placeholder="Enter Account Holder's Name"
//                 className="input-field_two"
//               />
//             </Form.Group>
//           </Col>
//           <Col>
//             <Form.Group className="input-container">
//               <Form.Label
//                 htmlFor="bankAccountNumber"
//                 className="signup-label_two"
//               >
//                 Account Number
//               </Form.Label>
//               <div className="input-wrapper">
//                 <Form.Control
//                   type="text"
//                   id="bankAccountNumber"
//                   name="bankAccountNumber"
//                   value={formData.bankAccountNumber}
//                   onChange={handleChange}
//                   placeholder="Enter Account Number"
//                   className="input-field"
//                 />
//                 <img
//                   src={CopyIcon}
//                   alt="Copy Icon"
//                   className="input-icon_copy"
//                   onClick={() => {
//                     navigator.clipboard.writeText(formData.bankAccountNumber);
//                     alert("Copied to clipboard!");
//                   }}
//                 />
//               </div>
//             </Form.Group>
//           </Col>
//         </Row>

//         <Row className="mb-3">
//           <Col>
//             <Form.Group>
//               <Form.Label htmlFor="bankName" className="signup-label_two">
//                 Bank Name
//                 <span className="signup-label-mandatory"> * </span>
//               </Form.Label>
//               <Form.Select
//                 id="bankName"
//                 name="bankName"
//                 value={formData.bankName}
//                 onChange={handleChange}
//                 required
//                 className="input-field_two"
//               >
//                 <option>State Bank of India</option>
//                 <option>Punjab National Bank</option>
//                 <option>HDFC</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>

//           <Col>
//             <Form.Group>
//               <Form.Label
//                 htmlFor="bankAccountType"
//                 className="signup-label_two"
//               >
//                 Bank Name
//                 <span className="signup-label-mandatory"> * </span>
//               </Form.Label>
//               <Form.Select
//                 id="bankAccountType"
//                 name="bankAccountType"
//                 value={formData.bankAccountType}
//                 onChange={handleChange}
//                 required
//                 className="input-field_two"
//               >
//                 <option>Current</option>
//                 <option>Savings</option>
//               </Form.Select>
//             </Form.Group>
//           </Col>
//         </Row>

//         <div className="mb-3">
//           <Form.Group>
//             <Form.Label htmlFor="bankAddress" className="signup-label_two">
//               Address of the bank
//             </Form.Label>

//             <Form.Control
//               as="textarea"
//               row={5}
//               id="bankAddress"
//               name="bankAddress"
//               value={formData.bankAddress}
//               onChange={handleChange}
//               placeholder="Enter Bank Address"
//             />
//           </Form.Group>
//         </div>

//         <Row className="mb-3">
//           <Col>
//             <Form.Label htmlFor="ifsc" className="signup-label_two">
//               IFSC Code
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>

//             <Form.Control
//               type="text"
//               id="ifsc"
//               name="ifsc"
//               value={formData.ifsc}
//               onChange={handleChange}
//               placeholder="Enter IFSC Code"
//               required
//               className="input-field_two"
//             />
//           </Col>
//           <Col>
//             <Form.Label htmlFor="swiftCode" className="signup-label_two">
//               Swift Code
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>

//             <Form.Control
//               type="text"
//               id="swiftCode"
//               name="swiftCode"
//               value={formData.swiftCode}
//               onChange={handleChange}
//               placeholder="Enter Swift Code"
//               required
//               className="input-field_two"
//             />
//           </Col>
//           <Col>
//             <Form.Label htmlFor="iban" className="signup-label_two">
//               IBAN
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>

//             <Form.Control
//               type="text"
//               id="iban"
//               name="iban"
//               value={formData.iban}
//               onChange={handleChange}
//               placeholder="Enter IBAN"
//               required
//               className="input-field_two"
//             />
//           </Col>
//           <Col>
//             <Form.Label htmlFor="accountType" className="signup-label_two">
//               Account type
//               <span className="signup-label-mandatory"> * </span>
//             </Form.Label>

//             <Form.Control
//               type="text"
//               id="accountType"
//               name="accountType"
//               value={formData.accountType}
//                 onChange={handleChange}
//               placeholder="Current account"
//               required
//               className="input-field_two"
//             />
//           </Col>
//         </Row>
//       </div>

//       {/* Bank Details (End)*/}

//       {/* Upload Company Seal */}
//       <label className="signup-label">Upload Company Seal</label>
//       <div
//         className="upload-container"
//         onClick={() => document.getElementById("fileInput").click()}
//       >
//         <img src={UploadIcon} alt="Upload Icon" className="upload-icon" />
//         <div className="upload-text">
//           Click to upload <span className="upload-dnd">or drag and drop</span>
//         </div>
//         <div className="upload-hint">SVG, PNG, JPG or GIF (max. 800×400px)</div>
//         <input
//           type="file"
//           ref={fileInputRef}
//           style={{ display: "none" }}
//           onChange={handleFileUpload}
//         />
//       </div>
//       <DragAndDropFileUpload
//         onFileUpload={(fileUrl) => setCompanySeal(fileUrl)}
//         onFileRemove={() => setCompanySeal("")}
//       />

//       <Divider />

//       <div className="py-0 d-flex justify-content-end">
//         <Button
//           size="md"
//           className="mx-2 "
//           style={{
//             color: "black",
//             backgroundColor: "white",
//             border: "1px solid #C4C4C4",
//           }}
//           variant="outline-secondary"
//           onClick={refetchUserCorporateProfile}
//         >
//           Cancel
//         </Button>
//         <Button
//           type="submit"
//           size="md"
//           className="btn btn-bg-indigo mx-2"
//           style={{ backgroundColor: "#4F46E5", color: "white" }} // Fix applied here
//           disabled={isUpdatingCorporateDetails}
//         >
//           Save Changes
//         </Button>
//       </div>
//     </Form>
//   );
// }

// export default CorporateDetailsForm;

import React, { useRef, useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import DragAndDropFileUpload from "../common/DragAndDropFileUpload/DragAndDropFileUpload";
import styles from "./CorporateDetailsForm.module.css";
import { fetchAllCompanyTypes } from "../../app/api/masterApi";
import { useMutation, useQuery } from "react-query";
import "./CorporateDetailsForm.css";
import {
  getUserCorporateDetails,
  updateCorporateDetails,
} from "../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import Email from "../../../src/assets/svg/userpage/mail.svg";
import UploadIcon from "../../../src/assets/svg/userpage/upload.svg";
import CopyIcon from "../../../src/assets/svg/userpage/copy.svg";
import { Divider } from "@chakra-ui/react";
import { uploadImageToS3 } from "../../app/api/uploadApi";

function CorporateDetailsForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyTypeId: "",
    companyEmail: "",
    numberOfEmployees: "100-200",
    companySeal: "",
    // We'll store the file name in a new property:
    sealFileName: "",
    companyAddress: "",
    state: "",
    country: "",
    gstNumber: "",
    cinNumber: "",
    companyTAN: "",
    companyPAN: "",
    bankAccountHolderName: "",
    bankAccountNumber: "",
    bankName: "",
    bankAccountType: "",
    bankAddress: "",
    ifsc: "",
    swiftCode: "",
    iban: "",
    accountType: "",
    email: "",
  });

  // Local state for tracking upload progress
  const [sealLoading, setSealLoading] = useState(false);
  const [sealUploadMessage, setSealUploadMessage] = useState("");

  // Use a ref for the hidden file input
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Updates the companySeal URL and file name in state.
  const setCompanySeal = (fileUrl, fileName = "") => {
    setFormData((prev) => ({
      ...prev,
      companySeal: fileUrl,
      sealFileName: fileName,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update corporate details using your API mutation
    handleCorporateDetailsUpdate(formData);
  };

  const { data: corporateData, refetch: refetchUserCorporateProfile } =
    useQuery("corporate-details", getUserCorporateDetails, {
      enabled: false,
      onSuccess: (data) => {
        setFormData(data.data);
      },
    });

  useEffect(() => {
    refetchUserCorporateProfile();
  }, []);

  useEffect(() => {
    if (corporateData?.data) {
      setFormData((prevData) => ({
        ...prevData,
        ...corporateData.data,
      }));
    }
  }, [corporateData]);

  const { data: companyTypeData, refetch: refetchCompanyTypes } = useQuery(
    "companyTypes",
    fetchAllCompanyTypes,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetchCompanyTypes();
  }, []);
  const {
    mutate: handleCorporateDetailsUpdate,
    isLoading: isUpdatingCorporateDetails,
  } = useMutation(updateCorporateDetails, {
    onSuccess: () => {
      toast.success("Corporate Details Updated Successfully");
      setTimeout(() => {
        refetchUserCorporateProfile();
      }, 1000);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Error updating details");
    },
  });

  // File upload handler with progress feedback and storing file name
  const handleFileUpload = async (e) => {
    console.log("File upload triggered");
    const file = e.target.files[0];
    if (!file) return;

    console.log("Selected file:", file);
    setSealLoading(true);
    setSealUploadMessage("Uploading...");

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);

    try {
      const response = await uploadImageToS3(uploadFormData);
      // Extract the file URL from the response (adjust depending on your API's format)
      const fileUrl = response?.data?.fileUrl || response?.fileUrl;
      console.log("sealUrl", fileUrl);
      if (fileUrl) {
        // Store both the URL and the file name
        setCompanySeal(fileUrl, file.name);
        setSealUploadMessage("Uploaded successfully");
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setSealUploadMessage("Upload failed");
      toast.error("Error uploading file");
    } finally {
      setSealLoading(false);
    }
  };

  return (
    <>
      <Form className={styles.container} onSubmit={handleSubmit}>
        {/* Company Name and Company Type Inline Form Controls */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="companyName" className="signup-label">
                Company Name
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter Company Name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="companyTypeId" className="signup-label">
                Company Type
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Select
                id="companyTypeId"
                name="companyTypeId"
                value={formData.companyTypeId}
                onChange={handleChange}
                required
              >
                <option value="">Select a Company Type</option>
                {companyTypeData?.data &&
                  companyTypeData.data.map((companyType) => (
                    <option
                      key={companyType.companyTypeId}
                      value={companyType.companyTypeId}
                    >
                      {companyType.name}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Company Email and Number of Employees */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="companyEmail" className="signup-label">
                Company Email
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="email"
                id="companyEmail"
                name="companyEmail"
                disabled
                value={formData.companyEmail}
                onChange={handleChange}
                placeholder="Enter Company Email"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="numberOfEmployees" className="signup-label">
                Number of Employees
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Select
                id="numberOfEmployees"
                name="numberOfEmployees"
                value={formData.numberOfEmployees}
                onChange={handleChange}
              >
                <option>10-100</option>
                <option>100-500</option>
                <option>500-1000</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Registered Address */}
        <div className="mb-3">
          <Form.Group>
            <Form.Label htmlFor="companyAddress" className="signup-label">
              Registered Address
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Control
              type="address"
              id="companyAddress"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="Enter Company Address"
            />
          </Form.Group>
        </div>

        {/* State, Pin/Zip, Country */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="state" className="signup-label">
                State/Province
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State/Province"
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="pincode" className="signup-label">
                Pin/Zip Code
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter Pin/Zip Code"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="country" className="signup-label">
                Country
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* GST, CIN */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="gstNumber" className="signup-label">
                GST Number
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="gstNumber"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                placeholder="Enter GST Number"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="cinNumber" className="signup-label">
                CIN Number
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="cinNumber"
                name="cinNumber"
                value={formData.cinNumber}
                onChange={handleChange}
                placeholder="Enter CIN Number"
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Company PAN, TAN, Email */}
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="companyPAN" className="signup-label">
                Company PAN
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="companyPAN"
                name="companyPAN"
                value={formData.companyPAN}
                onChange={handleChange}
                placeholder="Enter Company PAN"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label
                htmlFor="companyTAN"
                className="signup-label"
                style={{ fontWeight: "100" }}
              >
                Company TAN
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="companyTAN"
                name="companyTAN"
                value={formData.companyTAN}
                onChange={handleChange}
                placeholder="Enter Company TAN"
              />
            </Form.Group>
          </Col>
          {/* <div className="mt-3">
          <Form.Group className="input-container">
            <Form.Label htmlFor="email" className="signup-label">
              Email
            </Form.Label>
            <div className="input-wrapper">
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Email"
                className="input-field"
                style={{ paddingLeft: "40px", paddingBottom: "10px" }}
              />
              <img src={Email} alt="Email" className="input-icon" />
            </div>
          </Form.Group>
        </div> */}
        </Row>

        {/* Bank Details Section */}
        <div className={styles.formSection}>
          <div className={styles.subHeaderLine}>
            <span className={styles.subHeaderText}>Bank Details</span>
          </div>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label
                  htmlFor="bankAccountHolderName"
                  className="signup-label_two"
                >
                  Account Holder's Name
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  id="bankAccountHolderName"
                  name="bankAccountHolderName"
                  value={formData.bankAccountHolderName}
                  onChange={handleChange}
                  placeholder="Enter Account Holder's Name"
                  className="input-field_two"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="input-container">
                <Form.Label
                  htmlFor="bankAccountNumber"
                  className="signup-label_two"
                >
                  Account Number
                </Form.Label>
                <div className="input-wrapper">
                  <Form.Control
                    type="text"
                    id="bankAccountNumber"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="Enter Account Number"
                    className="input-field"
                  />
                  <img
                    src={CopyIcon}
                    alt="Copy Icon"
                    className="input-icon_copy"
                    onClick={() => {
                      navigator.clipboard.writeText(formData.bankAccountNumber);
                      alert("Copied to clipboard!");
                    }}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label htmlFor="bankName" className="signup-label_two">
                  Bank Name
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Select
                  id="bankName"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  required
                  className="input-field_two"
                >
                  <option>State Bank of India</option>
                  <option>Punjab National Bank</option>
                  <option>HDFC</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label
                  htmlFor="bankAccountType"
                  className="signup-label_two"
                >
                  Bank Account Type
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Select
                  id="bankAccountType"
                  name="bankAccountType"
                  value={formData.bankAccountType}
                  onChange={handleChange}
                  required
                  className="input-field_two"
                >
                  <option>Current</option>
                  <option>Savings</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="mb-3">
            <Form.Group>
              <Form.Label htmlFor="bankAddress" className="signup-label_two">
                Address of the bank
              </Form.Label>
              <Form.Control
                as="textarea"
                row={5}
                id="bankAddress"
                name="bankAddress"
                value={formData.bankAddress}
                onChange={handleChange}
                placeholder="Enter Bank Address"
              />
            </Form.Group>
          </div>
          <Row className="mb-3">
            <Col>
              <Form.Label htmlFor="ifsc" className="signup-label_two">
                IFSC Code
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                type="text"
                id="ifsc"
                name="ifsc"
                value={formData.ifsc}
                onChange={handleChange}
                placeholder="Enter IFSC Code"
                required
                className="input-field_two"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="swiftCode" className="signup-label_two">
                Swift Code
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                type="text"
                id="swiftCode"
                name="swiftCode"
                value={formData.swiftCode}
                onChange={handleChange}
                placeholder="Enter Swift Code"
                required
                className="input-field_two"
              />
            </Col>
            <Col>
              <Form.Label htmlFor="iban" className="signup-label_two">
                IBAN
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                type="text"
                id="iban"
                name="iban"
                value={formData.iban}
                onChange={handleChange}
                placeholder="Enter IBAN"
                required
                className="input-field_two"
              />
            </Col>
            {/* <Col>
            <Form.Label htmlFor="accountType" className="signup-label_two">
              Account Type
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Control
              type="text"
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              placeholder="Current account"
              required
              className="input-field_two"
            />
          </Col> */}
          </Row>
        </div>

        {/* Upload Company Seal */}
        <label className="signup-label">Upload Company Seal</label>
        <div
          className="upload-container"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
        >
          <img src={UploadIcon} alt="Upload Icon" className="upload-icon" />
          <div className="upload-text">
            Click to upload <span className="upload-dnd">or drag and drop</span>
          </div>
          <div className="upload-hint">
            SVG, PNG, JPG or GIF (max. 800×400px)
          </div>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileUpload}
          />
        </div>
        <DragAndDropFileUpload
          onFileUpload={(fileUrl) => setCompanySeal(fileUrl)}
          onFileRemove={() => setCompanySeal("")}
        />

        {/* Display upload status message */}
        {sealUploadMessage && (
          <div
            className="upload-status"
            style={{ display: "flex", justifyContent: "center" }}
          >
            {sealLoading ? (
              <span style={{ color: "blue" }}>Uploading...</span>
            ) : (
              <span style={{ color: "green" }}>{sealUploadMessage}</span>
            )}
          </div>
        )}

        {/* Preview Uploaded Company Seal with File Name */}
        {formData.companySeal && (
          <div className="mb-3" style={{ textAlign: "center" }}>
            <img
              src={formData.companySeal}
              alt="Company Seal Preview"
              style={{
                maxWidth: "150px",
                marginTop: "10px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
            {formData.sealFileName && (
              <p style={{ marginTop: "5px" }}>{formData.sealFileName}</p>
            )}
          </div>
        )}

        <Divider />

        <div className="py-0 d-flex justify-content-end">
          {/* <Button
            size="md"
            className="mx-2"
            style={{
              color: "black",
              backgroundColor: "white",
              border: "1px solid #C4C4C4",
            }}
            variant="outline-secondary"
            onClick={refetchUserCorporateProfile}
          >
            Cancel
          </Button> */}
          <Button
            type="submit"
            size="md"
            className="btn btn-bg-indigo mx-2"
            style={{ backgroundColor: "#4F46E5", color: "white" }}
            disabled={isUpdatingCorporateDetails}
          >
            Save Changes
          </Button>
        </div>
      </Form>
      <Toaster
        toastOptions={{
          duration: 4000,
          closeButton: true,
        }}
      />
    </>
  );
}

export default CorporateDetailsForm;
