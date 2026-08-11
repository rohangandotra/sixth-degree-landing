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

  // Waitlist: submit to /api/waitlist (sends the role-specific welcome email).
  // On any failure, fall back to the form's native FormSubmit action so the
  // signup is never lost. form.submit() skips this listener, so no loop.
  const waitlistForm = document.querySelector('.waitlist');
  if (waitlistForm) {
    // Role-specific fields: creators give a platform + handle, brands a website.
    // disabled and hidden always move together (see the note in index.html);
    // disabled also keeps the inactive fields out of the FormSubmit fallback.
    const roleSelect = waitlistForm.elements.role;
    const extras = waitlistForm.querySelectorAll('[data-for]');
    const syncExtras = () => {
      extras.forEach((el) => {
        const active = el.dataset.for === roleSelect.value;
        el.disabled = !active;
        el.hidden = !active;
      });
    };
    roleSelect.addEventListener('change', syncExtras);
    syncExtras();

    // Pasting a profile link tells us the platform; keep the picker in sync.
    const handleInput = waitlistForm.elements.handle;
    const platformSelect = waitlistForm.elements.platform;
    handleInput.addEventListener('input', () => {
      const v = handleInput.value.toLowerCase();
      if (v.includes('instagram.com/')) platformSelect.value = 'instagram';
      else if (v.includes('tiktok.com/')) platformSelect.value = 'tiktok';
    });

    // Role-carrying CTAs: any link with data-join-role preselects the role
    // before the browser's own anchor scroll to #contact, so the form never
    // asks a question the visitor already answered. No preventDefault - the
    // native jump (and the URL hash) still work with JS disabled.
    document.querySelectorAll('[data-join-role]').forEach((cta) => {
      cta.addEventListener('click', () => {
        const role = cta.dataset.joinRole;
        if (role !== 'brand' && role !== 'creator') return;
        roleSelect.value = role;
        syncExtras();
      });
    });

    // Sticky mobile CTA: visible after the hero scrolls away, hidden while
    // the signup section is on screen (it points there; showing both is
    // noise). CSS keeps it display:none above the phone breakpoint.
    const stickyJoin = document.getElementById('sticky-join');
    const hero = document.querySelector('.hero');
    const ctaSection = document.getElementById('contact');
    if (stickyJoin && hero && ctaSection && 'IntersectionObserver' in window) {
      let heroGone = false;
      let formVisible = false;
      const applyStickyState = () => {
        stickyJoin.hidden = !(heroGone && !formVisible);
      };
      new IntersectionObserver(([entry]) => {
        heroGone = !entry.isIntersecting;
        applyStickyState();
      }).observe(hero);
      new IntersectionObserver(([entry]) => {
        formVisible = entry.isIntersecting;
        applyStickyState();
      }).observe(ctaSection);
    }

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
            email: waitlistForm.email.value.trim(),
            role: waitlistForm.role.value,
            platform: roleSelect.value === 'creator' ? platformSelect.value : undefined,
            handle: roleSelect.value === 'creator' ? handleInput.value.trim() : undefined,
            website: roleSelect.value === 'brand' ? waitlistForm.elements.website.value.trim() : undefined,
            _honey: waitlistForm._honey.value
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
