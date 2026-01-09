"use client";

import { useEffect } from "react";
import Image from "next/image";
import LearnsByAIIllustration from "../components/LearnsByAIIllustration";

export default function Projects() {
  useEffect(() => {
    const initKute = () => {
      if ((window as any).KUTE) {
        const tween = (window as any).KUTE.fromTo(
          "#blob1",
          { path: "#blob1" },
          { path: "#blob2" },
          { repeat: 999, duration: 3000, yoyo: true }
        );
        tween.start();
        return true;
      }
      return false;
    };

    // Try immediately, then poll if not available
    if (!initKute()) {
      const interval = setInterval(() => {
        if (initKute()) {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);

  const gotoContact = (link: string) => {
    window.open(link);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center bg-gray-50 z-20">
      <div className="w-full flex flex-col items-start bg-gray-900 text-gray-50 z-20">
        <div className="bg-gray-900 z-20 w-full flex flex-col items-center">
          <div className="w-full max-w-4xl px-8 md:px-16">
            <h2 className="font-bold text-4xl pt-12 font-mono">
              Projects
            </h2>
            <p className="text-gray-500 text-base pt-3 font-mono pb-5">
              Last Update : 05 Jan 2026
            </p>
          </div>
        </div>
      
        {/* <div className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 py-16">
          <div className="w-full flex flex-row justify-around h-60 items-center px-10">
            <div className="w-0 max-w-2xl xl:w-1/2 px-1 md:px-20">
              <Image
                src="/assets/learnsbyai.png"
                alt="Learns By AI"
                onClick={() => gotoContact("https://learnsbyai.com")}
                className="w-full rounded-lg shadow-2xl hover:shadow-purple-500/50 cursor-pointer transition duration-500 ease-in-out transform hover:scale-105 hover:rotate-1"
                width={600}
                height={400}
              />
            </div>
            <div className="w-full md:px-2 px-1 flex flex-col items-center">
              <div className="cursor-pointer pb-5 flex flex-row items-center gap-3">
                <h2
                  className="3xl:text-5xl text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400"
                  onClick={() => gotoContact("https://learnsbyai.com")}
                >
                  Learns By AI
                </h2>
                <span className="text-4xl">🤖</span>
              </div>
              <p className="text-xl font-sans 2xl:text-3xl xl:text-2xl text-gray-100">
                An AI-powered learning platform that helps students understand
                complex topics through interactive lessons and personalized
                feedback.
              </p>
            </div>
          </div>
        </div> */}
        <div className="w-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-16 pb-48">
          <div className="w-full max-w-4xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 px-8 md:px-16">
            {/* Illustration - Now on LEFT */}
            <div className="flex-1 w-full max-w-xl">
              <LearnsByAIIllustration />
            </div>

            {/* Text Content - Now on RIGHT, more compact */}
            <div className="flex-1 flex flex-col items-start text-left space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn Python, Guided by{" "}
                <span
                  className="font-extrabold bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #f87171, #fb923c, #fbbf24, #4ade80, #22d3ee, #3b82f6, #a855f7)",
                  }}
                >
                  AI
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                AI-powered platform with interactive lessons and personalized
                feedback. Master Python with your own learning path.
              </p>
              <button
                onClick={() => gotoContact("https://learnsbyai.com")}
                className="mt-4 px-6 py-3 text-base font-semibold text-white rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Get Your Learning Path Now 🚀
              </button>
            </div>
          </div>
        </div>

        <div className="spacer3 purple_to_gray overlap-up"></div>
        <div className="bg-gray-900 w-full" id="lowpad">
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-16">
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="cursor-pointer pb-5 flex flex-row items-center gap-2">
                <h2
                  className="text-4xl font-bold"
                  onClick={() => gotoContact("https://reviewright.study")}
                >
                  ReviewRight
                </h2>
                <Image
                  src="/assets/cards.png"
                  alt="ReviewRight Logo"
                  className="w-10 h-10"
                  width={40}
                  height={40}
                />
              </div>
              <p className="text-lg md:text-xl text-gray-100 leading-relaxed">
                A flashcard education platform build for university and
                highschool students for intensive memory lessons.
              </p>
            </div>
            <div className="flex-1 max-w-sm">
              <Image
                src="/assets/ReviewRight.png"
                alt="ReviewRight"
                onClick={() => gotoContact("https://reviewright.study")}
                className="w-full rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
        {/* <div className="spacer3 purple_to_trans -mt-1 -mb-18 lg:-mb-20 relative z-40"></div> */}
        <section className="bg-fixed bg-no-repeat bg-cover bg-robot z-10 w-full">
          <div className="w-full max-w-4xl mx-auto px-4 md:px-16 py-12 md:py-16 text-center">
            <h2
              className="text-xl md:text-4xl font-bold pb-3 md:pb-5 cursor-pointer"
              onClick={() =>
                gotoContact("https://github.com/kornsinanju/IDC_2021_G3")
              }
            >
              Flying Toilet 🤖
            </h2>
            <p className="font-sans hover:bg-gray-800 hover:bg-opacity-40 text-sm md:text-xl leading-relaxed">
              A winning robot project for International Design Contest Robocon
              2021 among all 83 representative students from university all over
              the world!
              <br /> Using C# and Inventor to create.
            </p>
          </div>
        </section>

        <section className="red w-full">
          <div className="w-full max-w-4xl mx-auto px-4 md:px-16 py-12 md:py-16 text-center">
            <h2 className="text-xl md:text-4xl font-bold pb-3 md:pb-5">
              Go Salmon Go!
            </h2>
            <p className="text-sm md:text-xl font-sans leading-relaxed">
              Inspired by Candy Crush and Plumber, we created a puzzle game where
              players have to move the river to make way for the fish! The game is
              implemented in Python using Pygame during 1 day hackathon by Digital
              Creators Club (Trap)
            </p>
            <div className="pt-10">
              <iframe
                style={{ width: "100%", height: "400px" }}
                src="https://www.youtube.com/embed/H0wEopkBiW8"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        <div className="spacer layer1"></div>

        <div className="w-full -mt-20" id="grayon">
          <div className="w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 px-8 md:px-16 py-16">
            <div className="flex-1 max-w-sm">
              <Image
                src="/assets/my_blog_next.png"
                alt="ReditClone"
                onClick={() =>
                  gotoContact("https://github.com/kornsinanju/my_blog_nextjs")
                }
                className="w-full rounded-lg shadow-lg hover:shadow-2xl cursor-pointer transition duration-500 ease-in-out transform hover:scale-110"
                width={600}
                height={400}
              />
            </div>
            <div className="flex-1 flex flex-col items-center text-center">
              <div className="pb-5">
                <h2
                  className="text-4xl font-bold cursor-pointer"
                  onClick={() =>
                    gotoContact("https://github.com/kornsinanju/my_blog_nextjs")
                  }
                >
                  Redit Clone
                </h2>
              </div>
              <p className="text-lg md:text-xl font-sans leading-relaxed">
                A personal project to create a Redit clone blog using
                server-side rendering from nextjs and firebase as its database.
              </p>
            </div>
          </div>
        </div>

        <div className="spacer layer2 flip -my-0.5 -mt-5 z-0"></div>

        <section className="pink w-full">
          <div className="absolute pt-28 w-full flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl mx-auto px-8 md:px-16 text-center">
              <h2
                className="text-4xl font-bold pb-5 cursor-pointer"
                onClick={() =>
                  gotoContact("https://github.com/kornsinanju/clone_agario")
                }
              >
                Agar IO Clone
              </h2>
              <p className="text-lg md:text-xl font-sans leading-relaxed">
                Agar.io clone project to practice real-time communication by
                applying websocket using Vue.JS, CanvasJS, MongoDB, and Flask :)
              </p>
            </div>
          </div>
          <svg
            id="visual"
            viewBox="0 0 960 300"
            width="100%"
            height="300"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            version="1.1"
          >
            <g transform="translate(461.7536129145143 156.17096224429446)">
              <path
                id="blob1"
                d="M63.7 -70.9C88 -55.6 116.9 -40.6 121.6 -20.5C126.3 -0.3 106.9 25.1 87.8 43.8C68.8 62.5 50.1 74.5 28.6 85.2C7.1 95.8 -17.3 105.2 -38.7 100.2C-60.1 95.1 -78.6 75.5 -83.9 54.3C-89.3 33 -81.6 10 -81.5 -18.5C-81.4 -47 -88.9 -80.9 -76.6 -98.4C-64.3 -115.9 -32.1 -117 -6.2 -109.6C19.7 -102.2 39.4 -86.3 63.7 -70.9"
                fill="#BB004B"
              ></path>
            </g>
            <g
              transform="translate(486.7864384612594 139.839597007338)"
              style={{ visibility: "hidden" }}
            >
              <path
                id="blob2"
                d="M65.3 -78.3C78.8 -66.5 79.8 -40.4 87.3 -13.1C94.8 14.2 108.9 42.6 102.3 63.9C95.8 85.2 68.6 99.5 41.9 104.7C15.2 109.9 -11.1 106.2 -28.8 93.5C-46.5 80.8 -55.7 59.1 -74.1 37.7C-92.5 16.3 -120.1 -4.9 -117.4 -20.8C-114.8 -36.8 -81.8 -47.5 -57.2 -57.3C-32.6 -67.1 -16.3 -76.1 4.8 -81.8C25.9 -87.6 51.9 -90.1 65.3 -78.3"
                fill="#BB004B"
              ></path>
            </g>
          </svg>
        </section>
      </div>
    </div>
  );
}
