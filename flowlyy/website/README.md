# Flowlyy — Landing Page

Voice agents for trades and home services.

## Deploying

Only `site/` is served. It is self-contained — 7 files, ~176KB.

**Netlify (drag and drop):** drop the `site/` folder onto app.netlify.com. That's the whole deploy.

**Netlify (from this repo):** publish directory `site`, no build command.

`site/_redirects` contains `/*  /index.html  200` so deep links fall back to the page.

## Layout

```
index.html                 Source page (edit this)
site/index.html            Deployed copy — keep byte-identical to index.html
site/_redirects            Netlify SPA fallback
site/img/                  Images used by the page
flowlyy-logo*.svg          Horizontal lockups: ink, purple, white
Flowlyy Brand Assets/      Full mark kit (svg masters, png exports, favicons)
```

`index.html` and `site/index.html` are duplicates by design. **Edit `index.html`, then copy it over `site/index.html`** before deploying:

```sh
cp index.html site/index.html
```

## The mark

The logo is the Split Cell — a rounded hexagon cleaved by a wave into two halves.

Two optical builds, because the meaning lives in the gap:

| Build     | Gap | Use                                              |
|-----------|-----|--------------------------------------------------|
| `primary` | 15  | 24px and above — web, print, signage, social      |
| `small`   | 21  | Below 24px — favicons, 16px UI, embroidery        |

The nav and footer marks are inlined in the HTML as `fill="currentColor"`, so they
inherit `--ink` and follow any colour change without needing new files.

The favicon is an inline `data:` URI, so the page renders its icon with no file
dependency; `favicon.ico` and the Apple touch icon are also linked as fallbacks.

### Colour

| Token        | Hex       | Use                          |
|--------------|-----------|------------------------------|
| Flow Purple  | `#6D3BF5` | Primary brand colour          |
| Ink          | `#16121F` | Text, mono logo               |
| Signal Blue  | `#4FA8F5` | Marketing surfaces only       |
| Ember Orange | `#FF9A52` | Buttons and highlights only   |

The mark is always **one flat colour**. Never a gradient, never two-tone halves.

## Known gaps

- The wordmark in `flowlyy-logo.svg` is live text, not outlines — it depends on the
  viewer having SF Pro or Inter. Outline it before sending to a printer or sign maker.
- `img/business-meets-agents.png` is in an older retro style that doesn't match the
  current brand. Rework or remove it from the feed section.
