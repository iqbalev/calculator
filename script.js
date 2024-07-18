const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const numberButtons = document.querySelectorAll(".number");
const mathOperatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const substractButton = document.getElementById("substract");
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
    } else if (operator === substractButton) {
      selectedOperator = "-";
    } else if (operator === multiplyButton) {
      selectedOperator = "x";
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

const add = (x, y) => x + y;
const substract = (x, y) => x - y;
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
      return add(firstNumber), secondNumber;
    case "-":
      return substract(firstNumber, secondNumber);
    case "x":
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

  display.textContent = 0;
};
