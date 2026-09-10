let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.textContent;

        if (value === "C") {
            display.textContent = "0";
        } 
        else if (value === "=") {
            display.textContent = eval(display.textContent);
        } 
        else {
            if (display.textContent === "0") {
                display.textContent = value;
            } else {
                display.textContent += value;
            }
        }
    });
});