const API_BASE = "https://8e846cd0-b1b9-4482-acb3-6cb12d162633-00-13x7mtq6cznka.sisko.replit.dev/EventCalender-Reham-202105915/Phase3/Index.php/endpoint";
const API_URL = `${API_BASE}events`;
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); 

    const title = document.getElementById('eventTitle').value;
    const date = document.getElementById('eventDate').value;
    const description = document.getElementById('eventDescription').value;

    if (!title || !date || !description) {
        alert('All fields are required!');
        return;
    }

    alert('Event created successfully!');
});