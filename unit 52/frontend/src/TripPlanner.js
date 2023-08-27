import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./static/styles/Trips.css";
import { Button } from "reactstrap";
import MarinasApi from "./MarinasApi";
import Point from "./Point";
import CurrentTrip from "./CurrentTrip";
import TripsList from "./TripsList";
import WeTripApi from "./WeTripApi";
import WeatherApi from "./WeatherApi";

/** Component for the trip planning feature */
function TripPlanner({ longLat, units, username, setWeather, isMobile }) {
  // State for managing points of interest
  const [points, setPoints] = useState();

  // State for managing the current trip being planned
  const [currentTrip, setCurrentTrip] = useState(
    JSON.parse(localStorage.getItem("currentTrip")) || []
  );

  // State for managing user's saved trips
  const [userTrips, setUserTrips] = useState();

  // State for managing recently created trips
  const [recentTrips, setRecentTrips] = useState();

  // State for toggling visibility of recent trips
  const [showRecentTrips, setShowRecentTrips] = useState(false);

  // State for toggling visibility of user's saved trips
  const [showUserTrips, setShowUserTrips] = useState(false);

  // Flag for indicating if a point is saved
  const isSaved = false;

  // Fetch nearby points of interest when component mounts or coordinates change
  useEffect(() => {
    async function getPoints() {
      try {
        const p = await MarinasApi.getPoints(longLat);
        setPoints(p.data.data);
      } catch (e) {
        setPoints("API error");
      }
    }
    getPoints();
  }, [longLat, setPoints]);

  // Fetch user's saved trips when component mounts or username changes
  useEffect(() => {
    async function getUserTrips() {
      if (username) {
        try {
          let trips = await WeTripApi.getUserTrips(username);
          if (!trips[0]) {
            trips = "You have not created any trips yet";
          }
          setUserTrips(trips);
        } catch (e) {
          setUserTrips("Can't retrieve trip information");
        }
      }
    }
    getUserTrips();
  }, [username, setUserTrips]);

  // Fetch recently created trips when component mounts
  useEffect(() => {
    async function getRecentTrips() {
      try {
        let trips = await WeTripApi.getRecentTrips();
        if (!trips[0]) {
          trips = "No trips found";
        }
        setRecentTrips(trips);
      } catch (e) {
        setRecentTrips("Can't retrieve trip information");
      }
    }
    getRecentTrips();
  }, [setRecentTrips]);

  // Function to delete the current trip being planned
  const deleteCurrentTrip = () => {
    setCurrentTrip([]);
    localStorage.removeItem("currentTrip");
  };

  // Toggle visibility of recently created trips
  const toggleShowRecent = () => {
    setShowRecentTrips(!showRecentTrips);
  };

  // Toggle visibility of user's saved trips
  const toggleShowUser = () => {
    setShowUserTrips(!showUserTrips);
  };

  // Function to search for weather and points of interest at a given location
  const searchHere = async (coordinates) => {
    try {
      const w = await WeatherApi.getWeatherbyLongLat(coordinates, units);
      setWeather(w);
    } catch (e) {
      setWeather("API error");
    }
    try {
      const p = await MarinasApi.getPoints(coordinates);
      setPoints(p.data.data);
    } catch (e) {
      setPoints("API error");
    }
  };

  // Function to add a newly created trip to saved/recent trips lists
  const addTrip = (trip) => {
    // Update userTrips and recentTrips
    typeof userTrips === "string"
      ? setUserTrips([trip])
      : setUserTrips([trip, ...userTrips]);
    typeof recentTrips === "string"
      ? setRecentTrips([trip])
      : setRecentTrips([trip, ...recentTrips]);
    setShowUserTrips(false);
    setShowRecentTrips(false);
    setShowUserTrips(true);
    setShowRecentTrips(true);
  };

  // Function to delete a trip from the database
  const deleteTrip = async (username, tripId) => {
    await WeTripApi.deleteTrip(username, tripId);

    // Remove trip from userTrips
    let trips = [...userTrips];
    const removed = trips.findIndex(function (trip) {
      return trip.tripId === tripId;
    });
    trips.splice(removed, 1);
    if (trips.length === 0) {
      trips = "You have not created any trips yet";
    }

    // Remove trip from recentTrips
    let recent = [...recentTrips];
    const removedRecent = recent.findIndex(function (trip) {
      return trip.tripId === tripId;
    });
    if (removedRecent !== -1) recent.splice(removedRecent, 1);

    // Update trips arrays and reset shown lists
    setUserTrips(trips);
    setRecentTrips(recent);
    setShowUserTrips(false);
    setShowRecentTrips(false);
    setShowUserTrips(true);
    setShowRecentTrips(true);
  };

  return (
    <div className="container">
      {!username && (
        <p className="links">
          <Link to="/login">Login</Link> or <Link to="/register">register</Link>{" "}
          to create your own trips.
        </p>
      )}
      <br />
      <div className={showRecentTrips ? "tripsGroup" : "notUsed"}>
        {showRecentTrips && (
          <h3 className="tripsTitle">Recently Created Trips</h3>
        )}
        {showRecentTrips && recentTrips && (
          <TripsList trips={recentTrips} units={units} isMobile={isMobile} />
        )}
        <br />
        <Button onClick={toggleShowRecent} className="toggle">
          {showRecentTrips ? "Hide Recent Trips" : "Show Recent Trips"}
        </Button>
      </div>
      {username && (
        <div>
          <div className={showUserTrips ? "tripsGroup" : "notUsed"}>
            {userTrips && showUserTrips && (
              <>
                <h3 className="tripsTitle">Your Saved Trips</h3>
                <TripsList
                  trips={userTrips}
                  units={units}
                  username={username}
                  deleteTrip={deleteTrip}
                  isMobile={isMobile}
                />
              </>
            )}
            <br />
            <Button onClick={toggleShowUser} className="toggle">
              {showUserTrips ? "Hide Saved Trips" : "Show Saved Trips"}
            </Button>
          </div>
          <CurrentTrip
            currentTrip={currentTrip}
            deleteCurrentTrip={deleteCurrentTrip}
            units={units}
            username={username}
            addTrip={addTrip}
          />
        </div>
      )}
      <div className="points">
        <h3 className="pointsTitle">Nearby Points of Interest</h3>
        {!points ? (
          <p>Loading...</p>
        ) : points === "API error" ? (
          <p>Error retrieving marina information. Please try again later</p>
        ) : !points[0] ? (
          <p>No points of interest nearby</p>
        ) : (
          points.map((p) => (
            <Point
              point={p}
              key={p.id}
              currentTrip={currentTrip}
              setCurrentTrip={setCurrentTrip}
              username={username}
              isSaved={isSaved}
              units={units}
              searchHere={searchHere}
              isMobile={isMobile}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TripPlanner;
