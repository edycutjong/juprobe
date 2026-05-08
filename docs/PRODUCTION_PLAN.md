# Juprobe — Production Plan

## Deployment
Vercel frontend, Supabase benchmark history

## Verification Scripts
### `scripts/bench.py`
- SDK integration latency (p50/p95)
- End-to-end flow latency

### `scripts/verify_offline.py`
- SDK responds correctly
- Seed data loaded
- Demo flow works end-to-end

## Pre-Submission Checklist
- [ ] Core SDK features working
- [ ] Demo video recorded (< 3 min)
- [x] bench.py latency results included
- [x] README with architecture diagram
