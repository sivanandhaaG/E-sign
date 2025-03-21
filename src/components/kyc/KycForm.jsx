import { useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function KycForm() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(!show);
  const handleShow = () => setShow(true);

  const handleFileClick = (id) => {
    document.getElementById(id).click();
  };
  return (
    <>
      <div className="d-flex justify-content-end">
        <Button
          variant="primary"
          className="btn-bg-indigo"
          onClick={handleShow}
        >
          Generate KYC Link
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Generate KYC Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {" "}
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="companyEmail" className="signup-label">
                User ID /Email address
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="userid"
                id="userid"
                name="userid"
                placeholder="Enter UserId or Email"
              />
            </Form.Group>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="userName" className="signup-label">
                User Name
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="userName"
                id="userName"
                name="userName"
                placeholder="Enter User Name"
              />
            </Form.Group>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="SessionId" className="signup-label">
                Session ID
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="email"
                id="SessionId"
                name="SessionId"
                placeholder="Enter Session"
              />
            </Form.Group>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="ExpireDate" className="signup-label">
                Expiration Date/Time
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="email"
                id="ExpireDate"
                name="ExpireDate"
                placeholder="Enter Company Date"
              />
            </Form.Group>
            <div className="d-flex justify-content-between">
              <Form.Group className="col p-1 m-1">
                <Form.Label htmlFor="adhar" className="signup-label">
                  Upload Adhar
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="file"
                  id="adhar"
                  name="adhar"
                  className="d-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => handleFileClick("adhar")}
                >
                  Choose File
                </Button>
              </Form.Group>
              <Form.Group className="col p-1 m-1">
                <Form.Label htmlFor="pan" className="signup-label">
                  Upload PAN
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="file"
                  id="pan"
                  name="pan"
                  className="d-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => handleFileClick("pan")}
                >
                  Choose File
                </Button>
              </Form.Group>
              <Form.Group className="col p-1 m-1">
                <Form.Label htmlFor="passport" className="signup-label">
                  Upload Passport
                  <span className="signup-label-mandatory"> * </span>
                </Form.Label>
                <Form.Control
                  required
                  type="file"
                  id="passport"
                  name="passport"
                  className="d-none"
                />
                <Button
                  variant="secondary"
                  onClick={() => handleFileClick("passport")}
                >
                  Choose File
                </Button>
              </Form.Group>
            </div>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="otp" className="signup-label">
                Send OTP
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Select aria-label="otp">
                <option value="1">Yes</option>
                <option value="2">No</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="otp" className="signup-label">
                Priority Level
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Select aria-label="levl">
                <option value="1">Normal</option>
                <option value="2">High</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="p-1 m-1">
              <Form.Label htmlFor="comment" className="signup-label">
                Comments/Note
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                required
                type="textArea"
                id="otp"
                name="otp"
                as="textarea"
                rows={4}
                placeholder="Enter Company Email"
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleClose}>
                Generate Link
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default KycForm;
