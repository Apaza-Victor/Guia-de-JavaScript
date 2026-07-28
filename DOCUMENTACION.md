# 📘 Documentación del Proyecto: "JS Master" — Web Guía/Teoría de JavaScript (Cero a Experto)

## 0. Resumen del proyecto

Sitio web tipo **documentación / guía interactiva** (estilo MDN, freeCodeCamp o Roadmap.sh) para enseñar JavaScript desde cero hasta nivel experto. Debe verse moderno, ser responsive desde **368px**, tener **modo claro/oscuro**, y estar construido con una arquitectura **escalable** (fácil de añadir nuevos temas sin romper nada).

---

## 1. Stack tecnológico recomendado

| Capa | Tecnología | Por qué |
|---|---|---|
| Estructura | **HTML5 semántico** + **Bootstrap 5.3** (grid y utilidades, no todo el componente visual) | Bootstrap acelera el grid/responsive, pero el HTML semántico (`<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`, `<footer>`) mejora SEO y accesibilidad |
| Estilos | **CSS3** con **variables custom (`:root`)**, Flexbox y Grid | Necesario para theming (dark/light) real y control fino que Bootstrap solo no da |
| Interactividad | **JavaScript ES6+ modular (Vanilla JS)** | Es la mejor forma de "practicar lo que enseñas"; nada de frameworks pesados para una web de contenido |
| Iconos | **Bootstrap Icons** o **Font Awesome 6** (CDN) | Iconos para navegación, niveles, badges de dificultad |
| Animaciones | **AOS (Animate On Scroll)** para entradas de sección + **CSS transitions/keyframes** propias | Ligero, declarativo (`data-aos="fade-up"`), no requiere JS complejo |
| Resaltado de código | **Prism.js** o **Highlight.js** | Imprescindible en una web de teoría de programación: bloques de código con sintaxis coloreada |
| Tipografía | **Google Fonts** (ej. `Inter` para texto, `Fira Code` o `JetBrains Mono` para código) | Look moderno tipo documentación técnica |
| Búsqueda (opcional escalable) | **Lunr.js** o búsqueda propia con JSON index | Buscar temas dentro del sitio sin backend |
| Control de versiones | **Git + GitHub** | Necesario para desplegar y para trabajar con OpenCode |
| Hosting | **GitHub Pages**, **Vercel** o **Netlify** | Gratis, ideal para sitio estático |

> 🔑 Regla de escalabilidad: Bootstrap solo para el **layout/grid/utilidades** (`container`, `row`, `col-*`, `d-flex`, `gap-*`), el diseño visual final (colores, tipografía, tarjetas, sidebar) lo controla **tu propio CSS con variables**, para que no se vea "genérico de Bootstrap".

---

## 2. Arquitectura de carpetas (escalable)

```
js-master/
├── index.html
├── /pages/
│   ├── fundamentos/
│   │   ├── variables.html
│   │   ├── tipos-de-datos.html
│   │   └── operadores.html
│   ├── funciones/
│   ├── dom/
│   ├── asincronia/
│   ├── poo/
│   ├── es6-plus/
│   └── avanzado/
├── /assets/
│   ├── /css/
│   │   ├── variables.css       → colores, tipografía (light/dark tokens)
│   │   ├── base.css            → reset + estilos globales
│   │   ├── layout.css          → navbar, sidebar, grid general
│   │   ├── components.css      → cards, badges, botones, code blocks
│   │   └── responsive.css      → media queries (mobile-first)
│   ├── /js/
│   │   ├── main.js             → inicializa todo
│   │   ├── theme.js            → lógica dark/light
│   │   ├── sidebar.js          → menú responsive / acordeón de temas
│   │   ├── search.js           → buscador
│   │   └── progress.js         → barra de progreso de lectura / avance del curso
│   ├── /img/
│   └── /data/
│       └── temario.json        → índice de todos los temas (fuente única de verdad)
├── /components/                → fragmentos HTML reutilizables (navbar.html, footer.html) si usas un include-loader JS
├── AGENTS.md                   → contexto del proyecto para OpenCode (ver sección 8)
└── README.md
```

**Por qué es escalable:** cada tema nuevo es solo un `.html` dentro de `/pages/<categoria>/` + una entrada nueva en `temario.json`. El sidebar y el buscador se generan dinámicamente leyendo ese JSON, así que agregar 50 temas más no implica tocar el JS de navegación.

---

## 3. Sistema de Dark / Light Mode

**Estrategia:** variables CSS + atributo `data-theme` en `<html>` + `localStorage` + respeto a `prefers-color-scheme` en la primera visita.

```css
/* variables.css */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f6fa;
  --text-primary: #1a1a1a;
  --text-secondary: #555;
  --accent: #6366f1;
  --border: #e2e2e2;
  --code-bg: #f4f4f9;
}

[data-theme="dark"] {
  --bg-primary: #0f0f14;
  --bg-secondary: #16161d;
  --text-primary: #eaeaea;
  --text-secondary: #a0a0a8;
  --accent: #818cf8;
  --border: #2a2a33;
  --code-bg: #1e1e28;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  transition: background .3s ease, color .3s ease;
}
```

```js
// theme.js
const toggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggleBtn.setAttribute('aria-pressed', theme === 'dark');
}

const saved = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (prefersDark ? 'dark' : 'light'));

toggleBtn.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});
```

> Coloca el script de tema **inline en el `<head>`** (antes de renderizar el body) para evitar el "flash" de tema incorrecto al cargar.

---

## 4. Responsive Design (desde 368px)

**Enfoque mobile-first**: escribes el CSS base para pantallas pequeñas y vas ampliando con `min-width`.

```css
/* responsive.css — mobile-first */

/* Base: 368px en adelante (móviles pequeños) */
.container { padding-inline: 1rem; }
.sidebar { display: none; } /* oculto, se abre con botón hamburguesa */
h1 { font-size: 1.5rem; }

/* ≥576px — móviles grandes */
@media (min-width: 576px) {
  h1 { font-size: 1.75rem; }
}

/* ≥768px — tablets */
@media (min-width: 768px) {
  .sidebar { display: block; position: static; }
  .layout { display: grid; grid-template-columns: 260px 1fr; gap: 2rem; }
}

/* ≥992px — laptops */
@media (min-width: 992px) {
  .layout { grid-template-columns: 280px 1fr 220px; } /* + índice "en esta página" */
  h1 { font-size: 2.25rem; }
}

/* ≥1200px — desktop */
@media (min-width: 1200px) {
  .container { max-width: 1140px; margin-inline: auto; }
}

/* ≥1400px — pantallas grandes */
@media (min-width: 1400px) {
  .container { max-width: 1320px; }
}
```

Reglas clave:
- `<meta name="viewport" content="width=device-width, initial-scale=1">` obligatorio.
- Usa `rem`/`%`/`clamp()` en vez de `px` fijos para tipografía: `font-size: clamp(1rem, 2vw + 0.5rem, 1.75rem);`
- Prueba en DevTools con un breakpoint custom de 368px (Bootstrap no lo trae por defecto, así que ese control es 100% tuyo en `responsive.css`).
- Sidebar de navegación: en móvil se convierte en **off-canvas** (menú hamburguesa deslizante); en desktop es fijo.

---

## 5. Temario completo: JavaScript de Cero a Experto

Esta es la estructura de contenidos que debe cubrir tu web (cada bloque = una sección del sidebar).

### 📗 Nivel 1 — Fundamentos
1. ¿Qué es JavaScript? Historia y motor V8
2. Cómo enlazar JS en HTML (`<script>`, `defer`, `async`)
3. Variables: `var`, `let`, `const`
4. Tipos de datos (primitivos vs referencia)
5. Operadores (aritméticos, comparación, lógicos, ternario)
6. Coerción de tipos (`==` vs `===`)
7. Estructuras condicionales (`if/else`, `switch`)
8. Bucles (`for`, `while`, `do...while`, `for...of`, `for...in`)
9. Funciones: declaración, expresión, arrow functions
10. Scope y Hoisting

### 📘 Nivel 2 — Estructuras de datos
11. Arrays y métodos (`map`, `filter`, `reduce`, `forEach`, `find`, `sort`...)
12. Objetos literales y propiedades
13. Destructuring (arrays y objetos)
14. Spread / Rest operator
15. Template literals
16. `Map`, `Set`, `WeakMap`, `WeakSet`
17. JSON: `parse` / `stringify`

### 📙 Nivel 3 — DOM y eventos
18. El DOM: selección de elementos (`querySelector`, etc.)
19. Manipulación del DOM (crear, modificar, eliminar nodos)
20. Eventos y el modelo de burbujeo/captura
21. Delegación de eventos
22. Formularios y validación
23. BOM: `window`, `location`, `history`, `navigator`

### 📕 Nivel 4 — Programación Orientada a Objetos
24. Objetos y `this`
25. Prototipos y herencia prototípica
26. Clases ES6 (`class`, `constructor`, `extends`, `super`)
27. Encapsulamiento (`#privadas`, getters/setters)
28. Polimorfismo y composición vs herencia

### 📔 Nivel 5 — Asincronía
29. Call Stack, Event Loop, Microtasks/Macrotasks
30. Callbacks y "callback hell"
31. Promesas (`then`, `catch`, `finally`, `Promise.all/race/allSettled`)
32. `async` / `await`
33. `fetch API` y consumo de APIs REST
34. Manejo de errores asíncronos

### 📒 Nivel 6 — JavaScript moderno (ES6+)
35. Módulos (`import` / `export`)
36. Optional chaining (`?.`) y Nullish coalescing (`??`)
37. Generadores e iteradores (`function*`, `yield`)
38. Symbols
39. Proxy y Reflect

### 📓 Nivel 7 — Buenas prácticas y herramientas
40. Clean Code aplicado a JS
41. ESLint y Prettier
42. Manejo de errores (`try/catch/finally`, errores personalizados)
43. Testing básico (Jest / Vitest)
44. Debugging con DevTools
45. Control de versiones con Git aplicado a proyectos JS

### 📚 Nivel 8 — Avanzado / rumbo a experto
46. Patrones de diseño en JS (Module, Singleton, Observer, Factory)
47. Programación funcional (funciones puras, inmutabilidad, composición)
48. Closures avanzados y aplicaciones prácticas
49. Web APIs (LocalStorage, IndexedDB, Geolocation, WebSockets, Service Workers)
50. Seguridad en JS (XSS, CORS, sanitización)
51. Rendimiento y optimización (debounce, throttle, lazy loading)
52. Web Components (Custom Elements, Shadow DOM)
53. Introducción a TypeScript
54. Bundlers modernos (Vite, Webpack) y npm
55. Introducción a frameworks (React/Vue) como siguiente paso

### 🏆 Proyectos prácticos por nivel
- Principiante: calculadora, to-do list, reloj digital
- Intermedio: buscador de clima con fetch, carrito de compras, quiz app
- Avanzado: SPA con routing manual, dashboard con gráficos, mini framework propio

---

## 6. Paso a paso para construir la web

### Fase 0 — Planificación
1. Define el **sitemap**: home, listado de temas por nivel, página de tema individual, página de proyectos.
2. Haz un wireframe simple (papel o Figma) para desktop y móvil.
3. Crea `temario.json` con la estructura completa del temario (sección 5) — será la fuente que alimenta sidebar, buscador y progreso.

### Fase 1 — Setup del proyecto
4. Crea el repositorio en GitHub.
5. Estructura de carpetas (sección 2).
6. `index.html` base con Bootstrap 5 vía CDN + Google Fonts + Bootstrap Icons + AOS + Prism.js vía CDN.

### Fase 2 — Estilos base y theming
7. `variables.css` con tokens light/dark (sección 3).
8. `base.css`: reset, tipografía global, estilos de `<body>`.
9. Implementa el toggle de tema (`theme.js`) y pruébalo antes de seguir.

### Fase 3 — Layout principal
10. Navbar superior: logo, buscador, botón dark/light, botón hamburguesa (móvil).
11. Sidebar de navegación (lista de temas agrupados por nivel), generado dinámicamente desde `temario.json`.
12. Área de contenido principal (`<main>`) con grid de 2 o 3 columnas según breakpoint (sección 4).
13. Footer con links y créditos.

### Fase 4 — Responsive
14. Aplica `responsive.css` mobile-first desde 368px.
15. Convierte el sidebar en off-canvas para móvil (con overlay + animación de deslizamiento).
16. Prueba en DevTools en anchos: 368px, 576px, 768px, 992px, 1200px, 1400px.

### Fase 5 — Contenido y componentes reutilizables
17. Crea un **template de página de tema** (título, badge de nivel, teoría, bloque de código, ejemplo interactivo, "temas relacionados", botones anterior/siguiente).
18. Componentes CSS: cards de tema, badges de dificultad (Básico/Intermedio/Avanzado), bloques de código con botón "copiar".
19. Integra Prism.js/Highlight.js para resaltado de sintaxis en todos los bloques `<pre><code>`.
20. Genera las páginas de los 55 temas usando el template (aquí OpenCode ayuda mucho a escalar, ver sección 8).

### Fase 6 — Interactividad (JS)
21. `sidebar.js`: acordeón + resaltar sección activa según scroll (Intersection Observer).
22. `search.js`: input que filtra `temario.json` en tiempo real.
23. `progress.js`: barra de progreso de lectura + checklist de "temas completados" guardado en `localStorage`.
24. Animaciones AOS en tarjetas y secciones (`data-aos="fade-up"`, `data-aos-delay`).

### Fase 7 — Accesibilidad y SEO
25. Etiquetas `alt`, `aria-label`, contraste de color adecuado en ambos temas.
26. `<title>` y `meta description` únicos por página.
27. Navegación por teclado (focus visible, skip-to-content link).

### Fase 8 — Optimización
28. Minifica CSS/JS para producción.
29. Lazy loading de imágenes (`loading="lazy"`).
30. Verifica performance con Lighthouse (móvil y desktop).

### Fase 9 — Despliegue
31. Sube a GitHub.
32. Conecta con Vercel o Netlify (deploy automático en cada push) o activa GitHub Pages.
33. Configura dominio propio si aplica.

---

## 7. Buenas prácticas de escalabilidad

- **Una sola fuente de verdad**: `temario.json` alimenta sidebar, buscador, progreso y el mapa de "temas relacionados". Nunca hardcodees el menú en cada HTML.
- **CSS con metodología BEM** (`.card__title`, `.card--dark`) para evitar colisiones de estilos al crecer.
- **JS modular** (`import/export`) separando responsabilidades: tema, sidebar, búsqueda, progreso — nunca todo en un solo archivo gigante.
- **Componentes HTML reutilizables**: si no usas un framework, usa un pequeño loader JS (`fetch('navbar.html').then(...)`) para no repetir navbar/footer en 55 páginas.
- **Naming consistente de archivos**: `kebab-case.html` para todas las páginas de tema.
- **Versionado de contenido**: cada tema puede tener un campo `"actualizado": "2026-07"` en el JSON para saber qué revisar.

---

## 8. Cómo construir esto con OpenCode

**OpenCode** es un agente de código IA de código abierto que corre en la terminal (también tiene app de escritorio y extensión de IDE). A diferencia de copiar/pegar código desde un chat, apuntas OpenCode a la carpeta del proyecto y él lee, escribe y modifica los archivos directamente, además de poder ejecutar comandos.

### 8.1 Instalación y configuración inicial

```bash
# Instalar (Linux/macOS vía script oficial)
curl -fsSL https://opencode.ai/install | bash

# Autenticarse con tu proveedor de modelo (puedes usar Claude, GPT, etc.)
opencode auth login
```

### 8.2 Inicializar el proyecto

```bash
mkdir js-master && cd js-master
git init
opencode
```

Dentro de la sesión de OpenCode, ejecuta:

```
/init
```

Esto analiza la carpeta (aunque esté vacía o con poco contenido) y genera un archivo **`AGENTS.md`** en la raíz — es el "manual de instrucciones" que OpenCode leerá siempre para entender el proyecto. **Coméntelo a Git.**

Edita `AGENTS.md` para incluir el contexto de este documento, por ejemplo:

```markdown
# AGENTS.md

## Proyecto
Web de documentación/teoría para aprender JavaScript de cero a experto.

## Stack
- HTML5 semántico + Bootstrap 5 (solo grid/utilidades)
- CSS3 con variables custom (dark/light mode vía data-theme)
- JavaScript Vanilla ES6+ modular
- Librerías: Bootstrap Icons, AOS, Prism.js, Google Fonts

## Reglas
- Mobile-first, breakpoints desde 368px (ver responsive.css)
- No usar frameworks JS (React/Vue) — solo Vanilla JS
- El sidebar y el buscador se alimentan de /assets/data/temario.json
- Seguir metodología BEM en CSS
- Cada tema nuevo = 1 archivo en /pages/<categoria>/ + entrada en temario.json
- Mantener accesibilidad (aria-label, contraste, navegación por teclado)
```

### 8.3 Modo Plan vs Modo Build

OpenCode tiene dos modos que alternas con **Tab**:
- **Plan mode** (solo lectura): úsalo primero para pedirle que analice y proponga la arquitectura o el plan de una fase, sin tocar archivos todavía.
- **Build mode**: aquí sí edita archivos y ejecuta comandos.

Flujo recomendado:
```
[Plan mode]
"Propón la estructura de carpetas para esta web de documentación de JS 
según el AGENTS.md, y un plan de los primeros 3 archivos a crear."

→ revisas el plan, das feedback

[Tab → Build mode]
"Perfecto, adelante, crea esa estructura."
```

### 8.4 Prompts sugeridos por fase (usando este documento como guía)

Puedes literalmente pegarle a OpenCode el contenido de las secciones de este documento como contexto. Ejemplos de prompts, uno por fase:

```
1. "Crea la estructura de carpetas del proyecto según la sección 2 
    de la documentación adjunta."

2. "Genera index.html con Bootstrap 5, Google Fonts (Inter y Fira Code), 
    Bootstrap Icons, AOS y Prism.js vía CDN, siguiendo HTML semántico."

3. "Crea variables.css con los tokens de color light/dark de la sección 3, 
    y theme.js con la lógica de toggle + localStorage + prefers-color-scheme."

4. "Crea el layout principal: navbar, sidebar off-canvas en móvil, 
    y grid de contenido, responsive mobile-first desde 368px 
    con los breakpoints de la sección 4."

5. "Crea temario.json con los 55 temas de la sección 5, agrupados 
    por los 8 niveles, con campos: id, titulo, nivel, categoria, archivo."

6. "Crea sidebar.js que lea temario.json y genere el menú dinámicamente, 
    agrupado por nivel, con acordeón."

7. "Crea el template de página de tema (página individual) con: título, 
    badge de dificultad, contenido teórico, bloque de código con Prism.js 
    y botón copiar, sección de temas relacionados, y navegación anterior/siguiente."

8. "Genera las páginas HTML de los temas del Nivel 1 (Fundamentos) 
    usando el template anterior, con contenido teórico real de cada tema."

9. "Crea search.js: un input en el navbar que filtre temario.json 
    en tiempo real y muestre resultados como dropdown."

10. "Revisa todo el proyecto y dime qué hace falta para que sea 
     accesible (aria-labels, contraste, foco visible) y optimizado (Lighthouse)."
```

> 💡 Tip: pídele a OpenCode que genere **un tema como muestra primero**, revísalo tú, ajusta el prompt/template, y luego dile "repite este mismo patrón para los 54 temas restantes del temario.json" — así evitas regenerar todo si el formato no te convence.

### 8.5 Comandos útiles dentro de OpenCode

| Comando | Función |
|---|---|
| `/init` | Analiza el repo y genera/actualiza `AGENTS.md` |
| `/connect` | Conectar o cambiar de proveedor de modelo |
| `/undo` | Deshacer el último cambio aplicado |
| `/redo` | Rehacer un cambio deshecho |
| `/share` | Compartir la sesión (si está habilitado) |
| `/help` | Ver todos los atajos y comandos |
| `Tab` | Alternar entre Plan mode y Build mode |

Para automatizar (por ejemplo generar los 55 temas en lote desde un script):

```bash
opencode run "Genera la página HTML del tema 'Closures' siguiendo 
el template definido en /pages/_template.html, usando la teoría 
que está en temario.json id=48" -q
```

### 8.6 Buen hábito de trabajo con Git + OpenCode

1. Trabaja por fases (las de la sección 6), y haz **commit después de cada fase** que apruebes.
2. Revisa siempre el diff antes de aceptar cambios grandes (OpenCode te muestra qué archivos toca).
3. Mantén `AGENTS.md` actualizado a medida que el proyecto crece — así cada nueva sesión de OpenCode "recuerda" las convenciones del proyecto.

---

## 9. Checklist final antes de lanzar

- [ ] Responsive probado desde 368px hasta 1400px+
- [ ] Dark/Light mode funcional y persistente (localStorage)
- [ ] Sidebar + buscador generados desde `temario.json`
- [ ] Todos los bloques de código con resaltado de sintaxis y botón copiar
- [ ] Navegación por teclado y contraste accesible en ambos temas
- [ ] Lighthouse: Performance / Accesibilidad / SEO > 90
- [ ] `AGENTS.md` documentado y commiteado
- [ ] Deploy automático configurado (Vercel/Netlify/GitHub Pages)

---

*Documento generado como guía de referencia para construir "JS Master" — actualízalo a medida que el proyecto evoluciona.*
