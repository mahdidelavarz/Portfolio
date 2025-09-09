import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type RecursivePartial,
  IOptions,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.
// import whale from "/whale.jpg";

const Particle = () => {
  const [init, setInit] = useState(false);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: RecursivePartial<IOptions> = useMemo(
    () => ({
      autoPlay: true,
      background: {
        image: "/whale.jpg",
        size: "80% auto",
        repeat: "no-repeat",
        position: "center",
        opacity: 1,
      },
      backgroundMode: {
        enable: true,
        zIndex: 0,
      },
      // fullScreen: {
      //   enable: false,
      //   zIndex: 0,
      // },
      fpsLimit: 60,
      particles: {
        number: {
          value: 250,
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
        },
        color: {
          value: ["#b18a4c", "#b3b56b", "#9e6e45"], // Earthy colors
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 2,
            sync: false,
            destroy: "none",
          },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: {
            enable: true,
            speed: 5,
            minimumValue: 1,
            sync: false,
            destroy: "none",
          },
        },
        move: {
          enable: true,
          speed: 2,
          direction: "none" as const, // Explicitly type as "none"
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
          attract: {
            enable: false,
          },
        },
        wobble: {
          enable: true,
          distance: 5,
          speed: {
            angle: 10,
            move: 10,
          },
        },
      },
      detectRetina: true,
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
    }),
    []
  );
if (init) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(/whale.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
          ...options,
          background: {
            color: { value: "transparent" }, // 👈 Make particle bg transparent
          },
        }}
        className="w-full h-full"
      />
    </div>
  );
}

  return <></>;
};

export default Particle;
