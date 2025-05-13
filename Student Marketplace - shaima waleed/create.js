document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://127.0.0.1:3000/api/marketplace"
  const form = document.getElementById("create-form")

  if (!form) {
    return
  }

  form.addEventListener("submit", async e => {
    e.preventDefault()

    const title = document.getElementById("name").value.trim()
    const price = parseFloat(document.getElementById("price").value)
    const description = document.getElementById("description").value.trim()

    if (!title || isNaN(price)) {
      alert("Please enter a valid name and price.")
      return
    }

    const newItem = {
      title: title,
      price: price,
      description: description,
      image: "img/default.jpg",
      posted_by: "You",
      status: "New",
      category: "other",
      date_posted: new Date().toISOString().split("T")[0]
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newItem)
      })

      if (!res.ok) {
        throw new Error("Failed to post item.")
      }

      document.getElementById("success-message").style.display = "block"
      form.reset()
    } catch (err) {
      alert("Error: " + err.message)
    }
  })
})