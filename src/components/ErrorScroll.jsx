// Magical error display component
export default function ErrorScroll({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center px-4">
      <div className="text-5xl animate-float" style={{ animation: 'float 3s ease-in-out infinite' }}>
        💀
      </div>

      <div className="card-parchment rounded-lg p-8 max-w-md border border-red-900/30">
        <h3 className="font-display text-hp-gold text-sm tracking-widest mb-3">
          A Dark Spell Has Interfered
        </h3>
        <p className="font-body text-hp-parchment/70 text-base">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-spell font-heading text-sm tracking-widest px-8 py-3 rounded border border-hp-gold/40 text-hp-gold hover:bg-hp-gold/10 transition-all duration-300"
        >
          🪄 Try Again
        </button>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  )
}
