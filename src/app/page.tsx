"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Terminal, Activity, FileText, ArrowRight, Server } from "lucide-react";
import { Footer } from "@/components/Footer";
import { StatusBar } from "@/components/StatusBar";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function LandingPage() {
  return (
    <>
      {/* Ambient background effects */}
      <div className="bg-grid-pattern" />
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <StatusBar />

      <main className="relative z-10 min-h-screen flex flex-col font-mono text-slate-300 overflow-hidden">
        {/* Header Navigation */}
        <header className="px-6 py-6 flex justify-between items-center max-w-7xl mx-auto w-full relative z-20">
          <div className="flex items-center gap-3">
            <div className="logo-icon w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <span className="text-white font-bold tracking-[0.2em] text-lg">JUPROBE</span>
            </div>
          </div>
          
          <Link href="/dashboard" className="glass-card px-5 py-2.5 rounded-lg text-sm hover:text-white transition-colors border border-slate-700/50 flex items-center gap-2 font-semibold">
            <Terminal className="w-4 h-4 text-green-400" />
            Launch App
          </Link>
        </header>

        {/* Hero Section */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-20 relative z-20">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-4xl mx-auto text-center flex flex-col items-center"
          >
            <motion.div variants={item} className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)] text-xs text-green-400 tracking-wider uppercase font-semibold">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live Diagnostics Engine
            </motion.div>
            
            <motion.h1 variants={item} className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 leading-tight drop-shadow-2xl">
              The Ultimate <br />
              <span className="gradient-text">Jupiter DX Probe</span>
            </motion.h1>
            
            <motion.p variants={item} className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Stress test every Jupiter API endpoint, measure p50/p95 latency under heavy load, and generate actionable developer experience reports in real-time.
            </motion.p>
            
            <motion.div variants={item} className="flex flex-col sm:flex-row gap-5 justify-center w-full sm:w-auto">
              <Link
                href="/dashboard"
                className="glow-button flex items-center justify-center gap-3 bg-green-600 hover:bg-green-500 text-slate-950 px-8 py-4 rounded-xl font-bold text-base transition-all shadow-[0_0_30px_rgba(34,197,94,0.3)] hover:shadow-[0_0_40px_rgba(34,197,94,0.5)] hover:-translate-y-0.5"
              >
                <Activity className="w-5 h-5" />
                Start Diagnostic Run
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://github.com/edycutjong/juprobe"
                target="_blank"
                rel="noreferrer"
                className="glass-card flex items-center justify-center gap-2 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:bg-slate-800 border-slate-700 hover:border-slate-500"
              >
                View Source
              </a>
            </motion.div>
          </motion.div>

          {/* Floating Diagnostic Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full max-w-5xl mt-24 relative"
          >
            {/* Ambient glow behind the preview */}
            <div className="absolute inset-0 bg-green-500/5 blur-[120px] rounded-full z-0 pointer-events-none" />
            
            <div className="relative z-10 glass-card rounded-2xl border border-slate-700/50 p-2 shadow-2xl overflow-hidden hover:border-slate-600 transition-colors duration-500">
              <div className="glass-card-static bg-slate-950/80 rounded-xl overflow-hidden border border-slate-800 relative">
                {/* Mock Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800/80 bg-slate-900/50">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    <div className="ml-4 text-xs text-slate-500 font-mono tracking-wider flex items-center gap-2">
                      <Terminal className="w-3 h-3" /> dx-probe.sh --watch
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                     <span className="text-green-500 animate-pulse">●</span> ACTIVE
                  </div>
                </div>
                {/* Mock Body */}
                <div className="p-6 font-mono text-[13px] leading-relaxed text-slate-400 space-y-2 h-[320px] relative overflow-hidden">
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent 80%, rgba(2,6,23,1) 100%)", zIndex: 10 }} />
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}
                    className="text-cyan-400"
                  >
                    [SYS] ══════════════════════════════════════════════
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.1 }}
                    className="text-cyan-400"
                  >
                    [SYS] JUPROBE v1.0.0 — Multi-Threaded Stress Engine
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2 }}
                    className="text-cyan-400"
                  >
                    [SYS] ══════════════════════════════════════════════
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.6 }}
                  >
                    [SYS] Targeting 6 Jupiter endpoints @ 100 req/s...
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8 }}
                  >
                    [SYS] Initializing connection pool...
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.2 }}
                    className="text-green-400/80"
                  >
                    [ACK] 03:41:22 200 OK → v6.jup.ag/quote (124ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.4 }}
                    className="text-amber-400"
                  >
                    [SLO] 03:41:23 200 OK → v6.jup.ag/swap (854ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }}
                    className="text-green-400/80"
                  >
                    [ACK] 03:41:23 200 OK → jup.ag/limit (85ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.8 }}
                    className="text-red-400"
                  >
                    [ERR] 03:41:24 429/TIMEOUT → jup.ag/dca (1205ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.1 }}
                    className="text-green-400/80"
                  >
                    [ACK] 03:41:25 200 OK → token.jup.ag/all (45ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.4 }}
                    className="text-green-400/80"
                  >
                    [ACK] 03:41:25 200 OK → price.jup.ag/v4 (62ms)
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.5, repeat: Infinity, duration: 1 }}
                    className="text-green-500 font-bold text-lg mt-2 relative z-20"
                  >
                    ▋
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feature Grid */}
        <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full relative z-20">
          {[
            {
              icon: Server,
              title: "High-Frequency Testing",
              desc: "Deploy multi-threaded request barrages across Quote, Swap, Limit, and DCA APIs to map architectural limits.",
              color: "text-green-400",
              border: "metric-card-optimal"
            },
            {
              icon: Activity,
              title: "Real-Time Telemetry",
              desc: "Visualize p50 and p95 latency distributions alongside dynamic sparklines and interactive health rings.",
              color: "text-cyan-400",
              border: "border-l-2 border-cyan-500/50 shadow-[-4px_0_12px_rgba(6,182,212,0.05)]"
            },
            {
              icon: FileText,
              title: "Actionable DX Reports",
              desc: "Automatically synthesize friction points and silent failures into a high-fidelity PDF report for infrastructure teams.",
              color: "text-amber-400",
              border: "metric-card-warning"
            }
          ].map((feat, i) => (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`glass-card rounded-2xl p-8 ${feat.border} group relative overflow-hidden`}
            >
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-slate-800/30 rounded-full blur-2xl group-hover:bg-slate-700/50 transition-colors" />
              <div className="w-12 h-12 rounded-xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <feat.icon className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h3 className="text-xl text-white font-bold mb-3 tracking-tight">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </main>
      
      <div className="relative z-20">
        <Footer />
      </div>
    </>
  );
}
