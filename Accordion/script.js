const buttons = document.querySelectorAll(".accordion-btn");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const content = button.nextElementSibling;

        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});