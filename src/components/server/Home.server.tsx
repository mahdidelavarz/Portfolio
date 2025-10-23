import { Icon } from "@iconify/react";
import { memo } from "react";
import { Typewriter } from "react-simple-typewriter";

interface HomeProps {
  scrollToSection: (id: string) => void;
}

const socialLinks = [
  {
    icon: "line-md:github-loop",
    color: "text-slate-300 hover:text-white",
    bg: "hover:bg-slate-800/50",
    link: "https://github.com/mahdidelavarz",
    label: "GitHub",
  },
  {
    icon: "hugeicons:telegram",
    color: "text-cyan-400 hover:text-cyan-300",
    bg: "hover:bg-cyan-900/30",
    link: "https://t.me/osis13",
    label: "Telegram",
  },
  {
    icon: "streamline:linkedin",
    color: "text-blue-500 hover:text-blue-400",
    bg: "hover:bg-blue-900/30",
    link: "https://www.linkedin.com/in/mahdi-delavar-5338ba280",
    label: "LinkedIn",
  },
  {
    icon: "lineicons:whatsapp",
    color: "text-green-500 hover:text-green-400",
    bg: "hover:bg-green-900/30",
    link: "https://wa.me/09025574357",
    label: "WhatsApp",
  },
];

const Home = memo(function Home({ scrollToSection }: HomeProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Desktop Social Links Sidebar */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 lg:flex flex-col gap-3 transition-all duration-1000 hidden">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white to-transparent mx-auto"></div>

        {socialLinks.map((social, index) => (
          <a
            href={social.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <button
              className={`group relative w-12 h-12 rounded-xl backdrop-blur-md bg-black/20 border border-white/10 ${social.color} ${social.bg} transition-all duration-300 hover:scale-110 hover:shadow-lg hover:border-white/20 cursor-pointer`}
              style={{ animationDelay: `${index * 0.1}s` }}
              aria-label={social.label}
            >
              <Icon
                icon={social.icon}
                width="20"
                height="20"
                className="mx-auto transition-all duration-300"
              />
            </button>
          </a>
        ))}

        <div className="w-px h-16 bg-gradient-to-b from-transparent via-slate-200/40 to-transparent mx-auto"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 py-16 sm:py-0">
        <div className="max-w-4xl mx-auto text-center w-full">
          <div className="transition-all duration-1000 delay-300">
            {/* Name - Responsive sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight mb-4 sm:mb-6">
              <div className="bg-gradient-to-r from-cyan-200 via-slate-200 to-cyan-300 bg-clip-text text-transparent">
                Mahdi Delavar
              </div>
            </h1>

            {/* Dynamic Role - Responsive and compact on mobile */}
            <div className="text-lg sm:text-2xl lg:text-4xl font-light mb-6 sm:mb-8 min-h-[40px] sm:min-h-[60px] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
              <span className="text-slate-300">I&apos;m a</span>
              <span className="bg-gradient-to-r from-cyan-400 via-orange-400 to-purple-500 bg-clip-text text-transparent font-medium">
                <Typewriter
                  words={[
                    "Frontend Developer",
                    "React Specialist",
                    "UI/UX Engineer",
                    "Next.js Expert",
                    "Web Architect",
                  ]}
                  loop={0}
                  cursor={true}
                  cursorStyle="-"
                  typeSpeed={100}
                  deleteSpeed={70}
                  delaySpeed={2000}
                />
              </span>
            </div>

            {/* Tagline - More compact on mobile */}
            <p className="text-sm sm:text-lg lg:text-xl text-slate-300/90 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
              Crafting exceptional digital experiences with modern technologies.
              <br className="hidden sm:block" />
              <span className="text-slate-400 block sm:inline mt-2 sm:mt-0">
                Turning ideas into elegant, performant web applications.
              </span>
            </p>

            {/* Action Buttons - Compact on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mb-8 sm:mb-16 px-2">
              <a
                href="/resume.pdf"
                download="Mahdi_Delavar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group cursor-pointer relative px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl sm:rounded-2xl font-semibold text-white text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-md hover:shadow-cyan-500/20 hover:-translate-y-1 border border-cyan-500/30"
                aria-label="Download Resume"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                <div className="relative flex items-center justify-center gap-2 sm:gap-3">
                  <Icon icon="hugeicons:note" width="20" height="20" />
                  <span>Download Resume</span>
                </div>
              </a>

              <button
                onClick={() => scrollToSection("contactme")}
                className="group cursor-pointer px-6 sm:px-10 py-3 sm:py-4 border-2 border-slate-600/50 backdrop-blur-md bg-white/5 rounded-xl sm:rounded-2xl font-semibold text-slate-300 text-sm sm:text-base hover:text-white hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300 hover:-translate-y-1"
                aria-label="Contact Me"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <Icon
                    icon="mage:email"
                    width="20"
                    height="20"
                    className="text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300"
                  />
                  <span>Let's Connect</span>
                </div>
              </button>
            </div>

            {/* Stats - Responsive grid on mobile */}
            <div className="grid grid-cols-3 gap-4 sm:flex sm:justify-center sm:gap-12 text-center max-w-lg sm:max-w-none mx-auto">
              {[
                { number: "3+", label: "Years Experience" },
                { number: "50+", label: "Projects Delivered" },
                { number: "100%", label: "Client Satisfaction" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className={`transition-all duration-1000 delay-${
                    500 + index * 100
                  }`}
                >
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1 sm:mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Home;