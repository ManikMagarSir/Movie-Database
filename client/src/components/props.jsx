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

export const NavbarProps = {}

export const MovieGridProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  totalMovies: PropTypes.number.isRequired,
}

export const MovieCardProps = {
  movie: MovieShape.isRequired,
}

export const AddMovieFormProps = {
  onAddMovie: PropTypes.func.isRequired,
}

export const MovieDetailProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
}

export const SearchBarProps = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export const WatchlistProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
}
