import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { Link } from 'react-router-dom'

// Each answer adds points to houses
const questions = [
  {
    q: 'You find a wallet on the ground with a lot of cash inside. What do you do?',
    answers: [
      { text: 'Hand it in immediately — it\'s the right thing to do.', G: 3, H: 2, R: 1, S: 0 },
      { text: 'Keep it. Finders keepers.', G: 0, H: 0, R: 0, S: 3 },
      { text: 'Try to find the owner using the cards inside.', G: 1, H: 2, R: 3, S: 0 },
      { text: 'Hand it in, but quietly hope for a reward.', G: 1, H: 3, R: 1, S: 1 },
    ],
  },
  {
    q: 'Which of these subjects would you most enjoy at Hogwarts?',
    answers: [
      { text: 'Defence Against the Dark Arts', G: 3, H: 1, R: 1, S: 1 },
      { text: 'Ancient Runes', G: 0, H: 1, R: 3, S: 2 },
      { text: 'Herbology', G: 1, H: 3, R: 1, S: 0 },
      { text: 'Potions', G: 0, H: 1, R: 2, S: 3 },
    ],
  },
  {
    q: 'A troll has escaped into the school. What do you do?',
    answers: [
      { text: 'Rush to help protect students, even if it\'s dangerous.', G: 3, H: 1, R: 0, S: 1 },
      { text: 'Alert a teacher immediately and follow instructions.', G: 1, H: 3, R: 1, S: 0 },
      { text: 'Analyse the situation and find the safest solution.', G: 0, H: 1, R: 3, S: 2 },
      { text: 'Use the chaos to your advantage somehow.', G: 0, H: 0, R: 1, S: 3 },
    ],
  },
  {
    q: 'Which quality do you value most in a friend?',
    answers: [
      { text: 'Loyalty — they\'ll always have your back.', G: 2, H: 3, R: 0, S: 1 },
      { text: 'Bravery — someone who stands up for what\'s right.', G: 3, H: 1, R: 0, S: 0 },
      { text: 'Intelligence — someone who keeps you sharp.', G: 0, H: 1, R: 3, S: 2 },
      { text: 'Ambition — someone who pushes you to grow.', G: 1, H: 0, R: 1, S: 3 },
    ],
  },
  {
    q: 'You discover a secret passage that leads outside the castle at night. You…',
    answers: [
      { text: 'Explore it! Adventure awaits.', G: 3, H: 1, R: 0, S: 1 },
      { text: 'Map it carefully and tell a trusted friend.', G: 1, H: 2, R: 3, S: 0 },
      { text: 'Tell a prefect — rules exist for a reason.', G: 0, H: 3, R: 1, S: 0 },
      { text: 'Keep it to yourself. It could be useful.', G: 0, H: 0, R: 1, S: 3 },
    ],
  },
  {
    q: 'If you could master one magical skill, what would it be?',
    answers: [
      { text: 'Patronus Charm — to protect those I love.', G: 3, H: 2, R: 0, S: 0 },
      { text: 'Legilimency — to understand people deeply.', G: 0, H: 1, R: 3, S: 2 },
      { text: 'Healing magic — to help the injured.', G: 1, H: 3, R: 1, S: 0 },
      { text: 'Occlumency — to guard my mind from others.', G: 1, H: 0, R: 1, S: 3 },
    ],
  },
  {
    q: 'You are given one hour of completely free time at Hogwarts. You…',
    answers: [
      { text: 'Head to the Quidditch pitch for a fly.', G: 3, H: 1, R: 0, S: 1 },
      { text: 'Spend it in the library reading ahead.', G: 0, H: 1, R: 3, S: 2 },
      { text: 'Help a struggling classmate with their homework.', G: 1, H: 3, R: 1, S: 0 },
      { text: 'Work on a personal project no one knows about.', G: 0, H: 0, R: 2, S: 3 },
    ],
  },
]

const houseData = {
  G: {
    name: 'Gryffindor',
    icon: '🦁',
    color: '#ff9090',
    bg: 'rgba(174,0,1,0.2)',
    border: 'rgba(174,0,1,0.5)',
    glow: 'rgba(174,0,1,0.4)',
    traits: 'Bravery · Nerve · Chivalry · Courage',
    desc: 'Where dwell the brave at heart! Gryffindors are known for their courage, daring, and determination. You face challenges head-on and stand up for what is right, no matter the cost.',
    members: 'Harry Potter · Hermione Granger · Ron Weasley · Albus Dumbledore',
  },
  S: {
    name: 'Slytherin',
    icon: '🐍',
    color: '#90ffa0',
    bg: 'rgba(42,120,74,0.2)',
    border: 'rgba(42,120,74,0.5)',
    glow: 'rgba(42,120,74,0.4)',
    traits: 'Ambition · Cunning · Resourcefulness · Leadership',
    desc: 'Those cunning folk use any means to achieve their ends. Slytherins are ambitious, shrewd, and determined. You know what you want and you have the resourcefulness to achieve it.',
    members: 'Draco Malfoy · Severus Snape · Merlin · Bellatrix Lestrange',
  },
  R: {
    name: 'Ravenclaw',
    icon: '🦅',
    color: '#90b0ff',
    bg: 'rgba(34,66,154,0.2)',
    border: 'rgba(34,66,154,0.5)',
    glow: 'rgba(34,66,154,0.4)',
    traits: 'Wisdom · Wit · Learning · Creativity',
    desc: 'Wit beyond measure is man\'s greatest treasure. Ravenclaws prize intelligence, knowledge, and wisdom above all. You have a natural curiosity and a love of learning that sets you apart.',
    members: 'Luna Lovegood · Cho Chang · Filius Flitwick · Helena Ravenclaw',
  },
  H: {
    name: 'Hufflepuff',
    icon: '🦡',
    color: '#ffd080',
    bg: 'rgba(236,185,57,0.2)',
    border: 'rgba(236,185,57,0.5)',
    glow: 'rgba,236,185,57,0.4)',
    traits: 'Loyalty · Patience · Hard Work · Fairness',
    desc: 'You might belong in Hufflepuff, where they are just and loyal. Hufflepuffs are known for their patience, dedication, and fairness. You value hard work and treat everyone with equal kindness.',
    members: 'Nymphadora Tonks · Cedric Diggory · Pomona Sprout · Newt Scamander',
  },
}

export default function SortingQuiz() {
  const [current, setCurrent] = useState(0)   // current question index
  const [scores, setScores] = useState({ G: 0, H: 0, R: 0, S: 0 })
  const [selected, setSelected] = useState(null) // index of chosen answer
  const [result, setResult] = useState(null)
  const [animating, setAnimating] = useState(false)
  const [showHat, setShowHat] = useState(false)

  const progress = (current / questions.length) * 100

  const choose = (answer, idx) => {
    if (selected !== null || animating) return
    setSelected(idx)

    // Add to scores
    const newScores = {
      G: scores.G + answer.G,
      H: scores.H + answer.H,
      R: scores.R + answer.R,
      S: scores.S + answer.S,
    }

    setTimeout(() => {
      if (current + 1 >= questions.length) {
        // Calculate winner
        const winner = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0]
        setScores(newScores)
        setShowHat(true)
        setTimeout(() => {
          setResult(winner)
          setShowHat(false)
        }, 2200)
      } else {
        setScores(newScores)
        setCurrent(c => c + 1)
        setSelected(null)
      }
    }, 600)
  }

  const reset = () => {
    setCurrent(0)
    setScores({ G: 0, H: 0, R: 0, S: 0 })
    setSelected(null)
    setResult(null)
    setShowHat(false)
  }

  const q = questions[current]
  const house = result ? houseData[result] : null

  // ── SORTING HAT THINKING ──
  if (showHat) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="text-8xl mb-8" style={{ animation: 'hatWiggle 0.4s ease-in-out infinite alternate' }}>
          🎩
        </div>
        <p className="font-display text-hp-gold text-sm tracking-[0.3em] animate-pulse">
          Hmm... difficult... very difficult...
        </p>
        <p className="font-body italic text-hp-parchment/50 mt-3">
          The Sorting Hat is deliberating...
        </p>
        <style>{`
          @keyframes hatWiggle {
            from { transform: rotate(-8deg) scale(1); }
            to   { transform: rotate(8deg) scale(1.08); }
          }
        `}</style>
      </div>
    )
  }

  // ── RESULT ──
  if (result && house) {
    const total = Object.values(scores).reduce((a, b) => a + b, 0)
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-28 pb-24 text-center">
        <div className="text-6xl mb-4 animate-bounce">{house.icon}</div>

        <h1
          className="font-display text-4xl md:text-5xl tracking-widest mb-2"
          style={{ color: house.color, textShadow: `0 0 30px ${house.glow}` }}
        >
          {house.name.toUpperCase()}
        </h1>

        <p className="font-heading text-hp-parchment/50 tracking-[0.3em] text-xs mb-8">
          THE SORTING HAT HAS DECIDED
        </p>

        {/* House card */}
        <div
          className="rounded-2xl p-8 mb-8 text-left"
          style={{ background: house.bg, border: `1px solid ${house.border}`, boxShadow: `0 0 60px ${house.glow}` }}
        >
          <p className="font-heading text-xs tracking-widest mb-3" style={{ color: house.color }}>
            ✦ {house.traits}
          </p>
          <p className="font-body text-hp-parchment/80 text-lg leading-relaxed mb-6 italic">
            "{house.desc}"
          </p>
          <div>
            <p className="font-heading text-hp-parchment/40 text-xs tracking-widest uppercase mb-2">Notable Members</p>
            <p className="font-body text-hp-parchment/65 text-sm">{house.members}</p>
          </div>
        </div>

        {/* Score breakdown */}
        <div className="card-parchment rounded-xl p-6 mb-8 border border-hp-gold/15">
          <p className="font-heading text-hp-gold/50 text-xs tracking-[0.25em] uppercase mb-5">Your Score Breakdown</p>
          <div className="space-y-3">
            {Object.entries(scores)
              .sort((a, b) => b[1] - a[1])
              .map(([key, val]) => {
                const h = houseData[key]
                const pct = Math.round((val / total) * 100)
                return (
                  <div key={key} className="flex items-center gap-3">
                    <span className="text-lg w-7">{h.icon}</span>
                    <span className="font-heading text-xs tracking-wide w-24 text-left" style={{ color: h.color }}>
                      {h.name}
                    </span>
                    <div className="flex-1 h-2 rounded-full bg-hp-stone overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${pct}%`, background: h.color }}
                      />
                    </div>
                    <span className="font-mono text-xs text-hp-parchment/50 w-10 text-right">{pct}%</span>
                  </div>
                )
              })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={reset}
            className="btn-spell font-heading text-xs tracking-widest px-8 py-3 rounded border border-hp-gold/40 text-hp-gold hover:bg-hp-gold/10 transition-all duration-300"
          >
            🎩 Try Again
          </button>
          <Link
            to="/characters"
            className="btn-spell font-heading text-xs tracking-widest px-8 py-3 rounded border border-hp-parchment/20 text-hp-parchment/60 hover:border-hp-gold/30 hover:text-hp-gold transition-all duration-300"
            style={{ borderColor: house.border, color: house.color }}
          >
            🧙 Meet Your Housemates
          </Link>
        </div>
      </div>
    )
  }

  // ── QUIZ ──
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-24">
      <PageHeader icon="🎩" title="SORTING HAT" subtitle="Answer honestly — the hat sees all..." />

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between font-mono text-hp-parchment/40 text-xs mb-2">
          <span>Question {current + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 rounded-full bg-hp-stone overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #c9a84c, #f0d080)',
            }}
          />
        </div>
      </div>

      {/* Question */}
      <div
        className="card-parchment rounded-2xl p-8 mb-6 border border-hp-gold/20"
        key={current}
        style={{ animation: 'fadeUp 0.4s ease forwards' }}
      >
        <p className="font-heading text-hp-parchment text-lg md:text-xl leading-relaxed text-center">
          {q.q}
        </p>
      </div>

      {/* Answers */}
      <div className="space-y-3">
        {q.answers.map((ans, idx) => {
          const isSelected = selected === idx
          const isOther = selected !== null && selected !== idx
          return (
            <button
              key={idx}
              onClick={() => choose(ans, idx)}
              disabled={selected !== null}
              className="w-full text-left font-body text-base rounded-xl px-6 py-4 transition-all duration-300 btn-spell"
              style={{
                background: isSelected
                  ? 'rgba(201,168,76,0.15)'
                  : 'rgba(26,21,16,0.8)',
                border: isSelected
                  ? '1px solid rgba(201,168,76,0.6)'
                  : '1px solid rgba(201,168,76,0.15)',
                color: isOther ? 'rgba(245,230,200,0.3)' : '#f5e6c8',
                cursor: selected !== null ? 'default' : 'pointer',
                transform: isSelected ? 'scale(1.01)' : 'scale(1)',
                boxShadow: isSelected ? '0 0 20px rgba(201,168,76,0.2)' : 'none',
                animation: `fadeUp 0.4s ease ${idx * 0.07}s both`,
              }}
            >
              <span className="font-heading text-hp-gold/60 text-xs mr-3 tracking-widest">
                {String.fromCharCode(65 + idx)}.
              </span>
              {ans.text}
            </button>
          )
        })}
      </div>
    </div>
  )
}
