import { Link } from 'react-router-dom'
import FavouriteButton from './FavouriteButton'

// Helper: map house name to color class
const houseStyles = {
  Gryffindor: {
    badge: 'badge-gryffindor',
    glow: 'rgba(174,0,1,0.25)',
    border: 'rgba(174,0,1,0.4)',
    icon: '🦁',
  },
  Slytherin: {
    badge: 'badge-slytherin',
    glow: 'rgba(42,120,74,0.25)',
    border: 'rgba(42,120,74,0.4)',
    icon: '🐍',
  },
  Ravenclaw: {
    badge: 'badge-ravenclaw',
    glow: 'rgba(34,66,154,0.25)',
    border: 'rgba(34,66,154,0.4)',
    icon: '🦅',
  },
  Hufflepuff: {
    badge: 'badge-hufflepuff',
    glow: 'rgba(236,185,57,0.25)',
    border: 'rgba(236,185,57,0.4)',
    icon: '🦡',
  },
}

export default function CharacterCard({ character }) {
  const { id, name, house, image, actor, hogwartsStudent, hogwartsStaff, alive } = character
  const hs = houseStyles[house]

  return (
    <Link
      to={`/characters/${id}`}
      className="group relative card-parchment rounded-xl overflow-hidden transition-all duration-400 hover:-translate-y-1 animate-fade-in block"
      style={{
        '--card-glow': hs?.glow || 'rgba(201,168,76,0.15)',
        '--card-border': hs?.border || 'rgba(201,168,76,0.25)',
        border: `1px solid ${hs?.border || 'rgba(201,168,76,0.25)'}`,
        boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
        transition: 'all 0.35s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = `0 8px 40px ${hs?.glow || 'rgba(201,168,76,0.15)'}, 0 0 0 1px ${hs?.border || 'rgba(201,168,76,0.25)'}`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)'
      }}
    >
      {/* Character image */}
      <div className="relative h-56 overflow-hidden bg-hp-stone">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl opacity-30">🧙</span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-hp-dark via-transparent to-transparent" />

        {/* Favourite button */}
        <div className="absolute top-2 left-2">
          <FavouriteButton character={character} />
        </div>

        {/* Alive / deceased badge */}
        <div
          className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${alive ? 'bg-green-400' : 'bg-red-600'} ring-2 ring-hp-dark`}
          title={alive ? 'Alive' : 'Deceased'}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-heading text-hp-parchment text-base font-semibold leading-snug mb-2 group-hover:text-hp-gold transition-colors duration-300">
          {name}
        </h3>

        <div className="flex flex-wrap gap-2 mb-3">
          {/* House badge */}
          {house && (
            <span className={`px-2 py-0.5 rounded text-xs font-heading border ${hs?.badge || ''} tracking-wide`}>
              {hs?.icon} {house}
            </span>
          )}

          {/* Role badge */}
          {hogwartsStudent && (
            <span className="px-2 py-0.5 rounded text-xs font-heading border border-hp-gold/20 bg-hp-gold/10 text-hp-gold/80">
              Student
            </span>
          )}
          {hogwartsStaff && (
            <span className="px-2 py-0.5 rounded text-xs font-heading border border-purple-500/30 bg-purple-900/20 text-purple-300">
              Staff
            </span>
          )}
        </div>

        {actor && (
          <p className="text-hp-parchment/40 text-xs font-mono">
            Portrayed by {actor}
          </p>
        )}
      </div>

      {/* Hover arrow */}
      <div className="absolute bottom-4 right-4 text-hp-gold/0 group-hover:text-hp-gold/60 transition-all duration-300 translate-x-2 group-hover:translate-x-0 text-sm">
        →
      </div>
    </Link>
  )
}
