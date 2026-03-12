import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PLANET_SIZE = 65;

// Each ring has its own accent color for the ring line + glow
const rings = [
  {
    skills: [
      { name: "React", icon: "⚛️", color: "#61DAFB" },
      { name: "TypeScript", icon: "🔷", color: "#3178C6" },
      { name: "Vue", icon: "🟢", color: "#42B883" },
    ],
    duration: "10s",
    radius: 140,
    clockwise: true,
    ringColor: "rgba(108, 242, 194, 0.55)", // teal
    ringGlow: "rgba(108, 242, 194, 0.12)",
  },
  {
    skills: [
      { name: "Node.js", icon: "🟩", color: "#68A063" },
      { name: "NestJS", icon: "🐦", color: "#E0234E" },
      { name: "Express", icon: "🚀", color: "#c0c0c0" },
    ],
    duration: "18s",
    radius: 215,
    clockwise: false,
    ringColor: "rgba(255, 107, 157, 0.55)", // pink
    ringGlow: "rgba(255, 107, 157, 0.1)",
  },
  {
    skills: [
      { name: "MongoDB", icon: "🍃", color: "#47A248" },
      { name: "Docker", icon: "🐳", color: "#2496ED" },
      { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    ],
    duration: "28s",
    radius: 290,
    clockwise: true,
    ringColor: "rgba(255, 165, 50, 0.55)", // amber
    ringGlow: "rgba(255, 165, 50, 0.1)",
  },
];

const MAX_RADIUS = rings[rings.length - 1].radius;
const INTRINSIC = (MAX_RADIUS + PLANET_SIZE) * 2;

function generateKeyframes() {
  const orbits = rings
    .flatMap((ring, ri) =>
      ring.skills.map((_, si) => {
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
      0%,100% {
        box-shadow:
          0 0 0 6px rgba(255,215,0,0.08),
          0 0 30px #ffd70099,
          0 0 70px #ff8c0066,
          0 0 120px #ff450033;
      }
      50% {
        box-shadow:
          0 0 0 10px rgba(255,215,0,0.12),
          0 0 50px #ffd700cc,
          0 0 100px #ff8c0099,
          0 0 160px #ff450055;
      }
    }
    @keyframes haloFade {
      0%,100% { opacity: 0.4; transform: scale(1); }
      50%      { opacity: 1;   transform: scale(1.08); }
    }
    @keyframes coronaSpin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
    @keyframes planetFloat {
      0%,100% { filter: brightness(1); }
      50%      { filter: brightness(1.15); }
    }
  `
  );
}

export default function SkillsOrbit() {
  const [hovered, setHovered] = useState(null);
  const wrapperRef = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => {
      const available = entry.contentRect.width;
      // Allow up to 1× but never scale beyond natural size
      setScale(Math.min(1, available / INTRINSIC));
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        height: INTRINSIC * scale,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        touchAction: "pan-y",
      }}
    >
      <style>{generateKeyframes()}</style>

      {/* Fixed-size orbit board, scaled to fit container */}
      <div
        style={{
          position: "relative",
          width: INTRINSIC,
          height: INTRINSIC,
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {/* Deep space radial bg — makes orbit stand out from page bg */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(6,12,35,0.85) 0%, rgba(3,6,20,0.6) 55%, transparent 75%)",
            pointerEvents: "none",
          }}
        />

        {/* Subtle star-field dots */}
        {[
          [22, 18],
          [68, 12],
          [15, 55],
          [78, 42],
          [35, 80],
          [82, 75],
          [10, 85],
          [90, 25],
          [50, 8],
          [60, 90],
          [25, 38],
          [72, 62],
          [45, 22],
          [88, 50],
          [5, 65],
        ].map(([x, y], i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              width: i % 3 === 0 ? 2 : 1,
              height: i % 3 === 0 ? 2 : 1,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.55)",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Ring lines — each with its own color + box-shadow glow */}
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
                // Solid ring instead of dashed — much more visible
                border: `1.5px solid ${active ? ring.ringColor.replace("0.55", "0.9") : ring.ringColor}`,
                boxShadow: active
                  ? `0 0 18px ${ring.ringGlow.replace("0.1", "0.4")}, inset 0 0 18px ${ring.ringGlow.replace("0.1", "0.2")}`
                  : `0 0 10px ${ring.ringGlow}, inset 0 0 10px ${ring.ringGlow}`,
                transition: "border-color 0.4s ease, box-shadow 0.4s ease",
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
                {/* Planet bubble — glassmorphism with colored border */}
                <div
                  style={{
                    width: PLANET_SIZE,
                    height: PLANET_SIZE,
                    borderRadius: "50%",
                    // Glassy dark bg with a subtle inner radial tint from skill color
                    background: `radial-gradient(circle at 35% 35%, ${skill.color}22, rgba(6,10,28,0.95))`,
                    border: `2px solid ${isHovered ? skill.color : skill.color + "66"}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "32px",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    boxShadow: isHovered
                      ? `0 0 0 3px ${skill.color}33, 0 0 24px ${skill.color}88, 0 0 50px ${skill.color}44`
                      : `0 0 12px ${skill.color}44, 0 2px 8px rgba(0,0,0,0.5)`,
                    transform: isHovered ? "scale(1.22)" : "scale(1)",
                    transition: "all 0.3s ease",
                    userSelect: "none",
                    pointerEvents: "auto",
                    animation: "planetFloat 4s ease-in-out infinite",
                  }}
                >
                  {skill.icon}
                </div>

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.85 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.85 }}
                      transition={{ duration: 0.18 }}
                      style={{
                        position: "absolute",
                        bottom: "calc(100% + 10px)",
                        left: "50%",
                        transform: "translateX(-50%)",
                        whiteSpace: "nowrap",
                        fontSize: "11px",
                        fontWeight: "700",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "5px 12px",
                        borderRadius: "8px",
                        background: "rgba(2,5,18,0.96)",
                        border: `1px solid ${skill.color}88`,
                        color: skill.color,
                        backdropFilter: "blur(16px)",
                        boxShadow: `0 4px 20px ${skill.color}33`,
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
          {/* Outer halo rings */}
          {[170, 142, 118].map((size, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: `1px solid rgba(255,215,0,${0.22 - i * 0.06})`,
                animationName: "haloFade",
                animationDuration: "3.5s",
                animationTimingFunction: "ease-in-out",
                animationDelay: `${i * 0.5}s`,
                animationIterationCount: "infinite",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Spinning corona */}
          <div
            style={{
              position: "absolute",
              width: "126px",
              height: "126px",
              borderRadius: "50%",
              border: "1.5px dashed rgba(255,200,0,0.35)",
              animationName: "coronaSpin",
              animationDuration: "16s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              pointerEvents: "none",
            }}
          />

          {/* Second corona spinning opposite */}
          <div
            style={{
              position: "absolute",
              width: "108px",
              height: "108px",
              borderRadius: "50%",
              border: "1px dashed rgba(255,160,0,0.25)",
              animationName: "coronaSpin",
              animationDuration: "10s",
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDirection: "reverse",
              pointerEvents: "none",
            }}
          />

          {/* Core */}
          <div
            style={{
              position: "relative",
              zIndex: 3,
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 32% 32%, #fffff0, #ffe566 18%, #ffd700 38%, #ffaa00 62%, #ff6600 82%, #ff3300)",
              animationName: "sunPulse",
              animationDuration: "3s",
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "17px",
                fontWeight: "900",
                letterSpacing: "0.1em",
                color: "rgba(0,0,0,0.55)",
                textTransform: "uppercase",
                userSelect: "none",
                lineHeight: 1,
              }}
            >
              Skills
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
