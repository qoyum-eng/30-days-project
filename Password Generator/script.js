const passwordOutput = document.querySelector("#password");
const lengthInput = document.querySelector("#length");
const lengthValue = document.querySelector("#length-value");
const strengthFill = document.querySelector("#strength-fill");
const strengthLabel = document.querySelector("#strength-label");
const errorMessage = document.querySelector("#error-message");
const copyStatus = document.querySelector("#copy-status");
const copyButton = document.querySelector("#copy-button");

const characterSets = [
	{ id: "uppercase", value: "ABCDEFGHIJKLMNOPQRSTUVWXYZ" },
	{ id: "lowercase", value: "abcdefghijklmnopqrstuvwxyz" },
	{ id: "numbers", value: "0123456789" },
	{ id: "symbols", value: "!@#$%^&*()-_=+[]{};:,.?" },
];

function randomIndex(max) {
	const limit = Math.floor(0x100000000 / max) * max;
	const buffer = new Uint32Array(1);
	let value;

	do {
		window.crypto.getRandomValues(buffer);
		value = buffer[0];
	} while (value >= limit);

	return value % max;
}

function shuffle(items) {
	for (let index = items.length - 1; index > 0; index -= 1) {
		const swapIndex = randomIndex(index + 1);
		[items[index], items[swapIndex]] = [items[swapIndex], items[index]];
	}
	return items;
}

function updateStrength(length) {
	const selectedSets = characterSets.filter((set) => document.querySelector(`#${set.id}`).checked);
	const poolSize = selectedSets.reduce((size, set) => size + set.value.length, 0);
	const entropy = length * Math.log2(poolSize);
	const level = entropy < 45 ? 1 : entropy < 70 ? 2 : entropy < 100 ? 3 : 4;
	const labels = ["", "FAIR", "GOOD", "STRONG", "EXCELLENT"];

	strengthFill.dataset.level = String(level);
	strengthFill.style.flex = String(level);
	strengthLabel.textContent = labels[level];
	strengthLabel.style.color = level === 1 ? "#c45d46" : level === 2 ? "#a47b20" : "#66853e";
	strengthFill.parentElement.setAttribute("aria-label", `${labels[level]} password strength`);
}

function generatePassword() {
	const selectedSets = characterSets.filter((set) => document.querySelector(`#${set.id}`).checked);
	const length = Number(lengthInput.value);
	errorMessage.textContent = "";

	if (selectedSets.length === 0) {
		errorMessage.textContent = "Choose at least one character type.";
		return;
	}

	if (length < selectedSets.length) {
		errorMessage.textContent = `Length must be at least ${selectedSets.length} for the selected character types.`;
		return;
	}

	const characters = selectedSets.map((set) => set.value[randomIndex(set.value.length)]);
	const pool = selectedSets.map((set) => set.value).join("");

	while (characters.length < length) {
		characters.push(pool[randomIndex(pool.length)]);
	}

	passwordOutput.textContent = shuffle(characters).join("");
	copyStatus.textContent = "Click the icon to copy";
	updateStrength(length);
}

lengthInput.addEventListener("input", () => {
	lengthValue.value = lengthInput.value;
	const percent = ((Number(lengthInput.value) - Number(lengthInput.min)) / (Number(lengthInput.max) - Number(lengthInput.min))) * 100;
	lengthInput.style.background = `linear-gradient(to right, var(--ink) 0%, var(--ink) ${percent}%, #e3e3dc ${percent}%, #e3e3dc 100%)`;
	generatePassword();
});

characterSets.forEach(({ id }) => {
	document.querySelector(`#${id}`).addEventListener("change", generatePassword);
});

document.querySelector("#generate-button").addEventListener("click", generatePassword);

copyButton.addEventListener("click", async () => {
	const password = passwordOutput.textContent;
	if (!password) return;

	try {
		await navigator.clipboard.writeText(password);
		copyStatus.textContent = "Copied to clipboard";
	} catch {
		copyStatus.textContent = "Clipboard access unavailable";
	}
});

generatePassword();
