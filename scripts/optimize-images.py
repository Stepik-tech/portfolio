#!/usr/bin/env python3
"""Optimize screenshots: resize large ones, compress, get dimensions."""
from PIL import Image
import os
import json

SRC_DIR = "/home/z/my-project/public"
MAX_WIDTH = 1600  # cap width for web
QUALITY = 88

shots = [
    "rErK3kC.png", "Ccih1z0.png", "LCzK2Jz.png", "ZN5Xc6Z.png", "affwX95.png",
    "OoxGqTq.png",
    "mono-1-profile.png", "mono-2-posts.png", "mono-3-bp.png",
    "mono-4-friends.png", "mono-5-reports.png", "mono-6-game.png", "mono-7-end.png",
]

dimensions = {}

for fname in shots:
    src = os.path.join(SRC_DIR, fname)
    if not os.path.exists(src):
        print(f"MISSING: {fname}")
        continue
    im = Image.open(src)
    w, h = im.size
    print(f"{fname}: original {w}x{h}")

    # Resize if too wide
    if w > MAX_WIDTH:
        new_h = int(h * MAX_WIDTH / w)
        im = im.resize((MAX_WIDTH, new_h), Image.LANCZOS)
        print(f"  → resized to {MAX_WIDTH}x{new_h}")

    # Save optimized (convert to RGB if needed, save as PNG with optimization)
    if im.mode != "RGB":
        im = im.convert("RGB")
    im.save(src, "PNG", optimize=True)
    dimensions[fname] = {"w": im.size[0], "h": im.size[1]}

# Save dimensions for use in components
with open("/home/z/my-project/scripts/dimensions.json", "w") as f:
    json.dump(dimensions, f, indent=2)

print("\n=== Final dimensions ===")
print(json.dumps(dimensions, indent=2))
