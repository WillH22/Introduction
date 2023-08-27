

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");
const usersRoutes = require("./routes/users");
const locationRoutes = require("./routes/locations");
const tripRoutes = require("./routes/trips");

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Authenticate JWT for protected routes
app.use(authenticateJWT);

// Routes for handling users-related endpoints
app.use("/users", usersRoutes);

// Routes for handling locations-related endpoints
app.use("/locations", locationRoutes);

// Routes for handling trips-related endpoints
app.use("/trips", tripRoutes);

// Middleware to handle 404 Not Found errors
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Middleware to handle errors
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;


//Suggestions:

  //1.  Ensure that you have defined the NotFoundError class or relevant error handling mechanisms, as they are referenced in your code.
