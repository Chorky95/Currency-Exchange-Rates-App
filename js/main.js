"use strict";

const form = document.querySelector(".entry");
const amount = document.querySelector(".entry__amount");
const baseCurrency = document.querySelector(".entry__base");
const targetCurrency = document.querySelector(".entry__target");

const apiKey = "569b1b389ae57352e134d0ba66972669";
const url = `http://data.fixer.io/api/latest?access_key=${apiKey}`;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let inputVal = Number(amount.value);
  if (!inputVal) {
    inputVal = 1;
  }
  let inputCurr = baseCurrency.value.toUpperCase();
  let targetCurr = targetCurrency.value.toUpperCase();
  let data;
  console.log(inputVal, typeof inputVal);
  console.log(inputCurr, typeof inputCurr);
  console.log(targetCurr, typeof targetCurr);

  async function apiCall() {
    let response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();

    let convertedValue;
    if (inputCurr === "EUR") {
      convertedValue = inputVal * data.rates[targetCurr];
    }

    if (targetCurr === "EUR") {
      convertedValue = inputVal / data.rates[inputCurr];
    }

    if (inputCurr !== "EUR" && targetCurr !== "EUR") {
      let inputEuro = inputVal / data.rates[inputCurr];
      convertedValue = inputEuro * data.rates[targetCurr];
    }

    console.log(convertedValue);

    function showResults() {
      document.getElementById(
        "conversion-results"
      ).innerHTML = `<div class="output">
        <h2 class="output__entered">${inputVal} ${inputCurr}</h2>
        <h2 class="output__equal-sign"><i class="fas fa-equals"></i></h2>
        <h2 class="output__converted">${convertedValue.toFixed(
          2
        )} ${targetCurr}</h2>
      </div>`;
    }

    showResults();
  }

  apiCall();
  form.reset();
  amount.focus();
});
