import { useState, useRef } from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";

const Signature = ({
  receiver,
  onSignatureSelect,
  onSignatureUpload,
  onDSCSelect,
  loading,
  certDetails,
}) => {
  const [signatureMode, setSignatureMode] = useState("draw"); 
  const sigCanvas = useRef(null);

  const clearSignature = () => {
    sigCanvas.current.clear();
  };

  const saveSignature = () => {
    const dataUrl = sigCanvas.current.toDataURL();
    onSignatureSelect(dataUrl);
  };

  return (
    <div className="signature-section">
      <h3>Add Signature</h3>

      {/* Signature Mode Switch */}
      <Form.Check
        type="switch"
        id="signature-mode-switch"
        label={
          signatureMode === "draw"
            ? "Switched to Drawing Pad"
            : "Switched to Image Upload"
        }
        checked={signatureMode === "draw"}
        onChange={(e) => setSignatureMode(e.target.checked ? "draw" : "image")}
        style={{ marginBottom: "1rem" }}
      />

      {signatureMode === "image" ? (
        /* ---------- IMAGE UPLOAD MODE ---------- */
        <div style={{ marginTop: "10px" }}>
          <Form.Label className="signup-label-two">Upload Signature</Form.Label>
          <div
            className="upload-container"
            onClick={() => document.getElementById("fileInput").click()}
          >
            <div className="upload-text">
              Click to upload <span className="upload-dnd">or drag and drop</span>
            </div>
            <div className="upload-hint">SVG, PNG, JPG or GIF (max. 800×400px)</div>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => onSignatureUpload(e.target.files[0])}
            />
          </div>
        </div>
      ) : (
        /* ---------- SIGNATURE PAD MODE ---------- */
        <div style={{ marginTop: "10px" }}>
          <p>Draw your signature below:</p>
          <SignatureCanvas
            ref={sigCanvas}
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
            <Button variant="secondary" onClick={clearSignature} style={{ marginRight: "10px" }}>
              Clear
            </Button>
            <Button variant="primary" onClick={saveSignature}>
              Add
            </Button>
          </div>
        </div>
      )}

      {/* Signature Styles */}
      <div>
        <h4>Choose Signature Style</h4>
        <div className="signature__styles">
          {["League Script", "Qwigley", "Andina-Regular"].map((font, index) => (
            <p
              key={index}
              style={{
                fontFamily: font,
                fontSize: "30px",
                fontWeight: "bold",
                cursor: "pointer",
                padding: "10px",
                borderRadius: "10px",
                display: "inline-block",
                margin: "5px",
                border: "1px solid #ddd",
              }}
              onClick={() => onSignatureSelect(font)}
            >
              {receiver?.name}
            </p>
          ))}
        </div>
      </div>

      {/* Digital Certificate */}
      <div>
        <h4>Digital Certificate</h4>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" />
            <p>Loading Certificate...</p>
          </div>
        ) : certDetails ? (
          <Card
            className="mt-3 text-center"
            style={{ cursor: "pointer", padding: "15px" }}
            onClick={onDSCSelect}
          >
            <Card.Body>
              <Card.Title>{certDetails.commonName}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Issued By: {certDetails.issuer}
              </Card.Subtitle>
              <Card.Text>
                Valid: {new Date(certDetails.validFrom).toLocaleDateString()} -{" "}
                {new Date(certDetails.validTo).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        ) : (
          <p className="text-center">No certificate found.</p>
        )}
      </div>
    </div>
  );
};

export default Signature;
