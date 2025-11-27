import { BULLET_HEIGHT, BULLET_WIDTH } from '../hooks/useGame'

function Bullet({ x, y }) {
  return (
    <div
      className="absolute bg-gradient-to-t from-arcade-yellow via-white to-arcade-cyan rounded-full"
      style={{
        left: x,
        top: y,
        width: BULLET_WIDTH,
        height: BULLET_HEIGHT,
        boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF',
      }}
    >
      {/* Bullet trail */}
      <div
        className="absolute top-full left-1/2 -translate-x-1/2 w-1 h-8 
                   bg-gradient-to-b from-arcade-cyan/50 to-transparent"
      />
    </div>
  )
}

export default Bullet
