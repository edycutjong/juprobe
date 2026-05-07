# Juprobe — Product Requirements Document

> **Emotional Hook**: A DeFi dev wasted 3 days debugging a silent 429 from Jupiter Quote API — no error message, just a blank response.

## Problem Statement
Jupiter has 5+ APIs but no public DX diagnostic tool. Developers hit undocumented rate limits and silent failures.

## Solution Overview
API stress-test probe that hammers every Jupiter endpoint, measures latency/error rates, generates 2,000-word DX report.

## Core Features (MVP)
1. **Multi-endpoint stress tester (Quote, Swap, Limit Order, DCA, Token List, Price)**
2. **Latency charts (p50/p95 per endpoint)**
3. **Error taxonomy (categorize failure modes)**
4. **Auto-generated DX report (2,000 words)**
5. **Exportable benchmark data (JSON + PDF)**

## Success Metrics
- All SDK features demonstrably integrated
- Demo flow works end-to-end
- Live data where applicable (not mocked)

## Out of Scope
- ❌ Actual trading
- ❌ Portfolio management
- ❌ Custom strategies
