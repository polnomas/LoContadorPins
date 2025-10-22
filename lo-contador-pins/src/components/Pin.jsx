import '../styles/Pin.css'

function Pin({ x, y, scale, d}) { //NOTE: antes había id en el objeto
    return (
        <div 
            className="pin" 
            style={{
                left: `${x}px`,
                top: `${y}px`,
                width: `${d/scale}px`,
                height: `${d/scale}px`
            }}
        />
    )
}

export default Pin