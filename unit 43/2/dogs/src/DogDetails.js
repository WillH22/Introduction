import React from "react";
import { useParams } from "react-router-dom";

function DogDetails({ dogs }) {
  const { name } = useParams();
  const dog = dogs.find((d) => name === d.name);

  return (
    <>
      <img src={dog.src} alt={dog.name} />
      <p>Name: {dog.name}</p>
      <p>Age: {dog.age}</p>
      {dog.facts.map((f) => (
        <p key={f}>{f}</p>
      ))}
    </>
  );
}

export default DogDetails;
