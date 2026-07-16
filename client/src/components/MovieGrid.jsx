import MovieCard from './MovieCard'
import { MovieGridProps } from './props'

function MovieGrid({ movies, totalMovies, loading, error, children }) {
  if (loading) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Movie browsing grid">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Browse Movies</h2>
        </div>
        {children}
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-gold"></div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Movie browsing grid">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Browse Movies</h2>
        </div>
        {children}
        <div className="text-center py-20">
          <p className="text-cinema-red-light text-lg">{error}</p>
        </div>
      </section>
    )
  }

  const rated = movies.filter((m) => m.avgRating > 0)
  const avg = rated.length
    ? (rated.reduce((sum, m) => sum + m.avgRating, 0) / rated.length).toFixed(1)
    : 0

  return (
    <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Movie browsing grid">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Browse Movies</h2>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-gray-400">
            Total: <span className="text-white font-semibold">{totalMovies}</span>
          </div>
          <div className="text-gray-400">
            Avg Rating: <span className="text-cinema-gold font-semibold">{avg}</span>
          </div>
        </div>
      </div>

      {children}

      {movies.length === 0 ? (
        <p className="text-center text-gray-500 mt-16 text-lg">No movies found. Try a different search or add one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  )
}

MovieGrid.propTypes = MovieGridProps

export default MovieGrid
