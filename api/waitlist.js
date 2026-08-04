// Waitlist signup endpoint. Sends a role-specific welcome email to the
// signee and a notification to the founders, both via Resend.
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
- A pool of Toronto nano and micro creators where every account is checked by a human for bots and bought followers, and re-checked every 60 days.
- Campaigns with terms settled up front and payment held in escrow until the work is live, plus trackable links and promo codes so you can see what a creator actually drove.

Between now and the beta we're talking to brands about the campaigns they want to run, so we build the thing you actually need. If you want to talk sooner, reply to this email. It comes straight to the two of us.

Aaryan and Rohan
Sixth Degree, Toronto
sixthdegree.app`,
  },
};

// Minimal HTML wrapper around the same copy: readable, no images, no tracking.
function toHtml(text) {
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const { email, role, _honey } = req.body || {};

  // Honeypot filled means a bot; pretend it worked and send nothing.
  if (_honey) return res.status(200).json({ ok: true });

  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return res.status(400).json({ error: 'invalid_email' });
  }
  if (role !== 'brand' && role !== 'creator') {
    return res.status(400).json({ error: 'invalid_role' });
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

  try {
    await send(apiKey, {
      from: FROM,
      to: [NOTIFY],
      reply_to: email,
      subject: `Waitlist signup: ${role} - ${email}`,
      text: `New waitlist signup\n\nEmail: ${email}\nRole: ${role}\n\nWelcome email sent. Reply to this message to reach them directly.`,
    });
  } catch (err) {
    // Signee already got their welcome; log and still report success.
    console.error('waitlist notify send failed', err);
  }

  return res.status(200).json({ ok: true });
}
