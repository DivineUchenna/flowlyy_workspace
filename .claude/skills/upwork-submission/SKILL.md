---
name: upwork-submission
description: Fill in Upwork's fixed-price proposal submission form correctly — the "How do you want to be paid?" payment-type question and the milestone builder (Description / Due date / Amount fields). Use this whenever Divine is submitting a fixed-price Upwork proposal and needs help deciding milestone vs. project payment, structuring milestones, or says things like "help me set up milestones for this," "how should I structure the payment for this job," "how many milestones should this have," "what should I put in this milestone," or pastes a screenshot of Upwork's payment-type or milestone-builder screen. Companion to the upwork-application skill — that one writes the pitch (plan, summary, cover letter); this one picks up once Divine has decided to submit and needs the actual submission-form fields filled in. Never touches Upwork itself — produces paste-ready text only, and never invents a budget or date.
---

# Upwork Submission

Handles the mechanical, easy-to-get-wrong part of submitting a fixed-price Upwork
proposal: choosing milestone vs. project payment, and — when milestone is the right
call — producing a paste-ready breakdown (Description / Due date / Amount) sequenced
and worded against the actual job post.

This is the second half of a two-skill pair. `upwork-application` writes the pitch
(pain point, template/demo, plan, summary, cover letter). This skill starts from
wherever that one left off — Divine has already decided to apply, and is now looking
at Upwork's own submission form.

## What this skill needs from Divine before it can finish

Two numbers can never be invented, because they're going into a real financial
submission, not a draft for review: **total quoted price** and **intended start
date**. If either is missing, stop and ask for both before producing final dates or
amounts — a wrong number here costs Divine money or credibility with a client, so a
placeholder is worse than useless. It's fine to reason about structure (how many
milestones, what each one covers, roughly how they should be weighted) before those
numbers arrive; just don't attach a date or a `£` figure to anything until they do.

Currency defaults to **GBP** (Divine is UK-based) unless the job post or Divine
states a different currency.

## Step 1 — Payment type: milestone or project

Read the job post's own deliverable structure, not a general preference:

- **Multiple distinct sub-deliverables** (the job post itself is numbered/bulleted
  into separate pieces of work, or the pitch's Plan already broke it into phases) →
  **milestone**. This is the common case for automation/agent-build work, since it
  almost always decomposes into "core pipeline" + "each individual capability."
- **One small, single-output job** (a single script, a one-off fix, a short audit) →
  **project**. Splitting a genuinely atomic task into fake milestones just to look
  thorough is worse than one honest project payment — it signals padding, not rigor.

State the recommendation in one line with the reason tied to *this* job's shape, not
a generic "milestones are safer" — Divine already knows the tradeoff (client trust
and incremental proof vs. more upfront scoping work); what he needs from this skill
is the specific call for the job in front of him.

## Step 2 — Milestone breakdown (only when Step 1 says milestone)

**Word each description against the job post's own deliverables.** If the client
numbered their requirements (as most automation job posts do), mirror that structure
back — it reads as "I understood your brief," which is doing real persuasive work in
the proposal, not just organizing the invoice.

**Sequence by dependency, not by narrative order.** Any shared or foundational piece
— the core pipeline, the auth/connection layer, the data model everything else reads
from — has to be milestone one, even if the job post lists it last or doesn't call it
out as a separate line at all. Building the pieces that depend on it before it exists
means redoing work, and a client reviewing the breakdown will notice if the sequence
doesn't make engineering sense.

**Weight amounts toward the front by default, not an even split.** The foundational
milestone is usually the highest-risk, most time-intensive work — it's also the
milestone Divine is most exposed on if the project stalls after it, so getting paid
more for it up front is the reasonable default, not padding. Roughly:

- 2 milestones: ~60/40
- 3 milestones: ~40/30/30
- 4 milestones: ~35/25/20/20

These are starting points, not a formula to apply blindly — adjust for the actual
effort split once the milestones are named, and always let Divine override the
weighting outright if he says so (e.g. "split it evenly" or "weight it toward the
end instead").

**Due dates cascade from the start date**, spaced by how much work each milestone
actually represents (a milestone that's half the total build effort should span
roughly half the timeline, not get the same number of days as a one-day task next to
it).

## Output format

```
## Payment type
**Recommendation:** Milestone / Project
<one line tying the call to this job's specific deliverable shape>

## Milestones
| # | Description | Due date | Amount |
|---|---|---|---|
| 1 | ... | ... | £... |
| 2 | ... | ... | £... |

<note any place the weighting deviates from the rough defaults above, and why>
```

If total price and start date haven't been given yet, stop after the payment-type
recommendation and the milestone *descriptions* (no dates/amounts), and ask for both
before finishing the table.

## Hard rules

- **Never invent total price or start date.** Ask if either is missing — see above.
- **Never submit, click, or fill anything directly in Upwork.** This skill produces
  text for Divine to paste into the form himself, the same review boundary as
  `upwork-application`.
- **Plain English, no filler.** No "streamlined," "robust," or other freelancer-post
  padding — see `/Users/divineuchenna/Desktop/AI Automations/context/brand-voice.md`
  and `about-me.md` for how Divine wants things phrased.
