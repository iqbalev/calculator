const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll(".number");
const mathOperatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const equalsButton = document.getElementById("equals");

let finalResult = "";
let selectedOperator = "";
let firstInput = "";
let secondInput = "";
let isOperatorSelected = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    if (isOperatorSelected === false) {
      firstInput += number.textContent;
      display.textContent = firstInput;
    } else if (isOperatorSelected === true) {
      secondInput += number.textContent;
      display.textContent = secondInput;
    }
  });
});

mathOperatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    isOperatorSelected = true;
    if (operator === addButton) {
      selectedOperator = "+";
    } else if (operator === subtractButton) {
      selectedOperator = "-";
    } else if (operator === multiplyButton) {
      selectedOperator = "*";
    } else if (operator === divideButton) {
      selectedOperator = "/";
    }
  });
});

equalsButton.addEventListener("click", () => {
  calculateResult();
  displayResult();
});

clearButton.addEventListener("click", () => clearDisplay());

deleteButton.addEventListener("click", () => deleteInput());

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => {
  if (y === 0) {
    alert("Cannot divided by zero.");
  }
  return x / y;
};

const operate = (mathOperator, firstNumber, secondNumber) => {
  switch (mathOperator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return subtract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      alert("You cannot do that!");
  }
};

const calculateResult = () =>
  (finalResult = operate(selectedOperator, firstInput, secondInput));

const displayResult = () => (display.textContent = finalResult);

const clearDisplay = () => {
  finalResult = "";
  selectedOperator = "";
  firstInput = "";
  secondInput = "";
  isOperatorSelected = false;

  display.textContent = 0;
};

const deleteInput = () => {
  if (isOperatorSelected === false) {
    firstInput = firstInput.slice(0, -1);
    display.textContent = firstInput || 0;
  } else if (isOperatorSelected === true) {
    secondInput = secondInput.slice(0, -1);
    display.textContent = secondInput || 0;
  }
};
