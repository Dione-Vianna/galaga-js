import { useCallback, useEffect, useRef } from 'react'

// Game constants
export const GAME_WIDTH = 480
export const GAME_HEIGHT = 640
export const PLAYER_WIDTH = 40
export const PLAYER_HEIGHT = 40
export const PLAYER_SPEED = 8
export const BULLET_WIDTH = 4
export const BULLET_HEIGHT = 12
export const BULLET_SPEED = 12
export const ENEMY_WIDTH = 36
export const ENEMY_HEIGHT = 36
export const ENEMY_SPEED_BASE = 2
export const SPAWN_INTERVAL = 1500 // ms
export const MAX_BULLETS = 5

// Custom hook for keyboard input
export function useKeyboard() {
  const keysPressed = useRef({})

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true
      // Prevent default for game keys
      if (['ArrowLeft', 'ArrowRight', ' ', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault()
      }
    }

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return keysPressed
}

// Custom hook for game loop
export function useGameLoop(callback, isRunning) {
  const requestRef = useRef()
  const previousTimeRef = useRef()

  const animate = useCallback((time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = time - previousTimeRef.current
      callback(deltaTime)
    }
    previousTimeRef.current = time
    requestRef.current = requestAnimationFrame(animate)
  }, [callback])

  useEffect(() => {
    if (isRunning) {
      requestRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [isRunning, animate])
}

// Collision detection
export function checkCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  )
}

// Generate unique ID
let idCounter = 0
export function generateId() {
  return ++idCounter
}

// Reset ID counter (for game restart)
export function resetIdCounter() {
  idCounter = 0
}

// Clamp value between min and max
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

// Random number between min and max
export function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

// Enemy types with different properties
export const ENEMY_TYPES = {
  basic: {
    points: 100,
    color: 'from-red-500 to-red-700',
    emoji: '👾',
    health: 1,
    speedMultiplier: 1,
  },
  fast: {
    points: 150,
    color: 'from-yellow-500 to-yellow-700',
    emoji: '👽',
    health: 1,
    speedMultiplier: 1.5,
  },
  tank: {
    points: 300,
    color: 'from-purple-500 to-purple-700',
    emoji: '🛸',
    health: 2,
    speedMultiplier: 0.7,
  },
  boss: {
    points: 500,
    color: 'from-pink-500 to-pink-700',
    emoji: '🔮',
    health: 3,
    speedMultiplier: 0.5,
  },
}

// Power-up types
export const POWERUP_TYPES = {
  doubleFire: {
    emoji: '🔥',
    color: 'bg-orange-500',
    duration: 10000,
  },
  shield: {
    emoji: '🛡️',
    color: 'bg-blue-500',
    duration: 8000,
  },
  speedBoost: {
    emoji: '⚡',
    color: 'bg-yellow-500',
    duration: 8000,
  },
  extraLife: {
    emoji: '❤️',
    color: 'bg-red-500',
    duration: 0, // Instant
  },
}
