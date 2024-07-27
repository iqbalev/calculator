// LIST OF VARIABLES
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll(".number");
const dotButton = document.getElementById("dot");
const mathOperatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
let result = "";
let firstInput = "";
let secondInput = "";
let selectedOperator = "";
let isOperatorSelected = false;
let isResultGenerated = false;
const maximumNumberOfInputCharacters = 11;

// LIST OF FUNCTIONS
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y === 0 ? "Error" : x / y);

const operate = (operator, firstNumber, secondNumber) => {
  switch (operator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "−":
    case "-":
      return subtract(firstNumber, secondNumber);
    case "×":
    case "*":
      return multiply(firstNumber, secondNumber);
    case "÷":
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      return "Invalid operation";
  }
};

const clearResult = () => {
  result = "";
  firstInput = "";
  secondInput = "";
  selectedOperator = "";
  isOperatorSelected = false;
  isResultGenerated = false;
  display.textContent = 0;
};

const deleteInput = () => {
  if (!isOperatorSelected) {
    firstInput = firstInput.slice(0, -1);
    display.textContent = firstInput || 0;
  } else {
    secondInput = secondInput.slice(0, -1);
    display.textContent = secondInput || 0;
  }
};

const inputKeyPress = (event) => {
  const key = event.key;
  switch (key) {
    case "Escape":
      return clearResult();
    case "Backspace":
      return deleteInput();
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      return inputNumber(key);
    case ".":
      return inputDot();
    case "+":
    case "-":
    case "*":
    case "/":
      return inputOperator(key);
    case "Enter":
    case "=":
      return calculateResult();
    default:
      break;
  }
};

const inputNumber = (number) => {
  if (isResultGenerated && !isOperatorSelected) {
    firstInput = "";
  }
  isResultGenerated = false;

  if (!isOperatorSelected) {
    if (firstInput.length < maximumNumberOfInputCharacters) {
      firstInput += number;
      display.textContent = firstInput;
    }
  } else {
    if (secondInput.length < maximumNumberOfInputCharacters) {
      secondInput += number;
      display.textContent = secondInput;
    }
  }
};

const inputDot = () => {
  if (!isOperatorSelected && !firstInput.includes(".")) {
    firstInput += dotButton.textContent;
    display.textContent = firstInput;
  } else if (isOperatorSelected && !secondInput.includes(".")) {
    secondInput += dotButton.textContent;
    display.textContent = secondInput;
  }
};

const inputOperator = (operator) => {
  if (!isOperatorSelected || isResultGenerated) {
    isOperatorSelected = true;
    selectedOperator = operator;
    isResultGenerated = false;
  }
};

const calculateResult = () => {
  if (isOperatorSelected && secondInput) {
    result = operate(
      selectedOperator,
      parseFloat(firstInput),
      parseFloat(secondInput)
    );
  }

  if (result === "Error") {
    display.textContent = "ERROR";
  } else {
    display.textContent = Number.isInteger(result) ? result : result.toFixed(1);
  }

  // Final result will be used as first input, so it can be used for next calculation
  firstInput = result.toString();
  secondInput = "";
  selectedOperator = "";
  isOperatorSelected = false;
  isResultGenerated = true;
};

// LIST OF EVENT LISTENERS
document.addEventListener("keydown", inputKeyPress);
clearButton.addEventListener("click", () => clearResult());
deleteButton.addEventListener("click", () => deleteInput());
numberButtons.forEach((number) =>
  number.addEventListener("click", () => inputNumber(number.textContent))
);

dotButton.addEventListener("click", () => inputDot());
mathOperatorButtons.forEach((operator) =>
  operator.addEventListener("click", () => inputOperator(operator.textContent))
);

equalsButton.addEventListener("click", () => calculateResult());
