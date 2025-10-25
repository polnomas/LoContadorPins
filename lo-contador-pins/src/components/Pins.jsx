import Pin from './Pin'

function Pins({ pins, currentScale, d }) {
    return pins.map((pin) => (
        <Pin
            key={pin.id}
            x={pin.x}
            y={pin.y}
            id={pin._id}
            d={d}
            scale={currentScale}
            publicId={pin.publicId}
            description={pin.description}
        />
    ))
}

export default Pins