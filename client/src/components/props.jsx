import PropTypes from 'prop-types'

const MovieShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  poster: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  cast: PropTypes.arrayOf(PropTypes.string),
})

export const NavbarProps = {
  currentPage: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
}

export const MovieGridProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  totalMovies: PropTypes.number.isRequired,
}

export const MovieCardProps = {
  movie: MovieShape.isRequired,
  onMovieClick: PropTypes.func.isRequired,
}

export const AddMovieFormProps = {
  onAddMovie: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export const MovieDetailProps = {
  movie: MovieShape.isRequired,
  isInWatchlist: PropTypes.bool.isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
}

export const SearchBarProps = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export const WatchlistProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  onMovieClick: PropTypes.func.isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
}
