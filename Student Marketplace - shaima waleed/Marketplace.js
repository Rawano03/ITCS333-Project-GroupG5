document.addEventListener("DOMContentLoaded", async () => {
  const API_URL = "http://127.0.0.1:3000/api/marketplace"
  const productList = document.getElementById("product-list")
  const loading = document.getElementById("loading")

  if (!productList || !loading) return

  loading.textContent = "Loading..."

  try {
    const res = await fetch(API_URL)

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    const products = await res.json()

    loading.style.display = "none"

    if (!Array.isArray(products) || products.length === 0) {
      productList.innerHTML = "<p>No items available.</p>"
      return
    }

    productList.innerHTML = products.map(product => `
      <div class='container' style="border: 1px solid #ccc; border-radius: 8px; padding: 8px; margin-top: 1rem;">
        <header>
          <h2><a href="detailspost.html?id=${product.id}">${product.title}</a></h2>
          <p><strong>Price:</strong> ${product.price} BHD</p>
          <small>
            Posted by ${product.posted_by} • 
            <time datetime="${product.date_posted}">${product.date_posted}</time> • 
            Status: ${product.status}
          </small>
        </header>
        <p>${product.description || ""}</p>
        <footer>
          <a href="detailspost.html?id=${product.id}" role="button">View</a>
        </footer>
              </div>  
    `).join("")
  } catch (err) {
    loading.style.display = "none"
    productList.innerHTML = `<p style="color:red;">${err.message}</p>`
  }
})
