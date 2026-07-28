// sidebar.js — genera el menú acordeón desde temario.json,
// resalta el tema activo y controla el off-canvas en móvil.
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('sidebar-nav');
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    // ---- Off-canvas (móvil) ----
    if (toggle && sidebar && overlay) {
      const openMenu = () => {
        sidebar.classList.add('is-open');
        overlay.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');
      };
      const closeMenu = () => {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      };
      toggle.addEventListener('click', () => {
        sidebar.classList.contains('is-open') ? closeMenu() : openMenu();
      });
      overlay.addEventListener('click', closeMenu);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
    }

    // ---- Generación de la lista plana de temas desde temario.json ----
    if (!nav) return;

    const base = document.body.dataset.base || '';
    const currentSlug = document.body.dataset.currentSlug || '';

    fetch(base + 'assets/data/temario.json')
      .then(r => r.json())
      .then(data => {
        nav.innerHTML = data.niveles.map(nivel => `
          <div class="nav-level">
            <ul class="nav-level__list">
              ${nivel.temas.map(tema => `
                <li>
                  <a href="${base}pages/${nivel.slug}/${tema.slug}.html"
                     class="${tema.slug === currentSlug ? 'is-active' : ''}">
                    ${tema.titulo}
                  </a>
                </li>`).join('')}
            </ul>
          </div>`;
        }).join('');

        const activeLink = nav.querySelector('.nav-level__list a.is-active');
        if (activeLink) activeLink.scrollIntoView({ block: 'center' });
      })
      .catch(() => {
        nav.innerHTML = '<p style="padding:1rem;font-size:.85rem;">No se pudo cargar el temario.</p>';
      });
  });
})();
