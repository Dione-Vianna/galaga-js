import { useState } from 'react'
import Game from './components/Game'
import Menu from './components/Menu'

function App() {
  const [gameState, setGameState] = useState('menu') // menu, playing, gameover
  const [finalScore, setFinalScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('galaga-highscore')
    return saved ? parseInt(saved, 10) : 0
  })

  const handleStartGame = () => {
    setGameState('playing')
  }

  const handleGameOver = (score) => {
    setFinalScore(score)
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('galaga-highscore', score.toString())
    }
    setGameState('gameover')
  }

  const handleRestart = () => {
    setGameState('playing')
  }

  const handleBackToMenu = () => {
    setGameState('menu')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      {gameState === 'menu' && (
        <Menu
          onStart={handleStartGame}
          highScore={highScore}
        />
      )}
      {gameState === 'playing' && (
        <Game onGameOver={handleGameOver} />
      )}
      {gameState === 'gameover' && (
        <GameOver
          score={finalScore}
          highScore={highScore}
          onRestart={handleRestart}
          onMenu={handleBackToMenu}
        />
      )}
    </div>
  )
}

function GameOver({ score, highScore, onRestart, onMenu }) {
  const isNewHighScore = score >= highScore && score > 0

  return (
    <div className="flex flex-col items-center justify-center p-8 border-4 border-arcade-red rounded-lg bg-black/90 crt-glow">
      <h1 className="text-4xl text-arcade-red font-arcade animate-blink mb-8">
        GAME OVER
      </h1>

      {isNewHighScore && (
        <div className="text-arcade-yellow font-arcade text-lg mb-4 animate-pulse">
          ★ NEW HIGH SCORE! ★
        </div>
      )}

      <div className="text-white font-arcade text-xl mb-2">
        SCORE: <span className="text-arcade-cyan">{score.toLocaleString()}</span>
      </div>

      <div className="text-gray-400 font-arcade text-sm mb-8">
        HIGH SCORE: <span className="text-arcade-yellow">{highScore.toLocaleString()}</span>
      </div>

      <div className="flex flex-col gap-4">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-arcade-green text-black font-arcade text-sm 
                     hover:bg-green-400 transition-colors border-4 border-green-700
                     active:translate-y-1"
        >
          PLAY AGAIN
        </button>

        <button
          onClick={onMenu}
          className="px-8 py-4 bg-arcade-cyan text-black font-arcade text-sm 
                     hover:bg-cyan-400 transition-colors border-4 border-cyan-700
                     active:translate-y-1"
        >
          MAIN MENU
        </button>
      </div>

      <div className="mt-8 text-gray-500 font-arcade text-xs">
        PRESS ENTER TO RESTART
      </div>
    </div>
  )
}

export default App
