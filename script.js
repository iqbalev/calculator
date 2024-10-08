// LIST OF VARIABLES
const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll(".number");
const dotButton = document.getElementById("dot");
const mathOperatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.getElementById("equals");
let result = "";
let firstOperand = "";
let secondOperand = "";
let currentOperator = "";
let isOperatorSelected = false;
let isResultGenerated = false;
const maximumDigits = 9;

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
  firstOperand = "";
  secondOperand = "";
  currentOperator = "";
  isOperatorSelected = false;
  isResultGenerated = false;
  display.textContent = 0;
};

const deleteNumber = () => {
  if (display.textContent.includes("e")) clearResult();

  if (!isOperatorSelected) {
    firstOperand = firstOperand.slice(0, -1);
    display.textContent = firstOperand || 0;
  } else {
    secondOperand = secondOperand.slice(0, -1);
    display.textContent = secondOperand || 0;
  }
};

const inputKeyPress = (event) => {
  const key = event.key;

  if (key === "Escape") {
    clearResult();
  } else if (key === "Backspace") {
    deleteNumber();
  } else if (!isNaN(key)) {
    inputNumber(key);
  } else if (key === ".") {
    inputDot();
  } else if (["+", "-", "*", "/"].includes(key)) {
    inputOperator(key);
  } else if (key === "Enter" || key === "=") {
    calculateResult();
  }
};

const inputNumber = (number) => {
  if (isResultGenerated && !isOperatorSelected) firstOperand = "";
  isResultGenerated = false;

  if (!isOperatorSelected) {
    if (firstOperand.length < maximumDigits) {
      firstOperand === "0" ? (firstOperand = number) : (firstOperand += number);
      display.textContent = firstOperand;
    }
  } else {
    if (secondOperand.length < maximumDigits) {
      secondOperand === "0"
        ? (secondOperand = number)
        : (secondOperand += number);
      display.textContent = secondOperand;
    }
  }
};

const inputDot = () => {
  if (!isOperatorSelected) {
    if (firstOperand === "") {
      firstOperand = "0";
    }
    if (!firstOperand.includes(".")) {
      firstOperand += dotButton.textContent;
      display.textContent = firstOperand;
    }
  } else {
    if (secondOperand === "") {
      secondOperand = "0";
    }
    if (!secondOperand.includes(".")) {
      secondOperand += dotButton.textContent;
      display.textContent = secondOperand;
    }
  }
};

const inputOperator = (operator) => {
  if (firstOperand && secondOperand) {
    calculateResult();
    firstOperand = result.toString();
    secondOperand = "";
  }

  isOperatorSelected = true;
  currentOperator = operator;
  isResultGenerated = false;
};

const calculateResult = () => {
  if (!isOperatorSelected && secondOperand === "") return;

  if (secondOperand === "") {
    secondOperand = firstOperand;

    result = operate(
      currentOperator,
      parseFloat(firstOperand),
      parseFloat(secondOperand)
    );
  }

  result = operate(
    currentOperator,
    parseFloat(firstOperand),
    parseFloat(secondOperand)
  );

  if (result === "Error") {
    display.textContent = "Error";
  } else {
    // This will make a result with long numbers do not overflow outside the display container, because it will cut some decimals or convert the result to scientific notation if needed
    const resultString = result.toString();
    if (resultString.length > maximumDigits) {
      result = result.toPrecision(4);
      display.textContent = result;
    } else {
      display.textContent = result;
    }
  }

  // Final result will be used as first input, so it can be used for next calculation
  firstOperand = result.toString();
  secondOperand = "";
  currentOperator = "";
  isOperatorSelected = false;
  isResultGenerated = true;
};

// LIST OF EVENT LISTENERS
document.addEventListener("keydown", (e) => {
  e.preventDefault();
  inputKeyPress(e);
});

clearButton.addEventListener("click", () => clearResult());
deleteButton.addEventListener("click", () => deleteNumber());
numberButtons.forEach((number) =>
  number.addEventListener("click", () => inputNumber(number.textContent))
);

dotButton.addEventListener("click", () => inputDot());
mathOperatorButtons.forEach((operator) =>
  operator.addEventListener("click", () => inputOperator(operator.textContent))
);

equalsButton.addEventListener("click", () => calculateResult());
