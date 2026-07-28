# JS Master

Guía web para aprender JavaScript de cero a experto.

## Cómo verla en tu computadora

El sitio carga `assets/data/temario.json` con `fetch`, así que **no la abras con doble clic** (el navegador bloquea `fetch` en `file://`). Sirve la carpeta con un servidor local:

```bash
# Opción 1: Python (ya viene instalado en Mac/Linux)
cd js-master
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
├── index.html
├── AGENTS.md                 → contexto y patrón del proyecto para OpenCode
├── assets/css/                → variables, base, layout, componentes, docs, responsive
├── assets/js/                 → theme.js, sidebar.js, toc.js, codeblock.js, main.js
├── assets/data/temario.json   → fuente única del temario (8 niveles, 55 temas)
└── pages/<nivel>/<tema>.html  → páginas de cada tema
```

## Estado del proyecto

- [x] Parte 1 — Sistema de diseño + Home (hero, niveles, dark/light, responsive)
- [x] Parte 2 — Layout de páginas internas (sidebar acordeón + TOC) + template de tema con Prism.js
- [x] Parte 3 — 55 páginas de tema completas (8 niveles, todos los temas)
- [ ] Buscador funcional (conectado al input que ya está en el header)
- [ ] Barra de progreso / temas completados (localStorage)
- [ ] Accesibilidad, SEO y despliegue

## Cómo seguir con OpenCode

Todo el patrón (estructura exacta, convenciones de nombres, estilo de redacción y un prompt listo para copiar) está documentado en **`AGENTS.md`**, en la raíz del proyecto. Al iniciar OpenCode en esta carpeta, corré `/init` — como ya existe `AGENTS.md`, lo va a leer y usar como contexto del proyecto automáticamente.

## Notas técnicas

- `assets/data/temario.json` tiene cada tema como objeto `{ id, slug, titulo }` dentro de cada nivel — el sidebar y los enlaces se generan a partir de esto, no hace falta tocar JS para agregar contenido.
- `assets/js/sidebar.js` genera el acordeón del menú leyendo ese JSON.
- `assets/js/toc.js` arma "en esta página" leyendo los `h2`/`h3` del artículo (scrollspy incluido).
- `assets/js/codeblock.js` agrega el botón "copiar" a cualquier `.code-block`.
- Cada página de tema define `data-base="../../"` y `data-current-slug="..."` en el `<body>` — de ahí el sidebar sabe qué enlace resaltar y con qué prefijo armar los `href`.
