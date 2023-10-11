const creditForm = document.querySelector(".calc-form");

// powiadomienia formularza
const validMessPer = document.querySelector("#valid-mess");
const validMessPerSec = document.querySelector("#valid-mess-sec");
const validMessPerc = document.querySelector("#valid-mess-perc");
const validMessNumb = document.querySelector("#valid-mess-numb");
const succesInfo = document.querySelector("#calc-mess");

// wartości po wyliczeniu
const result = document.querySelector(".calc-result");
const paramValue = document.querySelector("#credit-value");
const paramPerc = document.querySelector("#credit-perc");
const paramPerdiod = document.querySelector("#credit-period");

// funckja wyliczająca ratę
function PMT(ir, np, pv, fv, type) {
  /*
   * ir   - interest rate per month
   * np   - number of periods (months)
   * pv   - present value
   * fv   - future value
   * type - when the payments are due:
   *        0: end of the period, e.g. end of month (default)
   *        1: beginning of period
   */
  var pmt, pvif;

  fv || (fv = 0);
  type || (type = 0);

  if (ir === 0) return -(pv + fv) / np;

  pvif = Math.pow(1 + ir, np);
  pmt = (-ir * (pv * pvif + fv)) / (pvif - 1);

  if (type === 1) pmt /= 1 + ir;

  return pmt;
}

const handleSubmit = (e) => {
  e.preventDefault();
  succesInfo.classList.remove("calc-mess-visible");
  paramValue.textContent = 0 + " PLN";
  paramPerc.textContent = 0 + " %";
  paramPerdiod.textContent = 0;
  result.textContent = 0;

  const form = e.target;
  const creditValue = form.elements.value.value;
  const creditInterest = form.elements.interest.value;
  const creditMonthPer = form.elements.month.value;
  const creditYearPer = form.elements.year.value;

  // ----------------------------------------------------------------
  //   VALIDATION
  // ----------------------------------------------------------------
  if (Number.isNaN(Number(creditValue)) || creditValue === "") {
    validMessNumb.classList.add("calc-mess-visible");
    return;
  } else if (Number.isNaN(Number(creditMonthPer))) {
    validMessNumb.classList.add("calc-mess-visible");
    return;
  } else if (Number.isNaN(Number(creditYearPer))) {
    validMessNumb.classList.add("calc-mess-visible");
    return;
  } else {
    validMessNumb.classList.remove("calc-mess-visible");
  }

  if (creditYearPer === "" && creditMonthPer === "") {
    validMessPerSec.classList.add("calc-mess-visible");
    return;
  } else {
    validMessPerSec.classList.remove("calc-mess-visible");
  }

  if (creditYearPer !== "" && creditMonthPer !== "") {
    validMessPer.classList.add("calc-mess-visible");
    return;
  } else {
    validMessPer.classList.remove("calc-mess-visible");
  }

  if (Number.isNaN(Number(creditInterest)) || creditInterest === "") {
    validMessPerc.classList.add("calc-mess-visible");
    return;
  } else {
    validMessPerc.classList.remove("calc-mess-visible");
  }

  // ----------------------------------------------------------------
  //   WYLICZENIE RATY
  // ----------------------------------------------------------------
  const formattedValue = Number(creditValue)
    .toLocaleString(undefined, {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", " ");

  let creditPeriod = Number(creditMonthPer);
  if (creditMonthPer === "") {
    creditPeriod = Number(creditYearPer) * 12;
  }

  const ir = Number(creditInterest) / 100 / 12;

  const pmt = PMT(ir, creditPeriod, Number(creditValue)).toFixed(2);
  const formattedResult = Math.abs(pmt)
    .toLocaleString(undefined, {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
    .replace(",", " ");

  paramValue.textContent = formattedValue + " PLN";
  paramPerc.textContent = creditInterest + " %";
  paramPerdiod.textContent = creditPeriod;
  result.textContent = formattedResult;

  succesInfo.classList.add("calc-mess-visible");

  form.reset();
};

creditForm.addEventListener("submit", handleSubmit);
