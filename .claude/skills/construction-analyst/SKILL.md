---
name: construction-analyst
description: Deep-dive research on a construction company that has already passed qualify-lead — business model, operating model, core value prop, flagship project, the strongest AI-automatable pain point, and the named decision-maker. Use when given a qualified lead and asked to research, profile, or build an outreach angle for a specific construction company.
---

# Construction Analyst

Research a company that has already cleared `qualify-lead`. The output of
this skill is what `write-opener` or the email-draft step personalises
against — it has to be evidence-based, not generic.

## Input

Company name + website URL, already qualified. If qualify-lead hasn't been
run on this company, run it first — this skill assumes a PASS or
UNCERTAIN-with-enough-evidence, not a REJECT.

## Step 1: Site scrape

Apify website-content actor (e.g. `apify/website-content-crawler`), scoped
to homepage + About/Services/Projects/Case-studies — 3-5 pages max. Don't
crawl the whole site.

## Step 2: Extract five fields

All five are required. If the evidence isn't there, say so — never invent
a detail to fill a gap, same discipline as `qualify-lead`.

- **BUSINESS SUMMARY** — what they actually do, one sentence.
- **OPERATING MODEL** — self-performing vs. subcontracting, trades
  covered, project types.
- **CORE VALUE PROP** — what they lead with on their own site:
  accreditations, safety record, speed, tier-1 status, stated values.
- **FLAGSHIP PROJECT** — their most-featured or best project, with the
  specific detail (client, scale, outcome) that makes it citable in an
  opener. If the site doesn't clearly state one, say "not found on site —
  needs manual research" rather than picking a plausible-looking project.
- **AI PAIN POINT** — the single most defensible automation opportunity,
  tied to something actually observed (a live hiring ad for a Contracts
  Administrator, a stated project volume, a described admin process) —
  never a generic "construction companies struggle with X". Must map to
  one of Flowlyy's six offers in `context/offer.md`. If nothing found
  maps cleanly, say "no clear match" — do not force-fit one.

## Step 3: Decision-maker

Pull forward from `qualify-lead`'s DECISION MAKER and LINKEDIN fields.
Do not re-search — reuse what's already been found.

If a personal press mention beyond the site would sharpen personalisation
(an interview, an award, a conference-speaker bio), search for it via
Firecrawl on "[name] + [company]" — public press and editorial content
only. **Never search or scrape LinkedIn for this** — the decision-maker's
LinkedIn is only ever the one already found (or not found) via the
company's own site in `qualify-lead`.

## Step 4: Trade detection

Record the detected trade (scaffolding, roofing, general contractor,
etc.) as its own field. This doesn't gate anything — it's for
`write-opener`'s "trade + certifications" requirement and for the
scaffolding/roofing accreditation bonus check already run in
`qualify-lead`.

## Output format

```
COMPANY: <name>
TRADE: <detected trade>
BUSINESS SUMMARY: <one sentence>
OPERATING MODEL: <summary>
CORE VALUE PROP: <summary>
FLAGSHIP PROJECT: <detail, or "not found on site — needs manual research">
AI PAIN POINT: <specific opportunity + evidence, mapped to one Flowlyy offer, or "no clear match">
DECISION MAKER: <name, title>  (carried forward from qualify-lead)
LINKEDIN: <profile URL, or "not found on site">  (carried forward, never re-searched)
PERSONALISATION NOTE: <press/interview detail if found via Firecrawl, or "none found">
DATE RESEARCHED: <date>
```

## Rules

- Never invent evidence. Missing data is reported as missing, not
  estimated from tone or guessed from industry norms.
- Never scrape or search LinkedIn under any circumstance in this skill —
  the decision-maker's LinkedIn status is fixed at whatever `qualify-lead`
  already found.
- One AI pain point, not a list. If several plausible offers seem to fit,
  pick the one with the strongest single piece of evidence rather than
  hedging across multiple.
- Output feeds `channel-router` next, which decides LinkedIn vs. email —
  this skill does not draft the outreach message itself.
