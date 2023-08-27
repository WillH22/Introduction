import axios from "axios";
// Import Axios for making HTTP requests
// Import the Marinas API key from environment variables

const BASE_URL = "https://api.marinas.com/v1/";
const API_KEY = process.env.REACT_APP_MARINAS_API_KEY;

// Class for interacting with the Marinas API
class MarinasApi {
  /** Fetches an array of points of interest within a specified distance
   * of a given latitude and longitude.
   */
  static async getPoints(longLat) {
    try {
      const res = await axios.get(
        // Make a GET request to the Marinas API with location parameters
        `${BASE_URL}points/search?location[lon]=${longLat[0]}&location[lat]=${longLat[1]}&location[radius]=20000&access_key=${API_KEY}`
      );
      return res; // Return the response data
    } catch (err) {
      console.error("Marinas API Error:", err.response);
      let message;
      // Handle errors and extract error message from the response
      !err.response
        ? (message = "Server error, please try again later")
        : (message = err.response.data.error.message);
      // Throw the error message as an array
      throw Array.isArray(message) ? message : [message];
    }
  }

  /** Retrieves information about a specific point of interest */
  static async getOnePoint(id) {
    try {
      const res = await axios.get(`${BASE_URL}points/${id}`);
      return res.data; // Return the data of the specific point of interest
    } catch (err) {
      console.error("Marinas API Error:", err.response);
      let message;
      // Handle errors and extract error message from the response
      !err.response
        ? (message = "Server error, please try again later")
        : (message = err.response.data.error.message);
      // Throw the error message as an array
      throw Array.isArray(message) ? message : [message];
    }
  }
}

export default MarinasApi;
