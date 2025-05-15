const BASE = "/api";
const GROUPS_ENDPOINT = `${BASE}/groups`;

async function json(res) {
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  return await res.json();
}

export async function fetchGroups({
  page = 1,
  perPage = 10,
  search = "",
  subject = "",
  sort = "newest",
} = {}) {
  const qs = new URLSearchParams({
    page,
    perPage,
    search,
    subject,
    sort,
  });
  const res = await fetch(`${GROUPS_ENDPOINT}?${qs}`);
  const { data, total } = await json(res);
  return { data, total };
}

export async function fetchGroupById(id) {
  if (!id) return null;
  const res = await fetch(`${GROUPS_ENDPOINT}/${id}`);
  if (res.status === 404) return null;
  return await json(res);
}

export async function createGroup(groupObj) {
  const res = await fetch(GROUPS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(groupObj),
  });
  return await json(res);
}

export async function updateGroup(id, updates) {
  const res = await fetch(`${GROUPS_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return await json(res); // { updated: n }
}

export async function deleteGroup(id) {
  const res = await fetch(`${GROUPS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
  return await json(res);
}

export async function joinGroup(groupId, userId) {
  const res = await fetch(`${BASE}/members`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ group_id: groupId, user_id: userId }),
  });
  await json(res);
  return true;
}

export async function leaveGroup(groupId, userId) {
  const res = await fetch(
    `${BASE}/members?group_id=${groupId}&user_id=${userId}`,
    { method: "DELETE" }
  );
  await json(res);
  return true;
}

export async function addComment(groupId, commentText, userId) {
  const res = await fetch(`${BASE}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      group_id: groupId,
      user_id: userId,
      comment_text: commentText,
    }),
  });
  return await json(res);
}
