import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import "./static/styles/App.css";
import Routes from "./Routes";
import NavB from "./NavB";
import WeatherApi from "./WeatherApi";
import WeatherBar from "./WeatherBar";
import Attributions from "./Attributions";
import LocationForm from "./LocationForm";
import countriesWithoutPostalCodes from "./static/countriesWithoutZip";

function App() {
  // Default location and coordinates
  const defaultLocation = {
    zipCode: "91945",
    country: "US",
    city: "San Diego",
  };
  const defaultLongLat = [-117.0326, 32.7332];

  // State variables
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [location, setLocation] = useState(
    JSON.parse(localStorage.getItem("location")) || defaultLocation
  );
  const [units, setUnits] = useState(localStorage.getItem("units") || "i");
  const [weather, setWeather] = useState();
  const [longLat, setLongLat] = useState(
    JSON.parse(localStorage.getItem("longLat")) || defaultLongLat
  );
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  useEffect(() => {
    /** Gets weather from weatherbit API
     * and updates latitude and longitude data
     */
    async function getWeather() {
      try {
        let w = null;
        if (!countriesWithoutPostalCodes.has(location.country)) {
          w = await WeatherApi.getWeatherByZip(location, units);
        }
        if (!w || w === "Bad location") {
          w = await WeatherApi.getWeatherByCity(location, units);
        }
        setWeather(w);
        if (w !== "Bad location") {
          const newLongLat = [parseFloat(w.data.lon), parseFloat(w.data.lat)];
          setLongLat(newLongLat);
          localStorage.setItem(
            "longLat",
            JSON.stringify([w.data.lon, w.data.lat])
          );
        }
      } catch (e) {
        setWeather("API error");
      }
    }
    getWeather();
  }, [location, units, setWeather, setLongLat]);

  /** Sets state and local storage with current user data,
   * or removes data from both when logging out
   */
  function updateCurrentUser(name, token, location, units) {
    setUsername(name);
    if (name === "") {
      setLocation(defaultLocation);
      setUnits("i");
      localStorage.removeItem("username");
      localStorage.removeItem("token");
      localStorage.removeItem("location");
      localStorage.removeItem("units");
    } else {
      setLocation(location);
      setUnits(units);
      localStorage.setItem("username", name);
      localStorage.setItem("token", token);
      localStorage.setItem("location", JSON.stringify(location));
      localStorage.setItem("units", units);
    }
  }

  /** Changes location in state and local storage.
   * Used for searching weather in locations different from user's
   * saved location, or for not logged in users
   */
  function updateLocation(location) {
    setLocation(location);
    localStorage.setItem("location", JSON.stringify(location));
  }

  return (
    <div className="App">
      <div id={isMobile ? "mContent-wrap" : "content-wrap"}>
        {/* Navigation Bar */}
        <NavB username={username} isMobile={isMobile} />
        {/* Weather Bar */}
        <WeatherBar
          location={location}
          weather={weather}
          isMobile={isMobile}
          units={units}
        />
        {/* Location Form */}
        <LocationForm
          location={location}
          updateLocation={updateLocation}
          isMobile={isMobile}
        />
        {/* Routes */}
        <Routes
          username={username}
          updateCurrentUser={updateCurrentUser}
          weather={weather}
          longLat={longLat}
          units={units}
          setWeather={setWeather}
          isMobile={isMobile}
        />
      </div>
      {/* Attributions */}
      <Attributions isMobile={isMobile} />
    </div>
  );
}

export default App;


//    Suggestions:

   //1. Consider modularizing your code even further by creating more subcomponents. This can help improve maintainability, especially as your application grows.
   //2. Ensure that you handle edge cases gracefully, such as when API calls fail or return unexpected data.
   //3. Consider adding PropTypes or TypeScript typings to your components to improve code predictability and catch potential errors.
   //4. Think about incorporating more styling options (like CSS modules or CSS-in-JS) for better encapsulation of styles.
