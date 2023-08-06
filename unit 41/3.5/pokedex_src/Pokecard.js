import React from "react";

function Pokecard({ name, id, type, base_experience }) {
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  return (
    <div className="Pokecard">
      <p className="Pokecard-name">{name}</p>
      <img src={imgUrl} alt="Pokemon Image" />
      <p>Type: {type}</p>
      <p>EXP: {base_experience}</p>
    </div>
  );
}

export default Pokecard;
