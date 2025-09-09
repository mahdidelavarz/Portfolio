// // src/components/Home.tsx
// import { Icon } from "@iconify/react";
// import { Typewriter } from "react-simple-typewriter";

// interface HomeProps {
//   scrollToSection: (id: string) => void; // 👈 Changed from index to id
// }

// function Home({ scrollToSection }: HomeProps) {
//   return (
//     <div className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 text-white relative">
//       {/* Left Content */}
//       <div className="w-14 h-60 fixed top-1/2 bottom-1/2 -translate-y-1/2 left-6 flex flex-col justify-between items-center z-20">
//         <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-purple-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
//           <Icon icon="line-md:github-loop" width="30" height="30" />
//         </button>
//         <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-cyan-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
//           <Icon icon="hugeicons:telegram" width="28" height="28" />
//         </button>
//         <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-blue-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
//           <Icon icon="streamline:linkedin" width="28" height="28" />
//         </button>
//         <button className="w-12 h-12 backdrop-blur-3xl rounded-xl flex justify-center items-center text-green-300 cursor-pointer bg-gradient-to-br from-[#192434] via-[#2c5565] to-[#5c3931]">
//           <Icon icon="lineicons:whatsapp" width="28" height="28" />
//         </button>
//       </div>

//       <div className="w-full h-[30rem] ml-44  flex flex-col items-start justify-start text-center md:text-left ">
//         <h1 className="text-2xl md:text-3xl lg:text-4xl text-stone-300 font-light mb-6">
//           <div className="flex flex-wrap gap-2 md:gap-4 items-center justify-center md:justify-start">
//             <span>I'm a</span>
//             <span className="bg-gradient-to-r from-[#03d7f3] via-[#c3b6aa] to-amber-500 inline-block text-transparent bg-clip-text font-medium">
//               <Typewriter
//                 words={[
//                   "FrontEnd",
//                   "Web App",
//                   "Api Architecture",
//                   "React.js",
//                   "Next.js",
//                 ]}
//                 loop={5}
//                 cursor
//                 cursorStyle="_"
//                 typeSpeed={70}
//                 deleteSpeed={50}
//                 delaySpeed={1000}
//               />
//             </span>
//           </div>
//         </h1>

//         <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-2 mb-4">
//           Developer.
//         </h2>

//         <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#18707c] via-[#c3b6aa] to-amber-500 inline-block text-transparent bg-clip-text mb-8">
//           Mahdi Delavar
//         </h3>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//           <button
//             className="px-5 py-3 backdrop-blur-xl backdrop-brightness-75 rounded-xl cursor-pointer text-base sm:text-lg font-medium flex justify-center items-center gap-2 transition-all hover:scale-105 active:scale-95"
//             aria-label="Download Resume"
//           >
//             <Icon
//               icon="hugeicons:note"
//               width="24"
//               height="24"
//               className="text-indigo-400"
//             />
//             <span>My Resume</span>
//           </button>

//           <button
//             className="px-5 py-3 backdrop-blur-md backdrop-brightness-100 rounded-xl cursor-pointer text-base sm:text-lg font-medium flex justify-center items-center gap-2 transition-all hover:scale-105 active:scale-95"
//             aria-label="Contact Me"
//             onClick={() => scrollToSection("contactme")}
//           >
//             <Icon
//               icon="mage:email"
//               width="24"
//               height="24"
//               className="text-amber-400"
//             />
//             <span>Contact Me</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
//!version 2
import React, { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { Typewriter } from "react-simple-typewriter";

interface HomeProps {
  scrollToSection: (id: string) => void;
}

function Home({ scrollToSection }: HomeProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const socialLinks = [
    { icon: "line-md:github-loop", color: "text-slate-300 hover:text-white", bg: "hover:bg-slate-800", link: "#" },
    { icon: "hugeicons:telegram", color: "text-blue-400 hover:text-blue-300", bg: "hover:bg-blue-900/20", link: "#" },
    { icon: "streamline:linkedin", color: "text-blue-500 hover:text-blue-400", bg: "hover:bg-blue-900/20", link: "#" },
    { icon: "lineicons:whatsapp", color: "text-green-500 hover:text-green-400", bg: "hover:bg-green-900/20", link: "#" }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Mouse Follower Gradient */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
      />

      {/* Social Media Sidebar */}
      <div className={`fixed left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-4 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent mx-auto"></div>
        {socialLinks.map((social, index) => (
          <button
            key={index}
            className={`group relative w-12 h-12 rounded-xl backdrop-blur-md bg-slate-800/30 border border-slate-700/50 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <Icon icon={social.icon} width="24" height="24" className="mx-auto" />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        ))}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-500 to-transparent mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 lg:px-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content - Text */}
          <div className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Greeting */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
              <span className="text-blue-400 font-medium tracking-wide">Hello, I'm</span>
            </div>

            {/* Name */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Mahdi
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Delavar
              </span>
            </h1>

            {/* Dynamic Role */}
            <div className="text-2xl lg:text-3xl text-slate-300 font-light">
              <span className="mr-3">I'm a</span>
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold">
                <Typewriter
                  words={[
                    "Frontend Developer",
                    "React Specialist",
                    "UI/UX Engineer",
                    "Web Architect",
                    "Next.js Expert"
                  ]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={80}
                  deleteSpeed={60}
                  delaySpeed={1500}
                />
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Crafting exceptional digital experiences with modern web technologies. 
              Passionate about clean code, intuitive design, and performance optimization.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-8">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center gap-3">
                  <Icon icon="hugeicons:note" width="20" height="20" />
                  <span>View Resume</span>
                </div>
              </button>
              
              <button 
                onClick={() => scrollToSection("contactme")}
                className="group px-8 py-4 border-2 border-slate-600 rounded-xl font-semibold text-slate-300 hover:text-white hover:border-blue-500 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3">
                  <Icon icon="mage:email" width="20" height="20" className="text-blue-400 group-hover:text-blue-300" />
                  <span>Let's Talk</span>
                </div>
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-12">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-sm text-slate-400">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-slate-400">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">100%</div>
                <div className="text-sm text-slate-400">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual Element */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative w-80 h-80 mx-auto">
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full border border-blue-500/30 animate-spin" style={{ animationDuration: '20s' }}></div>
              <div className="absolute inset-4 rounded-full border border-purple-500/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-8 rounded-full border border-cyan-500/30 animate-spin" style={{ animationDuration: '10s' }}></div>
              
              {/* Center Element */}
              <div className="absolute inset-16 rounded-full bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-xl flex items-center justify-center">
                <Icon icon="ri:code-s-slash-line" width="80" height="80" className="text-blue-400" />
              </div>

              {/* Floating Tech Icons */}
              <div className="absolute -top-4 left-1/4 w-12 h-12 bg-slate-800/50 rounded-lg backdrop-blur-md flex items-center justify-center animate-bounce" style={{ animationDelay: '0s' }}>
                <Icon icon="logos:react" width="24" height="24" />
              </div>
              <div className="absolute top-1/4 -right-4 w-12 h-12 bg-slate-800/50 rounded-lg backdrop-blur-md flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Icon icon="logos:nextjs-icon" width="24" height="24" />
              </div>
              <div className="absolute -bottom-4 right-1/4 w-12 h-12 bg-slate-800/50 rounded-lg backdrop-blur-md flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
                <Icon icon="logos:typescript-icon" width="24" height="24" />
              </div>
              <div className="absolute bottom-1/4 -left-4 w-12 h-12 bg-slate-800/50 rounded-lg backdrop-blur-md flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
                <Icon icon="logos:tailwindcss-icon" width="24" height="24" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="flex flex-col items-center gap-2 text-slate-400">
          <span className="text-sm font-medium">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-slate-600 rounded-full relative">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;