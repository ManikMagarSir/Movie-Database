import { memo } from 'react'

const ratingBadge = (rating) => {
  if (rating >= 8) return 'rating-gold'
  if (rating >= 5) return 'rating-silver'
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
  const badge = ratingBadge(movie.rating)
  const genreStyle = genreColors[movie.genre] || 'bg-cinema-700 text-gray-400'

  return (
    <div
      className="group bg-cinema-800 rounded-2xl border border-cinema-700/50 overflow-hidden cursor-pointer
                 motion-safe:transition-all motion-safe:duration-300
                 hover:border-cinema-gold/30 hover:shadow-glow
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900"
      tabIndex={0}
      role="button"
    >
      <div className="h-48 bg-cinema-900 relative overflow-hidden">
        <img
          src={movie.poster}
          alt={`${movie.title} poster`}
          loading="lazy"
          className="w-full h-full object-cover motion-safe:transition-transform motion-safe:duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-800/60 to-transparent" />
        <span className={`absolute top-3 right-3 ${badge} text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
          {movie.rating}
        </span>
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

export default memo(MovieCard)
