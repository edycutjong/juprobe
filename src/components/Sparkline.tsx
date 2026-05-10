"use client";

import { useState } from "react";

interface SparklineProps {
  points?: number;
  height?: number;
  color?: string;
  baseValue?: number;
  variance?: number;
}

export function Sparkline({
  points = 20,
  height = 32,
  color = "#22c55e",
  baseValue = 50,
  variance = 30,
}: SparklineProps) {
  const [bars] = useState(() => {
    return Array.from({ length: points }, () =>
      Math.max(4, Math.min(height, baseValue + (Math.random() - 0.5) * 2 * variance))
    );
  });

  return (
    <div className="flex items-end gap-[2px]" style={{ height }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="sparkline-bar"
          style={{
            height: `${h}px`,
            backgroundColor: h > height * 0.7 ? "#f59e0b" : color,
            animationDelay: `${i * 30}ms`,
            opacity: 0.6 + (h / height) * 0.4,
          }}
        />
      ))}
    </div>
  );
}
