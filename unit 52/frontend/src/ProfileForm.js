import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input, Spinner } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useHandleChange, useValidate, useErrors } from "./hooks";
import countryCodes from "./static/countryCodes";
import "./static/styles/Register.css";
import WeTripApi from "./WeTripApi";
import Errors from "./Errors";

/** Form to update user information */
function ProfileForm({ username, updateCurrentUser }) {
  const initialState = {
    zipCode: "",
    country: "",
    email: "",
    password: "",
    password2: "",
    units: "m",
  };

  const [isLoading, setIsLoading] = useState(true);
  const [formErrors, validate] = useValidate();
  const [data, handleChange, setData] = useHandleChange(initialState);
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();
  const history = useHistory();

  useEffect(() => {
    async function getUserInfo() {
      // Redirect to login page if not logged in
      if (!username) {
        history.push("/login");
        return false;
      }

      // Gets info about logged-in user and sets initial form data
      try {
        const user = await WeTripApi.getUser(username);
        setData({
          zipCode: user.zipCode,
          country: user.country,
          email: user.email,
          units: user.units,
        });
      } catch (e) {
        getApiErrors(e);
      }
    }
    getUserInfo(username);
    setIsLoading(false);
  }, [username, setData, setIsLoading, history, getApiErrors]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiErrors({});

    // Checks form for errors
    const isSignUpForm = false;
    const err = validate(data, isSignUpForm);
    if (Object.keys(err).length > 0) {
      setData({ ...data, password: "", password2: "" });
      return false;
    } else {
      setIsLoading(true);

      // Removes the second password from the data object
      const dataObj = data;
      delete dataObj.password2;
      dataObj.zipCode = dataObj.zipCode.toUpperCase();
      setData(dataObj);

      // Submits data to update user info and redirects to home
      try {
        await WeTripApi.updateUser(username, data);
        const location = { zipCode: data.zipCode, country: data.country };
        updateCurrentUser(
          username,
          localStorage.getItem("token"),
          location,
          data.units
        );
        history.push("/");
      } catch (e) {
        setData({ ...data, password: "", password2: "" });
        getApiErrors(e);
        setIsLoading(false);
      }
    }
  };

  if (isLoading) {
    return <Spinner style={{ width: "3rem", height: "3rem" }} />;
  }

  return (
    <div className="container">
      <h2 className="formheading">Update User Info For {username}</h2>
      <Errors formErrors={formErrors} apiErrors={apiErrors} />
      {Object.keys(apiErrors).length === 0 && (
        <Form onSubmit={handleSubmit} className="register">
          {/* Render input fields */}
          <FormGroup>
            <Label htmlFor="password">New Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="New Password"
              value={data.password || ""}
              onChange={handleChange}
            />
          </FormGroup>
          {/* Render more input fields */}
          {/* ... */}
          {/* Render select fields */}
          {/* ... */}
          {/* Render button */}
          <Button className="button">Update User Info</Button>
        </Form>
      )}
    </div>
  );
}

export default ProfileForm;
