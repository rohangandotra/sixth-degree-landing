// Static blog generator for sixthdegree.app.
// Reads content/posts/*.md, writes blog/<slug>/index.html + blog/index.html,
// and regenerates sitemap.xml. Output is committed, no build step on Vercel.
// Usage: npm run build:blog

import { marked } from 'marked';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://sixthdegree.app';
const POSTS_DIR = join(ROOT, 'content', 'posts');

// ---------- frontmatter ----------

function parseFrontmatter(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) throw new Error(`${file}: missing frontmatter`);
  const data = {};
  for (const line of m[1].split('\n')) {
    if (!line.trim()) continue;
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (!kv) throw new Error(`${file}: bad frontmatter line: ${line}`);
    data[kv[1]] = kv[2].replace(/^"(.*)"$/, '$1').trim();
  }
  for (const key of ['title', 'description', 'target_query', 'date', 'modified', 'author']) {
    if (!data[key]) throw new Error(`${file}: frontmatter missing "${key}"`);
  }
  if (data.title.length > 60) throw new Error(`${file}: title is ${data.title.length} chars (max 60)`);
  if (data.description.length > 155) throw new Error(`${file}: description is ${data.description.length} chars (max 155)`);
  return { data, body: raw.slice(m[0].length) };
}

// ---------- helpers ----------

const esc = (s) => s
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&#39;');

const fmtDate = (iso) => new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-CA', {
  year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC',
});

// Exact PostHog snippet from index.html; keep the two files in sync.
const POSTHOG = `  <!-- PostHog analytics, cookieless: memory-only persistence, no session recording, DNT respected. Key is the publishable project token (safe in public HTML). Config mirrors the app's instrumentation-client.ts; keep them in sync. -->
  <script>
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing identify reset get_distinct_id set_config on".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init('phc_qTWpE65KUpaBfMc8Qo8gkRsTjLKrXRMGM6NofQqLmLac', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      persistence: 'memory',
      person_profiles: 'identified_only',
      disable_session_recording: true,
      respect_dnt: true,
      autocapture: { css_selector_allowlist: ['a', 'button', 'form'] }
    });
  </script>`;

const HEAD_COMMON = `  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap">
  <link rel="stylesheet" href="/styles.css">
  <link rel="stylesheet" href="/blog.css">
  <link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
  <link rel="icon" type="image/png" sizes="96x96" href="/assets/favicon-96.png">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">`;

const HEADER = `  <header class="header">
    <nav class="nav container">
      <a href="https://sixthdegree.app/" class="nav__logo">Sixth Degree<span class="logo-degree">°</span></a>
      <ul class="nav__links">
        <li><a href="https://sixthdegree.app/#for-brands">For Brands</a></li>
        <li><a href="https://sixthdegree.app/#for-creators">For Creators</a></li>
        <li><a href="/blog/">Blog</a></li>
      </ul>
      <a href="https://sixthdegree.app/#contact" class="nav__cta">Join the waitlist</a>
      <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  </header>`;

const FOOTER = `  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <span class="footer__logo">Sixth Degree<span class="logo-degree">°</span></span>
        <div class="footer__info">
          <span>Toronto, Canada</span>
          <a href="https://sixthdegree.app/">Home</a>
          <a href="/blog/">Blog</a>
          <a href="https://www.instagram.com/sixthdegree.app/" rel="me">Instagram: @sixthdegree.app</a>
          <a href="mailto:hello@sixthdegree.app">hello@sixthdegree.app</a>
          <span>&copy; 2026 Sixth Degree</span>
        </div>
      </div>
    </div>
  </footer>

  <script src="/animations.js" defer></script>
${POSTHOG}`;

function page({ title, description, canonical, ogType, jsonLd, body, ogTitle }) {
  return `<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
  <meta charset="UTF-8">
  <script>document.documentElement.classList.remove('no-js')</script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="${ogType}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:site_name" content="Sixth Degree">
  <meta property="og:locale" content="en_CA">
  <meta property="og:title" content="${esc(ogTitle || title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:image" content="${SITE}/assets/og-image.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Sixth Degree: hire verified Toronto creators, escrow-paid, honestly measured.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:image" content="${SITE}/assets/og-image.png">
  <meta name="twitter:title" content="${esc(ogTitle || title)}">
  <meta name="twitter:description" content="${esc(description)}">
${HEAD_COMMON}
  <script type="application/ld+json">
${JSON.stringify(jsonLd, null, 2)}
  </script>
</head>
<body>

${HEADER}

${body}

${FOOTER}
</body>
</html>
`;
}

// ---------- load posts ----------

const posts = readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md')).map((file) => {
  const { data, body } = parseFrontmatter(readFileSync(join(POSTS_DIR, file), 'utf8'), file);
  return { slug: file.replace(/\.md$/, ''), ...data, html: marked.parse(body) };
});

posts.sort((a, b) => b.date.localeCompare(a.date)); // newest first

// ---------- post pages ----------

for (const post of posts) {
  const canonical = `${SITE}/blog/${post.slug}/`;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: `${SITE}/assets/og-image.png`,
    datePublished: post.date,
    dateModified: post.modified,
    author: { '@type': 'Person', name: post.author.replace(/,.*$/, ''), description: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Sixth Degree',
      logo: { '@type': 'ImageObject', url: `${SITE}/assets/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  };

  const body = `  <main class="post">
    <div class="post__container">
      <p class="post__breadcrumb"><a href="/blog/">&larr; All posts</a></p>
      <h1 class="post__title">${esc(post.title)}</h1>
      <p class="post__meta">By ${esc(post.author)} &middot; <time datetime="${post.date}">${fmtDate(post.date)}</time>${post.modified !== post.date ? ` &middot; Updated <time datetime="${post.modified}">${fmtDate(post.modified)}</time>` : ''}</p>
      <div class="post__body">
${post.html.trimEnd()}
      </div>
      <div class="post__cta">
        <p>Sixth Degree is a Toronto marketplace for verified nano and micro creators. Private beta opens Fall 2026, and the waitlist gets first access.</p>
        <a class="btn btn--primary" href="https://sixthdegree.app/#contact">Join the waitlist<span class="btn__arrow">&rarr;</span></a>
      </div>
    </div>
  </main>`;

  const dir = join(ROOT, 'blog', post.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), page({
    title: post.title,
    description: post.description,
    canonical,
    ogType: 'article',
    jsonLd,
    body,
  }));
  console.log(`built blog/${post.slug}/index.html`);
}

// ---------- blog index ----------

const indexCards = posts.map((post) => `        <a class="post-card" href="/blog/${post.slug}/">
          <p class="post-card__date"><time datetime="${post.date}">${fmtDate(post.date)}</time></p>
          <h2 class="post-card__title">${esc(post.title)}</h2>
          <p class="post-card__desc">${esc(post.description)}</p>
          <span class="post-card__more">Read the post &rarr;</span>
        </a>`).join('\n');

const indexJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'The Sixth Degree Blog',
  url: `${SITE}/blog/`,
  description: 'Rates, tactics, and honest math for Toronto brands working with nano and micro creators.',
  publisher: {
    '@type': 'Organization',
    name: 'Sixth Degree',
    logo: { '@type': 'ImageObject', url: `${SITE}/assets/logo.png` },
  },
  blogPost: posts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${SITE}/blog/${post.slug}/`,
    datePublished: post.date,
    dateModified: post.modified,
  })),
};

const indexBody = `  <main class="post">
    <div class="post__container">
      <h1 class="post__title">The Sixth Degree Blog</h1>
      <p class="post__meta">Rates, tactics, and honest math for Toronto brands working with creators.</p>
      <div class="post-list">
${indexCards}
      </div>
    </div>
  </main>`;

mkdirSync(join(ROOT, 'blog'), { recursive: true });
writeFileSync(join(ROOT, 'blog', 'index.html'), page({
  title: 'Sixth Degree Blog: Toronto creator rates and campaign math',
  description: 'Rates, tactics, and honest math for Toronto brands working with nano and micro creators.',
  canonical: `${SITE}/blog/`,
  ogType: 'website',
  jsonLd: indexJsonLd,
  body: indexBody,
}));
console.log('built blog/index.html');

// ---------- sitemap ----------

const latest = posts.map((p) => p.modified).sort().at(-1);
const urls = [
  { loc: `${SITE}/`, lastmod: latest },
  { loc: `${SITE}/blog/`, lastmod: latest },
  ...posts.map((p) => ({ loc: `${SITE}/blog/${p.slug}/`, lastmod: p.modified })),
];

writeFileSync(join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
  </url>`).join('\n')}
</urlset>
`);
console.log('built sitemap.xml');
