// LIST OF VARIABLES
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll(".number");
const dotButton = document.getElementById("dot");
const mathOperatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");

let result = "";
let selectedOperator = "";
let firstInput = "";
let secondInput = "";
let isOperatorSelected = false;
let isResultGenerated = false;
const maximumNumberOfInputCharacters = 11;

// LIST OF FUNCTIONS
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => (y === 0 ? "Error" : x / y);
const operate = (mathOperator, firstNumber, secondNumber) => {
  switch (mathOperator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "−":
      return subtract(firstNumber, secondNumber);
    case "×":
      return multiply(firstNumber, secondNumber);
    case "÷":
      return divide(firstNumber, secondNumber);
    default:
      return "Invalid operation";
  }
};

const calculateResult = () => {
  result = operate(
    selectedOperator,
    parseFloat(firstInput),
    parseFloat(secondInput)
  );

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

const clearResult = () => {
  result = "";
  selectedOperator = "";
  firstInput = "";
  secondInput = "";
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

// LIST OF EVENT LISTENERS
numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    if (isResultGenerated && !isOperatorSelected) {
      firstInput = "";
    }
    isResultGenerated = false;

    if (!isOperatorSelected) {
      if (firstInput.length < maximumNumberOfInputCharacters) {
        firstInput += number.textContent;
        display.textContent = firstInput;
      }
    } else {
      if (secondInput.length < maximumNumberOfInputCharacters) {
        secondInput += number.textContent;
        display.textContent = secondInput;
      }
    }
  });
});

dotButton.addEventListener("click", () => {
  if (!isOperatorSelected && !firstInput.includes(".")) {
    firstInput += dotButton.textContent;
    display.textContent = firstInput;
  } else if (isOperatorSelected && !secondInput.includes(".")) {
    secondInput += dotButton.textContent;
    display.textContent = secondInput;
  }
});

mathOperatorButtons.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (!isOperatorSelected || isResultGenerated) {
      isOperatorSelected = true;
      selectedOperator = operator.textContent;
      isResultGenerated = false;
    }
  });
});

equalsButton.addEventListener("click", () => {
  if (isOperatorSelected && secondInput) {
    calculateResult();
  }
});

clearButton.addEventListener("click", () => clearResult());
deleteButton.addEventListener("click", () => deleteInput());
