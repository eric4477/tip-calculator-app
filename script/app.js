const billInput = document.querySelector(".bill-input");
const customInput = document.querySelector(".custom-input");
const peopleInput = document.querySelector(".people-input");
const inputAlert = document.querySelector(".people-input-check");
let tipBtns = document.querySelectorAll(".tip-button");
const totalPerPersonEl = document.querySelector(".total-per-person");
const tipPerPersonEl = document.querySelector(".tip-per-person");
const rstBtn = document.querySelector(".reset-button");

//variables

let peopleInputValue = 0;
let billInputValue = 0;
let totalPerPerson = 0;
let tipAmountPerPerson = 0;
let tipPercent = 0;

//functions

function setBillValue() {
  if (billInput.value.length > 9) {
    billInput.value = billInput.value.substr(0, 9);
  } else {
    billInputValue = parseFloat(billInput.value);
    calcTipAmount();
    calcTotalPerPerson();
  }
}

function setPeopleValue() {
  if (peopleInput.value.length > 10) {
    peopleInput.value = peopleInput.value.substr(0, 10);
  } else {
    peopleInputValue = parseInt(peopleInput.value);
    checkPeopleInput();
    calcTipAmount();
    calcTotalPerPerson();
  }
}

function checkPeopleInput() {
  if (Number(peopleInput.value <= 0)) {
    inputAlert.classList.remove("hidden");
    totalPerPerson = 0;
    totalPerPersonEl.textContent = "0.00";
    peopleInput.style.outlineColor = "rgb(218, 62, 62)";
  } else {
    inputAlert.classList.add("hidden");
    peopleInput.style.outlineColor = "hsl(172, 67%, 45%)";
  }
}

function removeActiveBtns() {
  tipBtns.forEach((tipBtn) => {
    tipBtn.classList.remove("active-btn");
  });
}

function getBtnTipAmount(e) {
  tipPercent = parseFloat(e.target.textContent) / 100;
  removeActiveBtns();
  e.target.classList.add("active-btn");
  calcTipAmount();
  calcTotalPerPerson();
}

function getCustomTip() {
  removeActiveBtns();
  if (Number(this.value) > 100) {
    this.value = this.value.substr(0, 2);
  } else if (this.value > 0) {
    tipPercent = parseFloat(this.value) / 100;
    calcTipAmount();
    calcTotalPerPerson();
  } else {
    tipPerPersonEl.textContent = "0.00";
    totalPerPersonEl.textContent = "0.00";
  }
}
function calcTipAmount() {
  if (billInputValue > 0 && peopleInputValue > 0) {
    tipAmountPerPerson = parseFloat(
      (tipPercent / peopleInputValue) * billInputValue
    );
    tipAmountPerPerson = tipAmountPerPerson.toFixed(2);
    tipPerPersonEl.textContent = tipAmountPerPerson;
  } else {
    tipPerPersonEl.textContent = "0.00";
  }
}
function calcTotalPerPerson() {
  if (billInputValue > 0 && peopleInputValue > 0) {
    totalPerPerson = billInputValue / peopleInputValue;
    totalPerPerson =
      parseFloat(totalPerPerson) + parseFloat(tipAmountPerPerson);
    totalPerPerson = totalPerPerson.toFixed(2);
    totalPerPersonEl.textContent = totalPerPerson;
  } else {
    totalPerPersonEl.textContent = "0.00";
  }
}

function reset() {
  removeActiveBtns();
  peopleInputValue = 0;
  billInputValue = 0;
  totalPerPerson = 0;
  tipAmountPerPerson = 0;
  tipPercent = 0;
  totalPerPersonEl.textContent = "0.00";
  tipPerPersonEl.textContent = "0.00";
  peopleInput.value = null;
  billInput.value = null;
  customInput.value = null;
  peopleInput.style.outlineColor = "hsl(172, 67%, 45%)";
  inputAlert.classList.add("hidden");
}

// event listeners

billInput.addEventListener("input", setBillValue);
peopleInput.addEventListener("input", setPeopleValue);
customInput.addEventListener("input", getCustomTip);
rstBtn.addEventListener("click", reset);
tipBtns.forEach((tipBtn) => {
  tipBtn.addEventListener("click", getBtnTipAmount);
});
