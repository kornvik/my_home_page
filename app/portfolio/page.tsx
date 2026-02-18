"use client";

import Image from "next/image";

const PROJECTS = [
  {
    id: "vln",
    title: "Vision-Language Navigation with Factor Graphs",
    venue: "Mapping and Motion Lab, University of Michigan",
    year: "2025",
    advisor: "Prof. Bernadette Bucher",
    description:
      "Developing a navigation policy that fuses natural language instructions with visual observations. Factor graphs encode spatial, semantic, and temporal constraints. SAM3 provides open-vocabulary detection with evaluation in Habitat simulation.",
    image: null,
    video: null,
    links: [],
  },
  {
    id: "pilevision",
    title: "PileVision: 6-DoF Pose Estimation for Construction",
    venue: "Stanford CS231A",
    year: "2024",
    advisor: null,
    description:
      "A DOPE-based 6-DoF pose estimation pipeline for tracking concrete piles on construction sites. Trained with domain randomization for sim-to-real transfer. Field-tested with a Thai construction company.",
    image: "/portfolio/pilevision.gif",
    video: null,
    links: [
      { label: "GitHub", url: "https://github.com/kornvik/cs231a_project" },
    ],
  },
  {
    id: "hg-robotics",
    title: "Multiple Floor Point Cloud Classification",
    venue: "HG Robotics Co., Ltd., Bangkok",
    year: "2021",
    advisor: null,
    description:
      "End-to-end perception for autonomous delivery robots. Fine-tuned Detectron2 Mask R-CNN and optimized LiDAR ray ground filtering ~5x via vectorization for real-time performance.",
    image: "/portfolio/hg-robotics.png",
    video: null,
    links: [
      { label: "private" },
    ],
  },
  {
    id: "multi-agent",
    title: "Coverage Control for Multi-Agent Coordination",
    venue: "Tokyo Institute of Technology",
    year: "2021",
    advisor: "Prof. Takeshi Hatanaka",
    description:
      "Distributed control combining Voronoi-based coverage control and control barrier functions. Applied to ice hockey defensive strategy in collaboration with FB Triangle Co., Ltd.",
    video: null,
    image: "/portfolio/coverage-control.gif",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2111.10804" },
      { label: "private" },
    ],
  },
  {
    id: "idc-robocon",
    title: "IDC Robocon 2021 - 1st Place",
    venue: "Tokyo Institute of Technology",
    year: "2021",
    advisor: null,
    description:
      "Implemented PID control in C# and designed robot chassis in Autodesk for international robot design competition. Team lead.",
    image: null,
    video: null,
    links: [
      { label: "GitHub", url: "https://github.com/kornvik/IDC_2021_G3" },
    ],
  },
  {
    id: "competition-robot",
    title: "3rd Place Kanto Robotic Competition",
    venue: "Tokyo Tech Robotics Club",
    year: "2019",
    advisor: null,
    description:
      "Motion planning and PID control in C++ on STM32 via CAN bus. Built real-time telemetry visualization.",
    image: "/portfolio/competition-robot.jpg",
    video: null,
    links: [
      { label: "private" },
    ],
  },
];

export default function RoboticsPortfolio() {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full px-8 md:px-12 lg:px-20 py-12">

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Kornvik Tanpipat
          </h1>
          <p className="text-gray-600 mb-4">
            MS Robotics, University of Michigan
          </p>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            I build perception and navigation systems for mobile robots. Currently working with
            Boston Dynamics Spot in the <a href="https://sites.google.com/umich.edu/mandmlab/home" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mapping and Motion Lab</a> advised
            by Prof. Bernadette Bucher.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <a href="mailto:kornvik@umich.edu" className="text-blue-600 hover:underline">
              Email
            </a>
            <a href="https://linkedin.com/in/kornvik-tanpipat" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com/poomkorn" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              GitHub
            </a>
            <a href="https://www.kornvik.com" className="text-blue-600 hover:underline">
              Website
            </a>
          </div>
        </header>

        {/* Divider */}
        <hr className="border-gray-200 mb-10" />

        {/* Research */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Research & Projects</h2>

          <div className="space-y-8">
            {PROJECTS.map((project) => (
              <div key={project.id} className="flex gap-5">
                {/* Image/Video */}
                <div className="shrink-0 w-[280px] hidden sm:block">
                  {project.video ? (
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-[280px] h-[180px] rounded border border-gray-200 object-cover"
                    />
                  ) : project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={280}
                      height={180}
                      unoptimized={project.image.endsWith('.gif')}
                      className="rounded border border-gray-200 object-cover"
                    />
                  ) : (
                    <div className="w-[280px] h-[180px] bg-gray-100 rounded border border-gray-200 flex items-center justify-center text-gray-300 text-xs">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {project.venue}, {project.year}
                    {project.advisor && <span> • {project.advisor}</span>}
                  </p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                  {project.links.length > 0 && (
                    <div className="flex gap-3 mt-2">
                      {project.links.map((link) => (
                        'url' in link && link.url ? (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            [{link.label}]
                          </a>
                        ) : (
                          <span key={link.label} className="text-sm text-gray-400">
                            [{link.label}]
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-xs text-gray-400 pt-8 border-t border-gray-200">
          <p>Last updated: February 2025</p>
        </footer>
      </div>
    </div>
  );
}
