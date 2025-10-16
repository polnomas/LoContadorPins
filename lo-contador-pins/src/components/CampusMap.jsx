import { useCallback, useRef, useState } from 'react'
import { ReactSVG } from 'react-svg'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import Pin from './Pin'
import campusSvgUrl from '../assets/PLANTACALLE500.svg?url'
import '../styles/CampusMap.css'

function CampusMap() {
    const [pins, setPins] = useState([])
    const [transform, setTransform] = useState({
        scale: 1,
        positionX: 0,
        positionY: 0,
    })
    const [contentSize, setContentSize] = useState({
        width: 1200,
        height: 800,
    })
    
    const viewportRef = useRef(null)

    const handleTransformed = useCallback((ref) => {
        if (ref?.instance?.transformState) {
            const {scale, positionX, positionY} = ref.instance.transformState
            setTransform({scale, positionX, positionY})
        }
    }, [])

    const afterInjection = useCallback((svg) => {
        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.display = 'block'

        const vb = svg.getAttribute('viewBox')
        if (vb) {
            const [, , vbw, vbh] = vb.split(/\s+/).map(Number)
            if (vbw && vbh) {
                setContentSize({ width: vbw, height: vbh })
                return
            }
        }
        
        try {
            const bbox = svg.getBBox()
            setContentSize({ width: Math.max(1, bbox.width), height: Math.max(1, bbox.height) })
        } catch {
            setContentSize({ width: 1200, height: 800 })
        }
    }, [])

    const handleViewportClick = useCallback((event) => {
        const rect = viewportRef.current.getBoundingClientRect()
        const xViewport = event.clientX - rect.left
        const yViewport = event.clientY - rect.top

        const { scale, positionX, positionY } = transform
        const xContent = (xViewport - positionX) / scale
        const yContent = (yViewport - positionY) / scale

        if (
            xContent < 0 || yContent < 0 ||
            xContent > contentSize.width || yContent > contentSize.height
        ) {
            return
        }

        const newPin = {
            id: Date.now().toString(),
            x: xContent,
            y: yContent,
        }
        setPins((prev) => [...prev, newPin])
    }, [transform, contentSize])

    return (
        <div className="map-viewport" ref={viewportRef} onClick={handleViewportClick}>
            <TransformWrapper
                minScale={0.4}
                maxScale={12}
                wheel={{ step: 0.15 }}
                panning={{ velocityDisabled: true }}
                doubleClick={{ disabled: true }}
                onTransformed={handleTransformed}
            >
                <TransformComponent
                    wrapperStyle={{ width: '100%', height: '100%' }}
                    contentStyle={{
                        width: contentSize.width,
                        height: contentSize.height,
                        position: 'relative',
                        userSelect: 'none',
                    }}
                >
                    <ReactSVG
                        src={campusSvgUrl}
                        afterInjection={afterInjection}
                        loading={() => <span className="map-loading">Cargando mapa…</span>}
                        onError={(err) => console.error('Error cargando SVG:', err)}
                    />

                    <div
                        className="pin-layer"
                        style={{
                            width: contentSize.width,
                            height: contentSize.height,
                        }}
                    >
                        {pins.map((pin) => (
                            <Pin key={pin.id} x={pin.x} y={pin.y} id={pin.id} />
                        ))}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    )
}

export default CampusMap