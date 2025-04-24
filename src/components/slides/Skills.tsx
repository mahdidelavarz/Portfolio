import React, { useEffect, useState } from "react";
// import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";

const Skills: React.FC = () => {
  const colorList = ["#f87171", "#facc15", "#4ade80", "#60a5fa", "#c084fc"];
  const [colorIndex, setColorIndex] = useState(0);
  const [isFrontend, setIsFrontend] = useState(true);

  useEffect(() => {
    // Color cycle every 1 second
    const colorInterval = setInterval(() => {
      setColorIndex((prev) => (prev + 1) % colorList.length);
    }, 1000);

    // Toggle Frontend/Backend every 5 seconds
    const toggleInterval = setInterval(() => {
      setIsFrontend((prev) => !prev);
    }, 5000);

    return () => {
      clearInterval(colorInterval);
      clearInterval(toggleInterval);
    };
  }, []);

  return (
    <div className="flex justify-start items-center text-white w-full h-screen snap-start px-48 bg-black/20  mt-9">
      <div className="flex justify-center items-center relative mt-9">
        <div
          className="w-76 h-76 rounded-full shadow-sm shadow-slate-800"
          style={{
            background: `conic-gradient(
              rgb(66, 54, 116) 0% 6.75%,
              rgba(87, 199, 133, 0.5) 6.75% 19.25%,
              rgba(42, 123, 155, 0.5) 19.25% 31.75%,
              rgba(237, 221, 83, 0.5) 31.75% 44.25%,
              rgba(250, 0, 17, 0.5) 44.25% 56.75%,
              rgb(44, 15, 158, 0) 56.75% 93.25%,
              rgb(66, 54, 116) 93.25% 100%
            )`,
          }}
        />
        
            <div className="w-68 h-68 absolute text-stone-300 rounded-full backdrop-blur-3xl flex flex-col gap-4 justify-center items-center shadow-inner shadow-slate-800 ">
              {/* <h2 className="text-4xl ">
                {isFrontend ? "Front End" : "Back End"}
              </h2>
              <Icon
                icon={
                  isFrontend ? "nonicons:react-16" : "devicon-plain:dot-net"
                }
                width="86"
                height="86"
              /> */}
              <img src="../../../public/How-to-become-a-Full-Stack-Web-Developer--451x300 (1).png" alt="" />
            </div>
         
        <div className="w-96 h-96 rounded-full absolute border-r-2 border-white/60" />
      </div>
      <div className="w-[50rem] h-96 relative mt-9 z-50">
        <AnimatePresence mode="wait">
          {isFrontend ? (
            <motion.div
              key="frontend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dot 1 */}
              <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "-7px", left: "-144px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 1/1 */}
              <motion.div
                className="h-1 bg-blue-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center -rotate-45"
                style={{ width: "47px", top: "-24px", left: "-136px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "47px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 1 */}
              <motion.div
                className="h-1 bg-blue-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "208px", top: "-40px", left: "-96px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "208px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Title 1 */}
              <motion.div
                className="w-auto px-4 h-10 bg-blue-500/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "-58px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                Frameworks & Libraries
              </motion.div>

              {/* Dot 2 */}
              <motion.div
                className="w-4 h-4 bg-purple-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "56px", left: "-18px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {/* Line 2 */}
              <motion.div
                className="h-1 bg-purple-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "120px", top: "62px", left: "-3px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "120px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {/* Title 2 */}
              <motion.div
                className="w-auto h-10 px-4 bg-purple-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "42px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Languages & Markup
              </motion.div>

              {/* Dot 3 */}
              <motion.div
                className="w-4 h-4 bg-green-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "184px", left: "30px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {/* Line 3 */}
              <motion.div
                className="h-1 bg-green-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "80px", top: "190px", left: "45px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "80px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {/* Title 3 */}
              <motion.div
                className="w-auto h-10 px-4 bg-green-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "171px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                Styling
              </motion.div>

              {/* Dot 4 */}
              <motion.div
                className="w-4 h-4 bg-blue-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "312px", left: "-19px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              {/* Line 4 */}
              <motion.div
                className="h-1 bg-blue-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "120px", top: "319px", left: "-4px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "120px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              {/* Title 4 */}
              <motion.div
                className="w-auto h-10 px-4 bg-blue-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "300px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                State Management
              </motion.div>

              {/* Dot 5 */}
              <motion.div
                className="w-4 h-4 bg-yellow-500 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "376px", left: "-144px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />
              {/* Line 5/1 */}
              <motion.div
                className="h-1 bg-yellow-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center rotate-45"
                style={{ width: "47px", top: "404px", left: "-138px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "47px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 5 */}
              <motion.div
                className="h-1 bg-yellow-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "208px", top: "420px", left: "-99px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "208px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />
              {/* Title 5 */}
              <motion.div
                className="w-auto h-10 px-4 bg-yellow-500/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "402px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                Internationalization
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="backend"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dot 1 */}
              <motion.div
                className="w-4 h-4 bg-blue-500 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "-7px", left: "-144px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 1/1 */}
              <motion.div
                className="h-1 bg-blue-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center -rotate-45"
                style={{ width: "47px", top: "-24px", left: "-136px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "47px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 1 */}
              <motion.div
                className="h-1 bg-blue-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "208px", top: "-40px", left: "-96px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "208px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Title 1 */}
              <motion.div
                className="w-24 h-10 bg-blue-500/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "-58px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                React
              </motion.div>

              {/* Dot 2 */}
              <motion.div
                className="w-4 h-4 bg-purple-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "56px", left: "-18px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {/* Line 2 */}
              <motion.div
                className="h-1 bg-purple-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "120px", top: "62px", left: "-3px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "120px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              />
              {/* Title 2 */}
              <motion.div
                className="w-24 h-10 bg-purple-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "42px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                Redux
              </motion.div>

              {/* Dot 3 */}
              <motion.div
                className="w-4 h-4 bg-green-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "184px", left: "30px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {/* Line 3 */}
              <motion.div
                className="h-1 bg-green-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "80px", top: "190px", left: "45px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "80px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              />
              {/* Title 3 */}
              <motion.div
                className="w-24 h-10 bg-green-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "171px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                ReactQuery
              </motion.div>

              {/* Dot 4 */}
              <motion.div
                className="w-4 h-4 bg-blue-600 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "312px", left: "-19px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              {/* Line 4 */}
              <motion.div
                className="h-1 bg-blue-600/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "120px", top: "319px", left: "-4px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "120px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              />
              {/* Title 4 */}
              <motion.div
                className="w-24 h-10 bg-blue-600/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "300px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                Context
              </motion.div>

              {/* Dot 5 */}
              <motion.div
                className="w-4 h-4 bg-yellow-500 rounded-full absolute z-50 flex justify-center items-center"
                style={{ top: "376px", left: "-144px" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />
              {/* Line 5/1 */}
              <motion.div
                className="h-1 bg-yellow-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center rotate-45"
                style={{ width: "47px", top: "404px", left: "-138px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "47px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
              />
              {/* Line 5 */}
              <motion.div
                className="h-1 bg-yellow-500/40 backdrop-blur-sm rounded-full absolute z-50 flex justify-center items-center"
                style={{ width: "208px", top: "420px", left: "-99px" }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "208px" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />
              {/* Title 5 */}
              <motion.div
                className="w-24 h-10 bg-yellow-500/40 rounded-full backdrop-blur-sm absolute z-50 flex justify-center items-center text-sm"
                style={{ top: "402px", left: "104px" }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
              >
                TypeScript
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Skills;
