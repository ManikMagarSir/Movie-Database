import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieGrid from './components/MovieGrid'
import AddMovieForm from './components/AddMovieForm'
import MovieDetail from './components/MovieDetail'
import Watchlist from './components/Watchlist'
import SearchBar from './components/SearchBar'

function App() {
  const [movies, setMovies] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/movies')
      .then((r) => {
        if (!r.ok) throw new Error('Backend not running')
        return r.json()
      })
      .then(setMovies)
      .catch((err) => console.error('Failed to fetch movies:', err))
  }, [])

  const handleAddMovie = (movie) => {
    fetch('/api/movies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(movie),
    })
      .then((r) => r.json())
      .then((newMovie) => setMovies((prev) => [...prev, newMovie]))
  }

  const handleToggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    )
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-cinema-900">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <MovieGrid movies={filteredMovies} totalMovies={movies.length}>
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </MovieGrid>
          }
        />
        <Route
          path="/add-movie"
          element={<AddMovieForm onAddMovie={handleAddMovie} />}
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              movies={movies}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              searchQuery={searchQuery}
            >
              <SearchBar value={searchQuery} onChange={handleSearchChange} />
            </Watchlist>
          }
        />
      </Routes>
    </div>
  )
}

export default App
