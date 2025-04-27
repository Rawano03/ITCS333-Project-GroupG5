const API_URL = "https://680d0aabc47cb8074d8f5dc1.mockapi.io/Courses";

document.addEventListener("DOMContentLoaded", () => {
    const loadingSection = document.querySelector(".load");
    const contentSection = document.querySelector(".content");
    const searchInput = document.getElementById("search-bar");
    const filterSelect = document.getElementById("filter-list");
    const sortSelect = document.getElementById("sort-list");
    const pagesSection = document.querySelector(".pages");

    let courses = [];
    let filteredCourses = [];
    const inPage = 6;
    let currentPage = 1;

    async function fetchCourses() {
        loadingSection.style.display = 'block';
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error("Faild to fetch courses");
            }
            const data = await response.json();
            courses = data;
            applyFilters();
        }
        catch (error) {
            console.error('Fetch error: ', error);
            contentSection.innerHTML = '<p style="color: red">${error.message}</p>';
        }
        finally {
            loadingSection.style.display = 'none';
        }
    }

    function renderCourses(list) {
        contentSection.innerHTML = '';

        const start = (currentPage-1) * inPage;
        const end = start + inPage;
        const coursesInPage = list.slice(start, end);

        if (coursesInPage.length === 0) {
            contentSection.innerHTML = '<p style="margin-top: 100px;">No Courses Found</p>';
            return;
        }
        coursesInPage.forEach(course => {
            const article = document.createElement('article');
            article.innerHTML = '<h5>${cousre.code}</h5> <h6>${course.title}</h6> <p>${course.description}</p> <a href="#" role="button">View Notes</a>';
            contentSection.appendChild(article);
        });
    }

    function renderPages(list) {
        pagesSection.innerHTML = '';
        const total = Math.ceil(list.length / inPage);
        for (let i=1; i<=total; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = "#";
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add('secondary');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                renderCourses(filteredCourses);
                renderPages(filteredCourses);
            });
            pagesSection.appendChild(pageLink);
        }
    }

    function applyFilters() {
        const searchText = searchInput.value.toLowerCase();
        const selectedDepartment = filterSelect.value;
        const selectedSort = sortSelect.value;

        filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchText) || course.code.toLowerCase().includes(searchText);
            const matchesDepartment = selectedDepartment === "All" || course.department === selectedDepartment;
            return matchesSearch && matchesDepartment;
        });

        if (selectedSort === 'level') {
            filteredCourses.sort((a, b) => (a.level || 0) - (b.level || 0));
        }
        else if (selectedSort === 'name') {
            filteredCourses.sort((a, b) => a.title.localeCompare(b.title));
        }

        currentPage = 1;
        renderCourses(filteredCourses);
        renderPages(filteredCourses);
    }

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);

    fetchCourses();
});