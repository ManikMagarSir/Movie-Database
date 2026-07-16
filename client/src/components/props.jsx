import PropTypes from 'prop-types'

const MovieShape = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  avgRating: PropTypes.number.isRequired,
  poster: PropTypes.string,
  director: PropTypes.string.isRequired,
  synopsis: PropTypes.string.isRequired,
  cast: PropTypes.arrayOf(PropTypes.string),
})

export const NavbarProps = {}

export const MovieGridProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  totalMovies: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  children: PropTypes.node,
}

export const MovieCardProps = {
  movie: MovieShape.isRequired,
}

export const AddMovieFormProps = {
  onAddMovie: PropTypes.func.isRequired,
}

export const MovieDetailProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
}

export const SearchBarProps = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export const WatchlistProps = {
  movies: PropTypes.arrayOf(MovieShape).isRequired,
  watchlist: PropTypes.arrayOf(PropTypes.string).isRequired,
  onToggleWatchlist: PropTypes.func.isRequired,
  searchQuery: PropTypes.string,
  children: PropTypes.node,
}
