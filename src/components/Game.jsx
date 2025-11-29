import { useCallback, useEffect, useRef, useState } from 'react'
import { useAudio } from '../contexts/AudioContext'
import {
  BULLET_HEIGHT,
  BULLET_SPEED,
  BULLET_WIDTH,
  checkCollision,
  clamp,
  ENEMY_HEIGHT,
  ENEMY_SPEED_BASE,
  ENEMY_TYPES,
  ENEMY_WIDTH,
  GAME_HEIGHT,
  GAME_WIDTH,
  generateId,
  MAX_BULLETS,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_WIDTH,
  POWERUP_TYPES,
  randomBetween,
  resetIdCounter,
  useGameLoop,
  useKeyboard,
} from '../hooks/useGame'
import Bullet from './Bullet'
import Enemy from './Enemy'
import Explosion from './Explosion'
import HUD from './HUD'
import MobileControls from './MobileControls'
import Player from './Player'
import PowerUp from './PowerUp'
import StarField from './StarField'

function Game({ onGameOver }) {
  // Game state
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [wave, setWave] = useState(1)
  const [isRunning, setIsRunning] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  // Player state
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2)
  const [playerY] = useState(GAME_HEIGHT - PLAYER_HEIGHT - 20)

  // Game objects
  const [bullets, setBullets] = useState([])
  const [enemies, setEnemies] = useState([])
  const [explosions, setExplosions] = useState([])
  const [powerUps, setPowerUps] = useState([])

  // Power-up states
  const [hasDoubleFire, setHasDoubleFire] = useState(false)
  const [hasShield, setHasShield] = useState(false)
  const [hasSpeedBoost, setHasSpeedBoost] = useState(false)

  // Refs for game loop
  const keysPressed = useKeyboard()
  const lastShotTime = useRef(0)
  const lastSpawnTime = useRef(0)
  const enemiesDefeated = useRef(0)
  const gameContainerRef = useRef(null)
  const mobileMovement = useRef({ left: false, right: false })
  const playerXRef = useRef(playerX) // Ref to track current player position
  const [isMobile, setIsMobile] = useState(false)

  // Keep playerXRef in sync with playerX state
  useEffect(() => {
    playerXRef.current = playerX
  }, [playerX])

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Audio
  const audio = useAudio()

  // Handle pause/resume music
  useEffect(() => {
    if (isPaused) {
      audio.pauseMusic()
    } else if (isRunning) {
      audio.resumeMusic()
    }
  }, [isPaused, isRunning, audio])

  // Focus game container
  useEffect(() => {
    if (gameContainerRef.current) {
      gameContainerRef.current.focus()
    }
  }, [])

  // Handle pause
  useEffect(() => {
    const handlePause = (e) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        setIsPaused(prev => !prev)
      }
      // Toggle mute with M key
      if (e.key === 'm' || e.key === 'M') {
        const muted = audio.toggleMute()
        setIsMuted(muted)
      }
    }
    window.addEventListener('keydown', handlePause)
    return () => window.removeEventListener('keydown', handlePause)
  }, [audio])

  // Mobile control handlers (movement only - fire defined after fireBullet)
  const handleMobileLeft = useCallback(() => {
    mobileMovement.current.left = true
    mobileMovement.current.right = false
  }, [])

  const handleMobileRight = useCallback(() => {
    mobileMovement.current.right = true
    mobileMovement.current.left = false
  }, [])

  const handleMobileStopMove = useCallback(() => {
    mobileMovement.current.left = false
    mobileMovement.current.right = false
  }, [])

  const handleMobilePause = useCallback(() => {
    setIsPaused(prev => !prev)
  }, [])

  // Spawn enemies
  const spawnEnemy = useCallback(() => {
    const types = Object.keys(ENEMY_TYPES)
    // Higher waves have more chance of harder enemies
    const typeWeights = [
      Math.max(0, 10 - wave), // basic
      wave >= 2 ? Math.min(wave * 2, 8) : 0, // fast
      wave >= 3 ? Math.min(wave, 5) : 0, // tank
      wave >= 5 ? Math.min(wave - 4, 3) : 0, // boss
    ]

    const totalWeight = typeWeights.reduce((a, b) => a + b, 0)
    let random = Math.random() * totalWeight
    let selectedType = 'basic'

    for (let i = 0; i < types.length; i++) {
      random -= typeWeights[i]
      if (random <= 0) {
        selectedType = types[i]
        break
      }
    }

    const enemyType = ENEMY_TYPES[selectedType]
    const x = randomBetween(ENEMY_WIDTH, GAME_WIDTH - ENEMY_WIDTH * 2)

    return {
      id: generateId(),
      x,
      y: -ENEMY_HEIGHT,
      type: selectedType,
      health: enemyType.health,
      speed: ENEMY_SPEED_BASE * enemyType.speedMultiplier * (1 + wave * 0.1),
    }
  }, [wave])

  // Spawn power-up
  const spawnPowerUp = useCallback((x, y) => {
    if (Math.random() > 0.15) return null // 15% chance

    const types = Object.keys(POWERUP_TYPES)
    const type = types[Math.floor(Math.random() * types.length)]

    return {
      id: generateId(),
      x,
      y,
      type,
    }
  }, [])

  // Apply power-up
  const applyPowerUp = useCallback((type) => {
    const powerUp = POWERUP_TYPES[type]
    audio.playPowerUp()

    switch (type) {
      case 'doubleFire':
        setHasDoubleFire(true)
        setTimeout(() => setHasDoubleFire(false), powerUp.duration)
        break
      case 'shield':
        setHasShield(true)
        setTimeout(() => setHasShield(false), powerUp.duration)
        break
      case 'speedBoost':
        setHasSpeedBoost(true)
        setTimeout(() => setHasSpeedBoost(false), powerUp.duration)
        break
      case 'extraLife':
        setLives(prev => Math.min(prev + 1, 5))
        break
    }
  }, [audio])

  // Fire bullet
  const fireBullet = useCallback(() => {
    const now = Date.now()
    const cooldown = hasDoubleFire ? 100 : 200

    if (now - lastShotTime.current < cooldown) return
    if (bullets.length >= MAX_BULLETS) return

    lastShotTime.current = now
    audio.playShoot()

    // Use ref for current position (important for mobile continuous fire)
    const currentPlayerX = playerXRef.current

    const newBullets = []

    if (hasDoubleFire) {
      // Double fire - two bullets
      newBullets.push({
        id: generateId(),
        x: currentPlayerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2 - 10,
        y: playerY,
      })
      newBullets.push({
        id: generateId(),
        x: currentPlayerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2 + 10,
        y: playerY,
      })
    } else {
      // Single fire
      newBullets.push({
        id: generateId(),
        x: currentPlayerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
        y: playerY,
      })
    }

    setBullets(prev => [...prev, ...newBullets])
  }, [playerY, bullets.length, hasDoubleFire, audio])

  // Mobile fire handler (must be after fireBullet)
  const handleMobileFire = useCallback(() => {
    fireBullet()
  }, [fireBullet])

  // Game loop
  const gameLoop = useCallback((deltaTime) => {
    if (isPaused || !isRunning) return

    const keys = keysPressed.current
    const mobile = mobileMovement.current
    const speed = hasSpeedBoost ? PLAYER_SPEED * 1.5 : PLAYER_SPEED

    // Move player (keyboard or mobile)
    if (keys['ArrowLeft'] || keys['a'] || keys['A'] || mobile.left) {
      setPlayerX(prev => clamp(prev - speed, 0, GAME_WIDTH - PLAYER_WIDTH))
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D'] || mobile.right) {
      setPlayerX(prev => clamp(prev + speed, 0, GAME_WIDTH - PLAYER_WIDTH))
    }

    // Fire (keyboard only - mobile uses button)
    if (keys[' ']) {
      fireBullet()
    }

    // Update bullets
    setBullets(prev => prev
      .map(bullet => ({ ...bullet, y: bullet.y - BULLET_SPEED }))
      .filter(bullet => bullet.y > -BULLET_HEIGHT)
    )

    // Spawn enemies
    const now = Date.now()
    const spawnInterval = Math.max(500, 1500 - wave * 100)
    if (now - lastSpawnTime.current > spawnInterval) {
      lastSpawnTime.current = now
      setEnemies(prev => [...prev, spawnEnemy()])
    }

    // Update enemies
    setEnemies(prev => prev
      .map(enemy => ({ ...enemy, y: enemy.y + enemy.speed }))
      .filter(enemy => enemy.y < GAME_HEIGHT + ENEMY_HEIGHT)
    )

    // Update power-ups
    setPowerUps(prev => prev
      .map(pu => ({ ...pu, y: pu.y + 2 }))
      .filter(pu => pu.y < GAME_HEIGHT + 30)
    )

    // Remove old explosions
    setExplosions(prev => prev.filter(exp => Date.now() - exp.createdAt < 300))

    // Check bullet-enemy collisions
    setBullets(prevBullets => {
      let remainingBullets = [...prevBullets]

      setEnemies(prevEnemies => {
        let remainingEnemies = [...prevEnemies]
        const newExplosions = []
        const newPowerUps = []

        remainingBullets = remainingBullets.filter(bullet => {
          const bulletRect = {
            x: bullet.x,
            y: bullet.y,
            width: BULLET_WIDTH,
            height: BULLET_HEIGHT,
          }

          let bulletHit = false

          remainingEnemies = remainingEnemies.map(enemy => {
            if (bulletHit) return enemy

            const enemyRect = {
              x: enemy.x,
              y: enemy.y,
              width: ENEMY_WIDTH,
              height: ENEMY_HEIGHT,
            }

            if (checkCollision(bulletRect, enemyRect)) {
              bulletHit = true
              const newHealth = enemy.health - 1

              if (newHealth <= 0) {
                // Enemy destroyed
                const enemyType = ENEMY_TYPES[enemy.type]
                setScore(prev => prev + enemyType.points)
                enemiesDefeated.current++
                audio.playExplosion()

                // Check for wave progression
                if (enemiesDefeated.current >= 10 + wave * 5) {
                  enemiesDefeated.current = 0
                  setWave(prev => prev + 1)
                }

                // Add explosion
                newExplosions.push({
                  id: generateId(),
                  x: enemy.x + ENEMY_WIDTH / 2,
                  y: enemy.y + ENEMY_HEIGHT / 2,
                  createdAt: Date.now(),
                })

                // Maybe spawn power-up
                const powerUp = spawnPowerUp(enemy.x, enemy.y)
                if (powerUp) newPowerUps.push(powerUp)

                return null // Remove enemy
              }

              audio.playHit()
              return { ...enemy, health: newHealth }
            }

            return enemy
          }).filter(Boolean)

          return !bulletHit
        })

        if (newExplosions.length > 0) {
          setExplosions(prev => [...prev, ...newExplosions])
        }
        if (newPowerUps.length > 0) {
          setPowerUps(prev => [...prev, ...newPowerUps])
        }

        return remainingEnemies
      })

      return remainingBullets
    })

    // Check player-enemy collisions
    const playerRect = {
      x: playerX,
      y: playerY,
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
    }

    setEnemies(prevEnemies => {
      return prevEnemies.filter(enemy => {
        const enemyRect = {
          x: enemy.x,
          y: enemy.y,
          width: ENEMY_WIDTH,
          height: ENEMY_HEIGHT,
        }

        if (checkCollision(playerRect, enemyRect)) {
          if (!hasShield) {
            audio.playDamage()
            setLives(prev => {
              const newLives = prev - 1
              if (newLives <= 0) {
                setIsRunning(false)
                audio.stopMusic()
                audio.playGameOver()
                setTimeout(() => onGameOver(score), 500)
              }
              return newLives
            })
          }

          audio.playExplosion()
          // Add explosion at enemy position
          setExplosions(prev => [...prev, {
            id: generateId(),
            x: enemy.x + ENEMY_WIDTH / 2,
            y: enemy.y + ENEMY_HEIGHT / 2,
            createdAt: Date.now(),
          }])

          return false // Remove enemy
        }

        return true
      })
    })

    // Check player-powerup collisions
    setPowerUps(prevPowerUps => {
      return prevPowerUps.filter(powerUp => {
        const powerUpRect = {
          x: powerUp.x,
          y: powerUp.y,
          width: 30,
          height: 30,
        }

        if (checkCollision(playerRect, powerUpRect)) {
          applyPowerUp(powerUp.type)
          return false
        }

        return true
      })
    })

    // Check if enemies reached bottom
    setEnemies(prevEnemies => {
      return prevEnemies.filter(enemy => {
        if (enemy.y >= GAME_HEIGHT - ENEMY_HEIGHT) {
          if (!hasShield) {
            audio.playDamage()
            setLives(prev => {
              const newLives = prev - 1
              if (newLives <= 0) {
                setIsRunning(false)
                audio.stopMusic()
                audio.playGameOver()
                setTimeout(() => onGameOver(score), 500)
              }
              return newLives
            })
          }
          return false
        }
        return true
      })
    })
  }, [isPaused, isRunning, fireBullet, spawnEnemy, spawnPowerUp, applyPowerUp, playerX, playerY, hasShield, hasSpeedBoost, score, wave, onGameOver, audio])

  useGameLoop(gameLoop, isRunning && !isPaused)

  // Reset game on component mount
  useEffect(() => {
    resetIdCounter()
  }, [])

  return (
    <div className="relative flex flex-col items-center" ref={gameContainerRef} tabIndex={0}>
      {/* Game container */}
      <div
        className="relative overflow-hidden bg-black border-4 border-arcade-cyan crt-glow scanlines
                   max-w-full"
        style={{
          width: isMobile ? '100vw' : GAME_WIDTH,
          height: isMobile ? `calc(100vh - 120px)` : GAME_HEIGHT,
          maxWidth: GAME_WIDTH,
          maxHeight: GAME_HEIGHT,
        }}
      >
        {/* Star field background */}
        <StarField />

        {/* HUD */}
        <HUD
          score={score}
          lives={lives}
          wave={wave}
          hasDoubleFire={hasDoubleFire}
          hasShield={hasShield}
          hasSpeedBoost={hasSpeedBoost}
          isMuted={isMuted}
        />

        {/* Power-ups */}
        {powerUps.map(powerUp => (
          <PowerUp key={powerUp.id} {...powerUp} />
        ))}

        {/* Enemies */}
        {enemies.map(enemy => (
          <Enemy key={enemy.id} {...enemy} />
        ))}

        {/* Bullets */}
        {bullets.map(bullet => (
          <Bullet key={bullet.id} x={bullet.x} y={bullet.y} />
        ))}

        {/* Explosions */}
        {explosions.map(explosion => (
          <Explosion key={explosion.id} x={explosion.x} y={explosion.y} />
        ))}

        {/* Player */}
        <Player
          x={playerX}
          y={playerY}
          hasShield={hasShield}
        />

        {/* Pause overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="text-center">
              <h2 className="text-3xl font-arcade text-arcade-yellow animate-blink mb-4">
                PAUSED
              </h2>
              <p className="text-white font-arcade text-xs">
                Press ESC or P to continue
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls hint - desktop only */}
      {!isMobile && (
        <div className="mt-4 text-center text-gray-500 font-arcade text-xs">
          ← → MOVE | SPACE FIRE | P PAUSE | M MUTE
        </div>
      )}

      {/* Mobile controls */}
      {isMobile && (
        <MobileControls
          onMoveLeft={handleMobileLeft}
          onMoveRight={handleMobileRight}
          onStopMove={handleMobileStopMove}
          onFire={handleMobileFire}
          onPause={handleMobilePause}
        />
      )}
    </div>
  )
}

export default Game
