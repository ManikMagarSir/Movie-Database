import { Search } from 'lucide-react'
import { SearchBarProps } from './props'

function SearchBar({ value, onChange }) {
  return (
    <div className="relative mb-8 max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" aria-hidden="true" />
      <input
        type="text"
        placeholder="Search movies by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-cinema-800 border border-cinema-gold/20 rounded-xl py-3 pl-11 pr-4 text-white placeholder-gray-500
                   shadow-neon
                   focus:outline-none focus:ring-2 focus:ring-cinema-gold focus:border-transparent focus:shadow-neon-lg
                   motion-safe:transition-shadow motion-safe:duration-200"
        aria-label="Search movies"
      />
    </div>
  )
}

SearchBar.propTypes = SearchBarProps

export default SearchBar
