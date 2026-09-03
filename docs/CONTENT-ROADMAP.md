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
- `engagement-rate-explained.md` (2026-08-27) — engagement rate formula,
  benchmarks by follower tier, and the signs a high number is bought rather
  than earned. Was "Next six" item 1.
- `seeding-vs-paid-influencer-marketing.md` (2026-08-24) — decision
  framework for gifting product vs. paying a fee, with worked numbers. Was
  "Next six" item 2.
- `influencer-marketing-agency-vs-marketplace-toronto.md` (2026-08-31,
  merge pending as of this note — see PR #21) — comparison content for
  "influencer marketing Toronto" (bucket (a), previously not any post's
  `target_query`): what a full-service agency does vs. a marketplace, what
  each costs, and how to decide. Picked from GSC/architecture review rather
  than the queued list below, since every named "Next six" spoke either
  needed a source we didn't have yet (TikTok rates) or would have
  substantially repeated a published section (briefing). `influencers-in-toronto.md`
  got a reciprocal linking section.
- `measure-influencer-campaign-without-fake-attribution.md` (2026-09-03) —
  what a tracked click, a creator's self-reported reach, and a
  brand-verified order each actually prove; how to set up per-creator
  tracking before a campaign starts; ties to the real traced-link/promo-code/
  ROAS product mechanic and the recap's "n/a, never a fake zero" honesty
  law. Was "Next six" item 5, promoted ahead of items 3-4 (see below) because
  pillar 2's existing measurement section was thin enough to be a real gap,
  and it needed no unavailable source. `how-to-do-influencer-marketing.md`
  got a reciprocal linking sentence in its "Measure what you can actually
  prove" section.

## Next four, in priority order (updated 2026-09-03)

All three pillars and five of six originally queued spokes are now built
(items 1, 2, and 5 above; items 3 and 4 held back, reasons below). Pull the
next unwritten one each run rather than re-deriving priority from scratch;
re-order here if something jumps the queue (a GSC gap, a founder ask)
instead of just picking a different one.

1. **"Instagram vs TikTok for Toronto creator campaigns: where to put your
   budget first."** New comparison angle, still held back: if it touches
   TikTok rates specifically, it needs a real citable source first, same bar
   the app repo's fee tooling holds itself to (`lib/deliverables.ts`:
   "adding a deliverable type means finding the published benchmark first").
   Don't publish a TikTok number without one. A future run should spend a
   few minutes web-searching for a citable TikTok Canada/Toronto rate
   source before defaulting to skipping this again.
2. **"How to brief a creator so the content doesn't miss."** Checklist for
   the step after hiring, before filming. Pillar 2 touches influencer briefs
   briefly (a full paragraph, "Brief the creator. Don't script them.") and
   pillar 3 covers UGC briefs in comparable depth already; a new spoke here
   needs a genuinely deeper angle (before/during/after checklist, common
   mistakes with real examples) or it will substantially repeat those two
   sections. Check both again before writing.
3. **"Creator marketing KPIs: what to track beyond likes and follower
   count."** About picking goals before a campaign, distinct from the
   just-published measurement spoke (which is about what a number proves
   *after* a campaign runs). Some overlap risk with the new
   `measure-influencer-campaign-without-fake-attribution.md` "what worked"
   framing; if written, keep this one about goal-setting and success
   criteria, and link to the measurement post rather than repeating its
   three-layer breakdown.
4. New GSC-driven or founder-requested topics as they surface. Query volume
   is still thin (see `docs/GSC-LOG.md`); once real gaps appear, let them
   override this list instead of continuing to guess.

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
