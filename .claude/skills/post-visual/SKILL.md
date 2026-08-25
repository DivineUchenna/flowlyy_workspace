---
name: post-visual
description: Turn a finished LinkedIn/X/Instagram script (e.g. content-pipeline output) into a matching visual, built on the Paper design canvas. Draft several headline/visual variants first, then refine the chosen one into a final platform-sized image. Use when Divine has a finished post script and wants an image to go with it.
---

# Post Visual

Turn a finished post script into a visual, using Paper (the `paper-desktop` plugin,
MCP server `paper`) as the design surface. Never skip straight to a final design —
always produce a small set of draft variants first and get Divine to pick one.

## Required input

1. The finished script/copy (or the specific platform version of it).
2. Which platform(s) it's for — LinkedIn, X, Instagram, or more than one.

If the script isn't finished yet, say so and point back to the content-pipeline
skill/plugin rather than inventing copy here. This skill designs around a script,
it doesn't write one.

## Prerequisite: Paper must be running

Paper's MCP tools are served by the Paper Desktop app at `http://127.0.0.1:29979/mcp`
— they only exist while the app is open with a file. Before doing anything else:

1. `ToolSearch` for `mcp__paper__*` (or similar — the exact prefix depends on how
   the server registers) to see if Paper's tools are live.
2. If nothing turns up, tell Divine: "Open Paper Desktop with a file, then tell me
   to continue" — and stop. Do not fall back to building the design as a plain
   Artifact/HTML file instead; the whole point of this skill is the Paper canvas.

## Style blueprints

Two reference images live in `references/`. Read whichever one(s) apply before
designing — both are Divine-approved, not hypothetical directions.

**1. `style-blueprint.png`** — a page of YouTube-thumbnail iterations from
Divine's own Paper canvas. This is the **default** for general content-pipeline
posts (news takes, contrarian stats, educational value content). Confirmed
2026-08-26 as the exact style to keep using — the "AI in Construction" draft
set built from it was approved with no changes requested. Pattern:

- Plain white (or very light) background.
- A large, bold, dark sans-serif headline, 2 lines max, left-aligned.
- One key word or phrase in the headline gets a real underline rectangle in a
  single accent color (blue) placed beneath it — that's the one thing the eye
  should catch first. **Build this as its own shape, not inline text styling**
  (see the Paper text-formatting note below) — put the phrase to underline on
  its own line/block so a thin accent-colored rectangle can sit under it at
  that block's exact width.
- A supporting graphic panel to the right (or below, for square/portrait crops):
  a small illustrative composition relevant to the concept — a browser-window
  mockup, a folder, an icon cluster, a sticky note, an invoice card, a stat
  ring. Not a literal photo, not decorative for its own sake — it should
  visually represent the specific idea the headline names.
- Every variant in a draft set shares the exact same composition and only the
  headline wording (and its matching graphic) changes.

**2. `style-blueprint-2-course-landing.png`** — a screenshot of Divine's "The AI
Course" landing page. Use this style specifically for **offer/course/promo**
posts (a paid product, a reservation deadline, a price) — anything selling
something directly, as opposed to general value/educational content. Pattern:

- Plain white background, but a monospace/pixel display font for the headline
  (not the clean sans-serif of style 1) — techy, dev-tool register.
- Emphasis via **highlight blocks**, not underlines: a soft lavender background
  behind a phrase (e.g. a benefit like "10X"), or a solid accent-blue background
  with white text for a hard callout (e.g. "save $800"). Build each as its own
  rectangle behind/around the phrase's own text block, same reasoning as the
  underline note above — Paper can't do inline mixed text styling.
- A small pill-shaped label above the headline: a colored dot + monospace
  caption text, thin border, rounded ends (e.g. "● the self-paced course ·
  drops within 30 days").
- A supporting graphic as a **tilted card mockup** (e.g. a pricing card) with a
  layered accent-color edge/shadow behind it for depth, angled a few degrees
  rather than sitting flat.
- Same white ground, but the accent reads more indigo/blue than style 1's
  sky-blue.

If Divine's request doesn't make it obvious which style fits, ask rather than
guessing — the two are different enough that the wrong pick means a redo.

### Paper text-formatting limitation (learned 2026-08-26)

Paper's Text nodes do not support rich text — an inline `<span style="...">`
inside a text block for a color/underline accent gets silently flattened away
on render (confirmed via get_jsx and screenshot both showing no formatting).
Any partial-text styling (underline, highlight background, color change on
one word) must be built as a **separate shape node**, not inline span styling:
put the phrase to style on its own line/block (`display:flex; flex-direction:
column; width:fit-content`) and add a sibling rectangle sized to that block's
width — for an underline, a thin rect below it; for a highlight, a rect behind
it sized to match. This may mean lightly rewording a headline so the phrase to
emphasize can stand on its own line.

## Process

1. **Extract 3–4 headline candidates** from the script — the sharpest single line
   or stat (e.g. "day 15 instead of day 53", "only 5.5% see real ROI"). Vary the
   phrasing, not the underlying claim. Don't invent a claim the script doesn't make.
2. **Build a draft set in Paper**: one artboard per headline candidate, all using
   the exact same composition (see blueprint above) and the same placeholder
   supporting graphic — sized for the target platform (see sizes below). This is
   the draft; keep it rough, the point is comparing headlines, not polishing.
3. **Show Divine the draft set** (screenshot each artboard via Paper's read
   tools) and ask which headline wins, or whether none of them land.
4. **Refine the chosen artboard only**: finalize the supporting graphic so it's
   specifically relevant to that headline's concept, tighten spacing/typography,
   confirm colors.
5. **Export the final artboard** as an image and hand it to Divine for review.
   Nothing gets posted from this skill — it only produces the file.

## Platform sizes

- LinkedIn feed image: 1200×627
- Instagram: 1080×1350 (portrait feed) — use 1080×1080 if Divine asks for a
  carousel instead of a single image
- X: 1600×900

Ask before assuming which platform(s) if the request doesn't say.

## Output format

Deliver the final image file(s) via SendUserFile, one per platform requested.
Name files by platform and a short slug (e.g. `linkedin-ai-hype-vs-pays.png`).
Don't send the rough draft artboards as files — those are shown as in-conversation
screenshots for Divine to react to, not deliverables.

## Self-improvement loop

At the end of every run of this skill, before ending the turn, review the run:

- Did any step fail, or did you need to work around something?
- Did you behave differently than this file describes?
- Did the user correct, reject, or meaningfully rework something this skill produced?
- Did you discover something a future run needs (e.g. the real Paper MCP tool
  names, a brand color Divine gave you, a platform size that was wrong)?

If yes to any of those, the fix is one of:
- A change to this file
- A workaround worth recording
- A better sequence for future runs

**The bar:** propose an update only if it will change what a future run accurately
does, or prevent a repeated or real mistake. No cosmetic tweaks, no hypothetical
improvements, no flagging for its own sake. Most runs should end with nothing to
propose.

If nothing clears the bar, end the run normally — no comment needed.

If something clears the bar, end the run with:

> Proposed update to this skill: [one line — what changes and why]

Wait for approval. On approval, edit this SKILL.md in place to make the change —
don't append a changelog, update the relevant section directly.
