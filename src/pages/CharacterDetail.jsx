import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchCharacterById } from '../services/api'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'

const houseColors = {
  Gryffindor: { bg: 'rgba(174,0,1,0.15)', border: 'rgba(174,0,1,0.5)', text: '#ff8080', icon: '🦁' },
  Slytherin:  { bg: 'rgba(42,120,74,0.15)', border: 'rgba(42,120,74,0.5)', text: '#80ff80', icon: '🐍' },
  Ravenclaw:  { bg: 'rgba(34,66,154,0.15)', border: 'rgba(34,66,154,0.5)', text: '#80a0ff', icon: '🦅' },
  Hufflepuff: { bg: 'rgba(236,185,57,0.15)', border: 'rgba(236,185,57,0.5)', text: '#ffd080', icon: '🦡' },
}

function InfoRow({ label, value }) {
  if (!value) return null
  return (
    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 py-3 border-b border-hp-gold/10">
      <span className="font-heading text-hp-gold/60 text-xs tracking-widest uppercase w-36 shrink-0">
        {label}
      </span>
      <span className="font-body text-hp-parchment/85 text-base">{value}</span>
    </div>
  )
}

export default function CharacterDetail() {
  const { id } = useParams()
  const [character, setCharacter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      // API returns an array with one item
      const data = await fetchCharacterById(id)
      setCharacter(Array.isArray(data) ? data[0] : data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id])

  if (loading) return <div className="pt-28"><LoadingSpell message="Consulting the archives..." /></div>
  if (error)   return <div className="pt-28"><ErrorScroll message={error} onRetry={load} /></div>
  if (!character) return null

  const hs = houseColors[character.house]

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-28 pb-24">
      {/* Back link */}
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 font-heading text-xs tracking-widest text-hp-gold/60 hover:text-hp-gold transition-colors mb-10"
      >
        ← Back to Characters
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {/* ── LEFT: Portrait ── */}
        <div className="md:col-span-1">
          <div
            className="rounded-xl overflow-hidden relative"
            style={{
              border: `1px solid ${hs?.border || 'rgba(201,168,76,0.3)'}`,
              boxShadow: `0 0 40px ${hs?.bg || 'rgba(201,168,76,0.1)'}`,
            }}
          >
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className="w-full object-cover object-top"
                style={{ maxHeight: '480px' }}
              />
            ) : (
              <div className="w-full h-64 flex items-center justify-center bg-hp-stone">
                <span className="text-8xl opacity-20">🧙</span>
              </div>
            )}

            {/* Alive/Deceased overlay */}
            <div
              className="absolute bottom-3 right-3 px-3 py-1 rounded text-xs font-heading tracking-widest"
              style={{
                background: character.alive ? 'rgba(34,197,94,0.2)' : 'rgba(220,38,38,0.2)',
                border: `1px solid ${character.alive ? 'rgba(34,197,94,0.4)' : 'rgba(220,38,38,0.4)'}`,
                color: character.alive ? '#86efac' : '#fca5a5',
              }}
            >
              {character.alive ? '✦ Alive' : '✦ Deceased'}
            </div>
          </div>

          {/* House badge below image */}
          {character.house && (
            <div
              className="mt-4 rounded-lg px-4 py-3 text-center"
              style={{
                background: hs?.bg || 'rgba(201,168,76,0.1)',
                border: `1px solid ${hs?.border || 'rgba(201,168,76,0.3)'}`,
              }}
            >
              <span className="text-2xl">{hs?.icon || '🏰'}</span>
              <p
                className="font-heading tracking-widest text-sm mt-1"
                style={{ color: hs?.text || '#c9a84c' }}
              >
                {character.house}
              </p>
            </div>
          )}
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="md:col-span-2">
          {/* Name */}
          <h1 className="font-display text-2xl md:text-3xl text-gold-shimmer tracking-wide leading-snug mb-1">
            {character.name}
          </h1>

          {/* Alternate names */}
          {character.alternateNames?.length > 0 && (
            <p className="font-body italic text-hp-parchment/40 text-sm mb-6">
              Also known as: {character.alternateNames.join(', ')}
            </p>
          )}

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-8">
            {character.wizard && (
              <span className="px-3 py-1 rounded text-xs font-heading border border-hp-gold/30 bg-hp-gold/10 text-hp-gold tracking-widest">
                🪄 Wizard
              </span>
            )}
            {character.hogwartsStudent && (
              <span className="px-3 py-1 rounded text-xs font-heading border border-blue-500/30 bg-blue-900/15 text-blue-300 tracking-widest">
                📚 Hogwarts Student
              </span>
            )}
            {character.hogwartsStaff && (
              <span className="px-3 py-1 rounded text-xs font-heading border border-purple-500/30 bg-purple-900/15 text-purple-300 tracking-widest">
                🎓 Hogwarts Staff
              </span>
            )}
            {character.ancestry && (
              <span className="px-3 py-1 rounded text-xs font-heading border border-hp-gold/20 bg-hp-stone/50 text-hp-parchment/70 tracking-widest capitalize">
                {character.ancestry}
              </span>
            )}
          </div>

          {/* Info table */}
          <div className="card-parchment rounded-xl p-6 border border-hp-gold/15">
            <h2 className="font-heading text-hp-gold/70 text-xs tracking-[0.3em] uppercase mb-4">
              ✦ Character Details
            </h2>

            <InfoRow label="Species"     value={character.species} />
            <InfoRow label="Gender"      value={character.gender} />
            <InfoRow label="Birth"       value={character.dateOfBirth} />
            <InfoRow label="Eye Colour"  value={character.eyeColour} />
            <InfoRow label="Hair Colour" value={character.hairColour} />
            <InfoRow label="Ancestry"    value={character.ancestry} />
            <InfoRow label="Patronus"    value={character.patronus} />
            <InfoRow
              label="Wand"
              value={
                character.wand?.wood
                  ? `${character.wand.wood} wood, ${character.wand.core || 'unknown core'}${character.wand.length ? `, ${character.wand.length}"` : ''}`
                  : null
              }
            />
            <InfoRow label="Actor"       value={character.actor} />

            {/* Alternate actors */}
            {character.alternateActors?.length > 0 && (
              <InfoRow
                label="Alt. Actors"
                value={character.alternateActors.join(', ')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
