````markdown
# Campus Hub – Study-Group Finder (Phase 3)

Frontend: plain HTML + Pico CSS + vanilla JS  
Backend: PHP 8 + PDO + MySQL

---

## 1. Quick start (local)

```bash
# 1 – clone
git clone <repo-url>
cd study-group-finder

# 2 – import database
mysql -u root -p < backend/schema.sql
mysql -u root -p -e "INSERT INTO campus_hub.users (username,email,password_hash)
                     VALUES ('demo','demo@example.com','x');"

# 3 – tell PHP how to reach MySQL
export DB_HOST=127.0.0.1
export DB_NAME=campus_hub
export DB_USER=root
export DB_PASS=<your-password>

# 4 – run everything (static files + API)
php -S 127.0.0.1:8000 router.php
```
````

Open **[http://127.0.0.1:8000](http://127.0.0.1:8000)**

---

## 2. API summary

| Verb     | Path               | Purpose                                       |
| -------- | ------------------ | --------------------------------------------- |
| `GET`    | `/api/groups`      | list `?page=1&perPage=10&search=&subject=`    |
| `GET`    | `/api/groups/{id}` | one group + rules + members + comments        |
| `POST`   | `/api/groups`      | create group _(JSON body, see below)_         |
| `PUT`    | `/api/groups/{id}` | update any field                              |
| `DELETE` | `/api/groups/{id}` | delete group                                  |
| `POST`   | `/api/comments`    | add comment `{group_id,user_id,comment_text}` |
| `POST`   | `/api/register`    | create user `{username,email,password}`       |
| `POST`   | `/api/login`       | login `{username,password}`                   |
| `DELETE` | `/api/logout`      | log out (clears session)                      |

### Sample create-group request

```http
POST /api/groups
Content-Type: application/json

{
  "name": "Physics II Crash-Course",
  "subject": "Science",
  "description": "Weekly problem-solving before finals",
  "location": "Library Room 2",
  "meeting_times": "Sat 10-12",
  "current_focus": "Optics",
  "max_members": 8,
  "photo_url": null,
  "creator_id": 1,
  "rules": ["Be on time", "Bring notes"]
}
```

Success → `201 Created`

```json
{ "id": 7 }
```

---

## 3. Frontend

- **index.html** – lists groups with search / filter / pagination
- **create.html** – form, posts to `/api/groups`
- **detail.html** – fetches `/api/groups/{id}` , can post comments
- **login.html / register.html** – simple auth forms
- Header auto-shows “Hello, user | Log out” when logged in.

User data is stored in `localStorage`; logout calls `DELETE /api/logout` then clears storage.
