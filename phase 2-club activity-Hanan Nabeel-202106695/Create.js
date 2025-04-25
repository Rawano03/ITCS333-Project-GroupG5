document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("activityForm");
    if (!form) return;
  
    const errorEl = document.getElementById("error");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const name = document.getElementById("activityName")?.value.trim();
      const category = document.getElementById("category")?.value;
      const responsiblePerson = document.getElementById("responsiblePerson")?.value.trim();
      const email = document.getElementById("email")?.value.trim();
      const description = document.getElementById("activityDescription")?.value.trim();
  
      if (!name || !category || !responsiblePerson || !email || !description) {
        errorEl.textContent = "❌ Please fill in all fields.";
        return;
      }
  
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        errorEl.textContent = "❌ Please enter a valid email address.";
        return;
      }
  
      errorEl.textContent = "";
      alert("✅ Activity created successfully!");
    });
  });
  