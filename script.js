const API_KEY = 'DEMO_KEY'; // Replace with your NASA API key
const API_URL = 'https://api.nasa.gov/planetary/apod?api_key=' + API_KEY;
const favourites = JSON.parse(localStorage.getItem('favourites')) || [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('date-form').addEventListener('submit', fetchAPOD);
    displayFavourites();
});

async function fetchAPOD(event) {
    event.preventDefault();
    const date = document.getElementById('date-input').value;
    if (!date) return;

    const response = await fetch(`${API_URL}&date=${date}`);
    const data = await response.json();
    displayAPOD(data);
}

function displayAPOD(data) {
    const apodContainer = document.getElementById('apod-container');
    apodContainer.innerHTML = `
        <div class="apod-card">
            <img src="${data.url}" alt="${data.title}" id="apod-image">
            <h2>${data.title}</h2>
            <p>${data.date}</p>
            <p>${data.explanation}</p>
            <button onclick="addFavourite('${data.url}', '${data.title}', '${data.date}', '${data.explanation}')">Add to Favourites</button>
        </div>
    `;
    document.getElementById('apod-image').addEventListener('click', () => {
        window.open(data.hdurl, '_blank');
    });
}

function addFavourite(url, title, date, explanation) {
    const favourite = { url, title, date, explanation };
    favourites.push(favourite);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    displayFavourites();
}

function displayFavourites() {
    const favouritesContainer = document.getElementById('favourites-container');
    favouritesContainer.innerHTML = '';
    favourites.forEach((favourite, index) => {
        const favouriteCard = document.createElement('div');
        favouriteCard.classList.add('favourite-card');
        favouriteCard.innerHTML = `
            <img src="${favourite.url}" alt="${favourite.title}" class="favourite-image">
            <h2>${favourite.title}</h2>
            <p>${favourite.date}</p>
            <p>${favourite.explanation}</p>
            <button class="remove-favourite" onclick="removeFavourite(${index})">Remove</button>
        `;
        favouritesContainer.appendChild(favouriteCard);
    });
}

function removeFavourite(index) {
    favourites.splice(index, 1);
    localStorage.setItem('favourites', JSON.stringify(favourites));
    displayFavourites();
}
