const express = require("express");
const jsonschema = require("jsonschema");
const User = require("../models/user");
const router = new express.Router();
const registerSchema = require("../schemas/register.json");
const loginSchema = require("../schemas/login.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const { createToken } = require("../helpers");
const { BadRequestError } = require("../expressError");
const { ensureCorrectUser } = require("../middleware/auth");

/** Route: POST /auth/register
 * Registers a new user. Creates and returns a token.
 */
router.post("/register", async function (req, res, next) {
  try {
    // Validate the incoming registration data against the defined schema
    const validator = jsonschema.validate(req.body, registerSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    // Register the user and create a token for authentication
    const user = await User.register({ ...req.body });
    const token = createToken(user);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});

/** Route: POST /auth/login
 * Logs in a user. Creates a token and returns the token along with user info.
 */
router.post("/login", async function (req, res, next) {
  try {
    // Validate the incoming login data against the defined schema
    const validator = jsonschema.validate(req.body, loginSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    // Authenticate user, create a token, and return token along with user info
    const { username, password } = req.body;
    const user = await User.login(username, password);
    const location = { zipCode: user.zipCode, country: user.country };
    const token = createToken(user);
    const units = user.units;
    return res.json({ token, location, units });
  } catch (err) {
    return next(err);
  }
});

/** Route: GET /auth/:username
 * Retrieves information about the logged-in user.
 */
router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    // Retrieve and send user information for the logged-in user
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** Route: PATCH /auth/:username
 * Updates information for the logged-in user.
 */
router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    // Validate the incoming user update data against the defined schema
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }
    // Update user information and send the updated user information
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
