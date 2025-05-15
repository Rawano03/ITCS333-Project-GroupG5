const API_Base = 'https://replit.com/@rm5988391/PHP-MySQL#htdocs/Index.php';
const API_URL = 'https://jsonplaceholder.typicode.com/posts'; 

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