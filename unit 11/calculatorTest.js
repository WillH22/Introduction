it("should calculate the monthly rate correctly", function () {
  // ...
  const values = { amount: 98359, years: 64, rate: 23 };
  expect(calculateMonthlyPayment(values)).toEqual("1885.22");
});

it("should return a result with 2 decimal places", function () {
  // ..
  const values = { amount: 97235, years: 12, rate: 231 };
  expect(calculateMonthlyPayment(values)).toEqual("18717.74");
});

/// etc
