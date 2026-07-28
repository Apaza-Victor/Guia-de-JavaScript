// toc.js — genera "en esta página" a partir de los h2/h3 del artículo
(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const article = document.querySelector('.article-content');
    const tocList = document.getElementById('toc-list');
    if (!article || !tocList) return;

    const headings = Array.from(article.querySelectorAll('h2, h3'));
    if (!headings.length) return;

    headings.forEach((h, i) => { if (!h.id) h.id = 'sec-' + (i + 1); });

    tocList.innerHTML = headings.map(h => `
      <li class="${h.tagName.toLowerCase()}">
        <a href="#${h.id}">${h.textContent}</a>
      </li>`).join('');

    const links = Array.from(tocList.querySelectorAll('a'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.id;
        const link = links.find(a => a.getAttribute('href') === '#' + id);
        if (!link) return;
        if (entry.isIntersecting) {
          links.forEach(a => a.classList.remove('is-active'));
          link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    headings.forEach(h => observer.observe(h));
  });
})();
