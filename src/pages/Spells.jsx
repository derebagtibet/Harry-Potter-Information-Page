import { useEffect, useState, useMemo } from 'react'
import { fetchSpells } from '../services/api'
import SearchBar from '../components/SearchBar'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

const PAGE_SIZE = 30

// Categorise spells by first letter for alphabetical grouping
function groupAlphabetically(spells) {
  return spells.reduce((acc, spell) => {
    const letter = spell.spell?.[0]?.toUpperCase() || '#'
    if (!acc[letter]) acc[letter] = []
    acc[letter].push(spell)
    return acc
  }, {})
}

// Assign a colour accent based on spell name hash
const SPELL_ACCENTS = [
  'rgba(201,168,76,0.15)',
  'rgba(174,0,1,0.12)',
  'rgba(100,60,180,0.15)',
  'rgba(26,71,42,0.12)',
  'rgba(14,26,64,0.2)',
]
function accentFor(str) {
  let h = 0
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) | 0
  return SPELL_ACCENTS[Math.abs(h) % SPELL_ACCENTS.length]
}

export default function Spells() {
  const [spells, setSpells] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchSpells()
      setSpells(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])
  useEffect(() => { setPage(1) }, [search])

  const filtered = useMemo(() =>
    spells.filter(s =>
      s.spell?.toLowerCase().includes(search.toLowerCase()) ||
      s.use?.toLowerCase().includes(search.toLowerCase())
    ), [spells, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="🪄"
        title="SPELLS"
        subtitle="Every incantation of the Wizarding World, from harmless charms to the Unforgivables"
      />

      {/* Search */}
      <div className="mb-10 flex flex-col gap-3">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search spells or effects... (e.g. Expelliarmus)"
        />
        {!loading && (
          <p className="text-center font-mono text-hp-parchment/40 text-xs tracking-widest">
            {filtered.length} spell{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {loading && <LoadingSpell message="Consulting the spell registry..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔮</div>
              <p className="font-heading text-hp-parchment/50 tracking-widest">
                No spells match your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger-children">
              {paginated.map((spell, idx) => (
                <div
                  key={`${spell.spell}-${idx}`}
                  className="card-parchment rounded-xl p-5 border border-hp-gold/15 hover:border-hp-gold/35 transition-all duration-300 animate-fade-in group hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(135deg, ${accentFor(spell.spell || '')} 0%, rgba(13,17,23,0.95) 100%)` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-heading text-hp-gold text-base tracking-wide group-hover:text-hp-gold-light transition-colors duration-200">
                        {spell.spell}
                      </h3>
                      <p className="font-body text-hp-parchment/60 text-sm mt-2 leading-relaxed">
                        {spell.use}
                      </p>
                    </div>
                    <span className="text-xl shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">✨</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                disabled={page === 1}
                className="font-heading text-xs tracking-widest px-4 py-2 rounded border border-hp-gold/25 text-hp-gold/60 hover:text-hp-gold hover:border-hp-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>

              <span className="font-mono text-hp-parchment/50 text-xs tracking-widest px-4">
                Page {page} of {totalPages}
              </span>

              <button
                onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                disabled={page === totalPages}
                className="font-heading text-xs tracking-widest px-4 py-2 rounded border border-hp-gold/25 text-hp-gold/60 hover:text-hp-gold hover:border-hp-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
