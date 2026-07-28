// codeblock.js — botón "copiar" en cada bloque de código
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.code-block__copy').forEach(btn => {
      btn.addEventListener('click', async () => {
        const block = btn.closest('.code-block');
        const codeEl = block.querySelector('code');
        if (!codeEl) return;
        try {
          await navigator.clipboard.writeText(codeEl.textContent);
          const original = btn.innerHTML;
          btn.innerHTML = '<i class="bi bi-check2"></i> copiado';
          setTimeout(() => { btn.innerHTML = original; }, 1600);
        } catch (err) {
          console.error('No se pudo copiar:', err);
        }
      });
    });
  });
})();
