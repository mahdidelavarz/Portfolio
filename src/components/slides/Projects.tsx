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

const Projects: React.FC<ProjectsProps> = ({ activeSlide, onThreeSliderProgress }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const isActive = activeSlide === 3;

  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress);
    if (onThreeSliderProgress) {
      onThreeSliderProgress(progress, isActive);
    }
  };

  return (
    <section className="w-full h-screen snap-start flex items-center justify-center" style={{ pointerEvents: "auto" }}>
      <ThreeSlider onScrollProgress={handleScrollProgress} />
    </section>
  );
};

export default Projects;