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

  // Brand waitlist: submit to /api/waitlist (stores the lead, sends the brand
  // welcome email). Creators no longer use this form: they sign up in the app.
  // On any failure, fall back to the form's native FormSubmit action so the
  // signup is never lost. form.submit() skips this listener, so no loop.
  const waitlistForm = document.querySelector('.waitlist');
  if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = waitlistForm.querySelector('button[type="submit"]');
      const label = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Joining…';
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: waitlistForm.elements.email.value.trim(),
            role: 'brand',
            website: waitlistForm.elements.website.value.trim(),
            _honey: waitlistForm.elements._honey.value
          })
        });
        if (!res.ok) throw new Error('waitlist api ' + res.status);
        const thanks = document.getElementById('waitlist-thanks');
        if (thanks) thanks.hidden = false;
        waitlistForm.style.display = 'none';
      } catch (err) {
        btn.disabled = false;
        btn.textContent = label;
        waitlistForm.submit();
      }
    });
  }

  // Hero film: the button plays it with sound and hands over to native
  // controls. Nothing loads until this click (preload="none").
  const film = document.querySelector('.film');
  if (film) {
    const video = film.querySelector('video');
    const play = film.querySelector('.film__play');
    // The markup carries native controls for no-JS visitors; with JS the
    // poster button takes over until the first click.
    video.controls = false;
    play.addEventListener('click', () => {
      film.classList.add('is-playing');
      video.controls = true;
      const p = video.play();
      if (p && p.catch) p.catch(() => {}); // native controls remain if play is refused
      video.focus();
    });
  }

  // Sticky mobile CTA: visible after the hero scrolls away, hidden while the
  // get-started section is on screen (it points there; showing both is
  // noise). CSS keeps it display:none above the phone breakpoint.
  const stickyJoin = document.getElementById('sticky-join');
  const hero = document.querySelector('.hero');
  const ctaSection = document.getElementById('contact');
  if (stickyJoin && hero && ctaSection && 'IntersectionObserver' in window) {
    let heroGone = false;
    let ctaVisible = false;
    const applyStickyState = () => {
      stickyJoin.hidden = !(heroGone && !ctaVisible);
    };
    new IntersectionObserver(([entry]) => {
      heroGone = !entry.isIntersecting;
      applyStickyState();
    }).observe(hero);
    // "Reached" = on screen OR already scrolled past (top above the fold), so
    // the button stays hidden over the footer too.
    new IntersectionObserver(([entry]) => {
      ctaVisible = entry.isIntersecting || entry.boundingClientRect.top < 0;
      applyStickyState();
    }).observe(ctaSection);
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
