const API_BASE = "https://c8223598-aef4-497e-8bf1-254e6acb5d4e-00-38rgo79wc4l4u.sisko.replit.dev/api.php/endpoint";
const API_URL = `${API_BASE}/news`;

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('[aria-label="News List"] .grid');
  const paginationContainer = document.querySelector("ul.pagination");
  const searchInput = document.querySelector('input[name="search"]');
  const sortSelect = document.querySelector('select[name="sort"]');
  const categorySelect = document.querySelector('select[name="category"]');

  let currentPage = 1;
  let totalPages = 1;

  async function loadData() {
    container.innerHTML = "<p>Loading...</p>";
    try {
      const params = new URLSearchParams({
        search: searchInput.value.trim(),
        category: categorySelect.value,
        page: currentPage,
        sort: sortSelect.value  
      });

      const res = await fetch(`${API_URL}?${params}`);
      const result = await res.json();
      if (!result || !("data" in result)) throw new Error("Invalid data from API");

      totalPages = result.totalPages || 1;
      render(result.data);
      setupPagination();
    } catch (err) {
      container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  }


  function render(posts) {
    container.innerHTML = "";

    if (posts.length === 0) {
      container.innerHTML = "<p>No matching news posts found.</p>";
      return;
    }

    posts.forEach(post => {
      const card = document.createElement("article");

      const img = new Image();
      img.src = post.image ? `${API_BASE.replace('/api.php/endpoint', '')}/uploads/${post.image}` : "";
      img.alt = "News image";
      img.className = "news-image";
      img.style.width = "100%";
      img.style.height = "200px";
      img.style.objectFit = "cover";
      card.appendChild(img);

      const formattedDate = new Date(post.published_at).toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      card.innerHTML += `
        <header>
          <h2><a href="detail.html?id=${post.id}">${post.title}</a></h2>
          <small>
            📅 <strong>Published on:</strong> ${formattedDate}<br>
            📂 <strong>Category:</strong> ${post.category}<br>
            ✍️ <strong>Author:</strong> ${post.author}
          </small>
        </header>
        <p>${post.content.slice(0, 100)}...</p>
        <footer><a href="detail.html?id=${post.id}">Read More</a></footer>
      `;

      container.appendChild(card);
    });
  }

  function setupPagination() {
    paginationContainer.innerHTML = "";

    const prevBtn = createPageButton("Previous", currentPage - 1, currentPage === 1);
    paginationContainer.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const pageBtn = createPageButton(i, i, false, currentPage === i);
      paginationContainer.appendChild(pageBtn);
    }

    const nextBtn = createPageButton("Next", currentPage + 1, currentPage === totalPages);
    paginationContainer.appendChild(nextBtn);
  }

  function createPageButton(label, page, disabled = false, isActive = false) {
    const li = document.createElement("li");
    const btn = document.createElement("a");
    btn.href = "#";
    btn.textContent = label;
    if (disabled) {
      btn.classList.add("disabled");
      btn.style.pointerEvents = "none";
    } else {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = page;
        loadData();
      });
    }
    if (isActive) {
      btn.classList.add("active");
    }
    li.appendChild(btn);
    return li;
  }

  searchInput.addEventListener("input", () => { currentPage = 1; loadData(); });
  sortSelect.addEventListener("change", () => { currentPage = 1; loadData(); });
  categorySelect.addEventListener("change", () => { currentPage = 1; loadData(); });

  loadData();
});

