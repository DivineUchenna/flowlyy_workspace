---
name: ai-newsletter
description: Scrape AI news broadly across the web via Firecrawl, triage it into three tiers (major-model news / construction AI / everything else), and deliver the digest as a chat message. Runs every Monday at 8am via a scheduled task, but can also be run manually on request.
---

# AI Newsletter

Weekly AI situational-awareness digest, delivered straight into this chat —
never emailed, never saved to a file.

## Step 1: Load context

Before scraping or triaging, read:

- `CLAUDE.md` and `MEMORY.md` (working conventions + accumulated lessons)
- Everything in `context/`: `about-me.md`, `business-info.md`,
  `brand-voice.md`, `ideal-customer-profile.md`, `offer.md`, `values.md`

These define what "construction" means for the MIDDLE tier (Flowlyy's ICP:
self-performing construction companies, UK-primary — see
`ideal-customer-profile.md`) and what tone the final report should be
written in (`brand-voice.md`: plain English, short, bullets, no jargon).

## Step 2: Scrape AI news broadly

Use `firecrawl_search` with `sources: [{type: "news"}]` and **no
`includeDomains` restriction** — pull from the open web, not one outlet.
Bloomberg can and will show up naturally, but it must never be the only
source. Run several queries to get real breadth of coverage, at minimum:

1. A general AI query ("artificial intelligence news", "AI model") to
   catch whatever's dominating the week.
2. A query targeted at the big four labs by name (Claude/Anthropic,
   Gemini/Google, ChatGPT/OpenAI, Grok/xAI) — this is what actually feeds
   the TOP tier, since a generic query under-samples specific launches.
3. A query targeted at construction + AI ("construction AI",
   "contractors AI automation", "built environment artificial
   intelligence") — this is what feeds the MIDDLE tier.
4. A query scoped to X/Twitter specifically: `includeDomains: ["x.com",
   "twitter.com"]`, `sources: [{type: "web"}]` (X isn't reliably reachable
   via the `news` source type), query "artificial intelligence AI news".
   Treat X as a supplementary source, not a primary one — Firecrawl only
   surfaces whatever's already indexed, not live search, so coverage is
   patchy: some hits are just an account bio with stale links, not real
   post content. Only pull an X item into the digest if it has actual
   substance in the snippet (a real claim, name, or number) — skip bare
   account pages or link-only posts rather than stretching them.

Cover the period since the last run (the past week, Monday to Monday).
Dedupe overlapping hits across queries before triaging.

Before each of the four `firecrawl_search` calls, run `sleep` via Bash for
a random 3-5 seconds (e.g. `sleep $(( (RANDOM % 3) + 3 ))`) — a human
running these same searches wouldn't fire them back-to-back instantly.
This is about pacing like a person, not about evading anything: Firecrawl
is a legitimate, already-authorized search tool, and this doesn't touch or
bypass any bot-detection or CAPTCHA on the target sites — it's just query
spacing, same as the sleep between LinkedIn actions in the outreach skill.

If an article is paywalled, work from the headline and snippet the search
returns. Note in the report if an item couldn't be read in full rather
than guessing at its content.

## Step 3: Triage into three tiers

Every item that's genuinely AI-related gets kept and bucketed — this is
not a reject filter, it's a sort.

- **TOP — Major model news.** Scoped specifically to the big four:
  **Claude/Anthropic, Gemini/Google, ChatGPT/OpenAI, Grok/xAI.** New
  releases, capability jumps, benchmark claims, notable product changes
  from these four labs only.
- **MIDDLE — AI × Construction.** Anything connecting AI to construction
  companies, contractors, trades, or the built environment — check against
  `ideal-customer-profile.md` and `offer.md` for what's actually relevant
  to Flowlyy's world. This tier can double as raw material for Divine's
  construction-audience content, so keep the summary substantive enough to
  reuse, not just a headline restate.
- **LOW — Everything else AI.** Any other AI news: other labs (Llama,
  Mistral, DeepSeek, etc.), funding, regulation, general industry moves.
  Not necessarily relevant to Flowlyy — framed as "worth knowing," not
  "worth acting on."

## Step 4: Format and deliver in chat

Write the final report as a chat message, in `brand-voice.md` tone (plain
English, no corporate padding). Each item gets a real paragraph, not a
one-liner — enough that Divine can understand what actually happened
without clicking through. Every item must name its source outlet so he
knows where it came from:

```
# AI Newsletter — <date>

## Top — Model News (Claude / Gemini / ChatGPT / Grok)

**<Headline>** — *<Source outlet>, <date>*
<2-4 sentence paragraph: what happened, the concrete details (numbers,
names, what changed), and why it matters. Not a headline restate — actual
substance a reader can sit with.>

(repeat per item)

## Middle — AI × Construction

**<Headline>** — *<Source outlet>, <date>*
<2-4 sentence paragraph, same bar as above. This tier can double as raw
material for Divine's construction-audience content, so give it enough
substance to be reusable.>

## Low — Everything Else AI

**<Headline>** — *<Source outlet>, <date>*
<2-4 sentence paragraph, same bar as above.>
```

For an item sourced from X, cite it as `X / @handle` (or `X / <account name>`
if no handle is visible) instead of a generic outlet name, so Divine knows
it's a social post, not reported journalism.

If a tier comes back empty, say so plainly rather than padding it with a
weak or unrelated item. Don't stretch a thin snippet into a fake
paragraph — if the source only gave a headline and no real detail, say
that outright instead of inventing substance.

## Trigger

Runs automatically every Monday at 8am (local time) via a scheduled task
(see the `schedule` skill / scheduled-tasks MCP for the actual recurring
wiring — this SKILL.md only defines what happens when triggered). Can also
be run manually any time by invoking `/ai-newsletter`.

## Rules

- Never invent an item — only report what the scrape actually surfaced.
- Never restrict sourcing to a single outlet. The digest should read like
  a scan of the AI news landscape, not one site's coverage.
- X/Twitter hits are supplementary. Don't let a thin or ambiguous X post
  stand in for a real news item — if a claim only shows up on X with no
  corroboration, either skip it or flag explicitly that it's unverified
  social commentary, not reported news.
- Delivery is always as a chat message. Never email, never a saved file —
  if that ever needs to change, it needs an explicit new decision, not a
  silent extension of this skill.
- If the scrape comes back empty or fails outright, say so plainly in the
  chat rather than fabricating a digest.
