# Juprobe — Full Project Brief

## PRD
> **Hook**: A DeFi dev wasted 3 days debugging a silent 429 from Jupiter's Quote API — no error message, no docs, just a blank response. Juprobe would have caught it in 10 seconds.

**Problem**: Jupiter has 5+ APIs but no public DX diagnostic tool. Developers hit undocumented rate limits, silent failures, and inconsistent error messages.

**Solution**: API stress-test probe that hammers every Jupiter endpoint, measures latency/error rates, and auto-generates a 2,000-word DX report with actionable feedback.

**Core Features**:
1. Multi-endpoint stress tester (Quote, Swap, Limit Order, DCA, Token List, Price)
2. Latency charts (p50/p95 per endpoint)
3. Error taxonomy (categorize every failure mode)
4. Auto-generated DX report (2,000 words) with specific improvement suggestions
5. Exportable benchmark data (JSON + PDF)

**Out of Scope**: Actual trading, portfolio management, custom strategies

---

## ARCHITECTURE
| Layer | Technology |
|---|---|
| Frontend | Next.js 16, React 19, Tailwind v4 |
| Data | Jupiter SDK (Quote, Swap, Limit, DCA, Token List, Price APIs) |
| Charts | Recharts (latency, error rates) |
| Report | jsPDF (DX report) |
| Database | Supabase (benchmark history) |

**Jupiter API depth**: 6+ endpoints tested with concurrency, rate limit detection, error classification.

---

## BUILD PLAN (3 Days)
- **Day 1**: Jupiter API integration (6 endpoints), stress test runner, latency measurement
- **Day 2**: Charts (Recharts), error taxonomy, DX report generator
- **Day 3**: Polish dashboard, generate 2,000-word report, demo video

---

## SUBMISSION
**Short**: Jupiter API DX probe — stress test every endpoint, measure latency, generate actionable DX report.
**Demo**: Run probe → watch latency charts populate → errors categorized → "Download DX Report" → 2,000-word PDF.

---

## SEED DATA
Pre-cached benchmark runs (3 time periods), error samples from each endpoint, sample DX report.

---

## UI
Developer tool aesthetic (VS Code-inspired), endpoint list with status indicators, real-time latency charts, error log terminal, report preview panel.
