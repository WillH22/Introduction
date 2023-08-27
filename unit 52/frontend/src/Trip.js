import React, { useState } from "react";
import { Button } from "reactstrap";
import Point from "./Point";
import TripRatingForm from "./TripRatingForm";
import { calculateDistance } from "./static/helpers";
import DeleteModal from "./DeleteModal";

/** Component for displaying details of a single saved trip */
function Trip({ trip, units, username, deleteTrip, isMobile }) {
  // State to manage whether trip locations are shown
  const [showLocations, setShowLocations] = useState(false);

  // State to manage the user's rating for the trip
  const [rating, setRating] = useState();

  // Calculate the trip distance based on the selected units
  const distance = calculateDistance(units, trip.distance);

  // Indicator if the trip is saved
  const isSaved = true;

  // Toggle whether locations for the trip are visible
  const toggleLocations = () => {
    setShowLocations(!showLocations);
  };

  return (
    <div className="Trip">
      {/* Display trip title and distance */}
      <div className="tripTitle">
        <h5>
          <span>{trip.tripName}</span> - {distance}{" "}
          {units === "i" ? "mi" : "km"}
        </h5>
        {<p>Rating: {rating || trip.tripRating || "Not rated yet"}</p>}
      </div>
      {/* Display trip rating form if user is logged in */}
      {username && (
        <TripRatingForm
          trip={trip}
          username={username}
          setRating={setRating}
          isMobile={isMobile}
        />
      )}
      {/* Display locations of the trip if visible */}
      {showLocations &&
        trip.locations.map((l) => (
          <Point
            key={l.locationId}
            point={l}
            currentTrip={[]}
            setCurrentTrip={{}}
            username={username}
            isSaved={isSaved}
            isMobile={isMobile}
          />
        ))}
      {/* Button to toggle visibility of trip locations */}
      <Button onClick={toggleLocations} className="toggle">
        {showLocations ? "Hide Trip" : "Show Trip"}
      </Button>
      <br />
      {/* Display delete modal if user is logged in */}
      {username && (
        <DeleteModal
          deleteTrip={deleteTrip}
          username={username}
          id={trip.tripId}
        />
      )}
    </div>
  );
}

export default Trip;
