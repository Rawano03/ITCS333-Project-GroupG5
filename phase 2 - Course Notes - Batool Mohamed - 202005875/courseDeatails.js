const API_URL = "https://680d0aabc47cb8074d8f5dc1.mockapi.io/Courses";

document.addEventListener("DOMContentLoaded", () => {
    const loadSection = document.querySelector('.load');
    const detailsSection = document.querySelector('.details');
    
    async function fetchCourseDetails(courseId) {
        loadSection.style.display = 'block';
        try {
            const response = await fetch('${API_URL}/${courseId}');
            if (!response.ok) {
                throw new Error ("Faild to fetch course details");
            } 
            const course = await response.json();
            renderCourseDetails(course);
        }
        catch (error) {
            console.error('Fetch error: ', error);
            detailsSection.innerHTML = '<p style="color: red">${error.message}</p>';
        }
        finally {
            loadSection.style.display = 'none';
        }
    }
    
    function renderCourseDetails(course) {
        detailsSection.innerHTML = '<h4>${course.code}: ${course.title}</h4> <p>Department of <strong>${course.department}</strong> offers this course</p> <article> <h6>Course Describtion</h6> <p>${course.describtion}</p> </article>';
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