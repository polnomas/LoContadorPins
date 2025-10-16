# Resumen de cambios

## Ajustes en `src/components/CampusMap.jsx`
- Se corrigió la escala inicial del mapa calculando el factor que ajusta la imagen completa al tamaño del viewport y reutilizando dicho valor como escala mínima para impedir que el zoom out reduzca el mapa por debajo del tamaño de la pantalla.
- Se amplió el rango de zoom permitiendo acercamientos de hasta seis veces la escala mínima y se fuerza la recentralización automática cada vez que cambian las dimensiones del contenedor o del SVG.
- Se añadió un control de panning mediante una referencia mutable para distinguir entre clics y arrastres; de esta forma los pines solo se crean en clics simples y el mapa continúa limitado a sus bordes.
- Se habilitó el centrado del lienzo y la restricción de desplazamiento a través de las nuevas propiedades `limitToBounds` y `centerZoomedOut` del componente `TransformWrapper`.

## Resultado
Con estos ajustes el SVG del campus llena la ventana al cargarse, el usuario puede acercar y alejar el mapa sin sobrepasar los límites definidos y los pines mantienen su posición correcta incluso al aplicar zoom o realizar paneos.
