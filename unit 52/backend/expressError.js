// Custom error class that extends the built-in Error class
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message; // Set the error message
    this.status = status; // Set the HTTP status code
  }
}

/** 404 NOT FOUND error. */
class NotFoundError extends ExpressError {
  constructor(message = "Not Found") {
    super(message, 404); // Call the parent class constructor with the message and status
  }
}

/** 401 UNAUTHORIZED error. */
class UnauthorizedError extends ExpressError {
  constructor(message = "Unauthorized") {
    super(message, 401); // Call the parent class constructor with the message and status
  }
}

/** 400 BAD REQUEST error. */
class BadRequestError extends ExpressError {
  constructor(message = "Bad Request") {
    super(message, 400); // Call the parent class constructor with the message and status
  }
}

/** 403 FORBIDDEN error. */
class ForbiddenError extends ExpressError {
  constructor(message = "Forbidden") {
    super(message, 403); // Call the parent class constructor with the message and status
  }
}

// Export all the custom error classes for use in other modules
module.exports = {
  ExpressError,
  NotFoundError,
  UnauthorizedError,
  BadRequestError,
  ForbiddenError,
};
