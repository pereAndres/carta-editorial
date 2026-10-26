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

Toca la foto de las patatas bravas del bar y pulsa **Ver en 3D**. En un móvil compatible se intentará abrir la cámara para colocar la cazuela sobre una superficie horizontal; si no hay AR, se puede girar el modelo 3D en pantalla. El modelo es una maqueta ilustrativa de 24 cm de diámetro, hecha para validar el flujo y la escala, no una captura exacta del plato real. La escala está bloqueada en AR para que sirva de referencia de tamaño.

La experiencia AR necesita una URL HTTPS y un móvil compatible. En Android se intenta WebXR o Scene Viewer; en iPhone se usa Quick Look. Estos visores pueden abrir una interfaz nativa fuera de la página. Los demás platos aún no tienen modelo 3D.

El modelo GLB está en `public/models/patatas-bravas.glb`. Su generador reproducible está en `scripts/generate-bravas-model.py` y requiere Python con `numpy`, `trimesh` y Pillow. La interfaz usa `@google/model-viewer`, cargado solo cuando se abre una foto de las bravas.

Las fotografías de ejemplo ya están optimizadas en WebP bajo `public/images/menus/`.
