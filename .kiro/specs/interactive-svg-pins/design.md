# Design Document

## Overview

El sistema implementará funcionalidad de marcadores interactivos sobre un mapa SVG usando React. Los usuarios podrán hacer click en cualquier parte del SVG para colocar puntos rojos que persistan visualmente. La solución utilizará el estado de React para manejar las coordenadas de los puntos y eventos de click para capturar las posiciones.

## Architecture

La arquitectura seguirá el patrón de componentes React existente:

```
CampusMap (Componente Principal)
├── Estado: array de coordenadas de puntos
├── Manejador de eventos: onClick para capturar coordenadas
└── Renderizado: SVG + puntos superpuestos
```

## Components and Interfaces

### CampusMap Component (Modificado)

**Estado:**
```javascript
const [pins, setPins] = useState([])
// pins: Array<{id: string, x: number, y: number}>
```

**Props:** Ninguna (mantiene la interfaz actual)

**Eventos:**
- `handleSVGClick(event)`: Captura coordenadas del click y agrega nuevo pin

**Renderizado:**
- SVG existente usando ReactSVG
- Overlay con puntos rojos posicionados absolutamente

### Pin Component (Nuevo)

**Props:**
```javascript
{
  x: number,      // Coordenada X del pin
  y: number,      // Coordenada Y del pin  
  id: string      // Identificador único
}
```

**Renderizado:** Elemento circular rojo posicionado absolutamente

## Data Models

### Pin Object
```javascript
{
  id: string,     // UUID o timestamp para identificación única
  x: number,      // Coordenada X relativa al contenedor SVG
  y: number       // Coordenada Y relativa al contenedor SVG
}
```

### State Structure
```javascript
{
  pins: Pin[]     // Array de objetos Pin
}
```

## Error Handling

### Click Outside SVG Area
- **Problema:** Clicks fuera del área SVG no deben crear pins
- **Solución:** Verificar que el evento target sea parte del SVG antes de crear pin

### Coordenadas Inválidas
- **Problema:** Coordenadas negativas o fuera de bounds
- **Solución:** Validar coordenadas antes de agregar al estado

### Renderizado de Muchos Pins
- **Problema:** Performance con gran cantidad de pins
- **Solución:** Usar React.memo para Pin component si es necesario

## Testing Strategy

### Unit Tests
- Verificar que handleSVGClick agrega pins correctamente al estado
- Verificar que coordenadas se calculan correctamente
- Verificar que pins se renderizan en posiciones correctas

### Integration Tests  
- Verificar que clicks en SVG crean pins visibles
- Verificar que múltiples clicks crean múltiples pins
- Verificar que pins persisten después de re-renders

### Manual Testing
- Probar clicks en diferentes áreas del SVG
- Verificar visibilidad de pins en diferentes fondos
- Probar responsividad en diferentes tamaños de pantalla

## Implementation Details

### Coordinate Calculation
```javascript
const handleSVGClick = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  
  const newPin = {
    id: Date.now().toString(),
    x,
    y
  };
  
  setPins(prev => [...prev, newPin]);
};
```

### CSS Positioning
```css
.pin-overlay {
  position: relative;
  display: inline-block;
}

.pin {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #FF0000;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 10;
}
```

### Component Structure
```jsx
<div className="pin-overlay" onClick={handleSVGClick}>
  <ReactSVG src="/PLANTACALLE500.svg" />
  {pins.map(pin => (
    <Pin key={pin.id} x={pin.x} y={pin.y} />
  ))}
</div>
```