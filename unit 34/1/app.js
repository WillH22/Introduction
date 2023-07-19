const express = require("express");
const app = express();

class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}

// Middleware to validate 'nums' parameter in the query
function validateNums(req, res, next) {
  const nums = req.query.nums;
  if (!nums) {
    throw new ExpressError("nums are required", 400);
  }
  const numbers = nums.split(",").map(Number);
  if (numbers.some(isNaN)) {
    throw new ExpressError(`${nums} contains non-numeric values`, 400);
  }
  req.numbers = numbers;
  next();
}

// Route to calculate the mean of the numbers
app.get("/mean", validateNums, function (req, res, next) {
  const total = req.numbers.reduce((acc, num) => acc + num, 0);
  const avg = (total / req.numbers.length).toString();
  return res.send(avg);
});

// Route to calculate the median of the numbers
app.get("/median", validateNums, function (req, res, next) {
  const sorted = req.numbers.sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median =
    sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
  return res.send(median.toString());
});

// Route to calculate the mode of the numbers
app.get("/mode", validateNums, function (req, res, next) {
  const count = {};
  let maxCount = 0;
  let mode = [];

  req.numbers.forEach((num) => {
    count[num] = (count[num] || 0) + 1;
    if (count[num] > maxCount) {
      maxCount = count[num];
    }
  });

  for (let num in count) {
    if (count[num] === maxCount) {
      mode.push(num);
    }
  }

  return res.send(mode);
});

// Error handling middleware
app.use(function (err, req, res, next) {
  let status = err.status || 500;
  let message = err.message;
  return res.status(status).json({ error: { message, status } });
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("App on port 3000");
});
