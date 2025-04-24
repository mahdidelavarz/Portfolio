// ScrollHandler.tsx
import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

type ScrollHandlerProps = {
  onScrollProgress: (progress: number) => void;
};

function ScrollHandler({ onScrollProgress }: ScrollHandlerProps) {
  const scroll = useScroll();
  const lastProgress = useRef(0);

  useFrame(() => {
    const progress = scroll.offset;
    console.log("Scroll progress:", progress); // Debug log
    if (progress !== lastProgress.current) {
      onScrollProgress(progress);
      lastProgress.current = progress;
    }
  });

  return null;
}

export default ScrollHandler;
