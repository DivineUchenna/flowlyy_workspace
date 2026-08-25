---
name: channel-router
description: Decide whether a qualified, researched construction lead gets a LinkedIn message or an email draft. Use once construction-analyst and review-pain-scan have both run on a lead, to route it to write-opener or to an email draft before it reaches master-report.
---

# Channel Router

A single decision point every lead passes through, regardless of what
`construction-analyst` and `review-pain-scan` found. Kept as its own thin
skill deliberately — the routing rule can change without touching either
research skill.

## Input

`construction-analyst`'s output for the lead, specifically the `LINKEDIN`
field.

## The rule

- **LINKEDIN found on the company's own site** → hand off to
  `write-opener` to draft a LinkedIn DM.
- **LINKEDIN not found** → hand off to the email-draft step, using the
  business email from `qualify-lead` and the decision-maker's name.

That's the entire decision. No search fallback either way — if LinkedIn
wasn't found, that channel is simply not attempted for this lead, per the
hard rule already set in `qualify-lead` and `construction-analyst`.

## What gets passed to the next step

Whichever channel is chosen, it receives:
- Decision-maker name + title
- Flagship project
- The stronger of `AI PAIN POINT` (construction-analyst) or `REVIEW PAIN
  POINT` (review-pain-scan) — if both point to the same offer, that's the
  strongest possible hook and should be noted as such
- Trade

## Output format

```
COMPANY: <name>
CHANNEL: LinkedIn | Email
REASON: <"LinkedIn found on site" | "LinkedIn not found on site">
STRONGEST PAIN POINT: <whichever of AI PAIN POINT / REVIEW PAIN POINT is stronger, noting if both agree>
```

## Rules

- Never attempt a search to find a missing LinkedIn profile. The decision
  is binary and evidence-based only.
- Don't attempt both channels for the same lead in the same batch — pick
  one per the rule above, to avoid a director getting contacted twice
  from the same outreach the same day.
