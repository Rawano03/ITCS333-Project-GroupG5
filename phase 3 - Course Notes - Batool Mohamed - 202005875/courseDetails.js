const API_BASE = "";
const API_URL = '';

document.addEventListener("DOMContentLoaded", () => {
    const loadSection = document.querySelector('.load');
    const detailsSection = document.querySelector('.details');
    const notesSection = document.querySelector('.notes');

    const courseCodeTitle = document.getElementById('course-code-title');
    const courseDepartment = document.getElementById('course-department');
    const courseDescription = document.getElementById('course-description');
    const courseNotesList = document.getElementById('course-notes-list');

    
    async function fetchCourseDetails(courseId) {
        loadSection.style.display = 'block';
        try {
            const response = await fetch(`${API_URL}/${courseId}`);
            if (!response.ok) {
                throw new Error (`Server Error: ${response.status}`);
            } 
            const course = await response.json();
            renderCourseDetails(course);
        }
        catch (error) {
            console.error('Fetch error: ', error);
            detailsSection.innerHTML = `<p style="color: red">${error.message}</p>`;
        }
        finally {
            loadSection.style.display = 'none';
        }
    }
    
    function renderCourseDetails(course) {
        courseCodeTitle.textContent = `${course.code}: ${course.title}`;
        courseDepartment.innerHTML = `Department of <strong>${course.department}</strong> offers this course`;
        courseDescription.textContent = course.description || "No description.";

        if (Array.isArray(course.notes) && course.notes.length > 0) {
            course.notes.forEach((note, index) => {
                const a = document.createElement("a");
                a.href = note.url || `notes/Chapter ${index + 1}.pdf`;
                a.target = "_blank";
                a.textContent = note.name || `Chapter ${index + 1}`;
                courseNotesList.appendChild(a);
            });
            notesSection.hidden = false;
        }
        detailsSection.hidden = false;
    }
    
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');
    
    if (courseId) {
        fetchCourseDetails(courseId);
    }
    else {
        detailsSection.innerHTML = '<p>Course Not Found</p>';
    }
});