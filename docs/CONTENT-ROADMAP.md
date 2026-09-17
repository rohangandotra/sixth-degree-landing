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
- `creator-marketing-kpis-what-to-track.md` (2026-09-07) — which KPI
  actually matches each of the three campaign goals from pillar 2 (reach for
  awareness, cost per click/sale for direct response, cost per usable asset
  for content), why follower growth and raw likes don't hold up as
  scorecards alone, and a worked cost-per-outcome comparison across three
  creators. Was "Next four" item 3, written as the goal-setting companion to
  the measurement spoke rather than a repeat of it: that post is about what
  a number proves once you have it, this one is about picking which number
  to watch before you do. `how-to-do-influencer-marketing.md`'s "Measure
  what you can actually prove" section got a reciprocal linking sentence;
  `modified` bumped to 2026-09-07.

- `how-to-brief-an-influencer.md` (2026-09-10) — the five things a working
  influencer brief states plainly, Canadian ad-disclosure requirements
  (#ad/#sponsored placement, per the Competition Bureau and Ad Standards
  Canada), reading a creator's last three posts before writing the brief so
  the ask matches their real voice, giving revision feedback on what's
  missing rather than rewriting their line, and a real six-line brief for a
  Toronto coffee shop. Checked pillar 2's brief paragraph and pillar 3's UGC-
  brief section first, per the standing note below; goes deeper on the
  influencer side specifically rather than repeating either. Was "Next
  three" item 2. `how-to-do-influencer-marketing.md` got a reciprocal
  linking sentence in its brief section; `modified` bumped to 2026-09-10.
- `affiliate-vs-flat-fee-influencer-payment.md` (2026-09-17) — affiliate
  commission versus a guaranteed flat fee (and the base-plus-bonus hybrid)
  as two different ways to allocate risk between brand and creator, when
  each fits, who eats the loss on a flop under each, and a worked $1,000
  Toronto launch-budget comparison. Genuinely new ground: checked every
  published post first (see the note below) and nothing already covers
  payment *structure* as distinct from seeding-vs-paid's pay-or-don't-pay
  question. `seeding-vs-paid-influencer-marketing.md` and
  `how-to-do-influencer-marketing.md` (the pillar) both got reciprocal
  linking sentences; both `modified` bumped to 2026-09-17.

**Also found this run: PR #21 (`claude/seo-content-drafts`, opened
2026-08-31) was still open and unmerged at data-pull time, ten days and
three runs after opening** (it carries the agency-vs-marketplace,
measure-honestly, and KPI posts listed above, none of which are live on
sixthdegree.app yet). This run's commit lands on that same branch/PR rather
than opening a competing one. Flagged as a founder action in the report;
worth checking why review has stalled if it happens again.

## 2026-09-14 run: expanded an existing page instead of a new post

All three pillars and all eight spokes are still published; the TikTok-rate
spoke below is still blocked (re-checked again this run, same content-mill
sources disagreeing 3 to 5x, nothing new); GSC still shows no genuine keyword
gap. Rather than force a ninth spoke, this run improved
`engagement-rate-explained.md`: GSC shows two real long-tail queries ("is 5
engagement rate good," "what is bad engagement rate") landing on that page
for four straight log entries, matched by Google but ranked too low
(position 71-95) to ever get a click. The post talked about tiers and ranges
but never directly answered either literal question. Added a "Is 5% good?
What's bad? Quick answers by number" section that does, using the same
already-cited benchmark ranges (no new stats invented). This does not
promise a ranking fix (prior entries correctly diagnosed this as a
ranking-age/backlink problem, not a title/description problem), but it closes
a real content gap for the queries already reaching the page and was the
highest-confidence, non-cannibalizing move available this run. `modified`
bumped to 2026-09-14.

**Also found this run: PR #22 (`claude/seo-content-drafts`, opened
2026-09-14) was still open and unmerged at data-pull time**, carrying the
engagement-rate-explained CTR expansion from that run. This run's commit
(the new spoke below) lands on that same branch/PR. Not yet a multi-run
pattern like PR #21 was, but flagged the same way in case it becomes one.

## 2026-09-17 run: a new spoke on payment structure, not from this queue

All three pillars and nine spokes are still published (see the list above);
the TikTok-rate spoke below is still blocked (re-checked again this run,
same content-mill sources disagreeing widely, including a Creator Fund CPM
figure that's a different thing entirely from a sponsored-post rate, still
nothing citable); GSC still shows no genuine keyword gap (5-6 total
query-dimension rows, same pattern as every prior entry). Rather than force
a tenth spoke onto a queue that was already down to "next: none," this run
re-read every published post looking for a real gap in the architecture
itself, not a GSC signal, and found one: `seeding-vs-paid-influencer-marketing.md`
answers "do you pay at all," but nothing addresses "once you're paying,
what's the fee tied to," flat fee versus a commission on tracked sales
versus a hybrid of both. That's a distinct decision with its own real-world
failure mode (a nano creator earning far under a flat rate on a
commission-only launch-week deal, worked out in the new post's numbers), not
a rewording of the seeding question. See
`affiliate-vs-flat-fee-influencer-payment.md` in the list above.

## Next, in priority order (updated 2026-09-17)

1. **"Instagram vs TikTok for Toronto creator campaigns: where to put your
   budget first."** Still held back on the TikTok-rate half. Re-checked
   again this run for a citable TikTok Canada/Toronto creator-rate source
   and found nothing beyond the same content-mill "2026 pricing guide"
   pages flagged 2026-09-07 (Hootsuite, Launchpoint, InfluenceFlow,
   InfluencerFee, Nowadays, usesnippet.app), still disagreeing widely with
   no primary research. Not a citable source by the `lib/deliverables.ts`
   bar. Keep checking each run; don't lower the bar.
2. New GSC-driven or founder-requested topics as they surface. Query volume
   is still thin (see `docs/GSC-LOG.md`); once real gaps appear, let them
   override this list instead of continuing to guess. No genuine keyword
   gap has surfaced yet as of 2026-09-17; every long-tail query with
   impressions already lands on a topically relevant published post.

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
