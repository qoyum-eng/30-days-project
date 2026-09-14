const form = document.getElementById("registrationForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const address = document.getElementById("address").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (
        name === "" ||
        address === "" ||
        email === "" ||
        mobile === "" ||
        password === "" ||
        confirmPassword === ""
    ) {
        alert("Please fill in all the fields.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    alert("Registration successful!");

    form.reset();
});