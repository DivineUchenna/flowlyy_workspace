# uche-2.0

System prompt, daily briefing, routing map, mistakes to avoid, north
star.

The operating layer for UCHE 2.0 itself — the current system prompt,
the priority order it enforces (protect creative time, 30-min
outreach, same-day client replies, 20-min Upwork, content, admin),
the list of past mistakes never to repeat, and the two north stars:
zero operatives turned away at the gate, and first paying client live.

## Files

- `system-prompt.md` — operating charter: tone, priorities, rules
- `north-star.md` — the two things everything else serves
- `routing-map.md` — priority order + where each type of item lands
- `mistakes-to-avoid.md` — running log, add entries as they happen
- `daily-briefing.md` — template + generation rules

A scheduled task (`flowlyy-daily-briefing`) generates the briefing every
weekday at 8:30am, saves it to `_inbox/`, and pushes a summary — runs only
while the Claude Code app is open. The vault root also has a `CLAUDE.md`
so any session opened here loads this operating context automatically.
