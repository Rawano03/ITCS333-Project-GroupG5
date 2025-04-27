document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const errorMessages = document.getElementById('error-messages');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const code = document.getElementById("Course-Code").value.trim();
        const title = document.getElementById("Course-Title").value.trim();
        const department = document.getElementById("department").value;
        const file = document.getElementById("upload-Notes").files[0];
    
        let error = [];
        if (code.length != 7) {
            error.push("Course code must be of the form XXXX XXX, like ITCS333");
        }
        if (title.length < 5 || title.length > 55) {
            error.push("Cousre title must be between 5 to 55 charecters only");
        }
        if (department == "None") {
        error.push("You must choose the department that offers the cousre");
        }
        if (!file) {
           error.push("You must upload the course notes");
        }
    
        if (error.length > 0) {
            errorMessages.innerHTML = error.map(e => '<p>${e}</p>').join('');
        }
        else {
            errorMessages.innerHTML = '';
            alert("Sumbitted successfully!");
        }
    });
});