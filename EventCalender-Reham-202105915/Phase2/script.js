async function fetchEvents() {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block'; // Show loading indicator

    try {
        const response = await fetch('https://api.example.com/events');
        if (!response.ok) throw new Error('Network response was not ok');
        const events = await response.json();
        renderEvents(events);
    } catch (error) {
        console.error('Fetch error:', error);
        alert('Failed to load events. Please try again later.');
    } finally {
        loadingIndicator.style.display = 'none'; // Hide loading indicator
    }
}