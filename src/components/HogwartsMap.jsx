import { useCallback, useRef, useState } from 'react'

const LOCATIONS = {
  'great-hall': {
    id: 'great-hall',
    name: 'Great Hall',
    icon: '🍽️',
    blurb: 'Sorting feasts, feasts, and the house tables under enchanted candles.',
    detail:
      'The Great Hall is the heart of Hogwarts: four long tables for each house, the staff table at the far end, and a ceiling bewitched to mirror the sky. From the Sorting Ceremony to the Yule Ball, almost every major school gathering begins here.',
  },
  'quidditch-pitch': {
    id: 'quidditch-pitch',
    name: 'Quidditch Pitch',
    icon: '🧹',
    blurb: 'Three hoops, two teams, one Golden Snitch — and a lot of mud.',
    detail:
      'Hogwarts\' oval pitch lies on the grounds south of the castle. Gryffindor, Slytherin, Ravenclaw, and Hufflepuff battle for the House Cup here, with stands that rise high into the air on match days.',
  },
  'forbidden-forest': {
    id: 'forbidden-forest',
    name: 'Forbidden Forest',
    icon: '🌲',
    blurb: 'Centaurs, acromantulas, and detentions — strictly out of bounds.',
    detail:
      'A vast, wild wood on the eastern edge of the grounds. Hagrid knows its paths better than most, but even he warns students away. Deep inside, ancient creatures and old magic still hold sway.',
  },
}

export default function HogwartsMap() {
  const wrapRef = useRef(null)
  const [hoveredId, setHoveredId] = useState(null)
  const [selectedId, setSelectedId] = useState('great-hall')
  const [tip, setTip] = useState({ x: 0, y: 0, visible: false })

  const moveTip = useCallback((e) => {
    const el = wrapRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setTip({ x: e.clientX - r.left, y: e.clientY - r.top, visible: true })
  }, [])

  const centerTip = useCallback(() => {
    const el = wrapRef.current
    if (!el) return
    setTip({ x: el.clientWidth / 2, y: el.clientHeight * 0.42, visible: true })
  }, [])

  const selected = LOCATIONS[selectedId] ?? LOCATIONS['great-hall']

  const hotspotClass = (id) =>
    `cursor-pointer transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-hp-gold/80 focus-visible:ring-offset-2 focus-visible:ring-offset-hp-darker ${
      hoveredId === id || selectedId === id ? 'fill-hp-gold/35 stroke-hp-gold/70' : 'fill-hp-gold/0 stroke-hp-gold/25 hover:fill-hp-gold/20'
    }`

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(260px,320px)] gap-6 lg:gap-8 items-start">
      <div
        ref={wrapRef}
        className="relative rounded-xl overflow-hidden border border-hp-gold/25 bg-hp-dark shadow-dark"
        onMouseLeave={() => {
          setHoveredId(null)
          setTip((t) => ({ ...t, visible: false }))
        }}
      >
        {tip.visible && hoveredId && LOCATIONS[hoveredId] && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full px-3 py-2 rounded border border-hp-gold/40 bg-hp-stone/95 backdrop-blur-sm shadow-gold max-w-[220px] text-center"
            style={{ left: tip.x, top: tip.y - 12 }}
            role="tooltip"
          >
            <span className="text-lg block mb-0.5">{LOCATIONS[hoveredId].icon}</span>
            <span className="font-heading text-xs tracking-widest text-hp-gold uppercase">
              {LOCATIONS[hoveredId].name}
            </span>
            <p className="font-body text-hp-parchment/75 text-xs mt-1 leading-snug">{LOCATIONS[hoveredId].blurb}</p>
          </div>
        )}

        <svg
          viewBox="0 0 900 520"
          className="w-full h-auto block select-none"
          aria-label="Interactive map of Hogwarts grounds"
          role="img"
        >
          <defs>
            <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0e1528" />
              <stop offset="55%" stopColor="#1a1510" />
              <stop offset="100%" stopColor="#0d0a07" />
            </linearGradient>
            <linearGradient id="lake" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(40,70,90,0.5)" />
              <stop offset="100%" stopColor="rgba(20,40,55,0.65)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="900" height="520" fill="url(#sky)" />

          {/* stars */}
          {[12, 88, 160, 240, 320, 410, 520, 610, 780, 850].map((x, i) => (
            <circle key={i} cx={x} cy={40 + (i % 4) * 18} r={1.2} fill="rgba(245,230,200,0.35)" />
          ))}

          {/* moon */}
          <circle cx="780" cy="72" r="28" fill="rgba(245,230,200,0.12)" stroke="rgba(201,168,76,0.2)" strokeWidth="1" />

          {/* lake */}
          <ellipse cx="120" cy="380" rx="95" ry="48" fill="url(#lake)" opacity="0.9" />
          <ellipse cx="105" cy="368" rx="40" ry="18" fill="rgba(100,140,160,0.15)" />

          {/* grounds */}
          <ellipse cx="450" cy="360" rx="340" ry="130" fill="rgba(26,71,42,0.25)" stroke="rgba(42,120,74,0.25)" strokeWidth="1" />

          {/* forest (decorative backdrop) */}
          <path
            d="M 720 120 Q 820 200 860 360 L 900 520 L 620 520 Q 640 380 680 260 Z"
            fill="rgba(10,28,16,0.55)"
            stroke="rgba(42,120,74,0.2)"
            strokeWidth="1"
          />

          {/* castle silhouette */}
          <g fill="rgba(45,38,30,0.95)" stroke="rgba(201,168,76,0.15)" strokeWidth="1">
            <path d="M 320 380 L 320 220 L 360 200 L 380 160 L 400 200 L 440 140 L 480 200 L 520 150 L 560 210 L 580 200 L 580 380 Z" />
            <rect x="400" y="180" width="100" height="24" fill="rgba(201,168,76,0.12)" />
            <path d="M 380 380 L 380 260 L 520 260 L 520 380 Z" fill="rgba(35,30,24,0.98)" />
          </g>

          {/* towers */}
          <g fill="rgba(55,48,40,0.95)" stroke="rgba(201,168,76,0.12)">
            <path d="M 350 220 L 365 120 L 380 220 Z" />
            <path d="M 500 210 L 515 105 L 530 210 Z" />
            <path d="M 430 160 L 450 80 L 470 160 Z" filter="url(#glow)" />
          </g>

          {/* windows */}
          {[-40, -20, 0, 20, 40].map((dx, i) => (
            <rect
              key={i}
              x={442 + dx}
              y={285 + (i % 2) * 28}
              width="8"
              height="14"
              rx="1"
              fill="rgba(240,200,100,0.35)"
            />
          ))}

          {/* Labels (non-interactive) */}
          <text x="450" y="115" textAnchor="middle" className="fill-hp-gold/40 font-heading" style={{ fontSize: '11px', letterSpacing: '0.35em' }}>
            HOGWARTS
          </text>

          {/* —— Clickable regions —— */}
          <g className="stroke-2">
            {/* Great Hall — central lower castle */}
            <path
              id="great-hall-hit"
              tabIndex={0}
              role="button"
              aria-label={`${LOCATIONS['great-hall'].name}. ${LOCATIONS['great-hall'].blurb}`}
              aria-pressed={selectedId === 'great-hall'}
              className={hotspotClass('great-hall')}
              d="M 392 318 L 392 268 L 508 268 L 508 318 Q 450 332 392 318 Z"
              strokeLinejoin="round"
              onMouseEnter={() => setHoveredId('great-hall')}
              onMouseMove={moveTip}
              onFocus={() => {
                setHoveredId('great-hall')
                centerTip()
              }}
              onBlur={() => {
                setHoveredId(null)
                setTip((t) => ({ ...t, visible: false }))
              }}
              onClick={() => setSelectedId('great-hall')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedId('great-hall')
                }
              }}
            />

            {/* Quidditch pitch — south oval */}
            <ellipse
              id="quidditch-hit"
              tabIndex={0}
              role="button"
              aria-label={`${LOCATIONS['quidditch-pitch'].name}. ${LOCATIONS['quidditch-pitch'].blurb}`}
              aria-pressed={selectedId === 'quidditch-pitch'}
              cx="450"
              cy="430"
              rx="118"
              ry="62"
              className={hotspotClass('quidditch-pitch')}
              onMouseEnter={() => setHoveredId('quidditch-pitch')}
              onMouseMove={moveTip}
              onFocus={() => {
                setHoveredId('quidditch-pitch')
                centerTip()
              }}
              onBlur={() => {
                setHoveredId(null)
                setTip((t) => ({ ...t, visible: false }))
              }}
              onClick={() => setSelectedId('quidditch-pitch')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedId('quidditch-pitch')
                }
              }}
            />

            {/* Forbidden Forest — east */}
            <path
              id="forest-hit"
              tabIndex={0}
              role="button"
              aria-label={`${LOCATIONS['forbidden-forest'].name}. ${LOCATIONS['forbidden-forest'].blurb}`}
              aria-pressed={selectedId === 'forbidden-forest'}
              className={hotspotClass('forbidden-forest')}
              d="M 620 140 L 880 140 L 895 520 L 640 520 Q 600 360 620 140 Z"
              strokeLinejoin="round"
              onMouseEnter={() => setHoveredId('forbidden-forest')}
              onMouseMove={moveTip}
              onFocus={() => {
                setHoveredId('forbidden-forest')
                centerTip()
              }}
              onBlur={() => {
                setHoveredId(null)
                setTip((t) => ({ ...t, visible: false }))
              }}
              onClick={() => setSelectedId('forbidden-forest')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedId('forbidden-forest')
                }
              }}
            />
          </g>

          {/* pitch rings (decorative) */}
          <ellipse cx="450" cy="430" rx="118" ry="62" fill="none" stroke="rgba(201,168,76,0.12)" strokeWidth="1" pointerEvents="none" />
          <ellipse cx="450" cy="430" rx="78" ry="40" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1" pointerEvents="none" />
        </svg>

        <p className="font-heading text-[10px] tracking-widest text-hp-parchment/35 uppercase text-center py-2 border-t border-hp-gold/10">
          Hover for a glimpse · Click to read more
        </p>
      </div>

      <aside className="card-parchment rounded-xl p-6 border border-hp-gold/25 min-h-[200px]">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-3xl shrink-0">{selected.icon}</span>
          <div>
            <h2 className="font-display text-hp-gold text-lg tracking-wide">{selected.name}</h2>
            <p className="font-body text-hp-parchment/65 text-sm italic mt-1">{selected.blurb}</p>
          </div>
        </div>
        <p className="font-body text-hp-parchment/80 text-sm leading-relaxed border-t border-hp-gold/15 pt-4">
          {selected.detail}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {Object.values(LOCATIONS).map((loc) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setSelectedId(loc.id)}
              className={`font-heading text-xs tracking-wider px-3 py-1.5 rounded border transition-colors ${
                selectedId === loc.id
                  ? 'border-hp-gold/50 bg-hp-gold/15 text-hp-gold'
                  : 'border-hp-gold/15 text-hp-parchment/50 hover:border-hp-gold/30 hover:text-hp-parchment/80'
              }`}
            >
              {loc.icon} {loc.name}
            </button>
          ))}
        </div>
      </aside>
    </div>
  )
}
