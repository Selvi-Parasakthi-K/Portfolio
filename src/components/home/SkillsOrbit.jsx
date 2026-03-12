import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLANET_SIZE = 52;

const rings = [
  {
    skills: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "🔷", color: "#3178C6" },
      { name: "Vue", icon: "🟢", color: "#42B883" },
    ],
    duration: "10s",
    radius: 110,
    clockwise: true,
  },
  {
    skills: [
      { name: "Node.js", icon: "🟩", color: "#68A063" },
      { name: "NestJS", icon: "🐦", color: "#E0234E" },
      { name: "Express", icon: "🚀", color: "#aaaaaa" },
    ],
    duration: "16s",
    radius: 185,
    clockwise: false,
  },
  {
    skills: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "Docker", icon: "🐳", color: "#2496ED" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    ],
    duration: "24s",
    radius: 260,
    clockwise: true,
  },
];

const MAX_RADIUS = rings[rings.length - 1].radius;
const WRAPPER_SIZE = (MAX_RADIUS + PLANET_SIZE) * 2;

function generateKeyframes() {
  const orbits = rings
    .flatMap((ring, ri) =>
      ring.skills.map((_, si) => {
        // Pure equal spacing: 0°, 120°, 240° — no offset whatsoever
        const base = (360 / ring.skills.length) * si;
        const end = ring.clockwise ? base + 360 : base - 360;
        return `
          @keyframes orbit-r${ri}-s${si} {
            from { transform: rotate(${base}deg) translateX(${ring.radius}px) rotate(${-base}deg); }
            to   { transform: rotate(${end}deg)  translateX(${ring.radius}px) rotate(${-end}deg); }
          }
        `;
      }),
    )
    .join("\n");

  return (
    orbits +
    `
    @keyframes sunPulse {
      0%,100% { box-shadow: 0 0 28px #ffd70099, 0 0 60px #ff8c0066, 0 0 100px #ff450044; }
      50%      { box-shadow: 0 0 42px #ffd700cc, 0 0 90px #ff8c0099, 0 0 140px #ff450066; }
    }
    @keyframes haloFade {
      0%,100% { opacity: 0.35; transform: scale(1); }
      50%      { opacity: 0.85; transform: scale(1.1); }
    }
    @keyframes coronaSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `
  );
}

export default function SkillsOrbit() {
  const [hovered, setHovered] = useState(null);

  return (
    <div
      style={{
        position: "relative",
        width: WRAPPER_SIZE,
        height: WRAPPER_SIZE,
        maxWidth: "100%",
        margin: "0 auto",
        touchAction: "pan-y",
      }}
    >
      <style>{generateKeyframes()}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,160,0,0.06) 0%, rgba(108,242,194,0.03) 45%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Ring lines */}
      {rings.map((ring, ri) => {
        const active =
          hovered && rings[ri].skills.some((s) => s.name === hovered);
        return (
          <div
            key={ri}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: ring.radius * 2,
              height: ring.radius * 2,
              marginLeft: -ring.radius,
              marginTop: -ring.radius,
              borderRadius: "50%",
              border: `1px dashed rgba(108,242,194,${active ? 0.68 : 0.22})`,
              transition: "border-color 0.4s ease",
              pointerEvents: "none",
            }}
          />
        );
      })}

      {/* Planets */}
      {rings.map((ring, ri) =>
        ring.skills.map((skill, si) => {
          const isHovered = hovered === skill.name;
          return (
            <div
              key={skill.name}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: PLANET_SIZE,
                height: PLANET_SIZE,
                marginLeft: -PLANET_SIZE / 2,
                marginTop: -PLANET_SIZE / 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10,
                touchAction: "pan-y",
                animationName: `orbit-r${ri}-s${si}`,
                animationDuration: ring.duration,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationFillMode: "none",
                animationPlayState: "running",
              }}
              onMouseEnter={() => setHovered(skill.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                style={{
                  width: PLANET_SIZE,
                  height: PLANET_SIZE,
                  borderRadius: "50%",
                  background: "rgba(8, 12, 26, 0.92)",
                  border: `2px solid ${isHovered ? skill.color : "rgba(255,255,255,0.15)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "22px",
                  backdropFilter: "blur(12px)",
                  boxShadow: isHovered
                    ? `0 0 20px ${skill.color}, 0 0 40px ${skill.color}55`
                    : `0 0 10px ${skill.color}44`,
                  transform: isHovered ? "scale(1.25)" : "scale(1)",
                  transition: "all 0.3s ease",
                  userSelect: "none",
                  pointerEvents: "auto",
                }}
              >
                {skill.icon}
              </div>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.88 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.88 }}
                    transition={{ duration: 0.15 }}
                    style={{
                      position: "absolute",
                      bottom: "calc(100% + 8px)",
                      left: "50%",
                      transform: "translateX(-50%)",
                      whiteSpace: "nowrap",
                      fontSize: "10px",
                      fontWeight: "700",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 10px",
                      borderRadius: "8px",
                      background: "rgba(2,5,16,0.96)",
                      border: `1px solid ${skill.color}66`,
                      color: skill.color,
                      backdropFilter: "blur(12px)",
                      zIndex: 100,
                      pointerEvents: "none",
                    }}
                  >
                    {skill.name}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        }),
      )}

      {/* Sun */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        {[120, 100, 84].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid rgba(255,215,0,${0.25 - i * 0.07})`,
              animationName: "haloFade",
              animationDuration: "3s",
              animationTimingFunction: "ease-in-out",
              animationDelay: `${i * 0.45}s`,
              animationIterationCount: "infinite",
              pointerEvents: "none",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            border: "1.5px dashed rgba(255,200,0,0.28)",
            animationName: "coronaSpin",
            animationDuration: "14s",
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 3,
            width: "74px",
            height: "74px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 35% 35%, #fffde7, #ffe066 22%, #ffd700 44%, #ff8c00 68%, #ff4500 90%)",
            animationName: "sunPulse",
            animationDuration: "3s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "12px",
              fontWeight: "900",
              letterSpacing: "0.12em",
              color: "rgba(0,0,0,0.5)",
              textTransform: "uppercase",
              userSelect: "none",
            }}
          >
            Skills
          </span>
        </div>
      </div>
    </div>
  );
}
