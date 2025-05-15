/* js/auth.js ------------------------------------------------------- */
const API = "/api";

async function post(path, body) {
  const res = await fetch(`${API}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || res.statusText);
  return json;
}

export async function register(data) {
  const out = await post("register", data);
  localStorage.setItem("user", JSON.stringify(out.user));
  return out.user;
}

export async function login(data) {
  const out = await post("login", data);
  localStorage.setItem("user", JSON.stringify(out.user));
  return out.user;
}

export async function logout() {
  await fetch(`${API}/logout`, { method: "DELETE" });
  localStorage.removeItem("user");
  location.href = "/login.html";
}
