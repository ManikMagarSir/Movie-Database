# 🎬 CineVault - MERN Movie Database & Review App
## Weekly Development Plan

> **Project Name:** CineVault
>
> **Tech Stack**
>
> - React (Vite)
> - Tailwind CSS
> - Node.js
> - Express.js
> - MongoDB Atlas
> - Mongoose
> - JWT Authentication
> - Gemini API
> - Axios
> - Git & GitHub
> - Netlify
> - Render

---

# Week 1 — Frontend Foundation

## Objective

Build the frontend foundation of CineVault using React, Vite, and Tailwind CSS while creating reusable UI components.

---

## Learning Goals

- Understand MERN architecture
- React project structure
- JSX
- Components
- Props
- Tailwind CSS
- Git workflow

---

## Tasks

### Project Setup

- Create React app using Vite
- Install Tailwind CSS
- Configure Tailwind
- Create Git repository
- Create `.gitignore`
- Push initial project to GitHub
- Create `dev` branch

---

### Folder Structure

```
src/
│
├── components/
│   ├── MovieCard.jsx
│   ├── MovieGrid.jsx
│   └── Navbar.jsx
│
├── pages/
│
├── assets/
│
├── App.jsx
└── main.jsx
```

---

### Build Components

#### Navbar

Navigation items:

- Browse
- Watchlist
- Add Movie

---

#### MovieCard

Display

- Poster placeholder
- Movie title
- Genre
- Release year
- Rating badge

Rating colors

| Rating | Color |
|----------|---------|
| 8+ | Green |
| 5–7.9 | Amber |
| <5 | Red |

---

#### MovieGrid

- Display five hardcoded movies
- Responsive grid layout

---

## Deliverable

- Responsive movie browsing page
- Reusable MovieCard component
- Responsive MovieGrid
- Navigation bar
- GitHub repository with dev branch

---

# Week 2 — React State & User Interaction

## Objective

Introduce dynamic state management and interactive movie features.

---

## Learning Goals

- useState
- useEffect
- Controlled forms
- State lifting
- Conditional rendering

---

## Tasks

### Movie State

Replace hardcoded rendering with

```javascript
const [movies, setMovies] = useState([]);
```

---

### Add Movie Form

Fields

- Title
- Genre
- Year
- Director
- Synopsis

Requirements

- Controlled inputs
- Validation
- Add movie to state

---

### Movie Detail

Clicking a movie should open

- Full synopsis
- Director
- Genre
- Cast list

---

### Watchlist

Maintain

```javascript
const [watchlist, setWatchlist] = useState([]);
```

Allow

- Add movie
- Remove movie

---

### Search

Implement live filtering

```
Search by title
```

---

### Dashboard Statistics

Using useEffect calculate

- Total movies
- Average rating

---

## Deliverable

Users can

- Add movies
- Search movies
- Expand movie details
- Manage watchlist
- View dashboard statistics

---

# Week 3 — Backend REST API

## Objective

Build a RESTful Express backend.

---

## Learning Goals

- Express
- REST API
- Routing
- Middleware
- HTTP methods
- Postman

---

## Setup

Create

```
server/
```

Install

```
express
cors
dotenv
nodemon
```

---

## Folder Structure

```
server/

controllers/
routes/
models/
config/

server.js
```

---

## API Endpoints

### GET

```
GET /api/movies
```

Return all movies.

---

### POST

```
POST /api/movies
```

Accept

```
title
genre
year
director
synopsis
```

---

### GET

```
GET /api/movies/:id
```

Return one movie.

---

### DELETE

```
DELETE /api/movies/:id
```

Delete movie.

---

### Testing

Use Postman for

- GET
- POST
- GET by ID
- DELETE

---

## Deliverable

Working REST API with CRUD functionality.

---

# Week 4 — MongoDB Integration

## Objective

Persist movie data using MongoDB Atlas.

---

## Learning Goals

- MongoDB Atlas
- Mongoose
- CRUD
- Axios
- CORS

---

## Database

Create Atlas Cluster

---

### Movie Schema

```javascript
{
    title,
    genre,
    year,
    director,
    synopsis,
    avgRating,
    reviews:[]
}
```

---

## Tasks

### Connect Express

- MongoDB Atlas
- Environment variables

---

### Replace Temporary Storage

Use MongoDB instead of arrays.

---

### Axios Integration

Frontend should fetch movies from backend.

---

### Filters

Support

```
GET /api/movies?genre=Action
```

---

### Search

Support

```
GET /api/movies?search=matrix
```

using title search.

---

## Deliverable

Movies stored permanently in MongoDB with filtering and search functionality.

---

# Week 5 — Authentication & Reviews

## Objective

Secure the application with JWT authentication and enable movie reviews.

---

## Learning Goals

- JWT
- bcrypt
- Protected routes
- Authentication middleware

---

## User Schema

```javascript
{
    name,
    email,
    password,
    watchlist:[movieIds]
}
```

---

## Authentication

Create

```
POST /register

POST /login
```

Features

- Password hashing
- JWT generation
- Token verification

---

## Protected Routes

Require login for

- Posting reviews
- Updating watchlist

---

## Reviews

```
POST /api/movies/:id/reviews
```

Accept

```javascript
{
    rating,
    comment
}
```

Automatically

- Save reviewer
- Update average rating

---

## React Pages

Create

- Login
- Register
- My Watchlist

---

## Deliverable

Users can

- Register
- Login
- Post reviews
- Maintain watchlist

---

# Week 6 — Deployment & CI/CD

## Objective

Deploy the application publicly.

---

## Learning Goals

- Render
- Netlify
- Environment variables
- GitHub Actions

---

## Backend

Deploy to Render.

Environment variables

```
MONGO_URI

JWT_SECRET
```

---

## Frontend

Deploy to Netlify.

Environment variable

```
VITE_API_URL
```

---

## Routing

Configure

```
_redirects
```

for React SPA routing.

---

## GitHub Actions

Create workflow

```
Build on every push to main
```

---

## End-to-End Testing

Verify complete flow

- Register
- Login
- Add movie
- Add review
- Watchlist
- Logout

---

## Deliverable

Publicly accessible CineVault application with automated deployment pipeline.

---

# Week 7 — AI Movie Recommendation System

## Objective

Integrate Gemini AI to provide personalized movie recommendations.

---

## Learning Goals

- Prompt engineering
- Gemini API
- Backend AI integration
- JSON parsing

---

## Setup

Generate Gemini API key.

Store

```
GEMINI_API_KEY
```

inside `.env`

---

## Backend Endpoint

Create

```
POST /api/ai/recommend
```

Input

- User watchlist
- Favourite genres

---

## Prompt

```
Based on this user's watchlist and favourite genres,
recommend three movies from our database they would enjoy.

Explain why each recommendation matches the user's interests.

Return ONLY valid JSON using this format:

[
  {
    "title": "...",
    "reason": "..."
  }
]
```

---

## Frontend

Watchlist page

Add

```
Recommend Me Something
```

button.

Display

- Loading spinner
- AI recommendations
- Recommendation reasons

---

## Documentation

Update README with

- Screenshots
- Deployment URLs
- Features
- Installation
- AI integration overview

---

## Deliverable

Fully functional AI-powered movie recommendation system integrated into the deployed CineVault application.

---

# Final Project Features

- Browse movie database
- Search movies
- Genre filtering
- Movie details page
- Add movies
- JWT Authentication
- User registration/login
- Watchlist management
- Movie reviews
- Automatic average rating calculation
- MongoDB persistence
- Responsive design
- AI-powered movie recommendations
- Live deployment
- CI/CD pipeline
- Professional README documentation

---

# Final Submission Checklist

- React frontend completed
- Express backend completed
- MongoDB Atlas connected
- JWT authentication working
- Review system functional
- Watchlist operational
- AI recommendation feature implemented
- Backend deployed (Render)
- Frontend deployed (Netlify)
- GitHub Actions configured
- Environment variables secured
- README completed with screenshots and deployment links

---
**Project Outcome:** A full-stack, production-ready MERN application demonstrating frontend development, backend APIs, database integration, authentication, deployment, CI/CD, and AI-powered movie recommendations.