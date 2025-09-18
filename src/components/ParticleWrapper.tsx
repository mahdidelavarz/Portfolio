// components/ParticleWrapper.tsx
"use client";

import Particle from "./Particle";

export default function ParticleWrapper() {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        backgroundImage: `url(/whale.jpg)`, // 👈 keep your background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Particle />
    </div>
  );
}
