// import { useState } from 'react'
import '../styles/App.css'
import CampusScene from './CampusScene'
import ModalProvider from '../providers/ModalProvider'
import ApiProvider from '../providers/ApiProvider'

function App() {
  // const [mode, setMode] = useState('initial')

  return (
    <ApiProvider>
      <ModalProvider>
        {/* {mode === 'initial' && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 2000 }}>
            <button
              className="mode-button"
              onClick={handleChangeMode}
              style={{ position: 'fixed', top: 16, right: 16, zIndex: 2001 }}
            >
              {buttonText}
            </button>
          </div>
        )} */}

        {/* {mode !== 'initial' && (
          <button
            className="mode-button"
            onClick={handleChangeMode}
            style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}
          >
            {buttonText}
          </button>
        )} */}
        {/* Texto fijo visible siempre */}
        <div className="fixed-text">
          <h1 className="title">Lo Contapixel</h1>
          <p className="subtitle">Conoce, Explora y Expresate</p>
        </div>
        <div style={{ pointerEvents: 'auto' }}>
          <CampusScene/>
        </div>
      </ModalProvider>
    </ApiProvider>
  )
}

export default App

