const movieInput = document.getElementById("movieInput");
const searchBtn = document.getElementById("searchBtn");
const movieContainer = document.getElementById("movieContainer");

const API_KEY = "YOUR_API_KEY";

searchBtn.addEventListener("click", searchMovie);

movieInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchMovie();
    }
});

async function searchMovie() {

    const movieName = movieInput.value.trim();

    if (movieName === "") {
        movieContainer.innerHTML = `
            <p class="error">Please enter a movie name.</p>
        `;
        return;
    }

    movieContainer.innerHTML = `<p>Searching...</p>`;

    try {

        const response = await fetch(
            `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
        );

        const movie = await response.json();

        if (movie.Response === "False") {
            movieContainer.innerHTML = `
                <p class="error">Movie not found 😔</p>
            `;
            return;
        }

        movieContainer.innerHTML = `
            <div class="movie-card">

                <img 
                    src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/250x350?text=No+Poster"}" 
                    alt="${movie.Title}"
                >

                <h2>${movie.Title}</h2>

                <p><strong>Year:</strong> ${movie.Year}</p>

                <p><strong>Genre:</strong> ${movie.Genre}</p>

                <p><strong>Director:</strong> ${movie.Director}</p>

                <p><strong>Actors:</strong> ${movie.Actors}</p>

                <p><strong>Rating:</strong> ⭐ ${movie.imdbRating}</p>

                <p><strong>Plot:</strong> ${movie.Plot}</p>

            </div>
        `;

    } catch (error) {

        movieContainer.innerHTML = `
            <p class="error">
                Something went wrong. Check your internet connection.
            </p>
        `;

        console.error(error);
    }
}