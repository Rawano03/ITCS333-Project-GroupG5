const API_BASE = "";
const API_URL = '';

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('form');
    const errorMessages = document.getElementById('error-messages');
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const code = document.getElementById("course-code").value.trim();
        const title = document.getElementById("course-title").value.trim();
        const department = document.getElementById("department").value;
        const file = document.getElementById("upload-notes").files[0];
    
        let error = [];
        const codePattern = /^[A-Z]{4}\d{3}$/;
        if (!codePattern.test(code)) {
            error.push("Course Code must be of the form XXXX###, like ITCS333");
        }
        if (title.length < 5 || title.length > 55) {
            error.push("Course Title must be between 5 to 55 characters only");
        }
        if (department == "") {
        error.push("You must choose the department that offers the course");
        }
        if (!file) {
           error.push("You must upload the course notes");
        }
    
        if (error.length > 0) {
            errorMessages.innerHTML = '<ul style="color: red;">' + error.map(e => `<li>${e}</li>`).join('') + '</ul>';
        }
        else {
            errorMessages.innerHTML = '';
            alert("Submitted successfully!");
        }
    });
});