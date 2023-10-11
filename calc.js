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

const handleSubmit = (e) => {
  e.preventDefault();
  succesInfo.classList.remove("calc-mess-visible");
  const form = e.target;
  const creditValue = form.elements.value.value;
  const creditInterest = form.elements.interest.value;
  const creditMonthPer = form.elements.month.value;
  const creditYearPer = form.elements.year.value;

  // ----------------------------------------------------------------
  //   VALIDATION
  // ----------------------------------------------------------------
  if (Number.isNaN(Number(creditValue))) {
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

  if (Number.isNaN(Number(creditInterest))) {
    validMessPerc.classList.add("calc-mess-visible");
    return;
  } else {
    validMessPerc.classList.remove("calc-mess-visible");
  }

  // ----------------------------------------------------------------
  //   WYLICZENIE RATY
  // ----------------------------------------------------------------
  let creditPeriod = Number(creditMonthPer);
  if (creditMonthPer === "") {
    creditPeriod = Number(creditYearPer) * 12;
  }

  paramValue.textContent = creditValue + " PLN";
  paramPerc.textContent = creditInterest + " %";
  paramPerdiod.textContent = creditPeriod;
  succesInfo.classList.add("calc-mess-visible");
  form.reset();
};

creditForm.addEventListener("submit", handleSubmit);
