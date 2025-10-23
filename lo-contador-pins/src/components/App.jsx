import { useState } from 'react'
import '../styles/App.css'
import CampusScene from './CampusScene'

function App() {
  const [mode, setMode] = useState('initial')

  const handleChangeMode = () => {
    setMode(prev => {
      if (prev === 'initial') return 'explore'
      if (prev === 'explore') return 'zoom'
      return 'explore'
    })
  }

  const buttonText =
    mode === 'initial'
      ? 'Presiona aquí para iniciar'
      : mode === 'explore'
      ? 'Presiona aquí y luego en el mapa para explorar el campus'
      : 'Presiona aquí para hacer zoom en el mapa'

  return (
    <>
      {mode === 'initial' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 2000 }}>
          <button
            className="mode-button"
            onClick={handleChangeMode}
            style={{ position: 'fixed', top: 16, right: 16, zIndex: 2001 }}
          >
            {buttonText}
          </button>
        </div>
      )}

      {mode !== 'initial' && (
        <button
          className="mode-button"
          onClick={handleChangeMode}
          style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
        >
          {buttonText}
        </button>
      )}

      <div
        className="mode-badge"
        style={{
          position: 'fixed',
          bottom: 16,
          left: 16,
          background: 'rgba(0,0,0,.7)',
          color: '#fff',
          padding: '6px 10px',
          borderRadius: 6,
          fontSize: 14,
          zIndex: 1000
        }}
      >
        Modo: {mode}
      </div>

      <div style={{ pointerEvents: 'auto' }}>
        <CampusScene mode={mode} />
      </div>
    </>
  )
}

export default App
