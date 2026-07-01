import { Clapperboard, ListPlus, PlusCircle } from 'lucide-react'

function Navbar({ currentPage, onNavigate }) {
  const linkClass = (page) =>
    `font-medium motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900 rounded px-1 ${
      currentPage === page
        ? 'text-cinema-gold'
        : 'text-gray-400 hover:text-cinema-gold'
    }`

  return (
    <nav className="bg-cinema-900/90 backdrop-blur-md border-b border-cinema-700/50 sticky top-0 z-50" role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <button
          onClick={() => onNavigate('browse')}
          className="flex items-center gap-2 text-xl font-heading text-cinema-gold hover:text-cinema-gold-light motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900 rounded"
        >
          <Clapperboard className="w-6 h-6" aria-hidden="true" />
          CineVault
        </button>
        <div className="flex items-center gap-6">
          <button onClick={() => onNavigate('browse')} className={linkClass('browse')}>
            Browse
          </button>
          <button onClick={() => onNavigate('watchlist')} className={linkClass('watchlist')}>
            <span className="hidden sm:inline">Watchlist</span>
            <span className="sm:hidden"><ListPlus className="w-5 h-5" aria-hidden="true" /></span>
          </button>
          <button
            onClick={() => onNavigate('add-movie')}
            className="bg-cinema-gold text-black px-4 py-2 rounded-xl hover:bg-cinema-gold-light font-semibold motion-safe:transition-colors motion-safe:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cinema-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cinema-900 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Add Movie</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
