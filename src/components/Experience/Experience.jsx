import { motion } from "framer-motion";
import SectionParticles from "../common/Sectionparticles";
import "./experience.css";

const experiences = [
  {
    role: "Junior Software Developer",
    company: "Peninsular Research Operations",
    period: "2024 – Present",
    description:
      "Developing interactive web applications and gamification platforms using React. Worked on CMS integrations with Strapi and built responsive UI components while improving user engagement and performance.",
    tags: ["React", "Angular", "NodeJS", "MongoDB", "TypeScript"],
  },
  {
    role: "Frontend Developer Intern",
    company: "Linsible Technologies",
    period: "2022 – 2023",
    description:
      "Worked as a Frontend Developer Intern building responsive user interfaces using React and Redux. Designed reusable components and implemented modern UI styling using Tailwind CSS and Bootstrap.",
    tags: ["React", "Redux", "Tailwind", "Bootstrap", "Git"],
  },
];

const education = [
  {
    icon: "🎓",
    degree: "B.Tech. Information Technology",
    school: "SSN College of Engineering",
    year: "2020 – 2024",
    grade: "8.4 CGPA",
  },
  {
    icon: "📜",
    degree: "Microsoft Certified: Azure AI Engineer Associate",
    school: "Microsoft",
    year: "2025",
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
      <SectionParticles />

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

          <div>
            <motion.p className="experience__col-title" {...fadeUp(0.1)}>
              Education &amp; Certifications
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
