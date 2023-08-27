import React from "react";
import { Link } from "react-router-dom";

function Attributions({ isMobile }) {
  return (
    // Footer container with conditional styling
    <div className={isMobile ? "mFooter" : "footer"}>
      {/* Weather Attribution */}
      <p>
        Weather info supplied by{" "}
        <Link to={{ pathname: "https://www.weatherbit.io/" }} target="blank">
          Weatherbit.io
        </Link>
      </p>
      {/* Photo Attribution */}
      <p>
        Background Photo by{" "}
        <Link
          to={{ pathname: "https://unsplash.com/photos/q84-1IeZytc" }}
          target="blank"
        >
          Gautam Krishnan
        </Link>{" "}
        on{" "}
        <Link to={{ pathname: "https://unsplash.com/" }} target="blank">
          Unsplash
        </Link>
      </p>
    </div>
  );
}

export default Attributions;
