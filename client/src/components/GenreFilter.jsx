const genres = ['Drama', 'Sci-Fi', 'Action', 'Adventure', 'Crime', 'Comedy', 'Horror', 'Romance', 'Thriller']

function GenreFilter({ selected, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onChange('')}
        className={`px-4 py-2 rounded-xl text-sm font-medium motion-safe:transition-colors motion-safe:duration-200 ${
          selected === ''
            ? 'bg-cinema-gold text-black'
            : 'bg-cinema-800 text-gray-400 border border-cinema-700/50 hover:border-cinema-gold/30'
        }`}
      >
        All
      </button>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={`px-4 py-2 rounded-xl text-sm font-medium motion-safe:transition-colors motion-safe:duration-200 ${
            selected === genre
              ? 'bg-cinema-gold text-black'
              : 'bg-cinema-800 text-gray-400 border border-cinema-700/50 hover:border-cinema-gold/30'
          }`}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}

export default GenreFilter
