document.addEventListener('DOMContentLoaded', () => {
  const API_BASE = 'index.php'
  const itemsContainer = document.getElementById('marketplace-items')
  const form = document.getElementById('item-creation-form')

  if (itemsContainer) {
    fetchItems()
  }

  if (form) {
    form.addEventListener('submit', handleSubmit)
  }

  function fetchItems() {
    fetch(API_BASE)
      .then(response => response.json())
      .then(data => {
        itemsContainer.innerHTML = ''
        data.forEach(item => {
          const itemElement = createItemCard(item)
          itemsContainer.appendChild(itemElement)
        })
      })
      .catch(error => console.error('Error fetching items:', error))
  }

  function createItemCard(item) {
    const div = document.createElement('div')
    div.className = 'marketplace-item'
    div.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <p>Price: $${item.price}</p>
      <p>Status: ${item.status}</p>
      <p>Posted by: ${item.posted_by}</p>
      <p>Date: ${item.date_posted}</p>
    `
    return div
  }

  function handleSubmit(e) {
    e.preventDefault()

    const title = document.getElementById('title').value
    const price = document.getElementById('price').value
    const description = document.getElementById('description').value
    const image = document.getElementById('image').value || 'img/default.jpg'
    const posted_by = document.getElementById('posted_by').value
    const status = document.getElementById('status').value
    const category = document.getElementById('category').value
    const date_posted = document.getElementById('date_posted').value

    const newItem = {
      title,
      price,
      description,
      image,
      posted_by,
      status,
      category,
      date_posted
    }

    fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
      .then(res => res.json())
      .then(response => {
        alert('Item posted successfully!')
        form.reset()
        fetchItems()
      })
      .catch(err => {
        console.error('Submission error:', err)
        alert('Failed to post item')
      })
  }
})