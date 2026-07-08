# CineVault — Movie Database & Review App

A full-stack MERN application for browsing movies, leaving ratings and reviews, managing watchlists, and receiving AI-powered recommendations.

## Structure

```
client/   — React + Vite frontend
server/   — Node.js + Express REST API
```

## Features

### Week 1 — Static Movie UI
- Responsive movie browsing grid with real poster images
- Movie cards with title, genre, release year, and color-coded rating badges
- Sticky navbar with Browse / Watchlist / Add Movie links
- Dark cinema theme (Space Grotesk + DM Sans, gold accents, glow shadows)
- Keyboard accessible with focus-visible rings and reduced-motion support

### Week 2 — State Management & Interactions
- Click a movie card to view full details (synopsis, cast, director)
- Add new movies via a controlled form (title, genre, year, director, synopsis)
- Live search bar filters movies by title as you type
- Personal watchlist — add/remove movies with dedicated page
- Dashboard stats: total movies and average rating via `useEffect`

### Week 3 — Backend REST API
- Express server with CORS, dotenv, and nodemon
- Controllers, routes, and models folder structure
- 5 REST endpoints: `GET /api/movies`, `GET /api/movies/:id`, `POST /api/movies`, `DELETE /api/movies/:id`
- In-memory movie store seeded with 5 movies
- Input validation on POST (all fields required)
- All endpoints tested with curl

## Getting Started

### Frontend

```bash
cd client
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

## Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS 3, Lucide React
- **Linting:** oxlint
- **Backend:** Node.js, Express.js
- **Auth (planned):** JWT, bcrypt
- **AI (planned):** Gemini API
- **Database (planned):** MongoDB Atlas
