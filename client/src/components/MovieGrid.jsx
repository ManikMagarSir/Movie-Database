import MovieCard from './MovieCard'
import shawshank from '../assets/posters/shawshank.jpg'
import inception from '../assets/posters/inception.jpg'
import darkKnight from '../assets/posters/dark-knight.jpg'
import interstellar from '../assets/posters/interstellar.jpg'
import pulpFiction from '../assets/posters/pulp-fiction.jpg'

const sampleMovies = [
  { id: 1, title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: 9.3, poster: shawshank },
  { id: 2, title: 'Inception', genre: 'Sci-Fi', year: 2010, rating: 8.8, poster: inception },
  { id: 3, title: 'The Dark Knight', genre: 'Action', year: 2008, rating: 9.0, poster: darkKnight },
  { id: 4, title: 'Interstellar', genre: 'Adventure', year: 2014, rating: 8.7, poster: interstellar },
  { id: 5, title: 'Pulp Fiction', genre: 'Crime', year: 1994, rating: 8.9, poster: pulpFiction },
]

function MovieGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-10" aria-label="Movie browsing grid">
      <h2 className="text-3xl font-heading text-cinema-gold mb-8 tracking-tight">Browse Movies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {sampleMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  )
}

export default MovieGrid
