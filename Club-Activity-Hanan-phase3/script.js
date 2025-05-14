document.addEventListener("DOMContentLoaded", () => {
  const activityList = document.getElementById("activityList");

  fetch("https://b39b44a5-07c1-452f-8b8f-d0076c159fa9-00-1lr5f595q83ff.sisko.replit.dev/index.php")
    .then(res => res.json())
    .then(data => {
      if (!data.length) {
        activityList.innerHTML = "<p>No activities found.</p>";
        return;
      }

      activityList.innerHTML = "";

      data.forEach(activity => {
        const div = document.createElement("div");
        div.classList.add("activity-item");
        div.innerHTML = `
          <h3>${activity.name}</h3>
          <p><strong>Category:</strong> ${activity.category}</p>
          <p><strong>Description:</strong> ${activity.description}</p>
          <p><strong>By:</strong> ${activity.responsible_person} | ${activity.email}</p>
          <p><small>${activity.created_at}</small></p>
        `;
        
        activityList.appendChild(div);
      });
    })
    .catch(err => {
      activityList.innerHTML = "<p>⚠️ Failed to load activities.</p>";
      console.error(err);
    });
});
