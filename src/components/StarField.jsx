import { useMemo } from 'react'

function StarField() {
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2,
      opacity: Math.random() * 0.5 + 0.3,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Moving stars (shooting effect) */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-0.5 h-8 bg-gradient-to-b from-white to-transparent opacity-30"
          style={{
            left: `${10 + i * 20}%`,
            animation: `shootingStar ${3 + i}s linear infinite`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes shootingStar {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 0.3;
          }
          90% {
            opacity: 0.3;
          }
          100% {
            top: 110%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default StarField
