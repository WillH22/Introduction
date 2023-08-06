import React from "react";
import Pokecard from "./Pokecard";

function Pokedex({ pokes }) {
  return (
    <>
      <h2>Pokedex</h2>
      <div className="Pokedex">
        {pokes.map((p) => (
          <Pokecard
            name={p.name}
            id={p.id}
            type={p.type}
            base_experience={p.base_experience}
          />
        ))}
      </div>
    </>
  );
}

export default Pokedex;
