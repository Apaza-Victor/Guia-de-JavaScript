(function () {
  const INPUT_SELECTOR = '.header-search input[type="text"]';
  const STORAGE_KEY = 'js-master-search-index';

  let allTopics = [];

  function getBase() {
    return document.body.dataset.base || '';
  }

  function buildResultsHtml(topics) {
    if (!topics.length) {
      return '<div class="search-dropdown__empty">Ningún tema coincide</div>';
    }
    return topics.map(t => `
      <a class="search-dropdown__item" href="${getBase()}pages/${t.nivelSlug}/${t.slug}.html">
        <span class="search-dropdown__chip">nivel[${t.nivelIndex}]</span>
        <span class="search-dropdown__text">${t.titulo}</span>
      </a>
    `).join('');
  }

  function showDropdown(input, html) {
    let drop = input.parentElement.querySelector('.search-dropdown');
    if (!drop) {
      drop = document.createElement('div');
      drop.className = 'search-dropdown';
      input.parentElement.style.position = 'relative';
      input.parentElement.appendChild(drop);
    }
    drop.innerHTML = html;
    drop.classList.add('is-visible');
  }

  function hideDropdown(input) {
    const drop = input.parentElement.querySelector('.search-dropdown');
    if (drop) drop.classList.remove('is-visible');
  }

  function initSearch(input) {
    input.addEventListener('input', function () {
      const q = this.value.trim().toLowerCase();
      if (!q) { hideDropdown(this); return; }

      const results = allTopics.filter(t =>
        t.titulo.toLowerCase().includes(q) ||
        t.nivelTitulo.toLowerCase().includes(q)
      ).slice(0, 10);

      showDropdown(this, buildResultsHtml(results));
    });

    input.addEventListener('focus', function () {
      if (this.value.trim()) {
        const q = this.value.trim().toLowerCase();
        const results = allTopics.filter(t =>
          t.titulo.toLowerCase().includes(q) ||
          t.nivelTitulo.toLowerCase().includes(q)
        ).slice(0, 10);
        showDropdown(this, buildResultsHtml(results));
      }
    });

    input.addEventListener('blur', function () {
      setTimeout(() => hideDropdown(this), 180);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
        input.focus();
      }
    });
  }

  function loadIndexAndInit() {
    const cached = sessionStorage.getItem(STORAGE_KEY);
    if (cached) {
      try { allTopics = JSON.parse(cached); } catch {}
    }

    if (allTopics.length) {
      document.querySelectorAll(INPUT_SELECTOR).forEach(initSearch);
      return;
    }

    fetch(getBase() + 'assets/data/temario.json')
      .then(r => r.json())
      .then(data => {
        allTopics = [];
        data.niveles.forEach(nivel => {
          nivel.temas.forEach(tema => {
            allTopics.push({
              id: tema.id,
              slug: tema.slug,
              titulo: tema.titulo,
              nivelSlug: nivel.slug,
              nivelIndex: nivel.index,
              nivelTitulo: nivel.titulo,
            });
          });
        });
        try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(allTopics)); } catch {}
        document.querySelectorAll(INPUT_SELECTOR).forEach(initSearch);
      })
      .catch(() => {});
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadIndexAndInit);
  } else {
    loadIndexAndInit();
  }
})();
