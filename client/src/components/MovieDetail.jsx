import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, BookmarkPlus, BookmarkCheck, Star, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { addReview } from '../api/movies'

const genreColors = {
  Drama: 'text-cinema-gold-light',
  'Sci-Fi': 'text-blue-400',
  Action: 'text-cinema-red-light',
  Adventure: 'text-emerald-400',
  Crime: 'text-orange-400',
}

function MovieDetail({ movies, watchlist, onToggleWatchlist, onMovieUpdate }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const movie = movies.find((m) => m._id === id)
  const isInWatchlist = watchlist.some((w) => (w._id || w) === id)

  const [reviewRating, setReviewRating] = useState(8)
  const [reviewComment, setReviewComment] = useState('')
  const [reviewError, setReviewError] = useState(null)
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setReviewError(null)
    setSubmitting(true)
    try {
      await addReview(id, reviewRating, reviewComment)
      setReviewComment('')
      setReviewRating(8)
      setReviewSuccess(true)
      setTimeout(() => setReviewSuccess(false), 3000)
      if (onMovieUpdate) onMovieUpdate()
    } catch (err) {
      setReviewError(err.response?.data?.error || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

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

  const inputClass = "w-full bg-cinema-800 border border-cinema-700/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent motion-safe:transition-shadow motion-safe:duration-200"

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

          {user && (
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
          )}
        </div>
      </div>

      <div className="mt-12 border-t border-cinema-700/50 pt-8">
        <h2 className="text-2xl font-heading text-cinema-gold mb-6">Reviews ({movie.reviews?.length || 0})</h2>

        {movie.reviews && movie.reviews.length > 0 ? (
          <div className="space-y-4 mb-8">
            {movie.reviews.map((review, idx) => (
              <div key={idx} className="bg-cinema-800 rounded-xl border border-cinema-700/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{review.user?.name || 'Anonymous'}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-cinema-gold fill-cinema-gold" />
                    <span className="text-cinema-gold font-semibold text-sm">{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-8">No reviews yet. Be the first to review!</p>
        )}

        {user ? (
          <form onSubmit={handleSubmitReview} className="bg-cinema-800 rounded-xl border border-cinema-700/50 p-6 space-y-4">
            <h3 className="text-white font-medium">Write a Review</h3>

            {reviewError && (
              <div className="bg-cinema-red/10 border border-cinema-red/30 rounded-xl p-3 text-cinema-red-light text-sm">
                {reviewError}
              </div>
            )}

            {reviewSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-emerald-400 text-sm">
                Review submitted successfully!
              </div>
            )}

            <div>
              <label htmlFor="rating" className="block text-sm text-gray-400 mb-1.5">Rating: {reviewRating}/10</label>
              <input
                id="rating"
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full accent-cinema-gold"
              />
            </div>

            <div>
              <label htmlFor="comment" className="block text-sm text-gray-400 mb-1.5">Comment</label>
              <textarea
                id="comment"
                rows={3}
                placeholder="What did you think of this movie?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className={`${inputClass} resize-none`}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 bg-cinema-gold text-black px-5 py-2.5 rounded-xl font-semibold hover:bg-cinema-gold-light motion-safe:transition-colors motion-safe:duration-200 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        ) : (
          <div className="bg-cinema-800 rounded-xl border border-cinema-700/50 p-6 text-center">
            <p className="text-gray-500">
              <button onClick={() => navigate('/login')} className="text-cinema-gold hover:text-cinema-gold-light">Sign in</button>
              {' '}to leave a review.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default MovieDetail
