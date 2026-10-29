#!/usr/bin/env python3
"""
Regenerate the rail WebP derivatives in public/screens from the source PNGs.

The source app screenshots are rounded rectangles drawn on a white canvas.
The site renders them in a square, sharp-edged rail, so on viewports where
object-cover crops very little the white corners show up as notches. A couple
of exports also carry a thin white band under the bottom edge.

For every corner the script fills a square patch row by row with the green
sampled from a clean column just outside that row. Using a per-row colour
preserves the banner's vertical gradient, so there is no white notch, no
visible square seam, and no content change. A white bottom band, when present,
is filled with the same green. Image dimensions and framing stay unchanged.

Usage:
    python3 scripts/optimize-screens.py
"""

from __future__ import annotations

import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"
OUT_DIR = PUBLIC / "screens"
CORNER = 96  # px painted in each corner (source canvas)
SAMPLE_GAP = 12  # px outside the corner patch used for the clean green column
WHITE = 245


def decode(path: Path) -> tuple[int, int, bytearray]:
    probe = subprocess.check_output(
        [
            "ffprobe",
            "-v",
            "error",
            "-select_streams",
            "v:0",
            "-show_entries",
            "stream=width,height",
            "-of",
            "csv=p=0",
            str(path),
        ],
        text=True,
    ).strip()
    width, height = (int(value) for value in probe.split(","))
    raw = subprocess.check_output(
        ["ffmpeg", "-v", "error", "-i", str(path), "-vf", "format=rgb24", "-f", "rawvideo", "-"]
    )
    expected = width * height * 3
    if len(raw) != expected:
        raise RuntimeError(f"{path}: expected {expected} bytes, got {len(raw)}")
    return width, height, bytearray(raw)


def pixel(buffer: bytearray, width: int, x: int, y: int) -> bytes:
    index = (y * width + x) * 3
    return buffer[index : index + 3]


def is_white(color: bytes) -> bool:
    return color[0] > WHITE and color[1] > WHITE and color[2] > WHITE


def fill_row(buffer: bytearray, width: int, y: int, x0: int, x1: int, colour: bytes) -> None:
    for x in range(x0, x1 + 1):
        index = (y * width + x) * 3
        buffer[index : index + 3] = colour


def content_bottom(buffer: bytearray, width: int, height: int) -> int:
    """Lowest row that still has non-white content."""
    probes = (width // 2, width // 4, (width * 3) // 4)
    for y in range(height - 1, -1, -1):
        for x in probes:
            if not is_white(pixel(buffer, width, x, y)):
                return y
    return height - 1


def row_colour(buffer: bytearray, width: int, sample_x: int, y: int, fallback: bytes) -> bytes:
    colour = pixel(buffer, width, sample_x, y)
    if is_white(colour):
        return fallback
    return colour


def encode(buffer: bytearray, width: int, height: int, destination: Path) -> None:
    subprocess.run(
        [
            "ffmpeg",
            "-v",
            "error",
            "-y",
            "-f",
            "rawvideo",
            "-pix_fmt",
            "rgb24",
            "-s",
            f"{width}x{height}",
            "-i",
            "-",
            "-vf",
            "scale=800:-2",
            "-c:v",
            "libwebp",
            "-quality",
            "80",
            "-compression_level",
            "6",
            str(destination),
        ],
        input=buffer,
        check=True,
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    sources = sorted(PUBLIC.glob("app-*.png"))
    if not sources:
        raise SystemExit("No public/app-*.png sources found")

    for source in sources:
        width, height, buffer = decode(source)
        left_sample = min(width - 1, CORNER + SAMPLE_GAP)
        right_sample = max(0, width - 1 - CORNER - SAMPLE_GAP)

        # Remove the occasional white band below the rounded bottom edge.
        bottom = content_bottom(buffer, width, height)
        strip_colour = row_colour(
            buffer,
            width,
            left_sample,
            max(0, bottom - 5),
            pixel(buffer, width, right_sample, max(0, bottom - 5)),
        )
        if bottom < height - 1:
            for y in range(bottom + 1, height):
                fill_row(buffer, width, y, 0, width - 1, strip_colour)

        # Top corners, row by row so the banner gradient is preserved.
        for y in range(CORNER):
            left_colour = row_colour(buffer, width, left_sample, y, strip_colour)
            right_colour = row_colour(buffer, width, right_sample, y, strip_colour)
            fill_row(buffer, width, y, 0, CORNER - 1, left_colour)
            fill_row(buffer, width, y, width - CORNER, width - 1, right_colour)

        # Bottom corners. Rows below `bottom` have already been filled with the
        # strip colour, so the samples here are always green.
        for y in range(height - CORNER, height):
            left_colour = row_colour(buffer, width, left_sample, y, strip_colour)
            right_colour = row_colour(buffer, width, right_sample, y, strip_colour)
            fill_row(buffer, width, y, 0, CORNER - 1, left_colour)
            fill_row(buffer, width, y, width - CORNER, width - 1, right_colour)

        destination = OUT_DIR / f"{source.stem}-rail.webp"
        encode(buffer, width, height, destination)
        print(f"{source.name} -> {destination.relative_to(ROOT)} ({destination.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
