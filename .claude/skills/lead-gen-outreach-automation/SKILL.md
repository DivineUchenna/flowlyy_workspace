---
name: lead-gen-outreach-automation
description: Design, build, or debug a daily automated lead-generation and personalized cold-outreach pipeline (scrape leads → scrape their websites → extract signal → generate personalized emails → store drafts → schedule). Use this whenever the user wants to automate cold outreach, build a "leads to emails" pipeline, mentions scraping Google Maps/Apify for business leads, wants personalized emails generated from company research, or wants to wire this up in Make.com, n8n, or Claude Code. Also trigger when the user asks about pacing/scheduling daily sends, choosing an Apify actor for lead scraping, or structuring a Google Sheet as the data store for this kind of pipeline.
---

# Lead-Gen Outreach Automation

A skill for building the "scrape → enrich → personalize → send" pipeline: pulling business leads, researching each one's website, and generating a personalized outreach email — running on a daily schedule, with a human-in-the-loop safety default.

## The core pipeline

```
Lead source (Apify actor)
   → Google Sheets (lead database, dedup on company name/URL)
   → Per-lead website scrape (homepage + About/News, 2-3 pages max)
   → Claude API call #1: extract signal (projects, investments, expansions, news)
   → Claude API call #2: write personalized email from extracted signal
   → Google Sheets (write draft back, status = "ready to review")
   → [human review] → send
```

Treat this as the default shape for any "scrape leads and email them" request. Don't skip straight to full automation — walk through each stage below.

## Step 1: Pick the lead source

- For Google Maps-based leads (local/regional businesses by category), the default recommendation is Apify's `compass/crawler-google-places` actor (aka `apify/google-maps-scraper`) — most-used, most reliable Maps actor on the platform, returns name/address/phone/**website**/category/ratings.
- Emails are usually NOT included in default Maps exports — don't plan around getting them from this step. The website-scraping step later in the pipeline is what replaces needing an email-finder actor.
- Practical limit: a single broad query (e.g. "construction companies UK") caps around ~120 visible results. Split by region/city for full coverage, not one nationwide query.
- Apify free tier includes ~$5/month credit (~1,000 places) — enough to test before committing to spend.

## Step 2: Set up the Google Sheet as the data store

Minimum columns:
| Company Name | Website | Status | Extracted Signal | Draft Email | Notes |

`Status` should track pipeline stage per lead (e.g. `new` → `scraped` → `drafted` → `reviewed` → `sent`) so re-runs only process new/incomplete rows, not the whole sheet every time.

## Step 3: Website scraping

- Fetch homepage + 1-2 likely-useful pages (About, News/Press) per lead. Don't crawl the whole site.
- Strip to clean readable text before sending to Claude (e.g. `trafilatura`/`BeautifulSoup` in Python).
- Fail gracefully per-lead: log and skip broken/blocked sites, don't crash the whole run.

## Step 4: Extraction (Claude API call)

Prompt for structured extraction, not summary: ask for JSON with fields like recent projects, investments, expansions, news mentions. This is where an LLM beats keyword matching — it catches "we're expanding into three new markets" phrased any number of ways.

## Step 5: Email generation (Claude API call)

Feed the extracted signal + the user's offer/pitch. Explicitly instruct: reference one concrete, specific detail from the extraction; avoid generic flattery; keep it short and natural.

## Step 6: Orchestration — Make.com, n8n, or Claude Code

All three are viable; pick based on what the user already has:
- **Make.com / n8n**: native scheduling, visual branching/looping (Iterator module), built-in error handling per-item so one bad lead doesn't kill the run. Good default if the user already has either connected.
- **Claude Code**: better when the user wants a real owned codebase (Python/Node script) rather than a visual scenario, or wants to version-control the logic. Build and test one stage at a time (fetch → scrape → extract → email → sheet write), not the whole pipeline in one shot.

Either way, Claude (via API) is only ever *one step* invoked by the scheduler — it has no built-in clock and cannot independently decide to run or send at a given time. The scheduler (Make/n8n cron trigger, or a cron job wrapping the script) is what makes "runs daily" actually happen.

## Step 7: Scheduling and pacing

If the user wants the pipeline to run across a window (e.g. "6pm–10pm") rather than fire all at once:
- Prefer **pacing across the window** over one instant batch — spacing sends out (e.g. one every N minutes, recalculated as `window length ÷ item count` so it adapts to daily volume) looks human rather than like a bot and is gentler on rate limits/spam filters.
- Set the scheduler's timezone explicitly (don't leave it on server-default/UTC) so the window doesn't silently drift with daylight saving.

## Safety defaults — do not skip these

- **Drafts only, by default.** Write generated emails back to the sheet as drafts; do not wire up auto-send until the user has reviewed real output and explicitly wants to remove the review step. Cold email at volume is where personalization quality problems and spam-flagging actually bite.
- **Credentials**: API keys (Apify, Anthropic, Google service account, any email-sending API) belong in `.env` files per project, excluded via `.gitignore` from the first commit — never hardcoded, never in a synced note-taking app unless that specific note/folder is excluded from sync.
- If the target platform for outreach has terms of service restricting automation (e.g. Upwork prohibits automated proposal submission), do not build a full end-to-end auto-send for that platform — keep a manual step at the point the ToS requires a human action, and say so plainly to the user.

## When debugging an existing pipeline (e.g. in n8n/Make)

Common failure points to check, in order:
1. Placeholder values never replaced (sheet IDs, document IDs) — the tool will often refuse to run at all with a clear validation error; read it rather than guessing.
2. Credentials referenced by name but not actually attached to each node — existing credentials in the account don't auto-attach to new nodes.
3. Tab/sheet name mismatches between read and write steps pointing at different tabs of the same or different spreadsheet.
4. Empty result sets after a fix usually mean the fix worked but the *data* isn't where expected yet (wrong tab, wrong file, no rows added) — confirm the exact sheet URL with the user rather than re-guessing.
