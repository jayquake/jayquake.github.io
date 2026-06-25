#!/usr/bin/env python3
"""Generate raster favicon assets — glassmorphism style matching favicon.svg."""

from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

PUBLIC = Path(__file__).resolve().parents[1] / "public"

BASE_TOP = (79, 95, 212)       # #4f5fd4
BASE_MID = (102, 126, 234)     # #667eea
BASE_BOT = (139, 63, 168)      # #8b3fa8
ORB_PINK = (244, 114, 182)
ORB_CYAN = (103, 232, 249)
ORB_VIOLET = (196, 181, 253)
WHITE = (255, 255, 255)
ICON_END = (224, 231, 255)
BADGE_TOP = (52, 211, 153)
BADGE_BOT = (5, 150, 105)


def lerp(a: int, b: int, t: float) -> int:
    return int(a + (b - a) * t)


def lerp_rgb(
    c1: tuple[int, int, int], c2: tuple[int, int, int], t: float
) -> tuple[int, int, int]:
    return (lerp(c1[0], c2[0], t), lerp(c1[1], c2[1], t), lerp(c1[2], c2[2], t))


def base_gradient(x: float, y: float, size: int) -> tuple[int, int, int]:
    t = (x + y) / (2 * size)
    if t < 0.45:
        local = t / 0.45
        return lerp_rgb(BASE_TOP, BASE_MID, local)
    local = (t - 0.45) / 0.55
    return lerp_rgb(BASE_MID, BASE_BOT, local)


def radial_orb(
    x: float,
    y: float,
    cx: float,
    cy: float,
    radius: float,
    color: tuple[int, int, int],
    strength: float,
) -> tuple[int, int, int, int]:
    dist = math.hypot(x - cx, y - cy)
    if dist >= radius:
        return (0, 0, 0, 0)
    t = 1 - dist / radius
    alpha = int(255 * strength * (t**1.6))
    return (*color, alpha)


def rounded_mask(x: int, y: int, size: int, radius: int) -> bool:
    if x < radius and y < radius:
        return (x - radius) ** 2 + (y - radius) ** 2 <= radius**2
    if x >= size - radius and y < radius:
        return (x - (size - radius)) ** 2 + (y - radius) ** 2 <= radius**2
    if x < radius and y >= size - radius:
        return (x - radius) ** 2 + (y - (size - radius)) ** 2 <= radius**2
    if x >= size - radius and y >= size - radius:
        return (x - (size - radius)) ** 2 + (y - (size - radius)) ** 2 <= radius**2
    return True


def glass_panel_mask(x: float, y: float, size: int) -> float:
    scale = size / 32.0
    left, top = 4.5 * scale, 4.5 * scale
    panel = 23 * scale
    radius = 6.5 * scale
    px, py = x - left, y - top
    if px < 0 or py < 0 or px > panel or py > panel:
        return 0.0
    # rounded rect SDF approximation
    qx = abs(px - panel / 2) - (panel / 2 - radius)
    qy = abs(py - panel / 2) - (panel / 2 - radius)
    outside = max(qx, 0) ** 2 + max(qy, 0) ** 2
    inside = min(max(qx, qy), 0) ** 2
    dist = math.sqrt(outside + inside) - radius
    if dist > 1.5:
        return 0.0
    if dist < 0:
        return 1.0
    return max(0.0, 1.0 - dist / 1.5)


def composite_pixel(
    base: tuple[int, int, int], overlay: tuple[int, int, int, int]
) -> tuple[int, int, int]:
    if overlay[3] == 0:
        return base
    a = overlay[3] / 255
    return (
        int(base[0] * (1 - a) + overlay[0] * a),
        int(base[1] * (1 - a) + overlay[1] * a),
        int(base[2] * (1 - a) + overlay[2] * a),
    )


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pixels = img.load()
    corner = max(2, round(size * 0.25))
    scale = size / 32.0

    for y in range(size):
        for x in range(size):
            if not rounded_mask(x, y, size, corner):
                continue

            color = base_gradient(x, y, size)
            color = composite_pixel(
                color, radial_orb(x, y, size * 0.3, size * 0.25, size * 0.55, ORB_PINK, 0.55)
            )
            color = composite_pixel(
                color, radial_orb(x, y, size * 0.78, size * 0.78, size * 0.5, ORB_CYAN, 0.45)
            )
            color = composite_pixel(
                color, radial_orb(x, y, size * 0.85, size * 0.2, size * 0.4, ORB_VIOLET, 0.35)
            )

            glass = glass_panel_mask(x, y, size)
            if glass > 0:
                top_t = (y - 4.5 * scale) / (23 * scale)
                glass_alpha = 0.42 - top_t * 0.36
                glass_alpha = max(0.06, glass_alpha) * glass
                color = composite_pixel(color, (*WHITE, int(255 * glass_alpha)))

            pixels[x, y] = (*color, 255)

    draw = ImageDraw.Draw(img)

    # Glass border + highlights
    left, top = 4.5 * scale, 4.5 * scale
    panel = 23 * scale
    radius = 6.5 * scale
    draw.rounded_rectangle(
        (left, top, left + panel, top + panel),
        radius=radius,
        outline=(*WHITE, 140),
        width=max(1, round(0.55 * scale)),
    )
    draw.arc(
        (left + panel * 0.12, top + panel * 0.08, left + panel * 0.88, top + panel * 0.22),
        start=200,
        end=-20,
        fill=(*WHITE, 95),
        width=max(1, round(0.7 * scale)),
    )

    # Accessibility figure
    cx = size / 2
    stroke = max(1, round(1.85 * scale))
    head_r = 2.15 * scale
    head_y = 10.2 * scale
    draw.ellipse(
        (cx - head_r, head_y - head_r, cx + head_r, head_y + head_r),
        fill=(*WHITE, 255),
    )

    body_top = 12.6 * scale
    body_mid = 16.8 * scale
    body_bottom = 20.2 * scale
    draw.line((cx, body_top, cx, body_mid), fill=(*WHITE, 245), width=stroke)
    draw.line((12.1 * scale, 14.6 * scale, 19.9 * scale, 14.6 * scale), fill=(*WHITE, 245), width=stroke)
    draw.line((13.2 * scale, body_bottom, cx, body_mid), fill=(*WHITE, 245), width=stroke)
    draw.line((cx, body_mid, 18.8 * scale, body_bottom), fill=(*WHITE, 245), width=stroke)

    # Check badge
    bx, by = 23.2 * scale, 23.2 * scale
    br = 3.6 * scale
    for i in range(int(br), 0, -1):
        t = 1 - i / br
        c = lerp_rgb(BADGE_TOP, BADGE_BOT, t * 0.6)
        draw.ellipse((bx - i, by - i, bx + i, by + i), fill=(*c, 255))
    draw.ellipse(
        (bx - br, by - br, bx + br, by + br),
        outline=(*WHITE, 190),
        width=max(1, round(0.55 * scale)),
    )
    draw.line(
        (21.5 * scale, 23.2 * scale, 22.6 * scale, 24.3 * scale, 25 * scale, 21.7 * scale),
        fill=(*WHITE, 255),
        width=max(1, round(1.2 * scale)),
        joint="curve",
    )

    # Sparkle
    sx, sy = 8.2 * scale, 8.8 * scale
    sparkle = max(1, round(0.9 * scale))
    draw.polygon(
        [
            (sx, sy - sparkle),
            (sx + sparkle * 0.4, sy),
            (sx, sy + sparkle),
            (sx - sparkle * 0.4, sy),
        ],
        fill=(*WHITE, 190),
    )
    draw.polygon(
        [
            (sx - sparkle, sy),
            (sx, sy - sparkle * 0.4),
            (sx + sparkle, sy),
            (sx, sy + sparkle * 0.4),
        ],
        fill=(*WHITE, 190),
    )

    return img


def main() -> None:
    PUBLIC.mkdir(parents=True, exist_ok=True)

    for name, size in {"logo192.png": 192, "logo512.png": 512}.items():
        draw_icon(size).save(PUBLIC / name, format="PNG")

    ico_sizes = [16, 32, 48]
    ico_images = [draw_icon(s) for s in ico_sizes]
    ico_images[0].save(
        PUBLIC / "favicon.ico",
        format="ICO",
        sizes=[(s, s) for s in ico_sizes],
        append_images=ico_images[1:],
    )

    draw_icon(32).save(PUBLIC / "favicon-32x32.png", format="PNG")
    draw_icon(16).save(PUBLIC / "favicon-16x16.png", format="PNG")
    print("Generated glassmorphism favicon assets in", PUBLIC)


if __name__ == "__main__":
    main()
