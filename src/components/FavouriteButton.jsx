import { useFavourites } from '../context/FavouritesContext'

export default function FavouriteButton({ character, className = '' }) {
  const { toggle, isFavourite } = useFavourites()
  const fav = isFavourite(character.id)

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle(character) }}
      className={`transition-all duration-200 ${className}`}
      aria-label={fav ? 'Remove from favourites' : 'Add to favourites'}
      title={fav ? 'Remove from favourites' : 'Add to favourites'}
      style={{
        background: fav ? 'rgba(220,38,38,0.2)' : 'rgba(0,0,0,0.4)',
        border: `1px solid ${fav ? 'rgba(220,38,38,0.5)' : 'rgba(255,255,255,0.15)'}`,
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        cursor: 'pointer',
        transform: fav ? 'scale(1.1)' : 'scale(1)',
        backdropFilter: 'blur(4px)',
      }}
    >
      {fav ? '❤️' : '🤍'}
    </button>
  )
}
