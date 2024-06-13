const apiKey = '496fbef10dcd42f4f8d56ca5f64631b1';
const searchBar = document.getElementById('searchBar');
const movieResults = document.getElementById('movieResults');
const movieStream = document.getElementById('movieStream');
const movieContainer = document.getElementById('movieContainer');
const backButton = document.getElementById('backButton');
const loader = document.getElementById('loader');
const searchIcon = document.getElementById('searchIcon');

// Event listener for search bar
searchBar.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') {
        searchMovies(e.target.value);
    }
});

// Event listener for search icon
searchIcon.addEventListener('click', function() {
    searchMovies(searchBar.value);
});

// Function to search movies
async function searchMovies(query) {
    loader.style.display = 'block';
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    } finally {
        loader.style.display = 'none';
    }
}

// Function to display movies in results
function displayMovies(movies) {
    movieResults.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');
        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" onclick="playMovie('${movie.id}')">
            <h2>${movie.title}</h2>
            <p>Rating: ${movie.vote_average}</p>
        `;
        movieResults.appendChild(movieCard);
    });
}

// Function to play movie
function playMovie(movieId) {
    movieContainer.innerHTML = `
        <iframe src="https://www.2embed.cc/embed/${movieId}" width="100%" height="100%" frameborder="0" scrolling="no" allowfullscreen></iframe>
    `;
    movieStream.style.display = 'block';
    movieResults.style.display = 'none';
}

// Event listener for back button
backButton.addEventListener('click', () => {
    movieStream.style.display = 'none';
    movieResults.style.display = 'flex';
});
