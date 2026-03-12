import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import "./skills.css";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    skills: [
      {
        name: "React",
        icon: "⚛️",
        level: "Expert",
        pct: 95,
        color: "rgba(97,218,251,0.35)",
      },
      {
        name: "TypeScript",
        icon: "🔷",
        level: "Expert",
        pct: 90,
        color: "rgba(49,120,198,0.35)",
      },
      {
        name: "Vue",
        icon: "🟢",
        level: "Advanced",
        pct: 80,
        color: "rgba(66,184,131,0.35)",
      },
      {
        name: "Next.js",
        icon: "▲",
        level: "Advanced",
        pct: 85,
        color: "rgba(200,200,200,0.25)",
      },
      {
        name: "Tailwind",
        icon: "🌊",
        level: "Expert",
        pct: 92,
        color: "rgba(56,189,248,0.3)",
      },
      {
        name: "Framer",
        icon: "🎭",
        level: "Proficient",
        pct: 75,
        color: "rgba(180,100,255,0.3)",
      },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "⚙️",
    skills: [
      {
        name: "Node.js",
        icon: "🟩",
        level: "Expert",
        pct: 92,
        color: "rgba(104,160,99,0.35)",
      },
      {
        name: "NestJS",
        icon: "🐦",
        level: "Advanced",
        pct: 82,
        color: "rgba(224,35,78,0.3)",
      },
      {
        name: "Express",
        icon: "🚀",
        level: "Expert",
        pct: 90,
        color: "rgba(180,180,180,0.25)",
      },
      {
        name: "GraphQL",
        icon: "🔺",
        level: "Advanced",
        pct: 78,
        color: "rgba(225,0,152,0.3)",
      },
      {
        name: "REST APIs",
        icon: "🔗",
        level: "Expert",
        pct: 95,
        color: "rgba(108,242,194,0.3)",
      },
      {
        name: "WebSockets",
        icon: "📡",
        level: "Proficient",
        pct: 72,
        color: "rgba(255,165,50,0.3)",
      },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: "🗄️",
    skills: [
      {
        name: "MongoDB",
        icon: "🍃",
        level: "Expert",
        pct: 90,
        color: "rgba(71,162,72,0.35)",
      },
      {
        name: "PostgreSQL",
        icon: "🐘",
        level: "Advanced",
        pct: 84,
        color: "rgba(51,103,145,0.35)",
      },
      {
        name: "Redis",
        icon: "🔴",
        level: "Proficient",
        pct: 74,
        color: "rgba(220,56,45,0.3)",
      },
      {
        name: "Prisma",
        icon: "💎",
        level: "Advanced",
        pct: 80,
        color: "rgba(42,85,153,0.3)",
      },
      {
        name: "MySQL",
        icon: "🐬",
        level: "Advanced",
        pct: 82,
        color: "rgba(0,117,143,0.3)",
      },
      {
        name: "Firebase",
        icon: "🔥",
        level: "Proficient",
        pct: 70,
        color: "rgba(255,196,0,0.3)",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    icon: "☁️",
    skills: [
      {
        name: "Docker",
        icon: "🐳",
        level: "Advanced",
        pct: 82,
        color: "rgba(36,150,237,0.35)",
      },
      {
        name: "AWS",
        icon: "☁️",
        level: "Proficient",
        pct: 74,
        color: "rgba(255,153,0,0.3)",
      },
      {
        name: "CI/CD",
        icon: "🔄",
        level: "Advanced",
        pct: 80,
        color: "rgba(108,242,194,0.3)",
      },
      {
        name: "Git",
        icon: "🌿",
        level: "Expert",
        pct: 96,
        color: "rgba(240,80,50,0.3)",
      },
      {
        name: "Linux",
        icon: "🐧",
        level: "Advanced",
        pct: 83,
        color: "rgba(200,200,200,0.2)",
      },
      {
        name: "Nginx",
        icon: "🟩",
        level: "Proficient",
        pct: 70,
        color: "rgba(0,163,0,0.3)",
      },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setAnimate(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      style={{ "--skill-color": skill.color }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
    >
      <div className="skill-card__icon">{skill.icon}</div>
      <div className="skill-card__name">{skill.name}</div>
      <div className="skill-card__bar-track">
        <div
          className={`skill-card__bar-fill${animate ? " skill-card__bar-fill--animated" : ""}`}
          style={{ width: `${skill.pct}%` }}
        />
      </div>
      <div className="skill-card__level">{skill.level}</div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState("frontend");
  const active = categories.find((c) => c.id === activeTab);

  return (
    <section className="skills" id="skills">
      <div className="skills__inner">
        <motion.div {...fadeUp(0)}>
          <span className="section-label">What I Know</span>
          <h2 className="section-heading">
            My <span>Skills</span>
          </h2>
          <p className="section-sub">
            Technologies and tools I work with every day to build modern,
            production-ready applications.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div className="skills__tabs" {...fadeUp(0.1)}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`skills__tab${activeTab === cat.id ? " skills__tab--active" : ""}`}
              onClick={() => setActiveTab(cat.id)}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="skills__grid">
          {active.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
