document.addEventListener("DOMContentLoaded", () => {
  const activityContainer = document.getElementById("activityList");
  const searchInput = document.getElementById("searchInput");
  const filterSelect = document.getElementById("filterSelect");
  const sortBySelect = document.getElementById("sortBy");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let currentPage = 1;
  const itemsPerPage = 2;

  const allActivities = [
    {
      "name": "Cybersecurity Club Workshop",
      "category": "workshops",
      "image": "img/cybersecurity.jpg",
      "description": "Learn the basics of cybersecurity. Join us for an exciting workshop!"
    },
    {
      "name": "FutureSec Hackathon",
      "category": "hackathons",
      "image": "img/Hackathon.jpg",
      "description": "Compete in real-world cybersecurity challenges. Win prizes and network!"
    },
    {
      "name": "Data Privacy and GDPR",
      "category": "activities",
      "image": "img/gdpr-update.jpg",
      "description": "Learn how GDPR protects personal data and ensures privacy rights."
    },
    {
      "name": "Introduction to Cryptography",
      "category": "workshops",
      "image": "img/1701959179280.jpg",
      "description": "Understand ciphers and encryption to secure digital communication."
    }
  ];

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
});
