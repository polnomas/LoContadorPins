import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import Pin from './Pin'
import './CampusMap.css'

function CampusMap() {
    const [pins, setPins] = useState([])

    const handleSVGClick = (event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        
        const newPin = {
            id: Date.now().toString(),
            x,
            y
        }
        
        setPins(prev => [...prev, newPin])
    }

    return (
        <div className="pin-overlay" onClick={handleSVGClick}>
            <ReactSVG src="/PLANTACALLE500.svg" />
            {pins.map(pin => (
                <Pin key={pin.id} x={pin.x} y={pin.y} id={pin.id} />
            ))}
        </div>
    )
}

export default CampusMap