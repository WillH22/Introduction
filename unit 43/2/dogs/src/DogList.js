import React from "react";
import { Link } from "react-router-dom";

function DogList({ dogs }) {
  return (
    <>
      {dogs.map((d) => {
        return (
          <div key={d.name}>
            <Link exact to={`/dogs/${d.name}`}>
              {d.name}
            </Link>
            <img src={d.src} alt={d.name} />
          </div>
        );
      })}
    </>
  );
}

export default DogList;
