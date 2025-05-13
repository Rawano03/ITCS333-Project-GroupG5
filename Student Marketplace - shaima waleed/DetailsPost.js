document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://127.0.0.1:3000/api/marketplace"
  const productList = document.getElementById("product-list")
  const loading = document.getElementById("loading")
  const pagination = document.getElementById("pagination")

  let products = []
  let currentPage = 1
  const itemsPerPage = 4

  async function fetchProducts() {
    loading.style.display = "block"

    try {
      const res = await fetch(API_URL)
      if (!res.ok) throw new Error("Failed to fetch products")

      const data = await res.json()
      products = data
      renderProducts()
    } catch (err) {
      productList.innerHTML = `<p>Error: ${err.message}</p>`
    } finally {
      loading.style.display = "none"
    }
  }

  function renderProducts() {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    const paginated = products.slice(start, end)

    productList.innerHTML = ""

    if (paginated.length === 0) {
      productList.innerHTML = "<p>No items found.</p>"
      pagination.innerHTML = ""
      return
    }

    paginated.forEach(product => {
      const card = document.createElement("article")
      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style="max-width: 100%; border-radius: 8px;">
        <hr>
        <header>
          <h2><a href="detailpost.html?id=${product.id}">${product.title}</a></h2>
          <small>
            Posted by ${product.posted_by} •
            <time datetime="${product.date_posted}">${product.date_posted}</time>
            • Status: ${product.status}
          </small>
        </header>
        <footer>
          <a href="detailpost.html?id=${product.id}">View Item</a>
        </footer>
      `
      productList.appendChild(card)
    })

    renderPagination(Math.ceil(products.length / itemsPerPage))
  }

  function renderPagination(totalPages) {
    pagination.innerHTML = ""
    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button")
      btn.textContent = i
      if (i === currentPage) btn.classList.add("primary")
      btn.addEventListener("click", () => {
        currentPage = i
        renderProducts()
      })
      pagination.appendChild(btn)
    }
  }

  fetchProducts()
})