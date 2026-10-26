# Carta Abierta

Demo de cartas online en Astro para presentar cinco identidades de negocio: bar de tapas, restaurante mediterráneo, cocina de producto local, menú degustación y cocina cantonesa. El selector se comparte; cada carta tiene su propia composición móvil y fotografías de ejemplo para cada plato.

## Empezar

```sh
npm install
npm run dev
```

Para generar el sitio estático:

```sh
npm run build
npm run preview
```

## Ajustar el contenido

El contenido de las cinco cartas está en `src/data/menus.ts`. Cada carta se compone de secciones y platos con nombre, descripción, precio opcional y etiquetas. Los bloques especiales permiten presentar el menú del día mediterráneo y los ocho pases con maridaje de la carta de degustación.

Los estilos de las cinco cartas están en `src/styles/global.css`; sus componentes están en `src/components/` y el selector accesible está en `src/pages/index.astro`.

## Prueba 3D y realidad aumentada

Toca la foto de las patatas bravas del bar y pulsa **Probar plato real en 3D**. Este acceso temporal abre el modelo de otro plato, reconstruido a partir de las fotos proporcionadas para la prueba. En un móvil compatible se intentará abrir la cámara para colocarlo sobre una superficie horizontal; si no hay AR, se puede girar el modelo 3D en pantalla. El plato blanco mide 15 × 15 cm y la escala está bloqueada en AR.

La experiencia AR necesita una URL HTTPS y un móvil compatible. En Android se intenta WebXR o Scene Viewer; en iPhone se usa Quick Look. Estos visores pueden abrir una interfaz nativa fuera de la página. Los demás platos aún no tienen modelo 3D.

El modelo GLB está en `public/models/plato-real-15cm.glb` y la foto de referencia en `public/images/plato-real-prueba.jpeg`. La comida y su textura vienen de una reconstrucción fotogramétrica con COLMAP de las 87 fotografías; la superficie blanca del plato se modeló aparte porque el brillo impidió reconstruirla con suficiente detalle. Los bordes y la parte inferior de la comida son aproximados. El generador está en `scripts/generate-real-plate-model.py` y requiere el resultado intermedio de COLMAP en `design/research/reconstruction/dense/textured/mesh.ply`, además de Python con `numpy` y `trimesh`. Los originales y los archivos intermedios quedan fuera del repositorio. La interfaz usa `@google/model-viewer`, cargado al abrir la prueba 3D.

Las fotografías de ejemplo ya están optimizadas en WebP bajo `public/images/menus/`.
