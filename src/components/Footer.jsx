import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hp-gold/15 bg-hp-darker/80 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div className="text-center md:text-left">
            <div className="font-display text-hp-gold text-sm tracking-widest mb-1">HOGWARTS ARCHIVES</div>
            <p className="text-hp-parchment/40 text-sm font-body">"It is our choices that show what we truly are."</p>
            <p className="text-hp-gold/40 text-xs font-mono mt-1">— Albus Dumbledore</p>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {[
              ['/', '🏰 Home'],
              ['/characters', '🧙 Characters'],
              ['/books', '📚 Books'],
              ['/spells', '🪄 Spells'],
              ['/houses', '⚡ Houses'],
              ['/quiz', '🎩 Sorting Hat'],
              ['/compare', '⚔️ Duel'],
              ['/spell-duel', '✨ Spell duel'],
              ['/favourites', '❤️ Favourites'],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="text-hp-parchment/50 hover:text-hp-gold transition-colors text-xs font-heading tracking-wide">
                {label}
              </Link>
            ))}
          </nav>

          <div className="text-center md:text-right">
            <p className="text-hp-parchment/30 text-xs font-mono">Powered by</p>
            <a href="https://hp-api.onrender.com" target="_blank" rel="noreferrer" className="text-hp-gold/50 text-xs hover:text-hp-gold transition-colors font-mono">hp-api.onrender.com</a>
            <span className="text-hp-gold/30 text-xs mx-1">·</span>
            <a href="https://potterapi-fedeperin.vercel.app" target="_blank" rel="noreferrer" className="text-hp-gold/50 text-xs hover:text-hp-gold transition-colors font-mono">potterapi-fedeperin</a>
          </div>
        </div>

        <div className="divider-magic mt-8">
          <span className="text-hp-gold/40 text-xs font-heading tracking-widest">🌟 Mischief Managed 🌟</span>
        </div>
      </div>
    </footer>
  )
}
