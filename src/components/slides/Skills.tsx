import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

type Tech = {
  label: string;
  color: string;
  icon: string;
};

const technologies: Tech[] = [
  {
    label: "Express",
    color: "bg-purple-500",
    icon: "logos:express",
  },
  {
    label: "mongoDB",
    color: "bg-green-500",
    icon: "skill-icons:mongodb",
  },
  {
    label: "MySQL",
    color: "bg-sky-400",
    icon: "logos:mysql",
  },
  {
    label: "WebSocket",
    color: "bg-orange-400",
    icon: "mdi:websocket",
  },
  {
    label: "REST:API",
    color: "bg-gray-400",
    icon: "carbon:api",
  },
];

const Skills: React.FC = () => {
  const colorList = ["#f87171", "#facc15", "#4ade80", "#60a5fa", "#c084fc"];
  const [colorIndex, setColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorList.length);
    }, 100); // every 1 second

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="flex justify-start items-center text-white w-full h-screen snap-start px-48  bg-black/40 relative ">
      <div className="flex justify-center items-center ">
        <div
          className="w-76 h-76 rounded-full shadow-sm shadow-slate-800 "
          style={{
            background: `conic-gradient(
          rgb(66, 54, 116) 0% 6.75%,     /* Green */
          rgba(87, 199, 133, .5) 6.75% 19.25%,     /* Green */
          rgba(42, 123, 155, .5) 19.25% 31.75%,    /* Blue */
          rgba(237, 221, 83, .5) 31.75% 44.25%,    /* Yellow */
          rgba(250, 0, 17, .5) 44.25% 56.75% ,     /* Red */
          rgb(44, 15, 158, 0) 56.75% 93.25% ,     /* Red */
          rgb(66, 54, 116) 93.25% 100%      /* Red */
        )`,
          }}
        />
        <div className="w-68 h-68 absolute rounded-full backdrop-blur-3xl  flex justify-center items-center shadow-inner shadow-slate-800 ">
          {/* <Icon
            icon="nonicons:react-16"
            width="186"
            height="186"
            className="duration-300 animate-spin "
            color={colorList[colorIndex]}
          /> */}
        </div>
        <div className="w-96 h-96 rounded-full absolute border-r-2 border-white/60 " />
      </div>
      <div className="w-[50rem] h-96 relative z-50 ">
        {/* colorfull circles */}
        <div className="w-4 h-4 bg-purple-600 ring-2 rounded-full absolute -top-2 -left-36 z-50 flex justify-center items-center"></div>
        <div className="w-4 h-4 bg-green-600 ring-2 rounded-full absolute top-14 -left-[18px] z-50 flex justify-center items-center"></div>
        <div className="w-4 h-4 bg-blue-600 ring-2 rounded-full absolute top-46 left-[30px] z-50 flex justify-center items-center"></div>
        <div className="w-4 h-4 bg-yellow-500 ring-2 rounded-full absolute bottom-14 -left-[18px] z-50 flex justify-center items-center"></div>
        <div className="w-4 h-4 bg-red-600 ring-2 rounded-full absolute -bottom-2 -left-36 z-50 flex justify-center items-center"></div>
        {/* lines */}
        <div className="w-52 h-1 bg-purple-600/50  rounded-full absolute -top-10 -left-24 z-50 flex justify-center items-center"></div>
        <div className="w-12 h-1 bg-purple-600/50 rounded-full absolute -top-6 -left-34 -rotate-45 z-50 flex justify-center items-center"></div>
        <div className="w-32 h-1 bg-green-600/50 rounded-full absolute top-15.5 -left-[15px] z-50 flex justify-center items-center"></div>
        <div className="w-22 h-1 bg-blue-600/50 rounded-full absolute top-47.5 left-[32px] z-50 flex justify-center items-center"></div>
        <div className="w-32 h-1 bg-yellow-500/50 rounded-full absolute bottom-15.5 -left-[10px] z-50 flex justify-center items-center"></div>
        <div className="w-12 h-1 bg-red-600/50 rounded-full absolute -bottom-6 -left-34 rotate-45 z-50 flex justify-center items-center"></div>
        <div className="w-52 h-1 bg-red-600/50 rounded-full absolute -bottom-10 -left-24 z-50 flex justify-center items-center"></div>
        {/* titles */}
        <div className="w-24 h-10 shadow-sm shadow-slate-800 bg-purple-600/40 backdrop-blur-sm  rounded-full absolute -top-14.5 left-26 z-50 flex justify-center items-center">
          Redux
        </div>
        <div className="w-24 h-10 shadow-sm shadow-slate-800 bg-green-600/40 rounded-full backdrop-blur-sm absolute top-11 left-26 z-50 flex justify-center items-center">
          ReactQuery
        </div>
        <div className="w-24 h-10 shadow-sm shadow-slate-800 bg-blue-600/40 rounded-full absolute top-43 backdrop-blur-sm left-26 z-50 flex justify-center items-center">
          Context
        </div>
        <div className="w-24 h-10 shadow-sm shadow-slate-800 bg-yellow-500/40 rounded-full backdrop-blur-sm absolute bottom-11 left-26 z-50 flex justify-center items-center"></div>
        <div className="w-24 h-10 shadow-sm shadow-slate-800 bg-red-600/40 rounded-full backdrop-blur-sm absolute -bottom-14.5 left-26 z-50 flex justify-center items-center"></div>
      </div>
    </div>
  );
};

export default Skills;
