# 🏰 Hogwarts Archives — Harry Potter Wiki

A visually stunning, fully responsive Harry Potter Wiki built with **React + Vite + Tailwind CSS**.

## 🪄 Features

- **Characters** — Browse 400+ wizards, witches & creatures with house filtering, role filtering, text search, and pagination. Click any character for a full detail page.
- **Books** — All 7 Harry Potter books with cover images and descriptions.
- **Spells** — 200+ spells searchable by name or effect, paginated.
- **Houses** — Interactive expandable cards for all 4 Hogwarts houses with founder, animal, colours, and values.
- **Magical UI** — Dark parchment aesthetic, gold shimmer text, floating particle effects, candle animations, house-coloured glows.
- **Responsive** — Works on mobile, tablet, and desktop.

## 📡 APIs Used

| API | Base URL | Data |
|-----|----------|------|
| HP-API | `https://hp-api.onrender.com/api` | Characters, students, staff |
| PotterAPI (fedeperin) | `https://potterapi-fedeperin.vercel.app/en` | Books, spells, houses |

Both APIs are **free**, **public**, and require **no authentication**.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── services/
│   └── api.js              # All API fetch calls (single source of truth)
├── components/
│   ├── Navbar.jsx           # Sticky navigation bar
│   ├── Footer.jsx           # Site footer with links
│   ├── CharacterCard.jsx    # Card for character grid
│   ├── SearchBar.jsx        # Reusable search input
│   ├── PageHeader.jsx       # Reusable magical page title
│   ├── LoadingSpell.jsx     # Animated loading state
│   ├── ErrorScroll.jsx      # Error display with retry
│   └── FloatingParticles.jsx # Background particle effect
└── pages/
    ├── Home.jsx             # Landing page
    ├── Characters.jsx       # Character listing + filter/search/pagination
    ├── CharacterDetail.jsx  # Single character detail (dynamic route)
    ├── Books.jsx            # Books listing
    ├── Spells.jsx           # Spells listing + search/pagination
    ├── Houses.jsx           # Houses showcase (expandable)
    └── NotFound.jsx         # 404 page
```

## 🌐 Deployment (Vercel)

1. Push code to GitHub
2. Import repo on [vercel.com](https://vercel.com)
3. Framework preset: **Vite**
4. Deploy — done!

## 🎨 Tech Stack

- **React 18** with hooks (`useState`, `useEffect`, `useMemo`)
- **React Router v6** for client-side routing
- **Tailwind CSS** for utility-first styling
- **Vite** as build tool
- **Google Fonts** — Cinzel Decorative, Cinzel, EB Garamond, Special Elite
