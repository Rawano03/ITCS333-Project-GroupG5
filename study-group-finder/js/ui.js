const listContainer = document.querySelector(".group-listings");
const paginationEl = document.querySelector(".pagination");

export function renderGroupCards(groups, page = 1, perPage = 4) {
  const start = (page - 1) * perPage;
  const pageItems = groups.slice(start, start + perPage);
  listContainer.innerHTML = pageItems
    .map(
      (g) => `
    <article class="group-card">
      <h2><a href="/detail.html?id=${g.id}">${g.name}</a></h2>
      <small>Created ${new Date(g.created).toLocaleDateString()} • ${
        g.subject
      } • ${g.members} members</small>
      <p>${g.description}</p>
      <div class="group-actions">
        <a href="/detail.html?id=${g.id}" class="secondary">Details</a>
        <button class="join-button">Join</button>
      </div>
    </article>
  `
    )
    .join("");
}

export function renderPagination(totalItems, currentPage = 1, perPage = 4) {
  const totalPages = Math.ceil(totalItems / perPage);
  let html = "";

  if (currentPage > 1) {
    html += `<li><a href="#" data-page="${currentPage - 1}">‹</a></li>`;
  }
  for (let p = 1; p <= totalPages; p++) {
    html += `<li>${
      p === currentPage
        ? `<strong>${p}</strong>`
        : `<a href="#" data-page="${p}">${p}</a>`
    }</li>`;
  }
  if (currentPage < totalPages) {
    html += `<li><a href="#" data-page="${currentPage + 1}">›</a></li>`;
  }

  paginationEl.innerHTML = html;
}
