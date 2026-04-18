// Magical loading spinner for API calls
export default function LoadingSpell({ message = 'Casting spell...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      {/* Spinning wand circle */}
      <div className="relative w-20 h-20">
        <div
          className="absolute inset-0 rounded-full border-2 border-hp-gold/20"
          style={{ borderTopColor: '#c9a84c' }}
          style={{
            borderColor: 'rgba(201,168,76,0.2)',
            borderTopColor: '#c9a84c',
            animation: 'spin 1s linear infinite',
          }}
        />
        <div
          className="absolute inset-2 rounded-full border-2"
          style={{
            borderColor: 'rgba(201,168,76,0.1)',
            borderRightColor: '#f0d080',
            animation: 'spin 1.5s linear infinite reverse',
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-2xl animate-bounce">
          🪄
        </div>
      </div>

      <div className="text-center">
        <p className="font-heading text-hp-gold tracking-widest text-sm animate-pulse">
          {message}
        </p>
        <div className="flex gap-1 justify-center mt-3">
          {['✦', '✧', '✦'].map((star, i) => (
            <span
              key={i}
              className="text-hp-gold/50 text-xs"
              style={{ animation: `sparkle 1.5s ease-in-out ${i * 0.3}s infinite` }}
            >
              {star}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  )
}
