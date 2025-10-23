import { useState } from 'react'
import '../styles/App.css'
import CampusScene from './CampusScene'

function App() {
  const [mode, setMode] = useState('explore') 
  const handleChangeMode = () => {
    if (mode === 'explore') setMode('edit')
    if (mode === 'edit') setMode('explore')
  }
  return (
    <>
      <button onClick={handleChangeMode}>
        {mode === 'explore' ? 'Change to EditMode' : 'Change to ExploreMode'}
      </button>
      <CampusScene mode={mode}/>
    </>
  )
}

export default App
