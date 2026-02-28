/**
 * Hub Search — shared search/filter for hub pages.
 * Filters on data-name, data-description attributes.
 */

export function initHubSearch(): void {
  const input = document.querySelector('[data-hub-search]') as HTMLInputElement | null;
  const list = document.getElementById('hub-list');
  const noResults = document.getElementById('no-results');
  const countEl = document.getElementById('visible-count');
  if (!input || !list) return;

  const cards = list.querySelectorAll('[data-name]');

  input.addEventListener('input', () => {
    const query = input.value.toLowerCase().trim();
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.getAttribute('data-name') || '';
      const desc = card.getAttribute('data-description') || '';
      const matches = !query || name.includes(query) || desc.includes(query);
      (card as HTMLElement).style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    if (noResults) {
      noResults.classList.toggle('hidden', visibleCount > 0);
    }
    if (countEl) {
      countEl.textContent = String(visibleCount);
    }
  });
}
