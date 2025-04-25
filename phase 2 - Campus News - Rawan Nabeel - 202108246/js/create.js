document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get values from the form
    const title = document.getElementById("title").value.trim();
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value.trim();
    const image = document.getElementById("image").files[0];

    const errors = [];

    // Validate title
    if (title.length < 5 || title.length > 100) {
      errors.push("Title must be between 5 and 100 characters.");
    }

    // Validate category
    if (!category) {
      errors.push("Please select a category.");
    }

    // Validate content
    if (content.length < 20 || content.length > 1000) {
      errors.push("Content must be between 20 and 1000 characters.");
    }

    // If any validation fails, show all messages
    if (errors.length) {
      alert(errors.join("\n"));
      return;
    }

    // Prepare data to send to the API
    const data = {
      title,
      body: content,
      category,
      image: image?.name || "",
      userId: 1
    };

    try {
      // Send data to JSONPlaceholder
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error("Failed to submit news post.");

      // Show success and redirect
      alert("News submitted successfully.");
      form.reset();
      window.location.href = "Main_Listing.html";
    } catch (err) {
      // Handle API errors
      alert("Submission error: " + err.message);
    }
  });
});
