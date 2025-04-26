document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;

    if (!title || !date || !description) {
        alert('All fields are required!');
        return;
    }

    alert('Event created successfully!'); // Replace with actual submission logic
});