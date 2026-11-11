"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

type Beat = {
  prose: string;
  choices: [string, string];
  taken: 0 | 1;
};

const STORY: Beat[] = [
  {
    prose: "The lantern gutters. Something moves in the water beneath the bridge.",
    choices: ["Draw your blade", "Lower the lantern and look"],
    taken: 1,
  },
  {
    prose: "The water is not water. It is pages — thousands of them, turning.",
    choices: ["Reach in", "Step back from the rail"],
    taken: 0,
  },
  {
    prose: "Your hand closes on a page still wet with ink. It carries your name.",
    choices: ["Read on", "Let it sink"],
    taken: 0,
  },
];

const STILL = "(prefers-reduced-motion: reduce)";

const watchStill = (notify: () => void) => {
  const mq = window.matchMedia(STILL);
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};

const PHASES = [
  { name: "prose", ms: 2600 },
  { name: "choices", ms: 2000 },
  { name: "taken", ms: 1900 },
] as const;

export default function InkRealmScene() {
  // One counter drives the whole turn: every step advances a phase, every
  // three steps advances a beat of the story.
  const [step, setStep] = useState(0);
  const reduced = useSyncExternalStore(
    watchStill,
    () => window.matchMedia(STILL).matches,
    () => false
  );

  // One counter drives the whole turn: every step advances a phase, every
  // three steps advances a beat of the story.
  const phase = reduced ? PHASES.length - 1 : step % PHASES.length;
  const beat = Math.floor(step / PHASES.length) % STORY.length;

  useEffect(() => {
    if (reduced) return;
    const t = setTimeout(() => setStep((s) => s + 1), PHASES[step % PHASES.length].ms);
    return () => clearTimeout(t);
  }, [step, reduced]);

  const current = STORY[beat];
  const previous = STORY[(beat + STORY.length - 1) % STORY.length];

  return (
    <div
      className="mt-10 border-l pl-6 md:pl-8"
      style={{ borderColor: "rgba(232,183,101,0.28)", fontFamily: "var(--font-spectral), Georgia, serif" }}
    >
      {/* the line already behind you, carried over from the last turn */}
      <p
        className="text-base md:text-lg leading-relaxed"
        style={{ color: "rgba(232,226,212,0.3)" }}
      >
        {beat === 0 ? "You have been walking a long time without a road." : previous.prose}
      </p>

      <p
        key={`prose-${beat}`}
        className="mt-3 text-lg md:text-2xl leading-relaxed"
        style={{ color: "#e8e2d4" }}
      >
        {current.prose.split(" ").map((word, i) => (
          // The reveal only runs while the line is being written. Once the
          // choices are up the words are plain text, so they can never be
          // left mid-fade if a phase turns over early.
          <span
            key={i}
            className={phase === 0 ? "ink-word" : undefined}
            style={
              phase === 0
                ? { animationDelay: `${i * 55}ms`, marginRight: "0.28em" }
                : { marginRight: "0.28em" }
            }
          >
            {word}
          </span>
        ))}
      </p>

      <div className="mt-6 space-y-2" aria-live="polite">
        {current.choices.map((choice, i) => {
          const revealed = phase >= 1;
          const chosen = phase >= 2 && i === current.taken;
          return (
            <p
              key={`${beat}-${i}`}
              className="relative inline-block w-full text-base md:text-lg italic transition-opacity duration-700"
              style={{
                opacity: revealed ? (phase >= 2 && !chosen ? 0.22 : 1) : 0,
                color: chosen ? "#f0c987" : "#5f8a86",
              }}
            >
              <span
                aria-hidden
                className="mr-3 inline-block align-middle"
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 999,
                  background: chosen ? "#f0c987" : "#5f8a86",
                }}
              />
              {choice}
              {chosen && (
                <span
                  key={`wash-${beat}`}
                  aria-hidden
                  className="ink-wash absolute bottom-0 left-0 h-px"
                  style={{ background: "#f0c987" }}
                />
              )}
            </p>
          );
        })}
      </div>
    </div>
  );
}
