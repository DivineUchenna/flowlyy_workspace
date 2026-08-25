---
name: master-report
description: Consolidate a batch of researched, drafted construction leads into one dated report for review before anything is sent. Use after channel-router has processed a batch of leads, to produce the document Divine reviews before approving sends in Instantly.
---

# Master Report

The checkpoint between research/drafting and actually sending anything.
One document per batch, one section per lead — nothing reaches Instantly
without this being reviewed first.

## When this runs

After `channel-router` has processed every lead in a batch — not per
lead, per batch.

## Input, per lead

- `qualify-lead` output (employees, revenue, trade, geography)
- `construction-analyst` output (business summary, operating model, core
  value prop, flagship project, AI pain point, decision-maker, LinkedIn)
- `review-pain-scan` output (review pain point)
- `channel-router` output (channel chosen, draft message)

## Output: one dated report

Written to `operations/construction-leads/<date>-batch/master-report.md`.
The batch folder name is the date the batch was run; each lead section
also carries its own `Researched on` date, since a batch can span more
than one day if it's a rolling run.

Per lead:

```
## <Company Name>
Researched on: <date>

- Trade: <trade>
- Geography: <UK | country>
- Employees: <count>
- Revenue: <verified figure, or "not found">
- Estimated revenue: <inferred figure, only if no verified figure>
- Decision maker: <name, title>
- LinkedIn: <URL, or "not found on site">
- Website: <URL>

Business: <summary>
Core value prop: <summary>
Flagship project: <detail, or "not found">
AI pain point: <finding + mapped offer>
Review pain point: <finding + mapped offer, or "insufficient data">

Channel: LinkedIn | Email
---
DRAFT:
<full message text>
---
```

## The point of this document

This is what Divine actually reads before approving a send — not the
Google Sheet (that's the live working store, updated as leads move
through statuses), and not Instantly (drafts only get there after
approval). If a fact looks wrong, stale, or thin here, the lead should be
re-verified or dropped before it goes any further.

## Rules

- Never write a lead into the report with a fabricated or estimated
  detail presented as verified — carry forward exactly what each upstream
  skill reported, including its "not found" / "insufficient data" states.
- Never generate this mid-batch — wait until every lead in the batch has
  been through `channel-router`.
- This document does not trigger anything. Sending remains a separate,
  manual, per-batch decision Divine makes after reading it.
