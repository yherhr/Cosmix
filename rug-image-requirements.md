# Rug Image Requirements — CØSMIX (Scrolling Floor)

The rug is now `position: absolute` — it lives inside the page and
scrolls with it. Your photo needs to cover the **full length of the page**,
not just one screen. There are two ways to achieve this.

---

## Two approaches

### Approach A — Seamlessly tiling image (recommended)
Photograph a section of rug that can tile top-to-bottom without a visible seam.
The CSS will repeat it vertically as the page grows.

This is the recommended approach because:
- The file stays small (under 1 MB)
- The rug extends infinitely regardless of page length
- Works perfectly on all screen sizes

**How to enable tiling in styles.css:**

Find `.rug-bg` and make these three changes:

1. Uncomment the image line:
   ```css
   url('rug.jpg'),
   ```

2. Change `background-size` from:
   ```css
   background-size: 80px 80px, cover;
   ```
   to:
   ```css
   background-size: 100% auto, 80px 80px, cover;
   ```

3. Change `background-repeat` from:
   ```css
   background-repeat: repeat, no-repeat;
   ```
   to:
   ```css
   background-repeat: repeat-y, repeat, no-repeat;
   ```

### Approach B — Single very tall image
Provide one image tall enough to cover the entire page.
Typical page height is 5000–8000px. A safe minimum is 6000px tall.

**How to enable a single tall image in styles.css:**

1. Uncomment the image line

2. Change `background-size` to:
   ```css
   background-size: 100% auto, 80px 80px, cover;
   ```

3. Leave `background-repeat` as-is (the image won't repeat if tall enough)

---

## Photo specification

### Shot setup
- **Camera angle**: Directly overhead — 90° straight down. No tilt.
  Even 5° of angle creates a foreshortened edge that looks wrong when tiled.
- **Frame fill**: The rug fills every edge of the frame.
  No floor gaps, furniture legs, or shadows at the border.
- **Orientation for Approach A**: Portrait (taller than wide), or square.
  The browser stretches the image to 100% width, so the pattern
  proportions only matter for how the repeat looks at the seam.
- **Orientation for Approach B**: Portrait, as tall as possible.

### Technical specs

| Property | Approach A (tiling) | Approach B (single tall) |
|---|---|---|
| Width | 1500 px min / 2400 px ideal | 1500 px min / 2400 px ideal |
| Height | 1500–3000 px | 6000 px minimum |
| Format | JPG 90%+ or PNG | JPG 90%+ or PNG |
| File size | Under 800 KB | Under 3 MB |
| Colour space | sRGB | sRGB |

### Making a seamless vertical tile (Approach A)
The critical requirement: the **bottom edge of the image must match the top edge**
so the repeat is invisible.

How to achieve this:
1. In Photoshop: Filter → Other → Offset. Set vertical offset to half the image
   height. The seam moves to the centre of the image where you can paint it out.
2. In GIMP: Script-Fu → Filters → Map → Tile (make seamless in one direction).
3. Alternatively: photograph a section of rug with a completely consistent
   pattern (like a tight geometric repeat with no medallion) — fine geometric
   patterns tile almost seamlessly with no editing.

### Lighting
- **Diffuse and even** across the entire surface.
- Avoid: single overhead bulb (hotspot centre), window light (diagonal shadow),
  flash (flat reflection if the rug has a pile sheen).
- Best: overcast daylight, or a lightbox setup with two softboxes at 45°.

### Pattern considerations

**Best for Approach A (tiling):**
- Tight all-over repeat patterns: Herati, Tabriz lattice, Tekke gul grid,
  Mina Khani, Boteh (paisley) all-over.
- Avoid single large medallions — the centrepiece interrupts the tile.

**Works fine for Approach B (single image):**
- Any pattern including medallion rugs.
- Runner rugs (long narrow) are thematically perfect — photograph from above
  and the portrait orientation naturally suits the vertical page layout.

**Colour:**
- Deep base tones (crimson, navy, forest green, dark burgundy) look best
  under the wear/stain overlays which are calibrated for dark rug colours.
- Pale/ivory rugs will read through the CSS damage overlays differently —
  the stain rings may be barely visible on light backgrounds.
  If using a pale rug, reduce opacity on `.rug-stain--a`, `--b`, `--c`
  and increase opacity on `.rug-wear--path` to compensate.

---

## Quick checklist

- [ ] Shot directly from above — no angle
- [ ] Rug fills every edge of the frame
- [ ] Even lighting, no shadows
- [ ] Seam-matched top/bottom if using Approach A
- [ ] Minimum 1500 px wide
- [ ] File named exactly `rug.jpg` (lowercase, no spaces)
- [ ] File in same folder as `index.html`
- [ ] Three CSS changes made in `.rug-bg` (see above)
