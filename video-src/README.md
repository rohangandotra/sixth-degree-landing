# Hero film source

The 38-second film on the landing hero, built as code so it can be re-cut.

- `film.html`: the animation. `render(t)` draws the frame at time `t`.
- `music.py`: the score, cued to the same 150 BPM grid as the cuts.
- `render.cjs`: captures frames with Playwright and encodes with ffmpeg.
- `build.sh`: full rebuild into `../assets/video/`.

Needs Node with Playwright (`PLAYWRIGHT_PATH=/path/to/app/node_modules/playwright`
works), Python 3 with numpy and scipy, and ffmpeg.

The copy follows the app's honesty rules. Every claim must match what the
app on `main` does today (verification checks, release timing, badges). The
sample creator keeps its "Sample profile" tag. If a fact changes in the app,
the film is re-cut, not left stale.

`out/` holds the intermediate renders and the master, and is gitignored. This
folder is in `.vercelignore` and is never deployed.
