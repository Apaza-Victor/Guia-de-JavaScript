# JS Master

Guía web completa para aprender JavaScript de cero a experto. 55 temas organizados en 8 niveles progresivos, con ejemplos de código, modo oscuro, buscador y seguimiento de progreso.

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
│   ├── js/                        → 7 scripts: theme, sidebar, main, toc, codeblock, search, progress
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
- **Header nav** con dropdowns por nivel en desktop
- **Sidebar acordeón** generado desde `temario.json` en páginas internas
- **Menú hamburguesa** con off-canvas sidebar en móvil
- **Paginador** anterior/siguiente entre temas secuenciales
- **TOC** "en esta página" con scrollspy (IntersectionObserver)

### UX
- **Dark/light mode** con persistencia en localStorage y respeto a `prefers-color-scheme`
- **Buscador** en tiempo real sobre los 55 temas (atajo tecla `/`)
- **Progreso de lectura**: botón "marcar como completado" por tema + barra global en el home
- **Botón "volver arriba"** flotante al hacer scroll
- **Responsive** mobile-first desde 368px hasta 1400px+
- **Animaciones** AOS en scroll
- **Resaltado de sintaxis** con Prism.js + botón copiar

### Stack técnico
- HTML5 semántico + CSS3 con variables custom (BEM)
- JavaScript vanilla ES6+ (sin frameworks)
- Google Fonts (Space Mono, Inter, JetBrains Mono)
- Bootstrap Icons
- AOS (animaciones)
- Prism.js (autoloader)

## Estado del proyecto

- [x] Sistema de diseño (variables, dark/light, responsive)
- [x] Layout de páginas internas (sidebar + TOC + template de tema)
- [x] 55 páginas de tema completas (8 niveles)
- [x] Header nav con dropdowns por nivel
- [x] Buscador en tiempo real
- [x] Progreso de lectura con localStorage
- [x] Botón volver arriba
- [ ] Despliegue (GitHub Pages / Vercel / Netlify)
- [ ] Lighthouse 90+ en performance y accesibilidad

## Notas técnicas

- `assets/data/temario.json` es la fuente única de verdad — sidebar, buscador, header nav y progreso se alimentan de él.
- Cada página de tema define `data-base="../../"` y `data-current-slug="..."` en el `<body>` para que los scripts sepan cómo resolver rutas y qué enlace resaltar.
- Los scripts JS son independientes y se cargan vía `<script src="">` en orden: `theme.js → sidebar.js → main.js → search.js → progress.js → toc.js → codeblock.js`.
- Para agregar un tema nuevo: crear el `.html` en `pages/<nivel>/<slug>.html` siguiendo el patrón de las páginas existentes, y añadir la entrada en `temario.json`.
