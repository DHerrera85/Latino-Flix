# Latino Series / Latino Flix

<!-- Replace relative path with exact raw GitHub URL to ensure preview renders -->
[![Vista previa de LatinoSeries](https://DHerrera85.github.io/Latino-Flix/img/preview.png)

Pequeña web de catálogo de series con carruseles y navegación responsive.

## Características principales
- Carrusel "Featured" (sección destacada)
  - Un slide visible a la vez.
  - Soporta arrastre con ratón y swipe táctil.
  - Indicadores y flechas de navegación (par único en el slider).
  - Cada slide puede usar `data-bg` para su imagen de fondo.
- Filas de galerías (p. ej. Galardonados, Dramas, Comedias, ...)
  - Carruseles horizontales con scroll, swipe táctil y arrastre con ratón.
  - Flechas por fila (.row-btn) que desplazan por "página" (ancho visible).
  - Comportamiento snap para experiencia tipo "página" al soltar el gesto.
- Navegación y UX
  - Navbar fijo con menú responsive (hamburger).
  - Enlaces del menú anclan a secciones (smooth scrolling + offset para navbar).
  - Footer con enlace al repositorio: https://github.com/DHerrera85/Latino-Flix
- Respuestas y accesibilidad mínimas
  - Soporte responsive y ajustes para pantallas pequeñas.
  - Scroll y animaciones con transiciones suavizadas.

## Estructura principal
- `index.html` — markup y secciones.
- `style.css` — estilos (cache-bust aplicado en el href: `style.css?v=...`).
- `app.js` — lógica: slider destacado, drag/swipe, indicadores, flechas por fila, menú.
- `img/` — imágenes usadas en slides y tarjetas.

## Desarrollo (rápido)
1. Abrir el proyecto:
   - cd "c:\Users\herre\OneDrive\Documentos\Latino Flix"
2. Instalar / servir (no requiere build si es estático): abrir `index.html` en navegador o usar un servidor local:
   - Python 3: `python -m http.server 8000`
3. Editar CSS/JS y probar en móvil/desktop.

## Notas de despliegue (GitHub Pages)
- Asegúrate de que `style.css` (y demás assets) estén commiteados con el mismo nombre (case-sensitive).
- Si GitHub Pages sirve desde `/repo` (no root), evita rutas absolutas que empiezan con `/`.
- Si ves estilos desactualizados en Pages, usamos cache-bust: `style.css?v=YYYYMMDD` en `index.html`.

## Scripts útiles incluidos
- `git-commands.sh` — script sugerido para stage/commit/push (editar rama si necesario).
- `COMMIT_MESSAGE.txt` — mensaje propuesto para commits de despliegue.

## Contacto / repo
LatinoSeries by @DHerrera85 — https://github.com/DHerrera85/Latino-Flix

---
Pequeñas mejoras recomendadas:
- Añadir tests visuales y optimizar imágenes (servir webp / lazy-loading).  
- Añadir control de desactivación de flechas en filas cuando no hay scroll posible.
