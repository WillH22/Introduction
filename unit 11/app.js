window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +document.getElementById("loan-amount").value,
    years: +document.getElementById("loan-years").value,
    rate: +document.getElementById("loan-rate").value,
  };
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const defaultV = { amount: 12420, years: 10, rate: 5 };
  let defAmount = document.querySelector("#loan-amount");
  let defYears = document.querySelector("#loan-years");
  let defRate = document.querySelector("#loan-rate");

  defAmount.value = defaultV.amount;
  defYears.value = defaultV.years;
  defRate.value = defaultV.rate;

  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  const currentVals = getCurrentUIValues();
  updateMonthly(calculateMonthlyPayment(currentVals));
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  const interestRate = (values.rate * 0.01) / 12;
  const n = values.years * 12;

  return (
    (values.amount * interestRate) /
    (1 - Math.pow(1 + interestRate, -n))
  ).toFixed(2);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let monthlyVal = document.querySelector("#monthly-payment");
  monthlyVal.innerText = monthly;
}
