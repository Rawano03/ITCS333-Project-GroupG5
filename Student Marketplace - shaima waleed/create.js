document.getElementById("create-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  const newProduct = {
    id: Date.now(),
    name,
    price,
    description,
    image: "img/default.jpg", // يمكن تغييره لاحقًا
    datePosted: new Date().toISOString(),
    postedBy: "You", 
    condition: "New"
  };

  const existingProducts = JSON.parse(localStorage.getItem("products")) || [];
  existingProducts.push(newProduct);
  localStorage.setItem("products", JSON.stringify(existingProducts));

  document.getElementById("success-message").style.display = "block";
  event.target.reset();
});
