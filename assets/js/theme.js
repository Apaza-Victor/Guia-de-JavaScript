// theme.js — manejo de modo claro/oscuro con persistencia en localStorage
(function () {
  const root = document.documentElement;
  const STORAGE_KEY = 'js-master-theme';

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.setAttribute('aria-pressed', String(theme === 'dark'));
  }

  // Aplicado ya en <head> de forma inline para evitar flash,
  // aquí solo enlazamos el botón.
  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const current = root.getAttribute('data-theme') || 'light';
    btn.setAttribute('aria-pressed', String(current === 'dark'));

    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  });
})();
