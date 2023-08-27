const express = require("express");
const jsonschema = require("jsonschema");
const Location = require("../models/location");
const router = new express.Router();
const locationSchema = require("../schemas/location.json");
const locationRatingSchema = require("../schemas/locationRating.json");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/auth");

/** Route: POST /locations/new_location
 * Puts new location info into the database
 */
router.post("/new_location", async function (req, res, next) {
  try {
    // Validate the incoming request body against the defined schema
    const validator = jsonschema.validate(req.body, locationSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    // Add the location to the database and send a 201 Created response
    const location = await Location.addLocation(req.body);
    return res.status(201).json(location);
  } catch (err) {
    return next(err);
  }
});

/** Route: PATCH /locations/rating/:username
 * Updates a location's rating. User must be logged in correctly.
 */
router.patch(
  "/rating/:username",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Validate the incoming request body against the defined schema
      const validator = jsonschema.validate(req.body, locationRatingSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }
      // Update the location's rating and send the updated rating as response
      const rating = await Location.rateLocation(req.body);
      return res.json(rating);
    } catch (err) {
      return next(err);
    }
  }
);

/** Route: GET /locations/:location/:username
 * Retrieve the rating given for a location by the currently
 * logged in user
 */
router.get(
  "/:location/:username",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      // Retrieve and send the ratings for a location by the logged-in user
      const ratings = await Location.getLocationRatings(
        req.params.location,
        req.params.username
      );
      return res.json(ratings);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
