# Story-Nest
# Book Explorer SPA 

A dynamic, JavaScript-powered single-page application (SPA) for browsing books, adding personal notes, and managing favorites and liked books — powered by `json-server`.

##  Project Overview

This Book Explorer app lets users:

1. Browse and view books from a `json-server`-hosted database
2. Search by title, author, or genre (case-insensitive and symbol-tolerant)
3. Favorite and like individual books
4. View only favorites or liked books
5. Add and save personal notes (non-persistent memory only)

---

##  Features

###  Smart Search
- Case-insensitive
- Ignores punctuation and special characters
- Searches across book **title**, **author**, and **genre**

### ⭐ Favorites
- Click to toggle "★ Favorite" status
- Persistent via `localStorage`
- Toggle button to filter view: `Show All Books / Show Your Favorites`

### ❤️ Likes
- Click to toggle "❤️ Liked" status
- Persistent via `localStorage`
- Toggle button to filter view: `Show All Books / Show Liked Books`
- Includes feedback alert and console log

###  Notes (Memory Only)
- Add quick notes to any book
- Stored in memory only (not saved on page reload)
- Immediate feedback and alert confirmation

---

##  Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure and elements |
| CSS3 | Styling (assumed from `.book-item`, `.tooltip`, etc.) |
| JavaScript (ES6) | App logic and DOM manipulation |
| `json-server` | Mock REST API for book data |
| `localStorage` | Persistence for favorites and likes |

---

## 📁 Folder Structure

project-folder/
├── index.html
├── index.js
├── db.json # Sample books loaded via json-server
├── styles.css # Optional, assumed from classNames

---

##  Setup Instructions

### 1. Clone the repository

git clone https://github.com/cindy-kivala/story-nest.git
cd story-nest

2. Install and Run json-server
Ensure json-server is installed globally or in your project:

npm install -g json-server

# Start the server:
json-server --watch db.json --port 3000
The books will be available at: http://localhost:3000/books

3. Open index.html in your browser
You can use Live Server (VS Code extension) or just double-click the file.

# Design Goals
- Easy-to-use single-page interface

- Minimal dependencies (vanilla JS)

- Fast, local development using json-server

- Meaningful feedback for user actions (alerts, console logs)

- Flexible search with no strict requirements for punctuation or casing

# Known Limitations
1. Notes are not persistent (by design): they're memory-only

2. No backend integration — this is a front-end-only project

3. Image loading may depend on the formatting of the formats field in your book JSON

4. Only public domain books are available for use

#  Future Improvements
1. Convert note-saving to persistent storage

2. Add  further sorting ( Z-A,  popularity)

# Author
Cindy Kivala | Programmer | Bibliophile

# License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
