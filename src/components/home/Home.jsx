import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ParticlesBg from "../common/ParticlesBg";
import SkillsOrbit from "./SkillsOrbit";
import "./home.css";

const roles = [
  "Full Stack Developer",
  "Frontend Specialist",
  "Backend Engineer",
  "AI Integration Expert",
  "Cloud Solutions Architect",
];

export default function Home() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = roles[currentRole];
    let timeout;

    if (!isDeleting) {
      // Typing effect
      if (displayedRole.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedRole(currentText.slice(0, displayedRole.length + 1));
        }, 100);
      } else {
        // Start deleting after a pause
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      // Deleting effect
      if (displayedRole.length > 0) {
        timeout = setTimeout(() => {
          setDisplayedRole(currentText.slice(0, displayedRole.length - 1));
        }, 50);
      } else {
        // Move to next role after deleting
        setIsDeleting(false);
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedRole, currentRole, isDeleting]);

  return (
    <div className="home">
      <ParticlesBg />

      <div className="left">
        <motion.h1
          className="glow-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I'm <span className="name-span">Selvi</span>
        </motion.h1>

        <div className="role-container">
          <motion.p
            className="role-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="typing-text">{displayedRole}</span>
          </motion.p>
        </div>

        <motion.p
          className="tagline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Creating cutting-edge web applications with modern technologies and
          AI-powered solutions. Specialized in scalable architectures and
          seamless user experiences.
        </motion.p>

        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <a href="#contact" className="cta-button primary">
            <span>Get In Touch</span>
            <span>→</span>
          </a>
          <a href="#projects" className="cta-button secondary">
            <span>View Projects</span>
          </a>
        </motion.div>

        <motion.div
          className="stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Projects</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4+</div>
            <div className="stat-label">Years Exp</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">100%</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="right"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, type: "spring" }}
      >
        <SkillsOrbit />
      </motion.div>
    </div>
  );
}
