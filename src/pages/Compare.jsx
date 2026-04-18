import { useState, useEffect } from 'react'
import { fetchAllCharacters } from '../services/api'
import CharacterSelector, { houseColors } from '../components/CharacterSelector'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

function CompareRow({ label, valA, valB }) {
  const same = valA && valB && valA.toLowerCase() === valB?.toLowerCase()
  return (
    <div className="grid grid-cols-3 gap-2 py-3 border-b border-hp-gold/10 items-center">
      <div
        className="text-right font-body text-sm pr-3"
        style={{ color: same ? 'rgba(245,230,200,0.5)' : '#f5e6c8' }}
      >
        {valA || <span className="opacity-25 italic text-xs">unknown</span>}
      </div>

      <div className="text-center font-heading text-hp-gold/50 text-xs tracking-widest uppercase">
        {label}
      </div>

      <div
        className="text-left font-body text-sm pl-3"
        style={{ color: same ? 'rgba(245,230,200,0.5)' : '#f5e6c8' }}
      >
        {valB || <span className="opacity-25 italic text-xs">unknown</span>}
      </div>
    </div>
  )
}

export default function Compare() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [charA, setCharA] = useState(null)
  const [charB, setCharB] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllCharacters()
      setCharacters(data)
      setCharA(data.find((c) => c.name === 'Harry Potter') || null)
      setCharB(data.find((c) => c.name === 'Draco Malfoy') || null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const wand = (c) =>
    c?.wand?.wood
      ? `${c.wand.wood}${c.wand.core ? ', ' + c.wand.core : ''}${c.wand.length ? ', ' + c.wand.length + '"' : ''}`
      : null

  const roles = (c) => {
    if (!c) return null
    const r = []
    if (c.hogwartsStudent) r.push('Student')
    if (c.hogwartsStaff) r.push('Staff')
    if (c.wizard) r.push('Wizard')
    return r.join(', ') || null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="⚔️"
        title="CHARACTER DUEL"
        subtitle="Compare two characters from the Wizarding World side by side"
      />

      {loading && <LoadingSpell message="Gathering dossiers..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <CharacterSelector characters={characters} selected={charA} onSelect={setCharA} side="A" />
            <CharacterSelector characters={characters} selected={charB} onSelect={setCharB} side="B" />
          </div>

          {(charA || charB) && (
            <div className="grid grid-cols-3 gap-4 mb-6 items-end">
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden"
                  style={{
                    border: `2px solid ${houseColors[charA?.house] || 'rgba(201,168,76,0.4)'}`,
                    boxShadow: `0 0 30px ${houseColors[charA?.house] || 'rgba(201,168,76,0.2)'}40`,
                  }}
                >
                  {charA?.image ? (
                    <img src={charA.image} alt={charA.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-hp-stone flex items-center justify-center text-5xl opacity-20">🧙</div>
                  )}
                </div>
                <p className="font-heading text-hp-parchment text-xs text-center tracking-wide leading-snug">
                  {charA?.name || '—'}
                </p>
              </div>

              <div className="flex flex-col items-center justify-center pb-6">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center font-display text-hp-gold text-xl border border-hp-gold/40"
                  style={{ background: 'rgba(201,168,76,0.1)', boxShadow: '0 0 20px rgba(201,168,76,0.2)' }}
                >
                  VS
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden"
                  style={{
                    border: `2px solid ${houseColors[charB?.house] || 'rgba(201,168,76,0.4)'}`,
                    boxShadow: `0 0 30px ${houseColors[charB?.house] || 'rgba(201,168,76,0.2)'}40`,
                  }}
                >
                  {charB?.image ? (
                    <img src={charB.image} alt={charB.name} className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-hp-stone flex items-center justify-center text-5xl opacity-20">🧙</div>
                  )}
                </div>
                <p className="font-heading text-hp-parchment text-xs text-center tracking-wide leading-snug">
                  {charB?.name || '—'}
                </p>
              </div>
            </div>
          )}

          {charA && charB && (
            <div className="card-parchment rounded-2xl border border-hp-gold/15 overflow-hidden">
              <div
                className="grid grid-cols-3 gap-2 px-4 py-4 border-b border-hp-gold/15"
                style={{ background: 'rgba(201,168,76,0.05)' }}
              >
                <div className="text-right font-heading text-xs tracking-widest" style={{ color: houseColors[charA.house] || '#c9a84c' }}>
                  {charA.name}
                </div>
                <div className="text-center font-heading text-hp-gold/40 text-xs tracking-widest uppercase">✦</div>
                <div className="text-left font-heading text-xs tracking-widest" style={{ color: houseColors[charB.house] || '#c9a84c' }}>
                  {charB.name}
                </div>
              </div>

              <div className="px-4 py-2">
                <CompareRow label="House" valA={charA.house} valB={charB.house} />
                <CompareRow label="Species" valA={charA.species} valB={charB.species} />
                <CompareRow label="Gender" valA={charA.gender} valB={charB.gender} />
                <CompareRow label="Ancestry" valA={charA.ancestry} valB={charB.ancestry} />
                <CompareRow label="Eye Colour" valA={charA.eyeColour} valB={charB.eyeColour} />
                <CompareRow label="Hair" valA={charA.hairColour} valB={charB.hairColour} />
                <CompareRow label="Patronus" valA={charA.patronus} valB={charB.patronus} />
                <CompareRow label="Wand" valA={wand(charA)} valB={wand(charB)} />
                <CompareRow label="Role" valA={roles(charA)} valB={roles(charB)} />
                <CompareRow label="Status" valA={charA.alive ? 'Alive' : 'Deceased'} valB={charB.alive ? 'Alive' : 'Deceased'} />
                <CompareRow label="Actor" valA={charA.actor} valB={charB.actor} />
              </div>
            </div>
          )}

          {(!charA || !charB) && (
            <div className="text-center py-16">
              <div className="text-5xl mb-4 opacity-30">⚔️</div>
              <p className="font-heading text-hp-parchment/40 tracking-widest text-sm">
                Select two characters above to begin the duel.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
