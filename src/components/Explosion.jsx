function Explosion({ x, y }) {
  return (
    <div
      className="absolute pointer-events-none animate-explode"
      style={{
        left: x - 20,
        top: y - 20,
        width: 40,
        height: 40,
      }}
    >
      {/* Explosion particles */}
      <div className="relative w-full h-full">
        {/* Center flash */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FFFFFF 0%, #FFD700 30%, #FF6B00 60%, transparent 100%)',
          }}
        />

        {/* Explosion emoji */}
        <div className="absolute inset-0 flex items-center justify-center text-3xl">
          💥
        </div>

        {/* Particle effects */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-arcade-yellow rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-20px)`,
              animation: `explode 0.3s ease-out forwards`,
              animationDelay: `${i * 0.02}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Explosion
