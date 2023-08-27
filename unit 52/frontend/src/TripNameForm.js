import React, { useState } from "react";
import { Button, Form, Input, InputGroup, InputGroupAddon } from "reactstrap";
import "./static/styles/Trips.css";
import { useHandleChange, useErrors } from "./hooks";
import WeTripApi from "./WeTripApi";
import Errors from "./Errors";

/** Form component for naming and saving a trip */
function TripNameForm({ currentTrip, username, deleteCurrentTrip, addTrip }) {
  // State for managing form data
  const [data, handleChange, setData] = useHandleChange({ name: "" });

  // State for managing API error messages
  const [apiErrors, getApiErrors, setApiErrors] = useErrors();

  // State for managing form validation errors
  const [formErrors, setFormErrors] = useState({});

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setApiErrors({});

    // Validate form data
    if (!data.name || data.name.length < 1 || data.name.length > 30) {
      setFormErrors({
        error: "Trip Name must be between one and thirty characters.",
      });
      return false;
    } else {
      setFormErrors({});
      try {
        // Create trip data object and submit to the database
        let locations = [];
        for (let location of currentTrip) {
          locations.push({ location: location.id });
        }
        const tripData = {
          trip: {
            name: data.name,
            distance: currentTrip[currentTrip.length - 1].totalDistance,
          },
          locations,
        };
        const res = await WeTripApi.addTrip(username, tripData);

        // Create trip object and add it to user's trips
        const trip = {
          tripId: res.trip.id,
          distance: res.trip.distance,
          tripName: res.trip.name,
          tripRating: null,
          locations: res.tripLocations,
        };
        addTrip(trip);

        // Clear trip data from state after submission
        setData({ name: "" });
        deleteCurrentTrip();
      } catch (err) {
        getApiErrors(err);
      }
    }
  };

  return (
    <>
      {/* Display form and error messages */}
      <Errors formErrors={formErrors} apiErrors={apiErrors} />
      <Form onSubmit={onSubmit} className="tripNameForm">
        <InputGroup>
          <Input
            type="text"
            name="name"
            placeholder="Trip Name"
            value={data.name}
            onChange={handleChange}
          />
          <InputGroupAddon addonType="append">
            <Button>Save Trip</Button>
          </InputGroupAddon>
        </InputGroup>
      </Form>
    </>
  );
}

export default TripNameForm;
