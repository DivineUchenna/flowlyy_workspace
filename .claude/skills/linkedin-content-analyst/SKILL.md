---
name: linkedin-content-analyst
description: Check whether an AI or construction-industry news item is worth posting about for a construction-company audience, and break down the structure of high-performing LinkedIn posts (title, hook, format, angle). Use when Divine wants to know if a news item has genuine value for his niche, or wants a post's structure analysed to inform his own content.
---

# LinkedIn Content Analyst

Two jobs, unrelated to the construction lead-gen pipeline: filter what's
worth posting about, and break down why a post that already works, works.

## Required input

One of:
- An AI or construction-industry news item to evaluate
- A post to analyse — screenshot, link, or pasted text

**Never ask a follow-up question when a post is provided directly.** Infer
the angle from what's given. This is looser than `write-opener`'s "ask if
a required input is missing" rule, because here Divine is the one
supplying the material, not the skill inferring facts about a third party.

## Step 1: Value-check gate (news items only)

Default is REJECT, same discipline as `qualify-lead`. A news item earns a
PASS only if it connects to something a construction director would
actually feel — their quotes, subcontractors, cashflow, missed calls,
certifications. Generic "AI is advancing" content fails this regardless
of how interesting the news itself is.

## Step 2: Pattern analysis (posts only)

Extract, per post:
- Title length and structure
- Image use
- Number/bracket use in the hook
- Power words
- Capitalisation pattern
- Underlying angle: curiosity gap / benefit-first / contrarian /
  myth-busting / number-based / comparison

## Sourcing

**Default, everyday method:**
- Firecrawl searches for publicly published analysis of what works on
  LinkedIn (marketing blogs, "what makes B2B posts perform" roundups)
- Divine directly supplying screenshots, links, or pasted text of posts
  he finds compelling in his own feed

**Apify LinkedIn scraper — permitted, narrowly scoped:**
Divine has explicitly authorised using an Apify LinkedIn scraper for this
skill specifically, as an override to the standing no-LinkedIn-scraping
rule used everywhere else in this project (see `qualify-lead` and
`construction-analyst`, where that rule still applies unchanged).

This override comes with one hard constraint: **occasional, manually-
triggered pulls only. Never wired into a scheduled or automated job, under
any circumstance, without a fresh explicit conversation about it first.**
The reasoning: LinkedIn's bot-detection targets *patterns* of automated
access — a recurring scraper is what actually gets flagged and blocked; an
occasional manual pull carries meaningfully less risk. If asked to
schedule or automate this, decline and explain why, rather than treating
the earlier authorisation as covering it.

## Targeted creator list

Identify AI/solopreneur/no-code LinkedIn creators worth watching via
Firecrawl's public "who to follow" content (listicle articles, roundups) —
not by searching or scraping LinkedIn directly for this step. From there,
Divine checks their actual posts himself and supplies ones worth
analysing, same pattern as the default sourcing above.

## Output format

```
VERDICT: PASS | REJECT              (news items only)
REASON: <why>

POST STRUCTURE:                     (posts only)
TITLE: <length, structure>
IMAGE: <used / not used, type>
NUMBERS/BRACKETS: <examples>
POWER WORDS: <examples>
CAPITALISATION: <pattern>
ANGLE: <curiosity gap / benefit-first / contrarian / myth-busting /
        number-based / comparison>
```

## Rules

- Never scrape or search LinkedIn for anything in this skill except via
  the narrowly-scoped, manually-triggered Apify path above — and never
  automate that path.
- The construction lead-gen pipeline's no-LinkedIn-scraping rule is
  separate and unaffected by anything in this skill.
