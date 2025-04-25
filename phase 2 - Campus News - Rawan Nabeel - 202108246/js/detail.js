const DETAIL_API = "https://jsonplaceholder.typicode.com/posts";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const container = document.getElementById("post-detail");

  if (!postId) {
    container.innerHTML = "<p>No post selected.</p>";
    return;
  }

  try {
    container.innerHTML = "<p>Loading post...</p>";

    const res = await fetch(`${DETAIL_API}/${postId}`);
    if (!res.ok) throw new Error("Post not found");

    const post = await res.json();

    // Generate custom fields for better UI
    const fakeCategory = ["events", "alerts", "announcements"][post.id % 3];
    const fakeTitle = `Campus Update #${post.id}`;
    const fakeBody = `This is the full news content for item #${post.id}. It covers detailed updates about the university campus, activities, or announcements.`;
    const fakeImage = `https://picsum.photos/seed/${post.id}/600/300`;
    const fakeDate = new Date();
    fakeDate.setDate(fakeDate.getDate() - post.id);

    // Build post HTML
    const article = document.createElement("article");

    // Loading message while image loads
    const loadingMsg = document.createElement("p");
    loadingMsg.textContent = "Loading image...";
    loadingMsg.style.color = "gray";

    // Image setup
    const img = new Image();
    img.alt = "News image";
    img.className = "news-image";

    img.onload = () => {
      loadingMsg.remove();
      article.insertBefore(img, article.firstChild);
    };

    img.onerror = () => {
      loadingMsg.textContent = "Image failed to load. Please try refreshing.";
      loadingMsg.style.color = "red";
    };

    img.src = fakeImage;

    // Build the content (without image)
    article.innerHTML += `
      <header>
        <h2>${fakeTitle}</h2>
        <p><small>${fakeDate.toLocaleDateString()} • Category: ${fakeCategory}</small></p>
      </header>
      <section><p>${fakeBody}</p></section>
      <hr />
      <section aria-label="Comments">
        <h3>Leave a Comment</h3>
        <form id="commentForm">
          <label for="comment">Comment</label>
          <textarea id="comment" rows="4" required placeholder="Write your comment here..."></textarea>
          <button type="submit">Post Comment</button>
        </form>
        <div class="comments" id="commentList"></div>
      </section>
    `;

    article.prepend(loadingMsg);
    container.innerHTML = "";
    container.appendChild(article);

    // Handle comments
    const form = document.getElementById("commentForm");
    const commentList = document.getElementById("commentList");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const comment = document.getElementById("comment").value.trim();
      if (comment.length < 3) {
        alert("Comment must be at least 3 characters.");
        return;
      }

      const commentEl = document.createElement("article");
      commentEl.innerHTML = `<p><strong>You:</strong> ${comment}</p>`;
      commentList.appendChild(commentEl);
      form.reset();
    });

  } catch (err) {
    container.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
  }
});
