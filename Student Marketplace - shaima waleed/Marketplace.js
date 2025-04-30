const productList = document.getElementById("product-list");
const loading = document.getElementById("loading");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const sortSelect = document.getElementById("sort-select");

let products = [];
let currentPage = 1;
const itemsPerPage = 4;

// Fetch data 
async function fetchProducts() {
  try {
    loading.style.display = "block";

    const localData = localStorage.getItem("products");
    if (localData) {
      products = JSON.parse(localData);
    } else {
      const response = await fetch("Student Marketplace - shaima waleed/marketplace-data.json");
      if (!response.ok) throw new Error("Failed to fetch data.");
      products = await response.json();
    }

    renderProducts();
  } catch (error) {
    productList.innerHTML = `<p>Error loading products: ${error.message}</p>`;
  } finally {
    loading.style.display = "none";
  }
}

// Filter and sort data
function getFilteredProducts() {
  let filtered = [...products];

  const searchTerm = searchInput.value.toLowerCase();
  const category = categorySelect.value;
  const sort = sortSelect.value;

  if (searchTerm) {
    filtered = filtered.filter(product =>
      product.title.toLowerCase().includes(searchTerm)
    );
  }

  if (category) {
    filtered = filtered.filter(product => product.category === category);
  }

  switch (sort) {
    case "price_low_high":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "price_high_low":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "latest":
    default:
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
  }

  return filtered;
}

// Render items per page
function renderProducts() {
  const filtered = getFilteredProducts();
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedItems = filtered.slice(start, end);

  productList.innerHTML = "";

  if (paginatedItems.length === 0) {
    productList.innerHTML = "<p>No items found.</p>";
    pagination.innerHTML = "";
    return;
  }

  paginatedItems.forEach(product => {
    const card = document.createElement("article");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.title}" style="max-width: 100%; border-radius: 8px;">
      <hr>
      <header>
        <h2><a href="DetailsPost.html#${product.id}">${product.title}</a></h2>
        <small>
          Posted by ${product.postedBy} • 
          <time datetime="${product.date}" class="custom-time">${new Date(product.date).toDateString()}</time>
          • Condition: ${product.condition}
        </small>
      </header>
      <footer>
        <a href="DetailsPost.html#${product.id}">View Item</a>
      </footer>
    `;
    productList.appendChild(card);
  });

  renderPagination(totalPages);
}

// Render pagination buttons
function renderPagination(totalPages) {
  pagination.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    if (i === currentPage) btn.classList.add("primary");
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });
    pagination.appendChild(btn);
  }
}

// Event listeners
searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderProducts();
});
categorySelect.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});
sortSelect.addEventListener("change", () => {
  currentPage = 1;
  renderProducts();
});

// Initial load
fetchProducts();