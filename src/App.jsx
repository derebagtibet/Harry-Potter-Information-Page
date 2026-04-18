import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { FavouritesProvider } from './context/FavouritesContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingParticles from './components/FloatingParticles'
import Home from './pages/Home'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import Books from './pages/Books'
import Spells from './pages/Spells'
import Houses from './pages/Houses'
import Favourites from './pages/Favourites'
import SortingQuiz from './pages/SortingQuiz'
import Compare from './pages/Compare'
import Map from './pages/Map'
import SpellDuel from './pages/SpellDuel'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <BrowserRouter>
      <FavouritesProvider>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden">
          <FloatingParticles />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/characters" element={<Characters />} />
              <Route path="/characters/:id" element={<CharacterDetail />} />
              <Route path="/books" element={<Books />} />
              <Route path="/spells" element={<Spells />} />
              <Route path="/houses" element={<Houses />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/quiz" element={<SortingQuiz />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/map" element={<Map />} />
              <Route path="/spell-duel" element={<SpellDuel />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FavouritesProvider>
    </BrowserRouter>
  )
}
