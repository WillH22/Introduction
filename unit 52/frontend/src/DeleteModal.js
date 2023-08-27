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

//Suggestions:

    //1.Consider adding a more descriptive title or header to the modal to indicate the purpose of the modal more explicitly.
   //2. If possible, consider including more contextual information within the modal, such as the name or details of the trip being deleted, to ensure that users are aware of the action they're confirming.
   //3. Since modals are typically used to capture user attention, you might want to ensure that the text within the modal is concise yet clear in conveying the purpose of the modal.
