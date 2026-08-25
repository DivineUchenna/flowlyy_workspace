---
name: review-pain-scan
description: Scan a construction company's 1-3 star reviews for complaint patterns that map to Flowlyy's offers — missed calls, quote delays, invoicing chaos. Use when given a qualified lead's review platform (Google, Trustpilot, Checkatrade) and asked for a second pain-point signal to feed outreach, alongside construction-analyst's site-based finding.
---

# Review Pain Scan

A second, independent pain-point signal alongside `construction-analyst`'s
`AI PAIN POINT` — this one comes from what the company's own customers say,
not from the company's own site copy.

## Input

The review platform URL already identified in `qualify-lead`'s requirement
3 check (Google Business, Trustpilot, or Checkatrade). Reuse it — don't
re-search for the review source.

## Step 1: Scrape

Platform-specific Apify actor (e.g. a Google Maps reviews actor for
Google, the equivalent for Trustpilot). Pull rating + review text.

## Step 2: Filter to 1, 2, 3-star only

Discard 4-5 star reviews entirely. Cap at the most recent ~20-30 reviews
in the 1-3 star range — this is a light check, not a full sentiment
archive.

## Step 3: Match directly against offer-specific phrases

Not generic complaint buckets — match straight against what each of
Flowlyy's six offers would look like from a customer's side:

- **Missed leads / unanswered calls** — "tried calling," "never
  answered," "left messages," "couldn't get hold of," "never called
  back." The most reliably detectable of the six from customer reviews.
- **Quote handling** — "took weeks for a quote," "never got a quote
  back," "had to chase for a price," "quote didn't match the final bill."
- **Cash flow / late payment** — indirect only: "invoicing was a mess,"
  "took months for the final bill," "kept changing the price." Weaker
  evidence than the two above — a review is written by the contractor's
  customer, not by the contractor chasing its own clients.
- **Certification tracking, subcontractor admin, timesheets/payroll** —
  expect these to rarely surface in customer reviews at all; they're
  internal/back-office processes a customer wouldn't normally comment on
  directly. `construction-analyst`'s site-based `AI PAIN POINT` is the
  field expected to catch these three instead.

## Step 4: Output the dominant match

Whichever offer gets the strongest/most frequent match in the filtered
reviews. If fewer than ~2-3 reviews fall in the 1-3 star range, or none
clearly matches an offer, say so — do not force a theme onto a single
stray review.

## A judgment call, not a default

Referencing a company's own bad reviews directly in outreach ("I noticed
your reviews mention...") is a sharper hook but reads more like an attack
than help — the same reasoning `write-opener` already applies to never
asserting a prospect's problem for them. **Default to using this as an
internal signal only**, sharpening which offer the outreach leads with,
never quoted or referenced directly in the message itself, unless
explicitly told otherwise for a specific lead.

## Output format

```
COMPANY: <name>
REVIEWS SCANNED: <count in 1-3 star range>
REVIEW PAIN POINT: <dominant theme + count, mapped to one Flowlyy offer, or "insufficient data">
DATE RESEARCHED: <date>
```

## Rules

- Never invent a theme from a single review. The minimum-evidence bar is
  the same discipline as `qualify-lead` and `construction-analyst`.
- Never quote review text directly in outreach by default — internal
  signal only, per the judgment call above.
- This skill runs independently of and in parallel with
  `construction-analyst` — neither depends on the other's output, and a
  lead can proceed to `channel-router` even if this comes back
  "insufficient data".
