# JS Master

Guía web completa para aprender JavaScript de cero a experto. 55 temas organizados en 8 niveles progresivos, con ejemplos de código, modo oscuro, buscador y seguimiento de progreso.

🌐 **Sitio en vivo:** [apaza-victor.github.io/Guia-de-JavaScript/](https://apaza-victor.github.io/Guia-de-JavaScript/)

## Cómo verla en tu computadora

El sitio carga `assets/data/temario.json` con `fetch`, así que **no la abras con doble clic** (el navegador bloquea `fetch` en `file://`). Sirve la carpeta con un servidor local:

```bash
# Opción 1: Python
python3 -m http.server 8080
# abre http://localhost:8080

# Opción 2: extensión "Live Server" de VS Code
# clic derecho sobre index.html → "Open with Live Server"

# Opción 3: Node
npx serve .
```

## Estructura

```
js-master/
├── index.html                     → Home con hero, niveles, progreso global
├── AGENTS.md                      → Contexto y patrón del proyecto para OpenCode
├── assets/
│   ├── css/                       → 6 archivos: variables, base, layout, components, docs, responsive
│   ├── js/                        → 6 scripts: theme, sidebar, main, codeblock, search, progress
│   └── data/temario.json          → Fuente única del temario (8 niveles, 55 temas)
└── pages/
    ├── fundamentos/               → Nivel 0 (10 temas)
    ├── estructuras-de-datos/      → Nivel 1 (7 temas)
    ├── dom-y-eventos/             → Nivel 2 (6 temas)
    ├── poo/                       → Nivel 3 (5 temas)
    ├── asincronia/                → Nivel 4 (6 temas)
    ├── es6-plus/                  → Nivel 5 (5 temas)
    ├── buenas-practicas/          → Nivel 6 (6 temas)
    └── avanzado/                  → Nivel 7 (10 temas)
```

## Funcionalidades

### Navegación
- **Header nav** con 6 dropdowns de niveles en desktop (Fundamentos, Estructuras de datos, DOM y eventos, Asincronía, JS moderno, POO). Los niveles 6-7 (Buenas prácticas, Avanzado) están solo en el sidebar.
- **Sidebar plano** (sin acordeón) generado desde `temario.json` con separadores entre niveles — resalta el tema activo automáticamente.
- **Off-canvas en todos los tamaños**: el sidebar se abre con el botón hamburguesa (siempre visible) y se cierra con overlay o tecla Escape. En escritorio mide 320px de ancho.
- **Buscador** en tiempo real sobre los 55 temas tanto en el header (desktop) como dentro del sidebar (atajo tecla `/`).
- **Paginador** anterior/siguiente secuencial entre los 55 temas, encadenado entre niveles.

### UX
- **Dark/light mode** con persistencia en localStorage y respeto a `prefers-color-scheme`
- **Progreso de lectura**: botón "marcar como completado" por tema + barra global en el home
- **Botón "volver arriba"** flotante al hacer scroll (> 400px)
- **Responsive** mobile-first desde 368px hasta pantallas anchas
- **Animaciones** AOS en scroll
- **Resaltado de sintaxis** con Prism.js (autoloader) + botón copiar en cada bloque de código
- **Contenido full-width** en páginas de tema (sin columna de sidebar fija)

### Stack técnico
- HTML5 semántico + CSS3 con variables custom (BEM, mobile-first)
- JavaScript vanilla ES6+ (sin frameworks)
- Google Fonts (Space Mono, Inter, JetBrains Mono)
- Bootstrap Icons
- AOS (animaciones al hacer scroll)
- Prism.js con autoloader

## Estado del proyecto

- [x] Sistema de diseño (variables, dark/light, responsive)
- [x] Layout de páginas internas (single column, sidebar off-canvas, contenido full-width)
- [x] 55 páginas de tema completas (8 niveles)
- [x] Header nav con dropdowns por nivel (6 niveles visibles)
- [x] Sidebar plano con todos los temas
- [x] Buscador en tiempo real (header + sidebar)
- [x] Progreso de lectura con localStorage
- [x] Botón volver arriba
- [x] Despliegue en GitHub Pages
- [ ] Lighthouse 90+ en performance y accesibilidad

## Notas técnicas

- `assets/data/temario.json` es la fuente única de verdad — sidebar, buscador, header nav y progreso se alimentan de él.
- Cada página de tema define `data-base="../../"` y `data-current-slug="..."` en el `<body>` para que los scripts sepan cómo resolver rutas y qué enlace resaltar.
- Los scripts JS son independientes y se cargan vía `<script src="">` en orden: `theme.js → sidebar.js → codeblock.js → main.js → search.js → progress.js`.
- Para agregar un tema nuevo: crear el `.html` en `pages/<nivel>/<slug>.html` siguiendo el patrón de las páginas existentes, y añadir la entrada en `temario.json`.
