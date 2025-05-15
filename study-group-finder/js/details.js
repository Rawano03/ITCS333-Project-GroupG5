import { fetchGroupById, addComment } from "./api.js";

function badge(text, cls = "") {
  return `<span class="badge ${cls}">${text}</span>`;
}
function memberCard(m) {
  return `
    <div class="member-card">
      <img src="${m.avatar || "/img/placeholder.png"}" alt="${
    m.name
  }" class="member-avatar">
      <div>
        <div class="member-name">${m.name}</div>
        <small class="member-role">${m.role}</small>
      </div>
    </div>`;
}
function commentBlock(c) {
  return `
    <div class="comment">
      <img src="/img/placeholder.png" alt="${c.author}" class="comment-avatar">
      <div class="comment-body">
        <div class="comment-author">${c.author}</div>
        <div class="comment-date">${new Date(
          c.created_at
        ).toLocaleDateString()}</div>
        <p>${c.comment_text}</p>
      </div>
    </div>`;
}

async function init() {
  const id = new URLSearchParams(location.search).get("id");
  const g = await fetchGroupById(id);
  if (!g) {
    alert("Group not found");
    return;
  }

  document.getElementById("group-name").textContent = g.name;
  const meta = document.getElementById("group-meta");
  meta.innerHTML =
    badge(g.subject, "subject-badge") +
    badge(`${g.members_count} members`, "members-badge") +
    badge(`Meets: ${g.meeting_times}`, "schedule-badge");

  document.getElementById("group-photo").src =
    g.photo_url || "/img/default.jpg";
  document.getElementById("group-description").textContent = g.description;

  document.getElementById("group-details").innerHTML = `
      <h3>Group Details</h3>
      <div class="detail-item"><b>Location:</b> ${g.location}</div>
      <div class="detail-item"><b>Current&nbsp;Focus:</b> ${
        g.current_focus || "—"
      }</div>
      <div class="detail-item"><b>Rules:</b>
        <ul>${g.rules.map((r) => `<li>${r.rule_text}</li>`).join("")}</ul>
      </div>`;

  document.getElementById("member-list").innerHTML = g.members
    .map(memberCard)
    .join("");

  const commentsList = document.getElementById("comments-list");
  commentsList.innerHTML = g.comments.map(commentBlock).join("");

  document
    .getElementById("post-comment")
    .addEventListener("click", async () => {
      const ta = document.getElementById("new-comment");
      const text = ta.value.trim();
      if (!text) return;
      try {
        const newCom = await addComment(g.id, text, 1); // hard-coded user 1
        commentsList.insertAdjacentHTML("afterbegin", commentBlock(newCom));
        ta.value = "";
      } catch (err) {
        alert("Failed to post comment: " + err.message);
      }
    });
}

window.addEventListener("DOMContentLoaded", init);
