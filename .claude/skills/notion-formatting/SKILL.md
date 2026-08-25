---
name: notion-formatting
description: The structural formatting standard for any Notion page Claude writes or edits for Divine — empty blocks between content units, dividers between sections, heading conventions. Use whenever creating or updating Notion page content via the Notion MCP tools (notion-create-pages, notion-update-page), before writing the Notion-flavored Markdown content string.
---

# Notion Formatting

Divine's Notion pages read as spaced-out and scannable, not a wall of
Notion's normal tightly-packed default. This skill is the structural
rule set — apply it to the Markdown content string every time a Notion
page is created or updated, regardless of what the page is about.

Built from an example page Divine shared (a podcast-appearance prep doc)
and Notion's own Markdown spec.

## Step 0: Know the syntax

Notion page content is a Notion-flavored Markdown string (not standard
Markdown). The two structural pieces this skill depends on:

- **Empty block:** `<empty-block/>` on its own line, no other text on
  that line. Notion normally auto-spaces blocks and says this is "almost
  never" needed — Divine wants it anyway, deliberately, for a more open
  layout than Notion's default.
- **Divider:** `---` on its own line.

If anything about the Markdown syntax is unclear or a create/update call
errors on formatting, fetch `notion://docs/enhanced-markdown-spec`
through the Notion MCP `fetch` tool rather than guessing — don't
hallucinate syntax.

## Step 1: The section template

A **section** is everything under one heading. A **unit** is one
distinct content block within a section — a paragraph, a bullet list, a
callout, a table. A multi-item bulleted list is one unit, not one unit
per bullet.

Every section follows this shape:

```
<empty-block/>
### Section Heading
<empty-block/>
[unit 1]
<empty-block/>
[unit 2]
<empty-block/>
---
```

Concretely, from the reference example:

```
**Through-line:** AI is single-player right now. Skills are what make
it multiplayer, and almost nobody has worked out how to actually pass
one to another human being.

<empty-block/>

Second appearance on The Startup Ideas Podcast. When one person learns
something, everyone gets smarter at once.

<empty-block/>

---

<empty-block/>

### Format

<empty-block/>

- 25 min, screen-share heavy
- Problem gets fully articulated before the fix appears
- Open: live build or pre-recorded for the segment 5 demo

<empty-block/>

---

<empty-block/>

### 1. What a skill is (2 min)
```

Rules that fall out of this:
- A divider always sits between two `<empty-block/>` lines — never a
  bare `---` with no breathing room around it.
- Every heading is preceded by `<empty-block/>` (after the divider that
  closes the previous section, or at the very top of the page).
- Every heading is followed by `<empty-block/>` before its first unit.
- Units within a section are separated by a single `<empty-block/>` —
  never stacked (`<empty-block/><empty-block/>`) and never omitted.

## Step 2: Heading level and numbering

Use `###` (Heading 3) for section titles by default — Divine finds it
reads easier than Heading 2's heavier weight.

- **Sequential outlines only** (podcast plans, meeting agendas, scripts,
  anything with ordered, timed segments): number the heading and include
  the duration in parentheses — `### 1. What a skill is (2 min)`.
- **Everything else**: plain heading text, no number — `### Format`. Don't
  add numbering to a heading just because it's not the first section;
  numbering signals "these happen in this order for this long," not
  "these are section 1, 2, 3 of a document."
- The **section** (the divider-bounded unit from Step 1) is always `###`.
  If a section itself needs named sub-items (e.g. a "Products Built"
  section listing 8 individual products), those sub-items are `####` —
  one level below the section heading, not a peer of it. Don't use `##`
  on this kind of page; `###` is the section level, full stop.
- The one exception is a page that is genuinely several independent
  documents stacked under one Notion page (e.g. a single "AI Agency"
  page containing a separate niche doc, marketing-strategy doc, pricing
  doc, etc., each with its own internal sections) — there, each
  independent document's title is `##` and its internal sections are
  `###`, since those sections need to stay peers of the section level
  everywhere else.

## Step 3: Inline bold labels

When a paragraph opens by naming what kind of statement it is (a
thesis, a takeaway, a warning), bold that label inline rather than
making it its own heading:

```
**Through-line:** AI is single-player right now...
```

Use this for a genuine lead-in label, not as a way to bold the first
few words of every paragraph.

## Step 4: Highlighting

Don't highlight text automatically. Background-color spans
(`<span color="Color">text</span>`, e.g. `color="blue_bg"`) are powerful
precisely because they're rare — apply one only when Divine explicitly
asks for a line to be highlighted or emphasized that way, not as a
standing rule.

## Rules

- Apply this structure to every Notion page/section Claude creates or
  edits for Divine, regardless of topic — it's a standing formatting
  standard, not something to ask about per page.
- Don't over-nest: a bulleted list is one unit even with several items;
  don't wrap individual bullets in their own empty-blocks.
- If a page or update ever renders with dividers or spacing missing,
  re-check the Markdown string for a bare `<empty-block/>` line that had
  other text accidentally added to it — that's what silently drops it.
