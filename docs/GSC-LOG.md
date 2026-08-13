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
