import { createContext, useContext, useState, useEffect } from 'react'

const FavouritesContext = createContext(null)

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('hp-favourites') || '[]')
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('hp-favourites', JSON.stringify(favourites))
  }, [favourites])

  const toggle = (character) => {
    setFavourites(prev => {
      const exists = prev.find(c => c.id === character.id)
      return exists ? prev.filter(c => c.id !== character.id) : [...prev, character]
    })
  }

  const isFavourite = (id) => favourites.some(c => c.id === id)

  return (
    <FavouritesContext.Provider value={{ favourites, toggle, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  )
}

export function useFavourites() {
  return useContext(FavouritesContext)
}
