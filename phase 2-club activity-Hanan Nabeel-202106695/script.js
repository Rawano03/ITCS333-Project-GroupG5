document.addEventListener("DOMContentLoaded", () => {
    const activityContainer = document.getElementById("activityList");
    if (!activityContainer) return;
  
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const sortBySelect = document.getElementById("sortBy");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
  
    let allActivities = [];
    let currentPage = 1;
    const itemsPerPage = 2;
  
    function renderActivities(activities) {
      activityContainer.innerHTML = "";
  
      if (activities.length === 0) {
        activityContainer.innerHTML = "<p>No activities found.</p>";
        return;
      }
  
      activities.forEach((activity) => {
        const div = document.createElement("div");
        div.classList.add("activity-item");
        div.innerHTML = `
          <h3>${activity.name}</h3>
          <img src="${activity.image}" alt="${activity.name}" />
          <p>${activity.description}</p>
          <p><strong>Category:</strong> ${activity.category}</p>
        `;
        activityContainer.appendChild(div);
      });
    }
  
    function filterAndSearchAndPaginate() {
      const searchValue = searchInput?.value.toLowerCase() || "";
      const selectedCategory = filterSelect?.value || "all";
      const sortBy = sortBySelect?.value || "name";
  
      let filtered = allActivities.filter((activity) => {
        const matchesSearch = activity.name.toLowerCase().includes(searchValue);
        const matchesCategory = selectedCategory === "all" || activity.category === selectedCategory;
        return matchesSearch && matchesCategory;
      });
  
      if (sortBy === "name") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sortBy === "category") {
        filtered.sort((a, b) => a.category.localeCompare(b.category));
      }
  
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      const paginatedActivities = filtered.slice(start, end);
  
      renderActivities(paginatedActivities);
  
      prevBtn.disabled = currentPage === 1;
      nextBtn.disabled = end >= filtered.length;
    }
  
    fetch("data.json")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to load data");
        return response.json();
      })
      .then((data) => {
        allActivities = data;
        filterAndSearchAndPaginate();
  
        searchInput?.addEventListener("input", () => {
          currentPage = 1;
          filterAndSearchAndPaginate();
        });
        filterSelect?.addEventListener("change", () => {
          currentPage = 1;
          filterAndSearchAndPaginate();
        });
        sortBySelect?.addEventListener("change", () => {
          currentPage = 1;
          filterAndSearchAndPaginate();
        });
  
        prevBtn?.addEventListener("click", () => {
          if (currentPage > 1) {
            currentPage--;
            filterAndSearchAndPaginate();
          }
        });
  
        nextBtn?.addEventListener("click", () => {
          currentPage++;
          filterAndSearchAndPaginate();
        });
      })
      .catch((error) => {
        activityContainer.innerHTML = `<p style="color:red;">${error.message}</p>`;
      });
  });
  