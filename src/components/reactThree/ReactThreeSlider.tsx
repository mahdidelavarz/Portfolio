import * as THREE from "three";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Image as DreiImage,
  ScrollControls,
  useScroll,
  ImageProps as DreiImageProps,
} from "@react-three/drei";
import { easing } from "maath";
import { ThreeEvent } from "@react-three/fiber";
import "../../utils/util";

// Props types
type RigProps = {
  rotation?: [number, number, number];
  children?: React.ReactNode;
};

type CardProps = DreiImageProps & {
  url: string;
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  count: number;
};

type CarouselProps = {
  radius?: number;
  count?: number;
};

function ThreeSlider() {
  return (
    <div className="w-full h-full m-0 p-0 font-inter [cursor:url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMCIgZmlsbD0iI0U4QjA1OSIvPjwvc3ZnPg=='),_auto]">
      <Canvas camera={{ position: [0, 0, 100], fov: 15 }}>
        <fog attach="fog" args={["#a79", 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0.1, 0.5, 0.1]}>
            <Carousel />
          </Rig>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function Rig({ rotation, children }: RigProps) {
  const ref = useRef<THREE.Group>(null);
  const scroll = useScroll();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = -scroll.offset * Math.PI * 2;
    }
    if (state.events?.update) {
      state.events.update();
    }
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2, state.pointer.y + 1.5, 10],
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={ref} rotation={rotation}>
      {children}
    </group>
  );
}

function Carousel({ radius = 1.4, count = 8 }: CarouselProps) {
  return Array.from({ length: count }, (_, i) => (
    <Card
      key={i}
      url={`/img${(i % 4) + 1}_.jpg`}
      position={[
        Math.sin((i / count) * Math.PI * 2) * radius,
        0,
        Math.cos((i / count) * Math.PI * 2) * radius,
      ]}
      rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      index={i}
      count={count}
    />
  ));
}

type CustomImageMaterial = THREE.Material & {
  radius?: number;
  zoom?: number;
};

function Card({ url, position, rotation, index, count }: CardProps) {
  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [targetScroll, setTargetScroll] = useState<number | null>(null);
  const scroll = useScroll();
  const scrollState = useRef({ value: 0 }); // Object to hold scroll value for damping

  // Prevent page scrolling while slider is animating
  useEffect(() => {
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      if (targetScroll !== null) {
        e.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [targetScroll]);

  const pointerOver = (e: ThreeEvent<PointerEvent>) => (
    e.stopPropagation(), setHovered(true)
  );
  const pointerOut = () => setHovered(false);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    const targetOffset = index / count;
    setTargetScroll(targetOffset * scroll.el.scrollHeight);
    scrollState.current.value = scroll.el.scrollTop; // Initialize with current scroll
  };

  useFrame((state, delta) => {
    if (ref.current) {
      easing.damp3(
        ref.current.scale,
        hovered ? [1.15, 1.15, 1.15] : [1, 1, 1],
        0.1,
        delta
      );
      const material = ref.current.material as CustomImageMaterial;
      if (material.radius !== undefined) {
        easing.damp(material, "radius", hovered ? 0.25 : 0.1, 0.2, delta);
      }
      if (material.zoom !== undefined) {
        easing.damp(material, "zoom", hovered ? 1 : 1.5, 0.2, delta);
      }
    }
    // Smoothly animate scroll position
    if (targetScroll !== null) {
      easing.damp(scrollState.current, "value", targetScroll, 0.5, delta, undefined, undefined, 0.01);
      scroll.el.scrollTop = scrollState.current.value;
      if (Math.abs(scrollState.current.value - targetScroll) < 0.1) {
        setTargetScroll(null); // Stop animation when close enough
      }
    }
  });

  return (
    <DreiImage
      ref={ref}
      url={url}
      transparent
      side={THREE.DoubleSide}
      onPointerOver={pointerOver}
      onPointerOut={pointerOut}
      onClick={handleClick}
      position={position}
      rotation={rotation}
    >
      <curvedPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
    </DreiImage>
  );
}

export default ThreeSlider;