const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");

convertBtn.addEventListener("click", function () {

    let value = Number(amount.value);

    if (value <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    let from = fromCurrency.value;
    let to = toCurrency.value;

    // Sample exchange rates
    const rates = {
        USD: {
            USD: 1,
            NGN: 1324,
            EUR: 0.85,
            GBP: 0.74
        },

        NGN: {
            USD: 1 / 1324,
            NGN: 1,
            EUR: 0.85 / 1324,
            GBP: 0.74 / 1324
        },

        EUR: {
            USD: 1.18,
            NGN: 1324 / 0.85,
            EUR: 1,
            GBP: 0.87
        },

        GBP: {
            USD: 1.35,
            NGN: 1324 / 0.74,
            EUR: 1 / 0.87,
            GBP: 1
        }
    };

    let convertedAmount = value * rates[from][to];

    result.textContent =
        `${value} ${from} = ${convertedAmount.toFixed(2)} ${to}`;
});