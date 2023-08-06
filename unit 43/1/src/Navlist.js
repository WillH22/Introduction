import React from "react";
import { NavLink } from "react-router-dom";

function Navlist() {
  return (
    <nav className="nav">
      <NavLink exact to="/" className="home">
        Vending Machine
      </NavLink>
      <NavLink exact to="/chips">
        Chips
      </NavLink>
      <NavLink exact to="/popcorn">
        Popcorn
      </NavLink>
      <NavLink exact to="/chocolate">
        Chocolate
      </NavLink>
    </nav>
  );
}

export default Navlist;
