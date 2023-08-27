import mapboxgl from "mapbox-gl";
// Import the Mapbox access token from environment variables

// Set the Mapbox access token from the environment variable
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

// Class to interact with Mapbox API
class MapboxApi {
  /** Calculates distance between two sets of latitude and longitude using Mapbox API.
   * Returns the distance in meters.
   */
  static getDistance(longLat1, longLat2) {
    const lon1 = longLat1[0];
    const lat1 = longLat1[1];
    const lon2 = longLat2[0];
    const lat2 = longLat2[1];

    // Create start and end coordinates using Mapbox's LngLat class
    const start = new mapboxgl.LngLat(lon1, lat1);
    const end = new mapboxgl.LngLat(lon2, lat2);

    // Calculate the distance between the two coordinates
    const distance = start.distanceTo(end);

    // Return the calculated distance in meters
    return distance;
  }
}

export default MapboxApi;
