import React, { useState } from "react";
import { Spinner } from "reactstrap";
import { Redirect, useHistory } from "react-router-dom";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from "reactstrap";
import "./static/styles/Form.css";
import { useHandleChange, useErrors } from "./hooks";
import Errors from "./Errors";
import WeTripApi from "./WeTripApi";

// Component for user login form
function LoginForm({ username, updateCurrentUser, isMobile }) {
  const initialState = { username: "", password: "" };

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [data, handleChange, setData] = useHandleChange(initialState);
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();
  const history = useHistory();

  // Redirect to home if already logged in
  if (username) {
    return <Redirect to="/" />;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiErrors({});

    // Validate form fields
    if (!data.username || !data.password) {
      setErrors({ error: "Username and Password are required" });
      setData(initialState);
      return false;
    } else {
      setIsLoading(true);

      // Check for valid name/password combination and get API token
      try {
        const { token, location, units } = await WeTripApi.login(data);
        updateCurrentUser(data.username, token, location, units);
        WeTripApi.token = token;
        history.push("/");
      } catch (e) {
        getApiErrors(e);
        setData(initialState);
        setIsLoading(false);
      }
    }
  };

  // Display loading spinner while submitting
  if (isLoading) {
    return <Spinner style={{ width: "3rem", height: "3rem" }} />;
  }

  return (
    <div className="container">
      <Errors formErrors={errors} apiErrors={apiErrors} />

      {/* Form for mobile view */}
      {isMobile && (
        <Form onSubmit={handleSubmit} className="Mform">
          {/* Form fields */}
          <Row>
            <Col xs={12} md={5}>
              <FormGroup>
                <Row>
                  <Col xs={5}>
                    <Label htmlFor="username">Username</Label>
                  </Col>
                  <Col xs={7}>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      placeholder="Username"
                      value={data.username}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={5}>
              <FormGroup>
                <Row>
                  <Col xs={5} md={4}>
                    <Label htmlFor="password">Password</Label>
                  </Col>
                  <Col xs={7} md={8}>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={handleChange}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button className="Mbutton">Log In</Button>
            </Col>
          </Row>
        </Form>
      )}

      {/* Form for desktop view */}
      {!isMobile && (
        <Form onSubmit={handleSubmit}>
          {/* Form fields */}
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                value={data.username}
                onChange={handleChange}
              />
            </InputGroupAddon>
            <Input
              type="password"
              name="password"
              id="password"
              value={data.password}
              placeholder="Password"
              onChange={handleChange}
              className="mid"
            />
            <InputGroupAddon addonType="append">
              <Button className="button">Log In</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      )}
    </div>
  );
}

export default LoginForm;
