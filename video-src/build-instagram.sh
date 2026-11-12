#!/bin/sh
# Instagram Reel cut: 1080x1920, 30fps, same score. Output goes to out/
# (gitignored); these files are for upload, not for the website.
#   sixth-degree-reel.mp4        upload this as a Reel
#   sixth-degree-reel-cover.jpg  the Reel cover (logo frame; survives the
#                                profile grid's 3:4 centre crop)
set -e
cd "$(dirname "$0")"
FORMAT=vertical FPS=30 node render.cjs full
[ -f out/music.wav ] || python3 music.py
# H.264 High, 30fps, AAC 48 kHz: what Instagram re-encodes from with the
# least loss. CRF 18 with a 12 Mbps cap keeps the upload well under limits.
ffmpeg -loglevel error -y -i out/film-vertical-silent.mp4 -i out/music.wav -map 0:v -map 1:a \
  -c:v libx264 -preset slow -crf 18 -maxrate 12M -bufsize 24M -profile:v high -level 4.1 -pix_fmt yuv420p -r 30 \
  -c:a aac -b:a 256k -ar 48000 -shortest -movflags +faststart out/sixth-degree-reel.mp4
ffmpeg -loglevel error -y -ss 8.9 -i out/film-vertical-silent.mp4 -frames:v 1 -q:v 2 out/sixth-degree-reel-cover.jpg
ls -la out/sixth-degree-reel*
