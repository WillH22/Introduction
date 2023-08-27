import React, { useState } from "react";
import { Button } from "reactstrap";
import Trip from "./Trip";

/** Component to display a list of trips retrieved from the database */
function TripsList({ trips, units, username, deleteTrip, isMobile }) {
  // State to manage the visible trips
  const [visibleTrips, setVisibleTrips] = useState(
    trips.length < 6 ? trips : trips.slice(0, 5)
  );

  /** Displays an error message if the trips object is not returned properly */
  if (typeof trips === "string") {
    return <p>{trips}</p>;
  }

  /** Toggles between displaying the entire trips array and showing only the five most recent trips */
  const toggleShowAll = () => {
    trips.length === visibleTrips.length
      ? setVisibleTrips(trips.slice(0, 5))
      : setVisibleTrips(trips);
  };

  return (
    <>
      {/* Display each visible trip */}
      {visibleTrips &&
        visibleTrips.map((t) => (
          <Trip
            key={t.tripId}
            units={units}
            trip={t}
            username={username}
            deleteTrip={deleteTrip}
            isMobile={isMobile}
          />
        ))}

      {/* Display a button to toggle between showing fewer and showing all trips */}
      {trips.length > 5 && (
        <Button onClick={toggleShowAll} className="toggle">
          {visibleTrips.length > 5 ? "Show Fewer" : "Show All"}
        </Button>
      )}
    </>
  );
}

export default TripsList;
