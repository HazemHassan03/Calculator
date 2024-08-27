let screen = document.getElementById("screen");
let buttons = document.querySelectorAll(".calculations button");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let del = document.getElementById("delete");
let decimal = document.getElementById("decimal");
let displayHistory = document.querySelector(".header i");
let history = document.querySelector(".history");
let back = document.querySelector(".history i");
let warning = document.querySelector(".warning");
let empty = document.querySelector(".history .empty");
function append(input) {
  screen.value += input;
}
let timer;
function warnings(value) {
  clearTimeout(timer);
  warning.textContent = value;
  timer = setTimeout(() => {
    warning.textContent = "";
  }, 3000);
}
buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (button.classList.contains("op")) {
      if (
        screen.value.endsWith("+") ||
        screen.value.endsWith("-") ||
        screen.value.endsWith("×") ||
        screen.value.endsWith("÷") ||
        screen.value.endsWith(".") ||
        screen.value === ""
      ) {
        e.preventDefault();
        if (screen.value === "") {
          warnings("You can't start with an operator");
        } else if (screen.value.endsWith(".")) {
          warnings("You can't add operators after a decimal point");
        } else {
          warnings("You can't add two consecutive operators");
        }
      } else {
        append(button.textContent);
      }
    } else if (button === decimal) {
      let check = screen.value
        .replace("×", ",")
        .replace("-", ",")
        .replace("+", ",")
        .replace("÷", ",")
        .split(",");
      if (
        screen.value.endsWith(".") ||
        check[check.length - 1].indexOf(".") !== -1
      ) {
        e.preventDefault();
        if (screen.value.endsWith(".")) {
          warnings("You can't add two consecutive decimal points");
        } else {
          warnings("You can't add two decimal points in one number");
        }
      } else {
        if (
          screen.value === "" ||
          screen.value.endsWith("+") ||
          screen.value.endsWith("-") ||
          screen.value.endsWith("×") ||
          screen.value.endsWith("÷")
        ) {
          append("0.");
        } else {
          append(button.textContent);
        }
      }
    } else if (button !== equal && button !== clear) {
      append(button.textContent);
    }
  });
});
del.addEventListener("click", () => {
  let newValue = screen.value.split("");
  newValue.pop();
  screen.value = newValue.join("");
});
clear.addEventListener("click", () => {
  screen.value = "";
});
equal.addEventListener("click", (e) => {
  let check = screen.value
    .replace("×", ",")
    .replace("-", ",")
    .replace("+", ",")
    .replace("÷", ",");
  if (check.indexOf(",") === -1) {
    e.preventDefault();
    warnings("Add mathematical operation first");
  } else if (isNaN(parseInt(screen.value[screen.value.length - 1]))) {
    e.preventDefault();
    warnings("Mathematical operation can't end with an operator");
  } else {
    if (screen.value === "") {
      screen.value = "";
    } else {
      let newValue = screen.value
        .split("")
        .map((e) => {
          if (e === "×") {
            return "*";
          } else if (e === "÷") {
            return "/";
          } else {
            return e;
          }
        })
        .join("");
      try {
        let value = screen.value;
        screen.value = eval(newValue);
        empty.remove();
        addHistory(value, eval(newValue));
      } catch {
        let value = screen.value;
        screen.value = "Error";
        setTimeout(() => {
          screen.value = value;
        }, 1000);
      }
    }
  }
});
displayHistory.addEventListener("click", () => {
  history.style.marginLeft = "0";
});
back.addEventListener("click", () => {
  history.style.marginLeft = "-100%";
});
function addHistory(calc, res) {
  if (history.children.length > 2) {
    history.append(document.createElement("hr"));
  }
  let div = document.createElement("div");
  let calculation = document.createElement("h3");
  let result = document.createElement("span");
  let calculationText = document.createTextNode(calc);
  let resultText = document.createTextNode(res);
  calculation.append(calculationText);
  result.append(resultText);
  calculation.classList.add("calculation");
  result.classList.add("result");
  div.append(calculation, result);
  history.append(div);
}
