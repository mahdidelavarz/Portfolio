import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useRef, useState } from "react";
import { Typewriter } from "react-simple-typewriter";

const Slider: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 0, title: "Home" },
    { id: 1, title: "About" },
    { id: 2, title: "Skills" },
    { id: 3, title: "Projects" },
    { id: 4, title: "Experiences" },
    { id: 5, title: "Education" },
  ];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let isScrolling = false;
    let scrollTimeout: ReturnType<typeof setTimeout>;

    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;

      e.preventDefault();
      isScrolling = true;

      const delta = e.deltaY;
      const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
      setActiveSlide(currentSlide);

      if (delta > 0 && currentSlide < slides.length - 1) {
        slider.scrollTo({
          top: (currentSlide + 1) * window.innerHeight,
          behavior: "smooth",
        });
      } else if (delta < 0 && currentSlide > 0) {
        slider.scrollTo({
          top: (currentSlide - 1) * window.innerHeight,
          behavior: "smooth",
        });
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 800);
    };

    const handleScroll = () => {
      const currentSlide = Math.round(slider.scrollTop / window.innerHeight);
      setActiveSlide(currentSlide);
    };

    slider.addEventListener("wheel", handleWheel, { passive: false });
    slider.addEventListener("scroll", handleScroll);
    return () => {
      slider.removeEventListener("wheel", handleWheel);
      slider.removeEventListener("scroll", handleScroll);
    };
  }, [slides.length]);

  const scrollToSlide = (slideIndex: number) => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        top: slideIndex * window.innerHeight,
        behavior: "smooth",
      });
      setActiveSlide(slideIndex);
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* Top Menu */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-center gap-4 p-4">
        <div className="relative px-8 py-1 rounded-2xl backdrop-blur-sm ">
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              padding: "1px", // border width
              background: "linear-gradient(to left, #7C6437, #27596C, #24526A)",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          ></div>

          <div className="relative z-10 flex gap-4">
            {slides.map((slide) => (
              <button
                key={slide.id}
                onClick={() => scrollToSlide(slide.id)}
                className={`text-white px-4 py-2 rounded transition-opacity duration-300 ${
                  activeSlide === slide.id
                    ? "opacity-100"
                    : "opacity-50 hover:opacity-75"
                }`}
              >
                {slide.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
      <div className="w-14 h-60 absolute top-1/2 bottom-1/2 -translate-y-1/2 left-6 flex flex-col justify-between items-center z-20">
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-purple-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="line-md:github-loop" width="30" height="30" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-cyan-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="hugeicons:telegram" width="28" height="28" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-blue-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="streamline:linkedin" width="28" height="28" />
        </button>
        <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-green-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
          <Icon icon="lineicons:whatsapp" width="28" height="28" />
        </button>
      </div>

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className="absolute top-0 left-0 w-full h-screen overflow-y-scroll snap-y snap-mandatory scrollbar-hide "
      >
        <div className="w-full h-screen snap-start flex px-48 py-20 bg-black/40 text-white ">
          <div className=" w-1/2 py-36 ">
            <h1 className="text-3xl text-stone-300 text-shadow-lg">
              I'm a{" "}
              <span className="bg-gradient-to-r from-[#03d7f3] via-[#c3b6aa] to-amber-500 inline-block text-transparent bg-clip-text text-shadow-lg">
                {/* Style will be inherited from the parent element */}
                <Typewriter
                  words={[
                    "FrontEnd",
                    "Web App",
                    "Api Architecture",
                    "React.js",
                    "Next.js",
                  ]}
                  loop={5}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                  // onLoopDone={handleDone}
                  // onType={handleType}
                />
              </span>
              <h2 className="text-5xl mt-3 text-shadow-lg">Developer.</h2>
              <h3 className="mt-3 text-shadow-lg text-5xl bg-gradient-to-r from-[#18707c] via-[#c3b6aa] to-amber-500 inline-block text-transparent bg-clip-text">
                Mahdi Delavar
              </h3>
            </h1>
            <div className="mt-10 flex gap-4 text-stone-300">
              <button className="px-4 py-3 backdrop-blur-xl backdrop-brightness-75  rounded-xl cursor-pointer text-xl flex justify-center items-center gap-2">
                <Icon
                  icon="hugeicons:note"
                  width="24"
                  height="24"
                  className="text-indigo-400"
                />
                <span>My Resume</span>
              </button>
              <button className="px-4 py-3 backdrop-grayscale-50 backdrop-blur-md backdrop-brightness-100 rounded-xl cursor-pointer text-xl flex justify-center items-center gap-2">
                <Icon
                  icon="mage:email"
                  width="24"
                  height="24"
                  className="text-amber-400"
                />
                <span>Contact Me</span>
              </button>
            </div>
          </div>
          <span className="absolute bottom-14 right-1/2 left-1/2 translate-x-1/2 text-nowrap text-stone-400 text-shadow-lg ">
            Scroll Down
          </span>
          <div
            className="absolute bottom-0 border-stone-300 right-1/2 left-1/2 translate-x-1/2 w-10 h-10 rounded-t-3xl border-t-2 border-l-2 border-r-2 z-0 flex justify-center items-center cursor-pointer"
            onClick={() => scrollToSlide(1)}
          >
            <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
          </div>
        </div>
        <div className="w-full h-screen snap-start grid grid-cols-2 grid-rows-2 bg-slate-950/30 text-stone-300 text-lg px-48 pt-28 ">
          <div className="col-span-1 row-span-1 px-6 flex items-center">
            <div className="backdrop-blur-l mask-y-from-95% mask-radial-[100%_100%] mask-radial-from-95% backdrop-brightness-100 backdrop-grayscale-100  pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px]">
              <h2 className="text-2xl mb-4 flex gap-2 items-center text-purple-400 text-shadow-sm text-shadow-slate-800">
                <Icon
                  icon="la:user-secret"
                  width="36"
                  height="36"
                  className="text-purple-400"
                />{" "}
                Who I Am :{" "}
              </h2>
              <ul className="list-disc flex flex-col gap-4 text-sm">
                <li>
                  29 y/o frontend developer with 6+ years of experience crafting
                  intuitive, responsive, and high-performance web apps
                </li>
                <li>
                  {" "}
                  Passionate about clean code, pixel-perfect UIs, and seamless
                  user experiences.
                </li>
                <li> Always learning and adapting to modern frontend tech.</li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 row-span-1 px-6 flex items-center">
            <div className="backdrop-blur-xl mask-y-from-95% mask-radial-[80%_90%] mask-radial-from-100% backdrop-brightness-100 backdrop- pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px">
              <h2 className="text-2xl mb-4 flex gap-2 items-center text-teal-400 text-shadow-sm text-shadow-slate-800">
                <Icon
                  icon="fluent:window-dev-tools-16-regular"
                  width="36"
                  height="36"
                  className="text-teal-400"
                />
                What I Do :
              </h2>
              <ul className="list-disc flex flex-col gap-4 text-sm">
                <li>
                  Build from scratch? I develop fast, accessible, and visually
                  polished frontends using the best tools.
                </li>
                <li>
                  Improve existing code? I refactor, optimize, and modernize for
                  better performance and scalability.
                </li>
                <li>
                  Need advice? I help choose the right frameworks, tools, and UX
                  enhancements for your project.
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 row-span-1 px-6">
            <div className="backdrop-blur-xl mask-y-from-95% mask-radial-[100%_100%] mask-radial-from-95% backdrop-brightness-100 backdrop-  pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px">
              <h2 className="text-2xl mb-4 flex gap-2 text-blue-400 text-shadow-sm text-shadow-slate-800">
                <Icon
                  icon="pepicons-pencil:handshake"
                  width="36"
                  height="36"
                  className="text-blue-400"
                />
                How I Work :
              </h2>
              <ul className="list-disc flex flex-col gap-4 text-sm">
                <li>
                  Team-first mindset – Collaborate smoothly with designers,
                  backend devs, and stakeholders.
                </li>
                <li>
                  Clear & proactive communicator – Bridge the gap between tech
                  and non-tech teams effortlessly.
                </li>
                <li>
                  Adaptable & solution-driven – Embrace feedback, iterate
                  efficiently, and focus on results.
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1 row-span-1 px-6">
            <div className=" backdrop-blur-xl mask-y-from-95% mask-radial-[100%_100%] mask-radial-from-95% backdrop-brightness-100 backdrop-  pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px">
              <h2 className="text-2xl mb-4 flex gap-2 items-center text-yellow-500 text-shadow-sm text-shadow-slate-800">
                <Icon
                  icon="hugeicons:star-award-01"
                  width="36"
                  height="36"
                  className="text-yellow-500 "
                />
                Why Work With Me :
              </h2>
              <ul className="list-disc flex flex-col gap-4 text-sm">
                <li>
                  Reliable & deadline-oriented – Deliver high-quality work on
                  time, every time.
                </li>
                <li>
                  User-focused approach – Build interfaces that balance
                  aesthetics and functionality.
                </li>
                <li>
                  Low ego, high impact – Prioritize teamwork, growth, and
                  continuous improvement.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="w-full h-screen snap-start flex items-center justify-center bg-slate-900/30 text-white">
          <h1 className="">{/* <BlackHole /> */}</h1>
        </div>
        <div className="w-full h-screen snap-start flex items-center justify-center bg-gray-800/30 text-white">
          <h1 className="text-4xl">Slide 4</h1>
        </div>
        <div className="w-full h-screen snap-start flex items-center justify-center bg-gray-700/30 text-white">
          <h1 className="text-4xl">Slide 5</h1>
        </div>
        <div className="w-full h-screen snap-start flex items-center justify-center bg-gray-600/30 text-white">
          <h1 className="text-4xl">Slide 6</h1>
        </div>
      </div>

      {/* Right Navigation Buttons */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 flex flex-col gap-4">
        {slides.map((slide) => (
          <button
            key={slide.id}
            onClick={() => scrollToSlide(slide.id)}
            className={`w-3 h-3 rounded-full bg-white transition-opacity duration-300 ${
              activeSlide === slide.id
                ? "opacity-100"
                : "opacity-30 hover:opacity-60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
