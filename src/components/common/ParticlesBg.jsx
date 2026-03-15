import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback } from "react";

export default function ParticlesBg() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const isMobile = window.innerWidth < 640;
  const count = isMobile ? 25 : 60;

  return (
    <Particles
      init={particlesInit}
      options={{
        fullScreen: false,
        background: { color: "transparent" },
        particles: {
          number: { value: count },
          color: { value: "#6cf2c2" },
          opacity: { value: 0.35 },
          size: { value: 2 },
          move: {
            enable: true,
            speed: 1,
          },
          links: {
            enable: true,
            color: "#6cf2c2",
            opacity: 0.2,
          },
        },
      }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    />
  );
}
