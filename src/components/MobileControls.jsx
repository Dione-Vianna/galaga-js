import { useCallback, useEffect, useRef } from 'react'

function MobileControls({ onMoveLeft, onMoveRight, onFire, onStopMove, onPause }) {
  const leftPressed = useRef(false)
  const rightPressed = useRef(false)
  const fireIntervalRef = useRef(null)

  // Handle touch start for movement buttons
  const handleLeftStart = useCallback((e) => {
    e.preventDefault()
    leftPressed.current = true
    onMoveLeft()
  }, [onMoveLeft])

  const handleLeftEnd = useCallback((e) => {
    e.preventDefault()
    leftPressed.current = false
    if (!rightPressed.current) {
      onStopMove()
    }
  }, [onStopMove])

  const handleRightStart = useCallback((e) => {
    e.preventDefault()
    rightPressed.current = true
    onMoveRight()
  }, [onMoveRight])

  const handleRightEnd = useCallback((e) => {
    e.preventDefault()
    rightPressed.current = false
    if (!leftPressed.current) {
      onStopMove()
    }
  }, [onStopMove])

  // Handle fire button - continuous fire while pressed
  const handleFireStart = useCallback((e) => {
    e.preventDefault()
    onFire()
    // Start continuous fire
    fireIntervalRef.current = setInterval(() => {
      onFire()
    }, 150)
  }, [onFire])

  const handleFireEnd = useCallback((e) => {
    e.preventDefault()
    if (fireIntervalRef.current) {
      clearInterval(fireIntervalRef.current)
      fireIntervalRef.current = null
    }
  }, [])

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (fireIntervalRef.current) {
        clearInterval(fireIntervalRef.current)
      }
    }
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-4 pt-2 px-4 bg-gradient-to-t from-black/90 to-transparent z-50 md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {/* Left side - Movement controls */}
        <div className="flex gap-2">
          {/* Left button */}
          <button
            onTouchStart={handleLeftStart}
            onTouchEnd={handleLeftEnd}
            onMouseDown={handleLeftStart}
            onMouseUp={handleLeftEnd}
            onMouseLeave={handleLeftEnd}
            className="w-16 h-16 rounded-full bg-arcade-cyan/30 border-2 border-arcade-cyan 
                       active:bg-arcade-cyan/60 flex items-center justify-center
                       touch-none select-none"
          >
            <svg className="w-8 h-8 text-arcade-cyan" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          {/* Right button */}
          <button
            onTouchStart={handleRightStart}
            onTouchEnd={handleRightEnd}
            onMouseDown={handleRightStart}
            onMouseUp={handleRightEnd}
            onMouseLeave={handleRightEnd}
            className="w-16 h-16 rounded-full bg-arcade-cyan/30 border-2 border-arcade-cyan 
                       active:bg-arcade-cyan/60 flex items-center justify-center
                       touch-none select-none"
          >
            <svg className="w-8 h-8 text-arcade-cyan" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </div>

        {/* Center - Pause button */}
        <button
          onClick={onPause}
          className="w-12 h-12 rounded-full bg-arcade-yellow/30 border-2 border-arcade-yellow 
                     active:bg-arcade-yellow/60 flex items-center justify-center
                     touch-none select-none"
        >
          <svg className="w-6 h-6 text-arcade-yellow" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        </button>

        {/* Right side - Fire button */}
        <button
          onTouchStart={handleFireStart}
          onTouchEnd={handleFireEnd}
          onMouseDown={handleFireStart}
          onMouseUp={handleFireEnd}
          onMouseLeave={handleFireEnd}
          className="w-20 h-20 rounded-full bg-arcade-red/40 border-4 border-arcade-red 
                     active:bg-arcade-red/70 flex items-center justify-center
                     touch-none select-none shadow-[0_0_20px_rgba(255,0,0,0.5)]"
        >
          <span className="text-arcade-red font-arcade text-xs">FIRE</span>
        </button>
      </div>
    </div>
  )
}

export default MobileControls
