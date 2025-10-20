import '../styles/Pin.css'

function Pin({ x, y }) { //NOTE: antes había id en el objeto
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