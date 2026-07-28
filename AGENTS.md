# AGENTS.md — JS Master

## Qué es este proyecto

Web de documentación/teoría para aprender JavaScript de cero a experto. Sitio estático: HTML + CSS + JavaScript vanilla, sin build step ni frameworks.

## Stack

- HTML5 semántico
- CSS3 con variables custom (`assets/css/variables.css`) para dark/light mode vía `[data-theme]`
- JavaScript Vanilla ES6+, sin módulos empaquetados (scripts sueltos vía `<script src="">`)
- CDN: Google Fonts (Space Mono, Inter, JetBrains Mono), Bootstrap Icons, AOS (animaciones al hacer scroll), Prism.js (resaltado de código, autoloader)

## Cómo correr el proyecto

`fetch()` se usa para cargar `assets/data/temario.json`, así que **nunca se abre con doble clic**. Servir con:
```
python3 -m http.server 8080
```

## Estructura de carpetas

```
js-master/
├── index.html
├── assets/css/{variables,base,layout,components,docs,responsive}.css
├── assets/js/{theme,sidebar,toc,codeblock,main}.js
├── assets/data/temario.json   ← fuente única de verdad del temario
└── pages/<nivel-slug>/<tema-slug>.html
```

## `temario.json` — fuente única de verdad

8 niveles, 55 temas. Cada nivel: `{ index, slug, titulo, dificultad, descripcion, temas: [{ id, slug, titulo }] }`.
El sidebar (`assets/js/sidebar.js`) y el home (`index.html`) leen este archivo para generarse. **No hace falta tocar JS para agregar contenido** — el archivo ya tiene los 55 temas definidos con su `slug`; lo que falta es crear el `.html` de cada uno.

## Páginas ya construidas (usar como referencia exacta del patrón)

- `pages/fundamentos/que-es-javascript.html` — primera página del temario (sin botón "anterior" en el paginador)
- `pages/fundamentos/vincular-js-en-html.html`
- `pages/fundamentos/variables.html` — la más completa: incluye tabla comparativa y dos callouts
- `pages/fundamentos/tipos-de-datos.html`
- `pages/asincronia/promesas.html` — ejemplo en otro nivel/carpeta, con contenido async

## Patrón EXACTO para crear una página de tema nueva

1. Copiar cualquiera de las páginas de referencia de arriba (la más parecida en tipo de contenido).
2. Ruta de destino: `pages/<nivel.slug>/<tema.slug>.html` según `temario.json`.
3. Cambiar, en orden:
   - `<title>` y `<meta name="description">`
   - `data-current-slug="<tema.slug>"` en el `<body>` (crítico: así el sidebar resalta el link activo y el acordeón del nivel se abre solo)
   - `data-base="../../"` se mantiene igual siempre (todas las páginas de tema están a 2 niveles de la raíz)
   - Breadcrumb: `nivel[<nivel.index>] <nivel.titulo en minúsculas>` y el nombre del tema actual
   - `.topic-header`: `tema[<tema.id>]`, badge de dificultad (`badge--basico` / `badge--intermedio` / `badge--avanzado`, heredar el de `nivel.dificultad` salvo que el tema puntual amerite otro), tiempo de lectura estimado, `<h1>` y bajada
   - `.article-content`: contenido real del tema (ver estilo de redacción abajo)
   - `.topic-pager`: enlaces a los slugs anterior/siguiente **dentro del mismo nivel** según el orden de `temario.json`. Si es el primer tema del nivel 0, usar `<span class="topic-pager__link prev topic-pager__empty"></span>` en vez de link "anterior" (ver `que-es-javascript.html`). Si es el último tema de un nivel, enlazar al primer tema del **siguiente** nivel; si es el último tema del último nivel (`introduccion-frameworks`), omitir el botón "siguiente" del mismo modo.
4. NO tocar `assets/js/sidebar.js` ni `assets/js/toc.js` — funcionan automáticamente con cualquier página nueva que siga el patrón.
5. Todos los bloques de código van dentro de `.code-block` con `.code-block__head` (nombre de archivo ficticio + botón copiar) y `<pre><code class="language-javascript">` (o `language-html`, `language-css` según corresponda) — Prism autoloader se encarga del resto.

## Estilo de redacción del contenido

- Español neutro, tono directo, cercano pero técnico — no infantilizar.
- Cada tema: intro breve (por qué importa) → concepto central con 1-2 ejemplos de código cortos → matices/errores comunes (usar `.callout callout--warn` para advertencias y `.callout callout--tip` para consejos prácticos) → cierre breve conectando con el siguiente tema.
- Preferir ejemplos de código realistas y cortos (5-15 líneas) sobre teoría abstracta larga.
- Usar `.table-wrap > table.compare` cuando el tema se preste a comparar 2-4 opciones (como `var/let/const` o los métodos de `Promise`).
- Extensión objetivo por página: 500-900 palabras de contenido (sin contar código).

## Prompt sugerido para generar el resto de temas en OpenCode

```
Lee AGENTS.md completo. Usando pages/fundamentos/variables.html y
pages/asincronia/promesas.html como referencia exacta de estructura,
genera la página del tema "<slug>" del nivel "<nivel-slug>" según
temario.json, seguiendo el patrón EXACTO descrito en AGENTS.md
(data-current-slug, breadcrumb, topic-header, article-content,
topic-pager con los slugs correctos del nivel). Contenido real y
correcto sobre el tema, no placeholder.
```

Repetir por tema, o pedirle a OpenCode que lo automatice para todo un nivel a la vez una vez que apruebes el primer resultado de ese nivel.
