import React from "react";
import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <NavLink exact to="/dogs">
        All Dogs
      </NavLink>
      <NavLink exact to="/dogs/Whiskey">
        Whiskey
      </NavLink>
      <NavLink exact to="/dogs/Duke">
        Duke
      </NavLink>
      <NavLink exact to="/dogs/Perry">
        Perry
      </NavLink>
      <NavLink exact to="/dogs/Tubby">
        Tubby
      </NavLink>
    </nav>
  );
}

export default Nav;
