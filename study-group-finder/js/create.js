import { createGroup } from "./api.js";

const form = document.querySelector("form.study-group-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fd = new FormData(form);
  const rulesArr = (fd.get("rules") || "")
    .split("\n")
    .map((r) => r.trim())
    .filter(Boolean);

  const payload = {
    name: fd.get("groupName"),
    subject: fd.get("subject"),
    description: fd.get("description"),
    location: fd.get("location"),
    meeting_times: fd.get("meetingTimes"),
    current_focus: fd.get("currentFocus") || null,
    max_members: fd.get("members") ? parseInt(fd.get("members"), 10) : null,
    photo_url: null,
    creator_id: 1,
    rules: rulesArr,
  };

  try {
    const { id } = await createGroup(payload);
    window.location.href = `/detail.html?id=${id}`;
  } catch (err) {
    alert("Error creating group: " + err.message);
  }
});
