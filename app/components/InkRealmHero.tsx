"use client";

import Image from "next/image";

// Fixed positions, not random, so the server and client render the same field.
// Colours are the three fruit tones lifted from the InkRealm mark.
const TEAL = "#6ec5ce";
const AMBER = "#ef9b63";
const GOLD = "#dfbc6a";

type Mote = {
  left: number;
  top: number;
  size: number;
  color: string;
  opacity: number;
  drift: number;
  delay: number;
};

const MOTES: Mote[] = [
  { left: 50, top: 14, size: 7, color: AMBER, opacity: 0.75, drift: 11, delay: 0 },
  { left: 41, top: 20, size: 6, color: TEAL, opacity: 0.6, drift: 13, delay: 1.4 },
  { left: 59, top: 21, size: 6, color: TEAL, opacity: 0.55, drift: 9, delay: 2.2 },
  { left: 33, top: 27, size: 7, color: AMBER, opacity: 0.7, drift: 14, delay: 0.6 },
  { left: 67, top: 26, size: 6, color: GOLD, opacity: 0.65, drift: 10, delay: 3.1 },
  { left: 36, top: 34, size: 5, color: AMBER, opacity: 0.5, drift: 12, delay: 2.7 },
  { left: 64, top: 35, size: 5, color: GOLD, opacity: 0.45, drift: 15, delay: 1.1 },
  { left: 27, top: 42, size: 6, color: TEAL, opacity: 0.6, drift: 11, delay: 3.8 },
  { left: 73, top: 41, size: 6, color: TEAL, opacity: 0.55, drift: 13, delay: 0.9 },
  { left: 30, top: 50, size: 5, color: GOLD, opacity: 0.5, drift: 16, delay: 2.0 },
  { left: 70, top: 49, size: 5, color: GOLD, opacity: 0.45, drift: 9, delay: 4.2 },
  { left: 16, top: 30, size: 4, color: TEAL, opacity: 0.3, drift: 14, delay: 1.8 },
  { left: 85, top: 33, size: 4, color: AMBER, opacity: 0.28, drift: 12, delay: 3.4 },
  { left: 12, top: 62, size: 4, color: GOLD, opacity: 0.26, drift: 15, delay: 0.3 },
  { left: 88, top: 60, size: 4, color: TEAL, opacity: 0.3, drift: 10, delay: 2.5 },
  { left: 22, top: 74, size: 3, color: AMBER, opacity: 0.22, drift: 13, delay: 4.6 },
  { left: 79, top: 76, size: 3, color: GOLD, opacity: 0.24, drift: 11, delay: 1.6 },
  { left: 46, top: 84, size: 3, color: TEAL, opacity: 0.2, drift: 14, delay: 3.0 },
];

export default function InkRealmHero() {
  return (
    <>
      {/* the mark, sunk almost into the ground the way the site holds it */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <Image
          src="/assets/inkrealm-logo.png"
          alt=""
          aria-hidden
          width={500}
          height={500}
          className="w-[360px] md:w-[560px]"
          style={{ opacity: 0.085 }}
        />
      </div>

      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="ink-mote absolute rounded-full"
            style={{
              left: `${m.left}%`,
              top: `${m.top}%`,
              width: m.size,
              height: m.size,
              background: m.color,
              boxShadow: `0 0 ${m.size * 2}px ${m.color}`,
              ["--mote-opacity" as string]: m.opacity,
              ["--mote-drift" as string]: `-${m.drift}px`,
              animationDelay: `${m.delay}s`,
              animationDuration: `${7 + (i % 5) * 1.8}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
