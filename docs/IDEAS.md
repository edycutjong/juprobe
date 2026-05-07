# 💡 Jupiter — Selected Idea

> **Decision**: Juprobe (confirmed 2026-05-07)
> **Source**: Cross-model consensus, "Full-Stack Synergy" DX strategy

---

## ✅ SELECTED: Juprobe — Jupiter API Stress-Test Probe + DX Report

| Field | Value |
|-------|-------|
| **Name** | Juprobe |
| **One-liner** | API stress-testing DX probe that hammers every Jupiter endpoint, measures latency/error rates, and auto-generates a 2,000-word developer experience report with actionable feedback for the Jupiter team |
| **Target Track** | Primary: **Jupiter Developer Platform** |
| **Docs Distance** | 🟢 Novel — Not a swap UI, it's a meta-tool FOR Jupiter |
| **Winner Archetype** | Infrastructure — "The tool Jupiter's own team would use" |
| **SDK Surface Area** | 5+ — Quote API, Swap API, Limit Order API, DCA API, Token List API, Price API |
| **Production Plan** | Vercel deployment, published DX report as PDF, benchmark scripts |
| **Difficulty** | Medium (5/10) |
| **Tech Stack** | Next.js 16, Jupiter SDK, Recharts, jsPDF, Tailwind v4 |

---

## Gate Check

| Gate | Result |
|------|--------|
| ❌ Emotional Hook Test | ✅ PASS — "A DeFi dev wasted 3 days debugging a silent 429 from Jupiter's Quote API — no error message, no docs, just a blank response" |
| ❌ Docs Distance = 🔴 | ✅ PASS — 🟢 Meta-tool, not a swap interface |
| ❌ Winner Archetype = Visualization only | ✅ PASS — Infrastructure (DX diagnostic tool) |
| ❌ Scope = Wide+Shallow | ✅ PASS — ONE flow: Select endpoints → Stress test → Visualize latency → Generate DX report |
| ❌ Rubric Alignment < 70% | ✅ PASS — Deep API usage across 5+ endpoints |

---

## Why This Wins

1. **The DX report IS the submission** — 2,000 words of actionable Jupiter feedback = goodwill with judges
2. **Tests every API surface** — proves deep integration (40% rubric)
3. **Reproducible benchmarks** — p50/p95 latency charts with `bench.py`
4. **Jupiter's team WANTS this** — internal tool narrative wins

## Runner-Up Ideas

| Rank | Idea | Score | Why Not |
|------|------|-------|---------|
| #2 | Swap Aggregator Comparator | 85/100 | Commodity, many will build this |
| #3 | Limit Order Dashboard | 80/100 | Too simple, docs-adjacent |
