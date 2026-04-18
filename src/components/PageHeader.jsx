// Reusable magical page header with decorative elements
export default function PageHeader({ icon, title, subtitle, children }) {
  return (
    <div className="relative pt-28 pb-12 md:pt-36 md:pb-16 text-center px-4">
      {/* Decorative radial glow behind title */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
        }}
      />

      {icon && (
        <div className="text-5xl mb-4 animate-float inline-block" style={{ animation: 'float 5s ease-in-out infinite' }}>
          {icon}
        </div>
      )}

      <h1 className="font-display text-2xl md:text-4xl text-gold-shimmer tracking-widest mb-3">
        {title}
      </h1>

      {subtitle && (
        <p className="font-body italic text-hp-parchment/60 text-base md:text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}

      {children && (
        <div className="mt-6">{children}</div>
      )}

      {/* Decorative divider */}
      <div className="divider-magic max-w-xs mx-auto mt-8">
        <span className="text-hp-gold/50 font-heading text-xs tracking-[0.3em]">✦ ✦ ✦</span>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  )
}
