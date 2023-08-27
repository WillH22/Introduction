import React, { useState } from "react";
import ReactMapboxGl, { Marker } from "react-mapbox-gl";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
// import {mapbox} from './ApiKeys';
import mapboxStyle from "./static/mapboxStyle";

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const API_KEY = process.env.REACT_APP_MAPBOX_API_KEY;

/** React-Mapbox-GL map showing location of a specific point of interest */
function PointMap({ longLat, icon_url, isMobile }) {
  // Extract longitude and latitude from the input
  const [lng] = useState(longLat[0]);
  const [lat] = useState(longLat[1]);
  const [zoom] = useState([14]);

  // Create a new instance of the ReactMapboxGl component
  const Map = ReactMapboxGl({
    accessToken: API_KEY,
  });

  // Define the map style and container dimensions based on device type
  const style = mapboxStyle;
  const containerStyle = isMobile
    ? { height: 400, width: 300 }
    : { height: 400, width: 600 };

  return (
    <>
      {/* Render the map */}
      <Map
        style={style}
        center={[lng, lat]}
        zoom={zoom}
        containerStyle={containerStyle}
      >
        {/* Render a marker on the map */}
        <Marker coordinates={[lng, lat]} anchor="bottom">
          <img className="Marker" src={icon_url} alt="Map Marker" />
        </Marker>
      </Map>
    </>
  );
}

export default PointMap;
