#!/usr/bin/env node
/**
 * Atlas Agent Eval Harness
 * ========================
 * Usage:
 *   node scripts/eval/run-eval.mjs [--url <base>] [--concurrency <n>] [--category <id>] [--json]
 *
 * Options:
 *   --url            Base URL of the Next.js app (default: http://localhost:3000)
 *   --concurrency    Parallel requests (default: 3)
 *   --category       Run only one category (mode_detection | language | specialty_cargo | route_variety | edge_cases | conversation)
 *   --json           Output raw JSON results (for CI)
 *   --timeout        Per-request timeout in ms (default: 60000)
 *
 * Exit code: 0 if overall pass rate ≥ 80%, 1 otherwise (for CI gates).
 *
 * Scoring criteria per query (each checked independently):
 *   reply_nonempty  — reply string is non-empty (core requirement)
 *   has_matches     — ≥1 MatchedProvider returned in data.matches
 *   min_matches     — ≥N providers (optional override)
 *   mode_keyword    — reply contains ≥1 of the listed keywords (case-insensitive)
 *   lang_script     — reply matches the Unicode range regex (non-Latin languages)
 *   no_error        — reply does NOT start with "error" / contain "couldn't process"
 */

import { QUERIES, CATEGORIES } from './queries.mjs';

// ── CLI args ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
function getArg(flag, defaultVal) {
  const idx = args.indexOf(flag);
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : defaultVal;
}
const BASE_URL    = getArg('--url', 'http://localhost:3000');
const CONCURRENCY = parseInt(getArg('--concurrency', '3'), 10);
const FILTER_CAT  = getArg('--category', null);
const JSON_MODE   = args.includes('--json');
const TIMEOUT_MS  = parseInt(getArg('--timeout', '60000'), 10);

// ── Helpers ───────────────────────────────────────────────────────────────────

const RESET  = '\x1b[0m';
const GREEN  = '\x1b[32m';
const RED    = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD   = '\x1b[1m';
const DIM    = '\x1b[2m';
const CYAN   = '\x1b[36m';

function colour(text, c) {
  return JSON_MODE ? text : `${c}${text}${RESET}`;
}
function log(...args) {
  if (!JSON_MODE) console.log(...args);
}

// ── API call ──────────────────────────────────────────────────────────────────

async function callAgent(message) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  const start = Date.now();
  try {
    const res = await fetch(`${BASE_URL}/api/agent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: message }] }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    const elapsed = Date.now() - start;

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      return { ok: false, status: res.status, reply: '', data: null, elapsed, error: text };
    }

    const json = await res.json();
    return {
      ok: true,
      status: res.status,
      reply: json.reply ?? '',
      data: json.data ?? null,
      elapsed,
      error: null,
    };
  } catch (err) {
    clearTimeout(timer);
    const elapsed = Date.now() - start;
    const isTimeout = err.name === 'AbortError';
    return {
      ok: false,
      status: isTimeout ? 408 : 0,
      reply: '',
      data: null,
      elapsed,
      error: isTimeout ? 'timeout' : err.message,
    };
  }
}

// ── Scoring ───────────────────────────────────────────────────────────────────

function scoreResult(query, result) {
  const { expect } = query;
  const { reply, data, ok, error } = result;

  const checks = {};

  if ('reply_nonempty' in expect) {
    checks.reply_nonempty = ok && typeof reply === 'string' && reply.trim().length > 0;
  }

  if ('has_matches' in expect) {
    const matches = data?.matches ?? [];
    checks.has_matches = Array.isArray(matches) && matches.length > 0;
  }

  if ('min_matches' in expect) {
    const matches = data?.matches ?? [];
    checks.min_matches = Array.isArray(matches) && matches.length >= expect.min_matches;
  }

  if ('mode_keyword' in expect) {
    const replyLower = reply.toLowerCase();
    checks.mode_keyword = expect.mode_keyword.some((kw) => replyLower.includes(kw.toLowerCase()));
  }

  if ('lang_script' in expect) {
    checks.lang_script = expect.lang_script.test(reply);
  }

  if ('no_error' in expect) {
    const replyLower = reply.toLowerCase();
    checks.no_error =
      ok &&
      !replyLower.startsWith('error') &&
      !replyLower.includes("couldn't process") &&
      !replyLower.includes('internal error') &&
      !replyLower.includes('matching engine error');
  }

  const total = Object.keys(checks).length;
  const passed = Object.values(checks).filter(Boolean).length;
  const allPassed = passed === total;

  return { checks, passed, total, allPassed };
}

// ── Concurrency pool ──────────────────────────────────────────────────────────

async function runPool(queries, concurrency) {
  const results = new Array(queries.length);
  let i = 0;

  async function worker() {
    while (i < queries.length) {
      const idx = i++;
      const query = queries[idx];
      const result = await callAgent(query.message);
      const score = scoreResult(query, result);
      results[idx] = { query, result, score };

      if (!JSON_MODE) {
        const icon = score.allPassed ? colour('✓', GREEN) : colour('✗', RED);
        const time = colour(`${result.elapsed}ms`, DIM);
        const matches = result.data?.matches?.length ?? 0;
        const matchStr = score.checks.has_matches !== undefined
          ? colour(`[${matches} match${matches !== 1 ? 'es' : ''}]`, matches > 0 ? CYAN : YELLOW)
          : '';
        const failedChecks = Object.entries(score.checks)
          .filter(([, v]) => !v)
          .map(([k]) => k)
          .join(', ');
        const failStr = failedChecks ? colour(` FAIL: ${failedChecks}`, RED) : '';

        console.log(`  ${icon} [${query.id}] ${query.message.slice(0, 55).padEnd(55)} ${time} ${matchStr}${failStr}`);
      }
    }
  }

  const workers = Array.from({ length: Math.min(concurrency, queries.length) }, worker);
  await Promise.all(workers);
  return results;
}

// ── Report ─────────────────────────────────────────────────────────────────────

function buildReport(allResults) {
  const total = allResults.length;
  const passed = allResults.filter((r) => r.score.allPassed).length;
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;

  // Per-category
  const byCategory = {};
  for (const { query, score } of allResults) {
    const cat = query.category;
    if (!byCategory[cat]) byCategory[cat] = { passed: 0, total: 0, failures: [] };
    byCategory[cat].total++;
    if (score.allPassed) {
      byCategory[cat].passed++;
    } else {
      byCategory[cat].failures.push({
        id: query.id,
        message: query.message.slice(0, 60),
        failedChecks: Object.entries(score.checks).filter(([, v]) => !v).map(([k]) => k),
      });
    }
  }

  // Per-check type
  const checkStats = {};
  for (const { score } of allResults) {
    for (const [check, val] of Object.entries(score.checks)) {
      if (!checkStats[check]) checkStats[check] = { passed: 0, total: 0 };
      checkStats[check].total++;
      if (val) checkStats[check].passed++;
    }
  }

  // Timing
  const timings = allResults.map((r) => r.result.elapsed).filter((t) => t > 0);
  timings.sort((a, b) => a - b);
  const p50 = timings[Math.floor(timings.length * 0.5)] ?? 0;
  const p90 = timings[Math.floor(timings.length * 0.9)] ?? 0;
  const avg = timings.length > 0 ? Math.round(timings.reduce((a, b) => a + b, 0) / timings.length) : 0;

  // Match count stats
  const matchCounts = allResults
    .map((r) => r.result.data?.matches?.length ?? 0)
    .filter((_, i) => allResults[i].query.expect.has_matches);
  const avgMatches =
    matchCounts.length > 0
      ? (matchCounts.reduce((a, b) => a + b, 0) / matchCounts.length).toFixed(1)
      : 'n/a';

  return { total, passed, passRate, byCategory, checkStats, p50, p90, avg, avgMatches };
}

// ── Main ───────────────────────────────────────────────────────────────────────

async function main() {
  const queries = FILTER_CAT
    ? QUERIES.filter((q) => q.category === FILTER_CAT)
    : QUERIES;

  if (queries.length === 0) {
    console.error(`No queries found for category: ${FILTER_CAT}`);
    process.exit(1);
  }

  log();
  log(colour('  ╔══════════════════════════════════════════════════╗', BOLD));
  log(colour('  ║  Atlas Agent Eval Harness                        ║', BOLD));
  log(colour('  ╚══════════════════════════════════════════════════╝', BOLD));
  log();
  log(`  ${colour('Endpoint:', DIM)} ${BASE_URL}/api/agent`);
  log(`  ${colour('Queries:', DIM)}  ${queries.length} (concurrency: ${CONCURRENCY})`);
  if (FILTER_CAT) log(`  ${colour('Filter:', DIM)}   ${FILTER_CAT}`);
  log();

  // Group by category for display
  const categories = [...new Set(queries.map((q) => q.category))];
  const allResults = [];

  for (const cat of categories) {
    const catQueries = queries.filter((q) => q.category === cat);
    log(colour(`  ── ${CATEGORIES[cat] ?? cat} (${catQueries.length}) ──────────────────────────────────`, BOLD));
    const results = await runPool(catQueries, CONCURRENCY);
    allResults.push(...results);
    log();
  }

  const report = buildReport(allResults);

  if (JSON_MODE) {
    console.log(JSON.stringify({ report, results: allResults.map(({ query, score, result }) => ({
      id: query.id,
      category: query.category,
      message: query.message.slice(0, 80),
      passed: score.allPassed,
      checks: score.checks,
      elapsed: result.elapsed,
      matches: result.data?.matches?.length ?? 0,
      reply_snippet: result.reply.slice(0, 100),
    })) }, null, 2));
    process.exit(report.passRate >= 80 ? 0 : 1);
  }

  // ── Summary table ──────────────────────────────────────────────────────────

  log(colour('  ═══════════════════════════════════════════════════════', BOLD));
  log(colour('  RESULTS SUMMARY', BOLD));
  log(colour('  ═══════════════════════════════════════════════════════', BOLD));
  log();

  // Overall
  const rateColour = report.passRate >= 80 ? GREEN : report.passRate >= 60 ? YELLOW : RED;
  log(`  Overall pass rate:  ${colour(`${report.passed}/${report.total} (${report.passRate}%)`, rateColour + BOLD)}`);
  log(`  Avg response time:  ${report.avg}ms  |  p50: ${report.p50}ms  |  p90: ${report.p90}ms`);
  log(`  Avg matches/query:  ${report.avgMatches}`);
  log();

  // Per-category
  log(colour('  By category:', BOLD));
  for (const [cat, stats] of Object.entries(report.byCategory)) {
    const rate = Math.round((stats.passed / stats.total) * 100);
    const catColour = rate >= 80 ? GREEN : rate >= 60 ? YELLOW : RED;
    const bar = '█'.repeat(Math.round(rate / 10)) + '░'.repeat(10 - Math.round(rate / 10));
    log(`    ${(CATEGORIES[cat] ?? cat).padEnd(22)} ${colour(bar, catColour)}  ${colour(`${rate}%`, catColour)} (${stats.passed}/${stats.total})`);
    if (stats.failures.length > 0 && !JSON_MODE) {
      for (const f of stats.failures) {
        log(`      ${colour('↳', RED)} [${f.id}] ${f.message.padEnd(55)} ${colour(f.failedChecks.join(', '), RED)}`);
      }
    }
  }

  log();

  // Per-check type
  log(colour('  By check type:', BOLD));
  for (const [check, stats] of Object.entries(report.checkStats)) {
    const rate = Math.round((stats.passed / stats.total) * 100);
    const c = rate >= 80 ? GREEN : rate >= 60 ? YELLOW : RED;
    log(`    ${check.padEnd(20)} ${colour(`${rate}%`, c)} (${stats.passed}/${stats.total})`);
  }

  log();
  log(colour('  ═══════════════════════════════════════════════════════', BOLD));

  if (report.passRate >= 80) {
    log(colour('  ✓ PASS — overall pass rate ≥ 80%', GREEN + BOLD));
  } else {
    log(colour(`  ✗ FAIL — overall pass rate ${report.passRate}% < 80%`, RED + BOLD));
  }
  log(colour('  ═══════════════════════════════════════════════════════', BOLD));
  log();

  process.exit(report.passRate >= 80 ? 0 : 1);
}

main().catch((err) => {
  console.error('Eval harness crashed:', err);
  process.exit(1);
});
