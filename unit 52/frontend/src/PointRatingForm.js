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
import WeTripApi from "./WeTripApi";
import Errors from "./Errors";

/** Form for rating a specific point. Ratings are from 1 to 5 as whole numbers */
function PointRatingForm({
  point,
  username,
  userRating,
  setUserRating,
  setOverallRating,
  isMobile,
}) {
  // Set initial rating state based on user's existing rating or default to 3
  const initialState =
    userRating && userRating.length === 1
      ? { rating: userRating }
      : { rating: 3 };
  const [data, handleChange] = useHandleChange(initialState);
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();
  const id = point.id;

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the point exists in the database and add it if not
      const locationData = {
        id,
        title: point.name,
        latitude: point.location.lat,
        longitude: point.location.lon,
      };
      await WeTripApi.addLocation(locationData);

      // Prepare the rating data and add it to the database
      const ratingData = { rating: parseInt(data.rating), id, username };
      const user = await WeTripApi.addRating(username, ratingData);
      setUserRating(user);

      // Retrieve updated average rating from the database and set it in state
      let overall = await WeTripApi.getRatings(username, id);
      setOverallRating(overall.overallRating);
      setApiErrors({});
    } catch (err) {
      getApiErrors(err);
    }
  };

  return (
    <div className="ratingForm">
      {/* Display error messages */}
      <Errors apiErrors={apiErrors} />
      {/* Render the rating form */}
      <Form onSubmit={handleSubmit}>
        {/* Render the rating input */}
        {!isMobile && (
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="rate">
                <Label htmlFor={`${id}Rating`}>Rate This Location: </Label>
              </InputGroupText>
            </InputGroupAddon>
            <Input
              type="select"
              name="rating"
              id={`${id}Rating`}
              className="ratingInput"
              value={data.rating}
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
        {isMobile && (
          <>
            {/* Render the rating input for mobile */}
            <Label htmlFor={`${id}MRating`} className="detailTitle">
              Rate This Location
            </Label>
            <br />
            <Input
              type="select"
              name="rating"
              id={`${id}MRating`}
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
  );
}

export default PointRatingForm;
