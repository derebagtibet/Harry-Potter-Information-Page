// Magical floating particle effect in the background
import { useEffect, useRef } from 'react'

export default function FloatingParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Create particles
    const particles = []
    const count = 18

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div')
      p.className = 'particle'
      const size = Math.random() * 3 + 1
      p.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.5 ? '#c9a84c' : '#f0d080'};
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        opacity: 0;
        pointer-events: none;
        z-index: 0;
        animation: float ${8 + Math.random() * 12}s linear ${Math.random() * 10}s infinite;
        box-shadow: 0 0 ${size * 2}px rgba(201,168,76,0.8);
      `
      container.appendChild(p)
      particles.push(p)
    }

    return () => {
      particles.forEach(p => p.remove())
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" aria-hidden="true" />
}
