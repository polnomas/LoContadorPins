import Pin from './Pin'

function Pins({ pins, currentScale, d }) {
    return pins.map((pin) => (
        <Pin key={pin.id} x={pin.x} y={pin.y} id={pin.id} d={d} scale={currentScale} />
    ))
}

export default Pins