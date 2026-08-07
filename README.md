# Cinemacity · Social Media Strategy 2026–27
### "The Room Makes The Movie" — interactive presentation

Prepared by INHAUS Digital, August 2026.

---

## Two ways to open it

**`Cinemacity-Strategy-2026-27.html`** (single file, 1.8 MB)
Everything inlined — CSS, JavaScript, all eleven font files and all thirteen images as data URIs. Zero external requests. Double-click it, email it, put it on a USB stick, present it on a plane. This is the one to send to the client.

**`cinemacity-2026/index.html`** (source folder)
The editable version. Same output, split into readable files. Double-clicking works here too — the scripts are classic (non-module) precisely so `file://` doesn't break. Also fine on any static host: Netlify, Vercel, S3, a plain folder on a server.

Edit the source folder, then run `node inline.js` to regenerate the single file.

---

## File map

```
cinemacity-2026/
├── index.html              Narrative frames. Each is a unique composition —
│                           edit the copy here, in place.
└── assets/
    ├── content.js    ←──   ALL editable strategy data. Start here.
    ├── strategy.css        Design system. Palette tokens at the top of :root.
    ├── fonts.css           @font-face declarations.
    ├── app.js              Rendering + navigation. Rarely needs touching.
    ├── fonts/              Albra Text + PP Monument, subset WOFF2, 145 KB.
    └── img/                Backgrounds, photography and the four final designs, WebP, 961 KB.
```

**The split, and why:** repeating components — pillars, reference films, design examples, platforms, metrics, the timeline, the calendar — are generated from data in `content.js`, so there is no duplicated markup to keep in sync. The narrative frames stay as HTML because each one is a one-off composition, and abstracting those into a config would make them harder to edit, not easier.

---

## Adding the Google Drive videos

Open `assets/content.js`, find the pillar in `PILLARS[]`, edit its `videos` array:

```js
videos: [
  {
    title:       'Sharjah has one IMAX. Here it is.',
    description: 'Room Spec — handheld, location said out loud twice.',
    format:      'TikTok · 9:16',
    platform:    'TikTok',
    credit:      '',                       // optional creator name
    thumbnail:   'poster.jpg',             // optional poster frame
    driveUrl:    'https://drive.google.com/file/d/1AbC.../view?usp=sharing',
    externalUrl: ''                        // optional reference link
  }
]
```

**Any of these Drive link formats work** — they are all normalised automatically:

| You paste | It becomes |
|---|---|
| `.../file/d/FILE_ID/view?usp=sharing` | `.../file/d/FILE_ID/preview` |
| `.../open?id=FILE_ID` | `.../file/d/FILE_ID/preview` |
| `.../uc?id=FILE_ID` | `.../file/d/FILE_ID/preview` |
| `.../file/d/FILE_ID/preview` | unchanged |
| A direct `.mp4` / `.webm` URL | plays natively |

Set Drive sharing to **"Anyone with the link"** or the embed will show a permission error instead of the film.

**Behaviour:** nothing autoplays and nothing preloads — videos load only when clicked. That is deliberate: an autoplaying video in a client meeting is a disaster, and preloading twelve films would make the page crawl. If an embed fails, the frame keeps its shape and shows the error rather than collapsing.

**As built:** twenty-three reference films, all live Google Drive links, all vertical 9:16 — Movies First 4 · Location & Experience 12 · Entertainment & Culture 3 · People & Moments 2 · Creator Seeding 2. No empty slots remain.

A film can carry an optional `group` field. Consecutive films sharing a group render under one small label, which is what keeps the twelve-film Location & Experience pillar from reading as an undifferentiated wall — it splits into Location (7), The experience (3) and Food (2). Films without a group just render straight into the grid.

Poster frames come from Drive's own thumbnail endpoint (`drive.google.com/thumbnail?id=…&sz=w480`), so they need a network connection. If one fails the frame keeps its shape and shows the play button on a textured bed — nothing breaks.

The grid is fixed at four columns rather than auto-fit, so a pillar with two films shows them at the same size as a pillar with four. A short row simply leaves space.

---

## The design examples

`VISUAL_SYSTEM_EXAMPLES[]` now holds four finished 4:5 feed posts — Find Your Cinemacity, Starlight, Fountain Views and Horror's Greatest Hits. All empty placeholders have been removed from the section.

To add another:

```js
{
  id: 'new-piece',
  title: 'Shown above the rationale',
  type: 'image',                      // or 'video'
  platform: 'Instagram',
  format: '4:5 feed post',
  aspectRatio: '4 / 5',               // drives the frame — no cropping
  pillar: 'Movies First',
  assetUrl: 'assets/img/dsg-new.webp',
  alt: 'Description for screen readers',
  rationale: 'What this proves about the system.'
}
```

The gallery is a two-up grid, so it reads best with an even number. Mixed aspect ratios still work — each card gets a real `aspect-ratio` container, nothing is cropped to fit — but four matched 4:5 posts is what it is tuned for.

---

## Placeholder tokens still in the deck

Every unfilled slot is deliberately visible and labelled. Search for these:

| Token | Where | What it needs |
|---|---|---|


The design gallery has no placeholders left — all four pieces are final artwork. None of the video tokens are visible on screen either; unfilled reference-film slots show a designed frame with the expected ratio.

---

## Presenting it

| Control | Action |
|---|---|
| Scroll | Normal |
| `↑` `↓` or `J` `K` | Jump frame to frame |
| `Home` / `End` | First / last frame |
| Index button (top right) | Full chapter index, jump anywhere |
| `Esc` | Close the index |

The left rail shows the current frame and chapter; the top bar shows where you are. Nothing is hidden behind hover or interaction — every headline reads without clicking, which matters when someone scrolls through it alone after the meeting. Works in full-screen browser mode. Print stylesheet included, if anyone insists on paper.

---

## Design system

**Palette** — all tokens live at the top of `:root` in `strategy.css`. Swap them there to rebrand.

- Base near-black `#08080a`, bone `#ece7dd` for the light editorial frames
- **Cinemacity green `#256D58`** — the brand colour, with a clear job: it is the accent on every light frame (5.0:1 on bone), and it grounds the positioning frame outright. `--brand-lt #4fa78b` carries it onto dark frames, where the pure green only reaches 3.25:1 and the tint clears 6.9:1
- Projector amber `#f0b152` — the projection light, and the accent on dark frames. Green and amber never do the same job, so neither dilutes the other
- Red `#e2452c` used **only** for the one point in the booking journey where attention drops
- Every pairing above was checked numerically against WCAG AA

**Type** — Cinemacity's own faces, subset and bundled locally (11 faces, 145 KB total):

- **Albra Text** — titles, statements, pillar lines. Light at display sizes, Regular and Italic below.
- **PP Monument** — body, UI, everything else. Ships Light / Regular / Black only, so the CSS maps 300→Light, 400+500→Regular, 700+900→Black; a `font-weight: 600` resolves up to Black by design.
- **PP Monument Condensed** — big headings, stat figures, and the labels that used to be monospaced. Set in caps with wide tracking it does the same job in the brand's own voice.

⚠️ **The Albra files supplied are TRIAL cuts.** Licensed versions must replace them before this is hosted publicly. Same filenames in `assets/fonts/`, no code change needed.

**Concept** — the platform is *the room*; a film frame *is* a room; so the deck is a vertical strip of frames on a perforated rail. Film language drives structure and navigation, not decoration. There are no clapperboards, popcorn or reel illustrations anywhere in the codebase.

**Structure** — six chapters, twenty-two frames. Chapter 1 where we are · 2 the direction · 3 the work · 4 the look · 5 from views to tickets · 6 making it work.

**Pillars** — Movies First · Location & Experience · Entertainment & Culture · People & Moments · Creator Seeding. Location & Experience carries both the rooms and the F&B, with two recurring formats each.

**Imagery** — three devices, all configured in `IMAGES`, `PILLAR_IMAGES` and `EXPERIENCE_STRIP` in `content.js`. Frame backgrounds sit behind hero frames under a measured scrim; pillar banners give rhythm to the five long sections; the experience strip drifts slowly between chapters and pauses on hover. Every photo has a `pos` focal point so wide crops keep their subject. Nothing sits behind raw text — every scrim was checked against the type on it. Parallax is transform-only and disabled entirely under `prefers-reduced-motion`.

**Production plan** — `MONTHLY_PRODUCTION` holds the volumes: six brand Reels a month travelling across four platforms, fifteen Instagram posts, four creator posts, eight YouTube Shorts, and in-venue Snapchat.

**Platform cadence** lives in `PLATFORMS[]` (`cadence`, `mix`, `owner` fields) and is summarised in `WEEKLY_OUTPUT`. The Snapchat brief is a separate object, `SNAPCHAT` — week, rules, setup, workflow and measurement — written so it can be handed to Cinemacity's marketing executive and followed without us in the room.

---

## Tested

Verified in headless Chromium at 1440 / 1280 / 834 / 390 / 360 px:

- No console errors, no page errors, no failed requests
- No horizontal overflow from 360 px to 1440 px
- Zero heading-level jumps; one `h1`; all images have `alt`; all buttons labelled
- Keyboard navigation, index open/close, focus trap, `Esc` to close
- `prefers-reduced-motion` respected — every reveal element renders immediately
- All Drive URL formats normalise correctly; malformed links fail safe
- Fonts load over both `file://` and `http://`
- Standalone build makes **zero** external requests; no broken images at any breakpoint

---

## Notes for us, before this goes out

Not in the deck — these are ours to resolve.

1. **Content access.** Chapter 1 and the First Look pillar refer to Cinemacity's closeness to film content without naming anyone or claiming anything specific. It is written as an opportunity to map together, not as a fact. Worth a conversation before the meeting so we know how far to push it live.
2. **Reference films and design examples.** Twelve video slots and ten gallery slots, all swappable from `content.js`.
3. **Paid budget.** The media model is structured but deliberately unbudgeted.
4. **Competitor numbers.** No follower counts anywhere. Platforms block automated verification and estimated figures in front of a client are not worth the risk — the competitive table compares positioning and footprint instead.
5. **Booking observations.** Chapter 5 covers five things only, in plain language, framed as what would make the content work harder. Nothing claims to have been formally tested.

---

## Rebuilding the single file

```bash
node inline.js
```

Inlines the CSS, JS and all six font files as base64, then runs an integrity check. It uses function replacers throughout, not string replacements — a string replacement interprets `$$` as a literal `$`, which silently rewrote the `$$` DOM helper and broke an earlier build. The check at the end of `inline.js` exists so that cannot happen again unnoticed.
