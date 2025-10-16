import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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
    const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 })

    const viewportRef = useRef(null)
    const transformRef = useRef(null)
    const isPanningRef = useRef(false)

    const handleTransformed = useCallback((ref, state) => {
        if (state) {
            const { scale, positionX, positionY } = state
            setTransform({ scale, positionX, positionY })
        }
    }, [])

    const handleInit = useCallback((ref) => {
        if (ref?.state) {
            const { scale, positionX, positionY } = ref.state
            setTransform({ scale, positionX, positionY })
        }
    }, [])

    const afterInjection = useCallback((svg) => {
        if (!svg) {
            return
        }

        svg.style.display = 'block'

        const widthAttr = Number(svg.getAttribute('width'))
        const heightAttr = Number(svg.getAttribute('height'))

        if (!svg.getAttribute('viewBox') && widthAttr > 0 && heightAttr > 0) {
            svg.setAttribute('viewBox', `0 0 ${widthAttr} ${heightAttr}`)
        }

        svg.removeAttribute('width')
        svg.removeAttribute('height')
        svg.style.width = '100%'
        svg.style.height = '100%'

        let width = widthAttr
        let height = heightAttr

        if (!width || !height) {
            try {
                const bbox = svg.getBBox()
                width = Math.max(1, bbox.width)
                height = Math.max(1, bbox.height)
            } catch {
                width = 1200
                height = 800
            }
        }

        setContentSize((prev) =>
            prev.width === width && prev.height === height ? prev : { width, height },
        )
    }, [])

    const handleViewportClick = useCallback((event) => {
        if (!viewportRef.current) {
            return
        }

        const rect = viewportRef.current.getBoundingClientRect()
        const xViewport = event.clientX - rect.left
        const yViewport = event.clientY - rect.top

        const { scale, positionX, positionY } = transform
        const xContent = (xViewport - positionX) / scale
        const yContent = (yViewport - positionY) / scale

        if (
            isPanningRef.current ||
            xContent < 0 ||
            yContent < 0 ||
            xContent > contentSize.width ||
            yContent > contentSize.height
        ) {
            isPanningRef.current = false
            return
        }

        const newPin = {
            id: Date.now().toString(),
            x: xContent,
            y: yContent,
        }
        setPins((prev) => [...prev, newPin])
    }, [transform, contentSize])

    useEffect(() => {
        const viewportElement = viewportRef.current
        if (!viewportElement) {
            return undefined
        }

        const updateViewportSize = () => {
            const rect = viewportElement.getBoundingClientRect()
            setViewportSize((prev) =>
                prev.width === rect.width && prev.height === rect.height
                    ? prev
                    : { width: rect.width, height: rect.height },
            )
        }

        updateViewportSize()

        if (typeof ResizeObserver !== 'undefined') {
            const observer = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { width, height } = entry.contentRect
                    setViewportSize((prev) =>
                        prev.width === width && prev.height === height
                            ? prev
                            : { width, height },
                    )
                }
            })

            observer.observe(viewportElement)
            return () => observer.disconnect()
        }

        window.addEventListener('resize', updateViewportSize)
        return () => window.removeEventListener('resize', updateViewportSize)
    }, [])

    const fitScale = useMemo(() => {
        if (
            !contentSize.width ||
            !contentSize.height ||
            !viewportSize.width ||
            !viewportSize.height
        ) {
            return 1
        }

        const widthRatio = viewportSize.width / contentSize.width
        const heightRatio = viewportSize.height / contentSize.height

        const scale = Math.min(widthRatio, heightRatio)
        return Number.isFinite(scale) && scale > 0 ? scale : 1
    }, [contentSize, viewportSize])

    const minScale = useMemo(() => (fitScale > 0 ? fitScale : 1), [fitScale])
    const maxScale = useMemo(() => {
        if (!minScale) {
            return 4
        }

        const desiredMax = minScale * 6
        return Math.max(desiredMax, minScale)
    }, [minScale])

    useEffect(() => {
        const instance = transformRef.current
        if (
            !instance ||
            !contentSize.width ||
            !contentSize.height ||
            !viewportSize.width ||
            !viewportSize.height
        ) {
            return
        }

        const scale = minScale || 1
        const scaledWidth = contentSize.width * scale
        const scaledHeight = contentSize.height * scale

        const positionX = (viewportSize.width - scaledWidth) / 2
        const positionY = (viewportSize.height - scaledHeight) / 2

        instance.setTransform(positionX, positionY, scale, 0)
        setTransform((prev) =>
            prev.scale === scale && prev.positionX === positionX && prev.positionY === positionY
                ? prev
                : { scale, positionX, positionY },
        )
    }, [contentSize, viewportSize, minScale])

    return (
        <div className="map-viewport" ref={viewportRef} onClick={handleViewportClick}>
            <TransformWrapper
                ref={transformRef}
                minScale={minScale}
                maxScale={maxScale}
                initialScale={minScale}
                wheel={{ step: 0.15 }}
                panning={{ velocityDisabled: true }}
                doubleClick={{ disabled: true }}
                limitToBounds
                centerZoomedOut
                onTransformed={handleTransformed}
                onInit={handleInit}
                onPanningStart={() => {
                    isPanningRef.current = true
                }}
                onPanningStop={() => {
                    isPanningRef.current = false
                }}
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
