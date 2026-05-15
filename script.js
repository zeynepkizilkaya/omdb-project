const apiKey = "d39ce077";

const movieInput = document.getElementById("movieInput");

const searchButton = document.getElementById("searchButton");

const movieCard = document.getElementById("movieCard");

const message = document.getElementById("message");

const moviePoster = document.getElementById("moviePoster");

const movieTitle = document.getElementById("movieTitle");

const movieYear = document.getElementById("movieYear");

const movieGenre = document.getElementById("movieGenre");

const movieDirector = document.getElementById("movieDirector");

const movieRuntime = document.getElementById("movieRuntime");

const movieRating = document.getElementById("movieRating");

const moviePlot = document.getElementById("moviePlot");

async function searchMovie() {
    const movieName = movieInput.value;

    if (movieName === "") {
        message.textContent = "Please type a movie name.";
        movieCard.classList.add("hidden");
        return;
    }

    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
    if (data.Response === "False") {
    message.textContent = "Oopsie... couldn't find that movie!";
    movieCard.classList.add("hidden");
    localStorage.removeItem("lastMovie");
    return;
}

message.textContent = "";

movieTitle.textContent = data.Title;
movieYear.textContent = data.Year;
movieGenre.textContent = data.Genre;
movieDirector.textContent = data.Director;
movieRuntime.textContent = data.Runtime;
movieRating.textContent = data.imdbRating;
moviePlot.textContent = data.Plot;
moviePoster.src = data.Poster;

movieCard.classList.remove("hidden");

localStorage.setItem("lastMovie", movieName);
}

searchButton.addEventListener("click", searchMovie);

window.addEventListener("load", function() {
    const lastMovie = localStorage.getItem("lastMovie");

    if (lastMovie) {
        movieInput.value = lastMovie;
        searchMovie();
    }
});