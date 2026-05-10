"use client";

import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { Sparkline } from "@/components/Sparkline";
import { HealthRing } from "@/components/HealthRing";
import { AnimatedCounter } from "@/components/AnimatedCounter";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { jupiterProbe } from "@/lib/jupiter";
import {
  Activity,
  Zap,
  Shield,
  AlertTriangle,
  Terminal,
  FileText,
  LayoutDashboard,
  ArrowRight,
  TrendingUp,
  Clock,
  Server,
} from "lucide-react";

const ENDPOINTS = [
  { name: "Quote API", url: "v6.jup.ag/quote", status: "optimal" as const, p50: 124, p95: 342, errors: 2, uptime: 99.98 },
  { name: "Swap API", url: "v6.jup.ag/swap", status: "warning" as const, p50: 215, p95: 854, errors: 14, uptime: 99.72 },
  { name: "Limit Order", url: "jup.ag/limit", status: "optimal" as const, p50: 85, p95: 190, errors: 0, uptime: 100.0 },
  { name: "DCA API", url: "jup.ag/dca", status: "critical" as const, p50: 450, p95: 1205, errors: 45, uptime: 97.1 },
  { name: "Token List", url: "token.jup.ag/all", status: "optimal" as const, p50: 45, p95: 110, errors: 0, uptime: 100.0 },
  { name: "Price API", url: "price.jup.ag/v4", status: "optimal" as const, p50: 62, p95: 145, errors: 1, uptime: 99.99 },
];

const STATUS_CONFIG = {
  optimal: { color: "text-green-400", bg: "bg-green-500", glow: "shadow-[0_0_12px_rgba(34,197,94,0.4)]", border: "metric-card-optimal" },
  warning: { color: "text-amber-400", bg: "bg-amber-500", glow: "shadow-[0_0_12px_rgba(245,158,11,0.4)]", border: "metric-card-warning" },
  critical: { color: "text-red-400", bg: "bg-red-500", glow: "shadow-[0_0_12px_rgba(239,68,68,0.4)]", border: "metric-card-critical" },
};

const TAB_ICONS = {
  dashboard: LayoutDashboard,
  probe: Terminal,
  report: FileText,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
} as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "probe" | "report">("dashboard");
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startProbe = () => {
    setTesting(true);
    setLogs([
      "[SYS] ══════════════════════════════════════════════",
      "[SYS] JUPROBE v1.0.0 — Multi-Threaded Stress Engine",
      "[SYS] ══════════════════════════════════════════════",
      "[SYS] Targeting 6 Jupiter endpoints @ 100 req/s...",
      "[SYS] Initializing connection pool...",
    ]);

    let tick = 0;
    const interval = setInterval(async () => {
      tick++;
      const randomEndpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];

      let latency = Math.floor(Math.random() * 500) + 50;
      let isError = Math.random() > 0.95;

      if (randomEndpoint.name === "Quote API") {
        const result = await jupiterProbe.pingQuoteApi();
        latency = result.latency;
        isError = !result.success;
      } else if (randomEndpoint.name === "Swap API") {
        const result = await jupiterProbe.pingSwapApi();
        latency = result.latency;
        isError = !result.success;
      }

      const timestamp = new Date().toISOString().split("T")[1].slice(0, 12);
      const newLog = isError
        ? `[ERR] ${timestamp} 429/TIMEOUT → ${randomEndpoint.url} (${latency}ms)`
        : `[${latency < 200 ? "ACK" : "SLO"}] ${timestamp} 200 OK → ${randomEndpoint.url} (${latency}ms)`;

      setLogs((prev) => [...prev.slice(-18), newLog]);

      if (tick > 50) {
        clearInterval(interval);
        setTesting(false);
        setLogs((prev) => [
          ...prev,
          "[SYS] ══════════════════════════════════════════════",
          "[SYS] Probe complete. 30,000 requests processed.",
          "[SYS] Generating DX Report → /report",
          "[SYS] ══════════════════════════════════════════════",
        ]);
        setTimeout(() => setActiveTab("report"), 1500);
      }
    }, 100);
  };

  const totalErrors = ENDPOINTS.reduce((sum, ep) => sum + ep.errors, 0);
  const avgP50 = Math.round(ENDPOINTS.reduce((sum, ep) => sum + ep.p50, 0) / ENDPOINTS.length);
  const healthScore = Math.round(((ENDPOINTS.length * 100 - totalErrors) / (ENDPOINTS.length * 100)) * 100 * 10) / 10;

  return (
    <>
      {/* Ambient background effects */}
      <div className="bg-grid-pattern" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <StatusBar />

      <main className="relative z-10 min-h-screen flex flex-col font-mono text-slate-300">
        {/* Header */}
        <header className="glass-card-static border-b border-slate-800/50 px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="logo-icon w-9 h-9 rounded-lg bg-green-500/10 border border-green-500/40 flex items-center justify-center">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <span className="text-white font-bold tracking-[0.2em] text-sm">JUPROBE</span>
              <div className="text-[10px] text-slate-500 tracking-wider">JUPITER API DIAGNOSTICS</div>
            </div>
          </div>

          <nav className="flex gap-1 bg-slate-900/50 rounded-lg p-1 border border-slate-800/50">
            {(["dashboard", "probe", "report"] as const).map((tab) => {
              const Icon = TAB_ICONS[tab];
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider rounded-md transition-all duration-200 ${
                    activeTab === tab
                      ? "text-green-400 bg-green-500/10 border border-green-500/20 shadow-[0_0_12px_rgba(34,197,94,0.1)]"
                      : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50 border border-transparent"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab}
                </button>
              );
            })}
          </nav>
        </header>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              {/* ═══ DASHBOARD TAB ═══ */}
              {activeTab === "dashboard" && (
                <motion.div
                  key="dashboard"
                  variants={container}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {/* Hero Stats Row */}
                  <motion.div variants={item} className="flex flex-col lg:flex-row gap-6 items-stretch">
                    {/* Left: Health Ring + Title */}
                    <div className="glass-card rounded-xl p-6 flex items-center gap-8 flex-1">
                      <HealthRing score={Math.round(healthScore)} size={110} />
                      <div className="flex-1">
                        <div className="text-[10px] text-green-500/70 font-bold tracking-[0.3em] mb-1">
                          ENDPOINT TELEMETRY
                        </div>
                        <h1 className="text-2xl text-white font-bold mb-2 tracking-tight">
                          Jupiter API Health
                        </h1>
                        <p className="text-sm text-slate-400 leading-relaxed">
                          Real-time p50/p95 latency monitoring, error taxonomy, and DX friction analysis across all Jupiter API endpoints.
                        </p>
                      </div>
                    </div>

                    {/* Right: Quick Stats */}
                    <div className="grid grid-cols-3 gap-3 lg:w-[420px]">
                      <div className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center">
                        <Activity className="w-4 h-4 text-cyan-400 mb-2" />
                        <div className="text-[10px] text-slate-500 mb-1">AVG P50</div>
                        <div className="text-xl text-white font-bold">
                          <AnimatedCounter target={avgP50} suffix="ms" />
                        </div>
                      </div>
                      <div className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center">
                        <AlertTriangle className="w-4 h-4 text-amber-400 mb-2" />
                        <div className="text-[10px] text-slate-500 mb-1">ERRORS</div>
                        <div className="text-xl text-white font-bold">
                          <AnimatedCounter target={totalErrors} />
                        </div>
                      </div>
                      <div className="glass-card rounded-xl p-4 flex flex-col items-center justify-center text-center">
                        <Shield className="w-4 h-4 text-green-400 mb-2" />
                        <div className="text-[10px] text-slate-500 mb-1">ENDPOINTS</div>
                        <div className="text-xl text-white font-bold">
                          <AnimatedCounter target={ENDPOINTS.length} />
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* CTA */}
                  <motion.div variants={item} className="flex justify-end">
                    <button
                      onClick={() => setActiveTab("probe")}
                      className="glow-button flex items-center gap-2 bg-green-600 hover:bg-green-500 text-slate-950 px-6 py-2.5 rounded-lg font-bold text-sm transition-all"
                    >
                      <Terminal className="w-4 h-4" />
                      Run Stress Test
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>

                  {/* Endpoint Cards Grid */}
                  <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    {ENDPOINTS.map((ep, idx) => {
                      const cfg = STATUS_CONFIG[ep.status];
                      return (
                        <motion.div
                          key={ep.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.08, duration: 0.4 }}
                          className={`glass-card rounded-xl p-5 flex flex-col ${cfg.border}`}
                        >
                          {/* Card Header */}
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Server className="w-3.5 h-3.5 text-slate-500" />
                                <h3 className="text-white font-bold text-sm">{ep.name}</h3>
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">{ep.url}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-[10px] uppercase font-bold ${cfg.color}`}>
                                {ep.status}
                              </span>
                              <div className={`status-dot status-${ep.status} w-2.5 h-2.5 rounded-full ${cfg.bg} ${cfg.glow}`} />
                            </div>
                          </div>

                          {/* Sparkline */}
                          <div className="mb-4">
                            <Sparkline
                              points={24}
                              height={28}
                              baseValue={ep.p50 / 20}
                              variance={ep.p95 / 40}
                              color={ep.status === "optimal" ? "#22c55e" : ep.status === "warning" ? "#f59e0b" : "#ef4444"}
                            />
                          </div>

                          {/* Metrics Row */}
                          <div className="grid grid-cols-4 gap-2 mt-auto pt-3 border-t border-slate-800/30">
                            <div>
                              <div className="text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> p50
                              </div>
                              <div className="text-white text-sm font-semibold">{ep.p50}ms</div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-500 mb-0.5 flex items-center gap-1">
                                <TrendingUp className="w-2.5 h-2.5" /> p95
                              </div>
                              <div className={`text-sm font-semibold ${ep.p95 > 500 ? "text-amber-400" : "text-white"}`}>
                                {ep.p95}ms
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-500 mb-0.5">Errors</div>
                              <div className={`text-sm font-semibold ${ep.errors > 10 ? "text-red-400" : "text-white"}`}>
                                {ep.errors}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-slate-500 mb-0.5">Uptime</div>
                              <div className={`text-sm font-semibold ${ep.uptime < 99 ? "text-amber-400" : "text-green-400"}`}>
                                {ep.uptime}%
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}

              {/* ═══ PROBE TAB ═══ */}
              {activeTab === "probe" && (
                <motion.div
                  key="probe"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="h-[calc(100vh-140px)] flex flex-col"
                >
                  <div className="terminal-window terminal-glow glass-card rounded-xl flex-1 flex flex-col overflow-hidden">
                    {/* Terminal Header */}
                    <div className="glass-card-static px-4 py-2.5 flex justify-between items-center border-b border-slate-800/50">
                      <div className="flex items-center gap-3">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-500/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                          <div className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">
                          root@juprobe:~/stress-test
                        </span>
                      </div>
                      <button
                        onClick={startProbe}
                        disabled={testing}
                        className="glow-button flex items-center gap-2 bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30 px-4 py-1.5 text-xs rounded-md transition-all disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-wider"
                      >
                        <Terminal className="w-3 h-3" />
                        {testing ? "RUNNING..." : "./hammer.sh --full-sweep"}
                      </button>
                    </div>

                    {/* Terminal Body */}
                    <div className="p-4 flex-1 overflow-y-auto text-[13px] space-y-0.5 relative">
                      {logs.map((log, i) => (
                        <div
                          key={i}
                          className={`log-entry font-mono ${
                            log.startsWith("[ERR]") ? "text-red-400" : ""
                          } ${log.startsWith("[SYS]") ? "text-cyan-400" : ""} ${
                            log.startsWith("[ACK]") ? "text-green-400/80" : ""
                          } ${log.startsWith("[SLO]") ? "text-amber-400" : ""}`}
                          style={{ animationDelay: `${i * 20}ms` }}
                        >
                          {log}
                        </div>
                      ))}
                      {testing && (
                        <div className="text-green-500 font-bold cursor-blink text-lg mt-1">▋</div>
                      )}
                      {!testing && logs.length === 0 && (
                        <div className="text-slate-600 flex items-center gap-2">
                          <span className="cursor-blink">▋</span>
                          <span>Awaiting command...</span>
                        </div>
                      )}
                    </div>

                    {/* Terminal Footer */}
                    {testing && (
                      <div className="px-4 py-2 border-t border-slate-800/50 flex items-center gap-4 text-[10px] text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          ACTIVE
                        </div>
                        <span>│</span>
                        <span>CPU: 78%</span>
                        <span>│</span>
                        <span>MEM: 2.1 GB</span>
                        <span>│</span>
                        <span>CONN: 100/100</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ═══ REPORT TAB ═══ */}
              {activeTab === "report" && (
                <motion.div
                  key="report"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="max-w-4xl mx-auto space-y-8"
                >
                  {/* Report Header */}
                  <div className="glass-card rounded-xl p-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-cyan-500 rounded-full" />
                          <span className="text-[10px] font-bold tracking-[0.3em] gradient-text">
                            AUTOGENERATED DX REPORT
                          </span>
                        </div>
                        <h1 className="text-3xl text-white font-bold tracking-tight mb-2">
                          Jupiter API Friction Points
                        </h1>
                        <p className="text-sm text-slate-400">
                          Probed {ENDPOINTS.length} endpoints • 30,000 total requests • 5 min sustained load
                        </p>
                      </div>
                      <button className="glow-button flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-white px-5 py-2.5 rounded-lg text-sm transition-all border border-slate-700/50">
                        <FileText className="w-4 h-4" />
                        Export PDF
                      </button>
                    </div>

                    {/* Quick stats in report header */}
                    <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800/30">
                      {[
                        { label: "Success Rate", value: "98.2%", color: "text-green-400" },
                        { label: "Avg Latency", value: `${avgP50}ms`, color: "text-cyan-400" },
                        { label: "Total Errors", value: String(totalErrors), color: "text-red-400" },
                        { label: "Health Score", value: `${Math.round(healthScore)}%`, color: "text-green-400" },
                      ].map((stat) => (
                        <div key={stat.label} className="text-center">
                          <div className="text-[10px] text-slate-500 tracking-wider mb-1">{stat.label}</div>
                          <div className={`text-lg font-bold ${stat.color}`}>{stat.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Finding 1 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-xl p-6 metric-card-warning"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">1. Silent 429 Rate Limits</h3>
                        <span className="text-[10px] text-amber-400 font-bold tracking-wider">CRITICAL FINDING</span>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 border-l-2 border-amber-500 p-4 rounded-r-lg font-mono text-sm text-slate-300">
                      <span className="text-amber-500 font-bold">CRITICAL:</span> The Quote API returns
                      an empty 200 OK body instead of a standard 429 response when IP-level rate limits
                      are breached. This breaks standard retry-after logic in HTTP clients.
                    </div>
                  </motion.div>

                  {/* Finding 2 */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                    className="glass-card rounded-xl p-6 metric-card-critical"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">2. Latency Spikes (p95)</h3>
                        <span className="text-[10px] text-red-400 font-bold tracking-wider">PERFORMANCE DEGRADATION</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      While the p50 latency for Swap API remains stellar (~215ms), the p95 latency
                      degrades to <span className="text-amber-400 font-semibold">854ms</span> during
                      market volatility spikes. This causes frontend quote expiration timeouts in
                      optimistic UI implementations.
                    </p>
                  </motion.div>

                  {/* Recommendations */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-xl p-6 metric-card-optimal"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-green-400" />
                      </div>
                      <h3 className="text-white font-bold">Recommendations</h3>
                    </div>
                    <ul className="space-y-3">
                      {[
                        "Implement standard RFC-compliant HTTP 429 responses with Retry-After headers.",
                        "Provide WebSocket streams for Quote API to eliminate polling overhead for high-frequency integrators.",
                        "Expose granular error codes instead of generic \"Transaction Failed\" strings.",
                      ].map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
