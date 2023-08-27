import React from "react";
import { Jumbotron } from "reactstrap";
import { Link } from "react-router-dom";
import "./static/styles/Home.css";

function Home({ username }) {
  return (
    <div className="container">
      <Jumbotron>
        {/* Title */}
        <h1>Welcome to WeTrip!</h1>
        {/* Introduction */}
        <p>
          The only place to plan your boat trips!
          <span>
            <br />
            Before you get wet, get WeTrip!
          </span>
        </p>
        {/* User-specific content */}
        {username && (
          // Greet returning user
          <p>
            Welcome back, {username}.
            <span>
              <br />
              Are you ready to <Link to="/planner">plan a new trip</Link>?
            </span>
          </p>
        )}
        {!username && (
          // Prompt new user to register or start planning
          <p>
            First time?{"  "}
            <Link to="/register">Create a WeTrip account</Link>,
            <span>
              <br />
              or <Link to="planner">start trip planning now!</Link>
            </span>
          </p>
        )}
      </Jumbotron>
    </div>
  );
}

export default Home;
