# Rug Image Requirements — CØSMIX

Place your rug photo in this folder as `rug.jpg`.

Then open `styles.css` and find this block in `.rug-bg`:

```css
/* ── YOUR RUG PHOTO (remove comment when file is added) ──
   url('rug.jpg'),
*/
```

Remove the comment markers so it reads:

```css
url('rug.jpg'),
```

Also update `background-size` in the same block from:
```css
background-size: 80px 80px, cover;
```
to:
```css
background-size: cover, 80px 80px, cover;
```

---

## Photo Specification

### Shot setup
- **Camera angle**: Directly overhead — 90° straight down, no perspective tilt.
  Even a 5° angle creates a foreshortened edge that looks wrong when tiled.
- **Frame fill**: The rug must fill every edge of the frame. No floor, no wall,
  no furniture legs visible. Crop tight.
- **Orientation**: Portrait (taller than wide) is ideal — fills a phone screen
  more naturally. Landscape works fine since `background-size: cover` handles
  cropping automatically.

### Technical specs
| Property | Minimum | Recommended |
|---|---|---|
| Width | 1500 px | 2400 px+ |
| Height | 2000 px | 3200 px+ |
| Format | JPG (≥80% quality) | JPG (95%+) or PNG |
| Colour space | sRGB | sRGB |
| File size | — | Under 2 MB for fast load |

### Lighting
- Diffuse, even lighting across the whole surface.
- Avoid: window light casting a diagonal shadow, overhead single-bulb hotspots,
  or harsh shadows from furniture.
- A cloudy-day window is ideal. Professional flatbed scan of a rug swatchbook
  is perfect.

### Pattern considerations
- **Repeating/geometric** patterns (Herati, Tabriz lattice, Tekke gul) work
  best because there is no single centrepiece that looks odd at the sides.
- **Medallion** centre-piece rugs will work but the single large medallion will
  be off-centre on some screen sizes — this can look intentional and gritty.
- **Colour**: Deep crimson, burgundy, or navy base tones photograph beautifully
  under the existing wear and stain overlays. Pale/pastel rugs will wash out.

### Runner rugs (long narrow rugs)
A hallway runner is thematically perfect for this scroll layout.
- If narrower than the viewport, the browser will show the
  `background-color: #6e1510` on the sides — this can look
  like the floorboards beyond the rug edge, which works well.
- Or set `background-size: 100% auto` to stretch it full width
  and let it repeat vertically.

---

## Quick checklist before uploading
- [ ] Shot directly from above (no angle)
- [ ] Rug fills entire frame edge to edge
- [ ] Even lighting, no harsh shadows
- [ ] File named exactly `rug.jpg` (lowercase)
- [ ] Placed in same folder as `index.html`
- [ ] CSS comment removed and `background-size` updated (see above)
