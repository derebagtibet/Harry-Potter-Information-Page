import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchAllCharacters, fetchSpells } from '../services/api'
import CharacterSelector, { houseColors } from '../components/CharacterSelector'
import LoadingSpell from '../components/LoadingSpell'
import ErrorScroll from '../components/ErrorScroll'
import PageHeader from '../components/PageHeader'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function rollD(sides) {
  return 1 + Math.floor(Math.random() * sides)
}

const FALLBACK_SPELLS = [
  { spell: 'Stupefy', use: 'Stuns opponent — duel standard' },
  { spell: 'Expelliarmus', use: 'Disarms opponent' },
  { spell: 'Protego', use: 'Deflects minor jinxes' },
  { spell: 'Confringo', use: 'Blasts target — causes harm' },
  { spell: 'Episkey', use: 'Heals minor injuries' },
]

function spellAttackDie(spell) {
  const t = `${spell.spell || ''} ${spell.use || ''}`.toLowerCase()
  if (/avada|unforgivable|cruci|imperio|killing|torture|death/i.test(t)) return 10
  if (/harm|hurt|attack|curse|pain|injur|damage|hex|jinx|blast|stun|duel|knock|burn|cut/i.test(t)) return 8
  return 6
}

function isHealingSpell(spell) {
  const u = (spell.use || '').toLowerCase()
  if (/harm|hurt|attack|curse|pain|damage|duel|stun|blast/i.test(u)) return false
  return /\b(heals?|healing|mends|cure|episkey|recover|ferula|restores)\b/i.test(u)
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function rollStartingHp() {
  const d10a = rollD(10)
  const d10b = rollD(10)
  const d6 = rollD(6)
  return { total: 32 + d10a + d10b + d6, d10a, d10b, d6 }
}

export default function SpellDuel() {
  const [characters, setCharacters] = useState([])
  const [spells, setSpells] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [charA, setCharA] = useState(null)
  const [charB, setCharB] = useState(null)

  const [duelOn, setDuelOn] = useState(false)
  const [turn, setTurn] = useState('A')
  const [hpA, setHpA] = useState(0)
  const [hpB, setHpB] = useState(0)
  const [maxA, setMaxA] = useState(0)
  const [maxB, setMaxB] = useState(0)
  const [winner, setWinner] = useState(null)
  const [log, setLog] = useState([])
  const [busy, setBusy] = useState(false)

  const [fx, setFx] = useState(null)
  /** @type {null | { spellRoll: number, focusRoll: number, wardRoll: number, dieSides: number, surge: number, healAmount?: number, isHeal: boolean }} */
  const [lastDice, setLastDice] = useState(null)
  const winnerLogged = useRef(false)
  const hpARef = useRef(0)
  const hpBRef = useRef(0)
  hpARef.current = hpA
  hpBRef.current = hpB

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [chars, spl] = await Promise.all([fetchAllCharacters(), fetchSpells()])
      setCharacters(chars)
      setSpells(Array.isArray(spl) && spl.length ? spl : FALLBACK_SPELLS)
      setCharA(chars.find((c) => c.name === 'Harry Potter') || null)
      setCharB(chars.find((c) => c.name === 'Bellatrix Lestrange') || chars.find((c) => c.name === 'Draco Malfoy') || null)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const spellList = spells.length ? spells : FALLBACK_SPELLS

  const resetDuelState = () => {
    setDuelOn(false)
    setWinner(null)
    winnerLogged.current = false
    setFx(null)
    setLastDice(null)
    setLog([])
    setBusy(false)
  }

  const beginDuel = () => {
    if (!charA || !charB || charA.id === charB.id) return
    const sa = rollStartingHp()
    const sb = rollStartingHp()
    const first = rollD(2) === 1 ? 'A' : 'B'
    setMaxA(sa.total)
    setMaxB(sb.total)
    setHpA(sa.total)
    setHpB(sb.total)
    setWinner(null)
    winnerLogged.current = false
    setDuelOn(true)
    setTurn(first)
    setFx(null)
    setLastDice(null)
    setLog([
      `⚔️ Duel begins: ${charA.name} vs ${charB.name}`,
      `🎲 ${charA.name} stamina (2d10 + 1d6 + 32): ${sa.d10a} + ${sa.d10b} + ${sa.d6} → ${sa.total} HP.`,
      `🎲 ${charB.name} stamina (2d10 + 1d6 + 32): ${sb.d10a} + ${sb.d10b} + ${sb.d6} → ${sb.total} HP.`,
      `First wand: ${first === 'A' ? charA.name : charB.name} (d2 coin).`,
    ])
  }

  const appendLog = (line) => setLog((L) => [...L, line])

  const castSpell = async () => {
    if (!duelOn || winner || busy || !charA || !charB) return
    const atk = turn === 'A' ? charA : charB
    const def = turn === 'A' ? charB : charA
    const atkKey = turn
    const defKey = turn === 'A' ? 'B' : 'A'

    const spell = pickRandom(spellList)
    const name = spell.spell || 'Unknown incantation'

    setBusy(true)
    setLastDice(null)
    setFx({ phase: 'charge', atk: atkKey, spell: name })

    await sleep(750)

    const heal = isHealingSpell(spell)
    if (heal) {
      const h1 = rollD(6)
      const h2 = rollD(4)
      const healAmount = h1 + h2
      setLastDice({ isHeal: true, healAmount, spellRoll: h1, focusRoll: h2, wardRoll: 0, dieSides: 6, surge: 0 })
      setFx({ phase: 'cast', atk: atkKey, spell: name, heal: true })
      await sleep(700)
      setFx({ phase: 'recover', atk: atkKey, spell: name, heal: healAmount })
      await sleep(600)

      if (atkKey === 'A') {
        setHpA((h) => Math.min(maxA, h + healAmount))
      } else {
        setHpB((h) => Math.min(maxB, h + healAmount))
      }
      appendLog(`✨ ${atk.name} casts ${name} — healing dice d6+d4: ${h1} + ${h2} = +${healAmount} HP (capped at max).`)
      setTurn(defKey)
      setFx(null)
      setBusy(false)
      return
    }

    const dieSides = spellAttackDie(spell)
    const spellRoll = rollD(dieSides)
    const focusRoll = rollD(6)
    const wardRoll = rollD(8)
    let surge = 0
    if (spellRoll === dieSides && dieSides >= 8) surge = rollD(6)
    const power = spellRoll + focusRoll + surge
    const damage = Math.max(0, power - wardRoll)

    setLastDice({ spellRoll, focusRoll, wardRoll, dieSides, surge, isHeal: false })

    setFx({ phase: 'cast', atk: atkKey, spell: name })
    await sleep(720)
    setFx({ phase: 'strike', atk: atkKey, def: defKey, spell: name, damage })
    await sleep(650)

    const prevDef = defKey === 'A' ? hpARef.current : hpBRef.current
    const nextDef = Math.max(0, prevDef - damage)
    if (defKey === 'A') setHpA(nextDef)
    else setHpB(nextDef)

    const critNote = surge ? ` Critical surge +d6: ${surge}!` : ''
    appendLog(
      `⚡ ${atk.name} → ${def.name}: ${name} | d${dieSides}=${spellRoll}, focus d6=${focusRoll}${surge ? `, surge d6=${surge}` : ''} vs ward d8=${wardRoll} → ${damage} damage.${critNote}`,
    )

    if (nextDef > 0) setTurn(defKey)
    setFx(null)
    setBusy(false)
  }

  useEffect(() => {
    if (!duelOn || !winner || winnerLogged.current) return
    const w = winner === 'A' ? charA?.name : charB?.name
    if (w) {
      winnerLogged.current = true
      setLog((L) => [...L, `🏆 ${w} wins the duel!`])
    }
  }, [winner, duelOn, charA?.name, charB?.name])

  useEffect(() => {
    if (!duelOn || winner) return
    if (hpA <= 0) setWinner('B')
    else if (hpB <= 0) setWinner('A')
  }, [duelOn, hpA, hpB, winner])

  const pct = (cur, max) => (max <= 0 ? 0 : Math.round((cur / max) * 100))

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
      <PageHeader
        icon="✨"
        title="SPELL DUEL"
        subtitle="Pick two duelists. Each turn draws a random spell from the archives — damage and stamina are settled with dice, with a short magical animation between rounds."
      />

      {loading && <LoadingSpell message="Loading wands and spellbooks..." />}
      {error && <ErrorScroll message={error} onRetry={load} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <CharacterSelector characters={characters} selected={charA} onSelect={setCharA} side="A" />
            <CharacterSelector characters={characters} selected={charB} onSelect={setCharB} side="B" />
          </div>

          {charA && charB && charA.id === charB.id && (
            <p className="text-center font-body text-hp-maroon-light text-sm mb-6">Choose two different characters.</p>
          )}

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              type="button"
              disabled={!charA || !charB || charA.id === charB.id || busy}
              onClick={beginDuel}
              className="btn-spell font-heading tracking-widest text-xs px-6 py-3 rounded border border-hp-gold/50 text-hp-gold bg-hp-gold/10 hover:bg-hp-gold/20 disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              Begin duel
            </button>
            <button
              type="button"
              disabled={!duelOn || !!winner || busy || !charA || !charB}
              onClick={castSpell}
              className="btn-spell font-heading tracking-widest text-xs px-6 py-3 rounded border border-hp-parchment/25 text-hp-parchment/80 hover:border-hp-gold/40 hover:text-hp-gold disabled:opacity-40 disabled:pointer-events-none transition-all"
            >
              {busy ? 'Casting…' : winner ? 'Duel over' : `Cast — ${turn === 'A' ? charA?.name : charB?.name}'s turn`}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={resetDuelState}
              className="font-heading tracking-widest text-xs px-4 py-3 rounded border border-hp-gold/15 text-hp-parchment/50 hover:text-hp-parchment transition-all"
            >
              Reset
            </button>
          </div>

          {/* Arena */}
          <div className="relative card-parchment rounded-2xl border border-hp-gold/20 p-6 mb-8 overflow-visible">
            <div
              className="absolute inset-0 pointer-events-none opacity-30"
              style={{ background: 'radial-gradient(ellipse at 50% 20%, rgba(201,168,76,0.12) 0%, transparent 55%)' }}
            />

            <div className="relative grid grid-cols-[1fr_auto_1fr] gap-4 items-end min-h-[220px]">
              {/* A */}
              <div
                className={`flex flex-col items-center gap-3 transition-transform duration-300 ${
                  fx?.phase === 'strike' && fx.def === 'A' ? 'animate-duel-shake' : ''
                } ${fx?.phase === 'charge' && fx.atk === 'A' ? 'scale-105 ring-2 ring-hp-gold/50 rounded-2xl' : ''}`}
              >
                <div
                  className="w-full max-w-[160px] aspect-square rounded-2xl overflow-hidden border-2 transition-shadow"
                  style={{
                    borderColor: houseColors[charA?.house] || 'rgba(201,168,76,0.45)',
                    boxShadow:
                      fx?.phase === 'charge' && fx.atk === 'A'
                        ? '0 0 40px rgba(201,168,76,0.45)'
                        : `0 0 20px ${houseColors[charA?.house] || 'rgba(201,168,76,0.15)'}40`,
                  }}
                >
                  {charA?.image ? (
                    <img src={charA.image} alt="" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-hp-stone flex items-center justify-center text-5xl opacity-25">🧙</div>
                  )}
                </div>
                <p className="font-heading text-xs text-hp-gold tracking-wide text-center">{charA?.name}</p>
                <div className="w-full max-w-[200px]">
                  <div className="flex justify-between font-mono text-[10px] text-hp-parchment/50 mb-1">
                    <span>HP</span>
                    <span>
                      {duelOn ? hpA : '—'} / {duelOn ? maxA : '—'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-hp-darker border border-hp-gold/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-hp-maroon to-hp-maroon-light transition-all duration-500"
                      style={{ width: duelOn ? `${pct(hpA, maxA)}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Center FX */}
              <div className="relative z-10 flex flex-col items-center justify-center pb-10 min-w-[100px]">
                {fx?.phase === 'cast' || fx?.phase === 'strike' ? (
                  <div
                    className={`text-center px-2 ${fx.phase === 'cast' ? 'animate-duel-spell' : ''}`}
                    key={fx.spell}
                  >
                    <span className="text-3xl block mb-1">🪄</span>
                    <span className="font-display text-hp-gold text-xs tracking-widest block max-w-[140px] leading-tight">
                      {fx.spell}
                    </span>
                  </div>
                ) : (
                  <div className="text-hp-gold/30 font-display text-xs tracking-[0.4em]">VS</div>
                )}

                {fx?.phase === 'strike' && typeof fx.damage === 'number' && (
                  <span className="mt-2 font-display text-2xl text-hp-maroon-light animate-duel-floatnum">
                    −{fx.damage}
                  </span>
                )}
                {fx?.phase === 'recover' && (
                  <span className="mt-2 font-display text-xl text-green-400/90 animate-duel-floatnum">+{fx.heal}</span>
                )}

                {fx?.phase === 'cast' && fx.atk && (
                  <div
                    className={`absolute left-1/2 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gradient-to-r from-transparent via-hp-gold to-transparent opacity-80 animate-duel-bolt ${
                      fx.atk === 'A' ? 'origin-left scale-x-150' : 'origin-right scale-x-[-1.5]'
                    }`}
                    style={{ width: 'min(55vw, 420px)' }}
                  />
                )}
              </div>

              {/* B */}
              <div
                className={`flex flex-col items-center gap-3 transition-transform duration-300 ${
                  fx?.phase === 'strike' && fx.def === 'B' ? 'animate-duel-shake' : ''
                } ${fx?.phase === 'charge' && fx.atk === 'B' ? 'scale-105 ring-2 ring-hp-gold/50 rounded-2xl' : ''}`}
              >
                <div
                  className="w-full max-w-[160px] aspect-square rounded-2xl overflow-hidden border-2 transition-shadow"
                  style={{
                    borderColor: houseColors[charB?.house] || 'rgba(201,168,76,0.45)',
                    boxShadow:
                      fx?.phase === 'charge' && fx.atk === 'B'
                        ? '0 0 40px rgba(201,168,76,0.45)'
                        : `0 0 20px ${houseColors[charB?.house] || 'rgba(201,168,76,0.15)'}40`,
                  }}
                >
                  {charB?.image ? (
                    <img src={charB.image} alt="" className="w-full h-full object-cover object-top" />
                  ) : (
                    <div className="w-full h-full bg-hp-stone flex items-center justify-center text-5xl opacity-25">🧙</div>
                  )}
                </div>
                <p className="font-heading text-xs text-hp-gold tracking-wide text-center">{charB?.name}</p>
                <div className="w-full max-w-[200px]">
                  <div className="flex justify-between font-mono text-[10px] text-hp-parchment/50 mb-1">
                    <span>HP</span>
                    <span>
                      {duelOn ? hpB : '—'} / {duelOn ? maxB : '—'}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-hp-darker border border-hp-gold/20 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-hp-slytherin to-emerald-600/80 transition-all duration-500"
                      style={{ width: duelOn ? `${pct(hpB, maxB)}%` : '0%' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {duelOn && !winner && (
              <p className="relative text-center font-heading text-[10px] tracking-widest text-hp-parchment/40 mt-4 uppercase">
                {turn === 'A' ? charA?.name : charB?.name}&apos;s wand — roll resolves on Cast
              </p>
            )}
            {winner && (
              <p className="relative text-center font-display text-hp-gold text-sm tracking-widest mt-4">
                🏆 {winner === 'A' ? charA?.name : charB?.name} is victorious
              </p>
            )}
          </div>

          {/* Dice readout */}
          {lastDice && (
            <div className="card-parchment rounded-xl border border-hp-gold/15 p-4 mb-8">
              <h3 className="font-heading text-hp-gold/60 text-[10px] tracking-[0.25em] uppercase mb-3">Last resolution</h3>
              {lastDice.isHeal ? (
                <p className="font-mono text-sm text-hp-parchment/85">
                  Healing: d6 ({lastDice.spellRoll}) + d4 ({lastDice.focusRoll}) ={' '}
                  <span className="text-green-400/90">+{lastDice.healAmount}</span> HP
                </p>
              ) : (
                <p className="font-mono text-sm text-hp-parchment/85 leading-relaxed">
                  Spell d{lastDice.dieSides}: <span className="text-hp-gold">{lastDice.spellRoll}</span> · Focus d6:{' '}
                  <span className="text-hp-gold">{lastDice.focusRoll}</span>
                  {lastDice.surge ? (
                    <>
                      {' '}
                      · Surge d6: <span className="text-hp-maroon-light">{lastDice.surge}</span>
                    </>
                  ) : null}{' '}
                  · Ward d8: <span className="text-hp-parchment/60">{lastDice.wardRoll}</span>
                </p>
              )}
            </div>
          )}

          {/* Log */}
          <div className="card-parchment rounded-xl border border-hp-gold/15 p-4 max-h-56 overflow-y-auto">
            <h3 className="font-heading text-hp-gold/60 text-[10px] tracking-[0.25em] uppercase mb-3">Battle log</h3>
            {log.length === 0 ? (
              <p className="font-body text-hp-parchment/35 text-sm italic">Begin a duel to see the grimoire entries.</p>
            ) : (
              <ul className="space-y-2">
                {log.map((line, i) => (
                  <li key={i} className="font-body text-hp-parchment/75 text-sm border-b border-hp-gold/5 pb-2 last:border-0">
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}

      <style>{`
        @keyframes duelShake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-8px) rotate(-1deg); }
          30% { transform: translateX(8px) rotate(1deg); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
        }
        .animate-duel-shake { animation: duelShake 0.45s ease-in-out; }
        @keyframes duelSpell {
          0% { opacity: 0; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-duel-spell { animation: duelSpell 0.55s ease-out; }
        @keyframes duelBolt {
          0% { opacity: 0; transform: translateX(-50%) translateY(-50%) scaleX(0.2); }
          35% { opacity: 1; }
          100% { opacity: 0.85; transform: translateX(-50%) translateY(-50%) scaleX(1); }
        }
        .animate-duel-bolt {
          animation: duelBolt 0.65s ease-out forwards;
        }
        @keyframes duelFloatnum {
          0% { opacity: 0; transform: translateY(12px) scale(0.8); }
          30% { opacity: 1; transform: translateY(0) scale(1.15); }
          100% { opacity: 0.9; transform: translateY(-10px) scale(1); }
        }
        .animate-duel-floatnum { animation: duelFloatnum 0.55s ease-out; }
      `}</style>
    </div>
  )
}
