"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import type { CardData } from "./components/RagingSea";

const RagingSea = dynamic(() => import("./components/RagingSea"), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-gradient-to-b from-[#1a3a5c] via-[#4a7c9b] to-[#f7edd8] flex flex-col items-center justify-center">
      <div className="text-white text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
        Korn
      </div>
      <div className="text-white/80 text-lg md:text-xl animate-pulse">
        Loading the waves...
      </div>
      <div className="mt-8 flex gap-2">
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-3 h-3 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  ),
});

export default function Home() {
  const cards: CardData[] = [
    {
      title: "Welcome",
      content: (
        <div className="text-center text-white">
          <p className="text-xl md:text-2xl text-blue-100 mb-2">Hello! I&apos;m</p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Korn
          </h1>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              Robotics
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              Full-Stack
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              ML/AI
            </span>
          </div>
        </div>
      ),
      expandedContent: (
        <div className="text-center text-white">
          <p className="text-xl md:text-2xl text-blue-100 mb-2">
            Hello! I&apos;m
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-2 drop-shadow-lg">
            Korn
          </h1>
          <p className="text-lg text-blue-100 mb-6">
            Kornvik Tanpipat
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              Robotics
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              Full-Stack
            </span>
            <span className="px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
              ML/AI
            </span>
          </div>
          <p className="text-blue-100 leading-relaxed max-w-md mx-auto">
            MS Robotics student at University of Michigan.
            I enjoy building things that move, think, and connect —
            from autonomous robots to web applications.
          </p>
          <img src="https://media.giphy.com/media/zJ3V6Ot51H8Y0/giphy.gif" width="150" alt="wave" className="mx-auto mt-20 hidden md:block" />
        </div>
      ),
    },
    {
      title: "About",
      content: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            About Me
          </h2>
          <div className="flex gap-4 justify-center">
            <Image
              src="/assets/me2.jpeg"
              alt="Korn"
              className="rounded-xl shadow-lg w-24 h-24 md:w-32 md:h-32 object-cover rotate-[-3deg]"
              width={128}
              height={128}
            />
            <Image
              src="/assets/me3.jpg"
              alt="Korn"
              className="rounded-xl shadow-lg w-24 h-32 md:w-32 md:h-40 object-cover rotate-[3deg] mt-4"
              width={128}
              height={160}
            />
          </div>
        </div>
      ),
      expandedContent: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            About Me
          </h2>
          <div className="flex flex-col gap-8">
            {/* Intro */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex gap-4 justify-center">
                <Image
                  src="/assets/me2.jpeg"
                  alt="Korn"
                  className="rounded-xl shadow-lg w-20 h-20 object-cover rotate-[-3deg]"
                  width={80}
                  height={80}
                />
                <Image
                  src="/assets/me3.jpg"
                  alt="Korn"
                  className="rounded-xl shadow-lg w-20 h-28 object-cover rotate-[3deg] mt-2"
                  width={80}
                  height={112}
                />
              </div>
              <p className="text-center text-blue-100">
                Robotics engineer bridging hardware and software.
              </p>
              <div className="flex justify-center gap-6">
                <a href="https://github.com/nickkorn" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors text-sm">
                  GitHub
                </a>
                <a href="https://linkedin.com/in/kornvik-tanpipat" target="_blank" rel="noopener noreferrer" className="text-blue-200 hover:text-white transition-colors text-sm">
                  LinkedIn
                </a>
                <a href="mailto:kornvik@umich.edu" className="text-blue-200 hover:text-white transition-colors text-sm">
                  Email
                </a>
              </div>
            </div>

            {/* Work Experience */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-center">Work Experience</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-bold">Indeed</h4>
                    <span className="text-blue-200 text-xs">Tokyo & Texas</span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-blue-200 text-sm">Software Engineer 2 - Premium Team | 04/2024 – 06/2025</p>
                      <ul className="text-blue-100 text-sm mt-1 space-y-0.5">
                        <li>• Built Indeed Premium (first subscription) - $100K ARR in 3 months</li>
                        <li>• Reduced paywall load time from 14s to under 2s</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Software Engineer 1 - Analytics Team | 10/2022 – 04/2024</p>
                      <ul className="text-blue-100 text-sm mt-1 space-y-0.5">
                        <li>• Built SQL pipeline processing 1B+ daily events with Spark & AWS EMR</li>
                        <li>• Launched first real-time cohort retention tool, adopted by 200+ teams</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-blue-200 text-sm">Software Developer 2 - Company Page Team | 04/2022 – 10/2022</p>
                      <ul className="text-blue-100 text-sm mt-1 space-y-0.5">
                        <li>• Led Tinder-like job search product - 30,000+ users in first month</li>
                        <li>• Drove 140% growth in signups via SEO integration with Google Jobs</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">UiPath</h4>
                    <span className="text-blue-200 text-xs">Tokyo</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">CEO Office Intern (PM) | 11/2021 – 01/2022</p>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Led two digital transformation projects for NGO clients</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">HG Robotics</h4>
                    <span className="text-blue-200 text-xs">Bangkok</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Software Intern | 02/2021 – 03/2021</p>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Built floor classification with LiDAR + Mask R-CNN</li>
                    <li>• Optimized ray ground filtering by ~5× via NumPy & Numba</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">Amazon Japan</h4>
                    <span className="text-blue-200 text-xs">Tokyo</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Software Development Intern | 09/2020</p>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Built fortune-telling feature for Amazon Alexa using JavaScript</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Leadership & Volunteer */}
            <div>
              <h3 className="text-xl font-bold mb-4 text-center">Leadership & Volunteer</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">Thai Students&apos; Association in Japan</h4>
                    <span className="text-blue-200 text-xs">Tokyo</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">Board Member & Head of QC | 04/2020 – 03/2021</p>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Co-led $650K COVID-19 aid allocation to 900 students</li>
                    <li>• Digitized project approval, increasing throughput by ~2×</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold">Slush Tokyo</h4>
                    <span className="text-blue-200 text-xs">Tokyo</span>
                  </div>
                  <p className="text-blue-200 text-sm mb-2">MC | 02/2018 – 03/2018</p>
                  <ul className="text-blue-100 text-sm space-y-1">
                    <li>• Co-led 10+ workshops as MC at one of Japan&apos;s largest startup events</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Skills",
      content: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
            {[
              { icon: "💻", label: "Full-stack Web" },
              { icon: "🤖", label: "Robotics" },
              { icon: "🧠", label: "Machine Learning" },
              { icon: "👾", label: "Python, C++, JS" },
              { icon: "🌐", label: "React, Vue, Next" },
              { icon: "👀", label: "Computer Vision" },
            ].map((skill) => (
              <div
                key={skill.label}
                className="bg-white/10 rounded-xl p-4 backdrop-blur-sm"
              >
                <div className="text-3xl mb-2">{skill.icon}</div>
                <div className="text-sm md:text-base">{skill.label}</div>
              </div>
            ))}
          </div>
        </div>
      ),
      expandedContent: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Skills
          </h2>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Programming</h3>
              <p className="text-blue-100 text-xs">Python, TypeScript, JavaScript, Java, C++, Swift, SQL</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Frontend</h3>
              <p className="text-blue-100 text-xs">React, Next.js, Vue.js, Tailwind CSS, SwiftUI</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Backend</h3>
              <p className="text-blue-100 text-xs">Node.js, Express, FastAPI, Django, PostgreSQL, REST APIs</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Data</h3>
              <p className="text-blue-100 text-xs">Big Data Processing, Apache Spark, AWS EMR, SQL, Statistical Analysis, Data Visualization</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Robotics & ML</h3>
              <p className="text-blue-100 text-xs">ROS, PyTorch, TensorFlow, OpenCV, LiDAR, SLAM, Motion Planning</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Tools & DevOps</h3>
              <p className="text-blue-100 text-xs">Git, Docker, Kubernetes, CI/CD, Figma, Jira</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Project Management</h3>
              <p className="text-blue-100 text-xs">Agile/Scrum, Stakeholder Management, Cross-functional Leadership, Technical Planning</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Communication</h3>
              <p className="text-blue-100 text-xs">Technical Documentation, Presentations, Client Relations, Team Mentoring</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <h3 className="font-bold mb-1 text-sm">Languages</h3>
              <p className="text-blue-100 text-xs">Thai (Native), English (Fluent), Japanese (Fluent), Chinese (Beginner)</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Education",
      content: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Education
          </h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                🎓
              </div>
              <div>
                <h3 className="font-bold text-lg">University of Michigan - Ann Arbor</h3>
                <p className="text-blue-200 text-sm">MS, Robotics | 2025 – 2026 (Expected)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                🎓
              </div>
              <div>
                <h3 className="font-bold text-lg">Tokyo Institute of Technology</h3>
                <p className="text-blue-200 text-sm">B.Eng, System & Control Engineering | 2018 – 2022</p>
              </div>
            </div>
          </div>
        </div>
      ),
      expandedContent: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Education
          </h2>
          <div className="space-y-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">University of Michigan - Ann Arbor</h3>
                <span className="text-blue-200 text-xs">Michigan, USA</span>
              </div>
              <p className="text-blue-200 text-sm mb-2">MS, Robotics | 08/2025 – 12/2026 (Expected)</p>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• GPA: 4.00/4.00</li>
                <li>• Mapping and Motion Lab (Advisor: B. Bucher)</li>
                <li>• Research on mobile manipulation</li>
              </ul>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold">Tokyo Institute of Technology</h3>
                <span className="text-blue-200 text-xs">Tokyo, Japan</span>
              </div>
              <p className="text-blue-200 text-sm mb-2">B.Eng, System & Control Engineering | 04/2018 – 03/2022</p>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• GPA: 3.76/4.50</li>
                <li>• Distributed System Control Lab (Advisor: T. Hatanaka)</li>
                <li>• Research on distributed control</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Achievements",
      content: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
            Achievements
          </h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <span className="text-2xl">🎓</span>
              <span className="text-sm">Entrepreneurial Leadership Program - UMich</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <span className="text-2xl">🥇</span>
              <span className="text-sm">1st Place - IDC Robocon 2021</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <span className="text-2xl">🥉</span>
              <span className="text-sm">Bronze - Thailand Olympiad in Informatics</span>
            </div>
          </div>
        </div>
      ),
      expandedContent: (
        <div className="text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
            Achievements
          </h2>
          <div className="space-y-3">
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">Entrepreneurial Leadership Program</h3>
                <span className="text-blue-200 text-xs">2026</span>
              </div>
              <p className="text-blue-100 text-xs">Selected as Student Fellow in cohort of 21 at University of Michigan.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">Student Leadership Award</h3>
                <span className="text-blue-200 text-xs">10/2021</span>
              </div>
              <p className="text-blue-100 text-xs">1 of 7 students among 3,600 undergrads at Tokyo Tech for leadership, intellect, and creativity.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">PITCH Micron Award</h3>
                <span className="text-blue-200 text-xs">09/2021</span>
              </div>
              <p className="text-blue-100 text-xs">Top 4 of 20 teams at Tokyo Tech ExS Challenge for sustainable business idea on student-teacher communication.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">1st Place - IDC Robocon 2021</h3>
                <span className="text-blue-200 text-xs">08/2021</span>
              </div>
              <p className="text-blue-100 text-xs">Led 6-person international team to build virtual drone robot with PID control in C#. Zero errors during match.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">2nd Place - Creative Design Competition</h3>
                <span className="text-blue-200 text-xs">2018</span>
              </div>
              <p className="text-blue-100 text-xs">Tokyo Tech Creative Design Competition.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">MEXT Scholarship</h3>
                <span className="text-blue-200 text-xs">03/2017</span>
              </div>
              <p className="text-blue-100 text-xs">Competitive scholarship by Japanese Government, ~150 students worldwide. Covers tuition and living expenses.</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-bold text-sm">Bronze - Thailand Olympiad in Informatics</h3>
                <span className="text-blue-200 text-xs">2016</span>
              </div>
              <p className="text-blue-100 text-xs">National programming competition.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <RagingSea
      cards={cards}
      depthColor="#1a3a5c"
      surfaceColor="#4a7c9b"
      bgColor="#f7edd8"
    />
  );
}
