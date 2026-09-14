# Search Console tracking log

Appended once per SEO routine run (Monday + Thursday) so "movement since last
data" in the report means something. Property: `sc-domain:sixthdegree.app`.
Each entry covers the trailing 28-day window ending ~3 days before the run
date (GSC data lags). Numbers come straight from the `searchAnalytics.query`
API, `dimensions: ["query"]`, filtered/read for the standing keyword targets
in the SEO routine prompt. Zero-impression rows are normal early; keep them
in the table rather than dropping them, so a future run can see when a
keyword goes from zero to something.

## 2026-08-13 (window: 2026-07-13 to 2026-08-10)

First run with real API numbers pulled (prior runs found data too thin to
be worth recording, or didn't record it — no earlier baseline exists to
diff against, so this entry establishes one).

| Target keyword | Impressions | Avg position | Clicks |
|---|---|---|---|
| influencers in Toronto | 0 | — | 0 |
| Toronto influencers | 0 | — | 0 |
| find creators Toronto | 0 | — | 0 |
| hire influencers Toronto | 0 | — | 0 |
| influencer marketing Toronto | 0 | — | 0 |
| UGC creators Toronto | 0 | — | 0 |
| micro influencers Toronto | 0 | — | 0 |
| creators near me | 0 | — | 0 |
| influencers near me | 0 | — | 0 |
| how to do influencer marketing | 0 | — | 0 |
| how to do creator marketing | 0 | — | 0 |
| influencer marketing for small business | 0 | — | 0 |
| creator marketing | 0 | — | 0 |

Non-target queries that DID show impressions this window (branded/near-brand,
for context only, not part of the standing target list): "sixth degree" (13
impressions, avg position 14.6, 0 clicks), "6th degrees" (1 impression,
position 80), "ugc content booth toronto" (1 impression, position 33).

Page-level signal (from `dimensions: ["page"]`, same window; useful because
GSC suppresses very-low-volume individual queries from the query-dimension
report but still counts them at the page level, so this is the more honest
read on total organic interest so far):

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| app.sixthdegree.app/ | 26 | 3 | 15.0 |
| blog/toronto-creator-rates/ | 13 | 3 | 2.5 |
| www.sixthdegree.app/ (see indexing note below) | 8 | 3 | 10.0 |
| blog/micro-vs-nano-creators/ | 5 | 1 | 4.4 |
| blog/influencers-in-toronto/ | 2 | 1 | 4.5 |
| blog/find-micro-influencers-ugc-toronto/ | 2 | 0 | 20.0 |
| app.sixthdegree.app/ad-rights-rider | 3 | 0 | 7.7 |
| app.sixthdegree.app/creator-agreement | 3 | 0 | 3.3 |
| blog/ (index) | 1 | 0 | 5.0 |
| app.sixthdegree.app/privacy | 1 | 0 | 3.0 |

Indexing note: URL Inspection API shows Google is currently choosing
`https://www.sixthdegree.app/` as the canonical for the homepage instead of
the declared `https://sixthdegree.app/`, even though `www` correctly 308s to
the apex (verified live) and the page's own `rel=canonical` says apex. Last
crawl on file: 2026-08-04. This is why `www...` still shows impressions
above. Likely stale index state predating the redirect fix; watch the next
run or two. If it hasn't resolved by then, a manual "Request Indexing" on
the apex homepage in Search Console (founder action, one click) would speed
recrawl.

Sitemap coverage (Search Console `sitemaps` list, same day): `sixthdegree.app/sitemap.xml`
7 submitted / 0 indexed; `app.sixthdegree.app/sitemap.xml` 5 submitted / 0
indexed (both expected to be near-zero this early; not itself a problem).

## 2026-08-20 (window: 2026-07-21 to 2026-08-17)

| Target keyword | Impressions | Avg position | Change since 2026-08-13 |
|---|---|---|---|
| influencers in Toronto | 0 | — | no change |
| Toronto influencers | 0 | — | no change |
| find creators Toronto | 0 | — | no change |
| hire influencers Toronto | 0 | — | no change |
| influencer marketing Toronto | 0 | — | no change |
| UGC creators Toronto | 0 | — | no change |
| micro influencers Toronto | 0 | — | no change |
| creators near me | 0 | — | no change |
| influencers near me | 0 | — | no change |
| how to do influencer marketing | 0 | — | no change |
| how to do creator marketing | 0 | — | no change |
| influencer marketing for small business | 0 | — | no change |
| creator marketing | 0 | — | no change |

Still zero impressions across every standing target keyword. Expected this
early (the site has 9 total indexed URLs and no backlink profile yet); the
`llms.txt`/content investment is aimed at query volume that hasn't started
appearing yet, not a signal anything is broken. Query-dimension data overall
is thin enough (4 total rows site-wide, all branded) that no CTR or
cannibalization analysis is possible from real data this run either; that
section will start being meaningful once individual pages accumulate double
digits of impressions on non-branded terms.

Non-target queries with impressions this window (branded/near-brand,
context only): "sixth degree" (16 impressions, avg position 13.25, 0
clicks), "the sixth degree" (2 impressions, position 41, new this window),
"6th degrees" (1 impression, position 80), "ugc content booth toronto" (1
impression, position 33).

Page-level signal (`dimensions: ["page"]`, same window):

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| app.sixthdegree.app/ | 35 | 3 | 14.8 |
| blog/toronto-creator-rates/ | 13 | 3 | 2.5 |
| www.sixthdegree.app/ (see indexing note) | 11 | 4 | 12.5 |
| blog/micro-vs-nano-creators/ | 5 | 1 | 4.4 |
| blog/ (index) | 4 | 0 | 12.3 |
| app.sixthdegree.app/ad-rights-rider | 3 | 0 | 7.7 |
| app.sixthdegree.app/creator-agreement | 3 | 0 | 3.3 |
| blog/influencers-in-toronto/ | 2 | 1 | 4.5 |
| blog/find-micro-influencers-ugc-toronto/ | 2 | 0 | 20.0 |
| sixthdegree.app/ (apex root) | 1 | 1 | 4.0 |
| app.sixthdegree.app/privacy | 1 | 0 | 3.0 |
| blog/how-to-do-influencer-marketing/ | 1 | 0 | 8.0 |

`how-to-do-creator-marketing-ugc/` and `brand-deals-1000-10000-followers-canada/`
show no impressions yet; both are inside their first two weeks (published
2026-08-13 and 2026-08-17), consistent with the pattern every other post
showed before its first clicks appeared.

Indexing note, resolved: the 2026-08-13 entry flagged Google choosing
`https://www.sixthdegree.app/` as the canonical for the homepage instead of
the declared apex. URL Inspection this run shows the homepage's
`googleCanonical` now matches `userCanonical` (both
`https://sixthdegree.app/`), and inspecting `www.sixthdegree.app/` directly
returns `coverageState: "Page with redirect"` with the apex as canonical.
The www impressions still showing in the page table above are residual (SERP
snapshots not yet refreshed), not a live indexing problem; no action needed
unless it recurs.

URL Inspection API status (required check, homepage / blog index / two most
recent posts):

| URL | Verdict | Coverage | Last crawl |
|---|---|---|---|
| sixthdegree.app/ | PASS | Submitted and indexed | 2026-08-16 |
| sixthdegree.app/blog/ | PASS | Submitted and indexed | 2026-08-04 |
| blog/how-to-do-creator-marketing-ugc/ | PASS | Submitted and indexed | 2026-08-18 |
| blog/brand-deals-1000-10000-followers-canada/ | NEUTRAL | URL is unknown to Google | never crawled |

All green except the brand-deals post, which merged 2026-08-18 (three days
before this run) and has never been crawled yet — normal for a post this
new, not a regression. Re-check next run; if it's still unknown to Google by
2026-08-27, that would be worth a manual "Request Indexing."

Sitemap coverage: `sixthdegree.app/sitemap.xml` showed 8 submitted / 0
indexed as of Google's last download (2026-08-18 06:42 UTC); the live
sitemap now carries 9 URLs because the ad rights rider post (this run) and
the brand-deals post (merged 2026-08-18 17:05 EDT, after that download) both
landed after Google's last fetch. `app.sixthdegree.app/sitemap.xml`: 4
submitted / 0 indexed, unchanged. The sitemap "indexed" count is a known lag
behind URL Inspection's per-page truth (three of four inspected URLs above
are individually confirmed indexed despite the sitemap report showing 0);
treat URL Inspection as authoritative, not this count.

## 2026-09-03 (window: 2026-08-04 to 2026-08-31)

No entry was recorded for the 2026-08-31 (Monday) run; this is the next
data pulled. The `claude/seo-content-drafts` PR from that run (#21,
agency-vs-marketplace post) was still open/unmerged at data-pull time, so
its post isn't live and isn't reflected in this window's page-level numbers
yet.

| Target keyword | Impressions | Avg position | Change since 2026-08-20 |
|---|---|---|---|
| influencers in Toronto | 0 | — | no change |
| Toronto influencers | 0 | — | no change |
| find creators Toronto | 0 | — | no change |
| hire influencers Toronto | 0 | — | no change |
| influencer marketing Toronto | 0 | — | no change |
| UGC creators Toronto | 0 | — | no change |
| micro influencers Toronto | 0 | — | no change |
| creators near me | 0 | — | no change |
| influencers near me | 0 | — | no change |
| how to do influencer marketing | 0 | — | no change |
| how to do creator marketing | 0 | — | no change |
| influencer marketing for small business | 0 | — | no change |
| creator marketing | 0 | — | no change |

Still zero impressions on every standing target keyword. First real signal
of a *different* kind this run, though: two long-tail, non-target queries
now show impressions that trace directly to a specific published post
rather than to the brand name — "is 5 engagement rate good" (1 impression,
position 71) and "what is bad engagement rate" (2 impressions, position 95),
both landing on `blog/engagement-rate-explained/` (published 2026-08-27,
18 impressions total this window, 0 clicks, avg position 79.17 — the page
is being crawled and lightly matched, but ranks far too low for any click;
expected for a 5-day-old post with no backlinks, not a problem to fix).
Two more one-off long-tails appeared: "ugc content booth toronto" (1
impression, position 33, landing on `find-micro-influencers-ugc-toronto/`)
and "ugc creator management" (1 impression, position 87, landing on
`how-to-do-creator-marketing-ugc/`).

Branded queries this window: "sixth degree" (25 impressions, avg position
9.92, 0 clicks — note below on where these land), "sixthdegree" (1
impression, position 8), "the sixth degree" (2 impressions, position 41),
"6th degrees" (1 impression, position 80).

Page-level signal (`dimensions: ["page"]`, same window):

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| app.sixthdegree.app/ | 42 | 2 | 13.21 |
| sixthdegree.app/ | 18 | 8 | 7.72 |
| blog/engagement-rate-explained/ | 18 | 0 | 79.17 |
| www.sixthdegree.app/ | 8 | 3 | 11.25 |
| how-to-do-creator-marketing-ugc/ | 8 | 0 | 62.75 |
| seeding-vs-paid-influencer-marketing/ | 8 | 0 | 50.38 |
| blog/ (index) | 7 | 2 | 9.57 |
| find-micro-influencers-ugc-toronto/ | 5 | 0 | 11.8 |
| how-to-do-influencer-marketing/ | 4 | 0 | 50.25 |
| ad-rights-rider-ugc-usage-rights/ | 3 | 0 | 59.33 |
| influencers-in-toronto/ | 2 | 1 | 4.5 |
| app.sixthdegree.app/ad-rights-rider | 1 | 0 | 6 |
| app.sixthdegree.app/creator-agreement | 1 | 0 | 2 |
| app.sixthdegree.app/privacy | 1 | 0 | 2 |
| brand-deals-1000-10000-followers-canada/ | 1 | 0 | 7 |
| toronto-creator-rates/ | 1 | 0 | 58 |

Notable movements vs. the 2026-08-20 entry (windows overlap but shift
roughly two weeks forward, so read this as trend not a clean diff):
`sixthdegree.app/` clicks roughly doubled (3 to 8) and average position
improved sharply (14.8 to 7.72) even though raw impressions dropped, a
healthy pattern (fewer, better-matched impressions). `toronto-creator-rates/`
and `micro-vs-nano-creators/` both fell out of the page table's
higher-visibility rows they held in every prior entry (toronto-creator-rates
was position 2.5 with 13 impressions in the first log entry;
micro-vs-nano-creators doesn't show at all this window) — worth watching
next run; if it repeats, the query mix that used to rank them may have
genuinely dropped rather than just cycled out of this window.

**Finding, not a config bug: `app.sixthdegree.app/` is still indexed
despite carrying `noindex, follow`.** URL Inspection confirms the live page
serves `<meta name="robots" content="noindex, follow">` correctly (verified
by direct fetch this run), but the API still returns `coverageState:
"Submitted and indexed"`, `indexingState: "INDEXING_ALLOWED"`, last crawl
2026-07-28 — before the noindex tag would have first been live. This is
very likely the same class of stale-index lag the 2026-08-13 entry recorded
for `www.sixthdegree.app/` (which took about a week to resolve on its own
once Google recrawled). It explains why "sixth degree" impressions this
window split 24-to-2 in favor of `app.sixthdegree.app/` over
`sixthdegree.app/` in the page+query breakdown: Google is currently
matching the branded query to the indexed-but-noindex'd app root more than
the marketing homepage. No code fix applies here (the live tag is already
correct); if it hasn't cleared in the next run or two, a founder
"Request Indexing" or "Validate Fix" on `app.sixthdegree.app/` in Search
Console would speed the recrawl.

URL Inspection API status (required check, homepage / blog index / two most
recent live posts):

| URL | Verdict | Coverage | Last crawl |
|---|---|---|---|
| sixthdegree.app/ | PASS | Submitted and indexed | 2026-08-29 |
| sixthdegree.app/blog/ | PASS | Submitted and indexed | 2026-08-04 |
| blog/engagement-rate-explained/ | PASS | Submitted and indexed | 2026-08-28 |
| blog/seeding-vs-paid-influencer-marketing/ | PASS | Submitted and indexed | 2026-08-25 |

All four green. "Two most recent posts" here means the two most recent
*live* posts (engagement-rate-explained, seeding-vs-paid); the
agency-vs-marketplace post from the 2026-08-31 run is not live yet (PR #21
open) so it wasn't inspected.

Sitemap coverage: `sixthdegree.app/sitemap.xml` 12 submitted / 0 indexed as
of last download (2026-09-02 10:51 UTC; live sitemap has grown to 14 URLs
with this run's two new posts, landing after that download, same lag
pattern as every prior entry). `app.sixthdegree.app/sitemap.xml`: 4
submitted / 0 indexed, unchanged since the first entry. Treat URL Inspection
as authoritative over this count, per the standing note above.

Cannibalization / CTR analysis: query-level data is still too thin for
either (9 total page+query rows this window, GSC's dimension-suppression
behavior means this undercounts the per-query totals shown above — same
known quirk noted in the 2026-08-20 entry). No genuine keyword gap
surfaced either: every long-tail query with impressions this window already
lands on a topically relevant published post; the issue is ranking depth
(position 33-95), not a missing page.

## 2026-09-07 (window: 2026-08-08 to 2026-09-04)

| Target keyword | Impressions | Avg position | Change since 2026-09-03 |
|---|---|---|---|
| influencers in Toronto | 0 | — | no change |
| Toronto influencers | 0 | — | no change |
| find creators Toronto | 0 | — | no change |
| hire influencers Toronto | 0 | — | no change |
| influencer marketing Toronto | 0 | — | no change |
| UGC creators Toronto | 0 | — | no change |
| micro influencers Toronto | 0 | — | no change |
| creators near me | 0 | — | no change |
| influencers near me | 0 | — | no change |
| how to do influencer marketing | 0 | — | no change |
| how to do creator marketing | 0 | — | no change |
| influencer marketing for small business | 0 | — | no change |
| creator marketing | 0 | — | no change |

Still zero impressions on every standing target keyword, five straight
entries now. Query-dimension data site-wide is six rows total this window:
branded/near-brand ("sixth degree" 27 impressions avg position 10.19,
"sixthdegree" 1 impression position 8, "the sixth degree" 2 impressions
position 41, "ugc creator management" 1 impression position 87, continuing
from last entry) and the same two engagement-rate long-tails as last entry
("is 5 engagement rate good" 1 impression position 71, "what is bad
engagement rate" 2 impressions position 95, both landing on
`blog/engagement-rate-explained/`). "ugc content booth toronto" and "6th
degrees," present last entry, dropped out of this window (both were
one-off single impressions; not a trend either way at this volume).

Page-level signal (`dimensions: ["page"]`, same window). Most rows are
close to the 2026-09-03 entry's numbers, expected given the two windows
share about three quarters of their days:

| Page | Impressions | Clicks | Avg position | vs. 2026-09-03 |
|---|---|---|---|---|
| app.sixthdegree.app/ | 43 | 2 | 11.67 | steady (42/2/13.21) |
| sixthdegree.app/ | 23 | 9 | 9.13 | up (18/8/7.72) |
| blog/engagement-rate-explained/ | 18 | 0 | 79.17 | unchanged |
| blog/ (index) | 8 | 2 | 8.88 | steady (7/2/9.57) |
| how-to-do-creator-marketing-ugc/ | 8 | 0 | 62.75 | unchanged |
| seeding-vs-paid-influencer-marketing/ | 8 | 0 | 50.38 | unchanged |
| www.sixthdegree.app/ | 6 | 2 | 13.33 | steady (8/3/11.25) |
| how-to-do-influencer-marketing/ | 4 | 0 | 50.25 | unchanged |
| find-micro-influencers-ugc-toronto/ | 3 | 0 | 6.33 | up from 11.8 |
| ad-rights-rider-ugc-usage-rights/ | 3 | 0 | 59.33 | unchanged |
| toronto-creator-rates/ | 2 | 0 | 31.5 | up from position 58 |
| brand-deals-1000-10000-followers-canada/ | 2 | 0 | 4 | up from position 7 |
| influencers-in-toronto/ | 2 | 1 | 4.5 | unchanged |
| app.sixthdegree.app/ad-rights-rider | 1 | 0 | 6 | unchanged |
| app.sixthdegree.app/creator-agreement | 1 | 0 | 2 | unchanged |
| app.sixthdegree.app/privacy | 1 | 0 | 2 | unchanged |

`toronto-creator-rates/` partially recovered (position 58 to 31.5) but is
still far below the 2.5 it held in the very first log entry, and
`micro-vs-nano-creators/` still doesn't appear in the page table at all,
second entry running at zero. Keep watching; not calling this resolved yet.

**Escalating, not resolved: `app.sixthdegree.app/` is still indexed
despite carrying `noindex, follow`, and Google has not recrawled it since
before the tag went live.** The 2026-09-03 entry flagged this
(`lastCrawlTime: 2026-07-28T09:20:45Z`); URL Inspection this run returns
the identical timestamp, `2026-07-28T09:20:45Z`, meaning Google has not
recrawled this URL in over five weeks despite the branded query "sixth
degree" sending it 25+ impressions a window. The live page still serves
the correct tag (verified by direct fetch this run) and `robotsTxtState:
ALLOWED` / `indexingState: INDEXING_ALLOWED` confirm Google has permission
to act on it, it just hasn't been back to look. This has now sat for two
full log entries with no movement, longer than the `www` staleness took to
clear on its own in August. **Founder action: a manual "Request Indexing"
or "Validate Fix" on `https://app.sixthdegree.app/` in Search Console**
would force a recrawl rather than waiting on Google's own schedule; no code
change applies since the live tag is already correct.

URL Inspection API status (required check, homepage / blog index / two most
recent *live* posts — engagement-rate-explained and seeding-vs-paid remain
the two most recent live posts; the three posts drafted since
[agency-vs-marketplace, measure-honestly, and this run's KPI piece] are
still sitting in unmerged PRs, so none of them are inspectable yet):

| URL | Verdict | Coverage | Last crawl |
|---|---|---|---|
| sixthdegree.app/ | PASS | Submitted and indexed | 2026-08-29 |
| sixthdegree.app/blog/ | PASS | Submitted and indexed | 2026-08-04 |
| blog/engagement-rate-explained/ | PASS | Submitted and indexed | 2026-08-28 |
| blog/seeding-vs-paid-influencer-marketing/ | PASS | Submitted and indexed | 2026-08-25 |

All four green, unchanged from last entry. `sixthdegree.app/blog/` hasn't
recrawled since 2026-08-04, over a month now; worth a "Request Indexing" in
the same founder pass as the app-root fix above if it's still stale next
entry, though lower urgency since the blog index isn't losing branded-query
share to anything the way the app root is.

Sitemap coverage: `sixthdegree.app/sitemap.xml` still shows 12 submitted /
0 indexed as of last download (2026-09-05 17:02 UTC); the live sitemap on
`main` is also still 12 URLs, since PR #21 (2 posts) remains unmerged and
this run's post stacks a third post onto the same unmerged branch, so
there's no drift, just three posts' worth of sitemap growth waiting on one
merge. `app.sixthdegree.app/sitemap.xml`: 4 submitted / 0 indexed,
unchanged since the first entry.

Cannibalization / CTR analysis: still too thin for either (6 total
query-dimension rows this window, same dimension-suppression caveat as
every prior entry). No new keyword gap surfaced: every long-tail query with
impressions already lands on a topically relevant published post; the
constraint is still ranking depth (position 8-95 depending on the page),
not a missing page. The clearest opportunity in the data remains
`blog/engagement-rate-explained/`: 18 impressions and 0 clicks at position
79 says Google is matching the page to real queries but ranking it too low
to be clickable yet, consistent with a five-week-old post with no backlink
profile rather than anything wrong with the page itself.

## 2026-09-10 (window: 2026-08-11 to 2026-09-07)

**Also found this run: PR #21 (`claude/seo-content-drafts`) is still open
and unmerged, now 10 days and three prior runs after it was opened
(2026-08-31).** It carries the agency-vs-marketplace, measure-honestly, and
KPI posts recorded in `docs/CONTENT-ROADMAP.md`; none are live on
sixthdegree.app yet, so none of their query/page data can appear below,
and none are eligible for the URL Inspection check yet either. This run's
new post (how-to-brief-an-influencer) is committed onto that same open PR
rather than a new one. See the report for the founder-action callout.

| Target keyword | Impressions | Avg position | Change since 2026-09-07 |
|---|---|---|---|
| influencers in Toronto | 0 | — | no change |
| Toronto influencers | 0 | — | no change |
| find creators Toronto | 0 | — | no change |
| hire influencers Toronto | 0 | — | no change |
| influencer marketing Toronto | 0 | — | no change |
| UGC creators Toronto | 0 | — | no change |
| micro influencers Toronto | 0 | — | no change |
| creators near me | 0 | — | no change |
| influencers near me | 0 | — | no change |
| how to do influencer marketing | 0 | — | no change |
| how to do creator marketing | 0 | — | no change |
| influencer marketing for small business | 0 | — | no change |
| creator marketing | 0 | — | no change |

Still zero impressions on every standing target keyword, six straight
entries now. Query-dimension data site-wide is the same six rows as last
entry, values steady within normal window-shift noise: "sixth degree" (23
impressions, avg position 10.35, was 27/10.19), "sixthdegree" (1
impression, position 8, unchanged), "the sixth degree" (2 impressions,
position 41, unchanged), "ugc creator management" (1 impression, position
87, unchanged, still landing on `how-to-do-creator-marketing-ugc/`), "is 5
engagement rate good" (1 impression, position 71, unchanged) and "what is
bad engagement rate" (2 impressions, position 95, unchanged), both still
landing on `blog/engagement-rate-explained/`.

Page-level signal (`dimensions: ["page"]`, same window):

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| app.sixthdegree.app/ | 36 | 1 | 12.39 |
| sixthdegree.app/ | 23 | 9 | 9.13 |
| blog/engagement-rate-explained/ | 18 | 0 | 79.17 |
| how-to-do-creator-marketing-ugc/ | 8 | 0 | 62.75 |
| seeding-vs-paid-influencer-marketing/ | 8 | 0 | 50.38 |
| blog/ (index) | 7 | 2 | 9.43 |
| how-to-do-influencer-marketing/ | 4 | 0 | 50.25 |
| www.sixthdegree.app/ | 3 | 1 | 19.33 |
| ad-rights-rider-ugc-usage-rights/ | 3 | 0 | 59.33 |
| brand-deals-1000-10000-followers-canada/ | 3 | 0 | 4.67 |
| find-micro-influencers-ugc-toronto/ | 3 | 0 | 6.33 |
| toronto-creator-rates/ | 2 | 0 | 31.5 |
| app.sixthdegree.app/privacy | 1 | 0 | 2 |

`influencers-in-toronto/` and `app.sixthdegree.app/ad-rights-rider` and
`/creator-agreement`, present in the last two entries at 1-2 impressions
each, dropped out of this window; not a trend at this volume, just
one-offs cycling in and out. `micro-vs-nano-creators/` remains absent from
the page table for a third straight entry, longer than any other post has
gone silent; still not calling this resolved, but there is nothing
actionable to do about it beyond what the content already does (it is
linked from three other posts and the pillar).

**Escalating further: `app.sixthdegree.app/` still has not been recrawled
since before its `noindex, follow` tag went live.** Third consecutive check
(2026-09-03, 2026-09-07, and this run) returns the identical
`lastCrawlTime: 2026-07-28T09:20:45Z` and `coverageState: "Submitted and
indexed"` for a URL whose live tag has said noindex for six-plus weeks now.
`sixthdegree.app/blog/` is also going stale on the same axis, unchanged at
`2026-08-04T22:55:55Z` for a third check running (over five weeks), though
lower urgency since it isn't actively winning branded-query share the way
the app root is. **Founder action, now overdue: a manual "Request Indexing"
or "Validate Fix" on `https://app.sixthdegree.app/` in Search Console.**
No code change applies; the live tag is already correct, Google simply
hasn't been back.

URL Inspection API status (required check, homepage / blog index / two most
recent *live* posts — engagement-rate-explained and seeding-vs-paid remain
the two most recent live posts; the three PR #21 posts plus this run's are
still unmerged, so none are inspectable):

| URL | Verdict | Coverage | Last crawl |
|---|---|---|---|
| sixthdegree.app/ | PASS | Submitted and indexed | 2026-08-29 |
| sixthdegree.app/blog/ | PASS | Submitted and indexed | 2026-08-04 |
| blog/engagement-rate-explained/ | PASS | Submitted and indexed | 2026-08-28 |
| blog/seeding-vs-paid-influencer-marketing/ | PASS | Submitted and indexed | 2026-08-25 |

All four green, unchanged from last entry.

Sitemap coverage: `sixthdegree.app/sitemap.xml` still 12 submitted / 0
indexed as of last download; `main`'s live sitemap is also still 12 URLs,
since PR #21's three posts plus this run's fourth are all waiting on the
same merge. No drift, just four posts' worth of sitemap growth queued
behind one review. `app.sixthdegree.app/sitemap.xml`: 4 submitted / 0
indexed, unchanged since the first entry.

Cannibalization / CTR analysis: still too thin for either (6 total
query-dimension rows). No new keyword gap surfaced; every long-tail query
with impressions lands on a topically relevant published post already.
Same standing CTR watch item as last entry: `blog/engagement-rate-explained/`
at 18 impressions and 0 clicks, position 79, which reads as a ranking
problem (too far down to be clickable) rather than a title/description
problem, since the current meta is already specific. No action taken this
run; revisit if it's still 0 clicks at real volume once ranking position
improves or four more weeks pass without improvement.

## 2026-09-14 (window: 2026-08-15 to 2026-09-11)

| Target keyword | Impressions | Avg position | Change since 2026-09-10 |
|---|---|---|---|
| influencers in Toronto | 0 | — | no change |
| Toronto influencers | 0 | — | no change |
| find creators Toronto | 0 | — | no change |
| hire influencers Toronto | 0 | — | no change |
| influencer marketing Toronto | 0 | — | no change |
| UGC creators Toronto | 0 | — | no change |
| micro influencers Toronto | 0 | — | no change |
| creators near me | 0 | — | no change |
| influencers near me | 0 | — | no change |
| how to do influencer marketing | 0 | — | no change |
| how to do creator marketing | 0 | — | no change |
| influencer marketing for small business | 0 | — | no change |
| creator marketing | 0 | — | no change |

Still zero impressions on every standing target keyword, seven straight
entries now. Query-dimension data site-wide is five rows this window (down
from six last entry): "sixth degree" (23 impressions, avg position 10.7,
was 23/10.35, essentially flat), "sixthdegree" (1 impression, position 8,
unchanged), "is 5 engagement rate good" (1 impression, position 71,
unchanged) and "what is bad engagement rate" (2 impressions, position 95,
unchanged), both still landing on `blog/engagement-rate-explained/". "the
sixth degree" and "ugc creator management," present last entry, dropped out
of this window (both were one- or two-off impressions, not a trend at this
volume).

Page-level signal (`dimensions: ["page"]`, same window):

| Page | Impressions | Clicks | Avg position |
|---|---|---|---|
| app.sixthdegree.app/ | 33 | 1 | 11.0 |
| sixthdegree.app/ | 28 | 10 | 8.86 |
| blog/engagement-rate-explained/ | 18 | 0 | 79.17 |
| how-to-do-creator-marketing-ugc/ | 8 | 0 | 62.75 |
| seeding-vs-paid-influencer-marketing/ | 8 | 0 | 50.38 |
| blog/ (index) | 4 | 1 | 5.5 |
| how-to-do-influencer-marketing/ | 4 | 0 | 49.25 |
| ad-rights-rider-ugc-usage-rights/ | 3 | 0 | 59.33 |
| brand-deals-1000-10000-followers-canada/ | 3 | 0 | 4.67 |
| find-micro-influencers-ugc-toronto/ | 3 | 0 | 6.33 |
| toronto-creator-rates/ | 2 | 0 | 31.5 |
| app.sixthdegree.app/privacy | 1 | 0 | 2 |

`www.sixthdegree.app/`, `influencers-in-toronto/`, and the two app legal
pages besides privacy, all present in at least one of the last two entries
at 1-3 impressions, dropped out of this window; one-offs cycling, not a
trend at this volume. `micro-vs-nano-creators/` remains absent from the
page table for a fifth straight entry; still nothing actionable beyond the
three existing internal links into it.

**Both standing indexing escalations from the last three entries are
resolved this run.** `app.sixthdegree.app/` (carrying `noindex, follow`)
finally recrawled: `lastCrawlTime` is now `2026-09-14T01:23:49Z` (was stuck
at `2026-07-28T09:20:45Z` for three straight checks), and `coverageState`
correctly reads `"Excluded by 'noindex' tag"` instead of the stale
`"Submitted and indexed"` verdict that had persisted for six-plus weeks
after the tag went live. `sixthdegree.app/blog/` also recrawled
(`2026-09-13T22:22:46Z`, was stuck at `2026-08-04T22:55:55Z` for three
checks). Both cleared on their own, same pattern as the `www` staleness
that resolved itself in August; no code or founder action was needed
either time. No new indexing problem found this run.

URL Inspection API status (required check, homepage / blog index / two most
recent live posts):

| URL | Verdict | Coverage | Last crawl |
|---|---|---|---|
| sixthdegree.app/ | PASS | Submitted and indexed | 2026-08-29 |
| sixthdegree.app/blog/ | PASS | Submitted and indexed | 2026-09-13 |
| blog/how-to-brief-an-influencer/ | PASS | Submitted and indexed | 2026-09-13 |
| blog/creator-marketing-kpis-what-to-track/ | PASS | Submitted and indexed | 2026-09-13 |

All four green. The two most recently published posts (2026-09-10 and
2026-09-07) are both now indexed; this is the first entry able to inspect
them, since PR #21 was still unmerged at the last two data-pulls.

Sitemap coverage: `sixthdegree.app/sitemap.xml` showed 16 submitted / 0
indexed as of last download (2026-09-13 12:40 UTC), matching the live
sitemap's 16 URLs exactly (14 posts + home + blog index) — no drift.
`app.sixthdegree.app/sitemap.xml`: 4 submitted / 0 indexed, unchanged since
the first entry. Per the standing note, treat URL Inspection as
authoritative over this "0 indexed" count; three of four inspected URLs
above are individually confirmed indexed despite it.

Cannibalization / CTR analysis: still too thin for either (5 total
query-dimension rows this window). No new keyword gap surfaced; the two
long-tail queries with impressions already land on a topically relevant
published post. This run's content PR (#22, landing repo) added a direct-
answer section to `engagement-rate-explained.md` addressing both of them by
name, since the page has now shown 0 clicks at position 71-95 on these
exact queries across four straight entries; see `docs/CONTENT-ROADMAP.md`
for the reasoning. `toronto-creator-rates/` held steady at position 31.5,
same as last entry; still far below its all-time-best 2.5, not calling it
resolved, nothing new to act on.
