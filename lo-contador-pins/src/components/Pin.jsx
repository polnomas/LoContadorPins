import '../styles/Pin.css'

// NOTE: id podría agregarse como otro atributo al final
function Pin({ x, y }) {
    return (
        <div
            className="pin"
            style={{
                left: `${x}px`,
                top: `${y}px`,
            }}
        />
    )
}

export default Pin
