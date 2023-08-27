import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory, Redirect } from "react-router-dom";
import { useHandleChange, useValidate, useErrors } from "./hooks";
import countryCodes from "./static/countryCodes";
import "./static/styles/Register.css";
import WeTripApi from "./WeTripApi";
import Errors from "./Errors";

/** Form to register new user */
function RegisterForm({ username, updateCurrentUser }) {
  const [isLoading, setIsLoading] = useState(false);
  const initialState = {
    username: "",
    password: "",
    password2: "",
    email: "",
    zipCode: "",
    country: "US",
    units: "m",
  };
  const [data, handleChange, setData] = useHandleChange(initialState);
  const [formErrors, validate] = useValidate();
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();
  const history = useHistory();

  // Redirects to home if already logged in
  if (username) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErrors({});

    // Checks form for errors
    const isSignUpForm = true;
    const err = validate(data, isSignUpForm);
    if (Object.keys(err).length > 0) {
      setData({ ...data, password: "", password2: "" });
      return false;
    } else {
      setIsLoading(true);

      // Removes second password from data object
      const dataObj = data;
      delete dataObj.password2;
      dataObj.zipCode = dataObj.zipCode.toUpperCase();
      setData(dataObj);

      // Submit new user to database
      try {
        const token = await WeTripApi.register(data);
        const location = { zipCode: data.zipCode, country: data.country };
        updateCurrentUser(data.username, token, location, data.units);
        WeTripApi.token = token;
        history.push("/");
      } catch (err) {
        setData({ ...data, password2: "" });
        getApiErrors(err);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Spinner style={{ width: "3rem", height: "3rem" }} />;
  }

  return (
    <div className="container">
      <h2 className="formheading">Create a new WeTrip account</h2>
      <Errors formErrors={formErrors} apiErrors={apiErrors} />
      <Form onSubmit={handleSubmit} className="register">
        {/* Render input fields */}
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={data.username}
            onChange={handleChange}
          />
        </FormGroup>
        {/* Render more input fields */}
        {/* ... */}
        {/* Render select fields */}
        {/* ... */}
        {/* Render button */}
        <Button className="button">Register</Button>
      </Form>
    </div>
  );
}

export default RegisterForm;
