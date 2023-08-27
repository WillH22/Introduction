import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

class WeTripApi {
  static token;

  /**
   * Sends a request to the database and catches any errors
   */
  static async request(endpoint, data = {}, method = "get") {
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${WeTripApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message;
      !err.response
        ? (message = "Server error, please try again later")
        : (message = err.response.data.error.message);
      throw Array.isArray(message) ? message : [message];
    }
  }

  /**
   * Registers a new user and gets the JWT token
   */
  static async register(data) {
    const res = await this.request("users/register", data, "post");
    return res.token;
  }

  /**
   * Logs in an existing user and gets the JWT token.
   * Returns user location and preferred unit of measurement.
   */
  static async login(data) {
    const res = await this.request("users/login", data, "post");
    const token = res.token;
    const location = res.location;
    const units = res.units;
    return { token, location, units };
  }

  /**
   * Gets all information on a single user
   */
  static async getUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /**
   * Updates selected data on a single user and returns all data
   */
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }

  /**
   * Adds a location into the database if not already added
   */
  static async addLocation(data) {
    const res = await this.request(`locations/new_location`, data, "post");
    return res.location;
  }

  /**
   * Adds a location rating into the database
   */
  static async addRating(username, data) {
    const res = await this.request(
      `locations/rating/${username}`,
      data,
      "patch"
    );
    return res.rating;
  }

  /**
   * Gets user and overall ratings for a location
   */
  static async getRatings(username, id) {
    const res = await this.request(`locations/${id}/${username}`);
    const ratings = {
      overallRating: res.overallRating,
      userRating: res.userRating,
    };
    return ratings;
  }

  /**
   * Adds a trip and its locations into the database
   */
  static async addTrip(username, data) {
    const res = await this.request(`trips/${username}/new_trip`, data, "post");
    const trip = { trip: res.trip, tripLocations: res.tripLocations };
    return trip;
  }

  /**
   * Gets logged in user's trips from the database
   */
  static async getUserTrips(username) {
    const res = await this.request(`trips/${username}/trips`);
    return res;
  }

  /**
   * Gets the 20 most recent trips from the database
   */
  static async getRecentTrips() {
    const res = await this.request("trips/recent_trips");
    return res;
  }

  /**
   * Deletes a trip from the database
   */
  static async deleteTrip(username, id) {
    const res = await this.request(
      `trips/${username}/${id}/delete`,
      {},
      "delete"
    );
    return res;
  }

  /**
   * Adds a trip rating to the database
   */
  static async rateTrip(username, id, data) {
    const res = await this.request(
      `trips/${username}/${id}/rate`,
      data,
      "patch"
    );
    return res;
  }
}

WeTripApi.token = localStorage.getItem("token");

export default WeTripApi;
