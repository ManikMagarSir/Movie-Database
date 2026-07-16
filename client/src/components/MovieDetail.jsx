import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookmarkPlus, BookmarkCheck } from 'lucide-react'
import { MovieDetailProps } from './props'

const genreColors = {
  Drama: 'text-cinema-gold-light',
  'Sci-Fi': 'text-blue-400',
  Action: 'text-cinema-red-light',
  Adventure: 'text-emerald-400',
  Crime: 'text-orange-400',
}

function MovieDetail({ movies, watchlist, onToggleWatchlist }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = movies.find((m) => m._id === id)
  const isInWatchlist = watchlist.includes(id)

  const handleImgError = (e) => {
    const palettes = {
      'Sci-Fi': ['#0f0c29', '#302b63', '#24243e'],
      Crime: ['#1a1a2e', '#16213e', '#0f3460'],
      Adventure: ['#0d3b66', '#1a5e7a', '#2d8f9e'],
      Thriller: ['#2d2d2d', '#1f1f1f', '#111111'],
      Comedy: ['#3d2e1a', '#5c4a2a', '#7a663a'],
      Horror: ['#1c0000', '#2d0505', '#3f0a0a'],
      Romance: ['#3d1a2e', '#5c2a4a', '#7a3a5c'],
      Action: ['#1a1a3d', '#2a2a5c', '#3a3a7a'],
      Drama: ['#1a2d1a', '#2a4a2a', '#3a6a3a'],
    }
    const [c1, c2, c3] = palettes[movie.genre] || ['#1a1a2e', '#16213e', '#0f3460']
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="50%" style="stop-color:${c2}"/><stop offset="100%" style="stop-color:${c3}"/></linearGradient></defs><rect width="400" height="600" fill="url(#g)"/><text x="200" y="290" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-size="28" font-family="sans-serif" font-weight="bold">${movie.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`
    e.target.src = `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  if (!movie) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 text-lg">Movie not found.</p>
        <button onClick={() => navigate('/')} className="mt-4 text-cinema-gold hover:text-cinema-gold-light">
          Back to Browse
        </button>
      </section>
    )
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10" aria-label="Movie details">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 text-gray-400 hover:text-cinema-gold motion-safe:transition-colors motion-safe:duration-200 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Browse
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-72 shrink-0">
          <div className="bg-cinema-800 rounded-2xl border border-cinema-700/50 overflow-hidden">
            <img src={movie.poster} alt={`${movie.title} poster`} onError={handleImgError} className="w-full h-96 object-cover" />
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
              {movie.avgRating > 0 && (
                <span className="bg-cinema-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                  {movie.avgRating}
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
            onClick={() => onToggleWatchlist(movie._id)}
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

MovieDetail.propTypes = MovieDetailProps

export default MovieDetail
