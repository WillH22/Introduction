const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

class User {
  /** Creates a new user */
  static async register({
    username,
    password,
    email,
    zipCode,
    country,
    units,
  }) {
    /** Checks if the username is already taken. Throws an error if the username
     * already exists in the database
     */
    const isDuplicate = await db.query(
      `SELECT username
            FROM users
            WHERE username = $1`,
      [username]
    );
    if (isDuplicate.rows[0]) {
      throw new BadRequestError("Username already taken");
    }

    /** Hashes the password and enters the new user into the database */
    const hashedPwd = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
                    (username, 
                    hashed_pwd, 
                    email, 
                    zip_code,
                    country,
                    units) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING username, zip_code AS "zipCode", country, units`,
      [username, hashedPwd, email, zipCode, country, units]
    );

    const user = result.rows[0];
    return user;
  }

  /** Retrieves user information from the database to verify correct login
   * information
   */
  static async login(username, password) {
    const result = await db.query(
      `SELECT username, 
                    hashed_pwd AS "hashedPwd",
                    zip_code AS "zipCode",
                    country,
                    units
            FROM users 
            WHERE username = $1`,
      [username]
    );

    const user = result.rows[0];

    /** Checks the retrieved information and returns the user if the information is correct */
    if (user) {
      const isValid = await bcrypt.compare(password, user.hashedPwd);
      if (isValid === true) {
        delete user.hashedPwd;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Gets information on a single user */
  static async get(username) {
    const result = await db.query(
      `SELECT username,
                    zip_code AS "zipCode",
                    country,
                    email,
                    units
            FROM users
            WHERE username = $1`,
      [username]
    );

    let user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Updates information on a single user */
  static async update(username, data) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const { setCols, values } = sqlForPartialUpdate(data, {
      zipCode: "zip_code",
      password: "hashed_pwd",
    });
    const usernameVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE users 
                        SET ${setCols} 
                        WHERE username = ${usernameVarIdx} 
                        RETURNING username,
                                    zip_code AS "zipCode",
                                    country,
                                    email,
                                    units`;
    const result = await db.query(querySql, [...values, username]);
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    delete user.password;
    return user;
  }
}

module.exports = User;
