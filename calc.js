const creditForm = document.querySelector(".calc-form");

// powiadomienia formularza
const validMessPerSec = document.querySelector("#valid-mess-sec");
const validMessNumb = document.querySelector("#valid-mess-numb");
const succesInfo = document.querySelector("#calc-mess");

// wartości po wyliczeniu
const result = document.querySelector(".calc-result");
const paramValue = document.querySelector("#credit-value");
const paramPerc = document.querySelector("#credit-perc");
const paramPerdiod = document.querySelector("#credit-period");

// wartości stałe w kredycie
const creditInterest = 7.14;
const wspW = 7.14;

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
  validMessNumb.classList.remove("calc-mess-visible");
  validMessPerSec.classList.remove("calc-mess-visible");

  paramValue.textContent = 0 + " PLN";
  paramPerc.textContent = 0 + " %";
  paramPerdiod.textContent = 0;
  result.textContent = 0;

  const form = e.target;
  const creditValue = form.elements.value.value;
  const creditYearPer = form.elements.year.value;
  const credit2 = form.elements.credit2.checked;

  // ----------------------------------------------------------------
  //   VALIDATION
  // ----------------------------------------------------------------
  if (Number.isNaN(Number(creditValue)) || creditValue === "") {
    validMessNumb.classList.add("calc-mess-visible");
    return;
  } else if (Number.isNaN(Number(creditYearPer))) {
    validMessNumb.classList.add("calc-mess-visible");
    return;
  }

  if (creditYearPer === "") {
    validMessPerSec.classList.add("calc-mess-visible");
    return;
  }

  // ----------------------------------------------------------------
  //   WYLICZENIE RATY
  // ----------------------------------------------------------------
  const formattedValue = Number(creditValue)
    .toLocaleString(undefined, {
      useGrouping: true,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
    .replace(",", " ");

  const creditPeriod = Number(creditYearPer) * 12;

  if (!credit2) {
    const ir = Number(creditInterest) / 100 / 12;

    const pmt = PMT(ir, creditPeriod, Number(creditValue)).toFixed(2);
    if (!Number.isNaN(Number(pmt))) {
      const roundResult = Math.round(pmt);
      const formattedResult = Math.abs(roundResult)
        .toLocaleString(undefined, {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        .replace(",", " ");

      result.textContent = formattedResult;
    } else {
      result.textContent = 0;
    }

    paramValue.textContent = formattedValue + " zł";
    paramPerc.textContent = creditInterest + " %";
    paramPerdiod.textContent = creditYearPer;
  } else {
    const ir = creditInterest / 100;
    const wsp = (wspW - 2) / 100;

    const rataKapit = Number(creditValue) / creditPeriod;
    const odsetkiNom = (Number(creditValue) * ir) / 12;
    const doplata = (Number(creditValue) * wsp) / 12;
    const result2 = rataKapit + (odsetkiNom - doplata);

    if (!Number.isNaN(Number(result2))) {
      const roundResult = Math.round(result2);
      const formattedResult = Math.abs(roundResult)
        .toLocaleString(undefined, {
          useGrouping: true,
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        })
        .replace(",", " ");

      result.textContent = formattedResult;
    } else {
      result.textContent = 0;
    }

    paramValue.textContent = formattedValue + " zł";
    paramPerc.textContent = "2 %";
    paramPerdiod.textContent = creditYearPer;
  }

  succesInfo.classList.add("calc-mess-visible");

  form.reset();
};

creditForm.addEventListener("submit", handleSubmit);
