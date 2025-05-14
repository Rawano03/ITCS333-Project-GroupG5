document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const reviewsContainer = document.getElementById("reviews-container");

    // ✅ Replace this with your exact project URL
    const API_URL = "https://myusername.course-reviews.repl.co/api.php";

    // Show existing reviews
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            data.forEach(review => {
                addReview(review.course_name, review.rating, review.feedback);
            });
        });

    form.addEventListener("submit", e => {
        e.preventDefault();

        const course = document.getElementById("course_name").value;
        const rating = form.querySelector('input[name="rating"]:checked');
        const feedback = document.getElementById("feedback").value;

        if (!course || !rating || feedback.length < 5) {
            alert("Please fill all fields correctly.");
            return;
        }

        const review = {
            course_name: course,
            rating: rating.value,
            feedback: feedback
        };

        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(review)
        })
        .then(() => {
            addReview(course, rating.value, feedback);
            form.reset();
            alert("Review added!");
        })
        .catch(() => alert("Error saving review."));
    });

    function addReview(course, rating, feedback) {
        const div = document.createElement("div");
        div.className = "review-item";
        div.innerHTML = `<h3>${course}</h3><p>Rating: ${rating}</p><p>${feedback}</p>`;
        reviewsContainer.appendChild(div);
    }
});
