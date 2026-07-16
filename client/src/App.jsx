import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieGrid from './components/MovieGrid'
import AddMovieForm from './components/AddMovieForm'
import MovieDetail from './components/MovieDetail'
import Watchlist from './components/Watchlist'
import SearchBar from './components/SearchBar'
import { fetchMovies, createMovie } from './api/movies'

function App() {
  const [movies, setMovies] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const loadMovies = useCallback(() => {
    setLoading(true)
    fetchMovies(selectedGenre || undefined, searchQuery || undefined)
      .then(setMovies)
      .catch((err) => setError(err.response?.data?.error || 'Failed to fetch movies'))
      .finally(() => setLoading(false))
  }, [selectedGenre, searchQuery])

  useEffect(() => {
    const timer = setTimeout(loadMovies, 300)
    return () => clearTimeout(timer)
  }, [loadMovies])

  const handleAddMovie = (form) => {
    createMovie(form)
      .then((newMovie) => {
        setMovies((prev) => [...prev, newMovie])
        navigate('/')
      })
      .catch((err) => alert(err.response?.data?.error || 'Failed to add movie'))
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

  return (
    <div className="min-h-screen bg-cinema-900">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <MovieGrid
              movies={movies}
              totalMovies={movies.length}
              loading={loading}
              error={error}
              selectedGenre={selectedGenre}
              onGenreChange={setSelectedGenre}
            >
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
