const express = require("express");
const jsonschema = require("jsonschema");
const Trip = require("../models/trip");
const router = new express.Router();
const tripSchema = require("../schemas/trip.json");
const tripLocationSchema = require("../schemas/tripLocation.json");
const tripRatingSchema = require("../schemas/tripRating.json");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/auth");

/** Route: POST /trips/:username/new_trip
 * Adds a new trip to the database
 */
router.post(
  "/:username/new_trip",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Validate the incoming trip against the defined schema
      const validator = jsonschema.validate(req.body.trip, tripSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }
      // Add the trip to the database and get the trip id
      const trip = await Trip.addTrip(req.params.username, req.body.trip);

      // Add each location from the trip into the trip_locations table in the database
      let tripLocations = [];
      for (let i = 0; i < req.body.locations.length; i++) {
        const location = req.body.locations[i].location;
        const position = i;
        const newLocation = { id: trip.id, location, position };
        const locValidator = jsonschema.validate(
          newLocation,
          tripLocationSchema
        );
        if (!locValidator.valid) {
          const errs = validator.errors.map((e) => e.stack);
          throw new BadRequestError(errs);
        }
        const addedLocation = await Trip.addTripLocation(
          trip.id,
          location,
          position
        );
        tripLocations.push(addedLocation);
      }

      // Return the new trip and array of locations for the trip
      return res.status(201).json({ trip, tripLocations });
    } catch (err) {
      return next(err);
    }
  }
);

/** Route: GET /trips/:username/trips
 * Retrieves all trips created by the logged-in user
 */
router.get(
  "/:username/trips",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Retrieve and send all trips created by the logged-in user
      const trips = await Trip.getUserTrips(req.params.username);
      return res.json(trips);
    } catch (err) {
      return next(err);
    }
  }
);

/** Route: GET /trips/recent_trips
 * Retrieves the last 20 trips entered into the database by any user
 */
router.get("/recent_trips", async function (req, res, next) {
  try {
    // Retrieve and send the 20 most recent trips from the database
    const trips = await Trip.getRecentTrips();
    return res.json(trips);
  } catch (err) {
    return next(err);
  }
});

/** Route: PATCH /trips/:username/:trip_id/rate
 * Updates the rating for a trip. Only the trip's creator can rate the trip.
 */
router.patch(
  "/:username/:trip_id/rate",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Validate the incoming rating against the defined schema
      const validator = jsonschema.validate(req.body.trip, tripRatingSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }
      // Update the rating for the trip and send the result
      const result = await Trip.rateTrip(
        req.params.trip_id,
        req.params.username,
        req.body.rating
      );
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

/** Route: DELETE /trips/:username/:trip_id/delete
 * Removes a trip from the database. Must be the trip's creator.
 */
router.delete(
  "/:username/:trip_id/delete",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Delete the specified trip from the database and send the result
      const result = await Trip.deleteTrip(req.params.trip_id);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
