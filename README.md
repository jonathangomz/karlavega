# Artist Portfolio

A minimalist portfolio site for a visual artist, built with [Astro](https://astro.build).
Everything currently shown is placeholder content.

## Running it

```bash
npm install   # only needed the first time
npm run dev   # http://localhost:4321
npm run build # static site into dist/
```

## Structure

```
src/
  components/   Header, Footer, LanguageSwitcher, WorkCard, WorkGrid, Pagination
  layouts/      BaseLayout.astro — html shell, header + footer
  pages/
    [...lang]/          one file serves both languages (see below)
      index.astro         /            latest work + the 3 before it
      works/[...page].astro  /works, /works/2 …  all works, 9 per page
      works/[slug].astro     /works/quiet-hours  single work
      about.astro         /about
      cv.astro            /cv
      contact.astro       /contact
  styles/       global.css — design tokens, reset, shared helpers
                (per-component styling lives in each .astro file)
  content/
    works/      one markdown file per artwork (`_example.md` is a template)
    cv/         one markdown file per CV entry (`_example.md` is a template)
  i18n/ui.ts    every piece of translatable interface text, EN and ES
  data/site.ts  name, logo mark, email, portrait, social links, nav, per-page
  lib/works.ts  sorting, translation fallback + image helpers
  content.config.ts  the frontmatter schema for both collections
```

## Languages

The site is English by default and Spanish under `/es/`:

| English | Spanish |
| --- | --- |
| `/` | `/es` |
| `/works`, `/works/2` | `/es/works`, `/es/works/2` |
| `/works/quiet-hours` | `/es/works/quiet-hours` |
| `/about`, `/cv`, `/contact` | `/es/about`, `/es/cv`, `/es/contact` |

The EN/ES dropdown sits at the right of the top menu and links to the page you
are currently on in the other language.

Every route lives once, in `src/pages/[...lang]/`, and is built twice — the
`[...lang]` parameter is `undefined` for English (no prefix) and `'es'` for
Spanish. Interface text comes from `src/i18n/ui.ts`; add a key to both `en` and
`es` and read it with `t('my.key')`.

## Adding a work

Copy `src/content/works/_example.md` to a new file in the same folder. The
filename becomes the URL (`long-grass.md` → `/works/long-grass`). Files whose
name starts with `_` are ignored, so the template never appears on the site.

```markdown
---
title: "Long Grass"
medium: "Oil on canvas"
year: 2023
size: "160 x 130 cm"
summary: "Optional. Shown as the last row of the info table."
date: 2023-10-17        # sort key — newest first everywhere
imageWidth: 1200        # optional, used by the placeholder
imageHeight: 1450
# image: /works/long-grass.jpg   # optional, see below
# draft: true                    # hide without deleting
es:                       # optional Spanish version of any of the above
  title: "Hierba alta"
  medium: "Óleo sobre lienzo"
  summary: "..."
---
```

Write the entry in English; add an `es:` block to translate it. Any field left
out of `es:` falls back to the English one, so a work with no `es:` block still
shows up on the Spanish site.

Works are ordered by `date`, newest first. The newest one is the large image on
the home page; the next three appear below it. The works page paginates at 9 per
page — change `WORKS_PER_PAGE` in `src/data/site.ts`.

## Images

While there are no real images, each work renders a placeholder from
`https://placehold.co`, sized from `imageWidth` / `imageHeight` and labelled with
the work's title.

To use a real image, put the file in `public/works/` and point at it:

```yaml
image: /works/long-grass.jpg
```

The placeholder URL is built in one place — `workImage()` in
[src/lib/works.ts](src/lib/works.ts) — so swapping the service (or dropping
placeholders entirely) is a single edit.

The About page portrait works the same way: `portrait` in `src/data/site.ts`
points at `/karla-vega.jpg` in `public/`. To swap it, drop the new file in
`public/`, update `portrait`, and set `portraitWidth`/`portraitHeight` to the
new image's pixel size. Setting `portrait` to `''` brings the placeholder back.

## Adding a CV entry

One markdown file per line of the timeline, in `src/content/cv/` — copy
`_example.md` there. The CV page shows a short "published soon" line
(`cv.empty` in `src/i18n/ui.ts`) while the folder is empty.

```markdown
---
title: "Quiet Hours"
year: "2025"                  # free text, so "2017–2019" works too
venue: "Gallery Placeholder"
location: "City, Country"
category: "solo"              # solo | group | residencies | education
date: 2025-09-01              # sort key within the group
description: "Optional line under the venue."
es:                           # optional, same fallback rule as works
  title: "Horas quietas"
  venue: "Galería Placeholder"
  location: "Ciudad, País"
---
```

The four category keys are translated in `src/i18n/ui.ts` (`cv.solo`,
`cv.group`, `cv.residencies`, `cv.education`). Any other value is shown exactly
as written, in both languages.

## Logo

The mark in `public/logo.png` appears to the left of the name in the header and
beside the copyright line in the footer. Both come from `mark` in
`src/data/site.ts` — swap the file and the `markWidth`/`markHeight` values to
change it, or set `mark: ''` to show the name on its own.

## Still to do

All placeholder content has been removed. What is real: the artist name, email,
social links, the About portrait and bio (both languages), and one work —
*Nacimiento submarino* (2025).

What is still outstanding:

- `src/content/works/` — only one work so far; pagination kicks in at 10
- `src/content/cv/` — empty, so the CV page shows a placeholder line
- `src/i18n/ui.ts` — `site.tagline` ("Visual artist" / "Artista visual") is a
  generic subtitle; change or remove it
- `astro.config.mjs` — `site` must be the real domain before deploying
- `public/favicon.svg` — still the default mark
