// Get the booking form
const form = document.querySelector(".contact form");

// Handle form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values entered by the customer
    const name = form.querySelector('input[type="text"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const date = form.querySelector('input[type="date"]').value;
    const service = form.querySelector("select").value;

    // Check if all fields are filled
    if (name === "" || phone === "" || date === "" || service === "") {
        alert("Please fill in all the fields.");
        return;
    }

    // Show successful booking message
    alert(
        `Thank you, ${name}! Your ${service} appointment has been booked for ${date}.`
    );

    // Clear the form
    form.reset();
});