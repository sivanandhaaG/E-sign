import { useCallback, useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import LeftArrowImg from "../../assets/images/general/arrow-left.png";
import RightArrowImg from "../../assets/images/general/arrow-right.png";
import CreateDocument from "./create-document";
import ReceiverDetails from "./receiver-details";
import Send from "./send";
import { useMutation } from "react-query";
import { createESignRequest } from "../../app/api/userApi";
import MyStepper from "../../components/common/MyStepper/MyStepper";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import TopSection from "./TopSection";
import Reviewandsendmodal from "./reviewandSend/reviewandsendmodal";
import Signfaildpoup from "./signfaild/signfaildpoup";
import { border } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { getDocumentDetailsId } from "../../app/api/userApi";
import { set } from "react-hook-form";
import DocumentCreationModal from "../../components/common/Modals/DocumentCreationModal";

function SenderPage() {
  const steps = [
    { header: "Create", subHeader: "Please provide your name and email" },
    { header: "Receiver Details", subHeader: "Enter details of the receiver" },
    { header: "Send", subHeader: "One Final Step" },
  ];
  const [show, setShow] = useState(false);
  const [reviewData, setReviewData] = useState({
    referenceNo: "",
    subject: "",
    message: "",
    cc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState([]);
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [validateMessage, setValidateMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [documentmodal, setDocumentModal] = useState(false);

  // Data
  const [documentData, setDocumentData] = useState({
    documentName: "",
    documentReferenceNumber: "",
    fileUrl: "",
    markers: [],
  });
  const [receivers, setReceivers] = useState([
    { name: "", email: "", phoneNumber: "", markers: [] },
  ]);
  const [isChecked, setIsChecked] = useState(false);
  const [kycCheckedUsers, setKycCheckedUsers] = useState({});

  console.log(kycCheckedUsers, "kycCheckedUsers");

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const modeValue = searchParams.get("mode"); // e.g. "add-recipient/c47e01b9-ac70-487c-a9b9-ae2790928fcc"
  const [mode, docId] = modeValue ? modeValue.split("/") : [null, null];

  const isReadOnly = mode === "add-recipient";

  const stepFormDataMap = {
    0: documentData,
    1: receivers,
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CreateDocument
            documentData={documentData}
            setDocumentData={setDocumentData}
            isReadOnly={isReadOnly}
            data={data}
          />
        );
      case 1:
        return (
          <ReceiverDetails
            receivers={receivers}
            setReceivers={setReceivers}
            isReadOnly={isReadOnly}
          />
        );
      default:
        return (
          <Send
            handleSend={handleSend}
            isSending={isESignRequestSubmitting}
            documentData={documentData}
            setDocumentData={setDocumentData}
            receivers={receivers}
            setReceivers={setReceivers}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
            setKycCheckedUsers={setKycCheckedUsers}
            kycCheckedUsers={kycCheckedUsers}
            isReadOnly={isReadOnly}
            data={data}
          />
        );
    }
  };

  const { mutate: submitESignRequest, isLoading: isESignRequestSubmitting } =
    useMutation(createESignRequest, {
      retry: 0,
      onSuccess: (data) => {
        setDocumentModal(true);
        setShow(false);
        // toast.success("ESign Request Sent Successfully");
        // navigate("/documents");
        
      },
      onError: (error) => {
        if (error.response?.data?.message) { 
          // alert(error.response.data.message);
          toast.error(error.response.data.message);
        }
        setShow(false);
        navigate("/documents");
      },
    });

  const isNextStepDisabled = (step) => {
    if (step === 0) {
      return (
        (!documentData.documentName ||
          !documentData.documentReferenceNumber ||
          !documentData.fileUrl) &&
        data.length === 0
      );
    } else if (step === 1) {
      return (
        receivers.some(
          (receiver) =>
            !receiver.name || !receiver.email || !receiver.phoneNumber
        ) && data.length === 0
      );
    } else if (isReadOnly) {
      return;
    }
  };
  const isSigatureAddedForRecivers = (payload) => {
    let isValid = true;
    payload.receivers.forEach((receiver) => {
      if (receiver.markers.length === 0) {
        isValid = false;
        setValidateMessage("Please add signature for all receivers");
      } else {
        let isSignatureAdded = false;
        receiver.markers.forEach((marker) => {
          if (
            marker.component === "signature" ||
            marker.component === "initials" ||
            marker.component === "stamp"
          ) {
            isSignatureAdded = true;
          }
        });
        if (!isSignatureAdded) {
          isValid = false;
          setValidateMessage(
            "Please add signature, initials or stamp for all receivers"
          );
        }
      }
    });

    return isValid;
  };

  // function handleSend() {
  //   const payload = { ...documentData };
  //   payload.receivers = receivers;
  //   delete payload.markers;
  //   console.log("payload", payload);

  //   const isValid = isSigatureAddedForRecivers(payload);
  //   if (!isValid) {
  //     setOpen(true);
  //     return;
  //   } else {
  //     setShow(true);
  //   }

  // }

  function handleSend() {
    const payload = { ...documentData };

    payload.receivers = receivers.map((receiver) => ({
      ...receiver,
      kycStatus: kycCheckedUsers[receiver?.name] || false,
    }));

    delete payload.markers;
    console.log("Final Payload:", payload);

    const isValid = isSigatureAddedForRecivers(payload);
    if (!isValid) {
      toast.error("Please add signature for all receivers");
      return;
    } 
    else{
      setShow(true);
    }
  }

 

  const handleSubmit = async (e) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    e.preventDefault();
    
    if (isSubmitting) {
      console.warn("handleSubmit is already running, preventing multiple calls");
      return;
    }
  
    setIsSubmitting(true);
    setLoading(true);
  
    try {
      const payload = { ...documentData, ...reviewData };
  
      payload.receivers = receivers?.map((receiver) => ({
        ...receiver,
        kycStatus: kycCheckedUsers[receiver?.name] || false,
      }));
  
      payload.securityCode = {
        isSecurity: reviewData.securityCode?.isSecurity || false,
        code: reviewData.securityCode?.code || "",
      };
  
      payload.totalPages = reviewData.totalPages || 1;
      payload.retryAttempts = {
        isRetrying: reviewData.retryAttempts?.isRetrying || false,
        attempts: reviewData.retryAttempts?.attempts || 0,
      };
  
      payload.photoKYC = reviewData.photoKyc || false;
      payload.expiryDate = reviewData.customExpiry || null;
  
      delete payload.markers;
  
      const response = await submitESignRequest(payload);
  
      if (response?.status) {
        // toast.success("Request submitted successfully!"); 
        setShow(false);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the request.");
      console.error("Submission Error:", error);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };
  

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Function to validate the phone number (should be 10 digits)
  function validatePhoneNumber(phoneNumber) {
    const regex = /^\d{10}$/;
    return regex.test(phoneNumber);
  }

  function validateReceivers() {
    let allValid = true; // Flag to determine if all receivers are valid

    receivers.forEach((receiver, index) => {
      const { email, phoneNumber } = receiver;
      let errorMessage = "";
      let valid = true;

      // Validate email
      if (!validateEmail(email)) {
        errorMessage += `Receiver ${index + 1} has an invalid email address. `;
        valid = false;
      }

      // Validate phone number
      if (!validatePhoneNumber(phoneNumber)) {
        errorMessage += `Receiver ${index + 1} has an invalid phone number. `;
        valid = false;
      }

      // Display error if any issues found
      if (!valid) {
        toast.error(errorMessage);
        allValid = false;
      }
    });

    return allValid;
  }

  const fetchDocumentDetails = async () => {
    try {
      const respons = await getDocumentDetailsId(docId);
      setData(respons.data.data);
      return respons.data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isReadOnly) {
      fetchDocumentDetails();
    }
  }, [isReadOnly]);

  useEffect(() => {
    if (documentData?.documentReferenceNumber) {
      setReviewData({
        ...reviewData,
        referenceNo: documentData?.documentReferenceNumber,
      });
    }
  }, [documentData?.documentReferenceNumber]);

  // const [isOpen,setIsOpen]=useState(false)
  // const handleOpen()=>{
  //   setIsOpen(!isOpen)
  // }

  return (
    <Container
      className=""
      style={{
        marginTop: "3rem",
        // position: "fixed",
        // overflowY: "scroll",
        // scrollbarWidth: "none",
        height: "100%",
        minHeight: "85vh",
        position: "relative",
      }}
    >
      {/* <TopSection /> */}
      <p className="esign-page-heading mb-1"> Create new e-Sign Document</p>
      <p className="esign-page-subheading">
        {" "}
        Create or choose from existing templates{" "}
      </p>
      <MyStepper steps={steps} activeStep={activeStep} />

      {/* Step Content */}
      <div
        style={{
          marginTop: "50px",
        }}
      >
        {getStepContent(activeStep)}
      </div>

      {/* Buttons to Control the Stepper */}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          left: 0,
          padding: "1rem",
          backgroundColor: "white",
          boxShadow: "0px -4px 4px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
        }}
      >
        <Container
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
          }}
        >
          {/* <Col md={12}>
            <hr />
          </Col> */}
          <Col xs={6} className="text-start">
            <Button
              className="btn-slate"
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={activeStep === 0}
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                <img src={LeftArrowImg} alt="" />
                <span>Previous</span>
              </div>
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            {/* {activeStep === 2 && (
              <Button
                className="btn-bg-indigo "
                style={{
                  margin: "1px",
                }}
                onClick={() => setShow(true)}
              >
                Review1{" "}
              </Button>
            )} */}
            <Button
              className="btn-bg-indigo"
              onClick={() => {
                if (activeStep === 1 && !validateReceivers()) {
                  return;
                } else
                  activeStep === 2
                    ? handleSend()
                    : setActiveStep(activeStep + 1);
              }}
              // disabled={activeStep === steps.length - 1}
              // disable if form for that step is not filled
              disabled={
                isNextStepDisabled(activeStep) || isESignRequestSubmitting
              }
            >
              <div
                style={{
                  display: "flex",
                }}
              >
                {activeStep !== 2 ? (
                  <>
                    <span>Next</span>

                    <img src={RightArrowImg} alt="" />
                  </>
                ) : (
                  <span>Send</span>
                )}
              </div>
            </Button>
          </Col>
        </Container>
      </div>
      <Signfaildpoup
        show={open}
        setShow={setOpen}
        validateMessage={validateMessage}
      />
      <Reviewandsendmodal
        show={show}
        setShow={setShow}
        data={{
          documentData: documentData,
          receivers: receivers,
        }}
        setReviewData={setReviewData}
        reviewData={reviewData}
        handleSubmit={handleSubmit}
        isReadOnly={isReadOnly}
        readOnlyData={data}
        loading={loading}
        setLoading={setLoading}
      />
      <DocumentCreationModal
                      visible={documentmodal}
                      onClose={() => setDocumentModal(false)}
                    />
    </Container>
  );
}

export default SenderPage;
