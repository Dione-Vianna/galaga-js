import { useCallback, useEffect, useRef } from 'react'

// Audio context for generating sound effects
let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioContext
}

// Generate laser/shoot sound effect
function playShootSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(880, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.1)

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.1)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Generate explosion sound effect
function playExplosionSound() {
  try {
    const ctx = getAudioContext()

    // Create noise for explosion
    const bufferSize = ctx.sampleRate * 0.3
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
    const output = buffer.getChannelData(0)

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }

    const noise = ctx.createBufferSource()
    noise.buffer = buffer

    const gainNode = ctx.createGain()
    const filter = ctx.createBiquadFilter()

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(1000, ctx.currentTime)
    filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.3)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(ctx.destination)

    gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    noise.start(ctx.currentTime)
    noise.stop(ctx.currentTime + 0.3)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Generate enemy hit sound
function playHitSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(400, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.15)

    gainNode.gain.setValueAtTime(0.4, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.15)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.15)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Generate power-up collect sound
function playPowerUpSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime) // C5
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1) // E5
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2) // G5
    oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3) // C6

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.4)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Generate player damage sound
function playDamageSound() {
  try {
    const ctx = getAudioContext()
    const oscillator = ctx.createOscillator()
    const gainNode = ctx.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(ctx.destination)

    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(200, ctx.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.3)

    gainNode.gain.setValueAtTime(0.5, ctx.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)

    oscillator.start(ctx.currentTime)
    oscillator.stop(ctx.currentTime + 0.3)
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Generate game over sound
function playGameOverSound() {
  try {
    const ctx = getAudioContext()

    const notes = [392, 349.23, 329.63, 293.66, 261.63] // G4, F4, E4, D4, C4

    notes.forEach((freq, i) => {
      const oscillator = ctx.createOscillator()
      const gainNode = ctx.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(ctx.destination)

      oscillator.type = 'square'
      oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.2)

      gainNode.gain.setValueAtTime(0, ctx.currentTime + i * 0.2)
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + i * 0.2 + 0.05)
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.2)

      oscillator.start(ctx.currentTime + i * 0.2)
      oscillator.stop(ctx.currentTime + i * 0.2 + 0.2)
    })
  } catch (e) {
    console.log('Audio not supported')
  }
}

// Custom hook for audio management
export function useAudio() {
  const bgMusicRef = useRef(null)
  const isMutedRef = useRef(false)

  // Initialize background music
  useEffect(() => {
    const tracks = [
      '/music/VoxelRevolution.mp3',
      '/music/NewerWave.mp3',
      '/music/BeautyFlow.mp3',
      '/music/DesertofLostSouls.mp3',
      '/music/BleepingDemo.mp3',
    ]

    // Pick a random track
    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)]

    bgMusicRef.current = new Audio(randomTrack)
    bgMusicRef.current.loop = true
    bgMusicRef.current.volume = 0.3

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause()
        bgMusicRef.current = null
      }
    }
  }, [])

  const startMusic = useCallback(() => {
    if (bgMusicRef.current && !isMutedRef.current) {
      bgMusicRef.current.play().catch(() => {
        // Autoplay blocked, will start on user interaction
      })
    }
  }, [])

  const stopMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause()
      bgMusicRef.current.currentTime = 0
    }
  }, [])

  const pauseMusic = useCallback(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.pause()
    }
  }, [])

  const resumeMusic = useCallback(() => {
    if (bgMusicRef.current && !isMutedRef.current) {
      bgMusicRef.current.play().catch(() => { })
    }
  }, [])

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current
    if (bgMusicRef.current) {
      bgMusicRef.current.muted = isMutedRef.current
    }
    return isMutedRef.current
  }, [])

  const setVolume = useCallback((volume) => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = Math.max(0, Math.min(1, volume))
    }
  }, [])

  const playShoot = useCallback(() => {
    if (!isMutedRef.current) playShootSound()
  }, [])

  const playExplosion = useCallback(() => {
    if (!isMutedRef.current) playExplosionSound()
  }, [])

  const playHit = useCallback(() => {
    if (!isMutedRef.current) playHitSound()
  }, [])

  const playPowerUp = useCallback(() => {
    if (!isMutedRef.current) playPowerUpSound()
  }, [])

  const playDamage = useCallback(() => {
    if (!isMutedRef.current) playDamageSound()
  }, [])

  const playGameOver = useCallback(() => {
    if (!isMutedRef.current) playGameOverSound()
  }, [])

  return {
    startMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
    toggleMute,
    setVolume,
    playShoot,
    playExplosion,
    playHit,
    playPowerUp,
    playDamage,
    playGameOver,
  }
}

export default useAudio
