import { POWERUP_TYPES } from '../hooks/useGame'

function PowerUp({ x, y, type }) {
  const powerUp = POWERUP_TYPES[type]

  return (
    <div
      className={`absolute w-8 h-8 rounded-full flex items-center justify-center
                  animate-bounce ${powerUp.color}`}
      style={{
        left: x,
        top: y,
        boxShadow: '0 0 15px currentColor',
      }}
    >
      <span className="text-xl">{powerUp.emoji}</span>
    </div>
  )
}

export default PowerUp
