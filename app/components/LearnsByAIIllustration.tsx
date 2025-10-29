"use client";
import React, { useEffect, useState } from "react";

const LearnsByAIIllustration = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const codeText = `def isPalindrome(s):\n    s = s.lower()\n    return s == s[::-1]`;
  const typingSpeed = 100;

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= codeText.length) {
        setCurrentIndex(index);
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [codeText]);

  const characters = codeText.split("");

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        transform: "perspective(1000px) rotateY(15deg)", // Rotate on Y-axis
        transformStyle: "preserve-3d",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="800" height="600" rx="20" fill="#1a1a2e" />

        {/* Left Panel - Learning Topics */}
        <rect x="40" y="40" width="350" height="250" rx="10" fill="#16213e" />
        <text x="60" y="70" fill="#94a3b8" fontSize="18" fontWeight="bold">
          Learning Path
        </text>
        <text x="60" y="100" fill="#a78bfa" fontSize="20" fontWeight="bold">
          Personalized AI Lessons
        </text>
        <rect x="60" y="120" width="310" height="12" rx="6" fill="#0f172a" />
        <rect x="60" y="120" width="250" height="12" rx="6" fill="#8b5cf6" />
        <text x="60" y="155" fill="#e0e7ff" fontSize="14">
          Python Basics
        </text>
        <rect x="60" y="165" width="310" height="12" rx="6" fill="#0f172a" />
        <rect x="60" y="165" width="200" height="12" rx="6" fill="#6366f1" />
        <text x="60" y="200" fill="#e0e7ff" fontSize="14">
          Data Structures
        </text>
        <rect x="60" y="210" width="310" height="12" rx="6" fill="#0f172a" />
        <rect x="60" y="210" width="150" height="12" rx="6" fill="#3b82f6" />

        {/* Right Panel - AI Feedback */}
        <rect x="410" y="40" width="350" height="520" rx="10" fill="#16213e" />
        <text x="430" y="70" fill="#94a3b8" fontSize="18" fontWeight="bold">
          AI Feedback
        </text>
        <circle cx="445" cy="105" r="5" fill="#10b981" />
        <text x="460" y="110" fill="#d1fae5" fontSize="16">
          Great progress!
        </text>
        <rect x="460" y="120" width="280" height="10" rx="5" fill="#0f172a" />

        <circle cx="445" cy="155" r="5" fill="#f59e0b" />
        <text x="460" y="160" fill="#fef3c7" fontSize="16">
          Try this approach...
        </text>
        <rect x="460" y="170" width="260" height="10" rx="5" fill="#0f172a" />

        <circle cx="445" cy="205" r="5" fill="#06b6d4" />
        <text x="460" y="210" fill="#cffafe" fontSize="16">
          Next: Machine Learning
        </text>
        <rect x="460" y="220" width="240" height="10" rx="5" fill="#0f172a" />

        {/* Code Editor Section */}
        <rect x="40" y="310" width="350" height="250" rx="10" fill="#16213e" />
        <text x="60" y="340" fill="#94a3b8" fontSize="18" fontWeight="bold">
          Interactive Code
        </text>

        <foreignObject x="60" y="360" width="310" height="190">
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "15px",
              lineHeight: "1.6",
              whiteSpace: "pre-wrap",
            }}
          >
            {characters.map((char, index) => (
              <span
                key={index}
                style={{
                  color: index < currentIndex ? "#eeeeee" : "#64748b",
                  textDecoration: index === currentIndex ? "underline" : "none",
                  textDecorationColor:
                    index === currentIndex ? "#eeeeee" : "none",
                }}
              >
                {char === "\n" ? <br /> : char}
              </span>
            ))}
            <span
              className="cursor"
              style={{
                borderBottom: "2px solid #eeeeee",
                visibility:
                  currentIndex === characters.length ? "visible" : "hidden",
              }}
            >
              &nbsp;
            </span>
          </div>
        </foreignObject>
      </svg>

      <style jsx>{`
        .cursor {
          animation: blink 0.7s step-end infinite;
        }
        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default LearnsByAIIllustration;
