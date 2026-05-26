---
name: atlas-freight
description: >
  Match freight forwarding requests through the Goods2Load Atlas AI pipeline.
  Extracts cargo intent from natural language, calls the Atlas multi-agent engine
  (C1 intent → C2 match → C3 trust score → C4 enrich → C5 rank), and returns
  the top verified forwarders with rates and a booking link — all inside WhatsApp
  or any channel Hermes is connected to.
version: 1.0.0
platforms: [macos, linux]
required_environment_variables:
  - name: G2L_API_URL
    description: "Base URL of the Goods2Load deployment. No trailing slash."
    example: "https://goods2load.com"
metadata:
  hermes:
    tags: [freight, logistics, shipping, cargo, forwarder, MENA, Dubai, air, sea, road]
    category: logistics
    config:
      - key: atlas.api_url
        description: "Goods2Load API base URL"
        default: "https://goods2load.com"
        prompt: "Enter your Goods2Load URL (e.g. https://goods2load.com):"
      - key: atlas.session_ttl_minutes
        description: "How long to keep a conversation session alive (minutes)"
        default: "30"
---

# Atlas Freight Skill

Connects Hermes to the Goods2Load Atlas AI pipeline so shippers can find
verified freight forwarders by messaging any channel — WhatsApp, Telegram,
Slack, or anywhere else Hermes runs.

## When to Use

Activate this skill whenever the user's message matches any of:

- **Explicit shipping intent** — "I need to ship", "I'm looking for a freight forwarder", "who can move my cargo"
- **Route mention** — any combination of origin and destination cities, countries, port codes (DXB, FRA, SHA, JEA), or IATA airport codes
- **Mode of transport** — mentions of air freight, sea freight, FCL, LCL, road / truck, multimodal
- **Cargo description** — weight (kg, tons), volume (CBM), container type (20GP, 40HC, etc.), HS codes, or commodity names (pharma, automotive parts, electronics, cold chain, dangerous goods)
- **Rate enquiry** — "how much to ship", "what's the rate from X to Y", "get me a quote"
- **Follow-up on a previous match** — "tell me more about the first one", "which is cheapest", "book with number 2"

Do **not** activate for:
- General questions about Goods2Load the company (use website search instead)
- Customs tariff lookups with no forwarding request
- Tracking of existing shipments (no tracking integration yet)

---

## Procedure

### Step 1 — Check for required fields

Before calling the API, confirm the message contains at least:
- **Origin** (city, country, or port/airport code)
- **Destination** (city, country, or port/airport code)
- **Mode** (air / sea / road — infer from cargo if not stated; default to "any")

If origin **or** destination is missing, ask one short clarifying question:

> "Sure — where is the cargo shipping *from* and *to*? (city or country is fine)"

If mode is missing but origin + destination are clear, proceed — Atlas will infer.

### Step 2 — Call the Atlas API

```
POST {G2L_API_URL}/api/agent
Content-Type: application/json

{
  "messages": [
    {
      "role": "user",
      "content": "<verbatim user message>"
    }
  ],
  "session_id": "<session_id from previous turn, or omit on first turn>"
}
```

- Use the `session_id` returned from the previous turn (stored in Hermes conversation memory) so Atlas maintains context across follow-up messages.
- Set a 15-second timeout. If the request times out, go to **Pitfalls**.

### Step 3 — Parse the response

The API returns:

```json
{
  "reply": "Here are the best-matched forwarders for your lane...",
  "session_id": "abc123",
  "data": {
    "matches": [
      {
        "id": "uuid",
        "company_name": "Boxman Global",
        "country": "UAE",
        "city": "Dubai",
        "rank": 1,
        "score": 91,
        "verification_tier": "verified",
        "confidence_tier": "high",
        "modes": "air,sea",
        "enrichment_summary": "...",
        "match_rationale": "...",
        "strengths": ["Cold chain certified", "FRA–DXB regular lane"],
        "watch_outs": []
      }
    ],
    "recommendation": "Boxman Global is our top pick for this lane..."
  }
}
```

Save `session_id` to Hermes conversation memory for the next turn.

### Step 4 — Format for WhatsApp / messaging

WhatsApp messages must be concise and scannable. Use this template:

```
🔍 *Atlas matched {N} forwarders* for {origin} → {destination} ({mode})

{For each match, rank 1–3:}
*{rank}. {company_name}* — {city}, {country}
{verification badge: ✅ Verified | 🔵 Registered}  Score: {score}/100
{Top 2 strengths, comma-separated}

---
💬 {recommendation_summary — max 2 sentences}

📦 *Get a quote:* goods2load.com/?ref=wa
Reply with a number (1, 2, or 3) for full details.
```

Rules:
- Maximum **3 providers** in the first reply even if more matched
- Keep total message under **1,400 characters** (WhatsApp display limit before "Read more")
- Bold company names with `*asterisks*`
- Never paste the full `enrichment_summary` — use only the `strengths` array
- If `matches` is empty, skip the list and reply with only `reply` text from the API + the booking link

### Step 5 — Handle follow-ups

If the user replies with a number ("1", "give me more on the second one", "book number 3"):

1. Use the stored `session_id` — send the follow-up message directly to the API unchanged
2. The API will return detailed information for that provider
3. Format as:

```
*{company_name}* — Full profile

🌍 {city}, {country}
📊 Verification score: {score}/100
✈️ Modes: {modes}
⭐ Google: {google_rating}/5 ({google_review_count} reviews)

*Why Atlas recommends them:*
{match_rationale}

*Strengths:*
{strengths as bullet list}

📦 Request a quote: goods2load.com/?ref=wa
```

---

## Pitfalls

- **Timeout (> 15 s)**: Reply "Atlas is processing — please try again in a moment." Do not retry automatically; wait for the user to re-send.
- **Empty matches array with a non-empty `reply`**: Just send the `reply` text. Atlas may be giving a clarifying question or a "no match" message — trust it.
- **User sends cargo weight/volume only (no route)**: Always ask for origin + destination before calling. Do not guess a route.
- **Session drift**: If `session_id` returns a 4xx error, drop it and start a fresh session (omit `session_id` field). The conversation context will reset but matching still works.
- **Long commodity descriptions**: The user's full message goes into `content` verbatim. Do not truncate or summarize before sending — Atlas's C1 intent extractor handles it.
- **Non-freight messages after activation**: If a follow-up is clearly off-topic ("what's the weather in Dubai?"), do not call the Atlas API. Answer directly or defer to another skill.

---

## Verification

After each API call, confirm:

1. HTTP status is `200` — anything else is an error (log and surface to user gracefully)
2. `reply` field is a non-empty string
3. `session_id` is saved to conversation memory
4. Formatted message is under 1,400 characters before sending

**Test message you can send to verify the skill is working:**

> "I need to ship 500 kg of automotive parts from Frankfurt to Dubai by air, DG class 9 lithium batteries, mid-June"

Expected: Atlas returns 2–4 matched forwarders with FRA→DXB air capability and DG certification. Boxman Global should appear in the top 3.
