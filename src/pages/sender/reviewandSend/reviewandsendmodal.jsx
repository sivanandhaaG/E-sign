// import { useState } from "react";
// import { Col, Form, Row } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { IoLockOpen, IoPencilOutline } from "react-icons/io5";
// import "./index.css";
// import Signfaildpoup from "../signfaild/signfaildpoup";
// import DatePicker from "react-datepicker";

// import "react-datepicker/dist/react-datepicker.css";
// import { FaRegCalendarAlt } from "react-icons/fa";

// function Reviewandsendmodal({
//   show,
//   setShow,
//   data,
//   setReviewData,
//   reviewData,
//   handleSubmit,
// }) {
//   const [readMoreOrLess, setReadMoreOrless] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [showInput, setShowInput] = useState(false);
//   const [disableEditUsername, setDisableEditUsername] = useState(false);
//   const [photoKyc, setPhotoKyc] = useState(false);
//   const [showSecurityInput, setShowSecurityInput] = useState(false);
//   const [customDate, setCustomDate] = useState(null);
//   const [showDatePicker, setShowDatePicker] = useState(false);

//   const handleSecurityToggle = (e) => {
//     const checked = e.target.checked;
//     setReviewData((prev) => ({
//       ...prev,
//       securityEnabled: checked,
//       securityCode: checked ? prev.securityCode : "",
//     }));
//   };

//   const handleClose = () => setShow(false);
//   const handleOpen = () => {
//     setOpen(true);
//     setShow(false);
//   };
//   const placeOnlastPage = () => {
//     setShow(true);
//     setOpen(false);
//   };

//   const handleSwitchToggle = (e) => {
//     setShowInput(e.target.checked);
//   };

//   const handleDisableEditUsernameToggle = (e) => {
//     setDisableEditUsername(e.target.checked);
//   };

//   const handlePhotoKycToggle = (e) => {
//     setPhotoKyc(e.target.checked);
//   };

//   const handleSecuritySwitchToggle = (e) => {
//     setShowSecurityInput(e.target.checked);
//   };

//   const handleDateChange = (date) => {
//     setCustomDate(date);
//     setShowDatePicker(false); // Close date picker after selection
//   };

//   const toggleDatePicker = () => {
//     setShowDatePicker((prevState) => !prevState); // Toggle date picker visibility
//   };

//   return (
//     <>
//       <Modal
//         show={show}
//         size="lg"
//         aria-labelledby="example-modal-sizes-title-sm"
//         onHide={() => {
//           setShow(false);
//         }}
//       >
//         <Form onSubmit={handleSubmit}>
//           <Modal.Header closeButton>
//             <Modal.Title>Review And Send</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div className="review-and-send-modal">
//               <div>
//                 <h1 className="esign-page-heading">
//                   Compose your email invite
//                 </h1>

//                 <Form.Group controlId="formBasicName">
//                   <Form.Label className="esign-page-subheading">
//                     Reference Number
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={reviewData?.referenceNo}
//                     required
//                     onChange={(e) =>
//                       setReviewData({
//                         ...reviewData,
//                         referenceNo: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicName">
//                   <Form.Label className="esign-page-subheading">
//                     Subject
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     value={reviewData?.subject}
//                     required
//                     onChange={(e) =>
//                       setReviewData({
//                         ...reviewData,
//                         subject: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicName">
//                   <Form.Label className="esign-page-subheading">
//                     Message
//                   </Form.Label>
//                   <Form.Control
//                     type="text"
//                     as="textarea"
//                     row={6}
//                     required
//                     value={reviewData?.message}
//                     onChange={(e) =>
//                       setReviewData({
//                         ...reviewData,
//                         message: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <div>
//                   <Button
//                     className="zila-sign-int-patners-learn-more py-2"
//                     variant="link"
//                     onClick={() => {
//                       setReadMoreOrless(!readMoreOrLess);
//                     }}
//                     style={{
//                       padding: "0px",
//                     }}
//                   >
//                     {!readMoreOrLess ? "Less Option" : "More Option"}
//                   </Button>
//                 </div>
//                 {!readMoreOrLess && (
//                   <div className=" ">
//                     {/* <Form.Group className="mb-3" controlId="formBasicName">
//                     <p className="esign-page-heading mb-0">
//                       Set a email remainder
//                     </p>
//                     <p className="esign-page-subheading">
//                       Set the frequency of remainder to be sent until agreement
//                       is compalted
//                     </p>
//                     <Form.Select>
//                       <option>Every Week</option>
//                       <option>Every Week</option>
//                       <option>Every Week</option>
//                     </Form.Select>{" "}
//                   </Form.Group> */}

//                     {/* Enable Security Code Section */}
//                     <Form.Group controlId="enableSecurityCode" className="mb-3">
//                       <Row className="align-items-center">
//                         <Col>
//                           <p className="esign-page-heading mb-0">
//                             Enable Security Code
//                           </p>
//                           <p className="esign-page-subheading">
//                             Allow users to set a security code for added
//                             protection.
//                           </p>
//                         </Col>
//                         <Col xs="auto">
//                           <Form.Check
//                             type="switch"
//                             id="enableSecurityCodeSwitch"
//                             label=""
//                             onChange={handleSecuritySwitchToggle}
//                           />
//                         </Col>
//                       </Row>
//                       {showSecurityInput && (
//                         <Form.Control
//                           type="number"
//                           placeholder="Enter security code"
//                         />
//                       )}
//                     </Form.Group>

//                     {/* Photo KYC */}

//                     {/* Don't Allow to Edit UserName Section */}
//                     <Form.Group
//                       controlId="disableEditUsername"
//                       className="mb-3"
//                     >
//                       <Row className="align-items-center">
//                         <Col>
//                           <p className="esign-page-heading mb-0">Photo KYC</p>
//                           <p className="esign-page-subheading">
//                             Prevent users from modifying their username.
//                           </p>
//                         </Col>
//                         <Col xs="auto">
//                           <Form.Check
//                             type="switch"
//                             id="PhotoKycSwitch"
//                             label=""
//                             checked={photoKyc}
//                             onChange={handlePhotoKycToggle}
//                           />
//                         </Col>
//                       </Row>
//                     </Form.Group>

//                     <Form.Group controlId="formBasicName" className="mb-3">
//                       {/* Heading with Switch */}
//                       <Row className="align-items-center">
//                         <Col>
//                           <p className="esign-page-heading mb-0">
//                             Retry Attempts
//                           </p>
//                           <p className="esign-page-subheading">
//                             Retry Attempts will be sent to the recipient if they
//                             do not sign the agreement
//                           </p>
//                         </Col>
//                         <Col xs="auto">
//                           <Form.Check
//                             type="switch"
//                             id="retryAttemptsSwitch"
//                             label=""
//                             onChange={handleSwitchToggle}
//                           />
//                         </Col>
//                       </Row>

//                       {/* Conditionally Rendered Input Field */}
//                       {showInput && (
//                         <Form.Control
//                           type="number"
//                           placeholder="Enter number of retry attempts"
//                           // className="mt-3"
//                         />
//                       )}
//                     </Form.Group>

//                     <div className="d-flex justify-content-between align-items-center">
//                       <div>
//                         <p className="">Add CC</p>
//                         <p
//                           className="esign-page-subheading"
//                           style={{ marginTop: "-10px" }}
//                         >
//                           These recipients will receive a copy of the completed
//                           agreement.
//                         </p>
//                       </div>

//                       <Form.Check
//                         type="switch"
//                         label=""
//                         checked={reviewData?.showCC || false}
//                         onChange={(e) =>
//                           setReviewData({
//                             ...reviewData,
//                             showCC: e.target.checked,
//                           })
//                         }
//                       />
//                     </div>

//                     {reviewData?.showCC && (
//                       <Form.Group controlId="formBasicName">
//                         <Form.Control
//                           type="text"
//                           value={reviewData?.cc || ""}
//                           onChange={(e) =>
//                             setReviewData({
//                               ...reviewData,
//                               cc: e.target.value,
//                             })
//                           }
//                         />
//                         <p className="esign-page-subheading">
//                           Separate email addresses with a comma, semicolon or
//                           space
//                         </p>
//                       </Form.Group>
//                     )}

//                     {/* Expiry Date Section */}
//                     <Form.Group controlId="expiryDate" className="mb-3">
//                       <Row className="align-items-center">
//                         <Col>
//                           <p className="esign-page-heading mb-0">
//                             Custom Expiry
//                           </p>
//                           <p className="esign-page-subheading">
//                             Select the date by which the agreement expires.
//                           </p>
//                         </Col>
//                         <Col xs="auto">
//                           <div className="datepicker-wrapper">
//                             <DatePicker
//                               selected={customDate}
//                               onChange={handleDateChange}
//                               placeholderText="Select expiry date"
//                               className="form-control"
//                             />
//                             <i className="calendar-icon"></i>
//                           </div>
//                         </Col>
//                       </Row>
//                     </Form.Group>
//                   </div>
//                 )}

//                 {/* <Form.Group controlId="formBasicSecurity">
//                   <Form.Check
//                     type="checkbox"
//                     label="Enable Security Code"
//                     checked={reviewData?.securityEnabled || false}
//                     onChange={handleSecurityToggle}
//                   />
//                 </Form.Group> */}
//                 {reviewData?.securityEnabled && (
//                   <Form.Group controlId="formSecurityCode">
//                     <Form.Label className="esign-page-subheading">
//                       Security Code
//                     </Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={reviewData?.securityCode || ""}
//                       required
//                       onChange={(e) =>
//                         setReviewData((prev) => ({
//                           ...prev,
//                           securityCode: e.target.value,
//                         }))
//                       }
//                     />
//                   </Form.Group>
//                 )}
//               </div>
//               <div>
//                 <h1 className="esign-page-heading">Recipients</h1>
//                 <p className="esign-page-subheading">
//                   an email will be sent to recipient to sign the agreement. All
//                   parties will be emailed signed copy when its complate.
//                 </p>
//                 {data?.receivers?.map((item, index) => (
//                   <div className="file-display my-1" key={index}>
//                     <div className="d-flex gap-2 align-items-center">
//                       <IoPencilOutline />
//                       <div>
//                         <p className="doc-name">{item?.email}</p>
//                         <p className="candiate-name">{item?.name}</p>
//                       </div>
//                     </div>
//                     <IoLockOpen />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <Button
//               variant="secondary"
//               className="btn-slate"
//               onClick={handleClose}
//             >
//               Cancel
//             </Button>
//             <Button
//               className="btn-bg-indigo "
//               variant="primary"
//               type="submit"
//               // onClick={handleOpen}
//             >
//               Submit
//             </Button>
//           </Modal.Footer>
//         </Form>
//       </Modal>
//     </>
//   );
// }

// export default Reviewandsendmodal;

import { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IoLockOpen, IoPencilOutline } from "react-icons/io5";
import "./index.css";
import Signfaildpoup from "../signfaild/signfaildpoup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AddRecipient } from "../../../app/api/userApi";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Reviewandsendmodal({
  show,
  setShow,
  data,
  setReviewData,
  reviewData,
  handleSubmit,
  isReadOnly,
  readOnlyData,
  setLoading,
  loading,
}) {
  const [readMoreOrLess, setReadMoreOrless] = useState(false);
  const [open, setOpen] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [disableEditUsername, setDisableEditUsername] = useState(false);
  const [photoKyc, setPhotoKyc] = useState(false);
  const [showSecurityInput, setShowSecurityInput] = useState(false);
  const [customDate, setCustomDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigate = useNavigate();

  console.log(data?.receivers, "readOnlyData");
  const handleSecurityToggle = (e) => {
    const checked = e.target.checked;
    setReviewData((prev) => ({
      ...prev,
      securityCode: {
        ...prev.securityCode,
        isSecurity: checked,
      },
    }));
  };

  const handleSecurityCodeChange = (e) => {
    setReviewData((prev) => ({
      ...prev,
      securityCode: {
        ...prev.securityCode,
        code: e.target.value,
      },
    }));
  };

  const handleRetryToggle = (e) => {
    const checked = e.target.checked;
    setReviewData((prev) => ({
      ...prev,
      retryAttempts: {
        ...prev.retryAttempts,
        isRetrying: checked,
      },
    }));
  };
  const handleClose = () => setShow(false);
  const handleRetryAttemptsChange = (e) => {
    setReviewData((prev) => ({
      ...prev,
      retryAttempts: {
        ...prev.retryAttempts,
        attempts: e.target.value,
      },
    }));
  };

  const handlePhotoKycToggle = (e) => {
    setPhotoKyc(e.target.checked);
    setReviewData((prev) => ({
      ...prev,
      photoKyc: e.target.checked,
    }));
  };

  const handleDateChange = (date) => {
    setCustomDate(date);
    setReviewData((prev) => ({
      ...prev,
      customExpiry: date,
    }));
    setShowDatePicker(false);
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prevState) => !prevState);
  };

  const handleAddRecipient = async (eSignRequestId, newReceiver) => {
    setLoading(true);
    try {
      const response = await AddRecipient({ eSignRequestId, newReceiver });
      if (response?.status === true) {
        toast.success("Email has Sent Successfully");
      }
      if (response?.data) {
        console.log("Recipient added successfully:", response.data);
        return response.data;
      } else {
        console.warn("AddRecipient API call returned no data.");
        return null;
      }
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
      console.error("Error adding recipient:", error);
      return null;
    } finally {
      setLoading(false);
      setShow(false);
    }
  };

  return (
    <>
      <Modal
        show={show}
        size="lg"
        aria-labelledby="example-modal-sizes-title-sm"
        onHide={() => {
          setShow(false);
        }}
      >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Review And Send</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="review-and-send-modal">
              <div>
                <h1 className="esign-page-heading">
                  Compose your email invite
                </h1>

                <Form.Group controlId="formBasicName">
                  <Form.Label className="esign-page-subheading">
                    Reference Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      isReadOnly
                        ? readOnlyData?.eSignRequests?.[0]
                            ?.documentReferenceNumber
                        : reviewData?.referenceNo
                    }
                    required
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        referenceNo: e.target.value,
                      })
                    }
                    disabled={isReadOnly}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label className="esign-page-subheading">
                    Subject
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={
                      isReadOnly
                        ? readOnlyData?.eSignRequests?.[0]?.subject
                        : reviewData?.subject
                    }
                    required
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        subject: e.target.value,
                      })
                    }
                    disabled={isReadOnly}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicName">
                  <Form.Label className="esign-page-subheading">
                    Message
                  </Form.Label>
                  <Form.Control
                    type="text"
                    as="textarea"
                    row={6}
                    required
                    value={
                      isReadOnly
                        ? readOnlyData?.eSignRequests?.[0]?.message
                        : reviewData?.message
                    }
                    onChange={(e) =>
                      setReviewData({
                        ...reviewData,
                        message: e.target.value,
                      })
                    }
                    disabled={isReadOnly}
                  />
                </Form.Group>
                <div>
                  <Button
                    className="zila-sign-int-patners-learn-more py-2"
                    variant="link"
                    onClick={() => {
                      setReadMoreOrless(!readMoreOrLess);
                    }}
                    style={{
                      padding: "0px",
                    }}
                  >
                    {!readMoreOrLess ? "Less Option" : "More Option"}
                  </Button>
                </div>
                {!readMoreOrLess && (
                  <div className=" ">
                    {/* Enable Security Code Section */}
                    <Form.Group controlId="enableSecurityCode" className="mb-3">
                      <Row className="align-items-center">
                        <Col>
                          <p className="esign-page-heading mb-0">
                            Enable Security Code
                          </p>
                          <p className="esign-page-subheading">
                            Allow users to set a security code for added
                            protection.
                          </p>
                        </Col>
                        <Col xs="auto">
                          <Form.Check
                            type="switch"
                            id="enableSecurityCodeSwitch"
                            label=""
                            checked={
                              isReadOnly
                                ? readOnlyData?.eSignRequests?.[0]
                                    ?.securityCode || false
                                : reviewData?.securityCode?.isSecurity || false
                            }
                            onChange={handleSecurityToggle}
                            disabled={isReadOnly}
                          />
                        </Col>
                      </Row>

                      {isReadOnly
                        ? readOnlyData?.eSignRequests?.[0]?.securityCode
                        : reviewData?.securityCode?.isSecurity && (
                            <Form.Control
                              // type="number"
                              placeholder="Enter security code"
                              value={
                                isReadOnly
                                  ? readOnlyData?.eSignRequests?.[0]
                                      ?.securityCode || ""
                                  : reviewData?.securityCode?.code || "" || ""
                              }
                              onChange={handleSecurityCodeChange}
                              onWheel={(e) => e.target.blur()}
                              required
                            />
                          )}
                    </Form.Group>

                    {/* Retry Attempts Section */}
                    <Form.Group controlId="retryAttempts" className="mb-3">
                      <Row className="align-items-center">
                        <Col>
                          <p className="esign-page-heading mb-0">
                            Retry Attempts
                          </p>
                          <p className="esign-page-subheading">
                            Retry Attempts will be sent to the recipient if they
                            do not sign the agreement.
                          </p>
                        </Col>
                        <Col xs="auto">
                          <Form.Check
                            type="switch"
                            id="retryAttemptsSwitch"
                            label=""
                            checked={
                              isReadOnly
                                ? readOnlyData?.documentdetails?.retryAttempts
                                    ?.isRetrying || false
                                : reviewData?.retryAttempts?.isRetrying || false
                            }
                            onChange={handleRetryToggle}
                            disabled={isReadOnly}
                          />
                        </Col>
                      </Row>

                      {isReadOnly
                        ? readOnlyData?.documentdetails?.retryAttempts?.attempts
                        : reviewData?.retryAttempts?.isRetrying && (
                            <Form.Control
                              type="number"
                              placeholder="Enter number of retry attempts"
                              value={
                                isReadOnly
                                  ? readOnlyData?.documentdetails?.retryAttempts
                                      ?.attempts
                                  : reviewData?.retryAttempts?.attempts ||
                                    "" ||
                                    ""
                              }
                              onChange={handleRetryAttemptsChange}
                              onWheel={(e) => e.target.blur()}
                              required
                            />
                          )}
                    </Form.Group>

                    {/* Photo KYC Section */}
                    <Form.Group controlId="photoKyc" className="mb-3">
                      <Row className="align-items-center">
                        <Col>
                          <p className="esign-page-heading mb-0">Photo KYC</p>
                          <p className="esign-page-subheading">
                            Enable photo KYC for added security.
                          </p>
                        </Col>
                        <Col xs="auto">
                          <Form.Check
                            type="switch"
                            id="photoKycSwitch"
                            label=""
                            checked={
                              isReadOnly
                                ? readOnlyData?.documentdetails?.photoKYC
                                : photoKyc
                            }
                            onChange={handlePhotoKycToggle}
                            disabled={isReadOnly}
                          />
                        </Col>
                      </Row>
                    </Form.Group>

                    {/* Custom Expiry Section */}
                    <Form.Group controlId="expiryDate" className="mb-3">
                      <Row className="align-items-center">
                        <Col>
                          <p className="esign-page-heading mb-0">
                            Custom Expiry
                          </p>
                          <p className="esign-page-subheading">
                            Select the date by which the agreement expires.
                          </p>
                        </Col>
                        <Col xs="auto">
                          <div className="datepicker-wrapper">
                            <DatePicker
                              selected={
                                isReadOnly
                                  ? readOnlyData?.documentdetails?.expiryDate
                                  : customDate
                              }
                              onChange={handleDateChange}
                              placeholderText="Select expiry date"
                              className="form-control"
                              disabled={isReadOnly}
                              minDate={
                                new Date(
                                  new Date().setDate(new Date().getDate() + 1)
                                )
                              }
                            />
                            <i className="calendar-icon"></i>
                          </div>
                        </Col>
                      </Row>
                    </Form.Group>
                  </div>
                )}
              </div>
              <div>
                <h1 className="esign-page-heading">Recipients</h1>
                <p className="esign-page-subheading">
                  An email will be sent to recipient to sign the agreement. All
                  parties will be emailed signed copy when its complete.
                </p>
                {data?.receivers?.map((item, index) => (
                  <div className="file-display my-1" key={index}>
                    <div className="d-flex gap-2 align-items-center">
                      <IoPencilOutline />
                      <div>
                        <p className="doc-name">{item?.email}</p>
                        <p className="candiate-name">{item?.name}</p>
                      </div>
                    </div>
                    <IoLockOpen />
                  </div>
                ))}
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              className="btn-slate"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className="btn-bg-indigo"
              variant="primary"
              type={isReadOnly ? "button" : "submit"}
              disabled={loading}
              onClick={() => {
                if (isReadOnly) {
                  handleAddRecipient(
                    readOnlyData?.eSignRequests?.[0]?.eSignRequestId,
                    data?.receivers?.map((receiver) => ({
                      ...receiver,
                      kycStatus: readOnlyData?.documentdetails?.photoKYC,
                    })) || []
                  );

                  navigate("/documents");
                }
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Toaster
                          toastOptions={{
                            duration: 4000,
                            closeButton: true,
                          }}
                        />
    </>
  );
}

export default Reviewandsendmodal;
