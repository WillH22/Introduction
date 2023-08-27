// Load environment variables from the .env file
require("dotenv").config();
// Add color styling to console logs
require("colors");

// Secret key for JWT authentication
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

// Port to run the server on
const PORT = +process.env.PORT || 3001;

// Determine the database URI based on environment
function getDatabaseUri() {
  // If in test environment, use the test database
  return process.env.NODE_ENV === "test"
    ? "weTrip_test"
    : // Otherwise, use the specified DATABASE_URL or default to "weTrip"
      process.env.DATABASE_URL || "weTrip";
}

// Set bcrypt work factor for password hashing
// Use a lower work factor during tests to speed up execution
const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 12;

// Display configuration details in the console
console.log("WeTrip Config:".green);
console.log("SECRET_KEY:".yellow, SECRET_KEY);
console.log("PORT:".yellow, PORT.toString());
console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
console.log("Database:".yellow, getDatabaseUri());
console.log("---");

// Export configuration variables for use in other modules
module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
