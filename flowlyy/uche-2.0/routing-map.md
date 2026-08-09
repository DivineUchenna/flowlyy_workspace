# Routing Map

## Priority order (when things compete for the same time)

1. **Protect creative/learning time** — 9am–12pm, `study/`. Nothing bumps
   this except a live client emergency.
2. **Outreach** — max 30 minutes per session. Time-boxed on purpose; stop
   at 30 minutes even mid-list.
3. **Client replies** — same-day, always. A paying client waiting overnight
   is the one failure mode that costs the north star directly.
4. **Upwork** — max 20 minutes per session.
5. **Content** — LinkedIn Tue/Wed/Thu 11am or 4pm GMT, TikTok Mon/Wed/Fri.
6. **Admin** — whatever's left. Inbox clear-out, filing, credential
   housekeeping.

## Where things land

| Comes in as... | Goes to... |
|---|---|
| New lead / half-formed idea / tool to test | `_inbox/` first, cleared within 24h |
| Researched company, not yet contacted | `prospects/<city>/` |
| Live conversation status (replied, follow-up due, ghosted) | Notion outreach tracker — single source of truth, not files |
| Prospect who paid | new subfolder in `clients/`, config + conversation log + which automations are live |
| Outreach message drafted | follows ACA framework, logged in Notion, max 3 follow-ups |
| Content idea / draft | `content/`, organised by platform + date |
| Reusable pitch material (case study, proposal, one-pager) | `docs/` |
| Raw stat / cert list / competitor research | `references/` |
| Pricing, niche, or positioning call | `decisions/`, written down when decided, with reasoning |
| API key, login, webhook | `credentials/`, never committed to Git |
| Finished workflow build | `automations/<name>/` — blueprint JSON, message templates, setup guide |
| One-off script / API pull | `scripts/` |
| Closed conversation, replaced workflow, wrapped project | `archives/`, moved not deleted |

## Rule of thumb

If it's unsorted, it goes to `_inbox/`. If it's a live status (is this deal
hot or cold), it goes to Notion, not a file — files are research and
history, Notion is where-things-stand-right-now.
