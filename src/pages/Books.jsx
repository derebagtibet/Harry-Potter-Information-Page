import { useEffect, useState } from 'react'
import { fetchBooks } from '../services/api'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

const coverColors = [
  'rgba(174,0,1,0.2)',
  'rgba(14,26,64,0.3)',
  'rgba(26,71,42,0.2)',
  'rgba(100,60,180,0.2)',
  'rgba(180,100,20,0.2)',
  'rgba(60,120,180,0.2)',
  'rgba(180,40,120,0.2)',
]
const borderColors = [
  'rgba(174,0,1,0.45)',
  'rgba(34,66,154,0.45)',
  'rgba(42,120,74,0.45)',
  'rgba(130,80,220,0.45)',
  'rgba(220,140,40,0.45)',
  'rgba(80,160,220,0.45)',
  'rgba(220,80,160,0.45)',
]

export default function Books() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchBooks()
      setBooks(data)
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
        icon="📚"
        title="THE BOOKS"
        subtitle="Seven volumes of magic, mystery, and the battle between good and evil"
      />

      {loading && <LoadingSpell message="Retrieving the tomes..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <div className="space-y-8 stagger-children">
          {books.map((book, idx) => (
            <article
              key={book.number ?? idx}
              className="card-parchment rounded-2xl overflow-hidden flex flex-col md:flex-row gap-0 animate-fade-in group transition-all duration-350 hover:-translate-y-0.5"
              style={{
                border: `1px solid ${borderColors[idx % borderColors.length]}`,
                boxShadow: '0 4px 24px rgba(0,0,0,0.6)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 8px 40px ${coverColors[idx % coverColors.length]}, 0 0 0 1px ${borderColors[idx % borderColors.length]}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.6)'
              }}
            >
              {/* Book cover image */}
              <div
                className="md:w-40 shrink-0 relative overflow-hidden flex items-center justify-center"
                style={{ background: coverColors[idx % coverColors.length], minHeight: '160px' }}
              >
                {book.cover ? (
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={e => { e.target.style.display = 'none' }}
                  />
                ) : null}
                {/* Book number overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="font-display text-5xl font-black opacity-10"
                    style={{ color: borderColors[idx % borderColors.length] }}
                  >
                    {book.number}
                  </span>
                </div>
                {/* Number badge */}
                <div
                  className="absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center font-display text-sm font-bold"
                  style={{
                    background: borderColors[idx % borderColors.length],
                    color: '#f5e6c8',
                  }}
                >
                  {book.number}
                </div>
              </div>

              {/* Book info */}
              <div className="p-6 md:p-8 flex flex-col justify-center gap-3 flex-1">
                <div>
                  <p className="font-heading text-hp-gold/50 text-xs tracking-[0.3em] uppercase mb-1">
                    Book {book.number} · {book.releaseDate}
                  </p>
                  <h2 className="font-display text-hp-parchment text-lg md:text-xl tracking-wide leading-snug group-hover:text-hp-gold transition-colors duration-300">
                    {book.originalTitle || book.title}
                  </h2>
                </div>

                {book.description && (
                  <p className="font-body text-hp-parchment/60 text-base leading-relaxed line-clamp-3">
                    {book.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 mt-2">
                  {book.pages && (
                    <span className="font-mono text-hp-parchment/40 text-xs tracking-widest">
                      📄 {book.pages} pages
                    </span>
                  )}
                  {book.releaseDate && (
                    <span className="font-mono text-hp-parchment/40 text-xs tracking-widest">
                      📅 {book.releaseDate}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
