class Calculator {
  constructor(prevOpText, currentOpText) {
    this.prevOpText = prevOpText;
    this.currentOpText = currentOpText;
    this.clear();
  }
  clear() {
    this.currentOp = "";
    this.prevOp = "";
    this.operation = undefined;
  }
  delete() {
    this.currentOp = this.currentOp.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOp.includes(".")) return;
    this.currentOp = this.currentOp.toString() + number.toString();
  }

  chooseOp(operation) {
    if (this.currentOp === "") return;
    if (this.prevOp !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOp = this.currentOp;
    this.currentOp = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.prevOp);
    const current = parseFloat(this.currentOp);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOp = computation;
    this.operation = undefined;
    this.prevOp = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentOpText.innerText = this.getDisplayNumber(this.currentOp);
    if (this.operation != null) {
      this.prevOpText.innerText = `${this.getDisplayNumber(this.prevOp)}${
        this.operation
      }`;
    } else {
      this.prevOpText.innerText = "";
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-op]");
const equalButton = document.querySelector("[data-equal]");
const clearButton = document.querySelector("[data-clear]");
const deleteButton = document.querySelector("[data-delete]");
const prevOpText = document.querySelector("[data-prev-op]");
const currentOpText = document.querySelector("[data-current-op]");

const calculator = new Calculator(prevOpText, currentOpText);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOp(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});

document.body.addEventListener("keydown", (key) => {
  const keyType = identifyKey(key.key);
  switch (keyType) {
    case "number":
      calculator.appendNumber(key.key);
      calculator.updateDisplay();
      break;

    case "op":
      calculator.chooseOp(key.key);
      calculator.updateDisplay();
      break;

    case "backspace":
      calculator.delete();
      calculator.updateDisplay();
      break;

    case "enter":
      calculator.compute();
      calculator.updateDisplay();
      break;
  }
});

function identifyKey(key) {
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]
  const ops = ["+", "-", "/", "*"]
  
  if(numbers.includes(key)) {
    return "number";
  } else if (ops.includes(key)) {
    return "op";
  } else if (key == "Backspace") {
    return "backspace";
  } else if (key == "Enter") {
    return "enter";
  }
}
