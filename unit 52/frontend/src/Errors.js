import React from "react";
import { Alert } from "reactstrap";

/** Component for displaying error alerts resulting from form submissions or API errors */
function Errors({ formErrors = {}, apiErrors = {} }) {
  return (
    <div className="Errors">
      {/* Display form submission errors */}
      {Object.keys(formErrors).map((key, e) => (
        <Alert color="warning" key={e}>
          {formErrors[key]}
        </Alert>
      ))}
      {/* Display API errors */}
      {Object.keys(apiErrors).map((key, e) => (
        <Alert color="danger" key={e}>
          {apiErrors[key]}
        </Alert>
      ))}
    </div>
  );
}

export default Errors;
