import { ENEMY_HEIGHT, ENEMY_TYPES, ENEMY_WIDTH } from '../hooks/useGame'

function Enemy({ x, y, type, health }) {
  const enemyType = ENEMY_TYPES[type]
  const maxHealth = ENEMY_TYPES[type].health
  const healthPercent = (health / maxHealth) * 100

  return (
    <div
      className="absolute transition-transform duration-50"
      style={{
        left: x,
        top: y,
        width: ENEMY_WIDTH,
        height: ENEMY_HEIGHT,
      }}
    >
      {/* Enemy sprite */}
      <div
        className="relative w-full h-full flex items-center justify-center text-3xl"
        style={{
          filter: health < maxHealth
            ? 'drop-shadow(0 0 5px rgba(255, 0, 0, 0.8))'
            : 'drop-shadow(0 0 8px rgba(255, 100, 100, 0.5))',
        }}
      >
        {enemyType.emoji}
      </div>

      {/* Health bar for enemies with more than 1 health */}
      {maxHealth > 1 && (
        <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-700 rounded">
          <div
            className="h-full bg-arcade-red rounded transition-all duration-100"
            style={{ width: `${healthPercent}%` }}
          />
        </div>
      )}

      {/* Damage flash effect */}
      {health < maxHealth && (
        <div className="absolute inset-0 bg-red-500/30 rounded animate-pulse" />
      )}
    </div>
  )
}

export default Enemy
