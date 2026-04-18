import { useEffect, useState } from 'react'
import { fetchHouses } from '../services/api'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

const houseThemes = {
  Gryffindor: {
    bg: 'linear-gradient(135deg, rgba(116,0,1,0.35) 0%, rgba(13,10,7,0.95) 100%)',
    border: 'rgba(174,0,1,0.5)',
    glow: 'rgba(174,0,1,0.3)',
    text: '#ff9090',
    accent: '#ae0001',
    emoji: '🦁',
    trait: 'Bravery · Nerve · Chivalry',
    element: 'Fire',
  },
  Slytherin: {
    bg: 'linear-gradient(135deg, rgba(26,71,42,0.35) 0%, rgba(13,10,7,0.95) 100%)',
    border: 'rgba(42,120,74,0.5)',
    glow: 'rgba(42,120,74,0.3)',
    text: '#90ffa0',
    accent: '#2a784a',
    emoji: '🐍',
    trait: 'Ambition · Cunning · Resourcefulness',
    element: 'Water',
  },
  Ravenclaw: {
    bg: 'linear-gradient(135deg, rgba(14,26,64,0.4) 0%, rgba(13,10,7,0.95) 100%)',
    border: 'rgba(34,66,154,0.5)',
    glow: 'rgba(34,66,154,0.3)',
    text: '#90b0ff',
    accent: '#22429a',
    emoji: '🦅',
    trait: 'Wisdom · Wit · Learning',
    element: 'Air',
  },
  Hufflepuff: {
    bg: 'linear-gradient(135deg, rgba(180,143,41,0.25) 0%, rgba(13,10,7,0.95) 100%)',
    border: 'rgba(236,185,57,0.5)',
    glow: 'rgba(236,185,57,0.25)',
    text: '#ffd080',
    accent: '#ecb939',
    emoji: '🦡',
    trait: 'Loyalty · Patience · Hard Work',
    element: 'Earth',
  },
}

export default function Houses() {
  const [houses, setHouses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [active, setActive] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchHouses()
      setHouses(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="⚡"
        title="HOGWARTS HOUSES"
        subtitle="Four houses, four legacies — which one calls to you?"
      />

      {loading && <LoadingSpell message="Consulting the Sorting Hat..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <div className="space-y-8 stagger-children">
          {houses.map((house, idx) => {
            const theme = houseThemes[house.house] || {}
            const isActive = active === house.house

            return (
              <div
                key={house.house || idx}
                className="rounded-2xl overflow-hidden cursor-pointer animate-fade-in transition-all duration-400"
                style={{
                  background: theme.bg || 'rgba(20,16,8,0.95)',
                  border: `1px solid ${isActive ? theme.border : 'rgba(201,168,76,0.15)'}`,
                  boxShadow: isActive
                    ? `0 0 60px ${theme.glow}, 0 8px 40px rgba(0,0,0,0.6)`
                    : '0 4px 24px rgba(0,0,0,0.5)',
                  transition: 'all 0.4s ease',
                }}
                onClick={() => setActive(isActive ? null : house.house)}
              >
                {/* Header row */}
                <div className="flex items-center justify-between p-6 md:p-8">
                  <div className="flex items-center gap-5">
                    <span
                      className="text-5xl md:text-6xl transition-transform duration-300"
                      style={{ filter: `drop-shadow(0 0 12px ${theme.glow || 'rgba(201,168,76,0.3)'})` }}
                    >
                      {theme.emoji || '🏰'}
                    </span>
                    <div>
                      <h2
                        className="font-display text-2xl md:text-3xl tracking-widest"
                        style={{ color: theme.text || '#c9a84c' }}
                      >
                        {house.house}
                      </h2>
                      <p className="font-body italic text-hp-parchment/50 text-sm mt-1">
                        {theme.trait}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    {house.emoji && (
                      <span className="text-2xl">{house.emoji}</span>
                    )}
                    <span
                      className="font-heading text-xs tracking-widest transition-all duration-300"
                      style={{ color: theme.text || '#c9a84c', opacity: 0.6 }}
                    >
                      {isActive ? '▲ Less' : '▼ More'}
                    </span>
                  </div>
                </div>

                {/* Expanded content */}
                {isActive && (
                  <div className="px-6 md:px-8 pb-8 border-t border-white/5 pt-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {/* Founder */}
                      {house.founder && (
                        <div className="card-parchment rounded-xl p-5 border border-white/5">
                          <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-2">Founder</p>
                          <p className="font-body text-hp-parchment/85 text-base">{house.founder}</p>
                        </div>
                      )}

                      {/* Animal */}
                      {house.animal && (
                        <div className="card-parchment rounded-xl p-5 border border-white/5">
                          <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-2">Animal</p>
                          <p className="font-body text-hp-parchment/85 text-base">{house.animal}</p>
                        </div>
                      )}

                      {/* Element */}
                      {theme.element && (
                        <div className="card-parchment rounded-xl p-5 border border-white/5">
                          <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-2">Element</p>
                          <p className="font-body text-hp-parchment/85 text-base">{theme.element}</p>
                        </div>
                      )}

                      {/* Colors */}
                      {house.colors?.length > 0 && (
                        <div className="card-parchment rounded-xl p-5 border border-white/5">
                          <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-3">Colors</p>
                          <div className="flex gap-2 flex-wrap">
                            {house.colors.map(color => (
                              <span
                                key={color}
                                className="px-3 py-1 rounded font-heading text-xs tracking-widest border border-white/10"
                                style={{ color: theme.text || '#c9a84c', background: 'rgba(255,255,255,0.04)' }}
                              >
                                {color}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Traits / Values */}
                      <div className="card-parchment rounded-xl p-5 border border-white/5 sm:col-span-2">
                        <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-3">Values</p>
                        <div className="flex flex-wrap gap-2">
                          {theme.trait.split(' · ').map(t => (
                            <span
                              key={t}
                              className="px-3 py-1 rounded-full font-heading text-xs tracking-widest border"
                              style={{
                                borderColor: theme.border || 'rgba(201,168,76,0.3)',
                                color: theme.text || '#c9a84c',
                                background: `${theme.glow}20` || 'rgba(201,168,76,0.08)',
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
