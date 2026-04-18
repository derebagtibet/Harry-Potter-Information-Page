import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useFavourites } from '../context/FavouritesContext'

const navLinks = [
  { to: '/',           label: 'Home',       icon: '🏰', end: true },
  { to: '/characters', label: 'Characters', icon: '🧙' },
  { to: '/books',      label: 'Books',      icon: '📚' },
  { to: '/spells',     label: 'Spells',     icon: '🪄' },
  { to: '/houses',     label: 'Houses',     icon: '⚡' },
  { to: '/quiz',       label: 'Sorting Hat',icon: '🎩' },
  { to: '/compare',    label: 'Duel',       icon: '⚔️' },
  { to: '/spell-duel', label: 'Spell duel', icon: '✨' },
  { to: '/map',        label: 'Map',        icon: '🗺️' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { favourites } = useFavourites()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-hp-darker/95 backdrop-blur-md border-b border-hp-gold/20 shadow-dark'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <span className="text-2xl candle-flame">🕯️</span>
            <div>
              <span className="font-display text-sm md:text-base text-gold-shimmer tracking-widest leading-none block" style={{ letterSpacing: '0.2em' }}>
                HOGWARTS
              </span>
              <span className="font-heading text-xs text-hp-gold/60 tracking-[0.3em] uppercase">
                Archives
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ to, label, icon, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-2 rounded font-heading text-xs tracking-wider transition-all duration-300 btn-spell ${
                      isActive
                        ? 'text-hp-gold border border-hp-gold/40 bg-hp-gold/10 shadow-gold'
                        : 'text-hp-parchment/70 hover:text-hp-gold border border-transparent hover:border-hp-gold/20'
                    }`
                  }
                >
                  <span>{icon}</span>
                  {label}
                </NavLink>
              </li>
            ))}

            {/* Favourites icon */}
            <li>
              <NavLink
                to="/favourites"
                className={({ isActive }) =>
                  `relative flex items-center gap-1.5 px-3 py-2 rounded font-heading text-xs tracking-wider transition-all duration-300 btn-spell ${
                    isActive
                      ? 'text-hp-gold border border-hp-gold/40 bg-hp-gold/10'
                      : 'text-hp-parchment/70 hover:text-hp-gold border border-transparent hover:border-hp-gold/20'
                  }`
                }
              >
                ❤️ Favs
                {favourites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center font-mono leading-none">
                    {favourites.length > 9 ? '9+' : favourites.length}
                  </span>
                )}
              </NavLink>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-hp-gold p-2 rounded border border-hp-gold/20"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-hp-gold transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-hp-gold transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-hp-gold transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 border-t border-hp-gold/20 mt-2">
            <ul className="flex flex-col gap-1 pt-3">
              {[...navLinks, { to: '/favourites', label: `Favourites (${favourites.length})`, icon: '❤️' }].map(({ to, label, icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded font-heading text-sm tracking-wider transition-all ${
                        isActive
                          ? 'text-hp-gold bg-hp-gold/10 border border-hp-gold/30'
                          : 'text-hp-parchment/70 hover:text-hp-gold hover:bg-white/5'
                      }`
                    }
                  >
                    <span className="text-lg">{icon}</span>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  )
}
