import React from "react";
import { useParams, Link, Redirect } from "react-router-dom";

function Color({ colorList }) {
  let { color } = useParams();
  if (!colorList.includes(color)) {
    return <Redirect to="/colors" />;
  }
  if (color.length === 6) {
    color = "#" + color;
  }
  return (
    <>
      <div style={{ backgroundColor: color }}>
        <Link exact to="/colors">
          Home
        </Link>
      </div>
    </>
  );
}

export default Color;
