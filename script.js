/*
TO-DO's:
  - Re-enable typing in input field
  - Eraser functionality
  - Explore next steps with WinForms + WebView2
*/

var firstNumber = null;
var operationType = null;
var shouldReset = false; // is true if an operation is chosen/result is shown

function getDisplay() {
  return document.getElementById("display");
}

function clearDisplay() {
  var display = getDisplay();
  display.value = "0";
  firstNumber = null;
  operationType = null;
  shouldReset = false;
}

function pressDigit(digit) {
  var display = getDisplay();
  if (display.value == "0" || shouldReset) {
    display.value = digit;
    shouldReset = false;
  } else {
    display.value = display.value + digit;
  }
}

function pressDot() {
  var display = getDisplay();
  if (shouldReset) {
    display.value = "0.";
    shouldReset = false;
    return;
  }
  if (display.value.indexOf(".") == -1) {
    display.value = display.value + ".";
  }
}

function setOperation(nextOperation) {
  var display = getDisplay();
  firstNumber = parseFloat(display.value); // parses displayed value, remembers it as the first number
  operationType = nextOperation; // remembers the chosen operation
  shouldReset = true; // next digit starts a new number
}

function equals() {
  var display = getDisplay();

  if (operationType === null || firstNumber === null) {
    return;
  }

  var secondNumber = parseFloat(display.value);
  var result;

  if (operationType == "add") {
    result = firstNumber + secondNumber;
  } else if (operationType == "subtract") {
    result = firstNumber - secondNumber;
  } else if (operationType == "multiply") {
    result = firstNumber * secondNumber;
  } else if (operationType == "divide") {
    if (secondNumber === 0) {
      display.value = "Dumb";
      firstNumber = null;
      operationType = null;
      shouldReset = true;
      return;
    } else {
      result = firstNumber / secondNumber;
    }
  }

  display.value = String(result);

  firstNumber = null;
  operationType = null;
  shouldReset = true;

  // pressing = twice: first should reset firstNumber and operationType to null, second press triggers return (does fuck all)
}
