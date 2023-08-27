import React from "react";
import { Button } from "reactstrap";
import "./static/styles/Trips.css";
import TripNameForm from "./TripNameForm";
import { calculateDistance } from "./static/helpers";

/** Displays the list of destinations as a user creates a trip,
 * along with the total distance of the trip in either miles or kilometers, based on the selected units.
 * Additionally provides a button to completely remove the trip.
 */
function CurrentTrip({
  currentTrip,
  deleteCurrentTrip,
  units,
  username,
  addTrip,
}) {
  /** Calculate the total distance for the trip.
   * Takes the distance from the last location in the currentTrip array.
   */
  let totalDistance = 0;
  if (currentTrip[0]) {
    totalDistance = currentTrip[currentTrip.length - 1].totalDistance;
    totalDistance = calculateDistance(units, totalDistance);
  }

  return (
    <div className="tripsGroup">
      <h3 className="pointsTitle">Current Trip</h3>
      {!currentTrip[0] && <p>No trip destinations selected</p>}
      {currentTrip.map((p) => (
        <p key={p.totalDistance}>{p.name}</p>
      ))}
      {currentTrip[0] && (
        <p>
          Total Distance: {totalDistance}
          {units === "i" ? " mi" : " km"}
        </p>
      )}
      {currentTrip[1] && (
        <TripNameForm
          currentTrip={currentTrip}
          username={username}
          deleteCurrentTrip={deleteCurrentTrip}
          addTrip={addTrip}
        />
      )}
      <br />
      {currentTrip[0] && (
        <Button onClick={deleteCurrentTrip} className="toggle">
          Delete Current Trip
        </Button>
      )}
    </div>
  );
}

export default CurrentTrip;
