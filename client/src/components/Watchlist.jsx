import { useNavigate } from 'react-router-dom'
import { Trash2, Clapperboard } from 'lucide-react'
import { WatchlistProps } from './props'

function Watchlist({ movies, watchlist, onToggleWatchlist, searchQuery, children }) {
  const navigate = useNavigate()
  const watchlistMovies = movies.filter(
    (m) => watchlist.includes(m._id) && m.title.toLowerCase().includes((searchQuery ?? '').toLowerCase())
  )

  return (
    <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Watchlist">
      <h2 className="text-3xl font-heading text-cinema-gold mb-8 tracking-tight">My Watchlist</h2>

      {children}

      {watchlistMovies.length === 0 ? (
        <div className="text-center mt-20">
          <Clapperboard className="w-16 h-16 text-cinema-700 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Your watchlist is empty.</p>
          <p className="text-gray-600 mt-1">Browse movies and add some to your watchlist!</p>
          <button
            onClick={() => navigate('/')}
            className="mt-6 bg-cinema-gold text-black px-6 py-3 rounded-xl font-semibold hover:bg-cinema-gold-light motion-safe:transition-colors motion-safe:duration-200"
          >
            Browse Movies
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {watchlistMovies.map((movie) => (
            <div key={movie._id} className="group relative bg-cinema-800 rounded-2xl border border-cinema-gold/20 overflow-hidden shadow-neon hover:shadow-neon-lg motion-safe:transition-shadow motion-safe:duration-300">
              <div
                className="cursor-pointer"
                onClick={() => navigate(`/movie/${movie._id}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    navigate(`/movie/${movie.id}`)
                  }
                }}
              >
                <div className="h-48 bg-cinema-900 relative overflow-hidden">
                  <img
                    src={movie.poster}
                    alt={`${movie.title} poster`}
                    loading="lazy"
                    className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-cinema-800/60 to-transparent" />
                </div>
                <div className="p-4 space-y-1.5">
                  <h3 className="text-sm font-heading text-white font-semibold truncate">{movie.title}</h3>
                  <p className="text-xs text-gray-500">{movie.year}</p>
                </div>
              </div>
              <button
                onClick={() => onToggleWatchlist(movie._id)}
                className="absolute top-3 right-3 bg-cinema-900/80 p-2 rounded-full text-cinema-red-light hover:bg-cinema-red/20 motion-safe:transition-colors motion-safe:duration-200"
                aria-label={`Remove ${movie.title} from watchlist`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

Watchlist.propTypes = WatchlistProps

export default Watchlist
