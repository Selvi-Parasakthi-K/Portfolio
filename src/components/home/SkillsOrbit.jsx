import { motion } from "framer-motion";
import { useState } from "react";
import "./skillsOrbit.css";

const frontend = [
  { name: "React", icon: "⚛️" },
  { name: "Angular", icon: "🅰️" },
  { name: "Vue", icon: "🟢" },
];

const backend = [
  { name: "Node", icon: "🟩" },
  { name: "NestJS", icon: "🐦" },
  { name: "Express", icon: "🚀" },
];

const database = [
  { name: "MongoDB", icon: "🍃" },
  { name: "Postgres", icon: "🐘" },
  { name: "Redis", icon: "🔴" },
];

export default function SkillsOrbit() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <div className="orbit-wrapper">
      <div className="core">Skills</div>

      {/* Orbital guide lines */}
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="orbital-line"
          style={{ transform: `rotate(${i * 30}deg)` }}
        />
      ))}

      <Ring
        data={frontend}
        size={200}
        duration={20}
        onHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />
      <Ring
        data={backend}
        size={300}
        duration={30}
        reverse
        onHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />
      <Ring
        data={database}
        size={400}
        duration={40}
        onHover={setHoveredSkill}
        hoveredSkill={hoveredSkill}
      />

      {/* Info display */}
      {hoveredSkill && (
        <motion.div
          className="skill-info"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 100px)",
            background: "rgba(20, 20, 30, 0.9)",
            padding: "1rem 1.5rem",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(108, 242, 194, 0.3)",
            zIndex: 100,
          }}
        >
          <h4 style={{ margin: 0, color: "#6cf2c2" }}>{hoveredSkill}</h4>
        </motion.div>
      )}
    </div>
  );
}

function Ring({ data, size, duration, reverse = false, onHover }) {
  const itemSize = 56;

  return (
    <motion.div
      className="ring"
      style={{ width: size, height: size }}
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      {data.map((item, i) => (
        <div
          key={item.name}
          className="ring-item"
          style={{
            transform: `
              rotate(${(360 / data.length) * i}deg)
              translate(${size / 2 - itemSize / 2}px)
              rotate(-${(360 / data.length) * i}deg)
            `,
          }}
          onMouseEnter={() => onHover(item.name)}
          onMouseLeave={() => onHover(null)}
        >
          <span>{item.icon}</span>
          <div className="skill-label">{item.name}</div>
        </div>
      ))}
    </motion.div>
  );
}
