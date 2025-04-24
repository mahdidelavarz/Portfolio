// import ThreeSlider from "../reactThree/ReactThreeSlider";

// function Projects({ activeSlide }: any) {

//   console.log(activeSlide);
//   return (
//     <div className="w-full h-screen snap-start flex items-center justify-center bg-gray-800/30 text-white">
//       {activeSlide == 3 && <ThreeSlider />}
//     </div>
//   );
// }

// export default Projects;
// Projects.tsx
// Projects.tsx
import React, { useState } from "react";
import ThreeSlider from "../reactThree/ReactThreeSlider";

type ProjectsProps = {
  activeSlide: number;
  onThreeSliderProgress?: (progress: number, isActive: boolean) => void;
};

const Projects: React.FC<ProjectsProps> = ({
  activeSlide,
  onThreeSliderProgress,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isActive = activeSlide === 3;
  const [openModal, setOpenModal] = useState(false);

  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress);
    if (onThreeSliderProgress) {
      onThreeSliderProgress(progress, isActive);
    }
  };

  return (
    <section
      className="w-full h-screen snap-start flex items-center justify-center relative bg-black/20"
      style={{ pointerEvents: "auto" }}
    >
      {activeSlide && (
        <ThreeSlider
          onScrollProgress={handleScrollProgress}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
      <div
        className={`w-full h-full absolute top-0 flex justify-center items-center ${
          openModal ? "flex" : "hidden"
        }`}
      >
        <div className="w-1/2 h-1/2 border rounded-xl">
          <button
            className="px-8 py-2 m-4 bg-blue-500 rounded-xl text-white"
            onClick={() => setOpenModal(false)}
          >
            close
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
