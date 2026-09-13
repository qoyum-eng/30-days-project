const generateBtn = document.getElementById("generateBtn");
const palette = document.getElementById("palette");

generateBtn.addEventListener("click", generatePalette);

function generatePalette() {
    palette.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const color = "#" + Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0");

        const colorBox = document.createElement("div");

        colorBox.classList.add("color-box");
colorBox.style.backgroundColor = color;
colorBox.textContent = color;

colorBox.addEventListener("click", () => {
    navigator.clipboard.writeText(color);
    alert(`${color} copied!`);
});

palette.appendChild(colorBox);
    }
}