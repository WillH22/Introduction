import React from "react";
import { Link } from "react-router-dom";

function Colors({ colorList }) {
  return (
    <nav>
      <Link exact to="/colors/new">
        Add A Color
      </Link>
      {colorList.map((c) => {
        return (
          <Link exact to={`/colors/${c}`} key={c}>
            {c}
          </Link>
        );
      })}
    </nav>
  );
}

export default Colors;
