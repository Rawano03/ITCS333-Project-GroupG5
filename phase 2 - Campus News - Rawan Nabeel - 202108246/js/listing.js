const API_URL = "https://jsonplaceholder.typicode.com/posts";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector('[aria-label="News List"] .grid');
  const searchInput = document.querySelector('input[name="search"]');
  const sortSelect = document.querySelector('select[name="sort"]');
  const categorySelect = document.querySelector('select[name="category"]');
  const paginationContainer = document.querySelector(".pagination");

  let allPosts = [];
  let currentPage = 1;
  const postsPerPage = 6;

  // Fetch and prepare post data
  async function loadData() {
    container.innerHTML = "<p>Loading...</p>";
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch posts.");
      const posts = await response.json();

      allPosts = posts.map(post => {
        const fakeDate = new Date();
        fakeDate.setDate(fakeDate.getDate() - post.id);

        return {
          ...post,
          category: ["events", "alerts", "announcements"][post.id % 3],
          title: `Campus Update #${post.id}`,
          body: `This is the summary for news item #${post.id}.`,
          image: `https://picsum.photos/seed/${post.id}/400/200`,
          createdAt: fakeDate.toISOString()
        };
      });

      render();
    } catch (err) {
      container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  }

  // Apply filters and sort
  function applyFilters() {
    let result = [...allPosts];

    const search = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;
    const sortType = sortSelect.value;

    if (search) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(search) ||
        post.body.toLowerCase().includes(search)
      );
    }

    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }

    if (sortType === "latest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortType === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }

    return result;
  }

  // Return a slice of paginated posts
  function getPage(list, page, perPage) {
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  }

  // Render posts
  function render() {
    const filtered = applyFilters();
    const paginated = getPage(filtered, currentPage, postsPerPage);

    container.innerHTML = "";

    if (paginated.length === 0) {
      container.innerHTML = "<p>No matching news posts found.</p>";
      return;
    }

    paginated.forEach(post => {
      const card = document.createElement("article");

      // Create loading message
      const loadingMsg = document.createElement("p");
      loadingMsg.textContent = "Loading image...";
      loadingMsg.style.color = "gray";

      // Create the image
      const img = new Image();
      img.className = "news-image";
      img.alt = "News image";

      img.onload = () => {
        loadingMsg.remove();
        card.insertBefore(img, card.firstChild);
      };

      img.onerror = () => {
        loadingMsg.textContent = "Image failed to load. Please try refreshing.";
        loadingMsg.style.color = "red";
      };

      img.src = post.image;

      // Post content
      card.innerHTML += `
        <header>
          <h2><a href="detail.html?id=${post.id}">${post.title}</a></h2>
          <small>${new Date(post.createdAt).toLocaleDateString()} • ${post.category}</small>
        </header>
        <p>${post.body.slice(0, 100)}...</p>
        <footer><a href="detail.html?id=${post.id}">Read More</a></footer>
      `;

      // Add to DOM
      card.prepend(loadingMsg);
      container.appendChild(card);
    });

    renderPagination(filtered.length);
  }

  // Render pagination buttons
  function renderPagination(totalItems) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalItems / postsPerPage);

    const prev = document.createElement("li");
    prev.innerHTML = `<a href="#" class="secondary">Previous</a>`;
    prev.addEventListener("click", e => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        render();
      }
    });
    paginationContainer.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.innerHTML = i === currentPage
        ? `<strong>${i}</strong>`
        : `<a href="#">${i}</a>`;
      li.addEventListener("click", e => {
        e.preventDefault();
        currentPage = i;
        render();
      });
      paginationContainer.appendChild(li);
    }

    const next = document.createElement("li");
    next.innerHTML = `<a href="#" class="secondary">Next</a>`;
    next.addEventListener("click", e => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        render();
      }
    });
    paginationContainer.appendChild(next);
  }

  // Event listeners
  searchInput.addEventListener("input", () => {
    currentPage = 1;
    render();
  });

  sortSelect.addEventListener("change", () => {
    currentPage = 1;
    render();
  });

  categorySelect.addEventListener("change", () => {
    currentPage = 1;
    render();
  });

  // Load on start
  loadData();
});
