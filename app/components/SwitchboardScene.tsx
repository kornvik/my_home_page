"use client";

import { useEffect, useState } from "react";

const JACKS = [
  { x: 196, y: 166 },
  { x: 264, y: 166 },
  { x: 196, y: 234 },
  { x: 264, y: 234 },
];

type Line = {
  label: string;
  anchor: { x: number; y: number };
  textAnchor: "start" | "end";
  cable: string;
  jack: number;
  says: string;
};

const LINES: Line[] = [
  {
    label: "claude code",
    anchor: { x: 34, y: 64 },
    textAnchor: "start",
    cable: "M 60 76 C 118 96, 150 112, 196 166",
    jack: 0,
    says: "claude code to codex — taking the migration",
  },
  {
    label: "codex",
    anchor: { x: 426, y: 76 },
    textAnchor: "end",
    cable: "M 400 88 C 340 108, 306 118, 264 166",
    jack: 1,
    says: "codex to cursor — tests are green",
  },
  {
    label: "gemini cli",
    anchor: { x: 34, y: 344 },
    textAnchor: "start",
    cable: "M 60 332 C 118 312, 150 292, 196 234",
    jack: 2,
    says: "cursor to gemini cli — need the room schema",
  },
  {
    label: "cursor",
    anchor: { x: 426, y: 332 },
    textAnchor: "end",
    cable: "M 400 320 C 340 300, 306 288, 264 234",
    jack: 3,
    says: "gemini cli to claude code — pushed to the room",
  },
];

const BEAT_MS = 1600;

export default function SwitchboardScene() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % LINES.length), BEAT_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <svg viewBox="0 0 460 372" className="w-full" role="img" aria-label="Four AI agents patched into a shared switchboard">
        <defs>
          <linearGradient id="sw-panel" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2d6fb8" />
            <stop offset="100%" stopColor="#15406f" />
          </linearGradient>
        </defs>

        {LINES.map((line, i) => (
          <g key={line.label}>
            <path d={line.cable} fill="none" stroke="#21456f" strokeWidth={5} strokeLinecap="round" />
            <path
              className="switch-pulse"
              d={line.cable}
              fill="none"
              stroke="#7fd4ff"
              strokeWidth={5}
              strokeLinecap="round"
              pathLength={100}
              style={{ animationDelay: `${(i * BEAT_MS) / 1000}s` }}
            />
            <text
              x={line.anchor.x}
              y={line.anchor.y}
              textAnchor={line.textAnchor}
              fill={active === i ? "#9fdcff" : "#5e7a9c"}
              style={{
                fontFamily: "var(--font-plex-mono), monospace",
                fontSize: 15,
                transition: "fill 400ms ease",
              }}
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* the switchboard itself */}
        <rect x={165} y={135} width={130} height={130} rx={20} fill="url(#sw-panel)" stroke="#5aa4e6" strokeWidth={2} />
        {JACKS.map((j, i) => (
          <g key={i}>
            <circle cx={j.x} cy={j.y} r={13} fill="#0d2947" stroke="#4a93d9" strokeWidth={2} />
            <circle cx={j.x} cy={j.y} r={6} fill="#eaf2fa" />
          </g>
        ))}
      </svg>

      <p
        className="mt-4 text-center text-xs md:text-sm"
        style={{ fontFamily: "var(--font-plex-mono), monospace", color: "#4f7ba6" }}
        aria-live="polite"
      >
        {LINES[active].says}
      </p>
    </div>
  );
}
