import './Pin.css'

function Pin({ x, y, id }) {
    return (
        <div 
            className="pin" 
            style={{
                left: `${x}px`,
                top: `${y}px`
            }}
        />
    )
}

export default Pin