import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

export default function CustomModal({
  children,
  show,
  onModalClose = (f) => f,
  onModalShow = (f) => f,
}) {
  return (
    <div>
      <Modal
        show={show}
        onHide={onModalClose}
        className="modal-lg"
        style={{ background: "rgba(255, 255, 255, 0.1)" }}
      >
        <Modal.Header closeButton>{/* <Modal.Title>Modal title</Modal.Title> */}</Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </div>
  );
}
