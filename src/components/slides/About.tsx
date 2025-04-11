import { Icon } from "@iconify/react/dist/iconify.js";

function About() {
  return (
    <div className="w-full h-screen snap-start grid grid-cols-2 grid-rows-2 bg-slate-950/30 text-stone-300 text-lg px-48 pt-28 ">
      <div className="col-span-1 row-span-1 px-5 flex items-center">
        <div className="backdrop-blur-xl backdrop-brightness-80 pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px] shadow-inner/30 shadow-purple-600 ">
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
              Passionate about clean code, pixel-perfect UIs, and seamless user
              experiences.
            </li>
            <li> Always learning and adapting to modern frontend tech.</li>
          </ul>
        </div>
      </div>
      <div className="col-span-1 row-span-1 px-5 flex items-center">
        <div className="backdrop-blur-xl backdrop-brightness-80 pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px] shadow-inner/30 shadow-teal-600">
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
      <div className="col-span-1 row-span-1 px-5">
        <div className="backdrop-blur-xl backdrop-brightness-80 pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px] shadow-inner/30 shadow-blue-700">
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
              Team-first mindset – Collaborate smoothly with designers, backend
              devs, and stakeholders.
            </li>
            <li>
              Clear & proactive communicator – Bridge the gap between tech and
              non-tech teams effortlessly.
            </li>
            <li>
              Adaptable & solution-driven – Embrace feedback, iterate
              efficiently, and focus on results.
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-1 row-span-1 px-5">
        <div className="backdrop-blur-xl backdrop-brightness-80 pl-8 pr-2 py-6 rounded-2xl w-[540px] h-[250px] shadow-inner/30 shadow-yellow-600">
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
              Reliable & deadline-oriented – Deliver high-quality work on time,
              every time.
            </li>
            <li>
              User-focused approach – Build interfaces that balance aesthetics
              and functionality.
            </li>
            <li>
              Low ego, high impact – Prioritize teamwork, growth, and continuous
              improvement.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;
