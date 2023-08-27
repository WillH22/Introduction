import React from "react";
import WeatherDaily from "./WeatherDaily";

/** Component for displaying a 16-day weather forecast for a specified location */
function WeatherForecast({ weather, units }) {
  /** Provides loading or error messages if weather prop is undefined or an error string */
  if (!weather) return <p>Getting weather</p>;
  if (weather === "API error") return <p>API Error</p>;
  if (weather === "Bad location") {
    return (
      <div>
        <p>That place doesn't exist!</p>
      </div>
    );
  }

  /** Determines whether to display state code or country code */
  const countryDisplay = Number.isInteger(+weather.data.state_code)
    ? weather.data.country_code
    : weather.data.state_code;

  return (
    <div className="container">
      <h3>
        Upcoming Weather for {weather.data.city_name}, {countryDisplay}
      </h3>
      {/* Maps over each day's weather data to render WeatherDaily component */}
      {weather.data.data.map((w) => (
        <WeatherDaily daily={w} key={w.valid_date} units={units} />
      ))}
    </div>
  );
}

export default WeatherForecast;
