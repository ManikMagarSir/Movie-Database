import { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import SearchBar from './SearchBar'
import { MovieGridProps } from './props'

function MovieGrid({ movies, onMovieClick, searchQuery, onSearchChange, totalMovies }) {
  const [stats, setStats] = useState({ total: 0, avgRating: 0 })

  useEffect(() => {
    const rated = movies.filter((m) => m.rating > 0)
    const avg = rated.length
      ? (rated.reduce((sum, m) => sum + m.rating, 0) / rated.length).toFixed(1)
      : 0
    setStats({ total: totalMovies, avgRating: avg })
  }, [movies, totalMovies])

  return (
    <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Movie browsing grid">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Browse Movies</h2>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-gray-400">
            Total: <span className="text-white font-semibold">{stats.total}</span>
          </div>
          <div className="text-gray-400">
            Avg Rating: <span className="text-cinema-gold font-semibold">{stats.avgRating}</span>
          </div>
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={onSearchChange} />

      {movies.length === 0 ? (
        <p className="text-center text-gray-500 mt-16 text-lg">No movies found. Try a different search or add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} onMovieClick={onMovieClick} />
          ))}
        </div>
      )}
    </section>
  )
}

MovieGrid.propTypes = MovieGridProps

export default MovieGrid
