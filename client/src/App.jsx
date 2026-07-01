import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import MovieGrid from './components/MovieGrid'
import AddMovieForm from './components/AddMovieForm'
import MovieDetail from './components/MovieDetail'
import Watchlist from './components/Watchlist'
import shawshank from './assets/posters/shawshank.jpg'
import inception from './assets/posters/inception.jpg'
import darkKnight from './assets/posters/dark-knight.jpg'
import interstellar from './assets/posters/interstellar.jpg'
import pulpFiction from './assets/posters/pulp-fiction.jpg'
import matrix from './assets/posters/matrix.jpg'
import goodfellas from './assets/posters/goodfellas.jpg'
import godfather from './assets/posters/godfather.jpg'
import parasite from './assets/posters/parasite.jpg'
import spiritedAway from './assets/posters/spirited-away.jpg'
import grandBudapest from './assets/posters/grand-budapest.jpg'
import shining from './assets/posters/the-shining.jpg'
import eternalSunshine from './assets/posters/eternal-sunshine.jpg'
import madMax from './assets/posters/mad-max.jpg'
import getOut from './assets/posters/get-out.jpg'

const initialMovies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    genre: 'Drama',
    year: 1994,
    rating: 9.3,
    poster: shawshank,
    director: 'Frank Darabont',
    synopsis: 'Over the course of several years, two convicts form a friendship, seeking consolation and, eventually, redemption through basic compassion.',
    cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton', 'William Sadler', 'Clancy Brown'],
  },
  {
    id: 2,
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating: 8.8,
    poster: inception,
    director: 'Christopher Nolan',
    synopsis: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy', 'Ken Watanabe'],
  },
  {
    id: 3,
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    rating: 9.0,
    poster: darkKnight,
    director: 'Christopher Nolan',
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Gary Oldman', 'Michael Caine'],
  },
  {
    id: 4,
    title: 'Interstellar',
    genre: 'Adventure',
    year: 2014,
    rating: 8.7,
    poster: interstellar,
    director: 'Christopher Nolan',
    synopsis: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot is tasked with piloting a spacecraft along with a team of researchers to find a new planet for humans.",
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Bill Irwin', 'Michael Caine'],
  },
  {
    id: 5,
    title: 'Pulp Fiction',
    genre: 'Crime',
    year: 1994,
    rating: 8.9,
    poster: pulpFiction,
    director: 'Quentin Tarantino',
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson', 'Bruce Willis', 'Tim Roth'],
  },
  {
    id: 6,
    title: 'The Matrix',
    genre: 'Sci-Fi',
    year: 1999,
    rating: 8.7,
    poster: matrix,
    director: 'Lana Wachowski, Lilly Wachowski',
    synopsis: 'A computer hacker learns about the true nature of his reality and his role in the war against its controllers.',
    cast: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss', 'Hugo Weaving', 'Joe Pantoliano'],
  },
  {
    id: 7,
    title: 'Goodfellas',
    genre: 'Crime',
    year: 1990,
    rating: 8.7,
    poster: goodfellas,
    director: 'Martin Scorsese',
    synopsis: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife and his mob partners.',
    cast: ['Robert De Niro', 'Ray Liotta', 'Joe Pesci', 'Lorraine Bracco', 'Paul Sorvino'],
  },
  {
    id: 8,
    title: 'The Godfather',
    genre: 'Crime',
    year: 1972,
    rating: 9.2,
    poster: godfather,
    director: 'Francis Ford Coppola',
    synopsis: 'The aging patriarch of an organized crime dynasty transfers control to his reluctant son.',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall', 'Diane Keaton'],
  },
  {
    id: 9,
    title: 'Parasite',
    genre: 'Thriller',
    year: 2019,
    rating: 8.5,
    poster: parasite,
    director: 'Bong Joon-ho',
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik', 'Park So-dam'],
  },
  {
    id: 10,
    title: 'Spirited Away',
    genre: 'Adventure',
    year: 2001,
    rating: 8.6,
    poster: spiritedAway,
    director: 'Hayao Miyazaki',
    synopsis: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.",
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki', 'Takashi Naitō', 'Yasuko Sawaguchi'],
  },
  {
    id: 11,
    title: 'The Grand Budapest Hotel',
    genre: 'Comedy',
    year: 2014,
    rating: 8.1,
    poster: grandBudapest,
    director: 'Wes Anderson',
    synopsis: 'A writer encounters the owner of an aging high-class hotel, who tells him of his early years as a lobby boy in the hotel under the exceptional concierge.',
    cast: ['Ralph Fiennes', 'F. Murray Abraham', 'Mathieu Amalric', 'Adrien Brody', 'Willem Dafoe'],
  },
  {
    id: 12,
    title: 'The Shining',
    genre: 'Horror',
    year: 1980,
    rating: 8.4,
    poster: shining,
    director: 'Stanley Kubrick',
    synopsis: 'A family heads to an isolated hotel for the winter where a sinister presence influences the father into violence.',
    cast: ['Jack Nicholson', 'Shelley Duvall', 'Danny Lloyd', 'Scatman Crothers', 'Barry Nelson'],
  },
  {
    id: 13,
    title: 'Eternal Sunshine of the Spotless Mind',
    genre: 'Romance',
    year: 2004,
    rating: 8.3,
    poster: eternalSunshine,
    director: 'Michel Gondry',
    synopsis: 'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
    cast: ['Jim Carrey', 'Kate Winslet', 'Tom Wilkinson', 'Kirsten Dunst', 'Mark Ruffalo'],
  },
  {
    id: 14,
    title: 'Mad Max: Fury Road',
    genre: 'Action',
    year: 2015,
    rating: 8.1,
    poster: madMax,
    director: 'George Miller',
    synopsis: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners and a drifter.",
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult', 'Hugh Keays-Byrne', 'Josh Helman'],
  },
  {
    id: 15,
    title: 'Get Out',
    genre: 'Horror',
    year: 2017,
    rating: 7.7,
    poster: getOut,
    director: 'Jordan Peele',
    synopsis: 'A young African-American visits his white girlfriend\'s parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.',
    cast: ['Daniel Kaluuya', 'Allison Williams', 'Bradley Whitford', 'Catherine Keener', 'LilRel Howery'],
  },
]

let nextId = 6

function App() {
  const [movies, setMovies] = useState(initialMovies)
  const [watchlist, setWatchlist] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const placeholderPoster = (title, genre) => {
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
    const [c1, c2, c3] = palettes[genre] || ['#1a1a2e', '#16213e', '#0f3460']
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="600"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${c1}"/><stop offset="50%" style="stop-color:${c2}"/><stop offset="100%" style="stop-color:${c3}"/></linearGradient></defs><rect width="400" height="600" fill="url(#g)"/><text x="200" y="290" text-anchor="middle" fill="rgba(255,255,255,0.12)" font-size="28" font-family="sans-serif" font-weight="bold">${title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text></svg>`
    return `data:image/svg+xml,${encodeURIComponent(svg)}`
  }

  const handleAddMovie = (movie) => {
    const poster = placeholderPoster(movie.title, movie.genre)
    setMovies((prev) => [...prev, { ...movie, poster, id: nextId++, rating: 0 }])
    navigate('/')
  }

  const handleToggleWatchlist = (movieId) => {
    setWatchlist((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    )
  }

  const handleSearchChange = (query) => {
    setSearchQuery(query)
  }

  const filteredMovies = movies.filter((m) =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-cinema-900">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <MovieGrid
              movies={filteredMovies}
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              totalMovies={movies.length}
            />
          }
        />
        <Route
          path="/add-movie"
          element={<AddMovieForm onAddMovie={handleAddMovie} />}
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetail
              movies={movies}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          }
        />
        <Route
          path="/watchlist"
          element={
            <Watchlist
              movies={movies}
              watchlist={watchlist}
              onToggleWatchlist={handleToggleWatchlist}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
