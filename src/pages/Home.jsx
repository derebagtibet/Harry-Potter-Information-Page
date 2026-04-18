import { Link } from 'react-router-dom'
import hogwartsHeroLogo from '../assets/hogwarts-hero-logo.png'

const sections = [
  { to: '/characters', icon: '🧙', title: 'Characters',    desc: 'Explore wizards, witches, and magical creatures.',         color: 'rgba(174,0,1,0.18)',   border: 'rgba(174,0,1,0.4)' },
  { to: '/books',      icon: '📚', title: 'Books',         desc: 'Journey through all seven volumes of the series.',         color: 'rgba(201,168,76,0.12)', border: 'rgba(201,168,76,0.4)' },
  { to: '/spells',     icon: '🪄', title: 'Spells',        desc: 'Master every incantation from Lumos to Avada Kedavra.',    color: 'rgba(100,60,180,0.18)', border: 'rgba(130,80,220,0.4)' },
  { to: '/houses',     icon: '⚡', title: 'Houses',        desc: 'Discover the four great houses of Hogwarts.',              color: 'rgba(26,71,42,0.18)',   border: 'rgba(42,120,74,0.4)' },
  { to: '/quiz',       icon: '🎩', title: 'Sorting Hat',   desc: 'Answer 7 questions and discover your true Hogwarts house.', color: 'rgba(120,80,20,0.18)',  border: 'rgba(201,168,76,0.4)' },
  { to: '/compare',    icon: '⚔️', title: 'Character Duel', desc: 'Compare any two characters side by side.',                color: 'rgba(80,20,120,0.18)',  border: 'rgba(130,80,220,0.4)' },
  { to: '/spell-duel', icon: '✨', title: 'Spell Duel',     desc: 'Turn-based mini-game: random spells and dice-driven HP.', color: 'rgba(130,80,180,0.2)', border: 'rgba(180,120,220,0.45)' },
  { to: '/favourites', icon: '❤️', title: 'Favourites',    desc: 'Your saved wizards and witches collection.',              color: 'rgba(180,20,20,0.15)',  border: 'rgba(220,50,50,0.35)' },
  { to: '/map',        icon: '🗺️', title: 'Hogwarts Map',  desc: 'SVG map with the Great Hall, Quidditch pitch, and Forbidden Forest.', color: 'rgba(40,90,120,0.18)', border: 'rgba(80,140,180,0.4)' },
]

const stats = [
  { label: 'Characters', value: '400+', icon: '🧙' },
  { label: 'Spells',     value: '200+', icon: '✨' },
  { label: 'Books',      value: '7',    icon: '📚' },
  { label: 'Houses',     value: '4',    icon: '🏰' },
]

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── FLYING ANIMATION ── */}
      <img
        src="/harry-chibi.png"
        alt="Decorative flying character"
        className="absolute pointer-events-none z-50 border-0 outline-none shadow-none bg-transparent"
        style={{
          width: '280px',
          maxWidth: 'min(280px, 90vw)',
          opacity: 0.94,
          mixBlendMode: 'screen',
          animation: 'flyAcrossScreen 15s ease-in-out infinite',
        }}
      />

      {/* ── HERO ── */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 pt-36 pb-24 z-10">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(201,168,76,0.10) 0%, transparent 70%)' }} />

        <img
          src={hogwartsHeroLogo}
          alt="Hogwarts crest"
          className="mb-6 h-40 w-auto md:h-48 lg:h-56 object-contain pointer-events-none select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.45)]"
          style={{ animation: 'floatHero 6s ease-in-out infinite' }}
        />

        <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-gold-shimmer tracking-widest leading-tight mb-4" style={{ letterSpacing: '0.15em' }}>
          HOGWARTS ARCHIVES
        </h1>
        <p className="font-body italic text-hp-parchment/60 text-lg md:text-xl max-w-2xl mb-2">
          "The Wizarding World's most comprehensive magical database"
        </p>
        <p className="font-body text-hp-parchment/40 text-sm mb-10">
          Characters · Books · Spells · Houses · Sorting Hat · Character Duel · Spell Duel · Map
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/quiz" className="btn-spell font-heading tracking-widest text-sm px-8 py-3 rounded border border-hp-gold/50 text-hp-gold bg-hp-gold/10 hover:bg-hp-gold/20 transition-all duration-300 shadow-gold">
            🎩 Take the Sorting Hat Quiz
          </Link>
          <Link to="/characters" className="btn-spell font-heading tracking-widest text-sm px-8 py-3 rounded border border-hp-parchment/20 text-hp-parchment/70 hover:border-hp-gold/30 hover:text-hp-gold transition-all duration-300">
            🧙 Explore Characters
          </Link>
        </div>

        <div className="divider-magic max-w-xs mx-auto mt-14">
          <span className="text-hp-gold/40 font-heading text-xs tracking-[0.3em]">✦ ✦ ✦</span>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon }) => (
            <div key={label} className="card-parchment rounded-xl p-5 text-center border border-hp-gold/15 hover:border-hp-gold/35 transition-all duration-300">
              <div className="text-3xl mb-2">{icon}</div>
              <div className="font-display text-hp-gold text-xl md:text-2xl">{value}</div>
              <div className="font-heading text-hp-parchment/50 text-xs tracking-widest mt-1 uppercase">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <h2 className="font-display text-hp-gold text-center text-sm tracking-[0.3em] mb-10 uppercase">Explore the Archives</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger-children">
          {sections.map(({ to, icon, title, desc, color, border }) => (
            <Link
              key={to}
              to={to}
              className="group card-parchment rounded-xl p-6 flex flex-col gap-3 animate-fade-in transition-all duration-350 hover:-translate-y-1"
              style={{ border: `1px solid ${border}`, background: `linear-gradient(135deg, ${color} 0%, rgba(20,16,8,0.95) 100%)`, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', transition: 'all 0.35s ease' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 8px 40px ${color}, 0 0 0 1px ${border}` }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)' }}
            >
              <span className="text-4xl group-hover:scale-110 transition-transform duration-300 inline-block">{icon}</span>
              <h3 className="font-heading text-hp-gold text-lg tracking-wide">{title}</h3>
              <p className="font-body text-hp-parchment/60 text-sm leading-relaxed flex-1">{desc}</p>
              <span className="font-heading text-xs tracking-widest text-hp-gold/50 group-hover:text-hp-gold transition-colors duration-300 mt-2">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── QUOTE ── */}
      <section className="max-w-3xl mx-auto px-6 pb-24 text-center relative z-10">
        <div className="card-parchment rounded-2xl p-10 border border-hp-gold/20 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)' }} />
          <span className="text-4xl opacity-30 font-serif absolute top-4 left-6">"</span>
          <p className="font-body italic text-hp-parchment/80 text-xl md:text-2xl leading-relaxed relative z-10">
            It is our choices, Harry, that show what we truly are, far more than our abilities.
          </p>
          <p className="font-heading text-hp-gold/60 text-sm tracking-widest mt-6 relative z-10">— Albus Dumbledore</p>
        </div>
      </section>

      <style>{`
        @keyframes floatHero {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
        @keyframes flyAcrossScreen {
          0% { 
            transform: translate(-300px, 20vh) rotate(5deg); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          25% { 
            transform: translate(25vw, 10vh) rotate(-5deg); 
          }
          50% { 
            transform: translate(50vw, 30vh) rotate(8deg); 
          }
          75% { 
            transform: translate(75vw, 15vh) rotate(-5deg); 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translate(120vw, 5vh) rotate(10deg); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  )
}
