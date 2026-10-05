"""Score for the Sixth Degree hero film. 150 BPM (beat 0.4s, bar 1.6s), A minor.
Every cut in film.html sits on this grid; the cue list below mirrors it, so a
retimed cut there means a moved cue here. Needs numpy + scipy.
Usage: python music.py  ->  out/music.wav"""
import os
import wave

import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 44100
B = 0.4
BAR = 1.6
DUR = 38.4
N = int(SR * (DUR + 0.5))
rng = np.random.default_rng(6)

MAIN = np.zeros((2, N))   # dry, not ducked
DUCK = np.zeros((2, N))   # sidechained to the kick
SEND = np.zeros((2, N))   # reverb send
kick_times = []


def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)
def tt(d): return np.arange(int(d * SR)) / SR
def noise(d): return rng.standard_normal(int(d * SR))
def filt(x, kind, f, order=2):
    return sosfilt(butter(order, f, btype=kind, fs=SR, output='sos'), x)


def place(bus, t, sig, gain=1.0, pan=0.0, send=0.0):
    i = int(round(t * SR))
    if sig.ndim == 1:
        a = (pan + 1) * np.pi / 4
        sig = np.vstack([sig * np.cos(a), sig * np.sin(a)]) * np.sqrt(2)
    n = min(sig.shape[1], N - i)
    if n <= 0: return
    bus[:, i:i + n] += sig[:, :n] * gain
    if send: SEND[:, i:i + n] += sig[:, :n] * gain * send


def saw(f, d, harm=28, phase=0.0):
    t = tt(d); out = np.zeros_like(t)
    for k in range(1, harm + 1):
        if f * k > 15000: break
        out += np.sin(2 * np.pi * f * k * t + phase * k) / k
    return out * 0.6

# ---------------- instruments ----------------

def kick(t, g=0.9):
    d = tt(0.5)
    f = 46 + 120 * np.exp(-d * 30)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-d * 6.5)
    click = filt(noise(0.5), 'highpass', 2500) * np.exp(-d * 350) * 0.35
    place(MAIN, t, np.tanh((s + click) * 1.6) * 0.85, g)
    kick_times.append(t)


def impact(t, g=0.8):
    d = tt(2.2)
    f = 28 + 40 * np.exp(-d * 5)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-d * 1.9)
    body = filt(noise(2.2), 'lowpass', 2500) * np.exp(-d * 7) * 0.5
    place(MAIN, t, np.tanh(sub * 1.4) * 0.9 + body, g, send=0.35)


def clap(t, g=0.35):
    d = tt(0.35); env = np.zeros_like(d)
    for off in (0, 0.011, 0.023):
        env += (d >= off) * np.exp(-np.clip(d - off, 0, None) * 140)
    env += (d >= 0.03) * np.exp(-np.clip(d - 0.03, 0, None) * 16) * 0.6
    s = filt(noise(0.35), 'bandpass', [900, 4200]) * env
    place(MAIN, t, s, g, send=0.3)


def snare(t, g=0.3):
    d = tt(0.25)
    s = filt(noise(0.25), 'bandpass', [1500, 7000]) * np.exp(-d * 22) + np.sin(2 * np.pi * 190 * d) * np.exp(-d * 30) * 0.5
    place(MAIN, t, s, g, send=0.25)


def hat(t, g=0.1, open_=False, pan=0.0):
    dur = 0.28 if open_ else 0.06
    d = tt(dur)
    s = filt(noise(dur), 'highpass', 7500) * np.exp(-d * (11 if open_ else 70))
    place(MAIN, t, s, g, pan)


def crash(t, g=0.22):
    d = tt(2.4)
    s = filt(noise(2.4), 'highpass', 4500) * np.exp(-d * 2.2)
    sl = filt(noise(2.4), 'highpass', 4500) * np.exp(-d * 2.2)
    place(MAIN, t, np.vstack([s, sl]), g, send=0.3)


def whoosh(t_end, length=0.5, g=0.35):
    d = tt(length); x = d / length
    env = x ** 2.6
    lo = filt(noise(length), 'lowpass', 1800)
    hi = filt(noise(length), 'highpass', 3500)
    s = (lo * (1 - x) + hi * x * 1.3) * env
    place(MAIN, t_end - length, np.vstack([s, np.roll(s, 90)]), g, send=0.2)


def riser(t0, t1, g=0.22):
    length = t1 - t0; d = tt(length); x = d / length
    n = noise(length); out = np.zeros_like(n)
    chunks = 28; size = len(n) // chunks
    for c in range(chunks):
        fc = 300 * (20 ** (c / chunks))
        seg = filt(n, 'bandpass', [fc * 0.7, min(fc * 1.6, 20000)])
        w = np.zeros_like(n); a, b = c * size, min((c + 1) * size + size // 2, len(n))
        w[a:b] = np.hanning(b - a)
        out += seg * w
    f = 180 * (6 ** x)
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.25
    s = (out + tone) * x ** 2
    place(MAIN, t0, np.vstack([s, np.roll(s, 200)]), g, send=0.3)


def tick(t, f, g=0.25):
    d = tt(0.12)
    s = (np.sin(2 * np.pi * f * d) + 0.3 * np.sin(4 * np.pi * f * d)) * np.exp(-d * 45)
    place(MAIN, t, s, g, send=0.25)


def pop(t, f=700, g=0.12, pan=0.0):
    d = tt(0.15)
    fr = f * (1 + 1.2 * np.exp(-d * 70))
    s = np.sin(2 * np.pi * np.cumsum(fr) / SR) * np.exp(-d * 28)
    place(MAIN, t, s, g, pan, send=0.2)


def keyclick(t, g=0.05):
    d = tt(0.03)
    s = filt(noise(0.03), 'bandpass', [2500, 8000]) * np.exp(-d * 260)
    place(MAIN, t, s, g, rng.uniform(-0.3, 0.3))


def swish(t, g=0.18):
    d = tt(0.22); x = d / 0.22
    s = filt(noise(0.22), 'bandpass', [2500, 9000]) * np.sin(np.pi * x) ** 2
    place(MAIN, t - 0.08, s, g, 0.2)


def bell(t, m, g=0.12, pan=0.0):
    d = tt(1.8); f = mtof(m)
    s = (np.sin(2 * np.pi * f * d) + 0.4 * np.sin(2 * np.pi * f * 2.76 * d) * np.exp(-d * 4)
         + 0.2 * np.sin(2 * np.pi * f * 5.4 * d) * np.exp(-d * 8)) * np.exp(-d * 2.4)
    place(MAIN, t, s, g, pan, send=0.5)


def pluck(t, m, g=0.11, pan=0.0):
    d = tt(0.35); f = mtof(m)
    s = (np.sin(2 * np.pi * f * d) + 0.35 * saw(f, 0.35, 6)) * np.exp(-d * 13)
    place(DUCK, t, filt(s, 'lowpass', 5000), g, pan, send=0.3)


def pad(t, notes, d, cutoff, g=0.2):
    L = np.zeros(int(d * SR)); R = np.zeros(int(d * SR))
    for m in notes:
        f = mtof(m)
        for cents, side in ((-9, 'L'), (0, 'B'), (9, 'R')):
            s = saw(f * 2 ** (cents / 1200), d, 18, rng.uniform(0, 6.28))
            if side in 'LB': L += s
            if side in 'RB': R += s
    x = np.arange(len(L)) / SR
    env = np.minimum(1, x / 0.06) * np.minimum(1, (d - x) / 0.35)
    L = filt(L * env, 'lowpass', cutoff); R = filt(R * env, 'lowpass', cutoff)
    place(DUCK, t, np.vstack([L, R]) / len(notes), g, send=0.25)


def stab(t, notes, g=0.35):
    pad(t, [n + 12 for n in notes], 0.5, 6000, g)


def bass(t, m, d, g=0.32):
    f = mtof(m); x = tt(d)
    s = filt(saw(f, d, 14), 'lowpass', 420) + np.sin(2 * np.pi * f * x) * 0.8
    env = np.minimum(1, x / 0.004) * np.minimum(1, (d - x) / 0.03)
    place(DUCK, t, np.tanh(s * env * 1.3), g)

# ---------------- harmony ----------------
CH = {
    'Am': ([57, 60, 64, 71], 33),
    'F':  ([53, 57, 60, 67], 29),
    'C':  ([55, 60, 64, 67], 36),
    'G':  ([55, 59, 62, 69], 31),
}
PROG = ['Am', 'F', 'C', 'G']
def chord(bar): return CH[PROG[bar % 4]]

# ---------------- arrangement ----------------
# A · 0-3.2 countdown
for bar, cut in ((0, 700), (1, 900)):
    pad(bar * BAR, chord(bar)[0], BAR + 0.3, cut, 0.16)
tick(0.0, 880)
for i, t in enumerate((0.8, 1.0, 1.2, 1.4)):
    tick(t, mtof(81 + [2, 3, 5, 7][i]), 0.25)
kick(1.6, 1.0); impact(1.6, 0.6); stab(1.6, CH['Am'][0], 0.3); bell(1.6, 81, 0.12)
riser(1.9, 3.2, 0.22)
whoosh(3.2, 0.45, 0.35)

# B · 3.2-6.4 the problem slams
for i, t in enumerate((3.2, 4.0, 4.8)):
    kick(t, 1.0); impact(t, 0.75 if i else 0.9)
    stab(t, CH[['Am', 'F', 'C'][i]][0], 0.3)
    swish(t + 0.4, 0.22)
kick(5.6, 0.8)
bass(3.2, 33, 1.5); bass(4.8, 29, 1.5)
for k in range(8):
    hat(4.8 + k * 0.2, 0.04 + 0.01 * k, pan=0.3 if k % 2 else -0.3)
whoosh(6.4, 0.5, 0.4)

# C · 6.4-9.6 logo
impact(6.4, 0.9); crash(6.4, 0.18)
pad(6.4, CH['C'][0], BAR + 0.3, 1400, 0.2)
pad(8.0, CH['G'][0], BAR + 0.3, 2600, 0.2)
for i, m in enumerate([69, 72, 76, 81, 79, 76, 83, 84]):
    bell(6.45 + i * 0.1, m, 0.1, pan=-0.4 + 0.1 * i)
bell(8.05, 88, 0.12)   # underline shimmer
for k in range(4): kick(8.0 + k * B, 0.8)
for k in range(16): hat(8.0 + k * 0.1, 0.05 + 0.004 * k, pan=0.25 if k % 2 else -0.25)
roll = [8.8, 9.0, 9.2, 9.3, 9.4, 9.45, 9.5]
for i, t in enumerate(roll): snare(t, 0.12 + 0.03 * i)
riser(8.0, 9.6, 0.2)

# D · 9.6-28.8 the groove under the features
FEATURES = (9.6, 14.4, 19.2, 24.0)
for bar in range(6, 18):
    t0 = bar * BAR; notes, root = chord(bar)
    pad(t0, notes, BAR + 0.3, 3200, 0.17)
    last = bar == 17
    for b in range(4):
        tb = t0 + b * B
        if not last or b < 2: kick(tb, 0.9)
        if b in (1, 3) and not last: clap(tb)
        if not last: hat(tb + B / 2, 0.09, True, 0.2)
        for s in range(4):
            if not last: hat(tb + s * B / 4, 0.05 if s % 2 else 0.08, pan=-0.35)
        for e in range(2):
            if last and b >= 2: continue
            m = root + (12 if (b == 3 and e == 1) else 0)
            bass(tb + e * B / 2, m, B / 2 * 0.9)
    arp = notes[:3] + [notes[0] + 12]
    pat = [0, 1, 2, 3, 2, 1, 3, 2]
    for s in range(16):
        if last and s >= 8: break
        pluck(t0 + s * 0.1, arp[pat[s % 8]] + 12, 0.09, pan=0.3 if s % 2 else -0.3)
for t in FEATURES:
    crash(t); impact(t, 0.5 if t > 9.6 else 0.85)
    if t > 9.6: whoosh(t, 0.4, 0.3)

# UI micro-sounds (times mirror film.html)
pop(10.8, 900, 0.2); pop(11.2, 760, 0.12)                 # Verified, Founding Member
for i in range(3): pop(12.0 + i * 0.4, 1000 + i * 120, 0.1, 0.2)   # review checks
for i in range(3): pop(14.8 + i * 0.4, 600 + i * 90, 0.08, -0.2)   # wizard steps
pop(16.0, 520, 0.18)                                       # Use this play
n_chars = 108
for i in range(n_chars):
    if i % 2 == 0: keyclick(16.3 + (18.4 - 16.3) * i / n_chars)
for i, t in enumerate((20.0, 20.8, 21.6, 22.4)): pop(t, 700 + i * 110, 0.13)  # escrow nodes
bell(22.45, 88, 0.14); bell(22.55, 93, 0.1)               # released
for i in range(3): pop(24.8 + i * 0.4, 650 + i * 100, 0.1, 0.15)   # ledgers

# into the slam words
riser(27.2, 28.8, 0.24)
for i, t in enumerate([28.0, 28.2, 28.3, 28.4, 28.5, 28.55, 28.6, 28.65, 28.7]): snare(t, 0.1 + 0.025 * i)
whoosh(28.8, 0.35, 0.3)

# E · 28.8-32.0 Verified. Escrowed. Measured.
for i, (t, c) in enumerate(((28.8, 'Am'), (29.6, 'F'), (30.4, 'C'))):
    kick(t, 1.0); impact(t, 0.85 + 0.1 * i); stab(t, CH[c][0], 0.38); crash(t, 0.12)
bass(30.4, 36, 0.8)
riser(31.0, 32.0, 0.22)
whoosh(32.0, 0.45, 0.35)

# F · 32.0-38.4 end card
impact(32.0, 0.95); crash(32.0, 0.24)
for bar, c in [(20, 'Am'), (21, 'F'), (22, 'C')]:
    t0 = bar * BAR; notes, root = CH[c]
    pad(t0, notes, BAR + 0.3, 3000, 0.17)
    for b in range(4):
        tb = t0 + b * B
        if b == 0: kick(tb, 0.85)
        if b == 1: kick(tb + 0.2, 0.85)
        if b == 2: clap(tb, 0.3)
        hat(tb + B / 2, 0.06, True, 0.2)
        bass(tb, root, B * 0.9)
    arp = notes[:3] + [notes[0] + 12]
    for s in range(16):
        pluck(t0 + s * 0.1, arp[[0, 1, 2, 3, 2, 1, 3, 2][s % 8]] + 12, 0.08, pan=0.3 if s % 2 else -0.3)
pad(36.0, CH['G'][0], 0.9, 3000, 0.17); bass(36.0, 31, 0.75)
pop(32.8, 620, 0.14); pop(33.6, 880, 0.08)
snare(36.4, 0.15); snare(36.6, 0.2)
kick(36.8, 1.0); impact(36.8, 0.9); crash(36.8, 0.2)       # final resolve
pad(36.8, CH['Am'][0], 2.0, 2400, 0.22)
bass(36.8, 33, 1.4)
for i, m in enumerate([81, 84, 88, 93]): bell(36.8 + i * 0.1, m, 0.09)

# ---------------- mix ----------------
sc = np.ones(N)
for t in kick_times:
    i = int(t * SR); d = np.arange(min(int(0.4 * SR), N - i)) / SR
    sc[i:i + len(d)] = np.minimum(sc[i:i + len(d)], 1 - 0.65 * np.exp(-d / 0.09))
mix = MAIN + DUCK * sc

ir_t = tt(2.4)
ir = np.vstack([filt(noise(2.4), 'lowpass', 6000) * np.exp(-ir_t * 3),
                filt(noise(2.4), 'lowpass', 6000) * np.exp(-ir_t * 3)])
ir /= np.sqrt((ir ** 2).sum(axis=1, keepdims=True))
wet = np.vstack([fftconvolve(SEND[c], ir[c])[:N] for c in range(2)])
mix = mix + wet * 0.35

mix = np.vstack([filt(mix[c], 'highpass', 28) for c in range(2)])
mix = np.tanh(mix * 0.9 / np.percentile(np.abs(mix), 99.9))
x = np.arange(N) / SR
fade = np.ones(N); fade[x > 37.4] = np.clip((38.4 - x[x > 37.4]) / 1.0, 0, 1)
mix = (mix * fade)[:, :int(DUR * SR)]
mix = mix / np.max(np.abs(mix)) * 0.89

os.makedirs(os.path.join(os.path.dirname(__file__), 'out'), exist_ok=True)
pcm = (mix.T * 32767).astype('<i2')
with wave.open(os.path.join(os.path.dirname(__file__), 'out', 'music.wav'), 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())
print('wrote out/music.wav', mix.shape[1] / SR, 's')
