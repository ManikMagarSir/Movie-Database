import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { AddMovieFormProps } from './props'

const genres = ['Drama', 'Sci-Fi', 'Action', 'Adventure', 'Crime', 'Comedy', 'Horror', 'Romance', 'Thriller']

function AddMovieForm({ onAddMovie, onCancel }) {
  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState(genres[0])
  const [year, setYear] = useState('')
  const [director, setDirector] = useState('')
  const [synopsis, setSynopsis] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !year.trim() || !director.trim() || !synopsis.trim()) return
    onAddMovie({ title: title.trim(), genre, year: Number(year), director: director.trim(), synopsis: synopsis.trim(), cast: [] })
  }

  const inputClass = "w-full bg-cinema-800 border border-cinema-700/50 rounded-xl py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent motion-safe:transition-shadow motion-safe:duration-200"

  return (
    <section className="max-w-2xl mx-auto px-4 py-10" aria-label="Add movie form">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-cinema-gold motion-safe:transition-colors motion-safe:duration-200"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-heading text-cinema-gold tracking-tight">Add Movie</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-400 mb-1.5">Title</label>
          <input id="title" type="text" placeholder="e.g. The Matrix" value={title} onChange={(e) => setTitle(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-400 mb-1.5">Genre</label>
          <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className={inputClass}>
            {genres.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-400 mb-1.5">Year</label>
          <input id="year" type="number" placeholder="e.g. 1999" value={year} onChange={(e) => setYear(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <label htmlFor="director" className="block text-sm font-medium text-gray-400 mb-1.5">Director</label>
          <input id="director" type="text" placeholder="e.g. The Wachowskis" value={director} onChange={(e) => setDirector(e.target.value)} className={inputClass} required />
        </div>

        <div>
          <label htmlFor="synopsis" className="block text-sm font-medium text-gray-400 mb-1.5">Synopsis</label>
          <textarea id="synopsis" rows={4} placeholder="Brief description of the movie..." value={synopsis} onChange={(e) => setSynopsis(e.target.value)} className={`${inputClass} resize-none`} required />
        </div>

        <button
          type="submit"
          className="w-full bg-cinema-gold text-black py-3 rounded-xl font-semibold hover:bg-cinema-gold-light motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900"
        >
          Add Movie
        </button>
      </form>
    </section>
  )
}

AddMovieForm.propTypes = AddMovieFormProps

export default AddMovieForm
