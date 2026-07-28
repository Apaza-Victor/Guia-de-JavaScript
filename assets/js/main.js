// main.js — inicialización general del sitio

// ---- AOS (animaciones al hacer scroll) ----
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) {
    AOS.init({
      duration: 500,
      easing: 'ease-out',
      once: true,
      offset: 40,
      disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    });
  }

  // ---- Header nav: genera los dropdowns de niveles principales ----
  const headerNav = document.getElementById('header-nav');
  if (headerNav) {
    fetch((document.body.dataset.base || '') + 'assets/data/temario.json')
      .then(r => r.json())
      .then(data => {
        headerNav.innerHTML = data.niveles.slice(0, 6).map(nivel => `
          <div class="header-nav__item">
            <button class="header-nav__btn">${nivel.titulo === 'Programación Orientada a Objetos' ? 'POO' : nivel.titulo} <i class="bi bi-chevron-down"></i></button>
            <div class="header-nav__dropdown">
              ${nivel.temas.map(t => `
                <a class="header-nav__link" href="${document.body.dataset.base || ''}pages/${nivel.slug}/${t.slug}.html">${t.titulo}</a>
              `).join('')}
            </div>
          </div>
        `).join('');
      })
      .catch(() => {});
  }

  // ---- Back to top ----
  const backBtn = document.getElementById('back-to-top');
  if (backBtn) {
    const toggleBack = () => {
      backBtn.classList.toggle('is-visible', window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleBack, { passive: true });
    toggleBack();
  }
});

// ---- Consola animada del hero (elemento firma) ----
(function () {
  const el = document.getElementById('console-output');
  if (!el) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fullText = el.dataset.text || '';

  if (reduceMotion) {
    el.textContent = fullText;
    return;
  }

  let i = 0;
  function type() {
    if (i <= fullText.length) {
      el.textContent = fullText.slice(0, i);
      i++;
      setTimeout(type, 22);
    }
  }
  // Espera breve para sincronizar con la entrada de la sección
  setTimeout(type, 400);
})();
