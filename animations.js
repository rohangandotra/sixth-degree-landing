// Scroll-reveal: elements with .reveal fade+rise in when they enter the viewport.
// Children of .reveal-group stagger via --d custom property.
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target); // animate once, never re-hide
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // Stagger: set --d on children of any .reveal-group
  document.querySelectorAll('.reveal-group').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--d', (i * 90) + 'ms');
    });
  });

  // Nav: add .is-scrolled after 24px for shadow/contrast shift
  const header = document.querySelector('.header');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();
