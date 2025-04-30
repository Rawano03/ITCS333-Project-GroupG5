const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get("id"));

const products = JSON.parse(localStorage.getItem("products")) || [];
const product = products.find(p => p.id === id);

const container = document.getElementById("product-detail");

if (product) {
  container.innerHTML = `
    <h2>${product.name}</h2>
    <p>${product.description}</p>
  `;
} else {
  container.innerHTML = "<p>Product not found</p>";
}