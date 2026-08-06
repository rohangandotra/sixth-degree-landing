# Blog content roadmap

Standing backlog for the twice-weekly SEO content routine (Monday + Thursday,
one substantial piece per run). Update this file in the same PR whenever a
piece ships or a new idea gets added, so the next run doesn't have to
reconstruct it from memory or the scheduled-prompt text alone.

Architecture is hub-and-spoke. See AGENTS.md / the SEO routine prompt for the
full keyword targets and article standards (byline alternation, word count,
no em dashes, honesty/beta-framing constraints, etc). This file just tracks
what's built and what's next.

## Pillars (brand-side, priority order)

1. **"Influencers in Toronto" local hub** — targets "influencers in Toronto,"
   "Toronto influencers," "hire influencers Toronto," "influencer marketing
   Toronto," plus near-me intent. **Published 2026-08-06**:
   `content/posts/influencers-in-toronto.md`. Links out to cost/vetting/tier
   detail rather than repeating it, so it doesn't cannibalize the three posts
   below.
2. **"How to do influencer marketing" complete small-brand guide** — targets
   the educational head terms (c). Not started.
3. **"How to do creator marketing / UGC" guide** — targets (c). Not started.

## Spokes (published)

- `micro-vs-nano-creators.md` (2026-07-27) — tier comparison, $1,000 worked example.
- `toronto-creator-rates.md` (2026-07-28) — rate table, two worked budgets.
- `find-micro-influencers-ugc-toronto.md` (2026-08-04) — where to search,
  vetting checklist, writing an opener. **Owns the "where to find creators"
  content** — the pillar above and any future piece should link here rather
  than re-describe the search methods; that overlap was caught and fixed in
  the 2026-08-06 run (see PR history on `claude/seo-content-drafts`).

## Spokes (backlog, unordered except where noted)

- **Creator-side: "How to get brand deals with 1,000 to 10,000 followers in
  Canada."** Added to the backlog 2026-08-06 at the founder's request — we've
  only written brand-side content so far, and a creator searching "how do I
  get brand deals" should find us too. **Not top priority**, queue it behind
  whichever pillar is next, but pick it up before adding more brand-side
  spokes so the content isn't one-sided.
- "What is an ad rights rider? UGC usage rights, explained" — links the
  actual Ad Rights Rider document.
- Engagement-rate definitional post.
- Seeding-vs-paid definitional post.
- GSC-driven topics — once there's real query volume, let query gaps drive
  the next spoke instead of guessing.

## Before writing anything new

Check this file, re-read every published post, and check GSC data. If a new
piece's "how-to" section would substantially repeat a section that already
exists in a published post, don't repeat it: cut to a pointer + link, the way
the pillar links to the find-influencers post instead of re-listing its
methods.
