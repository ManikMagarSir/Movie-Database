# 🎬 CineVault – General Movie Database & Review App

A full-stack MERN application where users can browse movies, leave ratings and reviews, maintain a personal watchlist, and receive AI-powered movie recommendations.

## Tech Stack

* **Frontend:** React, Tailwind CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Authentication:** JWT, bcrypt
* **AI Integration:** Gemini API
* **Deployment:** Netlify, Render
* **Version Control:** Git & GitHub

---

# Week 1 – React Setup + Movie UI

## Topics Covered

* Web App Concepts
* MERN Stack Overview
* React Setup
* JSX Fundamentals
* Tailwind CSS Setup
* Git & GitHub Basics

## Workshop Tasks

### Project Setup

1. Initialize a React + Vite project.
2. Install and configure Tailwind CSS.
3. Create a Git repository.
4. Push project to GitHub.
5. Create a `dev` branch.
6. Configure `.gitignore`.

### UI Development

1. Build a `MovieCard` component displaying:

   * Movie Poster Placeholder
   * Title
   * Genre
   * Release Year
   * Rating Badge

2. Build a `MovieGrid` component displaying 5 hardcoded sample movies.

3. Create a Navbar with:

   * Browse
   * Watchlist
   * Add Movie

4. Implement color-coded rating badges:

   * **Green:** Rating ≥ 8
   * **Amber:** Rating 5–7.9
   * **Red:** Rating < 5

## Deliverable

Static movie browsing interface with movie cards, rating badges, and navigation.

---

# Week 2 – State Management + Movie Interactions

## Topics Covered

* useState
* useEffect
* Controlled Forms
* Lifting State

## Workshop Tasks

### Movie State

1. Store movie data using `useState`.
2. Render `MovieGrid` dynamically from state.

### Movie Management

1. Create `AddMovieForm` with controlled inputs:

   * Title
   * Genre
   * Year
   * Director
   * Synopsis

2. Add submitted movies to state.

### Movie Details

1. Clicking a movie opens a detailed view.
2. Display:

   * Full Synopsis
   * Cast List

### Watchlist

1. Add movie to watchlist.
2. Remove movie from watchlist.
3. Store watchlist in separate state.

### Search

1. Create a live search bar.
2. Filter movies by title as the user types.

### Dashboard Statistics

Use `useEffect` to calculate:

* Total Movies
* Average Rating

## Deliverable

Users can add, view, search, and watchlist movies entirely through React state.

---

# Week 3 – Backend REST API

## Topics Covered

* Node.js Setup
* Express.js
* REST API Design
* Postman Testing

## Workshop Tasks

### Backend Setup

1. Create `/server`.
2. Install:

   * express
   * cors
   * dotenv

### API Endpoints

#### Movies

```http
GET /api/movies
```

Returns all movies.

```http
POST /api/movies
```

Accepts:

```json
{
  "title": "",
  "genre": "",
  "year": "",
  "director": "",
  "synopsis": ""
}
```

```http
GET /api/movies/:id
```

Returns a single movie.

```http
DELETE /api/movies/:id
```

Deletes a movie.

### Testing

1. Test all endpoints using Postman.
2. Verify correct responses and status codes.

## Deliverable

Working REST API supporting movie CRUD operations.

---

# Week 4 – MongoDB Integration

## Topics Covered

* SQL vs NoSQL
* MongoDB Atlas
* Mongoose
* CRUD Operations
* Axios
* CORS

## Workshop Tasks

### Database Setup

1. Create a MongoDB Atlas cluster.
2. Create Movie schema:

```javascript
{
  title: String,
  genre: String,
  year: Number,
  director: String,
  synopsis: String,
  avgRating: Number,
  reviews: []
}
```

### API Integration

1. Connect Express API to MongoDB.
2. Replace hardcoded movie data.

### Frontend Integration

1. Connect React frontend using Axios.
2. Fetch movies from backend.

### Filtering & Search

#### Genre Filter

```http
GET /api/movies?genre=Action
```

#### Title Search

```http
GET /api/movies?search=matrix
```

## Deliverable

Movies persist in MongoDB and support filtering and search.

---

# Week 5 – Authentication + Reviews

## Topics Covered

* JWT Authentication
* bcrypt Password Hashing
* Middleware
* Protected Routes
* OAuth Basics

## Workshop Tasks

### User Schema

```javascript
{
  name: String,
  email: String,
  password: String,
  watchlist: [movieIds]
}
```

### Authentication

1. Register endpoint.
2. Login endpoint.
3. Hash passwords using bcrypt.
4. Generate JWT tokens.

### Authorization

Protect:

* Review routes
* Watchlist routes

### Reviews

#### Create Review

```http
POST /api/movies/:id/reviews
```

Request:

```json
{
  "rating": 9,
  "comment": "Excellent movie!"
}
```

Requirements:

* Must be authenticated.
* Associate review with logged-in user.

### Frontend Pages

1. Login Page
2. Register Page
3. My Watchlist Page

### Ratings

Automatically recalculate movie average rating whenever a review is added.

## Deliverable

Authenticated users can review movies and manage watchlists.

---

# Week 6 – Deployment + CI/CD

## Topics Covered

* Hosting
* Render
* Netlify
* GitHub Actions
* Environment Variables

## Workshop Tasks

### Environment Variables

Create:

```env
MONGO_URI=
JWT_SECRET=
```

Never commit `.env` files.

### Backend Deployment

1. Deploy API to Render.
2. Configure environment variables.

### Frontend Deployment

1. Deploy React app to Netlify.
2. Configure:

```env
VITE_API_URL=
```

### SPA Routing

Create `_redirects`:

```text
/* /index.html 200
```

### CI/CD

Create GitHub Actions workflow:

* Trigger on push to `main`
* Run build checks automatically

### End-to-End Testing

Verify:

1. Register User
2. Add Movie
3. Post Review
4. Add to Watchlist

## Deliverable

Fully deployed Movie Database application with automated CI pipeline.

---

# Week 7 – AI Integration (Movie Recommender)

## Topics Covered

* Prompt Engineering
* Google AI Studio
* Gemini API
* LLM Integration

## Workshop Tasks

### Gemini Setup

1. Generate Gemini API key.
2. Store in backend `.env`.

```env
GEMINI_API_KEY=
```

### AI Recommendation Endpoint

```http
POST /api/ai/recommend
```

### Input

```json
{
  "watchlist": [],
  "favoriteGenres": []
}
```

### Gemini Prompt

```text
Based on this user's watchlist and favourite genres,
recommend 3 movies from our database they would enjoy,
with reasons.

Return JSON only.
```

### Frontend Features

1. Add "Recommend Me Something" button.

2. Send watchlist and favorite genres to backend.

3. Display:

   * Recommended Movie
   * Reasoning
   * Similarity Explanation

4. Add loading spinner while recommendations are generated.

### Documentation

Update README with:

* Project Overview
* Screenshots
* Live URLs
* Installation Guide

## Deliverable

AI-powered movie recommendations integrated into CineVault.

---

# Final Project Outcome

## CineVault Features

### Movie Management

* Browse Movies
* Add Movies
* Delete Movies
* Search Movies
* Filter by Genre

### User Features

* Register/Login
* JWT Authentication
* Personal Watchlist
* Protected Actions

### Reviews & Ratings

* Create Reviews
* Average Rating Calculation
* User Review History

### AI Features

* Personalized Recommendations
* Gemini-Powered Suggestions
* Movie Reasoning Engine

### DevOps

* MongoDB Atlas
* Render Deployment
* Netlify Deployment
* GitHub Actions CI/CD

## Final Deliverable

**CineVault** — A fully deployed MERN Movie Database & Review Platform featuring user authentication, watchlists, reviews, ratings, and AI-powered movie recommendations.
