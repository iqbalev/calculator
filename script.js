const display = document.getElementById("display");
const clearButton = document.getElementById("clear");
const deleteButton = document.getElementById("delete");
const numberButtons = document.querySelectorAll(".number");
const dotButton = document.getElementById("dot");
const mathOperatorButtons = document.querySelectorAll(".operator");
const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const divideButton = document.getElementById("divide");
const multiplyButton = document.getElementById("multiply");
const equalsButton = document.getElementById("equals");

let result = "";
let selectedOperator = "";
let firstInput = "";
let secondInput = "";
let isOperatorSelected = false;
let isResultGenerated = false;

numberButtons.forEach((number) => {
  number.addEventListener("click", () => {
    if (isResultGenerated && !isOperatorSelected) {
      firstInput = "";
    }

    isResultGenerated = false;

    if (!isOperatorSelected) {
      firstInput += number.textContent;
      display.textContent = firstInput;
    } else {
      secondInput += number.textContent;
      display.textContent = secondInput;
    }
  });
});

dotButton.addEventListener("click", () => {
  if (!isOperatorSelected && !firstInput.includes(".")) {
    firstInput += dotButton.textContent;
    display.textContent = firstInput;
    console.log(firstInput);
  } else if (isOperatorSelected && !secondInput.includes(".")) {
    secondInput += dotButton.textContent;
    display.textContent = secondInput;
    console.log(secondInput);
  }
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
});

clearButton.addEventListener("click", () => clearResult());

deleteButton.addEventListener("click", () => deleteInput());

const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => {
  if (y === 0) {
    alert("Number cannot be divided by zero.");
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

const calculateResult = () => {
  result = operate(
    selectedOperator,
    parseFloat(firstInput),
    parseFloat(secondInput)
  );

  display.textContent = result;

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
