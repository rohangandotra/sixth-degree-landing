// Scroll-reveal: elements with .reveal fade+rise in when they enter the viewport.
// Children of .reveal-group stagger via --d custom property.
(function () {
  // Show waitlist confirmation after FormSubmit redirects back with ?joined=1
  if (new URLSearchParams(location.search).has('joined')) {
    const thanks = document.getElementById('waitlist-thanks');
    const form = document.querySelector('.waitlist');
    if (thanks) thanks.hidden = false;
    if (form) form.style.display = 'none';
  }

  // Mobile nav: hamburger toggles the menu (must run before the reduced-motion early return)
  const navToggle = document.querySelector('.nav__toggle');
  const nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('.nav__links a').forEach(a =>
      a.addEventListener('click', () => nav.classList.remove('is-open')));
  }

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
