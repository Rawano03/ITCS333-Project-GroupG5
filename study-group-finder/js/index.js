/* js/index.js
   ------------------------------------------------------------------ */
import { fetchGroups } from "./api.js";
import { applyFilters } from "./filters.js";
import { renderGroupCards, renderPagination } from "./ui.js";

let total = 0;
let currentPage = 1;
const perPage = 4;
const searchInput = document.querySelector('input[name="search"]');
const subjectSelect = document.querySelector("#subject");
const sortSelect = document.querySelector("#sort");

async function loadAndRender() {
  const serverResp = await fetchGroups({
    page: currentPage,
    perPage,
    search: searchInput.value,
    subject: subjectSelect.value === "all" ? "" : subjectSelect.value,
    sort: sortSelect.value,
  });

  total = serverResp.total;
  const filtered = applyFilters(serverResp.data, {
    search: "",
    subject: "all",
    sort: "newest",
  });

  renderGroupCards(filtered, 1, perPage);
  renderPagination(total, currentPage, perPage);
}

function setupListeners() {
  [searchInput, subjectSelect, sortSelect].forEach((el) =>
    el.addEventListener("change", () => {
      currentPage = 1;
      loadAndRender();
    })
  );

  document.querySelector(".pagination").addEventListener("click", (e) => {
    if (e.target.matches("a[data-page]")) {
      e.preventDefault();
      currentPage = +e.target.dataset.page;
      loadAndRender();
    }
  });
}

window.addEventListener("DOMContentLoaded", () => {
  setupListeners();
  loadAndRender();
});
