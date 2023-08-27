// Import the PostgreSQL Client from the pg library
const { Client } = require("pg");
// Import the getDatabaseUri function from the config module
const { getDatabaseUri } = require("./config");

// Create a new PostgreSQL client instance
const db = new Client({
  // Set the connection string using the database URI from the config
  connectionString: getDatabaseUri(),
  // Configure SSL options for secure connections
  ssl: {
    rejectUnauthorized: false, // Allow self-signed certificates for now
  },
});

// Connect to the PostgreSQL database using the configured client
db.connect();

// Export the connected database client for use in other modules
module.exports = db;
