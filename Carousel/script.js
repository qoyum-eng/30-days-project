const images = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg"
];
let currentIndex = 0;


const carouselImage = document.getElementById("carouselImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

nextBtn.addEventListener("click", ()=> {
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }
    carouselImage.src = images[currentIndex];
});
prevBtn.addEventListener("click", ()=> {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }
    carouselImage.src = images[currentIndex];
});