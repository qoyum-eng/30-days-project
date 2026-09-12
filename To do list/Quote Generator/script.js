const quotes = [
    {
        quote: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt"
    },
    {
        quote: "The only way to do great work is to love what you do.",
        author: "Steve Jobs"
    },
    {
        quote: "Success is not final, failure is not fatal.",
        author: "Winston Churchill"
    },
    {
        quote: "It always seems impossible until it's done.",
        author: "Nelson Mandela"
    }
];

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const button = document.getElementById("generateBtn");
button.addEventListener("click", function () {
    const randomIndex = Math.floor(Math.random() * quotes.length);

    quote.textContent = quotes[randomIndex].quote;
    author.textContent = "— " + quotes[randomIndex].author;
});