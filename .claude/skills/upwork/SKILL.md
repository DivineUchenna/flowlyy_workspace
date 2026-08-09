---
name: upwork
description: Improve an Upwork freelancer profile by analysing top-performing profiles in the same category. Use when Upwork profiles are pasted in and the user wants their title, overview, specialised profile, portfolio, or rates rewritten or critiqued.
---

# Upwork Profile

Analyse high-performing Upwork profiles, extract what makes them work, and
apply those patterns to the user's own profile using only the user's real
experience.

## How to use this skill

The user pastes one or more competitor profiles into the terminal, plus
their own current profile or background. Work in three phases.

### Phase 1 — Analyse the pasted profiles

For each profile, extract only structure and strategy, never wording:

- **Title format** — is it a role, a specialism, an outcome, or a stack?
  How many words? Does it name a niche?
- **First two lines of the overview** — this is all that shows before "more".
  What job does it do: hook, credential, outcome, or question?
- **Specialisation** — generalist or narrow? Which niche, and named how?
- **Proof** — what evidence is offered, and how early? Job success score,
  hours billed, named clients, metrics, or none?
- **Structure** — headers, bullets, whitespace, length. Where does the
  reader's eye land?
- **Rate** — hourly or fixed, and what justifies it in the copy?
- **Portfolio** — how are items framed? Problem/solution, screenshots,
  outcomes, or bare deliverables?
- **Call to action** — how does it close?

Then state the **patterns held in common** across the profiles. Common
patterns are signal; one profile's quirk is noise.

### Phase 2 — Diagnose the user's profile

Compare against the patterns. Be specific and blunt. Name what is missing,
what is vague, and what actively reads as inexperienced. Do not soften.

Common failures to check for:
- Title names a tool stack rather than an outcome a buyer wants
- Overview opens with "I am a..." instead of what the client gets
- No niche — "AI automation for businesses" competes with everyone
- Features listed (Make, n8n, Zapier) instead of results
- No proof, or proof buried below the fold
- Rate inconsistent with the positioning claimed

### Phase 3 — Rewrite

Produce: title, overview, specialised profile, and portfolio item framing.
Give two title options with a note on the trade-off.

## Hard rules

- **Never copy phrasing from a pasted profile.** Extract the pattern, write
  fresh words. Duplicated copy is detectable, breaches Upwork's terms, and
  makes the user interchangeable with the person they copied.
- **Never invent experience, clients, results, or metrics.** If the user has
  not done it, it does not go in the profile. A fabricated claim survives
  exactly until the first client call.
- **If the user is new with no completed jobs, say so and position around
  it.** Lead with demonstrable builds, specific technical capability, and a
  narrow niche. Do not imply a track record that does not exist. New
  freelancers win on specificity and responsiveness, not on implied history.
- **Push for a niche.** Generalist AI automation profiles are the most
  crowded category on the platform. If the user resists narrowing, state
  plainly what it costs them.
- Plain English. No "passionate", "results-driven", "leverage", "seamless".

## Output format

```
## Patterns across the profiles analysed
<what the strong profiles have in common>

## What is wrong with the current profile
<specific, itemised>

## Rewritten

TITLE (option A):
TITLE (option B):

OVERVIEW:

SPECIALISED PROFILE:

PORTFOLIO FRAMING:

## Rate guidance
<with reasoning>

## What to fix outside the copy
<tests, video intro, portfolio pieces to build, categories to select>
```

## Note on evidence

If asked to compare against profiles not pasted in, say that the analysis
is only as good as the sample provided and ask for more. Do not generate
imagined competitor profiles to analyse.
