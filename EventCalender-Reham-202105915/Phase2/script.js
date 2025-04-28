// Base URL for your API
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

// DOM Elements
const eventsContainer = document.querySelector('.grid');
const searchInput = document.querySelector('input[placeholder="Search events"]');
const loadingIndicator = document.createElement('div');
loadingIndicator.innerText = 'Loading...';
loadingIndicator.style.display = 'none';
document.body.appendChild(loadingIndicator);

// Fetch and render events
async function fetchEvents() {
    loadingIndicator.style.display = 'block'; // Show loading

    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load events. Please try again later.');
    } finally {
        loadingIndicator.style.display = 'none'; // Hide loading
    }
}

// Render events to the page
function renderEvents(events) {
    eventsContainer.innerHTML = ''; // Clear previous events

    events.forEach(event => {
        const article = document.createElement('article');
        article.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
            <p>${event.description}</p>
            <a href="detail.html?id=${event.id}" class="button">View Details</a>
        `;
        eventsContainer.appendChild(article);
    });
}

// Search functionality
searchInput.addEventListener('input', (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.title.toLowerCase().includes(searchTerm)
    );
    renderEvents(filteredEvents);
});

// Initialize the application
document.addEventListener('DOMContentLoaded', fetchEvents);