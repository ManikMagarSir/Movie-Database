import { useState, useEffect, useCallback } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieGrid from './components/MovieGrid'
import AddMovieForm from './components/AddMovieForm'
import MovieDetail from './components/MovieDetail'
import Watchlist from './components/Watchlist'
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import Register from './components/Register'
import { useAuth } from './context/AuthContext'
import { fetchMovies, createMovie } from './api/movies'
import { getWatchlist, toggleWatchlist } from './api/user'

function PrivateRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  return user ? children : <Navigate to="/login" />
}

function App() {
  const { user, loading: authLoading } = useAuth()
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

  useEffect(() => {
    if (user) {
      getWatchlist().then(setWatchlist).catch(() => setWatchlist([]))
    } else {
      setWatchlist([])
    }
  }, [user])

  const handleAddMovie = (form) => {
    createMovie(form)
      .then((newMovie) => {
        setMovies((prev) => [...prev, newMovie])
        navigate('/')
      })
      .catch((err) => alert(err.response?.data?.error || 'Failed to add movie'))
  }

  const handleToggleWatchlist = async (movieId) => {
    try {
      const updated = await toggleWatchlist(movieId)
      setWatchlist(updated)
    } catch {
      alert('Failed to update watchlist')
    }
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  if (authLoading) return null

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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/add-movie"
          element={
            <PrivateRoute>
              <AddMovieForm onAddMovie={handleAddMovie} />
            </PrivateRoute>
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
              onMovieUpdate={loadMovies}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <PrivateRoute>
              <Watchlist
                movies={movies}
                watchlist={watchlist}
                onToggleWatchlist={handleToggleWatchlist}
                searchQuery={searchQuery}
              >
                <SearchBar value={searchQuery} onChange={handleSearchChange} />
              </Watchlist>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
