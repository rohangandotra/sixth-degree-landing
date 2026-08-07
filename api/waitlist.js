// Waitlist signup endpoint. Stores the lead in the app's database, then
// sends a role-specific welcome email to the signee and a notification to
// the founders via Resend.
//
// Signups carry a role qualifier, validated and normalized here: creators an
// Instagram or TikTok handle (platform + handle), brands a website. The
// welcome email never mentions them; they ride the founder notification only.
//
// THE DATABASE IS THE SYSTEM OF RECORD (the app repo's `waitlist_signups`
// table, prod Supabase); emails are notifications. The lead is stored FIRST,
// so a Resend outage cannot lose a signup; a store failure logs and falls
// through to the email path, so a database outage cannot refuse one either.
// This project holds ONLY the public anon key (SUPABASE_URL +
// SUPABASE_ANON_KEY in Vercel env), and the key opens exactly one door: the
// SECURITY DEFINER function waitlist_signup(), which validates its own
// inputs and can only upsert a lead row. Never put a service-role key here.
// Until the env vars are set, storage no-ops and emails remain the record.
//
// Requires RESEND_API_KEY in the Vercel project env. Until it is set this
// returns 503 and the frontend falls back to the old FormSubmit flow, so
// merging before the key exists is safe.
//
// Sender must be on the Resend-verified domain (mail.sixthdegree.app).
// Replies go to hello@sixthdegree.app, which forwards to both founders.

const FROM = process.env.WAITLIST_FROM || 'Aaryan & Rohan at Sixth Degree <hello@mail.sixthdegree.app>';
const REPLY_TO = 'hello@sixthdegree.app';
const NOTIFY = 'hello@sixthdegree.app';

const EMAILS = {
  creator: {
    subject: "You're on the Sixth Degree waitlist",
    text: `Hey, Aaryan and Rohan here. We're the two people building Sixth Degree in Toronto.

Thanks for joining the waitlist as a creator. Here's what that gets you:

- First access when the private beta opens in Fall 2026.
- Brand deals with the terms settled up front: deliverables, usage rights, and your fee, agreed before you start.
- The brand funds the full fee to escrow before work begins, so you never chase an invoice. You keep 100% of your quoted fee.
- If you're one of the first 100 creators on the platform, a founding creator badge on your profile. It stays there forever.

Between now and the beta we're talking to creators across the city about rates, bad client stories, and what would actually make this worth using. If you have opinions, a media kit, or rates you want sanity-checked, reply to this email. It comes straight to the two of us and we answer everything.

Aaryan and Rohan
Sixth Degree, Toronto
sixthdegree.app`,
  },
  brand: {
    subject: "You're on the Sixth Degree waitlist",
    text: `Hey, Aaryan and Rohan here. We're the two people building Sixth Degree in Toronto.

Thanks for joining the waitlist as a brand. Here's what that gets you:

- First access when the private beta opens in Fall 2026.
- A pool of Toronto nano and micro creators where every account is checked by a human for bots and bought followers, and re-checked every 90 days.
- Campaigns with terms settled up front and payment held in escrow until the work is live, plus trackable links and promo codes so you can see what a creator actually drove.

Between now and the beta we're talking to brands about the campaigns they want to run, so we build the thing you actually need. If you want to talk sooner, reply to this email. It comes straight to the two of us and we reply to everything.

Aaryan and Rohan
Sixth Degree, Toronto
sixthdegree.app`,
  },
};

// Minimal HTML wrapper around the same copy: readable, no images, no tracking.
// The bare domain in the signature becomes a real link in the HTML version.
function toHtml(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/(^|\s)sixthdegree\.app/g, '$1<a href="https://sixthdegree.app" style="color:#0D9488;">sixthdegree.app</a>');
  const paras = text.split('\n\n').map((block) => {
    if (block.trim().startsWith('- ')) {
      const items = block.split('\n').map((l) => `<li style="margin:0 0 8px;">${esc(l.replace(/^- /, ''))}</li>`).join('');
      return `<ul style="margin:0 0 16px;padding-left:20px;">${items}</ul>`;
    }
    return `<p style="margin:0 0 16px;">${esc(block).replace(/\n/g, '<br>')}</p>`;
  }).join('');
  return `<div style="max-width:560px;margin:0 auto;padding:24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;color:#1c302e;">
  <p style="margin:0 0 24px;font-family:Georgia,serif;font-size:22px;">Sixth Degree<span style="color:#0D9488;">&deg;</span></p>
  ${paras}
</div>`;
}

// Upsert the lead via the one RPC the anon key can execute. Returns false
// when storage is not configured (env vars absent); throws on a failed call.
async function storeLead(email, role, social, site) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    // Unconfigured must never look like working: without this line, a typo'd
    // env var means an empty leads table that nobody notices for weeks.
    console.warn('waitlist lead storage not configured (SUPABASE_URL / SUPABASE_ANON_KEY); emails are the only record');
    return false;
  }
  const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/rpc/waitlist_signup`, {
    method: 'POST',
    headers: { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      p_email: email,
      p_role: role,
      p_platform: social ? social.platform : null,
      p_handle: social ? social.handle : null,
      p_website: site,
    }),
    // A hung database must degrade to the email path, not hold the signup
    // hostage until the platform timeout. Failure is caught by the caller.
    signal: AbortSignal.timeout(5000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`waitlist store ${res.status}: ${body.slice(0, 300)}`);
  }
  return true;
}

async function send(apiKey, payload) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`resend ${res.status}: ${body.slice(0, 300)}`);
  }
  return res.json();
}

// Creator qualifier: platform + handle. Accepts a bare handle, @handle, or a
// pasted instagram.com/tiktok.com profile URL; a URL's host wins over the
// declared platform. Returns { platform, handle } or null if unusable.
function normalizeCreatorSocial(platform, handle) {
  if (typeof handle !== 'string' || handle.length > 300) return null;
  let h = handle.trim();
  let p = platform === 'instagram' || platform === 'tiktok' ? platform : null;
  const url = h.match(/^(?:https?:\/\/)?(?:www\.)?(instagram\.com|tiktok\.com)\/(@?[A-Za-z0-9._]+)/i);
  if (url) {
    p = url[1].toLowerCase() === 'instagram.com' ? 'instagram' : 'tiktok';
    h = url[2];
  }
  h = h.replace(/^@/, '');
  // Handles may lead with _ or . (e.g. _jane_), but must contain a letter or digit.
  if (!p || !/^[A-Za-z0-9._]{1,30}$/.test(h) || !/[A-Za-z0-9]/.test(h)) return null;
  return { platform: p, handle: h };
}

// Brand qualifier: website. Accepts a bare domain or a full URL; https is
// prepended when no scheme is given (an explicit http:// is kept). Returns
// the normalized URL string or null if unusable. The length cap is checked
// on the NORMALIZED url, because that is what the database's own 300-char
// bound sees: new URL() can expand its input (scheme prepend, percent
// encoding), and a lead the database refuses is a lead silently missing
// from the system of record.
function normalizeWebsite(website) {
  if (typeof website !== 'string' || website.length > 300) return null;
  let w = website.trim();
  if (!w) return null;
  if (!/^https?:\/\//i.test(w)) w = 'https://' + w;
  let url;
  try {
    url = new URL(w);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
  if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i.test(url.hostname)) return null;
  if (url.href.length > 300) return null;
  return url.href;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { email, role, platform, handle, website, _honey } = req.body || {};

  // Honeypot filled means a bot; pretend it worked and send nothing.
  if (_honey) return res.status(200).json({ ok: true });

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'invalid_email' });
  }
  if (role !== 'brand' && role !== 'creator') {
    return res.status(400).json({ error: 'invalid_role' });
  }

  // Role qualifiers are required. A 400 here still captures the signup: the
  // frontend falls back to FormSubmit, which carries every enabled field.
  const social = role === 'creator' ? normalizeCreatorSocial(platform, handle) : null;
  const site = role === 'brand' ? normalizeWebsite(website) : null;
  if (role === 'creator' && !social) {
    return res.status(400).json({ error: 'invalid_handle' });
  }
  if (role === 'brand' && !site) {
    return res.status(400).json({ error: 'invalid_website' });
  }

  // Store first (see header). A failure here must never block the signup.
  try {
    await storeLead(email, role, social, site);
  } catch (err) {
    console.error('waitlist lead store failed', err);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'not_configured' });

  const welcome = EMAILS[role];
  try {
    await send(apiKey, {
      from: FROM,
      to: [email],
      reply_to: REPLY_TO,
      subject: welcome.subject,
      text: welcome.text,
      html: toHtml(welcome.text),
    });
  } catch (err) {
    // Welcome failed: report failure so the frontend falls back to
    // FormSubmit and the signup is still captured by email.
    console.error('waitlist welcome send failed', err);
    return res.status(502).json({ error: 'send_failed' });
  }

  const detail = social
    ? `Platform: ${social.platform === 'instagram' ? 'Instagram' : 'TikTok'}\nHandle: @${social.handle}\nProfile: ${
        social.platform === 'instagram'
          ? `https://instagram.com/${social.handle}`
          : `https://tiktok.com/@${social.handle}`
      }`
    : `Website: ${site}`;

  try {
    await send(apiKey, {
      from: FROM,
      to: [NOTIFY],
      reply_to: email,
      subject: `Waitlist signup: ${role} - ${email}`,
      text: `New waitlist signup\n\nEmail: ${email}\nRole: ${role}\n${detail}\n\nWelcome email sent. Reply to this message to reach them directly.`,
    });
  } catch (err) {
    // Signee already got their welcome; log and still report success.
    console.error('waitlist notify send failed', err);
  }

  return res.status(200).json({ ok: true });
}
