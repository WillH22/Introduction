const db = require("../db");

class Location {
  /** Add a single location to the database. Returns the location id. */
  static async addLocation({ id, title, latitude, longitude }) {
    /** Check if the location is already in the database */
    const isDuplicate = await db.query(
      `SELECT id 
            FROM locations
            WHERE id = $1`,
      [id]
    );

    // If location is already in the database, return its id
    if (isDuplicate.rows[0]) {
      return isDuplicate.rows[0];
    }

    /** Insert the location if it's not already in the database */
    const result = await db.query(
      `INSERT INTO locations
                (id,
                title,
                latitude,
                longitude)
            VALUES ($1, $2, $3, $4)
            RETURNING id`,
      [id, title, latitude, longitude]
    );
    const location = result.rows[0];
    return location;
  }

  /** Add a rating to a location. Returns the id and the new rating. */
  static async rateLocation({ id, username, rating }) {
    /** Update rating if it's already rated by the user */
    const isDuplicate = await db.query(
      `SELECT location_id, username
            FROM location_ratings
            WHERE location_id = $1 AND username = $2`,
      [id, username]
    );

    // If the user has already rated the location, update their rating
    if (isDuplicate.rows[0]) {
      const result = await db.query(
        `UPDATE location_ratings
                SET rating = $1
                WHERE location_id = $2 and username = $3
                RETURNING location_id AS "id", rating`,
        [rating, id, username]
      );
      const locationRating = result.rows[0];
      return locationRating;
    }

    /** Add a rating if it's not already rated by the user */
    const result = await db.query(
      `INSERT INTO location_ratings 
                (location_id,
                username,
                rating)
            VALUES ($1, $2, $3)
            RETURNING location_id AS "id", rating`,
      [id, username, rating]
    );
    const locationRating = result.rows[0];
    return locationRating;
  }

  /** Get ratings for a location. Return aggregate rating and
   * rating by a specific user. If there are no ratings, return messages
   * stating that.
   */
  static async getLocationRatings(id, username) {
    let userRating = "You haven't rated this location yet.";

    /** Get the aggregate rating for the location */
    let overallRating = await db.query(
      `SELECT AVG (rating)
            FROM location_ratings
            WHERE location_id = $1`,
      [id]
    );

    /** If there are no ratings yet, skip user rating and return messages
     * stating that there are no current ratings
     */
    if (overallRating.rows[0].avg === null) {
      overallRating = "No ratings yet.";
      return { userRating, overallRating };
    } else {
      overallRating = overallRating.rows[0].avg.slice(0, 4);
    }

    /** Get the rating made by the specific user */
    const result = await db.query(
      `SELECT rating
            FROM location_ratings
            WHERE location_id = $1
            AND username = $2`,
      [id, username]
    );
    if (result.rows[0]) {
      userRating = result.rows[0].rating;
    }
    return { userRating, overallRating };
  }
}

module.exports = Location;
