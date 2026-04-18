import { useState } from 'react'

const houseColors = {
  Gryffindor: '#ff9090',
  Slytherin: '#90ffa0',
  Ravenclaw: '#90b0ff',
  Hufflepuff: '#ffd080',
}

export { houseColors }

export default function CharacterSelector({ characters, selected, onSelect, side }) {
  const [search, setSearch] = useState('')
  const [open, setOpen] = useState(false)

  const filtered = characters
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 40)

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full card-parchment rounded-xl p-4 border border-hp-gold/20 hover:border-hp-gold/40 transition-all duration-300 text-left flex items-center gap-3"
      >
        {selected ? (
          <>
            {selected.image && (
              <img
                src={selected.image}
                alt={selected.name}
                className="w-10 h-10 rounded-full object-cover object-top border border-hp-gold/30"
              />
            )}
            {!selected.image && <span className="text-2xl">🧙</span>}
            <div className="flex-1 min-w-0">
              <p className="font-heading text-hp-parchment text-sm truncate">{selected.name}</p>
              {selected.house && (
                <p className="font-mono text-xs" style={{ color: houseColors[selected.house] || '#c9a84c' }}>
                  {selected.house}
                </p>
              )}
            </div>
          </>
        ) : (
          <span className="font-heading text-hp-parchment/40 text-sm tracking-wide">
            {side === 'A' ? '← Choose character' : 'Choose character →'}
          </span>
        )}
        <span className="text-hp-gold/40 ml-auto">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div
          className="absolute z-20 mt-2 w-full rounded-xl border border-hp-gold/25 overflow-hidden"
          style={{ background: '#0d1117', boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }}
        >
          <div className="p-3 border-b border-hp-gold/10">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              autoFocus
              className="w-full bg-hp-stone/80 border border-hp-gold/20 rounded-lg px-3 py-2 font-body text-hp-parchment placeholder-hp-parchment/30 text-sm focus:outline-none focus:border-hp-gold/50"
            />
          </div>
          <div className="max-h-56 overflow-y-auto">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  onSelect(c)
                  setOpen(false)
                  setSearch('')
                }}
                className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-hp-gold/10 transition-colors text-left"
              >
                {c.image ? (
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-7 h-7 rounded-full object-cover object-top border border-hp-gold/20"
                  />
                ) : (
                  <span className="text-lg w-7 text-center">🧙</span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-body text-hp-parchment text-sm truncate">{c.name}</p>
                </div>
                {c.house && (
                  <span className="font-heading text-xs shrink-0" style={{ color: houseColors[c.house] || '#c9a84c' }}>
                    {c.house}
                  </span>
                )}
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="text-center py-6 font-body text-hp-parchment/30 text-sm italic">No results</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
