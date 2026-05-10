"use client";

interface HealthRingProps {
  score: number; // 0-100
  size?: number;
  strokeWidth?: number;
}

export function HealthRing({ score, size = 120, strokeWidth = 8 }: HealthRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const color =
    score >= 90 ? "#22c55e" :
    score >= 70 ? "#f59e0b" :
    "#ef4444";

  const label =
    score >= 90 ? "HEALTHY" :
    score >= 70 ? "DEGRADED" :
    "CRITICAL";

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative health-ring" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(51, 65, 85, 0.3)"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-white stat-value">{score}%</span>
        </div>
      </div>
      <span
        className="text-xs font-mono font-bold tracking-widest"
        style={{ color }}
      >
        {label}
      </span>
    </div>
  );
}
