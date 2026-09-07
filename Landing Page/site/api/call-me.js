// Triggers a real outbound call from the ElevenLabs demo agent to a visitor's
// phone number, via ElevenLabs' Twilio-backed outbound-call API.
//
// Required Vercel env vars (Project Settings -> Environment Variables):
//   ELEVENLABS_API_KEY        - ElevenLabs API key (kept server-side only)
//   ELEVENLABS_PHONE_NUMBER_ID - the imported Twilio number's ElevenLabs phone_number_id
// Optional:
//   ELEVENLABS_AGENT_ID       - defaults to the Ridgeway demo agent below

const DEFAULT_AGENT_ID = "agent_7501m1pbwfzgfwtayh3cxzh2183z";

// Best-effort in-memory rate limiting. Resets on cold start / redeploy, and
// isn't shared across regions - it's a speed bump against casual abuse, not
// a real defense. Pair this with a Vercel Firewall rate-limit rule on
// /api/call-me for actual protection.
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_PHONE_PER_WINDOW = 2;
const MAX_PER_IP_PER_WINDOW = 5;
const MAX_TOTAL_PER_DAY = 40;

const phoneHits = new Map(); // phone -> [timestamps]
const ipHits = new Map(); // ip -> [timestamps]
let dayBucket = { day: null, count: 0 };

function pruneAndCount(map, key, now) {
  const hits = (map.get(key) || []).filter((t) => now - t < WINDOW_MS);
  map.set(key, hits);
  return hits;
}

function toE164(raw) {
  let s = (raw || "").trim();
  if (s.startsWith("+")) {
    return "+" + s.slice(1).replace(/\D/g, "");
  }
  let digits = s.replace(/\D/g, "");
  if (digits.length === 10) {
    // Demo business is US-based; treat a bare 10-digit number as missing its US country code.
    digits = "1" + digits;
  }
  return "+" + digits;
}

function isPlausibleE164(number) {
  return /^\+[1-9]\d{7,14}$/.test(number);
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const phoneNumberId = process.env.ELEVENLABS_PHONE_NUMBER_ID;
  const agentId = process.env.ELEVENLABS_AGENT_ID || DEFAULT_AGENT_ID;

  if (!apiKey || !phoneNumberId) {
    return res.status(503).json({
      ok: false,
      error: "Calling isn't configured yet.",
    });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const toNumber = toE164(body && body.phone);

  if (!isPlausibleE164(toNumber)) {
    return res.status(400).json({ ok: false, error: "That number doesn't look right." });
  }

  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (dayBucket.day !== today) dayBucket = { day: today, count: 0 };
  if (dayBucket.count >= MAX_TOTAL_PER_DAY) {
    return res.status(429).json({ ok: false, error: "We've hit today's demo call limit. Try again tomorrow." });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const phoneRecent = pruneAndCount(phoneHits, toNumber, now);
  const ipRecent = pruneAndCount(ipHits, ip, now);

  if (phoneRecent.length >= MAX_PER_PHONE_PER_WINDOW) {
    return res.status(429).json({ ok: false, error: "That number's already been called recently." });
  }
  if (ipRecent.length >= MAX_PER_IP_PER_WINDOW) {
    return res.status(429).json({ ok: false, error: "Too many requests from here. Try again later." });
  }

  try {
    const elevenRes = await fetch("https://api.elevenlabs.io/v1/convai/twilio/outbound-call", {
      method: "POST",
      headers: {
        "xi-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: phoneNumberId,
        to_number: toNumber,
      }),
    });

    if (!elevenRes.ok) {
      const detail = await elevenRes.text().catch(() => "");
      console.error("ElevenLabs outbound-call failed", elevenRes.status, detail);
      return res.status(502).json({ ok: false, error: "Couldn't start the call. Try again in a moment." });
    }

    phoneHits.set(toNumber, [...phoneRecent, now]);
    ipHits.set(ip, [...ipRecent, now]);
    dayBucket.count += 1;

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("call-me handler error", err);
    return res.status(500).json({ ok: false, error: "Something went wrong. Try again in a moment." });
  }
};
