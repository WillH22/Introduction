import { useState, useCallback } from "react";

/** Custom hook for handling form data changes */
function useHandleChange(initialState = {}) {
  const [data, setData] = useState(initialState);

  // Function to handle changes in form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((d) => ({
      ...d,
      [name]: value,
    }));
  };

  return [data, handleChange, setData];
}

/** Custom hook for form validation */
function useValidate() {
  const [formErrors, setFormErrors] = useState({});

  /** Validates form data for SignupForm and ProfileForm.
   * Sets state with an object containing all form errors.
   */
  function validate(data, isSignUpForm) {
    let err = {};

    // Validation rules for email
    if (!data.email || data.email.length < 6 || data.email.length > 60) {
      err.emailLength = "Email must be between 6 and 60 characters";
    } else {
      delete err.emailLength;
    }
    if (
      data.email &&
      !data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    ) {
      err.email = "Must be a valid email address";
    } else {
      delete err.email;
    }

    // Validation rule for password match
    if (data.password !== data.password2) {
      err.passwords = "Passwords must match";
    } else {
      delete err.passwords;
    }

    // Validation rule for zip code
    if (!data.zipCode || data.zipCode.length < 3 || data.zipCode.length > 12) {
      err.zipCode = "Zip/Postal Code must be between 3 and 12 characters";
    } else {
      delete err.zipCode;
    }

    // Additional validation rules for signup and profile forms
    if (isSignUpForm) {
      if (
        !data.username ||
        data.username.length < 3 ||
        data.username.length > 30
      ) {
        err.username = "Username must be between 3 and 30 characters";
      } else {
        delete err.username;
      }
      if (
        !data.password ||
        data.password.length < 5 ||
        data.password.length > 20
      ) {
        err.password = "Password must be between 5 and 20 characters";
      } else {
        delete err.password;
      }
    } else {
      if (
        data.password &&
        (data.password.length < 5 || data.password.length > 20)
      ) {
        err.password = "Password must be between 5 and 20 characters";
      } else {
        delete err.password;
      }
    }

    // Update formErrors state with the validation results
    setFormErrors(err);
    return err;
  }

  return [formErrors, validate];
}

/** Custom hook for handling API errors */
function useErrors() {
  const [apiErrors, setApiErrors] = useState({});

  /** Update state with an object containing API errors returned from calls */
  const getApiErrors = useCallback(
    (e) => {
      const errors = { ...e };
      setApiErrors(errors);
    },
    [setApiErrors]
  );

  return [apiErrors, getApiErrors, setApiErrors];
}

export { useHandleChange, useValidate, useErrors };
