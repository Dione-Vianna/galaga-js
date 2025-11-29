import { createContext, useCallback, useContext, useEffect, useRef } from 'react'

// Audio context for generating sound effects
let audioContext = null

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)()
  }
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume()
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
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime)
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1)
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2)
    oscillator.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.3)

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

    const notes = [392, 349.23, 329.63, 293.66, 261.63]

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

// Audio Context
const AudioContext = createContext(null)

// Background music tracks
const MUSIC_TRACKS = [
  '/music/VoxelRevolution.mp3',
  '/music/NewerWave.mp3',
  '/music/BeautyFlow.mp3',
  '/music/DesertofLostSouls.mp3',
  '/music/BleepingDemo.mp3',
]

export function AudioProvider({ children }) {
  const bgMusicRef = useRef(null)
  const isMutedRef = useRef(false)
  const currentTrackRef = useRef(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause()
        bgMusicRef.current.src = ''
        bgMusicRef.current = null
      }
    }
  }, [])

  const startMusic = useCallback(() => {
    // Stop any existing music first
    if (bgMusicRef.current) {
      bgMusicRef.current.pause()
    }

    // Pick a random track
    const randomTrack = MUSIC_TRACKS[Math.floor(Math.random() * MUSIC_TRACKS.length)]
    currentTrackRef.current = randomTrack

    // Create new audio element
    const audio = new Audio(randomTrack)
    audio.loop = true
    audio.volume = 0.3
    bgMusicRef.current = audio

    // Play immediately (this is called from a user click handler)
    const playPromise = audio.play()

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('🎵 Background music started:', randomTrack)
        })
        .catch((error) => {
          console.warn('Music autoplay blocked:', error.message)
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

  const value = {
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

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}

export default useAudio
