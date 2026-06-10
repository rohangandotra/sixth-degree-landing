# Part 7: Acceptance Criteria Verification

## Desktop (1280px+) — All Features Active
- [ ] **Hero entrance**: Badge → Headline → Sub → CTAs rise in sequence on page load
- [ ] **Constellation**: SVG lines draw themselves over ~2s, dots pulse subtly
- [ ] **Scroll reveals**: Sections/cards fade up + rise when entering viewport
  - [ ] Platform Overview section header and tab-cards reveal on scroll
  - [ ] "For Brands" split layout: intro column and feature rows stagger reveal
  - [ ] "For Creators" split layout (flipped): intro and features reveal with stagger
  - [ ] "Why Sixth Degree" 4-card grid: cards stagger reveal ~90ms apart
  - [ ] Founder note: fades in on scroll
  - [ ] Contact cards: stagger reveal
- [ ] **Reveals are one-time**: Scroll back up → no re-animation (cards stay visible)
- [ ] **Marquee**: Niche text scrolls continuously with no visible seam, fades at edges
- [ ] **Nav scroll state**: Header gains shadow + background darkens after 24px scroll
- [ ] **Nav link underlines**: Teal underline animates in on hover (left-to-right)
- [ ] **Button arrows**: "→" slides right 4px on hover
- [ ] **Icon fill on hover**: Card/feature-row icons fill with teal on hover
- [ ] **Logos**: Nav and footer show "Sixth Degree°" with teal degree symbol
- [ ] **Section numbers**: 01°-05° visible above section headlines
- [ ] **Grain texture**: Subtle noise on dark sections (hero, bridge-cta, cta-section, section--dark)
- [ ] **Anchor links**: Links scroll to correct position below sticky nav (88px offset)
- [ ] **Tabs work**: Click tabs → panels switch with smooth fade animation
- [ ] **Selection color**: Highlight text → teal background with dark text

## Tablet (768px)
- [ ] Hero elements still animate on load
- [ ] Section reveals still work
- [ ] Split sections stack: intro on top, features below
- [ ] Sticky intro disabled (no position: sticky)
- [ ] split--flip order correctly reversed (intro still top)
- [ ] Marquee still works, fades at edges
- [ ] No horizontal scroll

## Mobile (375px)
- [ ] All animations still work (no prefers-reduced-motion set)
- [ ] Hero fits without overflow
- [ ] Split layouts fully stacked
- [ ] Marquee still scrolls
- [ ] Buttons full width with proper tap targets
- [ ] No horizontal scroll anywhere
- [ ] Tabs mobile layout works

## Reduced Motion (System Settings → Accessibility → Display)
- [ ] **ZERO animation**: All content visible immediately on load
- [ ] **No scroll reveals**: All elements visible instantly
- [ ] **No constellation animation**: SVG lines visible, not drawing
- [ ] **No marquee animation**: Niche text static (first instance visible)
- [ ] **No button/hover animations**: Instant state changes
- [ ] **No nav scroll shadow**: Static throughout
- [ ] **Content is readable and functional** (no layout breaks without motion)

## Performance (Lighthouse on Mobile)
- [ ] Lighthouse score ≥ 90 (animations are transform/opacity-only, should pass)
- [ ] No layout shift during animations
- [ ] No janky scrolling (IntersectionObserver is non-blocking)

## Cross-Check
- [ ] Emails unchanged: aaryanjuneja@gmail.com, ro.gandotra@gmail.com
- [ ] No 404s in console
- [ ] No console errors
- [ ] animations.js loads (check Network tab)
- [ ] Footer wordmark visible ("Sixth Degree°" in ghosted gray)

---

## Notes for manual testing

**To test Reduce Motion:**
1. macOS: System Settings → Accessibility → Display → toggle Reduce motion
2. Refresh the page
3. Verify ALL animation is gone, content fully visible

**To test mobile viewport:**
1. Open DevTools (F12 on Windows/Linux, Cmd+Option+I on Mac)
2. Toggle device toolbar (Ctrl+Shift+M / Cmd+Shift+M)
3. Set to iPhone 12 (375px) and verify layout
4. Test same on iPad (768px)

**To test Lighthouse:**
1. Open DevTools
2. Lighthouse tab → Mobile → Analyze
3. Check Performance score

**To test animations:**
1. Open page fresh
2. Watch hero (should rise in sequence)
3. Scroll slowly past hero → watch constellation
4. Scroll through sections → watch reveals
5. Scroll back up → cards should NOT re-animate
6. Hover buttons → arrows should slide
7. Hover cards → icons should fill teal
8. Hover nav links → underlines should animate

---

## Sign-off

Date verified: _________
Verified by: _________

All 10 criteria met: ✓ or ✗
