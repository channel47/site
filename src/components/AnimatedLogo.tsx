'use client';

import { useRef, useEffect, useCallback } from 'react';

const GLYPHS = ['█','▓','▒','░','▀','▄','▌','▐','■','□','▪','▫','◼','◻','▰','▱'];
const LINES = ['█ █ ▀▀█', '▀▀█  █'];

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

export default function AnimatedLogo({ delay = 0 }: { delay?: number }) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const replayingRef = useRef(false);

  const animate = useCallback((isReplay = false) => {
    const root = rootRef.current;
    if (!root) return;

    const chars = root.querySelectorAll<HTMLSpanElement>('.logo-animated__char');
    const targets: string[] = [];
    chars.forEach(c => targets.push(c.dataset.char || ' '));

    const locked = new Array(chars.length).fill(false);

    // Reset state
    root.classList.remove('is-complete');
    root.classList.add('is-animating');
    if (!isReplay) {
      chars.forEach(c => c.classList.remove('is-locked'));
    } else {
      locked.fill(false);
      chars.forEach(c => c.classList.remove('is-locked'));
    }

    // Scramble non-space chars
    chars.forEach((c, i) => {
      if (targets[i] !== ' ') c.textContent = randomGlyph();
    });

    // Continuous scramble
    const scrambleInterval = window.setInterval(() => {
      chars.forEach((c, i) => {
        if (!locked[i] && targets[i] !== ' ') {
          c.textContent = randomGlyph();
        }
      });
    }, 50);

    // Lock characters with eased stagger
    const nonSpaceIndices = targets
      .map((ch, i) => (ch !== ' ' ? i : -1))
      .filter(i => i !== -1)
      .sort(() => Math.random() - 0.5);

    const duration = isReplay ? 400 : 800;
    const baseDelay = isReplay ? 100 : 300;
    const timeouts: number[] = [];

    nonSpaceIndices.forEach((charIdx, order) => {
      const progress = order / nonSpaceIndices.length;
      const eased = 1 - Math.pow(1 - progress, 2);
      const t = window.setTimeout(() => {
        locked[charIdx] = true;
        const el = chars[charIdx];
        el.textContent = targets[charIdx];
        el.classList.add('is-locked');
        el.classList.add('is-flashing');
        setTimeout(() => el.classList.remove('is-flashing'), 100);

        // Last char — complete
        if (order === nonSpaceIndices.length - 1) {
          setTimeout(() => {
            clearInterval(scrambleInterval);
            root.classList.add('is-complete');
            replayingRef.current = false;
          }, 150);
        }
      }, baseDelay + eased * duration);
      timeouts.push(t);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(scrambleInterval);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      root.classList.add('is-complete');
      root.querySelectorAll<HTMLSpanElement>('.logo-animated__char').forEach(c => {
        c.classList.add('is-locked');
      });
      return;
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            setTimeout(() => animate(false), delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [animate, delay]);

  const handleMouseEnter = useCallback(() => {
    if (
      !startedRef.current ||
      replayingRef.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) return;
    replayingRef.current = true;
    animate(true);
  }, [animate]);

  return (
    <span
      ref={rootRef}
      className="logo-animated"
      role="img"
      aria-label="Channel47 Logo"
      onMouseEnter={handleMouseEnter}
    >
      <span className="logo-animated__glyph" aria-hidden="true">
        {LINES.map((line, lineIdx) => (
          <span key={lineIdx} className="logo-animated__line" data-target={line}>
            {line.split('').map((ch, charIdx) => (
              <span
                key={charIdx}
                className="logo-animated__char"
                data-char={ch}
              >
                {ch === ' ' ? ' ' : randomGlyph()}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
