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
   the educational head terms (c). **Published 2026-08-10**:
   `content/posts/how-to-do-influencer-marketing.md`. Generic (not
   Toronto-only) step-by-step: goal-before-budget, tier, finding creators,
   briefing, usage rights, escrow, measurement. Links out to the tier/rate/
   find posts and to the Toronto pillar rather than repeating them; the
   Toronto pillar now links back to it (two-way pillar-to-pillar link).
3. **"How to do creator marketing / UGC" guide** — targets (c). **Published
   2026-08-13**: `content/posts/how-to-do-creator-marketing-ugc.md`. Defines
   creator marketing/UGC against influencer marketing (content vs. reach),
   then covers what's actually different about it: hiring isn't by follower
   count, briefs are detailed rather than loose (opposite of pillar 2's
   advice, deliberately, since it's a different product), usage rights are
   the core of the transaction rather than an add-on, and buying happens in
   batches for testing rather than as one hero post. Links out to pillar 2,
   the find-creators spoke, and the rates post rather than repeating their
   content; pillar 2 and the find-creators spoke both got a linking sentence
   back to it (two-way pillar-to-pillar links, same pattern as pillar 2's
   launch).

All three brand-side pillars are now published.

## Spokes (published)

- `micro-vs-nano-creators.md` (2026-07-27) — tier comparison, $1,000 worked example.
- `toronto-creator-rates.md` (2026-07-28) — rate table, two worked budgets.
- `find-micro-influencers-ugc-toronto.md` (2026-08-04) — where to search,
  vetting checklist, writing an opener. **Owns the "where to find creators"
  content** — the pillar above and any future piece should link here rather
  than re-describe the search methods; that overlap was caught and fixed in
  the 2026-08-06 run (see PR history on `claude/seo-content-drafts`).
- `brand-deals-1000-10000-followers-canada.md` (2026-08-17) — creator-side:
  what to charge and how to pitch brands at 1,000 to 10,000 followers.
- `ad-rights-rider-ugc-usage-rights.md` (2026-08-20) — what an ad rights
  rider is, what organic usage covers by default vs. what a paid-usage
  agreement needs to cover, and how Sixth Degree's own rider works. Pillar 2,
  pillar 3, and `toronto-creator-rates.md` all got a linking sentence back to
  it in the same run (they already referenced the Ad Rights Rider document
  directly; this spoke is the explainer those mentions were missing).

## Next six, in priority order (set 2026-08-20, spoke #2 published)

All three pillars and the first two queued spokes are built. Pull the next
unwritten one each run rather than re-deriving priority from scratch;
re-order here if something jumps the queue (a GSC gap, a founder ask)
instead of just picking a different one.

1. **"What's a good engagement rate for nano and micro creators in
   Toronto?"** Definitional; the ranges currently only appear in passing
   inside `micro-vs-nano-creators.md`.
2. **"Seeding vs paid: when to give product instead of paying a creator."**
   Decision framework, distinct from the rate/tier posts.
3. **"Instagram vs TikTok for Toronto creator campaigns: where to put your
   budget first."** New comparison angle. Caveat: if it touches TikTok
   rates specifically, it needs a real citable source first, same bar the
   app repo's fee tooling holds itself to (`lib/deliverables.ts`: "adding a
   deliverable type means finding the published benchmark first"). Don't
   publish a TikTok number without one.
4. **"How to brief a creator so the content doesn't miss."** Checklist for
   the step after hiring, before filming. Pillar 2 touches influencer briefs
   briefly and pillar 3 now covers UGC briefs in some depth; this spoke
   should go deeper on the influencer side specifically rather than repeat
   either.
5. **"How to measure a Toronto influencer campaign without fake
   attribution."** Ties to the real traced-links/promo-code/ROAS feature;
   reinforces the honesty positioning. Pillar 2 also touches measurement
   briefly; this spoke owns the depth.
6. **"Creator marketing KPIs: what to track beyond likes and follower
   count."** Pairs with #5 but is about picking goals before a campaign,
   not measuring results after.

Once there's real GSC query volume, let actual gaps override this ordering
instead of continuing to guess.

## Near-me: landing page, not a blog post

"Creators near me" / "influencers near me" resolve by the searcher's own
location, not a typed city name — no blog post wins that search on its own
the way it can for a typed query like "Toronto influencers." What actually
ranks for near-me intent is a page Google can match to a physical service
area: consistent NAP-style signals (name, Toronto address/area, phone if we
have one) on a dedicated page, plus a Google Business Profile (a founder
action, never create the account from a session). A blog post can support
that page with internal links, but shouldn't try to be it. Proposing a
dedicated `/toronto` or `/near-me` style landing page as a repo structure
change is a founder call, not something to build inside the blog content
pipeline.

## Before writing anything new

Check this file, re-read every published post, and check GSC data. If a new
piece's "how-to" section would substantially repeat a section that already
exists in a published post, don't repeat it: cut to a pointer + link, the way
the pillar links to the find-influencers post instead of re-listing its
methods.
