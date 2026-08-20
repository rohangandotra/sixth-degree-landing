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
