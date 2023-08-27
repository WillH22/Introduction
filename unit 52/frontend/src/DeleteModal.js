import React, { useState } from "react";
import "./static/styles/Trips.css";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";

/** A modal used to confirm the deletion of a saved trip */
function DeleteModal({ deleteTrip, username, id }) {
  // State to control the visibility of the modal
  const [modal, setModal] = useState(false);

  // Function to toggle the modal's visibility
  const toggle = () => setModal(!modal);

  return (
    <div>
      {/* Button to trigger the delete confirmation modal */}
      <Button color="danger" className="toggle" onClick={toggle}>
        Delete Trip
      </Button>
      {/* Modal for confirming trip deletion */}
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          Are you sure you want to permanently delete this trip?
        </ModalBody>
        <ModalFooter>
          {/* Delete button */}
          <Button color="danger" onClick={() => deleteTrip(username, id)}>
            Delete
          </Button>{" "}
          {/* Cancel button */}
          <Button onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;
