const weight = document.getElementById("weight");
const height = document.getElementById("height");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");
const message = document.getElementById("message");

calculate.addEventListener("click", function () {

    let weightValue = Number(weight.value);
    let heightValue = Number(height.value);

    if (weightValue <= 0 || heightValue <= 0) {
        result.textContent = "Please enter valid values";
        message.textContent = "";
        return;
    }

    let bmi = weightValue / (heightValue * heightValue);

    result.textContent = "Your BMI is: " + bmi.toFixed(1);

    if (bmi < 18.5) {
        message.textContent = "Underweight";
    } else if (bmi < 25) {
        message.textContent = "Normal weight";
    } else if (bmi < 30) {
        message.textContent = "Overweight";
    } else {
        message.textContent = "Obese";
    }
});