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
        document.body.style.overflow = 'hidden';
      };
      const closeMenu = () => {
        sidebar.classList.remove('is-open');
        overlay.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      };
      toggle.addEventListener('click', () => {
        sidebar.classList.contains('is-open') ? closeMenu() : openMenu();
      });
      overlay.addEventListener('click', closeMenu);
      document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

      const closeOnDesktop = (e) => {
        if (e.matches && sidebar.classList.contains('is-open')) closeMenu();
      };
      const mql = window.matchMedia('(min-width: 768px)');
      mql.addEventListener('change', closeOnDesktop);

      const headerEl = document.createElement('div');
      headerEl.className = 'sidebar__header';
      headerEl.innerHTML = '<span class="sidebar__header-title">Navegación</span>' +
        '<button class="sidebar__close" aria-label="Cerrar menú"><i class="bi bi-x-lg"></i></button>';
      sidebar.prepend(headerEl);
      headerEl.querySelector('.sidebar__close').addEventListener('click', closeMenu);
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
            <button class="nav-level__head" aria-expanded="true">
              <span class="nav-level__title">${nivel.titulo}</span>
              <span class="nav-level__count">${nivel.temas.length}</span>
              <i class="bi bi-chevron-down"></i>
            </button>
            <ul class="nav-level__list">
              ${nivel.temas.map(tema => `
                <li>
                  <a href="${base}pages/${nivel.slug}/${tema.slug}.html"
                     class="${tema.slug === currentSlug ? 'is-active' : ''}">
                    ${tema.titulo}
                  </a>
                </li>`).join('')}
            </ul>
          </div>`).join('');

        const activeLink = nav.querySelector('.nav-level__list a.is-active');
        if (activeLink) activeLink.scrollIntoView({ block: 'center' });

        nav.querySelectorAll('.nav-level__head').forEach(head => {
          head.addEventListener('click', () => {
            const list = head.nextElementSibling;
            const expanded = head.getAttribute('aria-expanded') === 'true';
            head.setAttribute('aria-expanded', String(!expanded));
            if (list) list.hidden = expanded;
          });
        });
      })
      .catch(() => {
        nav.innerHTML = '<p style="padding:1rem;font-size:.85rem;">No se pudo cargar el temario.</p>';
      });
  });
})();
