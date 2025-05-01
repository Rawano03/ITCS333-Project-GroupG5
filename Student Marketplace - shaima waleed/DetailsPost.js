// detail.js

const products = [
    {
      id: "headphones",
      title: "Wireless Headphones",
      image: "img/headphones.jpg",
      postedBy: "Ali",
      date: "2025-04-12",
      condition: "Like New",
      category: "Electronics",
      price: "10 BHD",
      description: "Experience high-quality sound with these like-new wireless headphones. Perfect for daily use or studying in a quiet environment."
    },
    {
      id: "study-desk",
      title: "Study Desk",
      image: "img/study-desk.jpg",
      postedBy: "Sara",
      date: "2025-04-10",
      condition: "Good",
      category: "Furniture",
      price: "25 BHD",
      description: "Spacious and sturdy wooden desk, perfect for students. Ideal for study sessions and working from home."
    },
    {
      id: "textbook",
      title: "Used Textbooks Bundle",
      image: "img/textbooks.jpg",
      postedBy: "Fatima",
      date: "2025-04-09",
      condition: "Fair",
      category: "Books",
      price: "8 BHD",
      description: "A set of university textbooks for IT and Cybersecurity courses. Perfect for students looking for affordable textbooks."
    },
    {
      id: "Used-Laptop",
      title: "Used Laptop",
      image: "img/Used-Laptop.jpg",
      postedBy: "Khalid",
      date: "2025-04-08",
      condition: "Excellent",
      category: "Electronics",
      price: "230 BHD",
      description: "Apple laptop, almost brand new, perfect for studying and designing."
    },
    {
      id: "tablet",
      title: "Tablet",
      image: "img/tablet.jpg",
      postedBy: "Maryam",
      date: "2025-04-06",
      condition: "Like New",
      category: "Electronics",
      price: "140 BHD",
      description: "Wacom tablet used for digital art. Great for beginners and pros. Comes with pen and all accessories."
    }
  ];
  
  function getProductById(id) {
    return products.find(product => product.id === id);
  }
  
  function renderProduct(product) {
    const container = document.getElementById("product-detail");
  
    if (!product) {
      container.innerHTML = "<p>Product not found.</p>";
      return;
    }
  
    container.innerHTML = `
      <article>
        <header>
          <h1>${product.title}</h1>
          <img src="${product.image}" alt="${product.title}" style="max-width: 100%; border-radius: 8px;" />
          <hr />
          <p>Posted by ${product.postedBy} • 
            <time datetime="${product.date}" class="custom-time">
              ${new Date(product.date).toDateString()}
            </time>
          </p>
          <p>Condition: ${product.condition}</p>
          <p>Category: ${product.category}</p>
          <p>Price: ${product.price}</p>
        </header>
        <p>${product.description}</p>
      </article>
    `;
  }
  
  // Extract the ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  
  const product = getProductById(productId);
  renderProduct(product);
  