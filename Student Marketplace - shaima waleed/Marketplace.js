const products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("product-list");

products.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";
  card.innerHTML = `
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <a href="detail.html?id=${product.id}">View Details</a>
  `;
  container.appendChild(card);
});