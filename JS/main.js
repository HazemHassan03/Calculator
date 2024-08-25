let screen = document.getElementById("screen");
let buttons = document.querySelectorAll(".calculations button");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let del = document.getElementById("delete");
let decimal = document.getElementById("decimal");
function append(input) {
  screen.value += input;
}
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button === decimal && screen.value === "") {
      append("0.");
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
equal.addEventListener("click", () => {
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
      screen.value = eval(newValue);
    } catch {
      let value = screen.value;
      screen.value = "Error";
      setTimeout(() => {
        screen.value = value;
      }, 1000);
    }
  }
});
