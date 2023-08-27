import React, { useState } from "react";
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
import countryCodes from "./static/countryCodes";
import countriesWithoutPostalCodes from "./static/countriesWithoutZip";
import { useHandleChange } from "./hooks";
import Errors from "./Errors";

// Component for changing user's location without updating database
function LocationForm({ location, updateLocation, isMobile }) {
  const [data, handleChange, setData] = useHandleChange(location);
  const [previousData, setPreviousData] = useState();
  const [errors, setErrors] = useState({});

  // Update form data when location prop changes
  if (location !== previousData) {
    setData(location);
    setPreviousData(location);
  }

  // Handle form submission and validate data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (countriesWithoutPostalCodes.has(data.country) && !data.city) {
      setErrors({ error: "City is required for this country" });
      return false;
    } else if (
      !data.zipCode ||
      data.zipCode.length < 3 ||
      data.zipCode.length > 12
    ) {
      setErrors({
        error: "Zip/Postal Code must be between 3 and 12 characters",
      });
      return false;
    } else {
      setErrors({});
      const newLocation = {
        zipCode: data.zipCode,
        country: data.country,
        city: data.city,
      };
      updateLocation(newLocation);
    }
  };

  return (
    <div className="container">
      <Errors formErrors={errors} />

      {/* Form for mobile view */}
      {isMobile && (
        <Form onSubmit={handleSubmit}>
          {/* Conditional rendering based on country */}
          <Row>
            {!countriesWithoutPostalCodes.has(data.country) && (
              <Col xs={12} md={5}>
                <FormGroup>
                  <Row>
                    <Col xs={5}>
                      <Label htmlFor="zipCode" className="Mlabel">
                        Zip/Postal Code
                      </Label>
                    </Col>
                    <Col xs={7}>
                      <Input
                        type="text"
                        name="zipCode"
                        id="zipCode"
                        placeholder="Zip/Postal Code"
                        value={data.zipCode}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            )}
            {countriesWithoutPostalCodes.has(data.country) && (
              <Col xs={12} md={5}>
                <FormGroup>
                  <Row>
                    <Col xs={5}>
                      <Label htmlFor="city" className="Mlabel">
                        City
                      </Label>
                    </Col>
                    <Col xs={7}>
                      <Input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City"
                        value={data.city}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </FormGroup>
              </Col>
            )}
            <Col xs={12} md={5}>
              <FormGroup>
                <Row>
                  <Col xs={5} md={4}>
                    <Label htmlFor="country" className="Mlabel">
                      Country
                    </Label>
                  </Col>
                  <Col xs={7} md={8}>
                    <Input
                      type="select"
                      name="country"
                      id="country"
                      value={data.country}
                      onChange={handleChange}
                    >
                      {Object.entries(countryCodes).map(([country, code]) => (
                        <option value={code} key={code}>
                          {country}
                        </option>
                      ))}
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
            </Col>
            <Col xs={12} md={2}>
              <Button className="Mbutton">Set Location</Button>
            </Col>
          </Row>
        </Form>
      )}

      {/* Form for desktop view */}
      {!isMobile && (
        <Form onSubmit={handleSubmit}>
          {/* Conditional rendering based on country */}
          <InputGroup>
            {!countriesWithoutPostalCodes.has(data.country) && (
              <InputGroupAddon addonType="prepend">
                <Input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  placeholder="Zip/Postal Code"
                  value={data.zipCode}
                  onChange={handleChange}
                />
              </InputGroupAddon>
            )}
            {countriesWithoutPostalCodes.has(data.country) && (
              <InputGroupAddon addonType="prepend">
                <Input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={data.city}
                  onChange={handleChange}
                />
              </InputGroupAddon>
            )}
            <Input
              type="select"
              name="country"
              id="country"
              value={data.country}
              onChange={handleChange}
              className="mid"
            >
              {Object.entries(countryCodes).map(([country, code]) => (
                <option value={code} key={code}>
                  {country}
                </option>
              ))}
            </Input>
            <InputGroupAddon addonType="append">
              <Button className="button">Set Location</Button>
            </InputGroupAddon>
          </InputGroup>
        </Form>
      )}
    </div>
  );
}

export default LocationForm;

//Suggestions:

//  1.  Consider adding more specific error messages for different validation scenarios, which can provide more informative feedback to users.
