const add = (x, y) => {
  return x + y;
};

const substract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  if (y === 0) {
    alert("Cannot divided by zero.");
  }

  return x / y;
};

const operate = (firstNumber, mathOperator, secondNumber) => {
  switch (mathOperator) {
    case "+":
      return add(firstNumber, secondNumber);
    case "-":
      return substract(firstNumber, secondNumber);
    case "*":
      return multiply(firstNumber, secondNumber);
    case "/":
      return divide(firstNumber, secondNumber);
    default:
      alert("You cannot do that!");
  }
};

console.log(operate(100, "*", 10));
