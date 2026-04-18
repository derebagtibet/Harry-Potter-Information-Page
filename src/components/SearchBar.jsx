// Reusable search bar with magical styling
export default function SearchBar({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative max-w-xl w-full mx-auto">
      {/* Search icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-hp-gold/60 text-lg pointer-events-none">
        🔍
      </span>

      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full pl-12 pr-12 py-3
          bg-hp-stone/80 backdrop-blur-sm
          border border-hp-gold/25
          rounded-lg
          font-body text-hp-parchment placeholder-hp-parchment/30
          focus:outline-none focus:border-hp-gold/60 focus:shadow-gold
          transition-all duration-300
          text-base
        "
      />

      {/* Clear button */}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-hp-gold/50 hover:text-hp-gold transition-colors text-sm"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  )
}
