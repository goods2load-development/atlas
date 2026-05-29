# Atlas Eval Harness — Baseline Results

Run date: 2026-05-29  
Endpoint: https://atlas.goods2load.com/api/agent  
Concurrency: 1 (sequential) — Atlas Python backend is single-threaded

## Summary

| Category | Queries | Pass | Rate | p50 | p90 |
|---|---|---|---|---|---|
| Mode Detection | 10 | 10 | 100% | ~28s | ~35s |
| Language Handling | 8 | 8 | 100% | 31s | 35s |
| Specialty Cargo | 8 | — | TBD | — | — |
| Route Variety | 12 | — | TBD | — | — |
| Edge Cases | 7 | 7 | 100% | 28s | 33s |
| Conversation | 5 | — | TBD | — | — |

## Key Metrics (sequential)

- **Overall (25 of 25 tested):** 100% pass rate
- **p50 response:** ~28–31s
- **p90 response:** ~33–35s
- **Avg matches returned:** 5 providers per query
- **Language accuracy:** 4/4 non-Latin scripts returned in correct script (Arabic, Chinese, Russian, Japanese)

## Known Limitation

At concurrency ≥ 2, requests time out because the Atlas Python FastAPI backend
processes requests synchronously on a single worker. Under parallel load:
- Concurrent pass rate: 20% (2/10)
- Root cause: single Uvicorn worker, no async queue

**Fix:** Run Uvicorn with `--workers 4` or add a Celery/Redis queue layer.

## How to run

```bash
# Full eval (sequential)
node scripts/eval/run-eval.mjs --url https://atlas.goods2load.com --concurrency 1

# By category
node scripts/eval/run-eval.mjs --url https://atlas.goods2load.com --category language --concurrency 1

# Local dev
npm run eval

# Production
npm run eval:prod

# CI (JSON output, exits 1 if < 80%)
npm run eval:json -- --url https://atlas.goods2load.com --concurrency 1
```

## Scoring criteria per query

| Check | Description |
|---|---|
| `reply_nonempty` | Reply string is non-empty |
| `has_matches` | ≥1 MatchedProvider returned |
| `min_matches` | ≥N providers (where specified) |
| `mode_keyword` | Reply contains expected transport mode keyword |
| `lang_script` | Reply contains expected Unicode script characters |
| `no_error` | Reply does not contain error phrases |
