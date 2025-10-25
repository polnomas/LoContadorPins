import { useState } from 'react'
import '../styles/App.css'
import CampusScene from './CampusScene'
import ModalProvider from '../providers/ModalProvider'
import ApiProvider from '../providers/ApiProvider'

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
    <ApiProvider>
      <ModalProvider>
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
        {/* Texto fijo visible siempre */}
        <div className="fixed-text">
    <h1 className="title">Lo Contapixel</h1>
    <p className="subtitle">Conoce, Explora y Expresate</p>
  </div>

        

        <div style={{ pointerEvents: 'auto' }}>
          <CampusScene mode={mode} />
        </div>
      </ModalProvider>
    </ApiProvider>
  )
}

export default App

