/**
 * Page Motion — shared scroll reveals and hero entrance sequence.
 *
 * Used by index.astro. Each page calls `initPageMotion`
 * with an optional callback for page-specific observers.
 */

/**
 * Options bag for `initPageMotion`.
 *
 * @param onReady  Called after the core observers are set up (only when
 *                 motion is enabled). Use this to register page-specific
 *                 observers such as the roadmap sequential reveal.
 * @param reducedMotionExtras  Called when `prefers-reduced-motion: reduce`
 *                              is active so the page can force-show elements
 *                              that the shared code does not know about.
 */
export interface PageMotionOptions {
  onReady?: () => void;
  reducedMotionExtras?: () => void;
}

/**
 * Bootstraps the hero entrance sequence and section scroll reveals.
 */
export function initPageMotion(options: PageMotionOptions = {}): void {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced) {
    document.querySelectorAll('[data-section]').forEach(el => el.classList.add('is-visible'));
    options.reducedMotionExtras?.();
    return;
  }

  // Hero sequence choreography
  const hero = document.querySelector('[data-section="hero"]');
  if (hero) {
    hero.classList.add('is-visible');
  }

  // Scroll reveal for non-hero sections
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  );

  document.querySelectorAll('[data-section]:not([data-section="hero"])').forEach(el => {
    observer.observe(el);
  });

  options.onReady?.();
}
