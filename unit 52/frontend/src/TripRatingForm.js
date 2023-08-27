import React from "react";
import {
  Button,
  Form,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";
import "./static/styles/Trips.css";
import { useHandleChange, useErrors } from "./hooks";
import Errors from "./Errors";
import WeTripApi from "./WeTripApi";

/** Form for rating a trip. Allows users to rate trips on a scale of 1 to 5. */
function TripRatingForm({ trip, username, setRating, isMobile }) {
  // Set initial state for rating, defaulting to 3 if not rated before
  const initialState = trip.tripRating
    ? { rating: trip.tripRating }
    : { rating: 3 };

  // Use custom hook for handling input changes
  const [data, handleChange] = useHandleChange(initialState);

  // Use custom hooks for handling errors and API error responses
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();

  // Handle form submission for submitting trip rating
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call API to rate the trip and update the state with new rating
      const rating = await WeTripApi.rateTrip(username, trip.tripId, data);
      setRating(rating.tripRating);
      setApiErrors({});
    } catch (err) {
      getApiErrors(err);
    }
  };

  return (
    <div className="tripRatingContainer">
      <div className="tripRatingForm">
        {/* Display error messages, if any */}
        <Errors apiErrors={apiErrors} />

        {/* Render form based on device type */}
        <Form onSubmit={handleSubmit}>
          {/* Desktop view */}
          {!isMobile && (
            <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText className="rate">
                  <Label htmlFor={`${trip.tripId}rating`}>
                    Rate This Trip:{" "}
                  </Label>
                </InputGroupText>
              </InputGroupAddon>
              <Input
                type="select"
                name="rating"
                id={`${trip.tripId}rating`}
                value={data.rating}
                className="ratingInput"
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Input>
              <InputGroupAddon addonType="append">
                <Button>Submit Rating</Button>
              </InputGroupAddon>
            </InputGroup>
          )}

          {/* Mobile view */}
          {isMobile && (
            <>
              <Label htmlFor={`${trip.tripId}MRating`} className="detailTitle">
                Rate This Trip
              </Label>
              <br />
              <Input
                type="select"
                name="rating"
                id={`${trip.tripId}MRating`}
                className="mRatingInput"
                value={data.rating}
                onChange={handleChange}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Input>
              <br />
              <Button>Submit Rating</Button>
            </>
          )}
        </Form>
      </div>
    </div>
  );
}

export default TripRatingForm;
