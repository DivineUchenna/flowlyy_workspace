---
name: n8n-node
description: Build or debug an n8n node, expression, or workflow. Use when working on n8n at all — writing an expression, configuring a Set/Filter/HTTP/Code node, wiring a scraping or enrichment pipeline, or diagnosing why a node returns nothing, throws, or stops the workflow.
---

# n8n Node

Conventions and failure modes for building n8n workflows. These are mistakes
already paid for once — do not repeat them.

## Expressions

**Referencing another node** — use `.item.json`, never `$json`:

```
{{ $('Node Name').item.json.field }}
```

`$('Node Name').$json.field` is invalid syntax. The bare `$json` shorthand
only refers to the *current* node's input.

Node names are literal, including spaces and capitalisation. `Scrape Google
maps` is not `Scrape Google Maps`.

**Always guard nullable fields.** Any field that may be absent will be
absent, and it will throw at item 47 rather than item 1:

```
{{ $json.website ? $json.website.replaceAll('https://','') : '' }}
```

Scraped data is full of these — `website`, `email`, and `phone` are commonly
null on Google Maps results.

**Prefer built-ins to chained replaces.** For URLs:

```
{{ new URL($json.website).hostname }}
```

handles protocol, port, path and query in one. Chained `.replaceAll()` calls
break on edge cases — note that `replaceAll('www.','')` matches anywhere in
the string, not just the prefix.

**`.split()` with no argument** returns a single-element array, not a
trimmed string. To cut everything after the domain use
`.replace(/\/.*/,'')` or `.split('/').first()`.

## Set / Edit Fields node

- Prefer **Manual Mapping** over JSON mode. JSON mode requires a complete
  object (`{ "key": "value" }`) and fails with "does not contain a valid
  JSON object" if given a bare string.
- Turn **Include Other Input Fields ON** unless you deliberately want to
  discard everything upstream. Off by default, and it silently drops all
  the scraped data.

## Filter / IF node

- Check the comparison value character by character. A trailing `!`, a
  space, or a case difference sends every item to Discarded and the next
  node reports "no items were sent on this branch".
- Turn on **Convert types where required** unless strict typing is wanted.
- When a downstream node has no input, check the connection labels on the
  canvas first — "Kept" with no count is the signature of a filter matching
  nothing.

## HTTP Request node

Any request to an external website needs all three:

- **Response format: String** when fetching HTML (not JSON)
- **On Error: Continue** — roughly one site in five will 403, time out, or
  be dead, and without this a single bad URL kills the whole run
- **Timeout: 10000** — otherwise slow sites hang the workflow

For APIs, the key usually goes in a query parameter or a custom header, not
the Authentication dropdown. Set Authentication to **None** and put the key
where the API expects it.

## HTML node

Use **Extract HTML Content**, selector `main, body`, Return Value **Text**.
Then cap the length in a Code node before sending anywhere paid:

```javascript
const text = ($input.first().json.pageText || '')
  .replace(/\s+/g, ' ')
  .trim()
  .slice(0, 4000);
```

Marketing sites routinely run to 50k characters. Uncapped, that is the whole
token budget on one row.

## Triggers

- Google Sheets `rowUpdate` only fires on change. Manual "Execute workflow"
  pulls the last known row, which may not be the row being tested.
- Check the poll interval before publishing. "Every Minute" is 1,440
  executions a day; hourly is almost always enough.

## Debugging order

1. Read the **input** panel of the failing node, not the output. "No items
   were sent on this branch" means the problem is upstream.
2. Check connection labels on the canvas for item counts.
3. Disable the suspect node (select, press D) to confirm it is the blocker.
4. Run the whole workflow rather than "Execute step" — single-step execution
   relies on cached upstream output that may be stale or absent.

## Rules

- Test on 5 items before running 120.
- Never put an API key in a screenshot or a shared file. If one is exposed,
  rotate it immediately.
- Build and verify each node before adding the next. Wiring five nodes then
  running is how an afternoon disappears.
