import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../reviewandSend/index.css";
import dummyimagesquare from "../../../assets/images/general/dummy-image-square.webp";

function Signfaildpoup({ show, setShow, validateMessage }) {
  return (
    <>
      <Modal
        show={show}
        size="xl"
        aria-labelledby="example-modal-sizes-title-sm"
        onHide={() => {
          setShow(false);
        }}
      >
        <Modal.Body>
          <div className="d-flex  h-100">
            <img src={dummyimagesquare} height={"auto"} width={"50%"} />
            <div className="d-flex justify-content-center flex-column p-2">
              <p className="esign-page-heading">Signature field missing</p>
              <p className="esign-page-subheading">
                Don't forget to show your recipients where to sign.
                {validateMessage}
              </p>
              <div className="d-flex gap-2  align-self-end mt-4">
                {/* <Button onClick={placeOnlastPage} className="btn-slate-pill">
                  Place on Last page
                </Button> */}
                <Button
                  className="btn-indigo-pill"
                  variant="primary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Return to documentl
                </Button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Signfaildpoup;
