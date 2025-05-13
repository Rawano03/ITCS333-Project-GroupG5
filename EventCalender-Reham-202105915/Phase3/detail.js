async function fetchEventDetails(eventId) {
    try {
        const response = await fetch(`${API_URL}/${eventId}`);
        if (!response.ok) throw new Error('Event not found');
        const event = await response.json();
        displayEventDetails(event);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load event details.');
    }
}

function displayEventDetails(event) {
    const detailSection = document.getElementById('detail');
    detailSection.innerHTML = `
        <h2>${event.title}</h2>
        <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
        <p>${event.description}</p>
        <button class="warning">Edit</button>
        <button class="error">Delete</button>
        <a href="index.html" class="button secondary">Back to Events</a>
    `;
}

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('id');
if (eventId) {
    fetchEventDetails(eventId);
}