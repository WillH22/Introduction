const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");

/** Middleware that checks for a valid token in the authorization header.
 * If a token is present, decodes it and stores the user information in res.locals.
 */
function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;
    if (authHeader) {
      // Extract the token from the "Bearer" header
      const token = authHeader.replace(/^[Bb]earer /, "").trim();

      // Verify the token using the SECRET_KEY and store the user information in res.locals
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware that checks if the user stored in res.locals matches the user in the request parameters.
 * If the users match, the next middleware is called. Otherwise, an UnauthorizedError is thrown.
 */
function ensureCorrectUser(req, res, next) {
  try {
    if (!res.locals.user) throw new UnauthorizedError();
    if (res.locals.user.username === req.params.username) {
      return next();
    } else {
      throw new UnauthorizedError();
    }
  } catch (err) {
    return next(err);
  }
}

// Export the middleware functions for use in other modules
module.exports = { authenticateJWT, ensureCorrectUser };
