#!/bin/sh
# Full rebuild of the hero film: frames, score, master, web encodes, poster.
# Bump the -vN suffix (here, in index.html, and llms.txt) whenever the output
# changes after it has shipped: /assets/ is served immutable for a year.
set -e
cd "$(dirname "$0")"
V=v1
node render.cjs full
python3 music.py
ffmpeg -loglevel error -y -i out/film-silent.mp4 -i out/music.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 256k -shortest -movflags +faststart out/film-master.mp4
A=../assets/video
ffmpeg -loglevel error -y -i out/film-master.mp4 -vf fps=30 -c:v libx264 -preset slow -crf 24 -profile:v high -pix_fmt yuv420p -c:a aac -b:a 160k -movflags +faststart $A/sixth-degree-film-1080-$V.mp4
ffmpeg -loglevel error -y -i out/film-master.mp4 -vf "fps=30,scale=1280:-2" -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart $A/sixth-degree-film-720-$V.mp4
ffmpeg -loglevel error -y -ss 8.9 -i out/film-master.mp4 -frames:v 1 -q:v 3 $A/sixth-degree-film-poster-$V.jpg
ls -la $A
