function HUD({ score, lives, wave, hasDoubleFire, hasShield, hasSpeedBoost }) {
  return (
    <div className="absolute top-0 left-0 right-0 z-40 pointer-events-none">
      {/* Top bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-gradient-to-b from-black/80 to-transparent">
        {/* Score */}
        <div className="text-white font-arcade text-xs">
          <span className="text-gray-400">SCORE:</span>
          <span className="text-arcade-yellow ml-2">{score.toLocaleString()}</span>
        </div>

        {/* Wave */}
        <div className="text-white font-arcade text-xs">
          <span className="text-gray-400">WAVE:</span>
          <span className="text-arcade-cyan ml-2">{wave}</span>
        </div>

        {/* Lives */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-lg transition-opacity duration-200 
                         ${i < lives ? 'opacity-100' : 'opacity-20'}`}
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Active power-ups */}
      {(hasDoubleFire || hasShield || hasSpeedBoost) && (
        <div className="flex justify-center gap-2 mt-1">
          {hasDoubleFire && (
            <div className="px-2 py-1 bg-orange-500/80 rounded text-xs font-arcade flex items-center gap-1">
              <span>🔥</span>
              <span className="text-white">2X</span>
            </div>
          )}
          {hasShield && (
            <div className="px-2 py-1 bg-blue-500/80 rounded text-xs font-arcade flex items-center gap-1">
              <span>🛡️</span>
              <span className="text-white">SHIELD</span>
            </div>
          )}
          {hasSpeedBoost && (
            <div className="px-2 py-1 bg-yellow-500/80 rounded text-xs font-arcade flex items-center gap-1">
              <span>⚡</span>
              <span className="text-black">SPEED</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default HUD
