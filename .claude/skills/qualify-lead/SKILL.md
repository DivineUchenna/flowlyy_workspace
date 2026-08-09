---
name: qualify-lead
description: Qualify a construction company as a sales prospect before spending research time on it. Use when given a company name, website URL, Companies House record, scraped lead row, or list of companies and asked whether they are worth contacting, whether they are a good lead, or to filter/score a lead list.
---

# Qualify Lead

Decide whether a construction company is worth researching and contacting. The
point of this skill is to kill bad leads fast, before ten minutes of research
gets spent on a company that was never going to buy.

Default verdict is REJECT. A company must earn a PASS.

## Hard requirements

All five must be true. Any single failure is an immediate REJECT.

### 1. Working website on a company domain
- Site must load and be a real site, not a parked page, "coming soon",
  expired domain, or a single-page template with placeholder content.
- Domain must be the company's own (e.g. `firmname.co.uk`).
- REJECT if the primary web presence is Facebook, Instagram, Checkatrade,
  or a directory listing.

### 2. Business email address
- Must be on the company domain: `info@firmname.co.uk`, `enquiries@`,
  or a named person.
- REJECT gmail.com, hotmail.com, outlook.com, yahoo.com, btinternet.com.
  A Gmail address on a construction company is a reliable signal the firm
  is too small to have a back office.
- A contact form alone is not sufficient — there must be a reachable address.

### 3. Medium size
- Target: 50–500 employees, or £10m–£100m turnover.
- For trades measured in operatives, 20+ operatives is the floor.
- REJECT below: the owner knows everyone's certifications personally,
  there is no admin burden, and there is no budget.
- REJECT above: procurement processes, an IT function, and an existing
  enterprise contract (Procore, Autodesk, a recent ERP rollout).
- Evidence: team page, LinkedIn headcount, Companies House filed accounts,
  fleet size, number of depots.

### 4. Self-performing contractor
- The company must actually carry out construction work.
- REJECT manufacturers, materials suppliers, distributors, merchants,
  consultancies, surveyors, architects, standards bodies, and trade
  associations. Different business, different bottleneck.

### 5. Independent decision-making
- REJECT subsidiaries of large groups and companies with a foreign parent.
  The buyer is a Commercial Director who can say yes over coffee, not a
  group procurement committee.

## Positive signals

Not required, but each one strengthens the lead. Note which are present.

- **Named commercial or contracts staff** — a Commercial Director, Contracts
  Manager, or Office Manager on the team page. No office function means no
  office pain.
- **Tier 1 / framework work** — named principal contractors in case studies,
  or public sector frameworks. These clients impose the paperwork.
- **Trade accreditation** — NASC full contracting membership for scaffolding,
  or the equivalent competence body for the trade. Note that CHAS,
  Constructionline and SafeContractor are procurement pre-qualification
  badges, not competence accreditation — they are weaker evidence.
- **Growth strain** — recent expansion, a new depot, headcount up sharply,
  or currently hiring estimators, project coordinators, document controllers
  or contract administrators. A live job ad for an admin role is the
  strongest buying signal available: budget is already approved for the
  workload problem.
- **Repeatable volume** — many small jobs rather than a handful of bespoke
  landmark projects. Automation only pays when the same process runs
  hundreds of times a year.

## Negative signals

Do not reject on these alone, but flag them.

- Mentions Procore, Autodesk Build, or a recent ERP rollout — budget and
  appetite already spent this year.
- Website built on a trades template service with placeholder content still
  in place (e.g. an unrelated job title in the team section).
- Inconsistent ownership details across the site.
- Duplicate entity — same company already assessed under another name.
- Wrong country. Check the domain TLD against the claimed location.

## Output format

```
VERDICT: PASS | REJECT | UNCERTAIN
COMPANY: <name>
SIZE: <estimate + evidence>
REASON: <one or two sentences>
POSITIVE SIGNALS: <list, or "none found">
FLAGS: <list, or "none">
NEXT: <what to research, or why to drop it>
```

Use UNCERTAIN when the website is thin and size cannot be established.
Do not guess a headcount. Say what is missing and how to find it —
usually Companies House filed accounts or a LinkedIn headcount check.

## Rules

- Never invent evidence. If the site does not state operative numbers,
  say so rather than estimating from the tone of the site.
- Self-reported descriptions are claims, not facts. Treat LinkedIn and
  "about us" copy as unverified.
- When assessing several companies, apply the criteria to each
  independently and expect most to fail. A pass rate around 30% is normal.
- Never soften a REJECT to be encouraging. A wrongly passed lead costs
  far more than a wrongly rejected one.
