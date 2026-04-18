import { useFavourites } from '../context/FavouritesContext'
import CharacterCard from '../components/CharacterCard'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'

export default function Favourites() {
  const { favourites } = useFavourites()

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="❤️"
        title="FAVOURITES"
        subtitle="Your hand-picked wizards and witches from the Wizarding World"
      />

      {favourites.length === 0 ? (
        <div className="text-center py-24 flex flex-col items-center gap-6">
          <div className="text-6xl opacity-40">🤍</div>
          <p className="font-heading text-hp-parchment/50 tracking-widest text-sm">
            You haven't added any favourites yet.
          </p>
          <Link
            to="/characters"
            className="btn-spell font-heading text-xs tracking-widest px-8 py-3 rounded border border-hp-gold/40 text-hp-gold hover:bg-hp-gold/10 transition-all duration-300"
          >
            🧙 Browse Characters
          </Link>
        </div>
      ) : (
        <>
          <p className="text-center font-mono text-hp-parchment/40 text-xs tracking-widest mb-8">
            {favourites.length} character{favourites.length !== 1 ? 's' : ''} saved
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 stagger-children">
            {favourites.map(c => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
