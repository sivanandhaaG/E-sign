import { Button, Modal } from "react-bootstrap";

const MyVerticallyCenteredModal = ({ show, onHide, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      centered
      backdropClassName="transparent-backdrop"
    >
      <Modal.Header closeButton>
        <Modal.Title>Confirm Archive</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Are you sure you want to archive this document? This action cannot be
          undone.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Archive
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyVerticallyCenteredModal;
