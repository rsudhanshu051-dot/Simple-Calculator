const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

let expression = "";

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;

    if (value === "C") {
      expression = "";
      display.value = "0";
    } 
    else if (value === "backspace") {
      expression = expression.slice(0, -1);
      display.value = expression || "0";
    } 
    else if (value === "=") {
      calculateResult();
    } 
    else if (value === "%") {
      expression += "/100";
      display.value = expression;
    } 
    else {
      expression += value;
      display.value = expression;
    }
  });
});

function calculateResult() {
  try {
    if (expression.trim() === "") return;

    const result = Function(`"use strict"; return (${expression})`)();

    if (!Number.isFinite(result)) {
      display.value = "Error";
      expression = "";
    } else {
      display.value = result;
      expression = result.toString();
    }
  } catch {
    display.value = "Error";
    expression = "";
  }
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if ("0123456789+-*/.".includes(key)) {
    expression += key;
    display.value = expression;
  } 
  else if (key === "Enter" || key === "=") {
    calculateResult();
  } 
  else if (key === "Backspace") {
    expression = expression.slice(0, -1);
    display.value = expression || "0";
  } 
  else if (key === "Escape") {
    expression = "";
    display.value = "0";
  }
});