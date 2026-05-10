"use client";

import { useEffect, useState } from "react";

export function StatusBar() {
  const [latency, setLatency] = useState(12);
  const [uptime] = useState("99.97");
  const [time, setTime] = useState(() => 
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 8) + 9);
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card-static flex items-center justify-between px-4 py-1.5 text-[11px] font-mono tracking-wide border-b border-slate-800/50 relative z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-emerald-400 font-semibold">SYSTEM ONLINE</span>
        </div>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">v1.0.0</span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">SOLANA MAINNET</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-slate-500">
          LATENCY <span className="text-cyan-400 font-semibold">{latency}ms</span>
        </span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-500">
          UPTIME <span className="text-emerald-400 font-semibold">{uptime}%</span>
        </span>
        <span className="text-slate-700">│</span>
        <span className="text-slate-600 tabular-nums">{time}</span>
      </div>
    </div>
  );
}
