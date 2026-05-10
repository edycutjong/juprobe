export function Footer() {
  return (
    <footer className="relative z-10 border-t border-slate-800/50 mt-auto py-5 text-center glass-card-static">
      <div className="flex items-center justify-center gap-3">
        <div className="h-px w-12 bg-linear-to-r from-transparent to-slate-700" />
        <p className="text-xs text-slate-500 font-mono tracking-wider">
          <span className="text-green-500/80">JUPROBE</span> — Jupiter API Stress-Test Probe • Built for{" "}
          <span className="text-cyan-500/80">Colosseum Frontier Hackathon 2026</span>
        </p>
        <div className="h-px w-12 bg-linear-to-l from-transparent to-slate-700" />
      </div>
    </footer>
  );
}
