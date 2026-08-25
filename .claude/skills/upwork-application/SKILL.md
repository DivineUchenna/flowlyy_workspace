---
name: upwork-application
description: Turn a pasted Upwork job description into a demo-backed proposal for AI automation work — name the sharpest pain point, find or build a template for it, hand it off for Loom-recording and review, then (once approved) produce a plan, summary, and cover letter. Use when Divine pastes an Upwork job post and wants to apply to it — this is the default path for a pasted job post. Once the cover letter is done and Divine is actually filling in Upwork's submission form (payment type, milestones), hand off to the companion `upwork-submission` skill — that one owns the payment-type call and the milestone breakdown, this one does not. If Divine explicitly says to skip the demo/template step (e.g. "just write the cover letter," "skip the demo"), use `upwork-cover-letter` instead — same cover letter, no template build, no Loom pause.
---

# Upwork Application

Applies to Upwork job postings for AI automation work (n8n, Make.com, Claude,
GoHighLevel — any industry, not limited to construction). The proof stack for
the proposal is a real template Divine can walk through on camera, not a
claimed build and not a fabricated case study — so this skill stops short of
touching any live workspace and hands the template to Divine for review
first.

## Trigger

The user pastes an Upwork job description into chat. That's the only input
needed to start.

## The workflow

### Step 1 — Name the sharpest pain point

Read the job description only — no digging into the client's hiring history
or reviews. Name **one** pain point, the sharpest one, not a list. If the
post describes several problems, pick the one that is most specific, most
costly to the client, and most demonstrable in a short build. A vague post
("need automation help") still has to yield one concrete pain point — ask
what the client is actually trying to stop doing manually.

State it in one sentence before moving on, so the rest of the proposal stays
anchored to it.

### Step 2 — Find or build the template

Before building anything new, check whether Divine already has a real,
relevant build — his own automations (e.g. the LinkedIn outreach system), a
Flowlyy product, other verified prior work. If something he's already built
is an equal or closer match to the job than a freshly-built demo would be,
that's the stronger and more honest proof stack — use it instead of building
from scratch, and say plainly in the output that this is existing work, not
something built for this specific application.

Otherwise, search for an existing template that solves the pain point:

- **Make.com / n8n public template libraries** — search via Firecrawl first.
- **Anything gated** (GHL snapshots, private template marketplaces, login-
  required galleries) — use Claude-in-Chrome, and only if there's an account
  with actual access. Don't guess at content behind a login wall.
- **If nothing close exists, build one from scratch** — write out the actual
  template structure (module-by-module for Make, node-by-node for n8n,
  snapshot components for GHL, or a Claude prompt/skill if that's the right
  fit) rather than forcing a weak-fit match.

Either way, produce a **step-by-step breakdown** of how the template works —
this is what Divine uses as the script for a Loom walking a client through
the solution.

**Never import, activate, or deploy anything into a live n8n, Make.com, or
GoHighLevel account at this stage.** The output here is the template content
plus the breakdown, not a live scenario. Divine decides if and when
something goes live.

### Pause here — evaluate together

Stop after Step 2. Present the template and the step-by-step breakdown.
Divine reviews it, decides if it's the right fit, and records the Loom
walkthrough if he wants to use it. Do not move on to Step 3 until he says to.

### Step 3 — Produce the deliverable (only once the template is approved)

Three outputs, in this order:

1. **Plan** — short, technical, specific: what the template does, how it
   addresses the named pain point, what it would take to adapt it to the
   client's actual system.
2. **Summary** — two or three sentences connecting the template/Loom directly
   to their stated problem, written to be dropped into the top of the
   proposal.
3. **Cover letter** — full proposal text, structure below.

## Cover letter structure

Adapted from a structural analysis of a high-performing Upwork proposal
pattern (paid ads/lead gen niche, not automation — the pattern was extracted,
the wording and every claim in it were discarded), then tested and confirmed
across real applications, and refined again (2026-08-24) by contrasting two
competing proposals on the same Claude Code adoption job — same
extract-structure-discard-wording approach. Write it in this exact shape, not
a looser approximation of it:

1. **Personalized open — mirror, then pivot.** One line that restates what
   the client is actually asking for, in terms specific to *this* post, then
   pivots straight into the specialism that answers it. Never "I am a...",
   and never a generic opener like "Hi, this is very close to my work" — that
   reads as templated because it says nothing the client couldn't paste into
   any other application. Confirmed by contrast: the winning proposal pattern
   restates the client's ask before naming the specialism; the losing pattern
   opens generic and lists technologies instead.
2. **Bridge line** — one sentence connecting to the specific technical
   problem in *this* job, not a generic pitch that could go to anyone.
3. **Proof stack — a bulleted list (✔️), 3-5 items, each one line.** This is
   where the Loom/template lives (or Divine's real existing build, per
   Step 2), plus any genuine expertise signal worth surfacing early — a real
   risk flagged before the client hits it, a design decision most builders
   get wrong. Phrase it as a real, lived-in setup or routine ("my own daily
   setup with X, Y, Z doing real work"), not a capability checklist — a list
   of technologies with no evidence of routine use reads as claimed, not
   proven. Never a client-results list, never a claim that anything is
   already live in their system. If Divine has a real, confirmed start
   timeframe, a one-line availability signal here (or in the bridge line)
   strengthens the close — but only if he's confirmed it's true; don't invent
   one, same principle as the no-fabrication rule below.
4. **Scope-as-checklist — a second bulleted list (✅).** "If we work
   together, here's what's included" as concrete deliverables, not a single
   sentence. Always a list here, not prose.
5. **Numbered next steps** — literally "1. Send a message on Upwork,
   2. <specific thing to send back or confirm>", not a single vague
   "let's chat" line. Tell the client exactly what happens next.
6. **Sign-off** — first name only.
7. **PS** — one genuine differentiator or an honest scope caveat stated
   upfront (a real limitation, a real risk, a real background detail).
   Never filler, never generic flattery.

## Screening-question answer bank

Upwork's standard screening questions ("why are you a fit," "describe a
similar project," "how would you approach this") get short, structured
answers:

- **Why are you a fit** — the strongest device from the reference pattern:
  openly name the obvious reasons (credentials, experience) as *not* the
  real reason, then name the actual differentiator. Use only if there's a
  genuine differentiator to name — don't force the device.
- **Describe a similar project** — point to a real past build (Flowlyy
  products, other verified work), or to the template just walked through.
  Never invent one.
- **How would you approach this** — a short numbered process specific to
  the pain point named in Step 1, not a generic methodology.

## Handoff — submitting the proposal

This skill's job ends at the cover letter. It does not decide payment type
(milestone vs. project) and does not build the milestone table — that's a
separate decision requiring Divine's actual quoted price and start date,
neither of which exist yet at this stage. Once Divine has the cover letter
and moves to Upwork's own submission form, use the companion
`upwork-submission` skill for the "How do you want to be paid?" question and
the milestone builder. Don't attempt payment/milestone structuring here even
if Divine asks for it mid-flow — route to `upwork-submission` instead, since
that skill carries the weighting logic and the hard rule against inventing
financial figures.

## Hard rules

- **Never deploy, import, or activate anything in a live n8n, Make.com, or
  GoHighLevel workspace without Divine's explicit go-ahead.** The template
  is a deliverable for review and recording, not a live system, until he
  says otherwise.
- **Never invent results, clients, or metrics.** No track record yet in a
  given niche means the template/Loom is the proof — not a fabricated case
  study. Same constraint as the sibling `upwork` profile skill; don't drift
  from it here.
- **Never claim a build is live or already running for the client.** It
  isn't, and won't be until Divine deploys it himself after the job is won
  (or explicitly decides otherwise).
- **Never copy phrasing from any reference proposal.** Structure only, fresh
  words every time — copied phrasing is detectable and makes the proposal
  interchangeable with whoever it was copied from.
- **Plain English.** No "passionate," "results-driven," "leverage,"
  "seamless," or the genre's other filler. The reference pattern uses some
  of this language — drop it, keep the structure.
- **General niche, not forced-construction.** This skill serves any
  industry's automation job. Only lean on construction-specific framing if
  the job post itself is a construction company.

## Output format

First pass (Steps 1-2, every time):

```
## Pain point
<one sentence>

## Template
<found template with source/link, or a from-scratch template written out
step by step>

## Step-by-step breakdown
<numbered, written as a Loom script>
```

Second pass (Step 3, only after Divine approves the template):

```
## Plan
<technical plan, tied to the pain point>

## Summary
<2-3 sentences, drop-in for the top of the proposal>

## Cover letter
<full proposal text>

## Screening-question answers
<only if the job post includes them>
```
