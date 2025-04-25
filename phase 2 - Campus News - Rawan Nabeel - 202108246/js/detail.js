// Get single post data from JSONPlaceholder
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

    // Inject readable text and image
    const fakeCategory = ["events", "alerts", "announcements"][post.id % 3];
    const fakeTitle = `Campus Update #${post.id}`;
    const fakeBody = `This is the full news content for item #${post.id}. It contains more detailed updates about the university campus, student activities, and ongoing events.`;
    const fakeImage = `https://picsum.photos/seed/${post.id}/600/300`;

    // Render content
    container.innerHTML = `
      <article>
        <img src="${fakeImage}" alt="News Image" class="news-image" />
        <header>
          <h2>${fakeTitle}</h2>
          <p><small>${new Date().toLocaleDateString()} • Category: ${fakeCategory}</small></p>
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
      </article>
    `;

    // Handle comments (just locally displayed)
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
