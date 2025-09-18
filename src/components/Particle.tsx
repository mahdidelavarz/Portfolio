"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Container, type RecursivePartial, IOptions } from "@tsparticles/engine";

const Particle = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => { await loadSlim(engine); }).then(() => setInit(true));
  }, []);

  const particlesLoaded = async (container?: Container) => { console.log(container); };

  const options: RecursivePartial<IOptions> = useMemo(() => ({
    autoPlay: true,
    backgroundMode: { enable: true, zIndex: 0 },
    fpsLimit: 60,
    particles: {
      number: { value: 250, density: { enable: true, width: 1920, height: 1080 } },
      color: { value: ["#b18a4c", "#b3b56b", "#9e6e45"] },
      shape: { type: "circle" },
      opacity: { value: { min: 0.2, max: 0.6 }, animation: { enable: true, speed: 2 } },
      size: { value: { min: 1, max: 3 }, animation: { enable: true, speed: 5 } },
      move: { enable: true, speed: 2, random: true, straight: false, outModes: { default: "bounce" } },
      wobble: { enable: true, distance: 5, speed: { angle: 10, move: 10 } },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0">
      <Particles id="tsparticles" options={{ ...options, background: { color: { value: "transparent" } } }} particlesLoaded={particlesLoaded} className="w-full h-full"/>
    </div>
  );
};

export default Particle;
