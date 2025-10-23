import { useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../styles/CampusScene.css'
import CampusMap from "./CampusMap";
import Pins from "./Pins";

function CampusScene({mode}) {
  const [pins, setPins] = useState([])
  const [currentScale, setCurrentScale] = useState(0.4)
  const handleSVGClick = (event) => {
    if (mode === 'explore') return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / currentScale
    const y = (event.clientY - rect.top) / currentScale
    const newPin = {
      id: Date.now().toString(),
      x,
      y,
    };
    setPins((prev) => [...prev, newPin]);
  }
  const handleTransformed = (ref, state) => {
    setCurrentScale(state.scale)
  }
  return (
    <TransformWrapper
      wheel={{
        disabled: mode !== 'explore',
        step: 0.01,
        smoothStep: 0.002
      }}
      panning={{disabled: mode !== 'explore'}}
      pinch={{disabled:mode !== 'explore'}}
      zoomAnimation={{ disabled: false, size: 0.3, animationTime: 400 }}
      doubleClick={{ disabled: true }}
      minScale={0.4}
      onTransformed={handleTransformed}
      initialScale={0.4}
      limitToBounds={false}
      centerOnInit={false}
      initialPositionX={(window.innerWidth - 2544 * 0.4) / 2}
      initialPositionY={(window.innerHeight - 1511 * 0.4) / 2}
    >
        <TransformComponent>
            <div
                className="pin-overlay"
                onClick={handleSVGClick}
            >
                <CampusMap/>
                <Pins pins={pins} d={20} currentScale={currentScale}/>
            </div>
        </TransformComponent>
    </TransformWrapper>
  )
}

export default CampusScene;