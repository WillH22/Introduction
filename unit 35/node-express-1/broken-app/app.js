const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json()); // Middleware to parse JSON in the request body

app.post("/", async function (req, res, next) {
  try {
    const results = await Promise.all(
      req.body.developers.map(async (d) => {
        return await axios.get(`https://api.github.com/users/${d}`);
      })
    );

    const out = results.map((r) => ({ name: r.data.name, bio: r.data.bio }));
    return res.json(out); // Use res.json() to send JSON response
  } catch (err) {
    next(err); // Pass the actual error object
  }
});

app.listen(3000);
