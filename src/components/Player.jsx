import { PLAYER_HEIGHT, PLAYER_WIDTH } from '../hooks/useGame'

function Player({ x, y, hasShield }) {
  return (
    <div
      className="absolute transition-transform duration-50"
      style={{
        left: x,
        top: y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
      }}
    >
      {/* Shield effect */}
      {hasShield && (
        <div
          className="absolute -inset-3 rounded-full border-2 border-arcade-cyan 
                     animate-pulse opacity-70"
          style={{
            background: 'radial-gradient(circle, rgba(0,255,255,0.3) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Player spaceship - Galaga style */}
      <svg
        viewBox="0 0 40 40"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(0, 255, 255, 0.8))',
        }}
      >
        {/* Main body */}
        <polygon
          points="20,2 8,38 20,32 32,38"
          fill="url(#shipGradient)"
          stroke="#00FFFF"
          strokeWidth="1"
        />

        {/* Cockpit */}
        <ellipse cx="20" cy="18" rx="4" ry="6" fill="#00FFFF" opacity="0.9" />
        <ellipse cx="20" cy="17" rx="2" ry="3" fill="#FFFFFF" opacity="0.6" />

        {/* Left wing */}
        <polygon
          points="8,38 2,34 6,28 12,32"
          fill="#FF6600"
          stroke="#FF9900"
          strokeWidth="0.5"
        />

        {/* Right wing */}
        <polygon
          points="32,38 38,34 34,28 28,32"
          fill="#FF6600"
          stroke="#FF9900"
          strokeWidth="0.5"
        />

        {/* Wing details */}
        <polygon points="4,33 7,30 8,34" fill="#FFD700" />
        <polygon points="36,33 33,30 32,34" fill="#FFD700" />

        {/* Center stripe */}
        <line x1="20" y1="8" x2="20" y2="28" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />

        {/* Engine glow */}
        <ellipse cx="20" cy="36" rx="4" ry="3" fill="#FF3300" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.5;0.9" dur="0.2s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="20" cy="36" rx="2" ry="2" fill="#FFFF00" opacity="0.9">
          <animate attributeName="opacity" values="1;0.6;1" dur="0.15s" repeatCount="indefinite" />
        </ellipse>

        {/* Gradient definition */}
        <defs>
          <linearGradient id="shipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00FFFF" />
            <stop offset="50%" stopColor="#0088FF" />
            <stop offset="100%" stopColor="#0044AA" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default Player
