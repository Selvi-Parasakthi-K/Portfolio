import { motion } from "framer-motion";
import SectionParticles from "../common/Sectionparticles";
import "./about.css";

const stats = [
  { number: "2+", label: "Years Experience" },
  { number: "10+", label: "Projects" },
  { number: "100%", label: "Commitment" },
];

const traits = [
  { icon: "⚡", label: "Fast Learner" },
  { icon: "🎯", label: "Detail-Oriented" },
  { icon: "🤝", label: "Team Player" },
  { icon: "🧠", label: "Problem Solver" },
  { icon: "🚀", label: "Self-Motivated" },
  { icon: "🌐", label: "Open Source" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function About() {
  return (
    <section className="about" id="about">
      <SectionParticles />

      <div className="about__inner">
        <motion.div {...fadeUp(0)}>
          <span className="section-label">Who I Am</span>
          <h2 className="section-heading">
            About <span>Me</span>
          </h2>
          <p className="section-sub">
            Passionate developer crafting digital experiences that blend clean
            code with thoughtful design.
          </p>
        </motion.div>

        <div className="about__grid">
          <motion.div className="about__bio" {...fadeUp(0.1)}>
            <p>
              Hi! I'm <strong>Selvi</strong>, a passionate Frontend Developer
              experienced in building modern and responsive web applications. I
              work mainly with
              <span className="about__highlight">
                {" "}
                React, Redux, Tailwind CSS, and Bootstrap{" "}
              </span>
              to create scalable and user-friendly interfaces.
            </p>
            <p>
              I enjoy transforming ideas into interactive digital experiences by
              writing clean and maintainable code. I have also worked with
              technologies like Shopify, Strapi CMS, and Astro while building
              dynamic websites and content-driven applications.
            </p>
            <p>
              I'm always eager to learn new technologies and improve my
              development skills. I enjoy solving real-world problems through
              code and collaborating with teams to deliver efficient and
              high-quality web solutions.
            </p>

            <div className="about__stats">
              {stats.map(({ number, label }, i) => (
                <motion.div
                  key={label}
                  className="about__stat-card"
                  {...fadeUp(0.2 + i * 0.08)}
                >
                  <div className="about__stat-number">{number}</div>
                  <div className="about__stat-label">{label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="about__right" {...fadeUp(0.15)}>
            <div className="about__avatar-wrap">
              <div className="about__avatar-placeholder">👩‍💻</div>
              <span className="about__avatar-badge">Available for hire</span>
            </div>
            <div className="about__traits">
              {traits.map(({ icon, label }, i) => (
                <motion.span
                  key={label}
                  className="about__trait"
                  {...fadeUp(0.25 + i * 0.06)}
                >
                  <span className="about__trait-icon">{icon}</span>
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
