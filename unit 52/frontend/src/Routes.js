import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import Logout from "./Logout";
import ProfileForm from "./ProfileForm";
import WeatherForecast from "./WeatherForecast";
import TripPlanner from "./TripPlanner";

/** Component responsible for defining the application's routes */
function Routes({
  username,
  updateCurrentUser,
  weather,
  longLat,
  units,
  setWeather,
  isMobile,
}) {
  return (
    <Switch>
      {/* Home Route */}
      <Route exact path="/">
        <Home username={username} />
      </Route>
      {/* Register Route */}
      <Route exact path="/register">
        <RegisterForm
          username={username}
          updateCurrentUser={updateCurrentUser}
        />
      </Route>
      {/* Login Route */}
      <Route exact path="/login">
        <LoginForm
          username={username}
          updateCurrentUser={updateCurrentUser}
          isMobile={isMobile}
        />
      </Route>
      {/* Profile Route */}
      <Route exact path="/profile">
        <ProfileForm
          username={username}
          updateCurrentUser={updateCurrentUser}
        />
      </Route>
      {/* Logout Route */}
      <Route exact path="/logout">
        <Logout updateCurrentUser={updateCurrentUser} />
      </Route>
      {/* Weather Forecast Route */}
      <Route exact path="/forecast">
        <WeatherForecast weather={weather} units={units} />
      </Route>
      {/* Trip Planner Route */}
      <Route exact path="/planner">
        <TripPlanner
          longLat={longLat}
          units={units}
          username={username}
          setWeather={setWeather}
          isMobile={isMobile}
        />
      </Route>
      {/* Redirect to Home if none of the above routes match */}
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
