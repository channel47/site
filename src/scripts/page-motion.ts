/**
 * Page Motion — shared scroll reveals, hero sequence, and glitch effect.
 *
 * Used by index.astro and plugins.astro. Each page calls `initPageMotion`
 * with an optional callback for page-specific observers.
 */

const GLITCH_OFFSETS = [
  { x: -3, y: 1 },
  { x: 2, y: -1 },
  { x: -1, y: 2 },
  { x: 1, y: -1 },
  { x: 0, y: 0 },
];

const GLITCH_DURATION_MS = 160;
const GLITCH_FRAME_MS = 35;
const HERO_GLITCH_DELAY_MS = 1100;
const HOVER_COOLDOWN_MS = 500;

/**
 * Runs a short positional-jitter glitch on the given element.
 * Adds/removes the `glitching` class for CSS hooks.
 */
export function triggerGlitch(el: HTMLElement): void {
  let start: number | null = null;

  function step(ts: number): void {
    if (!start) start = ts;
    const elapsed = ts - start;

    if (elapsed > GLITCH_DURATION_MS) {
      el.style.transform = 'translate(0, 0)';
      el.classList.remove('glitching');
      return;
    }

    const frame = GLITCH_OFFSETS[Math.floor(elapsed / GLITCH_FRAME_MS) % GLITCH_OFFSETS.length];
    el.style.transform = `translate(${frame.x}px, ${frame.y}px)`;
    el.classList.add('glitching');
    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

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
 * Bootstraps the hero entrance sequence, section scroll reveals,
 * headline auto-glitch, and headline hover-glitch.
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

    const headline = document.getElementById('hero-headline');
    if (headline) {
      let glitched = false;
      setTimeout(() => {
        if (glitched) return;
        glitched = true;
        triggerGlitch(headline);
      }, HERO_GLITCH_DELAY_MS);
    }
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

  // Hover glitch on headline
  const headline = document.getElementById('hero-headline');
  if (headline) {
    let cooldown = false;
    headline.addEventListener('mouseenter', () => {
      if (cooldown) return;
      cooldown = true;
      triggerGlitch(headline);
      setTimeout(() => { cooldown = false; }, HOVER_COOLDOWN_MS);
    });
  }

  options.onReady?.();
}
