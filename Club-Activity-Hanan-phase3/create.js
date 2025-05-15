document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("activityForm");
  const errorEl = document.getElementById("error");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("activityName").value.trim();
    const category = document.getElementById("category").value;
    const responsiblePerson = document.getElementById("responsiblePerson").value.trim();
    const email = document.getElementById("email").value.trim();
    const description = document.getElementById("activityDescription").value.trim();

    if (!name || !category || !responsiblePerson || !email || !description) {
      errorEl.textContent = "❌ Please fill all fields.";
      return;
    }

fetch("https://b39b44a5-07c1-452f-8b8f-d0076c159fa9-00-1lr5f595q83ff.sisko.replit.dev/index.php", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, category, responsible_person: responsiblePerson, email, description })
    })
      .then(res => res.json())
      .then(result => {
        if (result.error) {
          errorEl.textContent = "❌ " + result.error;
        } else {
          alert("✅ Activity added!");
          form.reset();
        }
      });
  });
});
