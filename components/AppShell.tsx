"use client";

import { useEffect, useState, PropsWithChildren, FC } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";


const AppShell: FC<PropsWithChildren> = ({ children }) => {
  const [toggle, setToggle] = useState(false);
  // const [mode, setMode] = useState<"light" | "dark">("light");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  useEffect(() => {
    AOS.refresh();
  }, [pathname]);

  const toggleFunc = () => {
    setToggle((t) => !t);
  };

  const offFunc = () => {
    setToggle(false);
  };

  const gotoContact = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="app">
      <div className="flex flex-row h-screen z-10">
        {/* Mobile Menu Button */}
        <button
          aria-label="Open menu"
          className="fixed right-2 top-8 w-20 h-20 md:hidden z-50 px-auto"
          onClick={toggleFunc}
        >
          {pathname === "/projects" && !toggle ? (
            <img
              src="https://img.icons8.com/material-rounded/48/ffffff/menu--v1.png"
              className="cursor-pointer transition duration-400 ease-in-out transform hover:scale-110"
              alt="menu"
            />
          ) : (
            <img
              src="https://img.icons8.com/material-rounded/48/000000/menu--v1.png"
              className="cursor-pointer transition duration-400 ease-in-out transform hover:scale-110"
              alt="menu"
            />
          )}
        </button>

        {toggle && (
          <div className="fixed right-5 top-5 w-52 h-80 z-40 px-auto md:hidden">
            <div
              className="rounded-2xl h-full bg-gray-100 shadow-lg text-gray-500"
              data-aos="fade-left"
            >
              <div className="overflow-hidden border-gray-400 text-center">
                <p
                  className="border-gray-300 border-b py-8 pt-20 cursor-pointer transition duration-400 ease-in-out transform hover:scale-110 hover:font-bold"
                  onClick={() => router.push("/")}
                >
                  About me
                </p>
                <p
                  className="border-gray-300 border-b py-8 cursor-pointer transition duration-400 ease-in-out transform hover:scale-110 hover:font-bold"
                  onClick={() => router.push("/projects")}
                >
                  Projects
                </p>
                <p
                  className="py-8 cursor-pointer transition duration-400 ease-in-out transform hover:scale-110 hover:font-bold"
                  onClick={() => router.push("/blogs")}
                >
                  Blogs
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-2/7 h-full text-gray-50">
          <div
            className="fixed h-full w-2/7 min-w-20 flex flex-col justify-end md:px-20 px-5 bg-forest"
            // style={{ backgroundImage: "url('/assets/forest.jpeg')" }}
          >
            <div className="py-3 flex flex-col items-center">
              <img
                src="/assets/me.png"
                alt="my profile image"
                className="rounded-full w-3/7 min-w-20 shadow-lg"
              />
            </div>

            <div className="py-2 text-gray-50 flex flex-col text-center">
              <p className="2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg font-semibold text-md pl-0 pb-3 ">
                Journal
              </p>
              <p className="2xl:text-3xl xl:text-2xl lg:text-xl md:text-base text-sm pl-0 pb-3 font-light">
                Welcome to my blog!
              </p>
            </div>

            <nav className="py-5 flex items-start flex-col xl:text-2xl lg:text-xl md:text-lg text-md font-light">
              <Link href="/" className="py-1 cursor-pointer">
                About Me
              </Link>
              <Link href="/projects" className="py-1 cursor-pointer">
                Projects
              </Link>
              <Link href="/blogs" className="py-1 cursor-pointer">
                Blogs
              </Link>
            </nav>

            <div className="flex py-1 justify-evenly pb-10 pt-5">
              <img
                src="/assets/linkedin_icon.png"
                alt="linkedin"
                className="h-6 w-6 cursor-pointer"
                onClick={() =>
                  gotoContact("https://www.linkedin.com/in/kornvik-tanpipat")
                }
              />
              <img
                src="/assets/instra_icon.png"
                alt="instagram"
                className="h-6 w-6 cursor-pointer"
                onClick={() =>
                  gotoContact("https://www.instagram.com/kornravik/")
                }
              />
              <img
                src="/assets/facebook_icon.png"
                alt="facebook"
                className="h-6 w-6 cursor-pointer"
                onClick={() =>
                  gotoContact("https://www.facebook.com/kornvik.tanpipat")
                }
              />
            </div>

            <p className="text-sm pb-2 text-center font-light">
              © 2021 Kornvik Tanpipat. All rights reserved.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <main className="bg-gray-50 w-full md:w-5/7 z-20" onClick={offFunc}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default AppShell;
