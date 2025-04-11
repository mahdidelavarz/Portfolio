import { Icon } from "@iconify/react/dist/iconify.js";
import { Typewriter } from "react-simple-typewriter";

function Home({ scrollToSlide }: { scrollToSlide: (index: number) => void }) {
  return (
    <div className="w-full h-screen snap-start flex px-48 py-20 bg-black/40 text-white ">
      <div className=" w-1/2 py-36 ">
        <h1 className="text-3xl text-stone-300 text-shadow-lg ">
          <div className="flex gap-4 items-center ">
            <span>I'm a</span>
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
          </div>
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
  );
}

export default Home;
