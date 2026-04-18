import { useState, useEffect, useMemo } from 'react'
import { fetchAllCharacters } from '../services/api'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/SearchBar'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

const HOUSES = ['All', 'Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff']
const ROLES = ['All', 'Student', 'Staff', 'Other']
const PAGE_SIZE = 20

export default function Characters() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [house, setHouse] = useState('All')
  const [role, setRole] = useState('All')
  const [page, setPage] = useState(1)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllCharacters()
      setCharacters(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  // Reset page on filter change
  useEffect(() => { setPage(1) }, [search, house, role])

  const filtered = useMemo(() => {
    return characters.filter(c => {
      const matchSearch = c.name.toLowerCase().includes(search.toLowerCase())
      const matchHouse = house === 'All' || c.house === house
      const matchRole =
        role === 'All' ||
        (role === 'Student' && c.hogwartsStudent) ||
        (role === 'Staff' && c.hogwartsStaff) ||
        (role === 'Other' && !c.hogwartsStudent && !c.hogwartsStaff)
      return matchSearch && matchHouse && matchRole
    })
  }, [characters, search, house, role])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const houseColors = {
    Gryffindor: 'border-red-700/50 text-red-400 bg-red-900/20',
    Slytherin: 'border-green-700/50 text-green-400 bg-green-900/20',
    Ravenclaw: 'border-blue-700/50 text-blue-400 bg-blue-900/20',
    Hufflepuff: 'border-yellow-600/50 text-yellow-400 bg-yellow-900/20',
    All: 'border-hp-gold/30 text-hp-gold bg-hp-gold/10',
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="🧙"
        title="CHARACTERS"
        subtitle="Wizards, witches, and magical creatures of the Wizarding World"
      />

      {/* ── FILTERS ── */}
      <div className="flex flex-col gap-5 mb-10">
        {/* Search */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search by name... (e.g. Hermione)"
        />

        {/* House filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {HOUSES.map(h => (
            <button
              key={h}
              onClick={() => setHouse(h)}
              className={`font-heading text-xs tracking-widest px-4 py-2 rounded border transition-all duration-200 btn-spell ${
                house === h
                  ? houseColors[h] || 'border-hp-gold/30 text-hp-gold bg-hp-gold/10'
                  : 'border-hp-gold/15 text-hp-parchment/50 hover:border-hp-gold/30 hover:text-hp-gold'
              }`}
            >
              {h === 'Gryffindor' ? '🦁 ' : h === 'Slytherin' ? '🐍 ' : h === 'Ravenclaw' ? '🦅 ' : h === 'Hufflepuff' ? '🦡 ' : ''}
              {h}
            </button>
          ))}
        </div>

        {/* Role filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {ROLES.map(r => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`font-heading text-xs tracking-widest px-4 py-2 rounded border transition-all duration-200 btn-spell ${
                role === r
                  ? 'border-hp-gold/40 text-hp-gold bg-hp-gold/10'
                  : 'border-hp-gold/15 text-hp-parchment/50 hover:border-hp-gold/30 hover:text-hp-gold'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-center font-mono text-hp-parchment/40 text-xs tracking-widest">
            {filtered.length} character{filtered.length !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* ── CONTENT ── */}
      {loading && <LoadingSpell message="Summoning characters..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          {paginated.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔮</div>
              <p className="font-heading text-hp-parchment/50 tracking-widest">
                No characters found for your search.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
              {paginated.map(c => (
                <CharacterCard key={c.id} character={c} />
              ))}
            </div>
          )}

          {/* ── PAGINATION ── */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="font-heading text-xs tracking-widest px-4 py-2 rounded border border-hp-gold/25 text-hp-gold/60 hover:text-hp-gold hover:border-hp-gold/50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                .reduce((acc, p, idx, arr) => {
                  if (idx > 0 && p - arr[idx - 1] > 1) acc.push('...')
                  acc.push(p)
                  return acc
                }, [])
                .map((p, i) =>
                  p === '...' ? (
                    <span key={`ellipsis-${i}`} className="text-hp-parchment/30 px-1">…</span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`font-heading text-xs tracking-widest w-9 h-9 rounded border transition-all ${
                        page === p
                          ? 'border-hp-gold/60 text-hp-gold bg-hp-gold/15 shadow-gold'
                          : 'border-hp-gold/15 text-hp-parchment/50 hover:border-hp-gold/40 hover:text-hp-gold'
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
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
