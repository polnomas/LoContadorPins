import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/CampusScene.css";
import CampusMap from "./CampusMap";
import Pins from "./Pins";
import useModal from "../hooks/useModal";
import PinSubmit from "./PinSubmit";
import useApi from "../hooks/useApi";

function CampusScene() {
  const [pins, setPins] = useState([]);
  const [currentScale, setCurrentScale] = useState(0.4);
  const { openModal } = useModal();
  const { api } = useApi()

  const pressTimer = useRef(null)
  const isPanning = useRef(false)
  const isPressing = useRef(false)
  const rect = useRef(null)
  const clientX = useRef(null)
  const clientY = useRef(null)

  const handlePressStart = (event) => {
    isPressing.current = true
    rect.current = event.currentTarget.getBoundingClientRect()
    clientX.current = event.touches ? event.touches[0].clientX : event.clientX
    clientY.current = event.touches ? event.touches[0].clientY : event.clientY
    // console.log('PressStart')
    pressTimer.current = setTimeout(() => {
      // console.log('timeout terminado')
      if (!isPanning.current) {
        const x = (clientX.current - rect.current.left) / currentScale
        const y = (clientY.current - rect.current.top) / currentScale
        openModal(
          <PinSubmit x={x} y={y} pinsSetter={setPins}/>
        )
      }
    }, 1000)
  }

  const handlePressMove = () => {
    // console.log('Press Move')
    if (!isPressing.current) return
    // console.log('PANNING')
    isPanning.current = true
    clearTimeout(pressTimer.current)
  }

  const handlePressEnd = () => {
    isPressing.current = false
    // console.log('Press End')
    isPanning.current = false
    clearTimeout(pressTimer.current)
  }

  const handleTransformed = (ref, state) => {
    setCurrentScale(state.scale);
  };
  useEffect(() => {
    void (async () => {
      const savedPins = await api.getAllPins()
      setPins(savedPins)
    })()
  }, [api])//TODO: revisar si está bien
  return (
    <TransformWrapper
      wheel={{
        step: 0.01,
        smoothStep: 0.002,
      }}
      zoomAnimation={{ disabled: false, size: 0.3, animationTime: 400 }}
      doubleClick={{ disabled: true }}
      minScale={0.4}
      onTransformed={handleTransformed}
      initialScale={0.4}
      limitToBounds={false}
      centerOnInit={false}
      initialPositionX={(window.innerWidth - 2526 * 0.4) / 2}
      initialPositionY={(window.innerHeight - 1530 * 0.4) / 2}
    >
      <TransformComponent>
        <div className="map-container">
          <CampusMap />
          <div
            className="pin-overlay"
            //para mouse
            onMouseDown={handlePressStart}
            onMouseMove={handlePressMove}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            //para touch
            onTouchStart={handlePressStart}
            onTouchMove={handlePressMove}
            onTouchEnd={handlePressEnd}
            onTouchCancel={handlePressEnd}
            onContextMenu={(e) => e.preventDefault()}
          >
            <Pins pins={pins} d={20} currentScale={currentScale} />
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default CampusScene;
