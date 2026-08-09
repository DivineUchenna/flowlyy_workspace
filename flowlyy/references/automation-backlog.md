# Automation backlog

Ideas worth building later. Not to be started before the certification
tracker has its first paying client live — see mistake #9 in
`uche-2.0/mistakes-to-avoid.md`.

## Solicitation & Sourcing Automation

**Source:** Paul Foley's "Tailgate Talks" interview with Donat Galicz
(estimator, OC Jones & Sons, heavy civil/Caltrans, HCSS HeavyBid user),
2026-08.

**The pain:** Before bidding a job, an estimator has to manually track
down every subcontractor and material producer who could supply it —
who's near the job, who does the specialized work, who's interested.
Worse when bidding outside home territory. Hours of phone calls and
detective work, then a wait for a plug price.

**The idea:** The mirror image of Quote Handler. Quote Handler chases
*inbound* client quotes after a customer submits one. This chases
*outbound* quotes — an estimator submits job details (location, trade/
material, spec), the system matches against a database of subs/
suppliers by trade + proximity + past responsiveness, fires bulk
outreach (SMS/WhatsApp/email), and runs day 1/3/7 automated chasers for
non-responders. Responses land in one dashboard instead of a notebook
of phone-tag notes.

**Stack:** Make/n8n + Airtable + ClickSend/Twilio — reuses the chase-
sequence logic already built for Quote Handler and Timesheet Chaser.

---

## Compliance-Gated Payment Release (US market — not UK-transferable)

**Source:** Business-strategist analysis, 2026-08, off the back of
researched US construction pain points (see also
`prospects/` research and the pipeline conversation).

**The pain, quantified:** US construction payment cycles average 90
days against a 45-day healthy benchmark; subs wait ~56 days after
submitting a pay application even though GCs think it takes 30. This
costs the industry an estimated $280B/year, and a large share of that
delay is not the money being unavailable — it's compliance paperwork
(certificates of insurance, lien waivers, certified payroll on
prevailing-wage jobs) sitting untracked in someone's inbox before a GC
will release payment. This is the US-specific version of the same
"nobody is watching expiry dates" problem the certification tracker
solves in the UK — but on the payment side, not the site-access side.

**The idea:** An AI layer that sits between a subcontractor's payment
application and the GC's approval step. It ingests each sub's required
compliance docs (COI limits + expiry, lien waiver correctly executed,
certified payroll matching the wage determination, license status),
verifies them automatically against the contract's requirements, and:
- if compliant — auto-notifies the GC's AP/PM that the pay app is
  clear to approve, instead of someone manually chasing it down
- if not — automatically messages the sub with exactly what's missing
  and a deadline, with day 1/3/7 chasers (same pattern as Timesheet
  Chaser)
- gives the GC a dashboard showing exactly why each pay app is stuck,
  which today is invisible

**Honest caveat:** this is not unsolved ground — Levelset, GCPay,
Textura, and Procore all touch pieces of this (lien waivers, payment
apps, COI tracking) as separate modules, usually enterprise-priced.
The differentiation is unifying compliance verification and payment-
release triggering into one automated pipeline, aimed at the SMB/
mid-market GC (10-100 employees) that current enterprise tools don't
really serve. It is a genuinely different product from the UK
certification tracker (US-specific legal mechanics — lien waivers and
COI requirements don't exist the same way in the UK) — pursuing it
would be a real market-expansion decision, not a backlog add-on.

---

## Audit-Ready Compliance Export (feature, not a new product)

**Source:** Competitive analysis of specfunnel.com, 2026-08. SpecFunnel
turns construction specs into AI-drafted Inspection & Testing Plans
(human-reviewed), links inspection evidence to each requirement, and
exports a branded closeout package by CSI MasterFormat. Targets "Top 20
ENR Contractors" — the enterprise end of the market, confirming real
appetite for AI-assisted construction compliance documentation while
leaving the SMB end (our ICP) unserved.

**The idea:** The certification tracker currently tracks and alerts.
Add a one-click export that turns the same underlying data into a
branded, audit-ready compliance pack a client can hand straight to
their accreditation body — e.g. CHAS, Constructionline, NASC, or a
Tier 1 client's own auditor. Not a new automation, an output format on
top of the existing product: PDF/Excel, organised by cert type and
operative, showing current status and renewal history.

**Why it matters:** this is exactly what a Mark Chard or Gary Boon
needs to prove compliance under their own accreditations — it turns
"we track your certs" into "we hand you the document your auditor
actually asks for," which is a stronger, more concrete sell.

**Trust framing worth borrowing:** SpecFunnel's core pitch line is "AI
drafts it, a construction professional reviews it" — a deliberate way
to sell AI into a safety/liability-sensitive industry without sounding
like it replaces human judgment. Worth reusing in the tracker's own
positioning language, since the same skepticism applies here.
