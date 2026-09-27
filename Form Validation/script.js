


const form = document.querySelector("#signup-form");

form.addEventListener("submit", function (event) {
	event.preventDefault();

	const name = document.querySelector("#name");
	const email = document.querySelector("#email");
	const password = document.querySelector("#password");
	const confirmPassword = document.querySelector("#confirm-password");
	const successMessage = document.querySelector("#success-message");
	let isValid = true;

	// Clear old messages before checking the form again.
	document.querySelectorAll(".error").forEach(function (message) {
		message.textContent = "";
	});
	document.querySelectorAll("input").forEach(function (input) {
		input.classList.remove("invalid");
	});
	successMessage.textContent = "";

	function showError(input, message, text) {
		document.querySelector(`#${input.id}-error`).textContent = text;
		input.classList.add("invalid");
		isValid = false;
	}

	if (name.value.trim() === "") {
		showError(name, "name-error", "Please enter your name.");
	}

	if (email.value.trim() === "") {
		showError(email, "email-error", "Please enter your email.");
	} else if (!email.validity.valid) {
		showError(email, "email-error", "Please enter a valid email address.");
	}

	if (password.value.length < 8) {
		showError(password, "password-error", "Use at least 8 characters.");
	}

	if (confirmPassword.value === "") {
		showError(confirmPassword, "confirm-password-error", "Please confirm your password.");
	} else if (confirmPassword.value !== password.value) {
		showError(confirmPassword, "confirm-password-error", "The passwords do not match.");
	}

	if (isValid) {
		successMessage.textContent = "Your form looks good. Thanks for signing up!";
		form.reset();
	}
});

