import styles from "./Education.module.css";

type EducationItem = {
  type: "school" | "university" | "course" | "diploma";
  institution: string;
  program: string;
  date: string;
  description: string;
  highlightsTitle: string;
  highlights: string[];
  certificateUrl?: string;
};

const education: EducationItem[] = [
  {
    type: "school",
    institution: "IGCSE",
    program: "Secondary Education (British Curriculum)",
    date: "Sep 2020 – Jun 2022",
    description:
      "Completed IGCSE track with a strong STEM focus, building a solid foundation in mathematics, sciences, and computing through O Level and A Level subjects.",
    highlightsTitle: "Subjects",
    highlights: [
      "O Levels: English, Arabic, Maths, Chemistry, Physics, Biology, ICT, Computer Science",
      "AS Level: Physics",
      "A Level: Maths",
      "Grade: 408.79 / 410 (99.71%)",
    ],
  },
  {
    type: "university",
    institution: "Faculty of Engineering, Ain Shams University",
    program: "Computer Engineering & Software Systems (CESS)",
    date: "Oct 2022 – Present",
    description:
      "CESS blends computer engineering fundamentals with software systems design—covering networking, embedded systems, operating systems, and modern software development practices.",
    highlightsTitle: "Key Details",
    highlights: ["GPA: 3.12", "Expected Graduation: Jun 2027"],
  },
  {
    type: "course",
    institution: "Edges Academy",
    program: "Linux Administration",
    date: "Aug 2024 – Aug 2024",
    description:
      "Hands-on Linux administration training covering system setup, permissions, services, and automation using shell scripting.",
    highlightsTitle: "Focus Areas",
    highlights: [
      "Users/groups, permissions, file systems",
      "Process & service management, basic networking tools",
      "Bash scripting for automation",
      "Duration: 4 weeks",
    ],
    certificateUrl: "/certificates/edges-linux.pdf",
  },
  {
    type: "course",
    institution: "NTI",
    program: "MEAN Stack Development",
    date: "Jul 2025 – Aug 2025",
    description:
      "Built full-stack web applications with the MEAN stack, focusing on REST APIs, authentication, database design, and responsive frontends.",
    highlightsTitle: "Tech Stack",
    highlights: ["MongoDB", "Express.js", "Angular", "Node.js"],
    certificateUrl: "/certificates/nti-mean.pdf",
  },
  {
    type: "diploma",
    institution: "Amit Learning",
    program: "Data Science & AI Diploma",
    date: "Dec 2025 – Present",
    description:
      "A practical diploma covering the full data workflow—from analysis and visualization to feature engineering, ML, deep learning, and NLP fundamentals.",
    highlightsTitle: "Core Topics",
    highlights: [
      "Data analysis & visualization",
      "Data preprocessing & feature engineering",
      "Machine learning (training, evaluation, tuning)",
      "Deep learning fundamentals",
      "NLP basics (text preprocessing, embeddings, models)",
      "Expected Completion: Jun 2026",
    ],
  },
];

function typeLabel(t: EducationItem["type"]) {
  switch (t) {
    case "school":
      return "School";
    case "university":
      return "University";
    case "course":
      return "Course";
    case "diploma":
      return "Diploma";
  }
}

function typeIcon(t: EducationItem["type"]) {
  switch (t) {
    case "school":
      return "🎓";
    case "university":
      return "🏛️";
    case "course":
      return "🧩";
    case "diploma":
      return "📜";
  }
}

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Education</h2>
          <p className={styles.subtitle}>
            Academic background and professional training.
          </p>
        </div>

        <div className={styles.grid}>
          {education.map((item, idx) => (
            <article
              key={idx}
              className={`${styles.card} ${styles[`accent_${item.type}`]}`}
            >
              <div className={styles.accentLine} />

              <div className={styles.cardTop}>
                <div className={styles.leftTop}>
                  <span className={styles.typeChip}>
                    <span className={styles.typeIcon}>{typeIcon(item.type)}</span>
                    {typeLabel(item.type)}
                  </span>

                  <h3 className={styles.institution}>{item.institution}</h3>
                  <p className={styles.program}>{item.program}</p>
                </div>

                <span className={styles.date}>{item.date}</span>
              </div>

              <p className={styles.description}>{item.description}</p>

              {/* ✅ External Certificate Button */}
              {item.certificateUrl && (
                <div className={styles.actions}>
                  <a
                    href={item.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.certBtn}
                  >
                    View Certificate
                  </a>
                </div>
              )}

              <div className={styles.highlights}>
                <h4 className={styles.highlightsTitle}>{item.highlightsTitle}</h4>
                <ul className={styles.list}>
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
