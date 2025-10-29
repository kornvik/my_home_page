"use client";

import Image from "next/image";

export default function Home() {
  const gotoContact = (link: string) => {
    window.open(link);
  };

  return (
    <div className="w-full flex flex-col justify-start items-center bg-gray-50 z-20 text-gray-700 ">
      <div className="w-full flex flex-col items-start">
        <h2 className="font-bold text-4xl px-5 md:px-44 pt-12 font-mono ">
          About me
        </h2>
        <p className="text-gray-500 text-base px-5 md:px-44 pt-3 font-mono pb-5">
          Last Update : 16 Dec 2021
        </p>
      </div>

      <div className="flex flex-col-reverse 2xl:flex-row justify-evenly w-full pt-16 2xl:pt-32 items-center lg:pb-20">
        <div className="flex flex-col justify-center items-center pt-40 2xl:pt-20 pl-20">
          <div className="flex flex-row justify-center items-center animate-bounce ">
            <h2 className="font-bold text-4xl lg:text-6xl font-stretch-semi-expanded">
              Hi there
            </h2>
            <div className="w-32">
              <img
                src="/assets/giphy.gif"
                alt="hooray"
                className="w-32 h-32 pl-6 pb-10"
              />
            </div>
          </div>
          <h3
            className="font-normal text-3xl xl:text-4xl 2xl:text-5xl pb-3 font-stretch-semi-expanded"
          >
            I&apos;m Korn
          </h3>
          <div>
            <ul className="py-2 text-xl text-center font-light">
              <li>I like make things and meeting new people</li>
              <li>Tech Savvy, Fullstack Web Dev, Robotic Engineer</li>
            </ul>
          </div>
        </div>

        <div className="w-2/5 flex justify-center flex-row">
          <Image
            src="/assets/me2.jpeg"
            alt="me_full"
            className="rounded-lg relative left-5 top-32 w-40 z-20 h-40 2xl:w-60 2xl:h-60 shadow-xl transition duration-500 ease-in-out transform hover:shadow-2xl hover:scale-110"
            width={240}
            height={240}
          />
          <Image
            src="/assets/me3.jpg"
            alt="me_full2"
            className="rounded-lg relative right-5 w-44 h-52 2xl:w-64 2xl:h-80 shadow-xl transition duration-500 ease-in-out transform hover:shadow-2xl hover:scale-110"
            width={352}
            height={448}
          />
        </div>
      </div>

      <div className="spacer2 layer3 pb-0"></div>

      <div className="text-gray-50 bg-gray-800 flex flex-row justify-start w-full -mt-1">
        <h2 className="font-bold text-3xl px-5 md:px-20 lg:px-44 pt-12 font-mono">
          Skills
        </h2>
      </div>

      <div className="text-gray-50 bg-gray-800 grid grid-flow-col grid-cols-2 md:grid-cols-3 grid-rows-5 md:grid-rows-3 gap-4 w-full pt-10 font-medium text-xl xl:text-2xl font-mono place-items-start px-10 -mb-1 -mt-1">
        <div className="py-5 md:pl-5" data-aos="fade-up">
          💻 Full-stack Web
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          📖 SQL
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          🌐 React, VueJS
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          🤖 Mechnical Design
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          👾 Python, C++, JS
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          👀 Computer Vision
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          📊 Data Viz
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          🧠 Machine Learning
        </div>
        <div className="py-5 md:pl-5" data-aos="fade-up">
          🔎 Data Analysis
        </div>
      </div>

      <div className="spacer2 layer4 pb-0.5"></div>

      <div className="flex flex-row justify-start w-full pb-16 bg-yellow-50">
        <h2 className="font-bold text-3xl px-5 md:px-44 pt-12 font-mono">
          Journey
        </h2>
      </div>

      {/* Journey Timeline - keeping the original complex layout */}
      <div className="flex flex-row pt-10 w-full h-auto justify-around bg-yellow-50 px-10 -mb-1 z-30">
        <div className="flex flex-col w-2/5 items-center">
          <div
            className="min-w-min flex flex-col border-4 border-fuchsia-600 h-auto w-2/3 lg:w-5/6 bg-gray-50 rounded-2xl shadow-lg lg:px-10 px-5 py-10 justify-start"
            data-aos="flip-right"
          >
            <div className="flex flex-rol justify-start items-center pr-5">
              <h2 className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl inline pr-1">
                Tokyo Institute of Technology{" "}
              </h2>
              <img
                src="/assets/titech.png"
                alt="bachelor"
                className="inline w-8 h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24"
              />
            </div>
            <div className="flex flex-col font-mono text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl justify-start items-start pt-5">
              <p className="text-left italic">
                Bachalor : System and Control Eng. (Class of 2022)
              </p>
              <ul className="list-disc text-left pt-5">
                <li className="pb-2">GPA : 3.76/4.5 (93/100)</li>
                <li
                  className="hidden md:list-item cursor-pointer hover:underline"
                  onClick={() =>
                    gotoContact("https://arxiv.org/abs/2111.10804")
                  }
                >
                  Hatanaka Lab : Distributed Control Algorithm Research
                </li>
                <li
                  className="md:hidden"
                  onClick={() =>
                    gotoContact("https://arxiv.org/abs/2111.10804")
                  }
                >
                  Research on Distributed Control Algorithm
                </li>
              </ul>
            </div>
          </div>

          <div
            className="min-w-min flex flex-col border-4 border-fuchsia-600 h-auto w-2/3 lg:w-5/6 bg-gray-50 rounded-2xl shadow-lg lg:px-10 px-5 py-10 justify-start mt-40"
            data-aos="flip-right"
          >
            <div className="flex flex-rol justify-start items-center">
              <h2 className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl inline pr-1">
                Thai Students&apos; Association in Japan
              </h2>
              <img
                src="/assets/thai2.gif"
                alt="bachelor"
                className="inline w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24 mr-5"
              />
            </div>
            <div className="flex flex-col font-mono text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl justify-start items-start">
              <p className="text-left pt-5 italic">
                Head of Project Evaluation and Quality Control <br /> 04/2020 -
                03/2021
              </p>
              <ul className="list-disc text-left pt-5">
                <li className="pb-2">Management</li>
                <li className="">Optimize evaluation protocol</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="h-auto w-5 mx-7"></div>

        <div className="h-96 w-3 md:w-5 mb-20 mt-48 absolute bg-gray-800 z-30">
          <div className="h-96 w-3 md:w-5 mb-20 mt-60 absolute bg-gray-800 z-30">
            <div className="h-96 w-3 md:w-5 mb-20 mt-56 absolute bg-gray-800 z-30"></div>
          </div>
        </div>

        <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-800 absolute mt-44 rounded-full z-30">
          <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-800 absolute mt-52 rounded-full z-30">
            <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-800 absolute mt-96 rounded-full z-30">
              <div className="w-10 h-10 md:w-16 md:h-16 bg-gray-800 absolute mt-60 rounded-full z-30"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-2/5 items-center">
          <div
            className="min-w-min flex flex-col border-4 border-fuchsia-600 h-auto w-2/3 lg:w-5/6 bg-gray-50 rounded-2xl shadow-lg lg:px-10 px-5 py-10 justify-start mt-64"
            data-aos="flip-left"
          >
            <div className="flex flex-rol justify-center items-center">
              <h2 className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl inline pr-1">
                Robotic Club
              </h2>
              <img
                src="/assets/robot_club.gif"
                alt="bachelor"
                className="inline w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24"
              />
            </div>
            <div className="flex flex-col font-mono text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl justify-start items-start">
              <p className="text-left pt-5 italic">
                Software Eng. 05/2019 - 12/2020
              </p>
              <ul className="list-disc text-left pt-5">
                <li className="pb-2">Program robot, Control theory</li>
                <li className="">
                  Developed real-time data visualization as testing tool
                </li>
              </ul>
            </div>
          </div>

          <div
            className="min-w-min flex flex-col border-4 border-fuchsia-600 h-auto w-2/3 lg:w-5/6 bg-gray-50 rounded-2xl shadow-lg lg:px-10 px-5 py-10 justify-start mt-64"
            data-aos="flip-left"
          >
            <div className="flex flex-rol justify-start items-center">
              <h2 className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-4xl inline pr-1">
                HG Robotics
              </h2>
              <img
                src="/assets/gundam.gif"
                alt="bachelor"
                className="inline w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 2xl:w-24 2xl:h-24"
              />
            </div>
            <div className="flex flex-col font-mono text-sm md:text-base lg:text-lg xl:text-2xl 2xl:text-3xl justify-start items-start">
              <p className="text-left italic">
                Software Development Eng. <br /> 02/2021 - 03/2021
              </p>
              <ul className="list-disc text-left pt-5">
                <li className="pb-2">Computer Vision</li>
                <li className="">Software Optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="spacer2 layer5 -mb-1"></div>

      <div className="flex flex-row justify-start w-full pb-10 bg-gray-800 -mt-1 -mb-1">
        <h2 className="font-bold text-3xl lg:text-4xl 2xl:text-6xl px-5 md:px-44 pt-12 font-mono text-gray-50">
          Achievement
        </h2>
      </div>

      <div className="w-full text-gray-50 bg-gray-800 text-xl font-mono 2xl:text-3xl xl:text-2xl place-items-start px-auto pl-10 md:pl-40 pr-20 pb-16 border-b-2 border-fuchsia-600 flex flex-col justify-start">
        <ul className="list-disc text-left">
          <li className="pb-2">
            1st place in International Design Contest Robocon 2021 🥇
          </li>
          <li className="pb-2">
            2nd place in Tokyo Tech&apos;s Creative Design Competition 2018 🥈
          </li>
          <li className="pb-2">
            Bronze modal in Thailand Olympiad in Informatic 2016 🥉
          </li>
        </ul>
      </div>

      <div className="flex flex-row justify-start w-full pb-10 bg-white">
        <h2 className="font-bold text-3xl lg:text-4xl 2xl:text-6xl px-5 md:px-44 pt-12 font-mono">
          Certificates
        </h2>
      </div>

      <div className="w-full font-semibold text-lg font-mono place-items-start px-auto md:pl-40 pr-20 pb-16 border-b-2 border-fuchsia-600 flex flex-col justify-start bg-white">
        <Image
          src="/assets/certificates.png"
          alt="certificates"
          width={800}
          height={600}
        />
      </div>

      <div className="text-gray-50 bg-gray-800 flex flex-row justify-start w-full pb-10 -mb-1">
        <h2 className="font-bold text-3xl lg:text-4xl 2xl:text-6xl px-5 md:px-44 pt-12 font-mono">
          Hobby
        </h2>
      </div>

      <div className="text-gray-50 bg-gray-800 w-full font-sans text-xl 2xl:text-3xl xl:text-2xl place-items-start px-auto pl-5 md:pl-40 pr-20 pb-16 grid md:grid-cols-4 grid-cols-2">
        <p>Novel</p>
        <p>Reading</p>
        <p>Oil Paintings</p>
        <p>Social Development</p>
      </div>
    </div>
  );
}
