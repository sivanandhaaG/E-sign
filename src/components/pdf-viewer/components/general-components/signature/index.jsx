import React, { useRef, useState, useEffect } from "react";
import "./index.css";
import { Button, Form, Modal, Tabs, Tab, Card, Spinner } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import { toPng } from "html-to-image";
import Icons from "../../icons";
import axios from "axios";

const Signature = ({ formData, setFormData, markerData, receiver }) => {
  const [signatureTabOpen, setSignatureTabOpen] = useState(false);
  const sigCanvas = useRef({});

  console.log("formData", formData, markerData);
  const elementRef = useRef(null);

  const onSignatureImageChoose = (e) => {
    const files = e.target.files;
    const file = files[0];
    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        const updatedFormData = { 
          ...formData, 
          [markerData.markerId]: {
            markerId: markerData.markerId,
            markerType: "image",
            data: reader.result,
          }
        };
        setFormData(updatedFormData); // Use the new object
        handleCloseSignatureTab();
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const save = () => {
    const updatedFormData = { 
      ...formData, 
      [markerData.markerId]: {
        markerId: markerData.markerId,
        markerType: "image",
        data: sigCanvas.current.getTrimmedCanvas().toDataURL("image/png"),
      }
    };
    setFormData(updatedFormData);  // Use the new object
    handleCloseSignatureTab();
  };

  const clear = () => sigCanvas.current.clear();

  const handleOpenSignatureTab = () => {
    setSignatureTabOpen(true);
  };
  
  const handleCloseSignatureTab = () => {
    setSignatureTabOpen(false);
  };

  const convertTextToImage = (text, font) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.height = 50;
    ctx.font = "bold 30px " + font;
    ctx.fillText(text, 10, 30);
    return canvas.toDataURL("image/png");
  };

  const htmlToImageConvert = async (id) => {
    const ele = document.getElementById(id);
    const url = await toPng(ele);
    console.log("url", url);
    return url;
  };

  const [dscCertificates, setDscCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [certDetails, setCertDetails] = useState(null);

  const handleDscSelect = () => {
    if (!certDetails) return;

    const formattedDate = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const updatedFormData = { 
      ...formData, 
      [markerData.markerId]: {
        markerId: markerData.markerId,
        markerType: "dsc", 
        data: {
          markerType: "dsc", 
          name: certDetails.commonName,
          issuer: certDetails.issuer,
          timestamp: formattedDate,
        },
      },
    };
    setFormData(updatedFormData);
    handleCloseSignatureTab();
  };

  const data = formData[markerData?.markerId]?.data;

  return (
    <>
      <div className="signature" onClick={handleOpenSignatureTab}>
        {data ? (
          data.markerType === "dsc" ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                padding: "10px",
                width: "200px",
              }}
            >
              <div style={{ fontSize: "18px", fontWeight: "bold" }}>{data.name}</div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                Digitally Signed By {data.name}
              </div>
              <div style={{ fontSize: "12px", color: "gray" }}>
                Date: {data.timestamp}
              </div>
            </div>
          ) : (
            <img
              src={data}
              style={{
                objectFit: "contain",
                height: "50px",
                width: "150px",
              }}
              alt="signature"
            />
          )
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            Click to sign
          </div>
        )}
      </div>

      <Modal show={signatureTabOpen} onHide={handleCloseSignatureTab}>
        <Modal.Header closeButton>
          <Modal.Title>Add Signature</Modal.Title>
        </Modal.Header>
        <Modal.Body className="signature__modal">
          <Tabs
            defaultActiveKey="styles"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="styles" title="Styles">
              <div className="signature__styles">
                {["League Script", "Qwigley", "Andina-Regular"].map((font, index) => (
                  <div className="" key={index}>
                    <p
                      style={{
                        fontFamily: font,
                        fontSize: "30px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        lineHeight: "5rem",
                        borderRadius: "55px",
                      }}
                      className="signature__font"
                      id={`${font}`}
                      onClick={async () => {
                        const imageData = await htmlToImageConvert(font);
                        const updatedFormData = { 
                          ...formData, 
                          [markerData.markerId]: {
                            markerId: markerData.markerId,
                            markerType: "image",
                            data: imageData,
                            height: 50,
                            width: 200,
                          }
                        };
                        setFormData(updatedFormData);
                        handleCloseSignatureTab();
                      }}
                    >
                      {receiver?.name}
                    </p>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="draw" title="Draw">
              <div className="signature-wrapper">
                <SignatureCanvas
                  ref={sigCanvas}
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: "sigCanvas",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                <Button onClick={save}>Save</Button>
                <Button onClick={clear}>Clear</Button>
              </div>
            </Tab>
            <Tab eventKey="choose" title="Choose">
              <div>
                <Form.Group controlId="formFileLg" className="mb-3">
                  <Form.Label>Choose your signature</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    size="lg"
                    onChange={onSignatureImageChoose}
                  />
                </Form.Group>
              </div>
            </Tab>
            <Tab eventKey="dsc" title="Digital Certificate">
              {loading ? (
                <div className="text-center">
                  <Spinner animation="border" />
                  <p>Loading Certificate...</p>
                </div>
              ) : certDetails ? (
                <Card
                  className="mt-3 text-center"
                  style={{ cursor: "pointer", padding: "15px" }}
                  onClick={handleDscSelect}
                >
                  <Card.Body>
                    <Card.Title>{certDetails.commonName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      Issued By: {certDetails.issuer}
                    </Card.Subtitle>
                    <Card.Text>
                      Valid: {new Date(certDetails.validFrom).toLocaleDateString()} - {new Date(certDetails.validTo).toLocaleDateString()}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ) : (
                <p className="text-center">No certificate found.</p>
              )}
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signature;
