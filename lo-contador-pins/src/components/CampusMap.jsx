import { useState } from "react";
import { ReactSVG } from "react-svg";
import Pin from "./Pin";
import "../styles/CampusMap.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function CampusMap() {
  const [pins, setPins] = useState([]);

  const handleSVGClick = (event) => {
    // const rect = event.currentTarget.getBoundingClientRect()
    console.log('viewport', event.clientX, event.clientY)
    // console.log('rect', rect.left, rect.top)
    const x = event.clientX
    const y = event.clientY

    const newPin = {
      id: Date.now().toString(),
      x,
      y,
    };

    setPins((prev) => [...prev, newPin]);
  };


  return (
    <TransformWrapper
      wheel={{ step: 0.1, smoothStep: 0.002 }}
      zoomAnimation={{ disabled: false, size: 0.3, animationTime: 400 }}
      doubleClick={{ disabled: true }}
    >
        <TransformComponent>
            <div
                className="pin-overlay"
                onClick={handleSVGClick}
            >
                <div className="map-wrap">
                    <ReactSVG
                        src="/Group 3.svg"
                        wrapper="div"
                        className="map-svg-wrap"
                    />
                </div>
                {pins.map((pin) => (
                    <Pin key={pin.id} x={pin.x} y={pin.y} id={pin.id} />
                ))}
            </div>
        </TransformComponent>
    </TransformWrapper>
  )
}

export default CampusMap;