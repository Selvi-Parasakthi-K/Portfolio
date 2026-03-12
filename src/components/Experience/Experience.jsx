import { motion } from "framer-motion";
import "./experience.css";

const experiences = [
  {
    role: "Senior Full Stack Developer",
    company: "TechCorp Solutions · Full-time",
    period: "2022 – Present",
    description:
      "Led development of a SaaS platform serving 50k+ users. Architected microservices with Node.js and NestJS, built React dashboards, and reduced API response times by 40%.",
    tags: ["React", "NestJS", "PostgreSQL", "Docker", "AWS"],
  },
  {
    role: "Frontend Developer",
    company: "Pixel Studio · Full-time",
    period: "2020 – 2022",
    description:
      "Built and maintained 10+ client web apps. Migrated legacy jQuery codebases to React, implemented CI/CD pipelines, and improved Lighthouse scores from 60 to 95+.",
    tags: ["React", "TypeScript", "Tailwind", "CI/CD", "Firebase"],
  },
  {
    role: "Junior Web Developer",
    company: "StartupX · Internship → Full-time",
    period: "2019 – 2020",
    description:
      "Developed REST APIs with Express and MongoDB, built responsive UIs, and collaborated in an agile team shipping weekly releases.",
    tags: ["Node.js", "Express", "MongoDB", "Vue", "Git"],
  },
];

const education = [
  {
    icon: "🎓",
    degree: "B.E. Computer Science & Engineering",
    school: "Anna University, Chennai",
    year: "2015 – 2019",
    grade: "8.4 CGPA",
  },
  {
    icon: "📜",
    degree: "AWS Certified Developer – Associate",
    school: "Amazon Web Services",
    year: "2023",
    grade: "Certified",
  },
  {
    icon: "📜",
    degree: "Meta Frontend Developer Certificate",
    school: "Coursera / Meta",
    year: "2022",
    grade: "Certified",
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: "easeOut" },
});

export default function Experience() {
  return (
    <section className="experience" id="experience">
      <div className="experience__inner">
        <motion.div {...fadeUp(0)}>
          <span className="section-label">My Journey</span>
          <h2 className="section-heading">
            Work <span>Experience</span>
          </h2>
          <p className="section-sub">
            A timeline of roles and projects that have shaped my skills and
            perspective as a developer.
          </p>
        </motion.div>

        <div className="experience__layout">
          {/* ── Timeline ── */}
          <div>
            <p className="experience__col-title">Work History</p>
            <div className="timeline">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.role}
                  className="timeline-item"
                  {...fadeUp(0.1 + i * 0.1)}
                >
                  <div className="timeline-item__dot">
                    <div className="timeline-item__dot-inner" />
                  </div>
                  <div className="timeline-item__card">
                    <div className="timeline-item__header">
                      <h3 className="timeline-item__role">{exp.role}</h3>
                      <span className="timeline-item__period">
                        {exp.period}
                      </span>
                    </div>
                    <p className="timeline-item__company">{exp.company}</p>
                    <p className="timeline-item__desc">{exp.description}</p>
                    <div className="timeline-item__tags">
                      {exp.tags.map((t) => (
                        <span key={t} className="timeline-item__tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Education ── */}
          <div>
            <motion.p className="experience__col-title" {...fadeUp(0.1)}>
              Education & Certifications
            </motion.p>
            <div className="edu-list">
              {education.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  className="edu-card"
                  {...fadeUp(0.15 + i * 0.1)}
                >
                  <div className="edu-card__icon">{edu.icon}</div>
                  <div className="edu-card__body">
                    <h4 className="edu-card__degree">{edu.degree}</h4>
                    <p className="edu-card__school">{edu.school}</p>
                    <div className="edu-card__meta">
                      <span className="edu-card__year">{edu.year}</span>
                      <span className="edu-card__grade">{edu.grade}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
