import { useEffect, useState } from 'react'

function Menu({ onStart, highScore }) {
  const [showPress, setShowPress] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPress(prev => !prev)
    }, 500)

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onStart()
      }
    }

    window.addEventListener('keydown', handleKeyPress)

    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [onStart])

  return (
    <div className="flex flex-col items-center justify-center p-8 relative">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 mb-12">
        <h1 className="text-6xl font-arcade text-transparent bg-clip-text 
                       bg-gradient-to-b from-arcade-yellow via-arcade-red to-arcade-pink
                       drop-shadow-[0_0_30px_rgba(255,215,0,0.5)]">
          GALAGA
        </h1>
        <div className="text-center text-arcade-cyan font-arcade text-xs mt-2">
          ARCADE EDITION
        </div>
      </div>

      {/* Spaceship decoration */}
      <div className="mb-8 animate-bounce z-10">
        <svg
          viewBox="0 0 40 40"
          className="w-16 h-16"
          style={{
            filter: 'drop-shadow(0 0 15px rgba(0, 255, 255, 0.8))',
          }}
        >
          <polygon
            points="20,2 8,38 20,32 32,38"
            fill="url(#menuShipGradient)"
            stroke="#00FFFF"
            strokeWidth="1"
          />
          <ellipse cx="20" cy="18" rx="4" ry="6" fill="#00FFFF" opacity="0.9" />
          <ellipse cx="20" cy="17" rx="2" ry="3" fill="#FFFFFF" opacity="0.6" />
          <polygon points="8,38 2,34 6,28 12,32" fill="#FF6600" stroke="#FF9900" strokeWidth="0.5" />
          <polygon points="32,38 38,34 34,28 28,32" fill="#FF6600" stroke="#FF9900" strokeWidth="0.5" />
          <polygon points="4,33 7,30 8,34" fill="#FFD700" />
          <polygon points="36,33 33,30 32,34" fill="#FFD700" />
          <ellipse cx="20" cy="36" rx="4" ry="3" fill="#FF3300" opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.2s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="36" rx="2" ry="2" fill="#FFFF00">
            <animate attributeName="opacity" values="1;0.6;1" dur="0.15s" repeatCount="indefinite" />
          </ellipse>
          <defs>
            <linearGradient id="menuShipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00FFFF" />
              <stop offset="50%" stopColor="#0088FF" />
              <stop offset="100%" stopColor="#0044AA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* High Score */}
      <div className="text-arcade-yellow font-arcade text-sm mb-8 z-10">
        HIGH SCORE: {highScore.toLocaleString()}
      </div>

      {/* Start button */}
      <button
        onClick={onStart}
        className="px-12 py-6 bg-gradient-to-b from-arcade-green to-green-700 
                   text-black font-arcade text-lg rounded-lg
                   hover:from-green-400 hover:to-green-600 
                   transition-all duration-200 border-4 border-green-900
                   shadow-[0_0_20px_rgba(0,255,0,0.5)]
                   active:translate-y-1 z-10"
      >
        START GAME
      </button>

      {/* Press any key */}
      <div className={`mt-8 font-arcade text-sm text-white z-10 transition-opacity duration-200
                      ${showPress ? 'opacity-100' : 'opacity-0'}`}>
        PRESS ENTER OR SPACE
      </div>

      {/* Controls info */}
      <div className="mt-12 text-gray-500 font-arcade text-xs z-10 text-center">
        <div className="mb-2">CONTROLS:</div>
        <div className="flex gap-8 justify-center">
          <div>← → MOVE</div>
          <div>SPACE FIRE</div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-gray-600 font-arcade text-xs">
        © 2025 GALAGA - DIONE VIANNA
      </div>
    </div>
  )
}

export default Menu
