import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { MovieCardProps } from './props'

const ratingBadge = (avgRating) => {
  if (avgRating >= 8) return 'rating-gold'
  if (avgRating >= 5) return 'rating-silver'
  return 'rating-bronze'
}

const genreColors = {
  Drama: 'bg-cinema-700 text-cinema-gold-light',
  'Sci-Fi': 'bg-cinema-700 text-blue-400',
  Action: 'bg-cinema-700 text-cinema-red-light',
  Adventure: 'bg-cinema-700 text-emerald-400',
  Crime: 'bg-cinema-700 text-orange-400',
}

function MovieCard({ movie }) {
  const navigate = useNavigate()
  const badge = ratingBadge(movie.avgRating)
  const genreStyle = genreColors[movie.genre] || 'bg-cinema-700 text-gray-400'

  const handleClick = () => navigate(`/movie/${movie._id}`)
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      navigate(`/movie/${movie._id}`)
    }
  }

  const handleImgError = (e) => {
    const palettes = {
      'Sci-Fi': ['#0f0c29', '#302b63', '#24243e'],
      Crime: ['#1a1a2e', '#16213e', '#0f3460'],
      Thriller: ['#2d2d2d', '#1f1f1f', '#111111'],
      Adventure: ['#0d3b66', '#1a5e7a', '#2d8f9e'],
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

  return (
    <div
      className="group bg-cinema-800 rounded-2xl border border-cinema-gold/20 overflow-hidden cursor-pointer
                 motion-safe:transition-all motion-safe:duration-300 shadow-neon
                 hover:border-cinema-gold/40 hover:shadow-neon-lg
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900"
      tabIndex={0}
      role="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="h-48 bg-cinema-900 relative overflow-hidden">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          onError={handleImgError}
          className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-800/60 to-transparent" />
        {movie.avgRating > 0 && (
          <span className={`absolute top-3 right-3 ${badge} text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
            {movie.avgRating}
          </span>
        )}
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-base font-heading text-white font-semibold truncate leading-tight">{movie.title}</h3>
        <div className="flex items-center gap-2">
          <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${genreStyle}`}>
            {movie.genre}
          </span>
          <span className="text-sm text-gray-500">{movie.year}</span>
        </div>
      </div>
    </div>
  )
}

MovieCard.propTypes = MovieCardProps

export default memo(MovieCard)
