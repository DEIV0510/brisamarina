# Brisa Marina — Landing de hospedaje frente al mar (Tolú, Sucre)

Landing page premium para **Brisa Marina**, hospedajes frente al mar en Laguna Beach,
km 4 vía El Francés, Tolú (Sucre). Enfocada en convertir visitas en reservas por
**WhatsApp**, con enlaces a Airbnb y Booking.

## Cómo verla
```bash
node serve.js       # abre  http://localhost:5234
```
No requiere build ni dependencias: es HTML + CSS + JS puro. También puedes abrir
`index.html` directo, pero el video del hero y las fuentes se ven mejor con el servidor.

## Estructura
```
index.html      → estructura + SEO + datos estructurados (JSON-LD)
styles.css      → sistema de diseño (navy + dorado + arena) y responsive
script.js       → contenido editable (hospedajes/beneficios/galería/FAQ) + interacciones
img/            → fotos optimizadas a .webp (atardecer.webp = fondo del hero)
video/          → recorrido.mp4 (video vertical 9:16 de la sección "Así se vive Brisa Marina");
                  hero.mp4 queda como alternativa por si se quiere fondo de hero en video
favicon.svg
serve.js        → servidor estático local (puerto 5234)
_imgwork/       → script de procesamiento de imágenes (no se publica)
```

## Cómo editar lo más común

- **Agregar / cambiar hospedajes:** edita el arreglo `HOSPEDAJES` al inicio de `script.js`.
  Copia un bloque `{ ... }` y ajústalo. Para el botón de Airbnb pega el enlace real
  (o déjalo en `''` y el botón no aparece). Las tarjetas se generan solas → **es escalable**.
- **Cambiar el WhatsApp:** variable `WA` al inicio de `script.js` (formato `57` + número).
- **Beneficios / Galería / FAQ:** arreglos `BENEFICIOS`, `GALERIA` y `FAQ` en `script.js`.
- **Fotos:** reemplaza los `.webp` dentro de `img/` conservando el nombre, o vuelve a
  correr `_imgwork/process.js` con nuevas fotos.

## ⚠️ Pendientes / placeholders (buscar `TODO` en el código)
- **Booking:** ✅ ya apunta a la ficha real (Laguna Beach Ecohotel, Tolú:
  `booking.com/hotel/co/laguna-beach-ecohotel.es.html`) en el CTA y el footer.
- **Google Maps:** el iframe usa una búsqueda aproximada. Reemplazar por el mapa con el
  **pin exacto** (Google Maps → Compartir → Insertar un mapa).
- **Imagen para redes (og:image):** al publicar, cambiar `img/hotel.webp` por la URL
  pública real para que se vea bien al compartir en WhatsApp/redes.
- **Dominio:** las etiquetas usan `https://brisamarina.com/` de ejemplo; ajustar al dominio real.
- **Airbnb:** los 3 hospedajes ya tienen sus enlaces reales de referencia; verificar que
  cada uno corresponda a la suite/apartamento correcto.

## Notas de diseño
- Paleta: azul marino `#0A2A43`, dorado suave `#C9A24B`, arena `#ECE3D2`, crema `#FBF7EF`.
- Tipografías: Cormorant Garamond (títulos), Jost (texto), Sacramento (acentos).
- Animaciones suaves (reveal al hacer scroll, parallax, contadores, lightbox) y respeta
  `prefers-reduced-motion`. Botón de WhatsApp fijo y menú móvil.
