import styles from "./Home.module.css";
import { FaLinkedin, FaGithub, FaKaggle, FaEnvelope, FaFilePdf } from "react-icons/fa";

export default function Home() {
  // ✅ replace with your real info
  const email = "saifeldinsais@gmail.com";
  const cvUrl = "/cv/saif-cv.pdf";

  const social = {
    linkedin: "https://www.linkedin.com/in/saif-sais/",
    github: "https://github.com/Saifeldinsais",
    kaggle: "https://www.kaggle.com/saifsais",
  };

  const languages = [
    "JavaScript",
    "TypeScript",
    "Python",
    "C",
    "C++",
    "C#",
    "SQL",
  ];

  const methodologies = [
    "MERN",
    "MEAN",
    "Spring Boot",
    "REST APIs",
    "Agile/Scrum",
    "Machine Learning",
    "Computer Vision",
    "Networking (UDP)",
    "Embedded Systems",
    "Testing (JUnit)",
  ];

  return (
    <section id="home" className={styles.section}>
      <div className={styles.container}>
        {/* HERO */}
        <div className={styles.hero}>
          <div className={styles.left}>
            <div className={styles.badge}>Computer Engineering • CESS</div>

            <h1 className={styles.name}>
              Saifeldin <span className={styles.grad}>ElSayes</span>
            </h1>

            <p className={styles.pitch}>
              Computer Engineering student focused on building reliable software systems—spanning
              full-stack development, networking protocols, machine learning, and embedded vehicle telemetry.
            </p>

            <div className={styles.ctaRow}>
              <a className={styles.primaryBtn} href={cvUrl} target="_blank" rel="noreferrer">
                <FaFilePdf /> View CV
              </a>

              <a className={styles.secondaryBtn} href="#projects">
                Explore Projects
              </a>
            </div>

            {/* Quick stats */}
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <img
                    className={styles.uniLogo}
                    src="/home/asu-logo.png"
                    alt="Ain Shams University logo"
                  />
                  <span className={styles.statLabel}>University</span>
                </div>
                <div className={styles.statValue}>Ain Shams</div>
                <div className={styles.statSub}>Faculty of Engineering</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statLabel}>GPA</span>
                </div>
                <div className={styles.statValue}>3.12</div>
                <div className={styles.statSub}>CESS • Oct 2022 – Present</div>
              </div>

              <div className={styles.statCard}>
                <div className={styles.statTop}>
                  <span className={styles.statLabel}>Portfolio</span>
                </div>
                <div className={styles.statValue}>11 Projects</div>
                <div className={styles.statSub}>ML • Web • Networking • Embedded</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Photo card */}
          <div className={styles.right}>
            <div className={styles.photoCard}>
              <div className={styles.photoFrame}>
                <img
                  className={styles.photo}
                  src="/home/profile.jpg"
                  alt="Saifeldin profile photo"
                />
              </div>

              <div className={styles.photoMeta}>
                <div className={styles.photoTitle}>Powertrain • ASURT</div>
                <div className={styles.photoSub}>
                  Telemetry & Auxiliary Systems (Dec 2024 – Present)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SKILLS */}
        <div className={styles.blocks}>
          <div className={styles.blockCard}>
            <h2 className={styles.blockTitle}>Skills</h2>
            <p className={styles.blockText}>
              Languages and technologies I use across software, data, and systems engineering.
            </p>

            <div className={styles.skills}>
              <div className={styles.skillsSection}>
                <div className={styles.skillsLabel}>Languages</div>
                <div className={styles.chips}>
                  {languages.map((s) => (
                    <span key={s} className={styles.chip}>{s}</span>
                  ))}
                </div>
              </div>

              <div className={styles.skillsSection}>
                <div className={styles.skillsLabel}>Methodologies & Fields</div>
                <div className={styles.chips}>
                  {methodologies.map((s) => (
                    <span key={s} className={styles.chip}>{s}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ABOUT */}
          <div className={styles.blockCard}>
            <h2 className={styles.blockTitle}>About</h2>
            <p className={styles.blockText}>
              I’m a Computer Engineering student (CESS) who enjoys building systems end-to-end:
              from backend APIs and data-driven ML pipelines to low-level embedded integrations.
              I care about clean architecture, measurable performance, and real-world reliability—especially
              in telemetry and networking-style problems.
            </p>

            <div className={styles.miniHighlights}>
              <div className={styles.miniItem}>
                <div className={styles.miniTitle}>Strong Areas</div>
                <div className={styles.miniText}>Full-stack, ML, networking protocols, embedded systems</div>
              </div>
              <div className={styles.miniItem}>
                <div className={styles.miniTitle}>Working Style</div>
                <div className={styles.miniText}>Agile, documentation-driven, team collaboration</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Contact Summary */}
        <footer className={styles.footer}>
          <div className={styles.footerLeft}>
            <div className={styles.footerTitle}>Contact</div>
            <a className={styles.email} href={`mailto:${email}`}>
              <FaEnvelope /> {email}
            </a>
            <div className={styles.footerHint}>
              Or use the full contact form in the Contact section.
            </div>
          </div>

          <div className={styles.footerRight}>
            <a className={styles.socialBtn} href={social.linkedin} target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a className={styles.socialBtn} href={social.github} target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a className={styles.socialBtn} href={social.kaggle} target="_blank" rel="noreferrer">
              <FaKaggle />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
}
