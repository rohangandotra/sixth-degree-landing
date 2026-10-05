// Renders film.html frame by frame and encodes it. Deterministic: frame N is
// render(N / FPS), never wall-clock. Needs Playwright (Chromium) and ffmpeg.
//   node render.cjs preview 1.6 12.5   -> out/prev_<t>.png stills
//   node render.cjs full               -> out/film-silent.mp4 (1080p60)
// Playwright resolves from PLAYWRIGHT_PATH if set (the app repo has it), else
// from this repo's node_modules.
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const FPS = 60, DUR = 38.4;
const OUT = path.join(__dirname, 'out');

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const mode = process.argv[2] || 'preview';
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + path.join(__dirname, 'film.html'));
  await page.evaluate(() => window.ready);
  if (mode === 'preview') {
    for (const t of process.argv.slice(3).map(Number)) {
      await page.evaluate(t => render(t), t);
      await page.screenshot({ path: path.join(OUT, `prev_${t}.png`) });
    }
  } else {
    const N = Math.round(FPS * DUR);
    const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
      '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '17', '-preset', 'slow', '-movflags', '+faststart',
      path.join(OUT, 'film-silent.mp4')], { stdio: ['pipe', 'ignore', 'inherit'] });
    for (let f = 0; f < N; f++) {
      await page.evaluate(t => render(t), f / FPS);
      const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (f % 600 === 0) console.log('frame', f, '/', N);
    }
    ff.stdin.end();
    await new Promise(r => ff.on('close', r));
  }
  await browser.close();
})();
