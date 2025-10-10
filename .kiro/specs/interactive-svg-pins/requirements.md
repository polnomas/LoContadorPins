# Requirements Document

## Introduction

Esta funcionalidad permitirá a los usuarios hacer click en cualquier parte de la imagen SVG del mapa del campus para colocar puntos rojos marcadores. Los usuarios podrán agregar múltiples puntos de manera interactiva, creando un sistema básico de marcadores visuales sobre el mapa.

## Requirements

### Requirement 1

**User Story:** Como usuario, quiero hacer click izquierdo en cualquier parte de la imagen SVG, para que aparezca un punto rojo en esa ubicación exacta.

#### Acceptance Criteria

1. WHEN el usuario hace click izquierdo en cualquier parte de la imagen SVG THEN el sistema SHALL mostrar un punto rojo en las coordenadas exactas del click
2. WHEN el usuario hace click en la imagen THEN el punto rojo SHALL aparecer inmediatamente sin delay perceptible
3. WHEN se coloca un punto rojo THEN el punto SHALL ser visualmente distinguible sobre la imagen de fondo
4. WHEN el usuario hace click fuera del área de la imagen SVG THEN el sistema SHALL NOT crear ningún punto

### Requirement 2

**User Story:** Como usuario, quiero poder agregar múltiples puntos rojos en diferentes ubicaciones, para que pueda marcar varios lugares de interés en el mapa.

#### Acceptance Criteria

1. WHEN el usuario hace múltiples clicks en diferentes ubicaciones THEN el sistema SHALL mostrar todos los puntos rojos simultáneamente
2. WHEN se agregan nuevos puntos THEN los puntos existentes SHALL permanecer visibles
3. WHEN hay múltiples puntos en el mapa THEN cada punto SHALL mantener su posición original sin moverse

### Requirement 3

**User Story:** Como usuario, quiero que los puntos rojos tengan un tamaño y color apropiados, para que sean claramente visibles sobre el mapa sin obstruir demasiado la vista.

#### Acceptance Criteria

1. WHEN se muestra un punto rojo THEN el punto SHALL tener un tamaño de aproximadamente 8-12 píxeles de diámetro
2. WHEN se muestra un punto rojo THEN el color SHALL ser rojo (#FF0000 o similar) para máxima visibilidad
3. WHEN se muestra un punto rojo THEN el punto SHALL tener forma circular
4. WHEN hay puntos sobre áreas oscuras del mapa THEN los puntos SHALL seguir siendo claramente visibles
