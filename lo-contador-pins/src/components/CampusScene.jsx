import { useState, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "../styles/CampusScene.css";
import CampusMap from "./CampusMap";
import Pins from "./Pins";
import useModal from "../hooks/useModal";
import PinSubmit from "./PinSubmit";
import useApi from "../hooks/useApi";

function CampusScene({ mode }) {
  const [pins, setPins] = useState([]);
  const [currentScale, setCurrentScale] = useState(0.4);
  const { openModal } = useModal();
  const { api } = useApi()
  const handleSVGClick = (event) => {
    if (mode === "explore") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / currentScale;
    const y = (event.clientY - rect.top) / currentScale;
    openModal(
      <PinSubmit x={x} y={y} pinsSetter={setPins} currentScale={currentScale} />
    );
  };
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
        disabled: mode !== "explore",
        step: 0.01,
        smoothStep: 0.002,
      }}
      panning={{ disabled: mode !== "explore" }}
      pinch={{ disabled: mode !== "explore" }}
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
          <div className="pin-overlay" onClick={handleSVGClick}>
            <Pins pins={pins} d={20} currentScale={currentScale} />
          </div>
        </div>
      </TransformComponent>
    </TransformWrapper>
  );
}

export default CampusScene;
