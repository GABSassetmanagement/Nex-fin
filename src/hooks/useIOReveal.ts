import { useEffect } from 'react';

/**
 * Hook that observes elements with the 'io-reveal' class
 * and adds the 'io-revealed' class when they enter the viewport.
 */
export function useIOReveal(selector = '.io-reveal', options?: IntersectionObserverInit) {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('io-revealed');
            // Unobserve once revealed for peak performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
        ...options,
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [selector, options]);
}
