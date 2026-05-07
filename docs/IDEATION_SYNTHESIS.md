# 🏆 Jupiter Developer Platform — Ideation Synthesis (3-Model Consensus)

> **Models Consulted**: GLM 5 Deep Think · DeepSeek Deep Think · Gemini Deep Think
> **Synthesized**: 2026-05-06
> **Verdict**: Build **JupCrash** — SDK Interrogator / DX Probe with AI Stack audit

---

## ⚠️ CRITICAL: All 3 Models Used Wrong Judging Criteria

> [!CAUTION]
> Every model scored ideas against: DX Report (35%) + Integration (30%) + Innovation (20%) + Presentation (15%). **The actual rubric from RESEARCH.md is:**
>
> | Criterion | Weight |
> |---|---|
> | DX Report Quality | 35% |
> | **AI Stack Feedback** (Skills, CLI, Docs MCP, llms.txt) | **25%** |
> | Technical Execution | 25% |
> | Creativity & Ambition | 15% |
>
> **AI Stack is 25% of the score.** Zero ideas from any model explicitly test Jupiter's AI Stack (Agent Skills, Jupiter CLI, Docs MCP, llms.txt). This is a **free 25% that every competitor will also miss.** Whoever tests the AI Stack wins.

---

## ⚡ Executive Summary

All three models reached **unanimous strategic conclusions**:

1. **The DX Report IS the submission** — 35% of score, most competitors will skip or phone it in
2. **The app is a crash test dummy** — its purpose is to generate reportable friction, not to look pretty
3. **Bug-finding > feature-building** — specific error codes, type safety gaps, and undocumented limits win
4. **Report-first schedule** — Day 4 is a full writing day. No code. All 3 models mandate this
5. **Perps API is the high-risk/high-reward play** — least documented, most valuable feedback, but scope-dangerous
6. **Multi-API composition exposes architectural silos** — chaining APIs reveals the juiciest DX feedback

### 🚨 The Missing 25%: AI Stack

None of the 15 ideas across 3 models address the AI Stack criterion. The winning strategy is simple: **bolt AI Stack testing onto the top-ranked idea.** Test Agent Skills, query Docs MCP, use Jupiter CLI, parse llms.txt — and write a dedicated section in the DX Report about it.

---

## 🗺️ Idea Convergence Matrix

15 ideas across 3 models. Here's where they agreed:

| Theme | GLM 5 | Gemini | DeepSeek | Consensus |
|---|---|---|---|---|
| **QA/Chaos Test Suite** | — | JupCrash ★★ | Jupiter DX Crucible ★★ | 2/3 ✅ |
| **Code-Gen Sandbox / DevTool** | Code-Gen Sandbox ★★ | — | — | 1/3 |
| **Multi-API Strategy Composer** | Strategy Composer ★ | — | Jupyfolio ★ | 2/3 ✅ |
| **AI-Powered Route Explainer** | AI Route Explainer | OmniJup (AI Agent) | — | 2/3 ✅ |
| **Stress Test / Scanner** | Stress Test Scanner | — | — | 1/3 |
| **Perps Delta-Neutral** | Perps Delta-Neutral | DeltaParity ★ | — | 2/3 ✅ |
| **Grid Trading (Limit Order Abuse)** | — | JupGrid | — | 1/3 |
| **Dust Sweep → DCA** | — | Dust2DCA | — | 1/3 |
| **Limit Order Auditor** | — | — | OrderFlow Auditor | 1/3 |
| **Browser Extension (Passive)** | — | — | DX Snitch | 1/3 |
| **DCA Companion** | — | — | DCA Companion | 1/3 |

### 🏆 Consensus Winners (≥ 2/3 models recommend)

1. **QA/Chaos Test Suite** — 2/3 models. Gemini's JupCrash + DeepSeek's DX Crucible. Pure DX-report-generation machine
2. **Multi-API Composition** — 2/3 models. GLM's Strategy Composer + DeepSeek's Jupyfolio. Exposes architectural silos
3. **AI-Powered Understanding** — 2/3 models. GLM's AI Explainer + Gemini's OmniJup. Tests LLM-friendliness of API
4. **Perps Integration** — 2/3 models. GLM's Delta-Neutral + Gemini's DeltaParity. Highest-value undocumented API feedback

### 🎖️ Highest-Scored (Model Picks)

| Model | Pick | Score | Why |
|---|---|---|---|
| GLM 5 | Code-Gen Sandbox | 95/100 | "Postman for Jupiter" — judges love meta-tools |
| Gemini | JupCrash | 93/100 | The app IS the QA suite. Bugs are features |
| DeepSeek | Jupiter DX Crucible | 95/100 | Structured test harness across all 6 APIs |

---

## 🔬 Deep Analysis: Top 3 Contenders

### 🥇 JupCrash / DX Crucible (The QA Assassin)

**2/3 models independently converged on this archetype.** Gemini called it "JupCrash" (chaos fuzzer), DeepSeek called it "DX Crucible" (structured test harness). Same DNA.

| Attribute | JupCrash (Gemini) | DX Crucible (DeepSeek) | Merged |
|---|---|---|---|
| **Core** | Bomb APIs with malformed payloads | Structured edge-case test suite | Both: systematic API stress-testing |
| **APIs** | Swap, Limit, DCA, Perps, Price, Token List | Same 6 | All 6 → maximum DX surface |
| **Dashboard** | Pass/Fail states + error JSON | Test results + anomaly charts | Simple dashboard showing test outcomes |
| **DX Report** | Error schema, rate limits, type gaps | API-by-API analysis, consistency issues | The most comprehensive possible |
| **Score** | 93/100 | 95/100 | ~94/100 |
| **Difficulty** | 4/10 | Medium | 4-5/10 ← easiest top pick |
| **Risk** | Low build, high meta | Low | 🟢 Low |

> [!IMPORTANT]
> **This is the clear winner.** Both models that proposed it scored it highest. It has the lowest build difficulty, generates the maximum DX report surface, and directly serves the judges' actual need (QA feedback). The "app" is just a dashboard showing test results — all effort goes into the report.

### 🥈 Code-Gen Sandbox (The Meta Developer Tool)

GLM's top pick at 95/100. "Postman for Jupiter" — configure a swap/limit order via UI, auto-generate copy-paste TypeScript.

- **Strength**: Forces you to understand API structure deeply enough to abstract it. DX report writes itself ("Time to First Swap" metric)
- **Weakness**: String templating is high technical debt. Code generation must handle edge cases perfectly or you look incompetent
- **Difficulty**: 8/10 — significantly harder than JupCrash
- **DX Surface**: Narrower. You critique the API as a code-gen author, not as a bug hunter

### 🥉 DeltaParity / Perps (The Bleeding Edge)

2/3 models identified Perps as the highest-value-per-finding API — but also the highest scope risk.

- **Strength**: Almost nobody uses Perps API in hackathons. Finding issues there = ultra-rare, high-value feedback
- **Weakness**: "Day 1: Read Perps docs. Cry." — GLM's 3-day plan literally includes panic
- **Difficulty**: 9-10/10
- **Verdict**: Only attempt if you're a strong TS/DeFi dev AND willing to risk no working demo

---

## 🎯 Final Recommendation

### The Strategic Decision

| Path | Concept | Risk | Reward | Difficulty |
|---|---|---|---|---|
| **Dominant** | JupCrash + AI Stack Audit | 🟢 Low | 🥇 1st ($1,500) | 4/10 |
| **Safe** | Code-Gen Sandbox | 🟡 Medium | 🥈 2nd ($1,000) | 8/10 |
| **YOLO** | DeltaParity (Perps) | 🔴 High | 🥇 or 💀 | 10/10 |

### ⚡ BUILD: JupCrash (SDK Interrogator + AI Stack Audit)

> [!IMPORTANT]
> **JupCrash wins the synthesis.** Here's why:
> 1. **2/3 model consensus** — Gemini and DeepSeek both independently converged on this archetype
> 2. **Lowest difficulty** (4/10) — the "code" is just test scripts and a results dashboard
> 3. **Maximum DX surface** — tests all 6+ APIs = most material for the 35% report
> 4. **AI Stack bolt-on** — adding Jupiter CLI + Docs MCP + Skills + llms.txt testing captures the **free 25%** nobody else will claim
> 5. **The bugs ARE the features** — every error, timeout, and type mismatch is a winning paragraph
> 6. **Cross-submit impossible to beat** — pure developer-focused submission

### The 25% AI Stack Bolt-On (The Secret Weapon)

Add a dedicated section to JupCrash that tests Jupiter's AI Stack:

| AI Tool | What to Test | DX Report Section |
|---|---|---|
| **Agent Skills** | Feed skills to your coding agent. Does it generate correct API calls? | "AI Skill Accuracy" |
| **Jupiter CLI** | Execute swaps, limits, DCA via CLI. Document UX friction | "CLI Ergonomics" |
| **Docs MCP** | Query docs via MCP. Are answers accurate? Stale? | "MCP Documentation Freshness" |
| **llms.txt** | Parse the LLM-optimized docs. Completeness vs main docs? | "llms.txt Coverage Gaps" |

> [!TIP]
> **This is the kill shot.** 25% of the score is AI Stack feedback. If you spend 2 hours testing these 4 tools and writing 500 words about each, you capture an entire rubric quadrant that most competitors won't even know exists.

### Why Not Code-Gen Sandbox?

GLM scored it 95/100 — highest of any single model. But:
1. **8/10 difficulty** vs 4/10 for JupCrash. In a 3-day sprint, difficulty kills
2. **String templating edge cases** — if generated code has a bug, you look incompetent in a DX-focused track
3. **Narrower DX surface** — you critique the API as a code-gen author, JupCrash critiques everything
4. **No AI Stack coverage** — harder to bolt on AI Stack testing to a code-gen tool

---

## 🏗️ Recommended Build Plan (JupCrash + AI Stack Audit)

### Day 1: Test Harness + Happy Paths
- Jupiter API key + SDK setup
- Write wrappers for all 8 APIs: Swap V2, Trigger (Limit/OCO/OTOCO), Recurring (DCA), Perps, Price, Tokens, Lend, Prediction Markets
- Run happy-path tests for each. **Document every stumble in a friction log**
- Test AI Stack: install Agent Skills, try Jupiter CLI, query Docs MCP
- Cache all responses in Supabase for demo safety

### Day 2: Chaos Testing + Dashboard
- Write chaos loops: malformed inputs, 0-liquidity tokens, expired blockhashes, strings-as-ints, extreme slippage values
- Cross-API consistency checks: same token metadata across endpoints, error format standardization
- Test Lend API + Prediction Markets (newer APIs = higher bug density)
- Build minimal Next.js dashboard: Pass/Fail grid, error JSON viewer, latency charts
- Continue AI Stack testing: llms.txt completeness audit

### Day 3: Polish + Freeze Code
- Handle 5 specific error scenarios with beautiful error display
- Framer Motion entrance animations for the test results
- Deploy to Vercel
- **Code freeze by EOD.** All remaining time goes to writing

### Day 4: THE HOLY DAY — DX Report
**DO NOT CODE.** Write the entire DX Report:

1. **Executive Summary** — 200 words
2. **Methodology** — test harness architecture, tools used
3. **API-by-API Analysis** (8 sections):
   - Swap V2: input validation, routing transparency, gasless swap DX
   - Trigger API: OCO/OTOCO lifecycle, limit order state transitions
   - Recurring API: DCA parameter rigidity, modification limitations
   - Perps API: margin initialization, funding rate freshness
   - Tokens API: search accuracy, organic score meaning
   - Price API: decimal precision, cache inconsistency
   - Lend API: flashloan DX, yield calculation clarity
   - Prediction Markets: market creation flow, resolution mechanics
4. **AI Stack Feedback** (4 sections):
   - Agent Skills accuracy
   - Jupiter CLI ergonomics
   - Docs MCP freshness & coverage
   - llms.txt completeness gaps
5. **Cross-API Consistency Issues** — error schemas, parameter naming, response envelopes
6. **Rate Limiting & Performance** — latency distribution, 429 handling, retry headers
7. **Type Safety Audit** — where TS types fail at runtime
8. **The Fix** — proposed `JupError` class, suggested API changes with code diffs
9. **Conclusion & Top 10 Actions** — prioritized improvement list

### Day 5: Video + Submission
- 15 seconds showing the app works
- 90 seconds scrolling through the DX Report highlighting specific bugs
- Say: "I focused entirely on generating actionable developer feedback for your team"
- Submit with DX_REPORT.md prominently linked in README

### Day 6: Buffer
- Submit early. Sleep.

### 30s Demo Script
> "Jupiter has 8 APIs. I built a test harness that deliberately breaks all of them."
> *[Click "Run Chaos Suite"]*
> "50 tests across Swap, Trigger, DCA, Perps, Lend, Prediction Markets. Watch the failures populate."
> *[Dashboard fills with red/green]*
> "This 503 on Lend isn't documented. This type mismatch on Trigger silently fails. And here's my 2,000-word DX Report with 10 specific fixes — including a unified JupError class I wrote for them."

---

## 🔗 Cross-Submit Strategy

| Track | Prize | Fit | Angle |
|---|---|---|---|
| **Jupiter** (primary) | $1,500 | 🔵 10/10 | Full API surface + AI Stack audit |
| **100xDevs** | $10,000 | 🟡 5/10 | Developer tooling track if they have one |

> [!NOTE]
> JupCrash is highly specialized for Jupiter. Cross-submit potential is limited compared to more generic apps. **This is intentional** — focus beats breadth when 35% of the score is a DX report about Jupiter specifically.

---

## 🪓 Kill Your Darlings — Final Check

| Check | JupCrash | Pass? |
|---|---|---|
| DX Report budget? | Full Day 4 dedicated | ✅ |
| AI Stack tested? | Skills + CLI + MCP + llms.txt | ✅ |
| Multi-API (3+)? | All 8 APIs tested | ✅ |
| Bug-finding focus? | Chaos testing is the core mechanic | ✅ |
| Not over-scoped? | Dashboard is minimal, tests are scripts | ✅ |
| 3-day buildable? | 4/10 difficulty, scripting + simple UI | ✅ |
| Actionable feedback? | Proposed JupError class + code diffs | ✅ |
| Video strategy? | 90s on DX Report, 15s on app | ✅ |

---

## 📊 Model Score Comparison (Corrected Rubric)

> [!NOTE]
> Scores below are re-estimated against the **actual rubric** (DX 35% + AI Stack 25% + Tech Execution 25% + Creativity 15%), not the wrong rubric the models used.

| Model | Top Pick | Original Score | Corrected Score | AI Stack Coverage |
|---|---|---|---|---|
| GLM 5 | Code-Gen Sandbox | 95/100 | ~78/100 | ❌ None |
| Gemini | JupCrash | 93/100 | ~85/100 | ❌ None (but easy to add) |
| DeepSeek | DX Crucible | 95/100 | ~87/100 | ❌ None (but easy to add) |
| **Synthesis** | **JupCrash + AI Stack** | — | **~95/100** | ✅ Full coverage |

**The synthesis verdict**: JupCrash + AI Stack Audit. The 25% AI Stack bolt-on is the difference between 🥈 and 🥇. Every other competitor will miss it. Ship the autopsy.
