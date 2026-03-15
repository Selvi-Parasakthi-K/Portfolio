import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SectionParticles from "../common/Sectionparticles";
import "./skills.css";
import {
  SiHtml5,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiReact,
  SiAngular,
  SiRedux,
  SiAstro,
  SiNodedotjs,
  SiExpress,
  SiStrapi,
  SiMongodb,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";
import { MdCss } from "react-icons/md";
import { GrGraphQl } from "react-icons/gr";

import { TbApi } from "react-icons/tb";
import { DiDotnet } from "react-icons/di";
import { FaDatabase } from "react-icons/fa";

const categories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "🎨",
    skills: [
      {
        name: "HTML",
        icon: <SiHtml5 />,
        level: "Expert",
        pct: 95,
        color: "#e34c26",
      },
      {
        name: "CSS",
        icon: <MdCss />,
        level: "Expert",
        pct: 95,
        color: "#264de4",
      },
      {
        name: "SCSS",
        icon: <SiSass />,
        level: "Advanced",
        pct: 85,
        color: "#cc6699",
      },
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        level: "Expert",
        pct: 92,
        color: "#38bdf8",
      },
      {
        name: "Bootstrap",
        icon: <SiBootstrap />,
        level: "Expert",
        pct: 90,
        color: "#7952b3",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript />,
        level: "Expert",
        pct: 90,
        color: "#f7df1e",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        level: "Advanced",
        pct: 85,
        color: "#3178c6",
      },
      {
        name: "React",
        icon: <SiReact />,
        level: "Expert",
        pct: 92,
        color: "#61dafb",
      },
      {
        name: "Angular",
        icon: <SiAngular />,
        level: "Proficient",
        pct: 75,
        color: "#dd0031",
      },
      {
        name: "Redux",
        icon: <SiRedux />,
        level: "Advanced",
        pct: 85,
        color: "#764abc",
      },
      {
        name: "Astro",
        icon: <SiAstro />,
        level: "Proficient",
        pct: 70,
        color: "#ff5a32",
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
        icon: <SiNodedotjs />,
        level: "Advanced",
        pct: 82,
        color: "#339933",
      },
      {
        name: "Express.js",
        icon: <SiExpress />,
        level: "Advanced",
        pct: 80,
        color: "#999999",
      },
      {
        name: ".NET",
        icon: <DiDotnet />,
        level: "Proficient",
        pct: 70,
        color: "#512bd4",
      },
      {
        name: "REST API",
        icon: <TbApi />,
        level: "Expert",
        pct: 90,
        color: "#6cf2c2",
      },
      {
        name: "Strapi CMS",
        icon: <SiStrapi />,
        level: "Proficient",
        pct: 75,
        color: "#4945ff",
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
        icon: <SiMongodb />,
        level: "Advanced",
        pct: 82,
        color: "#47a248",
      },
      {
        name: "SQL",
        icon: <FaDatabase />,
        level: "Advanced",
        pct: 80,
        color: "#336791",
      },
      {
        name: "GraphQL",
        icon: <GrGraphQl />,
        level: "Proficient",
        pct: 72,
        color: "#cc2927",
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
      <div className="skill-card__icon" style={{ color: skill.color }}>
        {skill.icon}
      </div>
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
      <SectionParticles />

      <div className="skills__inner">
        <motion.div {...fadeUp(0)}>
          <span className="section-label">What I Know</span>
          <h2 className="section-heading">
            My <span>Skills</span>
          </h2>
          <p className="section-sub">
            Technologies and tools I work with to build modern, production-ready
            applications.
          </p>
        </motion.div>

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

        <div className="skills__grid">
          {active.skills.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
