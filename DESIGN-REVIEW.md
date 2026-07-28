# Sixth Degree — Design Review & Implementation Spec

**Purpose:** This document is a complete design review of the current landing page plus a precise implementation spec. It is written so a developer (or a smaller AI model) can implement it without making design judgment calls. Implement in priority order: P0 → P1 → P2.

**Locked decisions (do not change):**
- Fonts: Playfair Display (headlines) + Inter (body)
- Colors: deep teal `#1c302e` dark sections, cream `#faf8f5`/`#f4efe9` light sections, teal accent `#0D9488`, mint `#5eead4`
- No fake stats, no fake logos, no fake testimonials (pre-launch honesty)
- No JS frameworks. Vanilla HTML/CSS/JS only. One new file: `animations.js`

---

## Part 1: Diagnosis — why it currently reads as "made by AI"

These are the specific tells, in order of impact:

1. **Zero motion.** Everything is visible at once on load. Premium sites reveal content as you scroll — it signals craft because someone had to decide the order and rhythm.
2. **Perfect symmetry everywhere.** Every section is centered. Every grid is uniform. Humans break symmetry deliberately; templates never do.
3. **Repeating section formula.** Headline → 3 identical cards → headline → 3 identical cards → headline → 4 identical cards. The icon-in-rounded-square card grid is the single most template pattern on the internet.
4. **The brand concept is unused.** The name "Sixth Degree" references six degrees of separation — connection, networks, "everyone is six introductions away." Nothing on the page expresses this. This is the biggest missed opportunity: a real designer would build the whole visual identity around it.
5. **No texture or depth.** Flat solid colors throughout. Premium dark sections almost always carry subtle grain/noise.
6. **No editorial moments.** No section numbers, no pull quotes, no oversized typography, no founder voice. The page has information but no point of view.

Research backs this up: what distinguishes handcrafted pages in 2026 is deliberate visual hierarchy, meaningful motion/micro-interactions, expressive serif typography, and genuine human elements like founder notes — versus the static, symmetric, card-grid output of templates ([Figma trends](https://www.figma.com/resource-library/web-design-trends/), [Moburst](https://www.moburst.com/blog/landing-page-design-trends-2026/), [SaaSFrame](https://www.saasframe.io/blog/10-saas-landing-page-trends-for-2026-with-real-examples)).

---

## Part 2: P0 — Scroll-reveal animation system

**The single highest-impact change.** Add one small JS file and a CSS block.

### 2.1 Create `animations.js`

```js
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
```

Load it at the end of `<body>`: `<script src="animations.js" defer></script>`

### 2.2 Add to `styles.css`

```css
/* ===== SCROLL REVEAL ===== */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) var(--d, 0ms);
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .reveal { opacity: 1; transform: none; transition: none; }
}

/* Nav scroll state */
.header { transition: box-shadow 0.3s ease, background 0.3s ease; }
.header.is-scrolled {
  background: rgba(20, 34, 32, 0.98);
  box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.25);
}
```

### 2.3 Apply the classes in `index.html`

- Add `reveal` to: every `.section__header`, every `.tab-card`, `.bridge__text`, `.bridge-cta__headline` and its button, `.cta-section__headline`, `.cta-section__sub`, `.contact-cards`, `.cta-section__note`.
- Add `reveal-group` to every `.cards` container AND add `reveal` to each `.card` inside (the group sets stagger delays on the cards).
- Add `reveal-group` to `.contact-cards` and `reveal` to each `.contact-card`.
- Do NOT add reveal to the nav or footer.

### 2.4 Hero entrance sequence (on load, not scroll)

```css
/* Hero entrance — plays once on page load */
@keyframes heroRise {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero__badge,
.hero__headline,
.hero__sub,
.hero__ctas {
  animation: heroRise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
}

.hero__badge    { animation-delay: 0.1s; }
.hero__headline { animation-delay: 0.25s; }
.hero__sub      { animation-delay: 0.4s; }
.hero__ctas     { animation-delay: 0.55s; }

@media (prefers-reduced-motion: reduce) {
  .hero__badge, .hero__headline, .hero__sub, .hero__ctas { animation: none; }
}
```

**Animation rules (apply to all motion on this page):**
- Animate ONLY `transform` and `opacity` (GPU-accelerated; anything else janks).
- Every animation must respect `prefers-reduced-motion` (WCAG 2.1 requirement).
- Reveal once; never re-hide on scroll-up. Re-animating feels gimmicky.
- Nothing longer than 0.8s; stagger steps ≤ 90ms. Subtle = premium, big = cheap.

---

## Part 3: P0 — The "six degrees" brand moment (constellation motif)

This is what makes the site feel like it belongs to *this company* and no other.

### 3.1 Hero constellation

Add a decorative SVG inside `.hero` (absolutely positioned, behind text): **six small dots connected by thin lines** — a constellation of six nodes representing six degrees of connection. Lines draw themselves on page load using stroke-dashoffset animation.

```html
<!-- Inside .hero, before .container -->
<svg class="hero__constellation" viewBox="0 0 1200 600" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
  <g class="constellation__lines" stroke="rgba(94,234,212,0.18)" stroke-width="1" fill="none">
    <path d="M150 120 L340 220" />
    <path d="M340 220 L520 140" />
    <path d="M520 140 L760 250" />
    <path d="M760 250 L950 160" />
    <path d="M950 160 L1080 300" />
  </g>
  <g class="constellation__dots" fill="#5eead4">
    <circle cx="150" cy="120" r="3" opacity="0.5"/>
    <circle cx="340" cy="220" r="2.5" opacity="0.4"/>
    <circle cx="520" cy="140" r="3.5" opacity="0.6"/>
    <circle cx="760" cy="250" r="2.5" opacity="0.4"/>
    <circle cx="950" cy="160" r="3" opacity="0.5"/>
    <circle cx="1080" cy="300" r="2.5" opacity="0.4"/>
  </g>
</svg>
```

```css
.hero__constellation {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.constellation__lines path {
  stroke-dasharray: 400;
  stroke-dashoffset: 400;
  animation: drawLine 2.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

.constellation__lines path:nth-child(1) { animation-delay: 0.6s; }
.constellation__lines path:nth-child(2) { animation-delay: 0.9s; }
.constellation__lines path:nth-child(3) { animation-delay: 1.2s; }
.constellation__lines path:nth-child(4) { animation-delay: 1.5s; }
.constellation__lines path:nth-child(5) { animation-delay: 1.8s; }

@keyframes drawLine { to { stroke-dashoffset: 0; } }

.constellation__dots circle {
  animation: dotPulse 4s ease-in-out infinite;
}
.constellation__dots circle:nth-child(odd) { animation-delay: 2s; }

@keyframes dotPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.7; }
}

@media (prefers-reduced-motion: reduce) {
  .constellation__lines path { animation: none; stroke-dashoffset: 0; }
  .constellation__dots circle { animation: none; }
}
```

### 3.2 Degree symbol as brand mark

- Nav logo and footer logo become: `Sixth Degree<span class="logo-degree">°</span>` with `.logo-degree { color: #5eead4; }` (teal in nav, accent color in footer).
- Section dividers: replace nothing structural, but the numbered section labels (3.3) end with `°`.

### 3.3 Editorial section numbers

Above each major section headline, add a small numbered label — an editorial pattern templates never use:

```html
<span class="section__number">01°</span>
<h2 class="section__headline">…</h2>
```

```css
.section__number {
  display: block;
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 0.95rem;
  color: #0D9488;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}
.section--dark .section__number { color: #5eead4; }
```

Numbering: Platform Overview = `01°`, For Brands = `02°`, For Creators = `03°`, Why Sixth Degree = `04°`, Coming Soon = `05°`.

---

## Part 4: P1 — Kill the template rhythm (layout asymmetry)

### 4.1 Convert "For Brands" and "For Creators" to editorial split layouts

Replace the 3-identical-cards grid in BOTH sections with a two-column split — and **mirror the direction between the two sections** (brands: text left, features right; creators: features left, text right). This one change removes the strongest template tell.

```html
<!-- For Brands: headline column + feature rows -->
<div class="split">
  <div class="split__intro reveal">
    <span class="section__number">02°</span>
    <h2 class="section__headline">Built for brands that want <em>real results.</em></h2>
    <p class="split__lead">No more guessing which creators are real. No more DM chaos. No more inflated numbers.</p>
    <a href="#contact" class="btn btn--primary">Get in Touch</a>
  </div>
  <div class="split__features reveal-group">
    <div class="feature-row reveal">
      <div class="card__icon"><!-- existing SVG --></div>
      <div>
        <h3 class="card__title">Verified Creator Discovery</h3>
        <p class="card__desc">Search creators vetted for authentic engagement. Filter by niche, city, audience demographics.</p>
      </div>
    </div>
    <!-- repeat for the other 2 features -->
  </div>
</div>
```

```css
.split {
  display: grid;
  grid-template-columns: 5fr 6fr;
  gap: 80px;
  align-items: start;
}

.split--flip .split__intro { order: 2; }
.split--flip .split__features { order: 1; }

.split__intro { position: sticky; top: 120px; }
.split__intro .section__headline { text-align: left; }
.split__lead {
  font-size: 1.05rem;
  color: #7a8a87;
  line-height: 1.7;
  margin: 0 0 32px;
}

.split__features {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.feature-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 32px;
  background: #faf8f5;
  border: 1px solid rgba(28, 48, 46, 0.06);
  border-radius: 12px;
  transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), border-color 0.35s ease;
}

.feature-row:hover {
  transform: translateX(4px);
  border-color: rgba(13, 148, 136, 0.15);
}

.feature-row .card__icon { margin-bottom: 0; flex-shrink: 0; }

@media (max-width: 900px) {
  .split { grid-template-columns: 1fr; gap: 48px; }
  .split__intro { position: static; }
  .split--flip .split__intro { order: 1; }
  .split--flip .split__features { order: 2; }
}
```

For Creators uses `class="split split--flip"`. Remove `.section__header` from these two sections (the intro column replaces it). Keep the "Why Sixth Degree" 4-card grid as-is — one card grid on the page is fine; three was the problem. Note: `.feature-row:hover` uses `translateX` — for the flipped section this still reads fine; do not negate it.

### 4.2 Niche marquee (replaces nothing — insert between hero and bridge)

We have no client logos, but a scrolling text marquee of creator niches is honest, adds ambient motion, and is a signature premium pattern (Aspire uses the same mechanic for logos, with mask-fade edges):

```html
<div class="marquee" aria-hidden="true">
  <div class="marquee__track">
    <span>Fashion</span><span>°</span><span>Food</span><span>°</span><span>Fitness</span><span>°</span><span>Beauty</span><span>°</span><span>Travel</span><span>°</span><span>Tech</span><span>°</span><span>Lifestyle</span><span>°</span><span>Gaming</span><span>°</span>
    <!-- duplicate the full span sequence once more for seamless loop -->
  </div>
</div>
```

```css
.marquee {
  background: #142220;
  padding: 20px 0;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 10% 90%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 10% 90%, transparent);
}

.marquee__track {
  display: flex;
  gap: 40px;
  width: max-content;
  animation: marqueeScroll 30s linear infinite;
}

.marquee__track span {
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.35);
  white-space: nowrap;
}

.marquee__track span:nth-child(even) { color: rgba(94, 234, 212, 0.4); }

@keyframes marqueeScroll {
  to { transform: translateX(-50%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee__track { animation: none; }
}
```

The track content must be duplicated exactly once in the HTML so `translateX(-50%)` loops seamlessly.

### 4.3 Grain texture on dark sections

```css
.hero, .section--dark, .bridge-cta, .cta-section { position: relative; }

.hero::after, .section--dark::after, .bridge-cta::after, .cta-section::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
}
```

Note: `.hero` already uses `::before` for the radial glow — grain goes on `::after`. Ensure `.hero .container` keeps `position: relative` so text sits above both overlays. Same for content wrappers in the other dark sections (add `position: relative; z-index: 1;` to their `.container` if text appears under the grain).

---

## Part 5: P1 — Founder note (human voice section)

Pre-launch pages convert on trust, and the strongest honest trust signal we have is the founders themselves ([Flowjam](https://www.flowjam.com/blog/waitlist-landing-page-examples-10-high-converting-pre-launch-designs-how-to-build-yours), [Prelaunch](https://prelaunch.com/blog/pre-launch-landing-page)). Insert a short letter between "Why Sixth Degree" and the Coming Soon CTA:

```html
<section class="founder-note section--gray">
  <div class="container">
    <div class="founder-note__inner reveal">
      <span class="section__number">A note from us°</span>
      <p class="founder-note__text">We started Sixth Degree because we watched Canadian brands settle for US platforms that treated Toronto like a rounding error — and watched real creators lose deals to accounts with purchased followers. We think the people building culture here deserve infrastructure built here. We're early, we're honest about that, and we'd rather show you what we're building than tell you it's finished.</p>
      <p class="founder-note__sign">— Aaryan &amp; Rohan, Toronto</p>
    </div>
  </div>
</section>
```

```css
.founder-note { padding: 120px 0; background: #f4efe9; }

.founder-note__inner { max-width: 720px; margin: 0 auto; text-align: center; }

.founder-note__text {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.65;
  color: #1c302e;
  margin-bottom: 28px;
}

.founder-note__sign {
  font-size: 0.95rem;
  color: #7a8a87;
  letter-spacing: 0.04em;
}

@media (max-width: 768px) {
  .founder-note { padding: 80px 0; }
  .founder-note__text { font-size: 1.2rem; }
}
```

The founders should rewrite this copy in their own words before launch — the structure matters more than the exact sentences. Keep it under 80 words, signed, no buzzwords.

---

## Part 6: P2 — Micro-interaction polish

Small details that reward attention. All optional but cheap.

### 6.1 Animated link underlines (nav)

```css
.nav__links a {
  position: relative;
}

.nav__links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 1px;
  background: #5eead4;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.nav__links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

### 6.2 Button arrow slide

Add `<span class="btn__arrow">→</span>` inside primary CTAs ("Get in Touch" buttons only):

```css
.btn__arrow {
  display: inline-block;
  margin-left: 8px;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}
.btn:hover .btn__arrow { transform: translateX(4px); }
```

### 6.3 Icon color fill on card hover

```css
.card__icon, .feature-row .card__icon {
  transition: background 0.35s ease, color 0.35s ease;
}
.card:hover .card__icon,
.feature-row:hover .card__icon {
  background: #0D9488;
  color: #fff;
}
.section--dark .card:hover .card__icon {
  background: #0D9488;
  color: #fff;
}
```

### 6.4 Selection color

```css
::selection { background: rgba(13, 148, 136, 0.25); color: #1c302e; }
```

### 6.5 Footer wordmark moment

Above the existing footer row, add an oversized serif wordmark — a quiet, confident sign-off:

```html
<p class="footer__wordmark" aria-hidden="true">Sixth Degree°</p>
```

```css
.footer__wordmark {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(3rem, 9vw, 7rem);
  font-weight: 600;
  color: rgba(255, 255, 255, 0.06);
  text-align: center;
  line-height: 1;
  margin-bottom: 40px;
  user-select: none;
}
```

---

## Part 7: Implementation order & acceptance criteria

| # | Task | Priority | Touch |
|---|------|----------|-------|
| 1 | `animations.js` + reveal CSS + classes in HTML | P0 | all 3 files |
| 2 | Hero entrance sequence | P0 | styles.css |
| 3 | Hero constellation SVG | P0 | index.html, styles.css |
| 4 | Degree symbol in logos + section numbers | P0 | index.html, styles.css |
| 5 | Split layouts for Brands/Creators sections | P1 | index.html, styles.css |
| 6 | Niche marquee | P1 | index.html, styles.css |
| 7 | Grain texture on dark sections | P1 | styles.css |
| 8 | Founder note section | P1 | index.html, styles.css |
| 9 | Micro-interactions (6.1–6.5) | P2 | index.html, styles.css |

**Acceptance criteria — verify every one before pushing:**

1. Open the page fresh: hero elements rise in sequence (badge → headline → sub → CTAs); constellation lines draw over ~2s.
2. Scroll down slowly: every section header and card fades up exactly once; cards in a grid stagger left-to-right ~90ms apart; nothing re-animates when scrolling back up.
3. Enable "Reduce Motion" in macOS System Settings → Accessibility → Display: ALL content is fully visible with zero animation. This is non-negotiable.
4. Marquee loops with no visible seam and fades at both edges.
5. Mobile 375px: split sections stack (intro above features), sticky intro disabled, marquee still works, no horizontal scroll anywhere.
6. Tablet 768px and desktop 1280px: no layout breaks.
7. Tabs still work (CSS-only mechanism untouched).
8. Lighthouse performance ≥ 90 on mobile (animations are transform/opacity-only, so this should hold).
9. All anchor links still land correctly below the sticky nav.
10. Contact email is hello@sixthdegree.app everywhere.

**Explicitly do NOT:**
- Add a JS animation library (GSAP, AOS, Framer). Everything above is vanilla.
- Animate width/height/margin/top/left (causes layout thrash).
- Add parallax on text (hurts readability).
- Re-trigger reveals on scroll-up.
- Add fake numbers, fake logos, or fake testimonials anywhere.
