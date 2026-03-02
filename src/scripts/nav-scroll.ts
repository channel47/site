/**
 * Nav Scroll — hide on scroll down, show on scroll up.
 * Always visible at top. Passive listener for performance.
 * 10px threshold to avoid trackpad jitter.
 */

export function initNavScroll(): void {
  const nav = document.querySelector('[data-nav]') as HTMLElement | null;
  if (!nav) return;

  let lastY = window.scrollY;
  const jitterThreshold = 10;

  function onScroll() {
    const currentY = window.scrollY;
    const delta = currentY - lastY;

    // Keep nav visible while mobile menu is open
    if (nav.hasAttribute('data-menu-open')) return;

    // Always show at top
    if (currentY <= 0) {
      nav.classList.remove('nav--hidden');
      lastY = currentY;
      return;
    }

    // Ignore jitter
    if (Math.abs(delta) < jitterThreshold) return;

    if (delta > 0) {
      // Scrolling down — hide
      nav.classList.add('nav--hidden');
    } else {
      // Scrolling up — show
      nav.classList.remove('nav--hidden');
    }

    lastY = currentY;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
}
