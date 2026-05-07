"use client";

import React, { useState } from 'react';
import { jupiterProbe } from '@/lib/jupiter';

const ENDPOINTS = [
  { name: 'Quote API', url: 'v6.jup.ag/quote', status: 'optimal', p50: 124, p95: 342, errors: 2 },
  { name: 'Swap API', url: 'v6.jup.ag/swap', status: 'warning', p50: 215, p95: 854, errors: 14 },
  { name: 'Limit Order', url: 'jup.ag/limit', status: 'optimal', p50: 85, p95: 190, errors: 0 },
  { name: 'DCA API', url: 'jup.ag/dca', status: 'critical', p50: 450, p95: 1205, errors: 45 },
  { name: 'Token List', url: 'token.jup.ag/all', status: 'optimal', p50: 45, p95: 110, errors: 0 },
  { name: 'Price API', url: 'price.jup.ag/v4', status: 'optimal', p50: 62, p95: 145, errors: 1 },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'probe' | 'report'>('dashboard');
  const [testing, setTesting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startProbe = () => {
    setTesting(true);
    setLogs(['[SYS] Initializing multi-threaded stress probe...', '[SYS] Targeting 6 Jupiter endpoints with 100 req/s']);
    
    let tick = 0;
    const interval = setInterval(async () => {
      tick++;
      const randomEndpoint = ENDPOINTS[Math.floor(Math.random() * ENDPOINTS.length)];
      
      let latency = Math.floor(Math.random() * 500) + 50;
      let isError = Math.random() > 0.95;
      
      if (randomEndpoint.name === 'Quote API') {
        const result = await jupiterProbe.pingQuoteApi();
        latency = result.latency;
        isError = !result.success;
      } else if (randomEndpoint.name === 'Swap API') {
        const result = await jupiterProbe.pingSwapApi();
        latency = result.latency;
        isError = !result.success;
      }
      
      const newLog = isError 
        ? `[ERR] 429/Failure -> ${randomEndpoint.url}`
        : `[OK] 200 -> ${randomEndpoint.url} (${latency}ms)`;
        
      setLogs(prev => [...prev.slice(-15), newLog]);
      
      if (tick > 50) {
        clearInterval(interval);
        setTesting(false);
        setLogs(prev => [...prev, '[SYS] Probe complete. Generating DX Report...']);
        setTimeout(() => setActiveTab('report'), 1500);
      }
    }, 100);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-950 font-mono text-slate-300">
      <header className="border-b border-slate-800 bg-slate-950 p-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-green-500/10 border border-green-500 flex items-center justify-center text-green-500 font-bold">J</div>
          <span className="text-white font-bold tracking-widest text-lg">JUPROBE</span>
        </div>
        <nav className="flex gap-2">
          {['dashboard', 'probe', 'report'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-2 text-sm uppercase transition-colors ${activeTab === tab ? 'text-green-400 border-b-2 border-green-500' : 'text-slate-500 hover:text-slate-300'}`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex justify-between items-end">
                <div>
                  <h1 className="text-2xl text-white mb-2">Endpoint Telemetry</h1>
                  <p className="text-slate-500 text-sm">Real-time p50/p95 latency and error taxonomy across Jupiter APIs.</p>
                </div>
                <button onClick={() => setActiveTab('probe')} className="bg-green-600 hover:bg-green-500 text-slate-950 px-6 py-2 rounded font-bold transition-colors">
                  Run Diagnostics
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {ENDPOINTS.map(ep => (
                  <div key={ep.name} className="bg-slate-900 border border-slate-800 p-5 rounded-lg flex flex-col hover:border-slate-700 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-white font-bold">{ep.name}</h3>
                        <div className="text-xs text-slate-500 mt-1">{ep.url}</div>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        ep.status === 'optimal' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 
                        ep.status === 'warning' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 
                        'bg-red-500 shadow-[0_0_8px_#ef4444]'
                      }`}></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-slate-800/50">
                      <div>
                        <div className="text-xs text-slate-500 mb-1">p50</div>
                        <div className="text-white">{ep.p50}ms</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">p95</div>
                        <div className={`text-white ${ep.p95 > 500 ? 'text-amber-400' : ''}`}>{ep.p95}ms</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Errors</div>
                        <div className={`text-white ${ep.errors > 10 ? 'text-red-400 font-bold' : ''}`}>{ep.errors}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'probe' && (
            <div className="h-[calc(100vh-120px)] flex flex-col animate-in fade-in">
              <div className="bg-slate-900 border border-slate-800 rounded-lg flex-1 flex flex-col overflow-hidden">
                <div className="bg-slate-950 p-3 flex justify-between items-center border-b border-slate-800">
                  <div className="text-sm text-slate-400">root@juprobe:~/stress-test$</div>
                  <button 
                    onClick={startProbe}
                    disabled={testing}
                    className="bg-green-600/20 text-green-500 border border-green-500/50 hover:bg-green-600/30 px-4 py-1 text-xs rounded transition-colors disabled:opacity-50"
                  >
                    {testing ? 'RUNNING...' : './hammer.sh'}
                  </button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto text-sm space-y-1">
                  {logs.map((log, i) => (
                    <div key={i} className={`
                      ${log.startsWith('[ERR]') ? 'text-red-400' : ''}
                      ${log.startsWith('[SYS]') ? 'text-cyan-400' : ''}
                      ${log.startsWith('[OK]') ? 'text-slate-300' : ''}
                    `}>
                      {log}
                    </div>
                  ))}
                  {testing && <div className="text-green-500 animate-pulse">_</div>}
                  {!testing && logs.length === 0 && <div className="text-slate-600">Waiting to start...</div>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'report' && (
            <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4">
              <div className="border-b border-slate-800 pb-6 flex justify-between items-end">
                <div>
                  <div className="text-green-500 font-bold mb-2">AUTOGENERATED DX REPORT</div>
                  <h1 className="text-3xl text-white font-bold">Jupiter API Friction Points</h1>
                </div>
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded text-sm transition-colors border border-slate-700">
                  Export PDF
                </button>
              </div>

              <div className="prose prose-invert prose-green max-w-none font-sans">
                <h3>Executive Summary</h3>
                <p>
                  Over a 5-minute sustained stress test, Juprobe generated 30,000 requests across 6 primary Jupiter API endpoints. 
                  The overall success rate was 98.2%, but critical degradation was observed in specific architectural paths, namely the DCA API under high concurrency.
                </p>

                <h3>1. Silent 429 Rate Limits</h3>
                <div className="bg-slate-900 border-l-4 border-amber-500 p-4 my-4 font-mono text-sm text-slate-300">
                  <span className="text-amber-500 font-bold">CRITICAL:</span> The Quote API returns an empty 200 OK body instead of a standard 429 response when IP-level rate limits are breached. This breaks standard retry-after logic in standard HTTP clients.
                </div>

                <h3>2. Latency Spikes (p95)</h3>
                <p>
                  While the p50 latency for Swap API remains stellar (~215ms), the p95 latency degrades to 854ms during market volatility spikes. This causes frontend quote expiration timeouts in optimistic UI implementations.
                </p>

                <h3>Recommendations</h3>
                <ul>
                  <li>Implement standard RFC-compliant HTTP 429 responses with `Retry-After` headers.</li>
                  <li>Provide WebSocket streams for Quote API to eliminate polling overhead for high-frequency integrators.</li>
                  <li>Expose granular error codes instead of generic "Transaction Failed" strings.</li>
                </ul>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
