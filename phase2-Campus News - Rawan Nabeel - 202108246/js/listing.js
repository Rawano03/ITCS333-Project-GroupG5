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

  // Fetch data and modify it to match real-world UI
  async function loadData() {
    container.innerHTML = "<p>Loading...</p>";
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch posts.");
      const posts = await response.json();

      // Modify fake data: add readable titles, body, category, image
      allPosts = posts.map(post => ({
        ...post,
        category: ["events", "alerts", "announcements"][post.id % 3],
        title: `Campus Update #${post.id}`,
        body: `This is the summary for news item #${post.id}. It contains updates about the university campus.`,
        image: `https://picsum.photos/seed/${post.id}/400/200`
      }));

      render();
    } catch (err) {
      container.innerHTML = `<p style="color:red;">${err.message}</p>`;
    }
  }

  // Apply search, category, and sort filters
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

    if (sortType === "latest") result.reverse(); // JSONPlaceholder is oldest → newest by default

    return result;
  }

  // Get paginated results
  function getPage(list, page, perPage) {
    const start = (page - 1) * perPage;
    return list.slice(start, start + perPage);
  }

  // Render all visible posts + pagination
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
      card.innerHTML = `
        <img src="${post.image}" alt="News image" class="news-image" />
        <header>
          <h2><a href="detail.html?id=${post.id}">${post.title}</a></h2>
          <small>${new Date().toLocaleDateString()} • ${post.category}</small>
        </header>
        <p>${post.body.slice(0, 100)}...</p>
        <footer><a href="detail.html?id=${post.id}">Read More</a></footer>
      `;
      container.appendChild(card);
    });

    renderPagination(filtered.length);
  }

  // Render Previous / Page Numbers / Next
  function renderPagination(totalItems) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalItems / postsPerPage);

    // Previous
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

    // Page Numbers
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      if (i === currentPage) {
        li.innerHTML = `<strong>${i}</strong>`;
      } else {
        li.innerHTML = `<a href="#">${i}</a>`;
        li.addEventListener("click", e => {
          e.preventDefault();
          currentPage = i;
          render();
        });
      }
      paginationContainer.appendChild(li);
    }

    // Next
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

  // Re-render when filters change
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

  // Start
  loadData();
});
