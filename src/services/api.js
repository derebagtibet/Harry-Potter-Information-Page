// services/api.js
// Harry Potter API service layer
// Sources:
//   - hp-api.onrender.com  → Characters, Students, Staff
//   - potterapi-fedeperin.vercel.app/en → Books, Spells, Houses

const HP_API = 'https://hp-api.onrender.com/api'
const POTTER_API = 'https://potterapi-fedeperin.vercel.app/en'

// Generic fetch helper with error handling
async function apiFetch(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
  return res.json()
}

// ---- Characters ----
export async function fetchAllCharacters() {
  return apiFetch(`${HP_API}/characters`)
}

export async function fetchStudents() {
  return apiFetch(`${HP_API}/characters/students`)
}

export async function fetchStaff() {
  return apiFetch(`${HP_API}/characters/staff`)
}

export async function fetchCharacterById(id) {
  return apiFetch(`${HP_API}/character/${id}`)
}

// ---- Books ----
export async function fetchBooks() {
  return apiFetch(`${POTTER_API}/books`)
}

// ---- Spells ----
export async function fetchSpells() {
  return apiFetch(`${POTTER_API}/spells`)
}

// ---- Houses ----
export async function fetchHouses() {
  return apiFetch(`${POTTER_API}/houses`)
}
