import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  fillESignRequest,
  getESignRequests,
  resendESignRequest,
  sendNewESignRequest,
} from "../../app/api/userApi";
import {
  deleteFileFromS3,
  uploadImageToS3,
  uploadFileToS3,
} from "../../app/api/uploadApi";
import { useMutation, useQuery } from "react-query";
import { Document, Page, pdfjs } from "react-pdf";
import "./index.css";
import Toolbar from "./toolbar";
import { getComponent } from "../../components/pdf-viewer/components/components";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import useWindowResize from "../../use-window-resize";
import { border, Spinner, useMediaQuery } from "@chakra-ui/react";
import SignTag from "./SignTag";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import SuccessModal from "../../components/common/Modals/SuccessModal";

const pxToRem = (px) => `${px / 16}rem`;

const EsignRequest = ({
  eSignRequests,
  markers,
  active,
  isSigned,
  hasSigned,
  isLoading,
  error,
  isError,
}) => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  // const scale = isMobile ? 0.5 : 2;
  const [scale, setScale] = useState(isMobile ? window.innerWidth / 617 : 1.0);
  const [width, height] = useWindowResize();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // ===============oldformat=====================
  // const [markers, setMarkers] = useState([]);
  // const [active, setActive] = useState(1);
  // const [isSigned, setIsSigned] = React.useState(false);
  // const [hasSigned, setHasSigned] = useState(false);
  //   const {
  //     data: eSignRequests,
  //     isLoading,
  //     isError,
  //     error,
  //   } = useQuery(
  //     "eSignRequests",
  //     async () => {
  //       const response = await fetch("https://api.ipify.org?format=json");
  //       const data = await response.json();

  //       const res = await getESignRequests(
  //         id,
  //         searchParams.get("receiverId"),
  //         data?.ip
  //       );

  //       // const resizedMarkers = handleResize(res.data?.markers);
  //       res.data?.eSignRequest?.receivers?.forEach((receiver) => {
  //         if (receiver.receiverId === searchParams.get("receiverId")) {
  //           if (receiver.status === "SIGNED") {
  //             setIsSigned(true);
  //             setHasSigned(true);
  //           }
  //         }
  //       });
  //       setMarkers(res.data?.markers);
  //       setActive(res.data?.markers[0]?.pageNumber);
  //       return res;
  //     },
  //     {
  //       staleTime: 1000 * 60 * 5,
  //     }
  //   );

  //  ==================================

  const { mutate: uploadToS3, isLoading: isUploading } = useMutation(
    uploadImageToS3,
    {
      onSuccess: (data) => {
        if (data?.data?.fileUrl) {
          console.log(data?.data?.fileUrl, "capturedImage1");

          toast.success("File uploaded successfully");
          stopCamera();
          setShowCameraModal(false);

          submitEsign(data?.data?.fileUrl);

          setCapturedImage(data?.data?.fileUrl);
        }
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to upload file");
      },
    }
  );

  const document = eSignRequests?.document;
  const memoizedFile = useMemo(
    () => ({ url: document?.fileUrl }),
    [document?.fileUrl]
  );

  const receivers = eSignRequests?.eSignRequest?.receivers?.filter(
    (receiver) => receiver.receiverId === searchParams.get("receiverId")
  );

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const [formData, setFormData] = useState({});
  const viewer = React.useRef(null);
  const [isSubmitted, setIsSubmitted] = React.useState(false);

  const [showKycModal, setShowKycModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [location, setLocation] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCameraTermsModal, setShowCameraTermsModal] = useState(false);
  const [showThankYouModal, setShowThankYouModal] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const markerIndexRef = useRef(0);
  const markerRefs = useRef([]);
  const containerRef = useRef(null);
  const currentMarkerIndex = useRef(0);
  const markerPositions = useRef([]);
  const pageRefs = useRef([]);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0 });


  const areAllMarkersSigned = () => {
    return markers.every((marker) => {
      const markerData = formData[marker.markerId]?.data || marker.fileUrl;
      return markerData && markerData.trim() !== "";
    });
  };
  // Camera Reference
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  console.log(markerPositions, "markerPositions");

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  const handleResize = (markers) => {
    const newMarkers = markers.map((marker) => {
      const { x, y, xRatio, yRatio } = marker;
      const newWidth = viewer.current.clientWidth;
      const newHeight = viewer.current.clientHeight;

      console.log(x, y);
      const newX = (xRatio / 100) * newWidth;
      const newY = (yRatio / 100) * newHeight;

      console.log("newX", newX);
      console.log("newY", newY);

      return {
        x: newX,
        y: newY,
        xRatio,
        yRatio,
      };
    });
    console.log("newMarkers", newMarkers);
    return newMarkers;
  };

  const { mutate: submitESignResponse, isLoading: isESignResponseSubmitting } =
    useMutation(fillESignRequest, {
      onSuccess: (data) => {
        toast.success("ESign Response Submitted Successfully");
        setIsSubmitted(true);
        setIsSubmitting(false);
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          setIsSubmitting(false);
          toast.error(error.response.data.message);
        }
      },
    });

  if (isLoading) return <div>Loading...</div>;

  function onDocumentLoadSuccess({ numPages }) {
    console.log("numPages", numPages);
    setNumPages(numPages);
  }

  const handleEsignSubmit = async () => {
    if (receivers?.[0]?.kycStatus) {
      setShowKycModal(true);
      return;
    }
    submitEsign();
  };

  const submitEsign = async (fileUrl) => {
    if (!areAllMarkersSigned()) {
      toast.error("Please fill in all the required fields.");
      return;
    }
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();

    const payload = {
      eSignRequestId: id,
      markers: Object.values(formData),
      receiverId: searchParams.get("receiverId"),
      ip: data?.ip,
      createdAt: new Date(),
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      location: location,
      capturedImage: fileUrl,
    };

    setIsSubmitting(true);

    submitESignResponse(payload);
  };

  const handleLocationAccess = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setShowLocationModal(false);
          setShowCameraModal(true);
          startCamera();
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setShowTermsModal(true);
          } else {
            toast.error("Unable to retrieve location.");
          }
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  const handleAcceptTerms = () => {
    setShowTermsModal(false);
    toast.info("Please enable location manually in your browser settings.");
  };

  // Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
        setShowCameraModal(true);
      }
    } catch (error) {
      if (error.name === "NotAllowedError") {
        setShowCameraModal(false);

        setShowCameraTermsModal(true);
      } else {
        toast.error("Failed to access camera.");
      }
    }
  };
  const handleAcceptCameraTerms = () => {
    setShowCameraTermsModal(false);
    toast.info("Please enable camera manually in your browser settings.");
  };

  const captureImage = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext("2d");
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      // Convert canvas to Blob
      canvasRef.current.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `capture_${Date.now()}.png`, {
            type: "image/png",
          });

          const formData = new FormData();
          formData.append("file", file);

          // ✅ Close the modal and stop the camera
          // setShowCameraModal(false);
          // stopCamera();

          // ✅ Use a callback function to ensure the upload mutation is properly triggered
          uploadToS3(formData);
        }
      }, "image/png");
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setIsCameraOn(false);
    }
  };
  const resendHandler = async () => {
    try {
      const res = await sendNewESignRequest({
        eSignRequestId: id,
        documentName: eSignRequests?.document?.documentName,
        receiverId: searchParams.get("receiverId"),
        userId: eSignRequests?.eSignRequest?.userId,
      });
      if (res.status === true) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error in resending the document"
      );
    }
  };

  const zoomIn = () => setScale((prev) => prev + 0.1);
  const zoomOut = () => setScale((prev) => (prev > 0.5 ? prev - 0.1 : prev));

  if (!document?.fileUrl) {
    console.error("File URL is missing or invalid.");
    return;
  }

  //  const isFormComplete = () => {
  //   if (!receivers || receivers.length === 0) return false;
  //   const receiverMarkers = receivers[0]?.markers || [];

  //   return receiverMarkers
  //     .filter((marker) => marker.component !== "userSignature")
  //     .every((marker) => {
  //       const markerData = formData[marker.markerId]?.data;
  //       if (!markerData || markerData.trim() === "") {
  //         console.log(`Marker ${marker.markerId} is missing data!`);
  //       }
  //       return markerData && markerData.trim() !== "";
  //     });
  // };

  const isFormComplete = () => {
    if (!receivers || receivers.length === 0) return false;

    const receiverMarkers = receivers[0]?.markers || [];

    const markersByBaseId = receiverMarkers.reduce((acc, marker) => {
      const baseId = String(marker.id).replace(/^copy-\d+-/, "");

      if (!acc[baseId]) acc[baseId] = [];
      acc[baseId].push(marker);

      return acc;
    }, {});

    const filteredMarkers = Object.values(markersByBaseId)
      .map((markers) => {
        const hasCopy = markers.some((m) => String(m.id).startsWith("copy"));
        return hasCopy
          ? markers.filter((m) => String(m.id).startsWith("copy"))
          : markers;
      })
      .flat();

    return filteredMarkers
      .filter((marker) =>
        ["signature", "stamp", "initials"].includes(marker.component)
      )
      .every((marker) => {
        const markerData = formData[marker.markerId]?.data || marker.fileUrl;
        if (!markerData || markerData.trim() === "") {
          console.log(
            `❌ Marker ${marker.markerId} (${marker.id}, ${marker.component}) is missing data!`
          );
        }
        return markerData && markerData.trim() !== "";
      });
  };

  const updateButtonPosition = () => {
    if (markerPositions.current.length > 0) {
      const nextMarker = markerPositions.current[currentMarkerIndex.current];
      if (nextMarker) {
        const pageElement = pageRefs.current[nextMarker.pageNumber - 1];

        if (pageElement) {
          const pageRect = pageElement.getBoundingClientRect();
          const pageOffset = pageRect.top + window.scrollY;

          setButtonPosition({
            top: pageOffset + nextMarker.top - 10,
            left: nextMarker.left + 50,
          });
        }
      }
    }
  };
  useEffect(() => {
    if (markers.length > 0) {
      markerPositions.current = markers.map((marker) => ({
        top: marker.y * scale,
        left: marker.x * scale,
        pageNumber: marker.pageNumber,
      }));
      updateButtonPosition();
    }
  }, [markers, scale]);

  const smoothScrollTo = (targetY, duration = 600) => {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      let startTime;

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * progress);

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          resolve();
        }
      };

      requestAnimationFrame(step);
    });
  };
  const handleSignClick = async () => {
    let nextMarkerIndex = currentMarkerIndex.current;

    // If it's the first click or the last marker was already signed, start from the first unsigned marker
    if (nextMarkerIndex === null || nextMarkerIndex >= markers.length) {
      nextMarkerIndex = 0;
    } else {
      nextMarkerIndex++; // Move to the next marker
    }

    let foundNextMarker = false;

    // Find the next unsigned marker, moving forward
    for (let i = nextMarkerIndex; i < markers.length; i++) {
      const markerData =
        formData[markers[i].markerId]?.data || markers[i].fileUrl;

      if (!markerData || markerData.trim() === "") {
        currentMarkerIndex.current = i; // Stop at the first unsigned marker found
        foundNextMarker = true;
        break;
      }
    }

    // If no more unsigned markers are found, reset the index and stop
    if (!foundNextMarker) {
      console.log("✅ All markers are signed!");
      return;
    }

    // Scroll to the new marker
    const nextMarker = markers[currentMarkerIndex.current];

    if (nextMarker) {
      const pageElement = pageRefs.current[nextMarker.pageNumber - 1];

      if (pageElement) {
        const pageRect = pageElement.getBoundingClientRect();
        const pageOffset = pageRect.top + window.scrollY;

        await smoothScrollTo(pageOffset + nextMarker.y * scale - 50, 600);

        setButtonPosition({
          top:
            pageOffset + nextMarker.y * scale - (nextMarker.height * scale) / 5,
          left:
            pageRect.left +
            nextMarker.x * scale -
            nextMarker.width * scale -
            10,
        });

        console.log(
          `✅ SignTag moved to marker at (${nextMarker.x}, ${nextMarker.y}) on Page ${nextMarker.pageNumber}`
        );
      }
    }
  };

  useEffect(() => {
    console.log("Updated formData:", formData);
  }, [formData]);
  

  // const handleSignClick = async () => {
  //   if (currentMarkerIndex.current < markers.length - 1) {
  //     currentMarkerIndex.current += 1;
  //     const nextMarker = markerPositions.current[currentMarkerIndex.current];

  //     if (nextMarker) {
  //       const pageElement = pageRefs.current[nextMarker.pageNumber - 1];

  //       if (pageElement) {
  //         const pageRect = pageElement.getBoundingClientRect();
  //         const pageOffset = pageRect.top + window.scrollY;

  //         await smoothScrollTo(pageOffset - 50, 600);

  //         await smoothScrollTo(pageOffset + nextMarker.top - 100, 600);

  //         updateButtonPosition();
  //       }
  //     }
  //   }
  // };

  return (
    <div>
      {/* <Container
        className="toolbar"
        style={{
          width: "100%",
          position: "fixed",
          top: 67,
          left: 0,
          right: 0,
          background: "white",
          zIndex: 1000,
          padding: "10px",
          boxShadow: "0px 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <button onClick={zoomIn}>
          <ImZoomIn size={20} />
        </button>
        <button onClick={zoomOut}>
          <ImZoomOut size={20} />
        </button>
      </Container> */}
      {isSigned ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="alert alert-warning"
            style={{
              padding: "20px",
              borderRadius: "10px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.1)",
              width: "fit-content",
            }}
          >
            This eSign request has been signed
          </div>
        </div>
      ) : isError && error?.response?.status ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            className="alert alert-warning"
            style={{
              padding: "20px",
              borderRadius: "10px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "red",
              backgroundColor: "rgba(255, 0, 0, 0.1)",
              width: "fit-content",
            }}
          >
            {error?.response?.data?.message}
          </div>
        </div>
      ) : (
        <div
          className=""
          style={{
            margin: "70px 20px 20px 20px",
            height: "fit-content",
            marginLeft: "auto",
            marginRight: "auto",
            overflow: "auto",
          }}
        >
          {isSubmitting && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
                gap: "10px",
              }}
            >
              <Spinner
                size="xl"
                color="blue.500"
                thickness="4px"
                speed="0.65s"
              />
              <div>Please wait while we submit your eSign response...</div>
            </div>
          )}
          {!isSubmitted && !isSubmitting ? (
            <Container className="text-center" style={{ width: "95%" }}>
              {eSignRequests?.eSignRequest?.status === "EXPIRED" ? (
                <Col>
                  <Row>
                    <Col sm={12}>
                      <div className="alert alert-danger" role="alert">
                        This eSign request has expired
                      </div>
                      <div>
                        To access the document, you need to request a new eSign
                        request.
                      </div>
                      <div className="mt-4">
                        <Button
                          style={{
                            borderRadius: "2rem",
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                          }}
                          onClick={() => {
                            resendHandler();
                          }}
                        >
                          Send New eSign Request
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ) : (
                <Col>
                  <Row>
                    {/* <Toolbar
                numPages={numPages}
                setNumPages={setNumPages}
                active={active}
                setActive={setActive}
                handleEsignSubmit={handleEsignSubmit}
              /> */}
                  </Row>
                  <div style={{ position: "relative" }}>
                    {markerPositions.current.length > 0 && (
                      <SignTag
                        style={{ left: isMobile ? "30px" : "0px" }}
                        top={buttonPosition.top}
                        onClick={handleSignClick}
                      />
                    )}

                    <Container
                      className="custom-row"
                      ref={containerRef}
                      style={{
                        width: "100%",
                        height: "fit-content",
                        marginRight: "auto",
                        overflow: "auto",
                        border: "2px solid #4f46e5",
                        borderRadius: "8px",
                        padding: "10px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        position: "relative",
                      }}
                    >
                      <Document
                        file={memoizedFile}
                        onLoadSuccess={onDocumentLoadSuccess}
                        inputRef={viewer}
                        className="esign_viewport"
                        loading={
                          <div
                            style={{
                              width: isMobile ? "auto" : "617px",
                              height: isMobile ? "100vh" : "700px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Spinner
                              size="xl"
                              color="blue.500"
                              thickness="4px"
                              speed="0.65s"
                            />
                          </div>
                        }
                      >
                        {Array.from(new Array(numPages), (el, index) => (
                          <div
                            ref={(el) => (pageRefs.current[index] = el)}
                            key={index}
                          >
                            <Page
                              key={`page_${index + 1}`}
                              pageNumber={index + 1}
                              className="page"
                              scale={scale}
                              width={isMobile ? window.innerWidth : 617}
                              height={isMobile ? window.innerHeight : 700}
                              renderAnnotationLayer={false}
                            >
                              {markers
                                ?.filter(
                                  (marker) => marker.pageNumber === index + 1
                                )
                                ?.map((marker, markerIndex) => {
                                  const Component = getComponent(
                                    marker.component
                                  );
                                  return (
                                    <div
                                      style={{
                                        position: "absolute",
                                        top:
                                          marker.y *
                                          (isMobile
                                            ? window.innerWidth / 617
                                            : scale),
                                        left:
                                          marker.x *
                                          (isMobile
                                            ? window.innerWidth / 617
                                            : scale),
                                        zIndex: 100,
                                        transform: `scale(${
                                          isMobile
                                            ? window.innerWidth / 617
                                            : scale
                                        })`,
                                        transformOrigin: "top left",
                                      }}
                                      ref={(el) =>
                                        (markerRefs.current[markerIndex] = el)
                                      }
                                      key={markerIndex}
                                    >
                                      {getComponent(
                                        marker.component,
                                        formData,
                                        setFormData,
                                        marker,
                                        receivers[0]
                                      )}
                                    </div>
                                  );
                                })}
                            </Page>
                          </div>
                        ))}
                      </Document>
                    </Container>
                  </div>
                  <Col className="text-end mt-5 receiverSubmitBtn">
                    <Button
                      onClick={handleEsignSubmit}
                      disabled={!areAllMarkersSigned()}
                      // disabled={!isFormComplete()}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                  </Col>
                </Col>
              )}
            </Container>
          ) : null}
          {isSubmitted && !isSubmitting && (
            <>
              <SuccessModal
                visible={showThankYouModal}
                onClose={() => setShowThankYouModal(false)}
              />
            </>
          )}
        </div>
      )}

      <Modal
        show={showKycModal}
        onHide={() => setShowKycModal(false)}
        centered
        contentClassName="border-0"
      >
        <Modal.Body className="text-center">
          <h4>KYC Required</h4>
          <p>Please fill in your KYC details before signing.</p>
          <Button
            variant="primary"
            onClick={() => {
              setShowKycModal(false);
              setShowLocationModal(true);
              handleLocationAccess();
            }}
          >
            OK
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showTermsModal}
        centered
        dialogClassName="custom-modal-width"
      >
        <Modal.Body>
          <h4 className="text-center">Location Access is Disabled</h4>
          <p className="text-center">
            Your location access is disabled. Please enable location access in
            your settings to proceed.
          </p>

          <h5>📌 Chrome Browser (Mobile)</h5>
          <ul>
            <li>
              Tap on the More <strong>(⋮ vertical 3-dots)</strong> icon and
              select <strong>Settings</strong>.
            </li>
            <li>
              Scroll to the <strong>Advanced</strong> section and tap on{" "}
              <strong>Site Settings</strong>.
            </li>
            <li>
              Enable the <strong>Location</strong> toggle button.
            </li>
            <li>
              Expand <strong>Blocked</strong>, tap on{" "}
              <strong>https://esign.projectzerozilla.com/</strong> and select{" "}
              <strong>Allow</strong>.
            </li>
          </ul>

          <h5>📌 Chrome Browser (Desktop)</h5>
          <ul>
            <li>
              Click on the More <strong>(⋮ vertical 3-dots)</strong> icon and
              select <strong>Settings</strong>.
            </li>
            <li>
              Go to <strong>Privacy and Security</strong> →{" "}
              <strong>Site Settings</strong>.
            </li>
            <li>
              Under <strong>Permissions</strong>, click{" "}
              <strong>Location</strong>.
            </li>
            <li>
              Ensure <strong>"Sites can ask for your location"</strong> is
              enabled.
            </li>
            <li>
              If <strong>https://esign.projectzerozilla.com/</strong> is in the
              blocked list, click the delete icon next to it.
            </li>
          </ul>

          <h5>📌 Safari Browser (iPhone & iPad)</h5>
          <h6>Step 1</h6>
          <ul>
            <li>
              Go to <strong>Settings</strong> → <strong>Privacy</strong> →{" "}
              <strong>Location Services</strong>.
            </li>
            <li>
              Ensure that <strong>Location Services</strong> is{" "}
              <strong>ON</strong>.
            </li>
            <li>
              Find <strong>Safari Websites</strong> and select{" "}
              <strong>While Using the App</strong>.
            </li>
            <li>
              Turn on <strong>Precise Location</strong>.
            </li>
          </ul>

          <h6>Step 2</h6>
          <ul>
            <li>
              Go to <strong>Settings</strong> → <strong>Safari</strong> →{" "}
              <strong>Location</strong> / <strong>Microphone</strong> /{" "}
              <strong>Camera</strong>.
            </li>
            <li>
              Ensure <strong>"Ask"</strong> or <strong>"Allow"</strong> is
              selected.
            </li>
          </ul>

          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleAcceptTerms}>
              OK, I Understand
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      <Modal show={showCameraModal} centered contentClassName="border-0">
        <Modal.Body className="text-center">
          <h4>Capture Your Image</h4>
          <video ref={videoRef} autoPlay style={{ width: "100%" }}></video>
          <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
          <Button className="mt-3" onClick={captureImage}>
            Capture
          </Button>
        </Modal.Body>
      </Modal>

      <Modal show={showCameraTermsModal} centered dialogClassName="wider-modal">
        <Modal.Body>
          <h4 className="text-center">Camera Access is Disabled</h4>
          <p className="text-center">
            Your camera access is disabled. Please enable camera access in your
            settings to proceed.
          </p>

          <h5>📌 Chrome Browser (Mobile)</h5>
          <ul>
            <li>
              Tap on the More <strong>(⋮ vertical 3-dots)</strong> icon and
              select <strong>Settings</strong>.
            </li>
            <li>
              Scroll to the <strong>Advanced</strong> section and tap on{" "}
              <strong>Site Settings</strong>.
            </li>
            <li>
              Enable the <strong>Camera</strong> toggle button.
            </li>
            <li>
              Expand <strong>Blocked</strong>, tap on{" "}
              <strong>https://esign.projectzerozilla.com/</strong> and select{" "}
              <strong>Allow</strong>.
            </li>
          </ul>

          <h5>📌 Chrome Browser (Desktop)</h5>
          <ul>
            <li>
              Click on the More <strong>(⋮ vertical 3-dots)</strong> icon and
              select <strong>Settings</strong>.
            </li>
            <li>
              Go to <strong>Privacy and Security</strong> →{" "}
              <strong>Site Settings</strong>.
            </li>
            <li>
              Under <strong>Permissions</strong>, click <strong>Camera</strong>.
            </li>
            <li>
              Ensure <strong>"Sites can ask for your camera"</strong> is
              enabled.
            </li>
            <li>
              If <strong>https://esign.projectzerozilla.com/</strong> is in the
              blocked list, click the delete icon next to it.
            </li>
          </ul>

          <h5>📌 Safari Browser (iPhone & iPad)</h5>
          <h6>Step 1</h6>
          <ul>
            <li>
              Go to <strong>Settings</strong> → <strong>Privacy</strong> →{" "}
              <strong>Camera</strong>.
            </li>
            <li>
              Ensure that <strong>Camera Access</strong> is <strong>ON</strong>.
            </li>
            <li>
              Find <strong>Safari Websites</strong> and select{" "}
              <strong>While Using the App</strong>.
            </li>
          </ul>

          <h6>Step 2</h6>
          <ul>
            <li>
              Go to <strong>Settings</strong> → <strong>Safari</strong> →{" "}
              <strong>Camera</strong>.
            </li>
            <li>
              Ensure <strong>"Ask"</strong> or <strong>"Allow"</strong> is
              selected.
            </li>
          </ul>

          <div className="text-center mt-4">
            <Button variant="primary" onClick={handleAcceptCameraTerms}>
              OK, I Understand
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EsignRequest;
