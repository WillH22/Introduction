const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("./config");
const { BadRequestError } = require("./expressError");

/** Creates token using JWT */
function createToken(user) {
  // Create a payload containing user-specific information
  let payload = {
    username: user.username,
    zipCode: user.zipCode,
    country: user.country,
  };

  // Sign the payload with the SECRET_KEY to generate a token
  return jwt.sign(payload, SECRET_KEY);
}

/** Creates SQL query for updating info when not all info is likely to
 * be updated.
 */
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");

  // Map the keys to SQL column names and generate the SET clause
  const cols = keys.map(
    (colName, idx) => `"${jsToSql[colName] || colName}"=$${idx + 1}`
  );

  return {
    setCols: cols.join(", "), // Comma-separated list of columns to update
    values: Object.values(dataToUpdate), // Values corresponding to the columns
  };
}

// Export the functions for use in other modules
module.exports = { createToken, sqlForPartialUpdate };
