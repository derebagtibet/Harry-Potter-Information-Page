import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
      <div className="text-7xl mb-6" style={{ animation: 'float 4s ease-in-out infinite' }}>
        🗺️
      </div>

      <h1 className="font-display text-hp-gold text-2xl md:text-3xl tracking-widest mb-3">
        Page Not Found
      </h1>

      <p className="font-body italic text-hp-parchment/50 text-lg max-w-md mb-8">
        "I solemnly swear that I am up to no good" — but this page doesn't exist in any map.
      </p>

      <Link
        to="/"
        className="btn-spell font-heading text-sm tracking-widest px-8 py-3 rounded border border-hp-gold/40 text-hp-gold hover:bg-hp-gold/10 transition-all duration-300"
      >
        🏰 Return to Hogwarts
      </Link>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50% { transform: translateY(-12px) rotate(3deg); }
        }
      `}</style>
    </div>
  )
}
