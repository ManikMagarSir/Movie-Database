import { ArrowLeft, BookmarkPlus, BookmarkCheck } from 'lucide-react'

const genreColors = {
  Drama: 'text-cinema-gold-light',
  'Sci-Fi': 'text-blue-400',
  Action: 'text-cinema-red-light',
  Adventure: 'text-emerald-400',
  Crime: 'text-orange-400',
}

function MovieDetail({ movie, isInWatchlist, onToggleWatchlist, onBack }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-10" aria-label="Movie details">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-cinema-gold motion-safe:transition-colors motion-safe:duration-200 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Browse
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-72 shrink-0">
          <div className="bg-cinema-800 rounded-2xl border border-cinema-700/50 overflow-hidden">
            <img src={movie.poster} alt={`${movie.title} poster`} className="w-full h-96 object-cover" />
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-heading text-white font-bold">{movie.title}</h1>
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              <span className={`text-sm font-medium ${genreColors[movie.genre] || 'text-gray-400'}`}>
                {movie.genre}
              </span>
              <span className="text-sm text-gray-500">{movie.year}</span>
              {movie.rating > 0 && (
                <span className="bg-cinema-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                  {movie.rating}
                </span>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Director</h2>
            <p className="text-white">{movie.director}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Synopsis</h2>
            <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
          </div>

          {movie.cast && movie.cast.length > 0 && (
            <div>
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Cast</h2>
              <div className="flex flex-wrap gap-2">
                {movie.cast.map((actor) => (
                  <span key={actor} className="bg-cinema-700 text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={() => onToggleWatchlist(movie.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900 ${
              isInWatchlist
                ? 'bg-cinema-700 text-cinema-gold border border-cinema-gold/30'
                : 'bg-cinema-gold text-black hover:bg-cinema-gold-light'
            }`}
          >
            {isInWatchlist ? <BookmarkCheck className="w-5 h-5" /> : <BookmarkPlus className="w-5 h-5" />}
            {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
          </button>
        </div>
      </div>
    </section>
  )
}

export default MovieDetail
