import { motion } from "framer-motion";
import "./about.css";

const stats = [
  { number: "4+", label: "Years Exp" },
  { number: "50+", label: "Projects" },
  { number: "100%", label: "Satisfaction" },
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
      <div className="about__inner">
        {/* Heading */}
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
          {/* ── Left: bio + stats ── */}
          <motion.div className="about__bio" {...fadeUp(0.1)}>
            <p>
              Hi! I'm <strong>Selvi</strong>, a full-stack developer with{" "}
              <span className="about__highlight">4+ years of experience</span>{" "}
              building scalable web applications. I specialise in React,
              Node.js, and cloud-native architectures that are fast, reliable,
              and maintainable.
            </p>
            <p>
              I love turning complex problems into simple, elegant solutions.
              Whether it's a pixel-perfect UI, a high-performance API, or an
              AI-powered feature — I care about every layer of the stack.
            </p>
            <p>
              When I'm not coding I'm exploring new tech, contributing to open
              source, or writing about what I've learned on{" "}
              <strong>Dev.to</strong>.
            </p>

            {/* Stats */}
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

          {/* ── Right: avatar + traits ── */}
          <motion.div className="about__right" {...fadeUp(0.15)}>
            <div className="about__avatar-wrap">
              {/* Replace src with your real photo path */}
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
