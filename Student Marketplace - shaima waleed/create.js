document.getElementById("create-form").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const name = document.getElementById("name").value.trim();
    const Price = document.getElementById("name").value.trim();
    const description = document.getElementById("description").value.trim();
  
    if (!name || !description || !Price ) {
      alert("Please fill in all fields");
      return;
    }
  
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const newProduct = {
      id: Date.now(), // unique ID
      name,
      Price ,
      description
    };
  
    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
  
    alert("Product added successfully!");
    window.location.href = "Marketplace.html"; // Redirect after save
  });
  