(function () {
  const STORAGE_KEY = 'js-master-progress';
  const TOTAL_TOPICS = 55;

  function getProgress() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch { return []; }
  }

  function saveProgress(ids) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(ids)); } catch {}
  }

  function toggleTopic(id) {
    let ids = getProgress();
    const idx = ids.indexOf(id);
    if (idx === -1) ids.push(id); else ids.splice(idx, 1);
    saveProgress(ids);
    return ids;
  }

  function isCompleted(id) {
    return getProgress().indexOf(id) !== -1;
  }

  // ---- Topic page: botón de completado ----
  function initTopicPage() {
    const header = document.querySelector('.topic-header');
    const currentSlug = document.body.dataset.currentSlug;
    if (!header || !currentSlug) return;

    const chip = header.querySelector('.index-chip');
    if (!chip) return;
    const match = chip.textContent.match(/\d+/);
    if (!match) return;
    const topicId = parseInt(match[0], 10);

    const meta = header.querySelector('.topic-header__meta');
    if (!meta) return;

    const btn = document.createElement('button');
    btn.className = 'progress-btn';
    btn.setAttribute('aria-label', 'Marcar tema como completado');
    updateBtn(btn, isCompleted(topicId));
    btn.addEventListener('click', function () {
      const ids = toggleTopic(topicId);
      updateBtn(this, ids.indexOf(topicId) !== -1);
    });
    meta.appendChild(btn);
  }

  function updateBtn(btn, completed) {
    if (completed) {
      btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> completado';
      btn.classList.add('is-done');
    } else {
      btn.innerHTML = '<i class="bi bi-circle"></i> marcar';
      btn.classList.remove('is-done');
    }
  }

  // ---- Home page: barra de progreso ----
  function initHomePage() {
    const section = document.querySelector('#niveles');
    if (!section) return;

    const ids = getProgress();
    const pct = Math.round((ids.length / TOTAL_TOPICS) * 100);

    const progressEl = document.createElement('div');
    progressEl.className = 'progress-bar-section';
    progressEl.innerHTML = `
      <div class="container">
        <div class="progress-bar-section__inner">
          <div class="progress-bar-section__info">
            <span class="progress-bar-section__label">progreso</span>
            <span class="progress-bar-section__count">${ids.length} / ${TOTAL_TOPICS} temas</span>
          </div>
          <div class="progress-bar-section__track">
            <div class="progress-bar-section__fill" style="width:${pct}%"></div>
          </div>
          <span class="progress-bar-section__pct">${pct}%</span>
        </div>
      </div>
    `;

    section.parentElement.insertBefore(progressEl, section);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initTopicPage();
      initHomePage();
    });
  } else {
    initTopicPage();
    initHomePage();
  }
})();
